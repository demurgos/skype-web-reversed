var decompilerPrefix = "nsl$$";

function decompile (programNode, options) {
  return {program: programNode, moduleDescriptors: []};
}

exports.decompile = decompile;
