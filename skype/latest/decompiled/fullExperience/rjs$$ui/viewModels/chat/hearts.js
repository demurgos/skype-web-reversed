define("ui/viewModels/chat/hearts", [
  "require",
  "exports",
  "module",
  "swx-enums",
  "constants/common",
  "ui/viewModels/people/contactBuilder",
  "telemetry/chat/emotionActionEvent",
  "swx-i18n",
  "vendor/knockout",
  "ui/modelHelpers/personHelper",
  "services/serviceLocator",
  "swx-utils-common"
], function (e, t) {
  function c(e, t, c) {
    var h = this, p = f.resolve(r.serviceLocator.FEATURE_FLAGS);
    h.canHeart = u.observable(!1), h.heartsEnabled = u.observable(!1), h.heartsCount = u.observable(0), h.isHeartedByMe = u.observable(!1), h.usersHearts = u.observableArray(), h.heartBar = u.observableArray(), h.lovedByCount = u.computed(function () {
      return o.fetch({
        key: "hearts_list_title",
        params: { count: h.heartsCount() }
      });
    }), h.isSelfPopup = function () {
      return function (e) {
        return e.key === "hearts";
      };
    }, h._internal = {
      heartsBarCountThreshold: 2,
      deletedMsgSubscription: null,
      emotionsObserver: null,
      heartCountChangeSubscription: null,
      processUser: function (e) {
        var t = {};
        t.person = e.person, t.firstName = e.person.firstName(), t.displayName = e.person.displayName(), t.me = a.isMePerson(e.person), t.me && h.isHeartedByMe(!0), t.contact = i.build(e.person), h.usersHearts.push(t);
      },
      initUserHeartBar: function () {
        function u(n) {
          for (t = 0; t < r.length; t++)
            if (e !== t && r[t].firstName === n)
              return !0;
        }
        var e, t, n, r = h.usersHearts(), i, s = o.fetch({ key: "hearts_me_text" });
        for (e = 0; e < r.length; e++)
          n = r[e], n.me && (n.firstName = s), !n.firstName || u(n.firstName) ? h.heartBar.push(n.displayName) : h.heartBar.push(n.firstName);
        i = h.heartBar.indexOf(s), i > -1 && (h.heartBar.splice(i, 1), h.heartBar.unshift(s));
      },
      initEmotions: function () {
        if (!e.model._emotionsArray)
          return;
        var t = e.model._emotionsArray(r.emotionTypes.HEART);
        if (t) {
          var n = t.users.slice();
          n.sort(function (e, t) {
            return t.time - e.time;
          }), h.isHeartedByMe(!1), h.usersHearts.removeAll(), h.heartBar.removeAll(), n.forEach(h._internal.processUser), h._internal.initUserHeartBar(), h.heartsCount(n.length);
        } else
          h.heartsCount(0), h.isHeartedByMe(!1);
      },
      initHeart: function () {
        var t = p.isFeatureOn(r.featureFlags.HEARTS_ENABLED) && e.model.type() !== n.activityType.SystemMessage, i = t && !!e.model.emotions && !e.model.isDeleted();
        h.heartsEnabled(t), h.canHeart(i);
      },
      onHeartBar: function () {
        return h.canHeart() && h.heartsCount() > 0;
      },
      onHeartBarLoved: function (e) {
        var t;
        if (e > h._internal.heartsBarCountThreshold) {
          var n = h.heartBar().slice(0, h._internal.heartsBarCountThreshold), r = parseInt(e, 10) - h._internal.heartsBarCountThreshold;
          t = o.fetch({
            key: "hearts_like_byMany",
            params: {
              participantlist: n.join(", "),
              count: r
            }
          });
        }
        e === 1 && (h.isHeartedByMe() ? t = o.fetch({ key: "hearts_like_byMeOnly" }) : t = o.fetch({
          key: "hearts_like_byOne",
          params: { participantName: h.heartBar()[0] }
        })), e === h._internal.heartsBarCountThreshold && (t = o.fetch({
          key: "hearts_like_byFew",
          params: {
            participantFirst: h.heartBar()[0],
            list: h.heartBar().slice(1, h.heartBar().length - 2).join(", "),
            participantLast: h.heartBar()[h.heartBar().length - 1]
          }
        })), h.heartBarLoved(t);
      }
    }, h.init = function () {
      h._internal.initHeart();
      if (!h.canHeart())
        return;
      h._internal.emotionsObserver = e.model.emotions.observe(function () {
        h._internal.initEmotions();
      }), e.model.isDeleted && (h._internal.deletedMsgSubscription = e.model.isDeleted.changed(function () {
        h._internal.initHeart();
      })), h._internal.initEmotions();
    }, h.dispose = function () {
      h.hasHeartBar.dispose(), h.lovedByCount.dispose(), h._internal.deletedMsgSubscription && h._internal.deletedMsgSubscription.dispose(), h._internal.emotionsObserver && h._internal.emotionsObserver.dispose();
    }, h.heartMessage = function () {
      function a() {
        i.data.result = 200, i.setDuration(n.duration()), i.publish();
      }
      function f(e) {
        h.isHeartedByMe(!h.isHeartedByMe()), h.heartsCount(o), i.data.result = e.status, i.setDuration(n.duration()), i.publish();
      }
      var n = l.build(), i = s.build();
      i.data.emotionType = i.enums.EMOTION_TYPE.HEARTS;
      var o = 0, u = e.model.emotions(r.emotionTypes.HEART);
      u && (o = u.users.length), i.data.annotationsCount = o, i.setParticipantCount(t.participants().length), i.setMessageType(e), h.isHeartedByMe(!h.isHeartedByMe()), h.isHeartedByMe() ? (i.data.action = i.enums.ACTION_TYPE.SET, e.model.emotions.add({ key: r.emotionTypes.HEART }).then(a, f)) : (i.data.action = i.enums.ACTION_TYPE.UNSET, e.model.emotions.remove({ key: r.emotionTypes.HEART }).then(a, f));
    }, h.hasHeartBar = u.computed(h._internal.onHeartBar), h.heartBarLoved = u.observable(), h.heartsCount.subscribe(h._internal.onHeartBarLoved), h.triggerTooltip = function (e, t) {
      c({
        key: "hearts",
        eventPageY: t.pageY
      });
    };
  }
  var n = e("swx-enums"), r = e("constants/common"), i = e("ui/viewModels/people/contactBuilder"), s = e("telemetry/chat/emotionActionEvent"), o = e("swx-i18n").localization, u = e("vendor/knockout"), a = e("ui/modelHelpers/personHelper"), f = e("services/serviceLocator"), l = e("swx-utils-common").stopwatch;
  t.build = function (e, t, n) {
    return new c(e, t, n);
  };
})
