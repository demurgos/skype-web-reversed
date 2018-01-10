define("ui/viewModels/chat/narrator", [
  "require",
  "lodash-compat",
  "utils/common/accessibility",
  "swx-constants",
  "swx-i18n",
  "swx-utils-common",
  "swx-utils-common",
  "swx-utils-chat",
  "utils/common/disposableMixin",
  "swx-utils-chat"
], function (e) {
  function c() {
    function s() {
      e.narrationLog().length >= l && e.narrationLog.splice(0, e.narrationLog().length - (l - 1));
      e.narrationLog().forEach(function (e) {
        e.visible(!1);
      });
    }
    function a(n) {
      return t.any(e.narrationLog(), function (e) {
        return e.key != null && e.key === n;
      });
    }
    function c(n, r) {
      var o, l;
      if (r && a(r.key))
        return;
      s();
      switch (!0) {
      case t.isFunction(n):
        o = n();
        break;
      case t.isObject(n) && n.hasOwnProperty("key"):
        o = i.fetch(n);
        break;
      default:
        o = n.toString();
      }
      l = u.stripHTML(o);
      e.narrationLog.push({
        message: l,
        timestamp: f.getDate(),
        visible: e.observable(!0),
        key: r && r.key
      });
    }
    var e = this;
    this.narrationLog = this.observableArray().extend({ deferred: !0 });
    this.dispose = function () {
    };
    this.registerDisposable(n.on(r.events.browser.NARRATOR_ANNOUNCE, function (e, n) {
      o.execute(t.partial(c, e, n), null, !1);
    }));
  }
  var t = e("lodash-compat"), n = e("utils/common/accessibility").narrator, r = e("swx-constants").COMMON, i = e("swx-i18n").localization, s = e("swx-utils-common").builderMixin, o = e("swx-utils-common").async, u = e("swx-utils-chat").messageSanitizer, a = e("utils/common/disposableMixin"), f = e("swx-utils-chat").dateTime, l = 5;
  return t.extend(c.prototype, a), t.extend(c, s), c;
});
