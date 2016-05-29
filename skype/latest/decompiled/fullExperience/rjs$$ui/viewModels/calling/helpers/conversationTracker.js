define("ui/viewModels/calling/helpers/conversationTracker", [
  "require",
  "exports",
  "module",
  "lodash-compat"
], function (e, t) {
  var n = e("lodash-compat"), r;
  t.init = function () {
    r = [];
  };
  t.addP2PConversation = function (t) {
    r.push(t);
  };
  t.isP2PConversation = function (t) {
    return n.some(r, function (e) {
      return e === t;
    });
  };
});
