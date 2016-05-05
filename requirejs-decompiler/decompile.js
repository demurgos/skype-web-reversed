var path = require("path");
var fs = require("fs-extra");
var Bluebird = require("bluebird");
var esprima = require("esprima");
var escodegen = require("escodegen");
var esquery = require("esquery");
var estraverse = require("estraverse");
var _ = require("lodash");

var ast = require("./ast");

var defaultOptions = {
  filePath: null,
  outputDir: null,
  fileExtension: "js",
  unresolvedDir: "__unresolved"
};

var escodegenOptions = {
  format: {
    indent: {
      style: '  '
    },
    newline: '\n',
    space: ' ',
    quotes: "double",
    parentheses: true,
    semicolons: true
  }
};

var decompilerPrefix = "~";

function isDefineZoneRoot(astNode) {
  return astNode._ownerDefine && astNode._ownerDefine._defineRoot === astNode;
}

/**
 * Init the AST
 * @param programNode
 */
function initTree (programNode) {
  estraverse.traverse(programNode, {
    enter: function(node, parent) {
      node._parent = parent || null;
      node._ownerDefine = null;
      node._subDefines = 0;
      node._isDefine = false;
    }
  });
  return programNode;
}

/**
 * Find all the define calls and mark them.
 * @param node
 * @returns {*}
 */
function markDefineCalls (programNode) {
  var defineCalls = esquery.query(programNode, "CallExpression[callee.type=Identifier][callee.name=define]");

  defineCalls = defineCalls.filter(function(dc) {
    return dc.arguments.length > 1 && dc.arguments[0].type === "Literal" && typeof dc.arguments[0].value === "string";
  });

  _.forEach(defineCalls, function(dc) {
    dc._ownerDefine = dc;
    dc._defineRoot = dc;
    dc._id = dc.arguments[0].value;

    dc._isDefine = true;
    dc._isNestedDefine = false;
    dc._nestedOwner = null; // If this is a nestedDefine, nestedOwner points to the parent defineCall
  });
  return defineCalls;
}

function markDefineCallsDescendants (programNode) {
  estraverse.traverse(programNode, {
    enter: function(node, parent) {
      var curOwner = parent ? parent._ownerDefine : null;
      if (!node._isDefine) {
        node._ownerDefine = curOwner;
      } else {
        if (curOwner !== null) {
          node._isNestedDefine = true;
          node._nestedOwner = curOwner;
        }
      }
    },
    leave: function(node, parent) {
      if (parent) {
        if (node._isDefine) {
          parent._subDefines++; // Nested define are merged into the top define for the subDefines count
        } else {
          parent._subDefines += node._subDefines;
        }
      }
    }
  });
  return programNode;
}

/**
 * Moves the root of the define subtree while there is no conflict.
 * @param defineRootNode
 * @return {boolean} Indicate if the root changed or not
 */
function augmentRootNoConflict(defineCall) {
  if (defineCall._isNestedDefine) {
    return false;
  }

  var root = defineCall._defineRoot;
  if (!root._parent || root._parent._subDefines !== 1) {
    return false;
  }

  do {
    root = root._parent;
    defineCall._defineRoot = root;
    root._ownerDefine = defineCall;
  } while(root._parent && root._parent._subDefines === 1);

  return true;
}

/**
 * maps to {id: string, filePath: string, ast: node}
 */
function getModuleDescriptors (defineCalls, options) {
  return _.map(defineCalls, function(dc, idx) {
    var id = dc._id;
    var filePath = path.resolve(options.outputDir, id);

    if (true) { // TODO: check if there is a need to add the extension ?
      filePath = filePath + "." + options.fileExtension;
    }
    if (filePath.indexOf(options.outputDir) !== 0) {
      throw new Error("filePath MUST be in outputDir");
    }

    return {id: id, filePath: filePath, ast: dc._defineRoot};
  });
}

/**
 * Return a call to require("~moduleId") compatible with the type of the supplied node.
 * @param node
 * @param moduleId
 */
function getCompatibleModuleRequire (node, moduleId) {
  var callExpression = {
    type: "CallExpression",
    callee: {
      type: "Identifier",
      name: "require"
    },
    arguments: [{
      type: "Literal",
      value: decompilerPrefix + moduleId
    }]
  };

  if(ast.isExpression(node)) {
    return callExpression;
  } else if (ast.isStatement(node)) {
    return {
      type: "ExpressionStatement",
      expression: callExpression
    }
  }
  throw new Error("Cannot patch node");
}

/**
 * Replaces defineRoots by calls to require.
 * @param programNode
 */
function patchProgram (programNode) {
  estraverse.replace(programNode, {
    enter: function(node, parent) {
      if (node && node._parent && isDefineZoneRoot(node)) {
        return getCompatibleModuleRequire(node, node._ownerDefine._id);
      } else {
        return undefined;
      }
    }
  });
  return programNode;
}

/**
 * Read the file at the path `path` and returns its content as an utf8 string.
 * @param path
 * @return {Bluebird<string>}
 */
function readFile (path) {
  return Bluebird.fromCallback(function (cb) {
    return fs.readFile(path, "utf8", cb);
  });
}

/**
 * Writes `str` to file at `path`. (Overrides any previous content)
 * @param filePath
 * @param str An utf8 string
 * @returns {Bluebird<void>}
 */
function writeFile (filePath, str) {
  return Bluebird.fromCallback(function (cb) {
    return fs.outputFile(filePath, str, cb);
  });
}

function writeAstNode(filePath, astNode) {
  return Bluebird.try(function() {
    var code = escodegen.generate(astNode, escodegenOptions);
    if (code.length > 1 && code[code.length - 1] !== "\n") {
      code = code + "\n";
    }
    return writeFile(filePath, code);
  });
}

/**
 *
 * @param moduleDescriptors {{id: string, ast: Node}}
 */
function writeModules(moduleDescriptors, options) {
  return Bluebird
    .fromCallback(function (cb) {
      return fs.emptyDir(options.outputDir, cb);
    })
    .then(function () {
      return Bluebird.map(moduleDescriptors, function(md) {
        return writeAstNode(md.filePath, md.ast);
      });
    });
}

function decompile(options) {
  options = _.defaults({}, options, defaultOptions);
  var filePath = options.filePath;
  var outputDir = options.outputDir;
  if (!filePath) {
    throw new Error("Missing filePath");
  }
  if (!outputDir) {
    throw new Error("Missing outputDir");
  }

  return readFile(filePath)
    .then(function (contentStr) {
      var program = esprima.parse(contentStr);
      program = initTree(program);
      var defineCalls = markDefineCalls(program);
      program = markDefineCallsDescendants(program);
      _.forEach(defineCalls, function(dc) {
        augmentRootNoConflict(dc);
      });
      var moduleDescriptors = getModuleDescriptors(defineCalls, options);

      program = patchProgram(program);

      return writeModules(moduleDescriptors, options)
        .then(function(){
          var programPath = path.resolve(outputDir, options.unresolvedDir, path.basename(filePath));
          return writeAstNode(programPath, program);
        });

      // console.log("marked");
      // var moduleDescriptors = getModuleNodes(program);
      // console.log("Require modules: " + moduleDescriptors.length);
      // return writeModules(moduleDescriptors, options);
    });
}

exports.decompile = decompile;
exports.default = decompile;
