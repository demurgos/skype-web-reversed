define("utils/chat/urlParser", [], function () {
  return {
    getParam: function (e, t) {
      var n = decodeURIComponent(e), r = new RegExp("(" + t + ")=([^&]+)"), i = n.match(r);
      return i && i[2] ? i[2] : undefined;
    },
    getRoute: function (e) {
      var t = new RegExp(/index[^#]*#(.+)\//), n = e && e.match(t);
      return n && n[1] ? n[1] : undefined;
    },
    isHttps: function (e) {
      return /^https:/.test(e);
    },
    isYoutubeLink: function (e) {
      var t = /(?:youtube\.com|youtu\.be)\/watch(?:\?|\&|&amp;)v=([\w-]{11})/.exec(e);
      return t || (t = /(?:youtube\.com|youtu\.be)\/([\w-]{11})/.exec(e)), t ? !0 : !1;
    }
  };
})
