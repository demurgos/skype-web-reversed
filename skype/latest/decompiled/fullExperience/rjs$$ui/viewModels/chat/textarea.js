define("ui/viewModels/chat/textarea", [
  "require",
  "services/telemetry/logging/perf/main",
  "cafe/applicationInstance",
  "lodash-compat",
  "utils/common/eventMixin",
  "constants/common",
  "experience/settings",
  "constants/keys",
  "constants/calling",
  "utils/common/encoder",
  "utils/chat/dateTime",
  "browser/detect",
  "utils/common/async",
  "utils/chat/messageSanitizer",
  "vendor/knockout",
  "services/serviceLocator",
  "utils/chat/conversationCache",
  "utils/common/cafeObservable",
  "swx-i18n",
  "services/pubSub/pubSub",
  "services/pes/constants",
  "ui/modelHelpers/personHelper",
  "swx-utils-common",
  "ui/viewModels/chat/conversationTopic",
  "ui/telemetry/actions/actionNames",
  "browser/window",
  "ui/telemetry/telemetryClient",
  "telemetry/chat/pes",
  "telemetry/chat/telemetryEnumerator",
  "utils/common/applicationFocusManager",
  "swx-enums",
  "utils/chat/translatorHelper"
], function (e) {
  function H(e, i) {
    function nt() {
      return !!i.conversationModel;
    }
    function rt() {
      if (!nt())
        return;
      if (!Y.isFeatureOn("showWhenIamTyping"))
        return;
      var e = i.conversationModel.chatService;
      if (!e.sendIsTyping.enabled())
        return;
      z = !0;
      W = k.setTimeout(function () {
        z = !1;
      }, m.THROTTLE);
      e.sendIsTyping();
    }
    function it() {
      R = H.messageBody().length;
      p.execute(e.updateSizing);
    }
    function st() {
      return !!H.messageBody().trim();
    }
    function ot() {
      U && (U = null, e.editing(!1), mt());
    }
    function ut(t, n) {
      var r = n.stopImmediatePropagation;
      return n._stopImmediatePropagationCalled = !1, n.stopImmediatePropagation = function () {
        n._stopImmediatePropagationCalled = !0;
        r.apply(n, arguments);
      }, H.dispatchEvent(t, {
        event: n,
        viewModel: H,
        view: e
      }, H.DIRECTION.CHILD), n._stopImmediatePropagationCalled;
    }
    function at() {
      return !!F;
    }
    function ft(e) {
      var t = e.isEdited ? s.telemetry.chat.UI_EDIT_MESSAGE : s.telemetry.chat.UI_SEND_MESSAGE, n = {
          emoticonsCount: e.emoticonsCount || 0,
          messageLength: e.messageLength,
          participantsCount: J()
        };
      nt() && J() === 1 && (n.user_to = [
        i.conversationModel.participants()[0].person.id(),
        k.skypeTelemetryManager.PIIType.Identity
      ]);
      e.isEdited && (n.timedelta = e.timedelta);
      L.get().sendEvent(o.telemetry.uiTenantToken, t, n);
    }
    function lt() {
      var e = B._translatorSettings && B._translatorSettings.isEnabled;
      return e && (et = B._translatorSettings.meLanguage.code, tt = B._translatorSettings.participantLanguage.code), q && e && et && tt && et !== tt;
    }
    function ct(e) {
      e.translation ? F(e.message, null, e) : F(e.message);
    }
    function ht() {
      var e = d.processOutgoingTextMessage(d.stripHTML(H.messageBody()));
      return d.isMessageWithEmoticonsOnly(e);
    }
    function pt() {
      t.getInstance().startTrace("messagePostSuccess");
      t.getInstance().startTrace("messagePost");
      t.getInstance().startTrace("messageAdd");
      if (at()) {
        if (lt() && !ht())
          D.requestTranslation(H.messageBody(), s.chat.messageType.OUTGOING, B, ct);
        else {
          var e = o.messageFilters && o.messageFilters.outgoingMessageFilter ? o.messageFilters.outgoingMessageFilter : null, n = r.isFunction(e) ? e(H.messageBody()) : H.messageBody();
          F(n);
        }
        var i = d.getEmoticonNamesFromMessage(d.processOutgoingTextMessage(H.messageBody())), u = g.resolve(s.serviceLocator.PES_MRU_SERVICE);
        u.addItemsToMru(r.map(i, function (e) {
          return {
            id: e,
            type: S.itemTypes.emoticon.id
          };
        }));
        A.emoticonsSentInMessage(i, G);
        G = [];
        ft({
          messageLength: H.messageBody().length,
          emoticonsCount: i.length
        });
      }
    }
    function dt(e, t) {
      var n = t.translation, i = r.filter(e.translations(), function (e) {
          return e.users && e.users[0] && x.isMePersonId(e.users[0].mri);
        }).length;
      n && (!e.translations || !e.translations().length || !i ? e._translationsArray.add(n) : e.translations().forEach(function (e) {
        x.isMePersonId(e.users[0].mri) && (e.users[0].value = n.users[0].value);
      }));
      e.html(t.message);
    }
    function vt() {
      var e = d.getEmoticonNamesFromMessage(d.processOutgoingTextMessage(H.messageBody())), t = H.messageBody(), n = t.length, r = U.timestamp(), i = D.findMatchingTranslation(U.translations, B._translatorSettings), o = lt() && (i && i !== t || !i && U.html() !== t), u = {
          messageLength: n,
          emoticonsCount: e.length,
          isEdited: !0,
          timedelta: O.getMessageLifeDurationGroup(new Date() - r)
        };
      o ? (D.requestTranslation(t, s.chat.messageType.OUTGOING, B, dt.bind(null, U)), ft(u)) : U.html() !== t && (U.translations && U.translations().length && U.translations.empty(), U.html(t), ft(u));
      ot();
    }
    function mt() {
      H.messageBody("").length && H.messageBody("");
      R = -1;
      it();
      E.publish(a.textarea.HAS_INPUT, !1);
      H.dispatchEvent(a.textarea.INPUT, {
        viewModel: H,
        view: e
      }, H.DIRECTION.CHILD);
    }
    function gt(e) {
      if (e.type === "button")
        return e.isEditedMessage ? C.chat.editMessageButton : C.chat.sendMessageButton;
      if (e.type === "enter")
        return e.isEditedMessage ? C.chat.editMessageEnter : C.chat.sendMessageEnter;
    }
    function yt(e) {
      var t = g.resolve(s.serviceLocator.ACTION_TELEMETRY), n = gt(e);
      t.recordAction(n);
    }
    function bt() {
      yt({
        type: "button",
        isEditedMessage: U
      });
      Et();
    }
    function wt() {
      yt({
        type: "enter",
        isEditedMessage: U
      });
      Et();
    }
    function Et() {
      if (!st())
        return;
      if (!U && !at())
        return;
      U ? vt() : pt();
      U = null;
      mt();
    }
    function St() {
      bt();
      Ct(!0);
    }
    function xt(e) {
      if (U || at())
        e.preventDefault(), wt();
    }
    function Tt() {
      var e = i.conversationModel.historyService.activityItems().reverse(), t = I.personsAndGroupsManager.mePerson.id();
      return e.filter(function (e) {
        return e.sender && e.sender.id() === t;
      })[0];
    }
    function Nt(e) {
      X.chatInput = e;
      H.dispatchEvent(a.textarea.CHANGED, e, H.DIRECTION.PARENT);
      E.publish(a.textarea.HAS_INPUT, !0);
    }
    function Ct() {
      H.chatInputFocus(!0);
    }
    function kt() {
      if (!H.hasChatCapability())
        return;
      H.handleBlur();
      Ct();
    }
    function Lt() {
      k.setTimeout(H.handleFocus, 5000);
    }
    function At(e) {
      return !T.isCarriageReturn(e) && !T.isNewLine(e) && !T.isWhiteSpace(e);
    }
    function Ot() {
      var e = H.hasChatCapability() ? "area_text_insertText" : "area_text_agent_insertText";
      return Mt() && (e = "invite_free_respond_request"), w.fetch({ key: e });
    }
    function Mt() {
      function e() {
        return r.find(K(), function (e) {
          return e.type() === _.activityType.ContactRequestIncomingInviteFree;
        });
      }
      return e() && g.resolve(s.serviceLocator.FEATURE_FLAGS).isFeatureOn(s.featureFlags.INVITE_FREE_IMPLICIT_INCOMING_CONTACT_REQUEST);
    }
    function _t(e) {
      var t = r.find(e.sourceTab.packs, function (t) {
        return t.items.some(function (t) {
          return t === e.item;
        });
      });
      G.push({
        item: e.item,
        type: e.sourceTab.id === "mru" ? s.telemetry.pes.source.RECENTS : s.telemetry.pes.source.ROSTER,
        tabIndex: e.sourceTab.index,
        tabName: e.sourceTab.title,
        section: t && t.isFeatured ? s.telemetry.pes.section.FEATURED : s.telemetry.pes.section.REGULAR
      });
    }
    function Dt(e) {
      return e.preventDefault(), e.stopPropagation(), h.getBrowserInfo().isIeEngine && (e.returnValue = !1), !1;
    }
    function Pt(e) {
      var t = d.unwebify(e);
      return t = l.build(n).getNodeTextContent(t), t = d.unboxHrefContent(t), t;
    }
    var H = this, B = i.conversationModel, j = B && B.chatService.sendMessage, F = i.sendMessage || j, I = n.get(), q = I.translatorService, R = -1, U = null, z = !1, W, X, V, $, J = nt() ? b.newObservableProperty(i.conversationModel.participantsCount) : v.observable(1), K = nt() ? b.newObservableCollection(i.conversationModel.historyService.activityItems) : v.observableArray(), Q = "active", G = [], Y = g.resolve(s.serviceLocator.FEATURE_FLAGS), Z = Y.isFeatureOn(s.featureFlags.TRANSLATOR_SENDING_ENABLED), et, tt;
    H.init = function () {
      nt() ? X = y.forModel(i.conversationModel) : X = { chatInput: null };
      H.conversationModel = i.conversationModel;
      H.isEnabled = i.isEnabled;
      H.isServiceEnabled = i.isServiceEnabled;
      H.hasChatCapability = i.hasChatCapability;
      H.getSelectionStart = e.getSelectionStart;
      H.setBlurAndFocus = kt;
      H.messageMaxLength = s.textarea.MAX_LENGTH;
      H.topicViewModel = N.build(i.conversationModel);
      $ = H.isEnabled.subscribe(function (e) {
        e && p.execute(kt);
      });
      H.messageBody = v.observable(X.chatInput || "");
      H.label = v.pureComputed(function () {
        return J() < 2 ? w.fetch({
          key: "label_text_insertText_oneToOne",
          params: { displayName: H.topicViewModel.topic() }
        }) : w.fetch({
          key: "label_text_insertText_group",
          params: {
            displayName: H.topicViewModel.topic(),
            participantsCount: J()
          }
        });
      });
      H.placeholder = v.computed(Ot);
      it();
      V = H.messageBody.subscribe(Nt);
      H.registerEvent(a.textarea.SUBMIT_AND_FOCUS, St);
      H.registerEvent(a.emoticonPicker.EMOTICON_SELECTED, H.insertAtCursor);
      H.registerEvent(f.EVENTS.CALL_SCREEN_CLOSE, Ct);
      H.registerEvent(a.message.QUOTE, H.quoteMessageText);
      H.registerEvent(a.message.EDIT, H.requestEditMessageText);
      H.registerEvent(a.expressionPicker.CLOSE_REQUEST, kt);
      H.registerEvent(a.shareControl.SHARE_CONTROL_HIDE, Ct);
      E.subscribe(s.apiUIEvents.SWX_TIMELINE_LOADED, Lt);
      E.subscribe(a.newConversation.CANCELLED, Ct);
      E.subscribe(a.navigation.FRAGMENT_LOADED, kt);
      E.subscribe(a.navigation.LEAVE_EDIT_MODE, Ct);
      E.subscribe(a.expressionPicker.ITEM_SEND_REQUEST, H.insertAtCursor);
      H.dispatchEvent(a.textarea.INITIALIZATION_COMPLETE, H, H.DIRECTION.PARENT);
      kt();
    };
    H.dispose = function () {
      k.clearTimeout(W);
      E.unsubscribe(s.apiUIEvents.SWX_TIMELINE_LOADED, Lt);
      E.unsubscribe(a.newConversation.CANCELLED, Ct);
      E.unsubscribe(a.navigation.LEAVE_EDIT_MODE, Ct);
      E.unsubscribe(a.navigation.FRAGMENT_LOADED, kt);
      E.unsubscribe(a.expressionPicker.ITEM_SEND_REQUEST, H.insertAtCursor);
      $.dispose();
      V.dispose();
      H.placeholder.dispose();
      H.topicViewModel.dispose();
    };
    H.insertAtCursor = function (t, n) {
      var r, s, o, u, a = t.item;
      if (a.type !== "emoticon" || t.conversation !== i.conversationModel)
        return;
      _t(t);
      r = n || e.getSelectionStart();
      s = H.messageBody();
      o = a.shortcut + " ";
      u = T.inject(s, o, r);
      H.messageBody(u);
      e.setCursorAt(r + o.length);
      kt();
    };
    H.handleKeyDown = function (e, t) {
      if (ut(a.textarea.KEY_DOWN, t))
        return !1;
      var n = t.keyCode || t.which;
      return n === u.UP && e.messageBody() === "" && e.requestEditMessageText(), n === u.ESCAPE && e.messageBody() !== "" && (ot(), mt(), t.stopPropagation()), !0;
    };
    H.handleInput = function () {
      H.messageBody().length !== R && it();
      H.messageBody().length === 0 && (E.publish(a.textarea.HAS_INPUT, !1), ot());
      H.dispatchEvent(a.textarea.INPUT, {
        viewModel: H,
        view: e
      }, H.DIRECTION.CHILD);
    };
    H.handleKeyPress = function (e, t) {
      if (ut(a.textarea.KEY_PRESS, t))
        return !1;
      var n = t.keyCode || t.which;
      return n === u.ENTER && !t.shiftKey ? xt(t) : z || rt(), !0;
    };
    H.onFocus = function () {
      i.chatInputEl.addClass(Q);
    };
    H.onBlur = function () {
      i.chatInputEl.removeClass(Q);
      e.updateSizing();
    };
    H.onBeforePaste = function (e, t) {
      return Dt(t);
    };
    H.onPaste = function (t, r) {
      function w(e) {
        e.name = P;
        o.push(e);
      }
      function E(e) {
        d ? At(e) && (m += e, v--, d = !1) : (m += e, v--, T.isNewLine(e) && (d = !0));
      }
      var i = r.clipboardData || k.clipboardData, o = [], u = !!k.clipboardData, a = Y.isFeatureOn(s.featureFlags.FILE_PASTE_ENABLED), f = H.conversationModel.fileTransferService.send.enabled(), l = a && n.get().personsAndGroupsManager.mePerson.preferences(s.userSettings.preferences.FILE_PASTE).value(), c = a && f && l, h, d, v, m, g, y, b;
      r.originalEvent && (i = i || r.originalEvent.clipboardData);
      h = i.getData("Text");
      if (!h && c) {
        u ? Array.prototype.forEach.call(i.files, function (e) {
          w(e);
        }) : Array.prototype.some.call(i.types, function (e) {
          return e === "Files";
        }) && Array.prototype.forEach.call(i.items, function (e) {
          var t = e.getAsFile();
          t && w(t);
        });
        if (o.length)
          return H.conversationModel.fileTransferService.send(o), Dt(r);
      }
      h = i.getData("Text");
      d = !0;
      m = "";
      g = H.messageBody();
      y = e.getSelectionStart();
      b = e.getSelectionEnd();
      v = H.messageMaxLength - g.length + b - y;
      for (var S = 0; S < h.length && v > 0; S++)
        E(h[S]);
      return H.messageBody(T.inject(g, m, y, b)), p.execute(function () {
        e.setCursorAt(y + m.length);
      }), it(), Dt(r);
    };
    H.chatInputFocus = v.observable(!1);
    H.handleFocus = function () {
      return M.isAnyElementFocused() || p.execute(function () {
        H.chatInputFocus(!0);
      }), !0;
    };
    H.handleBlur = function () {
      H.chatInputFocus(!1);
    };
    H.quoteMessageText = function (t) {
      var n = t.sender.displayName(), r = c.formatTimestamp(t.timestamp()), i = d.unboxHrefContent(t.text()), s = D.findMatchingTranslation(t.translations, B._translatorSettings), o = Z && s ? Pt(s) : i, u = "[" + r + "] " + n + ": " + o + " \n \n <<< ";
      ot();
      H.messageBody(u);
      it();
      p.execute(e.setCaretToEnd);
    };
    H.requestEditMessageText = function (t) {
      if (!nt())
        return;
      var n = i.conversationModel.historyService.activityItems();
      if (!n.length)
        return;
      t = t || Tt();
      if (!t || t.type() === _.activityType.SystemMessage)
        return;
      if (t.html && t.html.set.enabled() && t.text) {
        var r = d.compactHtml(t.html()), s = D.findMatchingTranslation(t.translations, B._translatorSettings), o = Z && s ? s : r;
        o = Pt(o);
        H.messageBody(o);
        U = t;
        it();
        p.execute(e.setCaretToEnd);
        e.editing(!0);
      }
    };
  }
  var t = e("services/telemetry/logging/perf/main"), n = e("cafe/applicationInstance"), r = e("lodash-compat"), i = e("utils/common/eventMixin"), s = e("constants/common"), o = e("experience/settings"), u = e("constants/keys"), a = s.events, f = e("constants/calling"), l = e("utils/common/encoder"), c = e("utils/chat/dateTime"), h = e("browser/detect"), p = e("utils/common/async"), d = e("utils/chat/messageSanitizer"), v = e("vendor/knockout"), m = s.isTyping, g = e("services/serviceLocator"), y = e("utils/chat/conversationCache"), b = e("utils/common/cafeObservable"), w = e("swx-i18n").localization, E = e("services/pubSub/pubSub"), S = e("services/pes/constants"), x = e("ui/modelHelpers/personHelper"), T = e("swx-utils-common").stringUtils, N = e("ui/viewModels/chat/conversationTopic"), C = e("ui/telemetry/actions/actionNames"), k = e("browser/window"), L = e("ui/telemetry/telemetryClient"), A = e("telemetry/chat/pes"), O = e("telemetry/chat/telemetryEnumerator"), M = e("utils/common/applicationFocusManager"), _ = e("swx-enums"), D = e("utils/chat/translatorHelper"), P = "fileFromClipboard";
  return r.assign(H.prototype, i), H;
});
