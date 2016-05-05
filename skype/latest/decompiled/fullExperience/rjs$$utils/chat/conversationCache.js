define("utils/chat/conversationCache", [
  "require",
  "exports",
  "module"
], function (e, t) {
  var n = [];
  t.forModel = function (e) {
    var t = n.filter(function (t) {
      return t.model === e;
    })[0];
    return t || (t = { model: e }, n.push(t)), t;
  };
})
