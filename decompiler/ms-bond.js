var path = require("path");
var estraverse = require("estraverse");
var _ = require("lodash");
var ast = require("./ast");

/**
 * Decompiles Microsoft Bond modules
 * @type {string}
 */

var decompilerPrefix = "msb$$";

// TODO: Massive clean-up of the following mess...

/**
 * Checks if we have the characteristic pattern:
 *
 * var foo;
 * (function(e){
 *   // ...
 * })(foo || (foo = {}));
 *
 * @param varDecl
 * @param iife
 */
function matchNamespaceLinkRoot(varDecl, iife) {
  var varDeclMatch = matchSimpleVarDeclaration(varDecl);
  var iifeMatch = matchIIFEStatement(iife);
  if (varDeclMatch === null || iifeMatch === null) {
    return null;
  }
  var namespaceMatch = null;
  if (iifeMatch.arguments.length === 1) {
    namespaceMatch = matchGetNamespaceRoot(iifeMatch.arguments[0]);
  }
  var innerName = matchInnerName(iifeMatch.callee);
  if (namespaceMatch === null || innerName == null || varDeclMatch !== namespaceMatch) {
    return null;
  }
  // We now know that we have a variable declaration followed by an IIFE those unique argument is a namespace and both names match.
  return {name: varDeclMatch, scope: iifeMatch.callee, innerName: innerName};
}

/**
 * Checks if we have the characteristic pattern:
 *
 * (function(e){
 *   // ...
 * })(parentName.foo || (parentName.foo = {}));
 * var bar = parentName.foo;
 *
 * @param varDecl
 * @param iife
 */
function matchNamespaceBranch(iife, varDecl, parentName) {
  var varDeclMatch = matchVarDeclarationFromMember(varDecl, parentName);
  var iifeMatch = matchIIFEStatement(iife);
  if (varDeclMatch === null || iifeMatch === null) {
    return null;
  }
  var namespaceMatch = null;
  if (iifeMatch.arguments.length === 1) {
    namespaceMatch = matchGetNamespaceBranch(iifeMatch.arguments[0], parentName);
  }
  var innerName = matchInnerName(iifeMatch.callee);
  if (namespaceMatch === null || innerName == null || varDeclMatch.property !== namespaceMatch) {
    return null;
  }
  return {name: namespaceMatch, scope: iifeMatch.callee, innerName: innerName};
}


/**
 * Checks if we have the characteristic pattern:
 *
 * var foo = (function(){
 *   // ...
 * })());
 * parentName.bar = foo;
 *
 * @param varDecl
 * @param iife
 */
function matchNamespaceBranchEnd(value, nsExtension, parentName) {
  var valueMatch = ast.matchSimpleVarDeclaration(value);
  var nsExtensionMatch = ast.matchExpressionStatement(nsExtension, ast.matchSimpleMemberIdentifierAssignation);
  if (valueMatch === null || nsExtensionMatch === null) {
    return null;
  }
  if (nsExtensionMatch.valueName !== valueMatch.name || nsExtensionMatch.objectName !== parentName) {
    return null;
  }
  if (matchIIFE(valueMatch.value) === null) {
    return null;
  }

  return {name: nsExtensionMatch.propertyName, value: valueMatch.value};
}

function matchInnerName (functionNode) {
  var innerName = null;
  if (
    functionNode.params
    && functionNode.params.length === 1
    && functionNode.params[0].type === "Identifier"
    && typeof functionNode.params[0].name === "string"
  ) {
    innerName = functionNode.params[0].name;
  }
  return innerName
}

/**
 * Checks if the value is:
 * var foo;
 */
function matchVarDeclaration(node) {
  var isValidShape = node
    && node.type === "VariableDeclaration"
    && node.kind === "var"
    && (
      node.declarations
      && node.declarations.length === 1
      && (
        node.declarations[0]
        && node.declarations[0].type === "VariableDeclarator"
        && (
          node.declarations[0].id
          && node.declarations[0].id.type === "Identifier"
          && typeof node.declarations[0].id.name === "string"
        )
      )
    );
  return isValidShape ? {name: node.declarations[0].id.name, init: node.declarations[0].init}  : null;
}

/**
 * Checks if the value is:
 * var foo;
 */
function matchSimpleVarDeclaration(node) {
  var match = matchVarDeclaration(node);
  return match !== null ? match.name : null;
}

function matchVarDeclarationFromMember(node, parentName) {
  var match = matchVarDeclaration(node);

  var isValidShape = match
    && (
      match.init
      && match.init.type === "MemberExpression"
      && match.init.computed === false
      && (
        match.init.object
        && match.init.object.type === "Identifier"
        && match.init.object.name === parentName
      )
      && (
        match.init.property
        && match.init.property.type === "Identifier"
        && typeof match.init.property.name === "string"
      )
    );
  return isValidShape ? {name: match.name, property: match.init.property.name} : null;
}

/**
 * Checks if the value is:
 * (function (...){...})(...)
 */
function matchIIFE (node) {
  var isValidShape = node
    && node.type === "CallExpression"
    && Array.isArray(node.arguments)
    && (
      node.callee
      && node.callee.type === "FunctionExpression"
    );
  return isValidShape ? {callee: node.callee, arguments: node.arguments} : null;
}

/**
 * Checks if the value is:
 * (function (...){...})(...)
 */
function matchIIFEStatement (node) {
  if(node &&  node.type === "ExpressionStatement") {
    var match = matchIIFE(node.expression);
    if (match !== null) {
      match.callStatement = node;
    }
    return match;
  }
  return null;
}

/**
 * Checks the pattern:
 * <expr1> || (<expr2> = {})
 */
function matchGetNamespace(node) {
  var isvalidShape = node
    && node.type === "LogicalExpression"
    && node.operator === "||"
    && node.left
    && (
      node.right
      && node.right.type === "AssignmentExpression"
      && node.right.operator === "="
      && node.right.left
      && (
        node.right.right
        && node.right.right.type === "ObjectExpression"
        && (
          node.right.right.properties
          && node.right.right.properties.length === 0
        )
      )
    );
  if (!isvalidShape) {
    return null;
  }

  return {first: node.left, fallback: node.right.left};
}

// foo || (foo = {})
function matchGetNamespaceRoot(node) {
  var matchNamespace = matchGetNamespace(node);
  if (matchNamespace === null) {
    return null;
  }
  return matchNamespace.first.type === "Identifier"
    && typeof matchNamespace.first.name === "string"
    && matchNamespace.fallback.type === "Identifier"
    && typeof matchNamespace.fallback.name === "string"
    && matchNamespace.first.name === matchNamespace.fallback.name ? matchNamespace.first.name : null;
}

// <parentName>.foo || (<parentName>.foo = {})
function matchGetNamespaceBranch(node, parentName) {
  var matchNamespace = matchGetNamespace(node);
  if (matchNamespace === null) {
    return null;
  }

  var isValidShape = ast.testSimpleMemberExpression(matchNamespace.first)
    && ast.testSimpleMemberExpression(matchNamespace.fallback)
    && matchNamespace.first.object.name === parentName
    && matchNamespace.fallback.object.name === parentName;

  return isValidShape && matchNamespace.first.property.name === matchNamespace.fallback.property.name ? matchNamespace.first.property.name : null;
}

function exploreNamespace(nsDescriptor) {
  if (nsDescriptor.type !== "root" && nsDescriptor.type !== "branch") {
    nsDescriptor.isLeaf = true;
    return [nsDescriptor];
  }

  var block = nsDescriptor.scope.body;
  if (block.type !== "BlockStatement") {
    nsDescriptor.isLeaf = true;
    return [nsDescriptor];
  }

  var body = block.body;
  ast.expandVariableDeclarations(body);
  var innerName = nsDescriptor.innerNames[nsDescriptor.innerNames.length - 1];

  var extraStatements = false;
  var subNamespaces = [];
  for (var i = 0, l = body.length; i < l; i++) {
    var match = null;
    var type = null;
    if (i < body.length - 1) {
      type = "branch";
      match = matchNamespaceBranch(body[i], body[i + 1], innerName);
      if (match === null) {
        type = "branchEnd";
        match = matchNamespaceBranchEnd(body[i], body[i + 1], innerName);
      }
    }
    if (match === null) {
      extraStatements = true;
      continue;
    }

    switch (type) {
      case "branch":
        subNs = {
          type: "branch",
          id: nsDescriptor.id + "/" + match.name,
          name: match.name,
          innerNames: nsDescriptor.innerNames.concat(match.innerName),
          varDeclarations: nsDescriptor.varDeclarations.concat(body[i + 1]),
          iifes: nsDescriptor.iifes.concat(body[i]),
          matchAll: nsDescriptor.matchAll.concat(false),
          scope: match.scope,
          isLeaf: false
        };
        break;
      case "branchEnd":
        subNs = {
          type: "branchEnd",
          id: nsDescriptor.id + "/" + match.name,
          name: match.name,
          innerNames: nsDescriptor.innerNames.concat(null),
          varDeclarations: nsDescriptor.varDeclarations.concat(body[i + 1]),
          iifes: nsDescriptor.iifes.concat(body[i]),
          matchAll: nsDescriptor.matchAll.concat(false),
          scope: match.value,
          isLeaf: true
        };
        break;
      default: throw new Error("Unknown type");
    }

    subNamespaces.push(subNs);
    i++; // ignore the VariableDeclaration
  }

  if (subNamespaces.length === 0) {
    nsDescriptor.isLeaf = true;
    return [nsDescriptor];
  }

  _.forEach(subNamespaces, function(sns) {
    sns.matchAll[sns.matchAll.length - 1] = !extraStatements;
  });

  return _.flatten(_.map(subNamespaces, exploreNamespace));
}

function getNamespaceRootDescriptor (node) {
  var parent = node._parent;
  if (!parent || parent.type !== "BlockStatement" || !Array.isArray(parent.body)) {
    return null;
  }
  var prev = null;
  var idx = parent.body.indexOf(node);
  if (idx >= 1) {
    prev = parent.body[idx - 1];
  }
  if (prev === null) {
    return null;
  }
  var matchNamespace = matchNamespaceLinkRoot(prev, node);
  if (matchNamespace === null) {
    return null;
  }
  return {varDeclaration: prev, iife: node, scope: matchNamespace.scope, name: matchNamespace.name, innerName: matchNamespace.innerName};
}

function getNamespaceRootDescriptors (programNode) {
  var roots = [];
  estraverse.traverse(programNode, {
    enter: function(node, parent){
      var nsd = getNamespaceRootDescriptor(node);
      if (nsd === null) {
        return null;
      }
      roots.push({
        type: "root",
        id: nsd.name, // Microsoft/foo/bar
        name: nsd.name, // bar
        innerNames: [nsd.innerName],
        varDeclarations: [nsd.varDeclaration],
        iifes: [nsd.iife],
        matchAll: [],
        scope: nsd.scope,
        isLeaf: false
      });
      this.skip();
    }
  });
  var namespaces = _.flatten(_.map(roots, exploreNamespace));
  return namespaces;
}

function getBranchEndModule (namespace, options) {
  if (namespace.type !== "branchEnd") {
    throw new Error("Invalid type");
  }
  var id = decompilerPrefix + (namespace.id.indexOf("microsoft") === 0 ? "$" : "") + namespace.id;
  var filepath = id + "." + options.fileExtension;
  var ast = {
    type: "AssignmentExpression",
    operator: "=",
    left: {
      type: "MemberExpression",
      computed: false,
      object: {
        type: "Identifier",
        name: "module"
      },
      property: {
        type: "Identifier",
        name: "exports"
      }
    },
    right: namespace.scope
  };

  return {filePath: path.join(options.outputDir, filepath), ast: ast, id: id};
}

function nsToModuleDescriptors (namespaces, options) {
  var ids = _.map(namespaces, function(ns) {return ns.id});
  var uIds = _.uniq(ids);
  if (ids.length !== uIds.length) {
    throw new Error("Non-unique ids");
  }
  var branchEnds = _.filter(namespaces, function(ns) {return ns.type === "branchEnd"});
  return _.map(branchEnds, function(branchEndNS) {return getBranchEndModule(branchEndNS, options);});
}

function decompile(programNode, options) {
  var namespaces = getNamespaceRootDescriptors(programNode);
  var modules = nsToModuleDescriptors(namespaces, options);
  return {program: programNode, moduleDescriptors: modules};
}

exports.decompile = decompile;
