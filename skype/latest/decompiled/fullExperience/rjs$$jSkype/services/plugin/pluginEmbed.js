define("jSkype/services/plugin/pluginEmbed", [
  "require",
  "browser/document",
  "browser/detect",
  "constants/plugin.const"
], function (e) {
  function i(e) {
    var n = t.createElement("embed");
    return n.setAttribute("type", r.MIME_TYPE), n.setAttribute("tabindex", "-1"), Object.keys(e).forEach(function (t) {
      n.setAttribute(t, e[t]);
    }), n;
  }
  function s(e) {
    var n = t.createElement("object");
    return Object.keys(e).forEach(function (r) {
      var i = t.createElement("param");
      i.setAttribute("name", r);
      i.setAttribute("value", e[r]);
      n.appendChild(i);
    }), n.setAttribute("tabindex", "-1"), n.setAttribute("type", r.MIME_TYPE), n;
  }
  function o() {
    return a() ? "object" : "embed";
  }
  function u(e) {
    return a() ? s(e) : i(e);
  }
  function a() {
    return n.getBrowserInfo().isIeEngine;
  }
  function f(e) {
    var t = e.getElementsByTagName(o())[0];
    t && e.removeChild(t);
  }
  function l(e, n, r) {
    var i = n ? t.getElementById(n) : t.getElementsByTagName("body")[0];
    i && (r && f(i), i.appendChild(e));
  }
  function c(e, t) {
    t && typeof t == "string" && (e.className = t);
  }
  var t = e("browser/document"), n = e("browser/detect"), r = e("constants/plugin.const");
  return {
    createComponent: function (t, n, r) {
      var i = u(n || {});
      return r = r || {}, i.id = t, c(i, r.cssClass), l(i, r.parentElementId, r.removePrevious), i;
    },
    removeComponent: function (n) {
      var r = t.getElementById(n);
      r && r.parentNode && r.parentNode.removeChild(r);
    }
  };
});
