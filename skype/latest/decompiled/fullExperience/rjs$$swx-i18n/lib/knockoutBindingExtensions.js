(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-i18n/lib/knockoutBindingExtensions", [
      "require",
      "exports",
      "./localization"
    ], e);
}(function (e, t) {
  function r(e) {
    e.bindingHandlers.l10n = {
      update: function (t, r, i, s, o) {
        var u = e.utils.unwrapObservable(r()), a = u.params;
        for (var f in a)
          a.hasOwnProperty(f) && typeof a[f] == "function" && (a[f] = e.utils.unwrapObservable(a[f]()));
        var l = n.fetch(u);
        e.bindingHandlers.html.update(t, function () {
          return l;
        }, i, s, o);
      }
    };
    e.bindingHandlers.l10n_attr = {
      update: function (t, r, i, s, o) {
        function l() {
          var e = {};
          return e[f] = a, e;
        }
        var u = e.utils.unwrapObservable(r()), a, f;
        for (f in u)
          u.hasOwnProperty(f) && (a = n.fetch({ key: u[f] }), e.bindingHandlers.attr.update(t, l, i, s, o));
      }
    };
  }
  var n = e("./localization");
  t.init = r;
}));
