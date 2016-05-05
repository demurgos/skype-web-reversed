define("jSkype/models/conversation", [
  "require",
  "jSkype/client",
  "browser/window",
  "constants/common",
  "jcafe-property-model",
  "jSkype/modelHelpers/propertyModelHelper",
  "jSkype/modelHelpers/propertyValidator",
  "jSkype/modelHelpers/personsAndGroupsHelper",
  "jSkype/modelHelpers/personHelper",
  "jSkype/utils/chat/parser",
  "jSkype/modelHelpers/calling/callData",
  "jSkype/models/capabilities",
  "jSkype/models/participant",
  "jSkype/models/chatService",
  "jSkype/models/audioService",
  "jSkype/services/calling/autoCalling",
  "jSkype/models/videoService",
  "jSkype/models/screenSharingService",
  "jSkype/utils/chat/messagesCache",
  "jSkype/models/historyService",
  "jSkype/models/fileTransferService",
  "jSkype/services/spaces",
  "jSkype/utils/chat/conversation",
  "jSkype/constants/people",
  "jSkype/settings",
  "swx-enums",
  "jSkype/modelHelpers/calling/pstnEventsHandler",
  "jSkype/modelHelpers/calling/pstnActivityItemAdder",
  "jSkype/utils/chat/generator"
], function (e) {
  function D(e, D, P) {
    function it(e) {
      var t = {};
      if (!e)
        return;
      var n = !1;
      e.forEach(function (e) {
        var r = f.getTypeFromKey(e.id), i = f.getId(e.id);
        e.contactType || (e.contactType = r), e.id = i, t[e.id] = e;
        var s = e.linkedMri && e.linkedMri.indexOf(I.id()) > 0;
        n = n || e.id === I.id() || s;
      }), st(n), B.each(function (e) {
        t[e.id] || zt(e.id);
      }), _t(t, function (e) {
        var n = t[e].role.toLowerCase(), r = t[e].contactType;
        Xt(e, M[n], null, r);
      });
    }
    function st(e) {
      if (e === $)
        return;
      $ = e, rt && H._isFavorited() && !$ && H._isFavorited(!1), mt(), gt();
    }
    function ot(t) {
      if (t.length === 0)
        return;
      return e.setTopic(H.conversationId, t), t;
    }
    function ut(e) {
      var t = e.threadProperties && e.threadProperties[_.JOINING_ENABLED];
      t && H.isJoiningEnabled._set(t.toLowerCase() === "true");
    }
    function at(e) {
      e.threadProperties && e.threadProperties.autoCallingPayload && H._autoCallingService.setupMeeting(H, e.threadProperties.autoCallingPayload);
    }
    function ft(e) {
      var t = e.threadProperties && e.threadProperties[_.HISTORY_DISCLOSED], n;
      t && (n = t.toLowerCase() === "true", n && H.historyService.getMoreActivityItems.enabled._set(!0), H.historyService.isHistoryDisclosed._set(n));
    }
    function lt(e) {
      var t = e.threadProperties && e.threadProperties[_.PICTURE];
      if (!t)
        return;
      var n = /^(URL@.*\.com)\//, r = t && t.match(n);
      r && (t = t.replace(r[1], N.settings.amdServiceHost), H.avatarUrl(t));
    }
    function ct(e) {
      var t = null;
      return e.length !== tt && (t = e.slice(0, 4).map(function (e) {
        return f.getId(e.id);
      }).join(i)), t;
    }
    function ht(e) {
      var t;
      e.threadProperties && e.threadProperties.topic && e.threadProperties.topic !== " " ? t = e.threadProperties.topic : e.members && (t = ct(e.members)), tt = e.members && e.members.length || tt;
      if (!t)
        return;
      if (t === I.id()) {
        H.topic._set("");
        return;
      }
      var n = t.split(i), r, s = [];
      vt();
      for (var o = 0; o < n.length; o++) {
        r = n[o];
        if (r === I.id() || r === "...")
          continue;
        if (!pt(r)) {
          tt = null, H.topic._set(l.parseTopic(t));
          return;
        }
        s.push(r);
      }
      s.forEach(dt);
    }
    function pt(e) {
      return !!B(e);
    }
    function dt(e) {
      var t = a.getPerson(e);
      j.push({
        subscription: t.displayName.changed(Wt),
        person: t
      });
    }
    function vt() {
      j.forEach(function (e) {
        e.subscription.dispose();
      }), j = [];
    }
    function mt() {
      var t = e.isOnline() && $ && !bt() && !yt();
      H.activeModalities.chat._set(t);
    }
    function gt() {
      H.audioService._membershipChanged($), H.videoService._membershipChanged($);
    }
    function yt() {
      return P === "8:echo123";
    }
    function bt() {
      var e = H.participants(0);
      return e && e.person.isBlocked();
    }
    function wt(t) {
      function i() {
        n.resolve(t);
      }
      function o() {
        r() === t ? n.resolve(t) : e.joiningEnabled(H.conversationId, t, i, n.reject.bind(n));
      }
      var n = s.task(), r = this;
      return G.promise.then(o, o), G = n, n.promise;
    }
    function Et(t) {
      function i() {
        n.resolve(t);
      }
      function o() {
        n.reject();
      }
      function u() {
        r() === t || !rt ? n.resolve(t) : e.setFavorites(H.conversationId).then(i, o);
      }
      var n = s.task(), r = this;
      return Y.promise.then(u, u), Y = n, n.promise;
    }
    function St(e) {
      e.threadProperties && e.threadProperties.joinURL && H.uri._set(e.threadProperties.joinURL);
    }
    function xt(e) {
      V.promise.state() === "pending" && V.resolve(e.JoinUrl);
    }
    function Tt() {
      return V || (V = s.task(), H.uri() ? V.resolve(H.uri()) : H.isJoiningEnabled.once(!0, function () {
        S.getSpacesData(H.conversationId).then(xt, V.reject.bind(V));
      })), V.promise;
    }
    function Nt() {
      function r(e) {
        st(!0), H.selfParticipant.role._set(n), t.reject(e);
      }
      var t = s.task(), n = H.selfParticipant.role();
      return rt && H._isFavorited() && H._isFavorited(!1), H.selfParticipant.role._set(C.participantRole.Attendee), st(!1), e.removeParticipant(H.conversationId, H.selfParticipant.person.id(), t.resolve.bind(t), r), nt.dispose(), nt = null, t.promise;
    }
    function Ct(t) {
      var n = s.task();
      return e.sendPollMessage(H, t, n.resolve.bind(n), n.reject.bind(n)), n.promise;
    }
    function kt(t) {
      var n = s.task(), r = A.outgoingContactInfoActivityItem(t, H);
      return e.sendContactInfoMessage(H, r, t, n.resolve.bind(n), n.reject.bind(n)), n.promise;
    }
    function At(e) {
      Lt.push(e), n.clearTimeout(At.asyncRef), At.asyncRef = n.setTimeout(function () {
        H._callHandler.extendCall(Lt), Lt = [];
      }, 0);
    }
    function Ot(t) {
      function i(e) {
        zt(r), n.reject(e);
      }
      var n, r = t.person.id();
      if (H.selfParticipant.audio.state() === C.callConnectionState.Connected)
        return At(r), !0;
      n = s.task();
      if (!Ht(t)) {
        n.reject();
        return;
      }
      return It({
        id: r,
        role: t.role()
      }), H.conversationId && e.addParticipant(H.conversationId, r, C.participantRole.Attendee, n.resolve.bind(n), i), n.promise;
    }
    function Mt(t) {
      function i(e) {
        Q.add(t, r), It({
          id: r,
          role: t.role()
        }), n.reject(e);
      }
      var n = s.task(), r = t.person.id();
      if (!pt(r)) {
        n.reject();
        return;
      }
      return zt(r), e.removeParticipant(H.conversationId, t.person.id(), n.resolve.bind(n), i), n.promise;
    }
    function _t(e, t) {
      for (var n in e)
        e.hasOwnProperty(n) && t(n);
    }
    function Dt() {
      H._isAlive = !0, B.each(function (e) {
        Q(e.id) || Ht(Ft(e.id, e.type));
      });
    }
    function Pt() {
      H._isAlive = !1, Q.empty();
    }
    function Ht(e) {
      var t = B(e.person.id());
      try {
        t && e.role._set(t.role), Q.add(e, e.person.id());
      } catch (n) {
        return !1;
      }
      return !0;
    }
    function Bt() {
      return H._isAlive || !D;
    }
    function jt(e, t) {
      var n = f.getId(e);
      return a.getPerson(n, t);
    }
    function Ft(e, t) {
      var n = jt(e, t);
      return H.createParticipant(n);
    }
    function It(e) {
      var t = e.id;
      pt(t) === !1 ? B.add(e, t) : B(t).role = e.role, $t();
    }
    function qt(e) {
      pt(e) && B.remove(e), $t();
    }
    function Rt() {
    }
    function Ut(e) {
      return q.remove(e);
    }
    function zt(e) {
      qt(e), Bt() && Q.remove(e);
    }
    function Wt() {
      if (F)
        return;
      F = !0, setTimeout(function () {
        var e = j.map(function (e) {
          return e.person.displayName();
        });
        H.topic._set(l.parseTopic(e.join(i))), F = !1;
      }, 0);
    }
    function Xt(e, t, n, r) {
      var i, s, o;
      return t = t || C.participantRole.Attendee, e === I.id() ? (st(!0), H.selfParticipant.role._set(t), o = !0) : pt(e) ? (i = Q(e), s = B(e), s.role !== t && (It({
        id: e,
        role: t,
        type: r
      }), i.role._set(t)), o = !1) : (It({
        id: e,
        role: t,
        type: r
      }), Bt() && (n = n || jt(e, r), i = H.createParticipant(n), o = Ht(i))), mt(), D || (H.participants(0).person._authorization.changed(Jt), H.participants(0).person.isBlocked.changed(Yt)), o;
    }
    function Vt() {
      var e = !1;
      return B.each(function (t) {
        !e && u.isPhoneNumber(t.id) && (e = !0);
      }), e;
    }
    function $t() {
      H.audioService._setPSTNParticipants(Vt()), H.videoService._setPSTNParticipants(Vt());
    }
    function Jt() {
      var e = H.isJoiningEnabled(), t = H.activeModalities.chat() && !H.selfParticipant.isAnonymous() && !yt();
      if (!D) {
        var n = H.participants(0) && H.participants(0).person._authorization() === T.AUTHORIZED;
        J(t && n || e);
      } else
        J((t || e) && $);
    }
    function Kt() {
      var e = H.selfParticipant.role() === C.participantRole.Leader;
      K(e && H.activeModalities.chat() && !H.selfParticipant.isAnonymous());
    }
    function Qt() {
      W(!H.selfParticipant.isAnonymous() && $ && rt);
    }
    function Gt() {
      Z(H._topicSetEnabled() && H.selfParticipant && !H.selfParticipant.isAnonymous());
    }
    function Yt() {
      D || mt();
    }
    function Zt() {
      var e = H.activeModalities.chat(), t = N.isFeatureOn(r.featureFlags.SEND_CONTACT_CARD_ENABLED);
      X(e && t);
    }
    function en() {
      var e = H.activeModalities.chat(), t = N.isFeatureOn(r.featureFlags.POLLS_ENABLED);
      z(D && e && t);
    }
    var H = this, B = s.collection(), j = [], F = !1, I = t.get().personsAndGroupsManager.mePerson, q = s.collection(), R = s.property({ value: !1 }), U = s.property({ value: D }), z = s.property({ value: !1 }), W = s.property({ value: !1 }), X = s.boolProperty(!1), V, $ = !0, J = s.property({ value: !1 }), K = s.property({ value: !1 }), Q = s.collection(D ? {
        subscribed: Dt,
        unsubscribed: Pt
      } : null), G = s.task().resolve(), Y = s.task().resolve(), Z = s.boolProperty(!1), et = s.command(ot, Z), tt, nt, rt = N.isFeatureOn(r.featureFlags.FAVORITES_CONVERSATION_ENABLED);
    this._isAlive = !1, this.avatarUrl = s.property({ value: O }), this.topic = s.property({
      set: et,
      value: ""
    }), this.isGroupConversation = s.property({
      readOnly: !0,
      value: D
    }), this.spawnedConversation = s.property({ readOnly: !0 }), this.conversationId = P, this.uri = s.property({
      readOnly: !0,
      get: Tt
    }), this.participantsCount = B.size, this._topicSetEnabled = s.boolProperty(!1), rt && (this._isFavorited = s.property({
      value: !1,
      set: s.command(Et, W)
    })), this.autoCall = s.boolProperty(!1), this.activeModalities = new h(), this.selfParticipant = new p(I, this, e), P && (this._topicSetEnabled(!0), Gt()), this.lastModificationTimestamp = s.property({
      readOnly: !0,
      value: null
    }), this.isJoiningEnabled = s.property({
      value: !1,
      set: s.command(wt, R)
    }), this.pendingInvitations = q.asWritable({
      add: s.command(Rt, s.boolProperty(!0)),
      remove: s.command(Ut, this.activeModalities.chat)
    }), this.participants = Q.asWritable({
      add: s.command(Ot, J),
      remove: s.command(Mt, K)
    }), this.historyService = new w(b, e, this), this.audioService = v.build(this), this._autoCallingService = m.build(this), this.videoService = g.build(this), this.screenSharingService = y.build(this), this.chatService = new d(e, this), this.fileTransferService = E.build(this, e), this.mediaConnectionType = s.property({ value: C.mediaConnectionType.Unknown }), this.leave = s.command(Nt, U), this.sendPollMessage = s.command(Ct, z), this.sendContactInfo = s.command(kt, X), this.acknowledge = s.enabledCommand(function () {
      return o.createResolvedPromise();
    }), this.createParticipant = function (t) {
      return new p(t, this, e);
    }, this.createInvitation = function () {
      return null;
    }, this.activeModalities.chat.changed(function (e) {
      Jt(), Kt(), Gt(), U(D && e), Zt(), en(), Qt();
    }), this.selfParticipant.role.changed(function (e) {
      var t = e === C.participantRole.Leader;
      Kt(), Gt(), R(t), H.historyService.historyDisclosedCommandEnabled(t);
    }), Q.removed(function (e) {
      e.person._authorization.changed.off(Jt), e.person.isBlocked.changed.off(Yt), e._dispose();
    }), this._onlineStateChanged = function () {
      mt(), H.audioService.start.enabled._set(e.isOnline());
    }, this._properties = {}, this._consumptionHorizon = {
      lastReadMessageTimestamp: 0,
      modificationTime: 0,
      lastReadMessageId: 0
    }, this._setCallHandler = function (e) {
      this._callHandler = e;
    }, this._callData = c.build(), this._addParticipant = function (e, t) {
      return Xt(e.id(), t, e);
    }, this._updateConsumptionHorizon = function (e) {
      if (!e)
        return;
      var t = x.parseConsumptionHorizon(e), n = !H._consumptionHorizon || H._consumptionHorizon.modificationTime < t.modificationTime;
      n && (H._consumptionHorizon = t, H.historyService._updateReadStatusFromServer());
    }, this._updateConsumptionHorizonModificationTime = function () {
      if (!H._consumptionHorizon || !H.conversationId)
        return;
      H._consumptionHorizon.modificationTime = new Date().getTime(), e.setConsumptionHorizon(H);
    }, this._update = function (e) {
      H._updateConversationProperties(e), D && this._updateThreadProperties(e);
    }, this._notificationsEnabled = s.boolProperty(!0), this._updateConversationProperties = function (e) {
      H._updateConsumptionHorizon(e.properties.consumptionhorizon), H.chatService._setNotificationSettings(e.properties.alerts, e.properties.alertmatches), e.lastMessage && H.historyService._processRawMessage(e.lastMessage, !0);
    }, this._updateThreadProperties = function (e) {
      it(e.members), ht(e), ut(e), at(e), ft(e), lt(e), St(e);
    }, this._setCanJoinCall = function (e, t, n) {
      H._callPayload = n, H._callHostId = t, H.activeModalities.audio._set(e), H.activeModalities.video._set(e);
    }, this._setCanJoinNGCCall = function (e, t, n, r) {
      H.activeModalities.audio._set(e), H.activeModalities.video._set(e), H._ngcJoinUrl = n, H._ngcCorrelationId = r, H._callHostId = t, H._callPayload = {};
    }, nt = k.build(new L()), nt.subscribeToConversation(H);
    var Lt = [];
  }
  var t = e("jSkype/client"), n = e("browser/window"), r = e("constants/common"), i = r.conversation.TOPIC_DELIMITER, s = e("jcafe-property-model"), o = e("jSkype/modelHelpers/propertyModelHelper"), u = e("jSkype/modelHelpers/propertyValidator"), a = e("jSkype/modelHelpers/personsAndGroupsHelper"), f = e("jSkype/modelHelpers/personHelper"), l = e("jSkype/utils/chat/parser"), c = e("jSkype/modelHelpers/calling/callData"), h = e("jSkype/models/capabilities"), p = e("jSkype/models/participant"), d = e("jSkype/models/chatService"), v = e("jSkype/models/audioService"), m = e("jSkype/services/calling/autoCalling"), g = e("jSkype/models/videoService"), y = e("jSkype/models/screenSharingService"), b = e("jSkype/utils/chat/messagesCache"), w = e("jSkype/models/historyService"), E = e("jSkype/models/fileTransferService"), S = e("jSkype/services/spaces"), x = e("jSkype/utils/chat/conversation"), T = e("jSkype/constants/people").authorizationStates, N = e("jSkype/settings"), C = e("swx-enums"), k = e("jSkype/modelHelpers/calling/pstnEventsHandler"), L = e("jSkype/modelHelpers/calling/pstnActivityItemAdder"), A = e("jSkype/utils/chat/generator"), O = null, M = {
      admin: C.participantRole.Leader,
      user: C.participantRole.Attendee
    }, _ = {
      PICTURE: "picture",
      AUTOCALLING: "autoCalling",
      JOINING_ENABLED: "joiningenabled",
      HISTORY_DISCLOSED: "historydisclosed"
    };
  return D;
})
