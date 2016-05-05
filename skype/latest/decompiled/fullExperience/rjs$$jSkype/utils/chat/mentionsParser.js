define("jSkype/utils/chat/mentionsParser", [
  "require",
  "jSkype/client",
  "jSkype/modelHelpers/personsAndGroupsHelper"
], function (e) {
  function r() {
    var e = this, r = /@([^\s@]*)/g;
    e.getMentions = function (t) {
      var n = [], i = t.match(r) || [];
      return i.forEach(function (t) {
        var r = e.getMentionUserData(t);
        r.displayName ? n.push(t) : n.push(t.replace(/[,.;\-!\?']*$/, ""));
      }), n;
    }, e.getMentionUserData = function (e) {
      var r, i = "", s = t.get().personsAndGroupsManager.mePerson, o = {
          defaultUserName: "",
          displayName: "",
          isMePerson: !1
        };
      return e ? (o.isMePerson = n.isMePerson(e), o.isMePerson ? r = s : r = n.getPersonById(e), r && (o.displayName = r.displayName(), r.firstName() && (o.defaultUserName = r.firstName(), i = " "), r.lastName() && (o.defaultUserName += i + r.lastName()), o.defaultUserName || (o.defaultUserName = o.displayName)), o) : o;
    };
  }
  var t = e("jSkype/client"), n = e("jSkype/modelHelpers/personsAndGroupsHelper");
  return new r();
})
