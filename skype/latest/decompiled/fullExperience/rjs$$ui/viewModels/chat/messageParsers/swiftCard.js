define("ui/viewModels/chat/messageParsers/swiftCard", [
  "require",
  "exports",
  "module",
  "lodash-compat",
  "vendor/knockout",
  "ui/viewModels/chat/messageParsers/skypeSwiftProcessor",
  "swx-utils-chat"
], function (e, t) {
  var n = e("lodash-compat"), r = e("vendor/knockout"), i = e("ui/viewModels/chat/messageParsers/skypeSwiftProcessor"), s = e("swx-utils-chat").messageSanitizer;
  t.parse = function (e, t, o) {
    var u = /^<swiftcard/i.test(t._originalContent) ? t._originalContent : t.html();
    if (!/^<swiftcard/i.test(u))
      return;
    var a = new DOMParser(), f = a.parseFromString(u, "text/xml"), l, c, h, p, d;
    l = n.find(f.childNodes, function (e) {
      return e.nodeName.toLocaleLowerCase() === "swiftcard";
    });
    if (!l)
      return;
    c = n.find(l.attributes, function (e) {
      return e.nodeName.toLocaleLowerCase() === "swift";
    });
    if (!c)
      return r.observable(s.getMessageSanitizedContent(l.textContent));
    try {
      d = decodeURIComponent(c.textContent);
    } catch (v) {
      if (v.message !== "URI malformed")
        return r.observable(s.getMessageSanitizedContent(l.textContent));
      d = c.textContent;
    }
    try {
      h = JSON.parse(d);
    } catch (v) {
      return r.observable(s.getMessageSanitizedContent(l.textContent));
    }
    p = i.build(o, e);
    var m = p.process(h, t.sender);
    return e.isDisjoined = !0, e.contentTemplate = "swiftCardMessageContentTemplate", e.swift = m, e.customMessageClasses = "swiftCard " + (m.isSupported() ? m.type.toLowerCase() : "unsupported") + (m.isValid() ? "" : " invalid"), n.isUndefined(m.cards) || (e.customMessageClasses += m.cards.length === 1 ? " single" : "", e.customMessageClasses += m.cards.length === 2 ? " double" : ""), r.observable(s.getMessageSanitizedContent(l.textContent));
  };
});
