var estraverse = require("estraverse");

function isStatement(node) {
  if(!node.type) {
    return false;
  }

  return node.type.slice(-9) === 'Statement' || isDeclaration(node);
}

function isDeclaration(node) {
  if(!node.type) {
    return false;
  }

  return node.type.slice(-11) === 'Declaration';
}

function isPattern(node) {
  if(!node.type) {
    return false;
  }

  return node.type.slice(-7) === 'Pattern' || isExpression(node);
}

function isExpression(node) {
  if(!node.type) {
    return false;
  }

  return node.type.slice(-10) === 'Expression' || node.type === 'Literal' || node.type === 'Identifier';
}

function isFunction(node) {
  if(!node.type) {
    return false;
  }

  return node.type.slice(0, 8) === 'Function' || node.type === 'ArrowFunctionExpression';
}

function expandVariableDeclarations (statementsList) {
  for (var i = statementsList.length - 1; i >= 0; i--) {
    var statement = statementsList[i];
    if (statement.type === "VariableDeclaration" && statement.declarations.length > 1) {
      for (var j = statement.declarations.length - 1; j >= 0; j--) {
        var declaration = statement.declarations[j];
        statementsList.splice(i + 1, 0, {
          type: "VariableDeclaration",
          kind: statement.kind,
          declarations: [declaration]
        });
      }
      statementsList.splice(i, 1);
    }
  }
}

function expandExpressionStatements (statementsList) {
  for (var i = statementsList.length - 1; i >= 0; i--) {
    var statement = statementsList[i];
    if (statement.type == "ExpressionStatement" && statement.expression.type === "SequenceExpression") {
      statementsList.splice(i, 1);
      for (var j = statement.expression.expressions.length - 1; j >= 0; j--) {
        var newStatement = {
          type: "ExpressionStatement",
          expression: statement.expression.expressions[j]
        };
        statementsList.splice(i, 0, newStatement);
      }
    }
  }
}

function expandAllExpressionStatements (root) {
  estraverse.replace (root, {
    enter: function (node) {
      if (node.type === "BlockStatement") {
        expandExpressionStatements(node.body);
        return node;
      }
    }
  })
}

/**
 * Match identifier
 */
function matchIdentifier (node) {
  return testIdentifier(node) ? {name: node.name} : null;
}

function testIdentifier (node) {
  return node && node.type === "Identifier" && typeof node.name === "string";
}

/**
 * Matches `<object>.<property>` where `object` is an identifier.
 *
 * @param node
 */
function matchSimpleMemberExpression (node) {
  if (!testSimpleMemberExpression(node)) {
    return null;
  }
  var object = matchIdentifier(node.object);
  var property = matchIdentifier(node.property);
  return {objectName: object.name, propertyName: property.name};
}

function testSimpleMemberExpression (node) {
  return node
    && node.type === "MemberExpression"
    && node.computed === false
    && testIdentifier(node.object)
    && testIdentifier(node.property);
}

/**
 * Matches `<object>.<property> = <value>` where `object` is an identifier.
 *
 * @param node
 */
function matchSimpleMemberAssignation (node) {
  if (!testSimpleMemberAssignation(node)) {
    return null;
  }
  var memberExpr = matchSimpleMemberExpression(node.left);
  return {
    objectName: memberExpr.objectName,
    propertyName: memberExpr.propertyName,
    value: node.right
  }
}

function testSimpleMemberAssignation (node) {
  return node
    && node.type === "AssignmentExpression"
    && node.operator === "="
    && testSimpleMemberExpression(node.left)
    && node.right;
}

function matchSimpleMemberIdentifierAssignation (node) {
  if (!testSimpleMemberIdentifierAssignation(node)) {
    return null;
  }
  var assignExpr = matchSimpleMemberAssignation(node);
  return {
    objectName: assignExpr.objectName,
    propertyName: assignExpr.propertyName,
    valueName: assignExpr.value.name
  }
}

function testSimpleMemberIdentifierAssignation (node) {
  return testSimpleMemberAssignation(node)
    && node.right.type === "Identifier"
    && typeof node.right.name === "string";
}

/**
 * Matches an expression statement, if you provide an expressionMatcher then it applies it on the expression.
 * @param node
 * @param matcher (optional)
 * @returns {*}
 */
function matchExpressionStatement (node, expressionMatcher) {
  if (!testExpressionStatement(node)) {
    return null;
  }
  if (expressionMatcher) {
    return expressionMatcher(node.expression);
  } else {
    return {expression: node.expression};
  }
}

function testExpressionStatement (node) {
  return node
    && node.type === "ExpressionStatement"
    && node.expression;
}

/**
 * matches `var foo = bar;` or `var foo;`
 * @param node
 */
function matchSimpleVarDeclaration (node) {
  if (!testSimpleVarDeclaration(node)) {
    return null;
  }
  return {name: node.declarations[0].id.name, value: node.declarations[0].init};
}

function testSimpleVarDeclaration (node) {
  return node
    && node.type === "VariableDeclaration"
    && node.kind === "var"
    && (
      node.declarations
      && node.declarations.length === 1
      && (
        node.declarations[0]
        && node.declarations[0].type === "VariableDeclarator"
        && "init" in node.declarations[0]
        && (
          node.declarations[0].id
          && node.declarations[0].id.type === "Identifier"
          && typeof node.declarations[0].id.name === "string"
        )
      )
    );
}

exports.isStatement = isStatement;
exports.isExpression = isExpression;
exports.expandVariableDeclarations = expandVariableDeclarations;
exports.expandAllExpressionStatements = expandAllExpressionStatements;

exports.matchExpressionStatement = matchExpressionStatement;
exports.matchSimpleMemberIdentifierAssignation = matchSimpleMemberIdentifierAssignation;
exports.matchSimpleMemberAssignation = matchSimpleMemberAssignation;
exports.matchSimpleVarDeclaration = matchSimpleVarDeclaration;

exports.testSimpleMemberExpression = testSimpleMemberExpression;
