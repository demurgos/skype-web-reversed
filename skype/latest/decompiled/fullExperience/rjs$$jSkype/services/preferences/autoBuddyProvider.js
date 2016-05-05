define("jSkype/services/preferences/autoBuddyProvider", [
  "require",
  "lodash-compat",
  "utils/common/builderMixin",
  "jSkype/services/serviceFactory",
  "jSkype/modelHelpers/contacts/dataHandlers/factory"
], function (e) {
  function s() {
  }
  var t = e("lodash-compat"), n = e("utils/common/builderMixin"), r = e("jSkype/services/serviceFactory"), i = e("jSkype/modelHelpers/contacts/dataHandlers/factory");
  return s.prototype.read = function () {
    var t = i.getPeopleSettingsHandlers();
    return r.getPeopleService().getSettings().then(t.onSuccess, t.onError);
  }, s.prototype.update = function (e) {
    return r.getPeopleService().setSettings(e);
  }, t.assign(s, n), s;
})
