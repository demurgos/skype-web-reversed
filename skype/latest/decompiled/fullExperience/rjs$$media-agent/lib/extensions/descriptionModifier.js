(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("media-agent/lib/extensions/descriptionModifier", [
      "require",
      "exports",
      "microsoft-sdp-transform",
      "../common/formatParameters"
    ], e);
}(function (e, t) {
  var n = e("microsoft-sdp-transform"), r = e("../common/formatParameters"), i = function () {
      function e(e) {
        this.logger = e;
        this.logger = this.logger.createChild("rembModifier");
      }
      return e.prototype.getControlItem = function () {
        return this.controlItem;
      }, e.prototype.setControlItem = function (e) {
        this.controlItem = e;
      }, e.prototype.dispose = function () {
        this.controlItem = null;
      }, e.prototype.setVideoControlMessage = function (e) {
        this.controlItem = this.messageToControlItem(e);
      }, e.prototype.modifyDescriptor = function (e) {
        if (!this.controlItem)
          return;
        var t = n.parse(e.sdp);
        if (!t.media[1]) {
          this.logger.warn("video modality is disabled, skipping sdp modification, ", e);
          return;
        }
        if (!t.media[1].bandwidth) {
          var r = {
            limit: this.controlItem.bandwidth,
            type: "AS"
          };
          t.media[1].bandwidth = [r];
        } else
          t.media[1].bandwidth[0].limit = this.controlItem.bandwidth;
        return e.sdp = n.write(t), e;
      }, e.prototype.messageToControlItem = function (e) {
        var t = r["default"].build(e.controlVideoStreaming.controlInfo[0].fmtParams), n = "max-br", i = 1.2;
        if (!t || !t.contains(n))
          return;
        var s = Math.round(+t.get(n) * i);
        return {
          sourceId: e.controlVideoStreaming.controlInfo[0].sourceId,
          streamMsid: e.controlVideoStreaming.controlInfo[0].streamMsid,
          bandwidth: s
        };
      }, e;
    }();
  t.BandwidthControlModifier = i;
}));
