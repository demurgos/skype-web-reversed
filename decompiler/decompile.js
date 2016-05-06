var fs = require("fs-extra");
var path = require("path");
var Bluebird = require("bluebird");
var esprima = require("esprima");
var escodegen = require("escodegen");
var _ = require("lodash");

var requirejs = require("./requirejs");
var msBond = require("./ms-bond");

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

      var requirejsResult = requirejs.decompile(program, options);
      program = requirejsResult.program;

      var msBondResult = msBond.decompile(program, options);
      program = msBondResult.program;

      return Bluebird.join(
        writeModules(requirejsResult.moduleDescriptors, options),
        writeModules(msBondResult.moduleDescriptors, options),
        function(){
          var programPath = path.resolve(outputDir, options.unresolvedDir, path.basename(filePath));
          return writeAstNode(programPath, program);
        });
    });
}

exports.decompile = decompile;
exports.default = decompile;
