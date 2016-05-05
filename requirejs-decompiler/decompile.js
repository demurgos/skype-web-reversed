var path = require("path");
var fs = require("fs-extra");
var Bluebird = require("bluebird");
var esprima = require("esprima");
var escodegen = require("escodegen");
var esquery = require("esquery");
var _ = require("lodash");

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

/**
 * Searches the programNode to find the requireJS modules.
 *
 * @param programNode {Node} The programNode node
 * @return {Expression[]} The list of modules in the order of appearance in the astNode
 */
function getModuleNodes (programNode) {
  // Immediately-invoked function expression
  var results = esquery.query(programNode, "Program > ExpressionStatement > CallExpression > FunctionExpression");
  if (results.length !== 1) {
    throw new Error("Expected exactly one IIFE at the root");
  }
  var iife = results[0];
  var iifeBody = iife.body;

  if (iifeBody.type !== "BlockStatement") {
    throw new Error("Expected IIFE body to be a block statement");
  }

  var iifeNodes = iifeBody.body;

  var defineCalls = esquery.query(iifeBody, "CallExpression[callee.type=Identifier][callee.name=define]");

  return _.map(defineCalls, describeDefineCall);
}

function describeDefineCall(defineCallNode) {
  var args = defineCallNode.arguments;
  if (args.length > 1 && args[0].type === "Literal" && typeof args[0].value === "string") {
    return {id: args[0].value, ast: defineCallNode};
  }
  return {id: null, ast: defineCallNode};
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

function getModulePath(id, options) {
  var modulePath = path.resolve(options.outputDir, id);
  if (true) { // TODO: check if there is a need to add the extension ?
    modulePath = modulePath + "." + options.fileExtension;
  }
  if (modulePath.indexOf(options.outputDir) !== 0) {
    throw new Error("ModulePath MUST be in outputDir");
  }
  return modulePath;
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
      var promises = _.map(moduleDescriptors, function(md, idx) {
        var id;
        if (md.id === null) {
          id = path.join(options.unresolvedDir, String(idx));
        } else {
          id = md.id;
        }
        var filePath = getModulePath(id, options);
        return writeAstNode(filePath, md.ast);
      });
      return Bluebird.all(promises);
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
      var moduleDescriptors = getModuleNodes(program);
      console.log("Require modules: " + moduleDescriptors.length);
      return writeModules(moduleDescriptors, options);
    });
}

exports.decompile = decompile;
exports.default = decompile;
