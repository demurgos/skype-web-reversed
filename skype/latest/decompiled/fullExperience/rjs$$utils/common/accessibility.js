define("utils/common/accessibility", [
  "require",
  "exports",
  "module",
  "lodash-compat",
  "swx-constants",
  "browser/dom",
  "vendor/knockout"
], function (e, t) {
  function u() {
    function i(e, r, i) {
      t.hasOwnProperty(e) && n.forEach(t[e], function (e) {
        e(r, i);
      });
    }
    var e = this, t = {};
    this.announce = function (t, n) {
      i(r.events.browser.NARRATOR_ANNOUNCE, t, n);
    };
    this.on = function (i, s) {
      if (!i || !s)
        return;
      t.hasOwnProperty(i) || (t[i] = []);
      n.any(t[i], function (e) {
        return e === s;
      }) || t[i].push(s);
      var o = n.partial(e.off, i, s);
      return {
        cancel: o,
        dispose: o
      };
    };
    this.off = function (r, i) {
      return t.hasOwnProperty(r) ? n.first(n.remove(t[r], function (e) {
        return e === i;
      })) : null;
    };
    this.removeAllListeners = function (n) {
      if (!n) {
        t = {};
        return;
      }
      if (!t.hasOwnProperty(n))
        return;
      delete t[n];
    };
  }
  var n = e("lodash-compat"), r = e("swx-constants").COMMON, i = e("browser/dom"), s = e("vendor/knockout"), o = "showFocusRing";
  t.initFocusRing = function (e) {
    e.addEventListener("keydown", function () {
      i.hasClass(e, o) || i.addClass(e, o);
    }, !1);
    e.addEventListener("mousedown", function () {
      i.removeClass(e, o);
    }, !1);
  };
  t.updateAriaLiveHtml = function (e, t) {
    if (!s.isObservable(e))
      throw new Error("Parameter must be a ko.observable.");
    e("");
    e("<span>" + t + "</span>");
  };
  t.narrator = new u();
});
