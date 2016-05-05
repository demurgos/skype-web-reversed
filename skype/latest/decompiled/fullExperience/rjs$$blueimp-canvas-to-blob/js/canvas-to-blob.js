function (e) {
  var t = e.HTMLCanvasElement && e.HTMLCanvasElement.prototype, n = e.Blob && function () {
      try {
        return Boolean(new Blob());
      } catch (e) {
        return !1;
      }
    }(), r = n && e.Uint8Array && function () {
      try {
        return new Blob([new Uint8Array(100)]).size === 100;
      } catch (e) {
        return !1;
      }
    }(), i = e.BlobBuilder || e.WebKitBlobBuilder || e.MozBlobBuilder || e.MSBlobBuilder, s = /^data:((.*?)(;charset=.*?)?)(;base64)?,/, o = (n || i) && e.atob && e.ArrayBuffer && e.Uint8Array && function (e) {
      var t, o, u, a, f, l, c, h, p;
      t = e.match(s);
      if (!t)
        throw new Error("invalid data URI");
      o = t[2] ? t[1] : "text/plain" + (t[3] || ";charset=US-ASCII"), u = !!t[4], a = e.slice(t[0].length), u ? f = atob(a) : f = decodeURIComponent(a), l = new ArrayBuffer(f.length), c = new Uint8Array(l);
      for (h = 0; h < f.length; h += 1)
        c[h] = f.charCodeAt(h);
      return n ? new Blob([r ? c : l], { type: o }) : (p = new i(), p.append(l), p.getBlob(o));
    };
  e.HTMLCanvasElement && !t.toBlob && (t.mozGetAsFile ? t.toBlob = function (e, n, r) {
    r && t.toDataURL && o ? e(o(this.toDataURL(n, r))) : e(this.mozGetAsFile("blob", n));
  } : t.toDataURL && o && (t.toBlob = function (e, t, n) {
    e(o(this.toDataURL(t, n)));
  })), typeof define == "function" && define.amd ? define("blueimp-canvas-to-blob/js/canvas-to-blob", [], function () {
    return o;
  }) : typeof module == "object" && module.exports ? module.exports = o : e.dataURLtoBlob = o;
}(window)
