define("ui/viewModels/people/properties/agentDetails", [
  "require",
  "lodash-compat",
  "vendor/knockout",
  "utils/common/cafeObservable",
  "swx-constants",
  "swx-service-locator-instance",
  "swx-i18n"
], function (e) {
  function u(e) {
    function l() {
      return a || (a = {
        certification: r.newObservableProperty(e.agentDetails.certification),
        rating: r.newObservableProperty(e.agentDetails.rating),
        author: r.newObservableProperty(e.agentDetails.author),
        description: r.newObservableProperty(e.agentDetails.description),
        website: r.newObservableProperty(e.agentDetails.website),
        privacyStatement: r.newObservableProperty(e.agentDetails.privacyStatement),
        termsOfService: r.newObservableProperty(e.agentDetails.termsOfService),
        extraInfo: r.newObservableProperty(e.agentDetails.extraInfo),
        messagesModeAll: r.newObservableProperty(e.agentDetails.messages_mode_all)
      }, a.capabilities = c(), a.capabilitiesText = n.computed(m), a.ratingStars = n.computed(g), a.descriptionWithLinks = n.computed(y), a.extraInfoWithLinks = n.computed(b)), a;
    }
    function c() {
      var n = {
        audio_send: r.newObservableProperty(e.capabilities.audio),
        video_send: r.newObservableProperty(e.capabilities.video),
        im_send: r.newObservableProperty(e.capabilities.chat),
        screen_sharing: r.newObservableProperty(e.capabilities.screenSharing),
        gvc: r.newObservableProperty(e.capabilities._gvc),
        group_chat: r.newObservableProperty(e.capabilities._groupChat),
        file_send: r.newObservableProperty(e.capabilities._fileSend),
        contact_send: r.newObservableProperty(e.capabilities._contactSend),
        videomessage_send: r.newObservableProperty(e.capabilities._videoMessageSend),
        audiomessage_send: r.newObservableProperty(e.capabilities._audioMessageSend),
        mediamessage_send: r.newObservableProperty(e.capabilities._mediaMessageSend),
        media_autoplay: r.newObservableProperty(e.capabilities._mediaAutoplay),
        photo_send: r.newObservableProperty(e.capabilities._photoSend),
        moji_send: r.newObservableProperty(e.capabilities._mojiSend),
        location_send: r.newObservableProperty(e.capabilities._locationSend)
      };
      return n.dispose = function () {
        t.invoke(n, "dispose");
      }, n;
    }
    function h() {
      a && (t.invoke(a, "dispose"), a = undefined);
    }
    function p(e) {
      return e && (e = e.replace(/(https?\:\/\/)(\S+)(\w{2,4})(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/gi, d)), e;
    }
    function d(e) {
      var t = e;
      return t.match("^https?://") || (t = "http://" + t), "<a href=\"" + t + "\" target=\"_blank\">" + e + "</a>";
    }
    function v(e, t) {
      var n = a.messagesModeAll, r = " ";
      switch (t) {
      case "group_chat":
        var i = n && n() ? f.GROUP_ALL : f.GROUP_PRIVATE;
        e += r + o.fetch(i);
      }
      return e;
    }
    function m() {
      var e = [], n = s.resolve(i.serviceLocator.FEATURE_FLAGS), r = n.isFeatureOn(i.featureFlags.BOT_MESSAGES_MODE_V2_ENABLED);
      return t.forOwn(a.capabilities, function (t, n) {
        if (t()) {
          var i = o.fetch({ key: "label_text_agent_profile_capabilities_" + n });
          r && (i = v(i, n));
          e.push(i);
        }
      }), e.length ? e.join(o.fetch({ key: "label_text_agent_profile_capabilities_join_char" })) : o.fetch({ key: "label_text_agent_profile_capabilities_none" });
    }
    function g() {
      var e = [], t = a.rating() || 0, n = (t % 1).toFixed(1);
      for (var r = 1; r <= t; r++)
        e.push(1);
      return n >= 0.5 && n < 0.75 ? e.push(0.5) : n >= 0.75 && e.push(1), e;
    }
    function y() {
      return p(a.description());
    }
    function b() {
      return p(a.extraInfo());
    }
    var u = this, a, f = {
        GROUP_PRIVATE: {
          key: "label_text_agent_profile_capabilities_group_chat_mention_only_mode",
          params: { botName: t.escape(e.displayName()) }
        },
        GROUP_ALL: { key: "label_text_agent_profile_capabilities_group_chat_all_messages_mode" }
      };
    return t.isFunction(e.isAgent) ? u.isAgent = r.newObservableProperty(e.isAgent) : u.isAgent = n.observable(!1), u.compute = function () {
      return u.isAgent() ? l() : h();
    }, u.dispose = function () {
      u.isAgent.dispose && u.isAgent.dispose();
      h();
    }, u;
  }
  var t = e("lodash-compat"), n = e("vendor/knockout"), r = e("utils/common/cafeObservable"), i = e("swx-constants").COMMON, s = e("swx-service-locator-instance").default, o = e("swx-i18n").localization;
  return u.build = function (e) {
    return new u(e);
  }, u;
});
