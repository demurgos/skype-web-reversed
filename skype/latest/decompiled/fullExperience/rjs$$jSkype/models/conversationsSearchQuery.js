define("jSkype/models/conversationsSearchQuery", [
  "require",
  "jSkype/client",
  "jcafe-property-model",
  "jSkype/models/searchQuery",
  "jSkype/models/searchResult",
  "lodash-compat",
  "jSkype/modelHelpers/propertyValidator",
  "jSkype/modelHelpers/personHelper"
], function (e) {
  function a(e) {
    function l(e, n) {
      var r, i = n.trim().split(" "), s = t.get().personsAndGroupsManager.mePerson.id(), o = !e.members || e.members.length === 0;
      return i.indexOf(s) < 0 && i.push(s), o || e.members.length !== i.length ? !1 : (r = e.members.filter(function (e) {
        return i.indexOf(u.getId(e.id)) > -1;
      }), r.length === e.members.length);
    }
    function c(e, t) {
      if (!e.threadProperties)
        return !1;
      var n, r, i = t.split(" ");
      for (n = i.length - 1; n >= 0; n--) {
        var s = new RegExp("\\b" + i[n], "i");
        r = s.test(e.threadProperties.topic);
        if (!r)
          break;
      }
      return r ? !0 : !1;
    }
    function h(e, t) {
      return o.isGroupConversation(e.id) === t;
    }
    function p() {
      function o(e) {
        var t = d(e);
        if (!t)
          return;
        s = s.filter(function (e) {
          return v(e, t);
        });
      }
      function u() {
        s = e.getAllItems(), Object.keys(a.keywords).forEach(o), s.map(function (e) {
          var n = new i(t.get().conversationsManager._getOrCreateConversation(e.id));
          a.results._add(n);
        }), r.resolve();
      }
      var r = n.task(), s;
      return e._syncAllConversations.enabled() ? e._syncAllConversations().then(u) : u(), r.promise;
    }
    function d(e) {
      var t;
      t = f.filter(function (t) {
        return t.key === e;
      });
      if (t.length === 0)
        return;
      return t[0];
    }
    function v(e, t) {
      var n = a.keywords[t.key];
      return typeof n != "undefined" ? t.call(e, n) : !1;
    }
    var a = this, f = [
        {
          key: "group",
          call: h
        },
        {
          key: "topic",
          call: c
        },
        {
          key: "participantsByIds",
          call: l
        }
      ];
    s.merge(this, new r()), f.forEach(function (e) {
      a.supportedKeywords._add(e.key);
    }), a.getMore = n.command(p, a.moreResultsAvailable);
  }
  var t = e("jSkype/client"), n = e("jcafe-property-model"), r = e("jSkype/models/searchQuery"), i = e("jSkype/models/searchResult"), s = e("lodash-compat"), o = e("jSkype/modelHelpers/propertyValidator"), u = e("jSkype/modelHelpers/personHelper");
  return a;
})
