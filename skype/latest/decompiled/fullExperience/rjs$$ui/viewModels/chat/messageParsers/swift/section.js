define("ui/viewModels/chat/messageParsers/swift/section", [
  "require",
  "ui/viewModels/chat/messageParsers/swift/action",
  "swx-i18n",
  "ui/viewModels/chat/messageParsers/swift/image",
  "ui/viewModels/chat/messageParsers/swift/utils"
], function (e) {
  function s(e, n, s, o) {
    var u = r.build(e.image || {}, n, s, o);
    this.title = i.normalizeRichText(e.title);
    this.subtitle = i.normalizeRichText(e.subtitle);
    this.text = i.normalizeRichText(e.text);
    this.price = i.normalizeRichText(e.price);
    this.images = i.filterOutNotValidItems(e.images, function (e) {
      return r.build(e, n, s, o);
    });
    this.images.length === 0 && u.isValid() && this.images.push(u);
    this.tap = e.tap ? i.getItemIfNotDisabled(t.build(e.tap, n, s)) : null;
    this.expandedText = function () {
      return this.title && this.subtitle ? "" : this.title || this.subtitle ? "expandedTextOnce" : "expandedTextTwice";
    };
  }
  var t = e("ui/viewModels/chat/messageParsers/swift/action"), n = e("swx-i18n").localization, r = e("ui/viewModels/chat/messageParsers/swift/image"), i = e("ui/viewModels/chat/messageParsers/swift/utils");
  return s.prototype.isValid = function () {
    return !!this.title || !!this.subtitle || !!this.text || this.images.length !== 0;
  }, s.prototype.getTitleByType = function () {
    function i() {
      return n.fetch({
        key: "accessibility_swift_action_prefix",
        params: { swiftAction: s(r.tap.title) }
      });
    }
    function s(e) {
      return e[0].toLowerCase() + e.substring(1);
    }
    var r = this;
    switch (this.tap.type) {
    case t.Type.call:
    case t.Type.imBack:
      return i();
    case t.Type.openUrl:
      return i() + "\n\n" + this.tap.value;
    default:
    }
  }, {
    build: function (e, t, n, r) {
      return new s(e, t, n, r);
    }
  };
});
