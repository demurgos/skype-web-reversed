define("ui/viewModels/chat/messageParsers/skypeSwiftProcessor", [
  "require",
  "exports",
  "module",
  "lodash-compat",
  "utils/chat/messageSanitizer"
], function (e, t) {
  function s(e) {
    function t(e) {
      if (!e)
        return null;
      var t = i[e];
      if (t)
        return t;
      if (!/^#/.test(e))
        return "#" + e;
    }
    function s(e) {
      e.themeColor = t(e.themeColor), e.title = e.title ? r.getMessageSanitizedContent(e.title) : null, e.text = e.text ? r.getMessageSanitizedContent(e.text) : null, e.sections = e.sections || [], e.buttons = f(e.buttons || []);
    }
    function o(e) {
      e.carousel = !1, e.autoCarousel = !1, e.layout = null, e.title = e.title ? r.getMessageSanitizedContent(e.title) : null, e.subtitle = e.subtitle ? r.getMessageSanitizedContent(e.subtitle) : null, e.text = e.text ? r.getMessageSanitizedContent(e.text) : null, e.barColor = t(e.barColor), e.themeColor = t(e.themeColor), e.rating = null, e.facts = n.isArray(e.facts) ? n.filter(e.facts, l).map(c) : [], e.images = n.isArray(e.images) ? n.filter(e.images, h) : [], e.tap = null, e.buttons = f(e.buttons || []);
    }
    function u(t) {
      switch (t.type) {
      case "imBack":
        t.clickHandler = function () {
          return e.chatService.sendMessage(t.message);
        };
        break;
      default:
        t.isLink = !0;
      }
    }
    function a(e) {
      e.label = e.label ? r.getMessageSanitizedContent(e.label) : null;
    }
    function f(e) {
      var t = [];
      return n.isArray(e) ? (e.forEach(function (e) {
        if (!n.isArray(e))
          return;
        e.forEach(function (e) {
          a(e), u(e);
        }), e.length > 0 && t.push(e);
      }), t) : t;
    }
    function l(e) {
      return e.key && e.value;
    }
    function c(e) {
      return {
        key: r.getMessageSanitizedContent(e.key),
        value: r.getMessageSanitizedContent(e.value)
      };
    }
    function h(e) {
      return !!e.image;
    }
    return {
      process: function (t) {
        var r = n.clone(t, !0);
        return s(r), r.sections.forEach(o), r;
      }
    };
  }
  var n = e("lodash-compat"), r = e("utils/chat/messageSanitizer"), i = {
      good: "#66CC33",
      warning: "#F2CB1D",
      bad: "#CC293D"
    };
  t.build = function (e) {
    return new s(e);
  };
})
