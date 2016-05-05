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

exports.isStatement = isStatement;
exports.isExpression = isExpression;
