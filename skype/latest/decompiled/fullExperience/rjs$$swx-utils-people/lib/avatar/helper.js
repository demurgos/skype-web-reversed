(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-utils-people/lib/avatar/helper", [
      "require",
      "exports"
    ], e);
}(function (e, t) {
  var n = ".AvatarInitials text", r = [
      "rgb(153, 180, 51)",
      "rgb(107, 165, 231)",
      "rgb(231, 115, 189)",
      "rgb(0, 163, 0)",
      "rgb(30, 113, 69)",
      "rgb(255, 0, 151)",
      "rgb(126, 56, 120)",
      "rgb(96, 60, 186)",
      "rgb(29, 29, 29)",
      "rgb(0, 171, 169)",
      "rgb(45, 137, 239)",
      "rgb(43, 87, 151)",
      "rgb(218, 83, 44)",
      "rgb(185, 29, 71)",
      "rgb(238, 17, 17)"
    ], i = function () {
      function e(e) {
        this.document = e;
      }
      return e.prototype.showColoredInitials = function (e, t) {
        t === void 0 && (t = null);
        if (!t || !this.isValidDisplayName(t)) {
          this.resetInitials(e);
          return;
        }
        this.setBackgroundColor(e, t);
        this.setInitials(e, t);
      }, e.prototype.setBackgroundColor = function (e, t) {
        var n = e.querySelector("img");
        n.style.display = "none";
        e.style.backgroundColor = this.getBackgroundColor(t);
      }, e.prototype.setInitials = function (e, t) {
        var r = e.querySelector(n);
        if (!r) {
          var i = this.document.createElementNS("http://www.w3.org/2000/svg", "svg"), s = i.namespaceURI;
          i.setAttribute("viewBox", "0 0 47 47");
          i.setAttribute("class", "AvatarInitials");
          r = this.document.createElementNS(s, "text");
          r.setAttribute("x", "50%");
          r.setAttribute("y", "65%");
          i.appendChild(r);
          e.appendChild(i);
        }
        r.textContent = this.getInitials(t);
      }, e.prototype.isValidDisplayName = function (e) {
        return !!e && !!this.filterDisplayName(e);
      }, e.prototype.resetInitials = function (e) {
        var t = e.querySelector(n), r = e.querySelector("img");
        e.style.backgroundColor = "";
        r.style.display = "block";
        t && (t.textContent = "");
      }, e.prototype.getBackgroundColor = function (e) {
        var t = 0;
        for (var n = e.length - 1; n >= 0; n--) {
          var i = e.charCodeAt(n), s = n % 8;
          t ^= (i << s) + (i >> 8 - s);
        }
        return r[t % r.length];
      }, e.prototype.getInitials = function (e) {
        var t = "";
        e = this.filterDisplayName(e);
        var n = e.split(" ");
        return n.length === 2 ? (t += n[0][0].toUpperCase(), t += n[1][0].toUpperCase()) : n.length === 3 ? (t += n[0][0].toUpperCase(), t += n[2][0].toUpperCase()) : n.length !== 0 && (t += n[0][0].toUpperCase()), t;
      }, e.prototype.filterDisplayName = function (e) {
        var t = e.replace(/\(([^)]*)\)/gi, "");
        return t = t.replace(/[^ A-Za-z0-9]/gi, ""), t = t.replace(/\s+/gi, " "), t && (t = t.trim()), t;
      }, e;
    }();
  t.__esModule = !0;
  t["default"] = i;
}));
