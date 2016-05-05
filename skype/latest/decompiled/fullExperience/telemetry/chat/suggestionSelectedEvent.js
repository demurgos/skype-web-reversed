define("telemetry/chat/suggestionSelectedEvent", [
  "require",
  "constants/common",
  "experience/settings",
  "constants/keys",
  "ui/telemetry/telemetryClient"
], function (e) {
  function s() {
    var e = this, s = "message_suggestion_action";
    e.enums = {
      TRIGGER: {
        EXPLICIT: "explicit",
        IMPLICIT: "implicit",
        QUOTE: "quote"
      },
      RESOLUTION: {
        ENTER: "enter",
        TAB: "tab",
        ESC: "escape",
        CLICKIN: "click-in",
        CLICKOUT: "click-out",
        MISSMATCH: "missmatch"
      },
      getResolution: function (n) {
        switch (n) {
        case r.TAB:
          return e.enums.RESOLUTION.TAB;
        case r.ENTER:
          return e.enums.RESOLUTION.ENTER;
        case r.ESC:
          return e.enums.RESOLUTION.ESC;
        default:
          return t.telemetry.NOT_AVAILABLE;
        }
      }
    }, e.data = {}, e.publish = function () {
      e.data.selectedIndex !== t.telemetry.NOT_AVAILABLE && i.get().sendEvent(n.telemetry.uiTenantToken, s, e.data), e.reset();
    }, e.reset = function () {
      e.data = {
        criteriaLength: t.telemetry.NOT_AVAILABLE,
        resolution: t.telemetry.NOT_AVAILABLE,
        selectedIndex: t.telemetry.NOT_AVAILABLE,
        suggestionType: t.telemetry.NOT_AVAILABLE,
        totalMatchCount: t.telemetry.NOT_AVAILABLE,
        trigger: t.telemetry.NOT_AVAILABLE,
        visibleMatchCount: t.telemetry.NOT_AVAILABLE
      };
    }, e.reset();
  }
  var t = e("constants/common"), n = e("experience/settings"), r = e("constants/keys"), i = e("ui/telemetry/telemetryClient");
  return s;
})
