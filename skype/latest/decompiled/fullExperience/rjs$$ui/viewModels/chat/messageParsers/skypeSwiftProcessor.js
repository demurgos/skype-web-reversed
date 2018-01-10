define("ui/viewModels/chat/messageParsers/skypeSwiftProcessor", [
  "require",
  "exports",
  "module",
  "ui/viewModels/chat/messageParsers/swift/swift"
], function (e, t) {
  function r(e, t) {
    this.conversation = e;
    this.message = t;
  }
  var n = e("ui/viewModels/chat/messageParsers/swift/swift");
  r.prototype.process = function (t, r) {
    return n.build(t, this.conversation, this.message, r);
  };
  t.build = function (e, t) {
    return new r(e, t);
  };
});
