(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-jskype-main/lib/models/conversationsSearchQuery", [
      "require",
      "exports",
      "swx-jskype-internal-application-instance",
      "jcafe-property-model",
      "../../lib/models/searchQuery",
      "../../lib/models/searchResult",
      "../../lib/modelHelpers/propertyValidator",
      "swx-mri"
    ], e);
}(function (e, t) {
  var n = e("swx-jskype-internal-application-instance"), r = e("jcafe-property-model"), i = e("../../lib/models/searchQuery"), s = e("../../lib/models/searchResult"), o = e("../../lib/modelHelpers/propertyValidator"), u = e("swx-mri"), a = function (e) {
      function t(t) {
        var n = e.call(this) || this;
        return n.conversationKeywords = [
          {
            key: "group",
            call: n.filterByGroup.bind(n)
          },
          {
            key: "topic",
            call: n.filterByTopic.bind(n)
          },
          {
            key: "participantsByIds",
            call: n.filterByParticipantsId.bind(n)
          }
        ], n.getMore = r.command(n.getMoreCommand.bind(n), n.moreResultsAvailable), n.conversationsCache = t, n.conversationKeywords.forEach(function (e) {
          n.supportedKeywords._add(e.key);
        }), n;
      }
      return __extends(t, e), t.prototype.filterByParticipantsId = function (e, t) {
        var r = t.trim().split(" "), i = n.get().personsAndGroupsManager.mePerson.id(), s = !e.members || e.members.length === 0;
        r.indexOf(i) < 0 && r.push(i);
        if (s || e.members.length !== r.length)
          return !1;
        var o = e.members.filter(function (e) {
          return r.indexOf(u.getId(e.id)) > -1;
        });
        return o.length === e.members.length;
      }, t.prototype.filterByTopic = function (e, t) {
        if (!e.threadProperties || !t)
          return !1;
        var n, r = t.split(" ");
        for (var i = r.length - 1; i >= 0; i--) {
          var s = new RegExp("\\b" + r[i], "i");
          n = s.test(e.threadProperties.topic);
          if (!n)
            break;
        }
        return n ? !0 : !1;
      }, t.prototype.filterByGroup = function (e, t) {
        return o.isGroupConversation(e.id) === t;
      }, t.prototype.getMoreCommand = function () {
        var e = this, t = r.task(), i, o = function (t) {
            var n = e.getConversationKeyword(t);
            if (!n)
              return;
            i = i.filter(function (t) {
              return e.executeConversationQuery(t, n);
            });
          }, u = function () {
            i = e.conversationsCache.getAllItems();
            Object.keys(e.keywords).forEach(o);
            i.map(function (t) {
              var r = new s["default"](n.get().conversationsManager._getOrCreateConversation(t.id));
              e.results._add(r);
            });
            t.resolve();
          };
        return this.conversationsCache._syncAllConversations.enabled() ? this.conversationsCache._syncAllConversations().then(u) : u(), t.promise;
      }, t.prototype.getConversationKeyword = function (e) {
        var t = this.conversationKeywords.filter(function (t) {
          return t.key === e;
        });
        return t.length === 0 ? undefined : t[0];
      }, t.prototype.executeConversationQuery = function (e, t) {
        var n = this.keywords[t.key];
        return typeof n != "undefined" ? t.call(e, n) : !1;
      }, t;
    }(i["default"]);
  t.__esModule = !0;
  t["default"] = a;
}));
