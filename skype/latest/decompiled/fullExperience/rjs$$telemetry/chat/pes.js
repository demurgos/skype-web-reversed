define("telemetry/chat/pes", [
  "require",
  "lodash-compat",
  "constants/common",
  "swx-utils-common",
  "experience/settings",
  "ui/telemetry/telemetryClient"
], function (e) {
  function o() {
    function e(e, r) {
      var i = t.find(r, function (t) {
        return t.item.id === e;
      });
      return i ? (r.splice(r.indexOf(i), 1), i) : {
        type: n.telemetry.pes.source.TYPED,
        section: n.telemetry.pes.UNKNOWN,
        tabName: n.telemetry.pes.UNKNOWN,
        tabIndex: n.telemetry.pes.UNKNOWN
      };
    }
    this.emoticonsSentInMessage = function (o, u) {
      var a = r.create();
      o.forEach(function (t) {
        var r = e(t, u);
        s.get().sendEvent(i.telemetry.uiTenantToken, n.telemetry.pes.eventName.EMO_SENT, {
          message_id: a + "",
          emo_id: t + "",
          emo_source: r.type + "",
          emo_section: r.section + "",
          emo_tab_name: r.tabName + "",
          emo_tab_index: r.tabIndex + ""
        });
      });
    }, this.mojiPlayed = function (t, r) {
      s.get().sendEvent(i.telemetry.uiTenantToken, n.telemetry.pes.eventName.MOJI_PLAYED, {
        moji_id: t.id + "",
        moji_name: t.pickerTitle + "",
        cause: r + ""
      });
    }, this.mojiSent = function (t, r) {
      s.get().sendEvent(i.telemetry.uiTenantToken, n.telemetry.pes.eventName.MOJI_SENT, {
        moji_id: t.id + "",
        moji_name: t.pickerTitle + "",
        moji_source: r.type + "",
        moji_section: r.section + "",
        moji_tab_name: r.tabName + "",
        moji_tab_index: r.tabIndex + ""
      });
    }, this.imageSent = function (t, r) {
      s.get().sendEvent(i.telemetry.uiTenantToken, n.telemetry.pes.eventName.IMAGE_SENT, {
        image_id: t.id + "",
        image_query: r.query + "",
        image_picker_index: t.pickerIndex + "",
        image_source: r.type + "",
        image_section: r.section + "",
        image_tab_name: r.tabName + "",
        image_tab_index: r.tabIndex + ""
      });
    };
  }
  var t = e("lodash-compat"), n = e("constants/common"), r = e("swx-utils-common").guid, i = e("experience/settings"), s = e("ui/telemetry/telemetryClient");
  return new o();
})
