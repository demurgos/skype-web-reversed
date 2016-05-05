define("ui/modelHelpers/activityMapper", [
  "require",
  "exports",
  "module",
  "swx-i18n",
  "ui/modelHelpers/activities"
], function (e, t) {
  var n = e("swx-i18n").localization, r = e("ui/modelHelpers/activities");
  t.map = function (e) {
    return r[e] ? n.fetch({ key: "message_text_activity_" + r[e] }) : e;
  };
})
