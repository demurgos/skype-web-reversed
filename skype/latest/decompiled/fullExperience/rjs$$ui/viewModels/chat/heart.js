define("ui/viewModels/chat/heart", [
  "require",
  "exports",
  "module",
  "vendor/knockout",
  "swx-i18n"
], function (e, t) {
  function i(e, t) {
    function a() {
      u.forEach(function (e) {
        t.element.addEventListener(e, c, !1);
      });
    }
    function f() {
      u.forEach(function (e) {
        t.element.removeEventListener(e, c, !1);
      });
    }
    function l() {
      s.dispose();
      h(!0);
      a();
    }
    function c() {
      h(!1);
      s = i.heartsCount.subscribe(l);
      f();
    }
    function h(e) {
      var t = {
        hasLikes: !!i.heartsCount(),
        hasMyLike: i.isHeartedByMe(),
        anim: !!e
      };
      i.heartCss(t);
    }
    var i = this, s, o = e.heartsVM, u = [
        "webkitAnimationEnd",
        "animationend",
        "oanimationend"
      ];
    i.onClickHandler = o.heartMessage;
    i.heartsCount = o.heartsCount;
    i.isHeartedByMe = o.isHeartedByMe;
    i.heartCss = n.observable({});
    i.heartButtonLabel = n.computed(function () {
      return i.isHeartedByMe() ? r.fetch({ key: "hearts_accessibility_unlike" }) : r.fetch({ key: "hearts_accessibility_like" });
    });
    i.dispose = function () {
      i.heartButtonLabel.dispose();
      f();
      s.dispose();
    };
    h(!1);
    s = o.heartsCount.subscribe(l);
  }
  var n = e("vendor/knockout"), r = e("swx-i18n").localization;
  t.build = function (e, t) {
    return new i(e, t);
  };
});
