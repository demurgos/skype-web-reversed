define("ui/viewModels/people/properties/displayNameText", [
  "require",
  "swx-i18n",
  "swx-utils-common",
  "ui/modelHelpers/personHelper",
  "ui/modelHelpers/conversationHelper",
  "utils/common/cafeObservable"
], function (e) {
  function o(e) {
    var t = this;
    return t.displayName = s.newObservableProperty(e.displayName), t.compute = function () {
      return o.format(e.id(), t.displayName());
    }, t.dispose = function () {
      t.displayName.dispose();
    }, t;
  }
  var t = e("swx-i18n").localization, n = e("swx-utils-common").stringUtils, r = e("ui/modelHelpers/personHelper"), i = e("ui/modelHelpers/conversationHelper"), s = e("utils/common/cafeObservable");
  return o.build = function (e) {
    return new o(e);
  }, o.format = function (e, s) {
    var o = s;
    return r.isGuestId(e) && (o = t.fetch({
      key: "guest_user_displayname",
      params: { displayName: s }
    })), i.isPstnEndpoint(o) && (o = n.forceLTREmbedding(o)), o;
  }, o;
})
