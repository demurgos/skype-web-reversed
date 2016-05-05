define("ui/viewModels/chat/messageParsers/swiftCard", [
  "require",
  "exports",
  "module",
  "lodash-compat",
  "vendor/knockout",
  "ui/viewModels/chat/messageParsers/skypeSwiftProcessor"
], function (e, t) {
  var n = e("lodash-compat"), r = e("vendor/knockout"), i = e("ui/viewModels/chat/messageParsers/skypeSwiftProcessor");
  t.parse = function (e, t, s) {
    if (!/^<swiftcard/i.test(t._originalContent))
      return;
    var o = new DOMParser(), u = o.parseFromString(t._originalContent, "text/xml"), a, f, l, c, h;
    a = n.find(u.childNodes, function (e) {
      return e.nodeName.toLocaleLowerCase() === "swiftcard";
    });
    if (!a)
      return;
    f = n.find(a.attributes, function (e) {
      return e.nodeName.toLocaleLowerCase() === "swift";
    });
    if (!f)
      return r.observable(a.textContent);
    try {
      h = decodeURIComponent(f.textContent);
    } catch (p) {
      if (p.message !== "URI malformed")
        return r.observable(a.textContent);
      h = f.textContent;
    }
    try {
      l = JSON.parse(h);
    } catch (p) {
      return r.observable(a.textContent);
    }
    return c = i.build(s), e.isDisjoined = !0, e.customMessageClasses = "swiftCard", e.contentTemplate = "skypeSwiftCardMessageContentTemplate", e.swiftCard = c.process(l), r.observable(a.textContent);
  };
})
