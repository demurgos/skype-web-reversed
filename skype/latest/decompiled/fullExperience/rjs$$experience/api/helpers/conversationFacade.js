define("experience/api/helpers/conversationFacade", [
  "require",
  "exports",
  "module",
  "vendor/knockout"
], function (e, t) {
  function r(e) {
    function r() {
      t.participantsCount(e.participantsCount());
    }
    function i() {
      t.isJoiningEnabled(e.isJoiningEnabled());
    }
    var t = this;
    return t.participantsCount = n.observable(0), t.isJoiningEnabled = n.observable(!0), t.init = function () {
      e.participants.changed(r);
      e.isJoiningEnabled.changed(i);
    }, t.dispose = function () {
      e.participants.changed.off(r);
      e.isJoiningEnabled.changed.off(i);
    }, t.isJoinable = function () {
      return e.isJoiningEnabled.set.enabled();
    }, t.makeJoinable = function () {
      e.isJoiningEnabled.set.enabled.once(!0, function () {
        e.isJoiningEnabled.set(!0);
      });
    }, t.getJoinUrl = function () {
      return e.uri.get();
    }, t;
  }
  var n = e("vendor/knockout");
  t.build = function (e) {
    return new r(e);
  };
});
