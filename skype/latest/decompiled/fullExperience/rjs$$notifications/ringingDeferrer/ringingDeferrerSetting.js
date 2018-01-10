define("notifications/ringingDeferrer/ringingDeferrerSetting", [
  "require",
  "swx-enums"
], function (e) {
  function n(e, n) {
    var r = this;
    r.option = e || t.Unset;
    r.untilTimestamp = n || 0;
  }
  var t = e("swx-enums").ringingDeferrerOptions;
  return n;
});
