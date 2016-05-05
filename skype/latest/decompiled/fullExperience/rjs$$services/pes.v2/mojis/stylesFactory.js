define("services/pes.v2/mojis/stylesFactory", [
  "require",
  "services/pes/constants"
], function (e) {
  function n() {
    function n(e) {
      var n = e.thumbnailUrl, r = t.frameHeights.moji.THUMBNAIL, i = "\n.swx span.moji.id_" + e.id + " span.mojiThumbnail \n";
      return i += "{\n", i += " -ms-high-contrast-adjust: none;\n", i += " background-image: url('" + n + "'); \n", i += " height: " + r + "px; \n", i += " background-size: 100%; \n", i += "}", i;
    }
    function r(e) {
      var t = e.thumbnailUrl, n = "\n.swx span.moji.id_" + e.id + " span.keyframe \n";
      return n += "{\n", n += " -ms-high-contrast-adjust: none;\n", n += " background-image: url('" + t + "'); \n", n += " height: 100%; \n", n += " background-size: 100%; \n", n += " border-radius: 8px; \n", n += " display: block; \n", n += "}", n;
    }
    var e = this;
    e.create = function (e) {
      var t = n(e);
      return t += r(e), t;
    };
  }
  var t = e("services/pes/constants");
  return new n();
})
