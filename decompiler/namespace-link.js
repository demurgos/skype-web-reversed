var estraverse = require("estraverse");

var decompilerPrefix = "nsl$$";

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
  if (varDeclMatch === null || !iife && iife.type !== "ExpressionStatement") {
    return null;
  }
  var iifeMatch = matchIIFE(iife.expression);
  if (iifeMatch === null) {
    return null;
  }
  var namespaceMatch = null;
  if (iifeMatch.arguments.length === 1) {
    namespaceMatch = matchGetOrCreateNamespace(iifeMatch.arguments[0]);
  }
  if (namespaceMatch === null || varDeclMatch !== namespaceMatch) {
    return null;
  }
  // We now know that we have a variable declaration followed by an IIFE those unique argument is a namespace and both names match.
  return {name: varDeclMatch, scope: iifeMatch.callee};
}

/**
 * Checks if the value is:
 * var foo;
 */
function matchSimpleVarDeclaration(node) {
  var isValidShape = node
    && node.type === "VariableDeclaration"
    && node.kind === "var"
    && (
      node.declarations
      && node.declarations.length === 1
      && (
        node.declarations[0]
        && node.declarations[0].type === "VariableDeclarator"
        && node.declarations[0].init === null
        && (
          node.declarations[0].id
          && node.declarations[0].id.type === "Identifier"
          && typeof node.declarations[0].id.name === "string"
        )
      )
    );
  return isValidShape ? node.declarations[0].id.name : null;
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
 * Checks the pattern:
 * foo || (foo = {})
 */
function matchGetOrCreateNamespace(node) {
  var isvalidShape = node
    && node.type === "LogicalExpression"
    && node.operator === "||"
    && (
      node.left
      && node.left.type === "Identifier"
      && typeof node.right.left.name === "string"
    )
    && (
      node.right
      && node.right.type === "AssignmentExpression"
      && node.right.operator === "="
      && (
        node.right.left
        && node.right.left.type === "Identifier"
        && typeof node.right.left.name === "string"
      )
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

  var isValidValue = node.left.name === node.right.left.name; // The identifier name should be the same
  return isValidValue ? node.left.name : null;
}

function getNamespaceLinkRoots (programNode) {
  estraverse.traverse(programNode, {
    enter: function(node, parent){
      if (!parent || parent.type !== "BlockStatement" || !Array.isArray(parent.body)) {
        return undefined;
      }
      var prev = null;
      var idx = parent.body.indexOf(node);
      if (idx >= 1) {
        prev = parent.body[idx - 1];
      }
      if (prev === null) {
        return undefined;
      }
      var matchNamespace = matchNamespaceLinkRoot(prev, node);
      if (matchNamespace === null) {
        return undefined;
      }
      console.log(matchNamespace.name);
    }
  });
}

function decompile(programNode, options) {
  var namespaceLinkRoots = getNamespaceLinkRoots(programNode);
  return {program: programNode, moduleDescriptors: []};
}

exports.decompile = decompile;
