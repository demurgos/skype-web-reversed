(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-jskype-main/lib/services/plugin/pluginEmbed", [
      "require",
      "exports",
      "swx-browser-globals",
      "swx-browser-detect",
      "swx-constants"
    ], e);
}(function (e, t) {
  function s(e) {
    var t = n.getDocument().createElement("embed");
    return t.setAttribute("type", i.PLUGIN_CONST.MIME_TYPE), t.setAttribute("tabindex", "-1"), Object.keys(e).forEach(function (n) {
      t.setAttribute(n, e[n]);
    }), t;
  }
  function o(e) {
    var t = n.getDocument(), r = t.createElement("object");
    return Object.keys(e).forEach(function (n) {
      var i = t.createElement("param");
      i.setAttribute("name", n);
      i.setAttribute("value", e[n]);
      r.appendChild(i);
    }), r.setAttribute("tabindex", "-1"), r.setAttribute("type", i.PLUGIN_CONST.MIME_TYPE), r;
  }
  function u() {
    return f() ? "object" : "embed";
  }
  function a(e) {
    return f() ? o(e) : s(e);
  }
  function f() {
    return r["default"].getBrowserInfo().isIeEngine;
  }
  function l(e) {
    var t = e.getElementsByTagName(u())[0];
    t && e.removeChild(t);
  }
  function c(e, t, r) {
    var i = n.getDocument(), s = t ? i.getElementById(t) : i.getElementsByTagName("body")[0];
    s && (r && l(s), s.appendChild(e));
  }
  function h(e, t) {
    t && typeof t == "string" && (e.className = t);
  }
  function p(e, t, n) {
    var r = a(t || {});
    return n = n || {}, r.id = e, h(r, n.cssClass), c(r, n.parentElementId, n.removePrevious), r;
  }
  function d(e) {
    var t = n.getDocument().getElementById(e);
    t && t.parentNode && t.parentNode.removeChild(t);
  }
  var n = e("swx-browser-globals"), r = e("swx-browser-detect"), i = e("swx-constants");
  t.createComponent = p;
  t.removeComponent = d;
}));
