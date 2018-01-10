define("ui/viewModels/chat/messageParsers/swift/image", [
  "require",
  "ui/viewModels/chat/messageParsers/swift/action",
  "vendor/knockout",
  "swx-constants",
  "utils/common/styleModeHelper",
  "ui/viewModels/chat/messageParsers/swift/utils",
  "swx-i18n",
  "experience/settings",
  "utils/common/rtlChecker"
], function (e) {
  function d(e, t, n) {
    var i;
    return t !== r.NARROW ? n ? i = l.carouselDefault : i = l.default : n ? i = l.carouselNarrow : i = l.narrow, i[e];
  }
  function v(e) {
    var t = "/v1/url/content?url=", n = a.urlPServiceHost + t, r, i, o;
    return e.url ? (e.url.indexOf(p[0]) !== -1 || e.url.indexOf(p[1]) !== -1 ? o = s.normalizeUrl(e.url) : e.url.indexOf(n) === -1 ? o = n + encodeURIComponent(e.url) : (r = n.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&"), i = new RegExp(r, "g"), o = n + encodeURIComponent(e.url.replace(i, ""))), o) : null;
  }
  function m(e, r, i, o) {
    this.contentType = o;
    this.alt = s.normalizeRichText(e.alt);
    this.url = v(e);
    this.tap = null;
    e.tap && (this.tap = s.getItemIfNotDisabled(t.build(e.tap, r, i)), this.tap && this.tap.type === t.Type.showImage && !this.tap.value && (this.tap.value = this.url));
    this.naturalSize = n.observable({
      height: 0,
      width: 0
    });
    this.uiSize = n.pureComputed(this.getUiSize.bind(this));
    this.bottomAlignment = n.observable();
    this.leftAlignment = n.observable();
    this.rightAlignment = n.observable();
    this.isImageInCarousel = n.observable(!1);
    this.url && this.loadImageSize();
  }
  var t = e("ui/viewModels/chat/messageParsers/swift/action"), n = e("vendor/knockout"), r = e("swx-constants").COMMON.styleMode, i = e("utils/common/styleModeHelper"), s = e("ui/viewModels/chat/messageParsers/swift/utils"), o = s.ContentType, u = e("swx-i18n").localization, a = e("experience/settings"), f = e("utils/common/rtlChecker"), l = {
      narrow: {},
      "default": {},
      carouselDefault: {},
      carouselNarrow: {}
    }, c = "auto", h = "px", p = [
      a.amdServiceHost,
      a.pesCDNAuthentication.cdnServiceHost
    ];
  return l.narrow[o.hero] = {
    height: 105,
    width: 188
  }, l.default[o.hero] = {
    height: 153,
    width: 272
  }, l.carouselDefault[o.hero] = {
    height: 145,
    width: 256
  }, l.carouselNarrow[o.hero] = {
    height: 105,
    width: 188
  }, l.narrow[o.thumb] = {
    height: 76,
    width: 76
  }, l.default[o.thumb] = {
    height: 112,
    width: 112
  }, l.carouselDefault[o.thumb] = {
    height: 112,
    width: 112
  }, l.carouselNarrow[o.thumb] = {
    height: 76,
    width: 76
  }, l.narrow[o.receipt] = {
    height: 76,
    width: 76
  }, l.default[o.receipt] = {
    height: 112,
    width: 112
  }, l.narrow[o.animation] = {
    height: 97,
    width: 172
  }, l.default[o.animation] = {
    height: 153,
    width: 272
  }, l.carouselDefault[o.animation] = {
    height: 153,
    width: 272
  }, l.carouselNarrow[o.animation] = {
    height: 97,
    width: 172
  }, l.narrow[o.audio] = {
    height: 97,
    width: 172
  }, l.default[o.audio] = {
    height: 153,
    width: 272
  }, l.carouselDefault[o.audio] = {
    height: 153,
    width: 272
  }, l.carouselNarrow[o.audio] = {
    height: 97,
    width: 172
  }, l.narrow[o.flex] = {
    height: 105,
    width: 188
  }, l.default[o.flex] = {
    height: 153,
    width: 272
  }, l.carouselDefault[o.flex] = {
    height: 145,
    width: 256
  }, l.carouselNarrow[o.flex] = {
    height: 105,
    width: 188
  }, m.prototype.isValid = function () {
    return !!this.url;
  }, m.prototype.loadImageSize = function () {
    var t = this, n = new Image();
    n.onload = function () {
      t.naturalSize({
        height: n.naturalHeight,
        width: n.naturalWidth
      });
    };
    n.src = this.url;
  }, m.prototype.getUiSize = function () {
    function p() {
      var e = u.width / -2 + h;
      f.isRtl() ? (t.leftAlignment(c), t.rightAlignment(e)) : (t.leftAlignment(e), t.rightAlignment(c));
    }
    function v() {
      var e = (u.height - r.height) / 2 + h;
      t.bottomAlignment(e);
    }
    function m() {
      if (s.height < s.width)
        u.width = r.width, u.height = s.height * r.width / s.width;
      else {
        u.width = s.width * r.height / s.height;
        u.height = s.height * r.height / s.height;
        var e = (r.width - u.width) / 2 + h;
        f.isRtl() ? t.rightAlignment(e) : t.leftAlignment(e);
      }
    }
    var t = this, n = i.get().currentMode(), r = d(this.contentType, n, this.isImageInCarousel()), s = this.naturalSize(), u = {
        height: 0,
        width: 0
      };
    if (s.height === 0 || s.width === 0 || r.height === 0)
      return u;
    var a = r.width / r.height, l = s.width / s.height;
    switch (this.contentType) {
    case o.hero:
      l < a ? (u.width = r.width, u.height = s.height * r.width / s.width, v()) : (u.height = r.height, u.width = s.width * r.height / s.height), p();
      break;
    case o.animation:
    case o.audio:
      l < a ? m() : (u.height = r.height, u.width = s.width * r.height / s.height);
      break;
    case o.thumb:
      l < a ? (u.height = r.height, u.width = u.height * l) : l === a ? (u.height = r.height, u.width = s.width * r.height / s.height) : (u.width = r.width, u.height = u.width / l), v(), p();
      break;
    case o.receipt:
      l < a ? (u.height = r.height, u.width = u.height * l) : l === a ? (u.height = r.height, u.width = s.width * r.height / s.height) : (u.width = r.width, u.height = u.width / l), p();
      break;
    case o.flex:
      l <= a ? l === 1 ? (u.height = r.height, u.width = r.height) : (u.width = r.width, u.height = s.height * r.width / s.width, v(), p()) : (u.height = r.height, u.width = s.width * r.height / s.height, p());
      break;
    default:
    }
    return u;
  }, m.prototype.getTitleByType = function () {
    function r() {
      var e = u.fetch({
        key: "accessibility_swift_action_prefix",
        params: { swiftAction: i(n.tap.title) }
      });
      return (n.alt ? n.alt + " " : "") + e;
    }
    function i(e) {
      return e[0].toLowerCase() + e.substring(1);
    }
    var n = this;
    switch (this.tap.type) {
    case t.Type.call:
    case t.Type.imBack:
      return r();
    case t.Type.openUrl:
      return r() + "\n\n" + this.tap.value;
    case t.Type.showImage:
      return (this.alt ? this.alt + " " : "") + i(this.tap.title);
    default:
    }
  }, {
    build: function (e, t, n, r) {
      return new m(e, t, n, r);
    },
    _prototype: m.prototype
  };
});
