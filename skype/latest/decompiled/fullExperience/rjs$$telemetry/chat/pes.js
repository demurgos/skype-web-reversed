define("telemetry/chat/pes", [
  "require",
  "lodash-compat",
  "swx-constants",
  "swx-utils-common",
  "experience/settings",
  "ui/telemetry/telemetryClient",
  "swx-service-locator-instance",
  "utils/common/styleModeHelper"
], function (e) {
  function a() {
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
    function a(e) {
      return e ? e : n.telemetry.NOT_AVAILABLE;
    }
    this.emoticonsSentInMessage = function (o, u) {
      var a = r.create();
      o.forEach(function (t) {
        var r = e(t, u);
        s.get().sendEvent(i.telemetry.chatTenantToken, n.telemetry.pes.eventName.EMO_SENT, {
          message_id: a + "",
          emo_id: t + "",
          emo_source: r.type + "",
          emo_section: r.section + "",
          emo_tab_name: r.tabName + "",
          emo_tab_index: r.tabIndex + ""
        });
      });
    };
    this.mojiPlayed = function (t, r) {
      s.get().sendEvent(i.telemetry.chatTenantToken, n.telemetry.pes.eventName.MOJI_PLAYED, {
        moji_id: t.id + "",
        moji_name: t.pickerTitle + "",
        cause: r + ""
      });
    };
    this.mojiSent = function (t, r) {
      s.get().sendEvent(i.telemetry.chatTenantToken, n.telemetry.pes.eventName.MOJI_SENT, {
        moji_id: t.id + "",
        moji_name: t.pickerTitle + "",
        moji_source: r.type + "",
        moji_section: r.section + "",
        moji_tab_name: r.tabName + "",
        moji_tab_index: r.tabIndex + ""
      });
    };
    this.imageSent = function (t, r) {
      s.get().sendEvent(i.telemetry.chatTenantToken, n.telemetry.pes.eventName.IMAGE_SENT, {
        image_id: t.id + "",
        image_query: a(r.query) + "",
        image_picker_index: t.pickerIndex + "",
        image_source: r.type + "",
        image_section: r.section + "",
        image_tab_name: r.tabName + "",
        image_tab_index: r.tabIndex + "",
        image_result_type: a(t.querySource) + ""
      });
    };
    this.expressionPickerOpened = function () {
      var t = {};
      t.mediaBarV2Enabled = o.resolve(n.serviceLocator.FEATURE_FLAGS).isFeatureOn(n.featureFlags.MEDIA_BAR_V2_ENABLED);
      t.styleMode = u.get().currentMode();
      s.get().sendEvent(i.telemetry.chatTenantToken, n.telemetry.pes.eventName.PICKER_OPENED, t);
    };
  }
  var t = e("lodash-compat"), n = e("swx-constants").COMMON, r = e("swx-utils-common").guid, i = e("experience/settings"), s = e("ui/telemetry/telemetryClient"), o = e("swx-service-locator-instance").default, u = e("utils/common/styleModeHelper");
  return new a();
});
