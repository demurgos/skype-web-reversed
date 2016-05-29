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
        var u = e.utils.unwrapObservable(r()), a = u.params, f, l;
        for (l in a)
          a.hasOwnProperty(l) && typeof a[l] == "function" && (a[l] = e.utils.unwrapObservable(a[l]()));
        f = n.fetch(u);
        e.bindingHandlers.html.update(t, function () {
          return f;
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
