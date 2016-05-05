var path = require("path");
var decompiler = require("../decompiler/index");

var projectRoot = path.resolve(__dirname, "..");
var latestVersionRoot = path.resolve(projectRoot, "skype", "latest");
var filePath = path.resolve(latestVersionRoot, "raw", "fullExperience.min.js");
var outputDir = path.resolve(latestVersionRoot, "decompiled", "fullExperience");

decompiler.decompile({
  filePath: filePath,
  outputDir: outputDir
});
