define("utils/common/focusRestrictor", [
  "require",
  "exports",
  "module",
  "lodash-compat"
], function (e, t) {
  function r(e, t) {
    var r = this, i = {};
    r.restrict = function () {
      var s, o = [], u = "[tabindex=\"0\"], a, button, input, select, textarea";
      s = Array.prototype.slice.call(document.querySelectorAll(u));
      t && t.forEach(function (e) {
        var t = document.querySelector(e);
        t && (o = Array.prototype.concat.call(o, Array.prototype.slice.call(t.querySelectorAll(u))));
      });
      n.difference(s, o).forEach(function (t) {
        var n = t.getAttribute("tabindex"), r = "-100";
        !e.contains(t) && n !== r && (i[Object.keys(i).length] = {
          element: t,
          tabIndex: n
        }, t.setAttribute("tabindex", r));
      });
    };
    r.restore = function () {
      Object.keys(i).forEach(function (e) {
        var t = i[e];
        t.tabIndex ? t.element.setAttribute("tabindex", t.tabIndex) : t.element.removeAttribute("tabindex");
      });
      i = {};
    };
  }
  var n = e("lodash-compat");
  t.build = function (t, n) {
    return new r(t, n);
  };
});
