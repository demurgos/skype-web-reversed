define("services/pes/emoticons/stylesFactory", [
  "require",
  "services/pes/constants",
  "services/pes/emoticons/styleKeyFrameFactory",
  "services/pes/emoticons/styleDefinitionFactory"
], function (e) {
  function s() {
    function s(e) {
      var n = e.media.default, r = (n.firstFrame < n.framesCount ? n.firstFrame : n.framesCount - 1) || 0;
      e.styleDef = {
        frameCount: n.framesCount,
        firstFrame: r,
        duration: n.framesCount / i + "s",
        smallHeight: t.frameHeights.emoticons.SMALL * n.framesCount,
        smallOffset: -r * t.frameHeights.emoticons.SMALL,
        largeHeight: t.frameHeights.emoticons.LARGE * n.framesCount,
        largeOffset: -r * t.frameHeights.emoticons.LARGE,
        extraLargeHeight: t.frameHeights.emoticons.EXTRA_LARGE * n.framesCount,
        extraLargeOffset: -r * t.frameHeights.emoticons.EXTRA_LARGE
      };
      e.styleDef.smallOffset !== 0 && (e.styleDef.smallOffset += "px");
      e.styleDef.largeOffset !== 0 && (e.styleDef.largeOffset += "px");
      e.styleDef.extraLargeOffset !== 0 && (e.styleDef.extraLargeOffset += "px");
    }
    var e = this;
    e.create = function (e) {
      s(e);
      var t = n.create(e), i = r.create(e);
      return t + i;
    };
  }
  var t = e("services/pes/constants"), n = e("services/pes/emoticons/styleKeyFrameFactory"), r = e("services/pes/emoticons/styleDefinitionFactory"), i = 24;
  return new s();
});
