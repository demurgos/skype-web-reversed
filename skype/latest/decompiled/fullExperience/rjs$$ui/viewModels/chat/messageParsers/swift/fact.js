define("ui/viewModels/chat/messageParsers/swift/fact", [
  "require",
  "ui/viewModels/chat/messageParsers/swift/utils"
], function (e) {
  function n(e) {
    this.key = t.normalizeRichText(e.key);
    this.value = t.normalizeRichText(e.value);
  }
  var t = e("ui/viewModels/chat/messageParsers/swift/utils");
  return n.prototype.isValid = function () {
    return !!this.key || !!this.value;
  }, {
    build: function (e) {
      return new n(e);
    }
  };
});
