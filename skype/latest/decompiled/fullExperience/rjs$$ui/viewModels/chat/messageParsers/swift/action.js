define("ui/viewModels/chat/messageParsers/swift/action", [
  "require",
  "swx-cafe-application-instance",
  "ui/viewModels/calling/helpers/callingFacade",
  "swx-enums",
  "swx-i18n",
  "vendor/knockout",
  "swx-encoder/lib/encoders/mentionsEncoder",
  "swx-constants",
  "swx-constants",
  "ui/viewModels/chat/messageParsers/swift/telemetry/swiftCardTelemetry",
  "ui/viewModels/chat/messageParsers/swift/utils"
], function (e) {
  function d(e, t, n) {
    this.type = e.type ? c.normalizeEnum(e.type, d.Type, d.Type.unknown) : null;
    this.title = c.normalizeRichText(e.title);
    this.value = e.value ? e.value : null;
    this.fallbackUri = e.fallback && e.fallback.uri ? c.normalizeUrl(e.fallback.uri, d.Type.payment) : null;
    this.isCalling = s.observable(!1);
    this.senderId = n.id();
    this.tooltip = this.title;
    switch (this.type) {
    case d.Type.call:
      this.value = c.normalizeDestination(this.value);
      break;
    case d.Type.imBack:
      var r;
      if (t.isGroupConversation()) {
        var u = o.build(t), a = u.getMentionUserData(this.senderId);
        r = a ? u.createXmlElement(document, a).outerHTML : null;
      }
      r && (this.value = r + " " + this.value);
      break;
    case d.Type.showImage:
      this.value && (this.value = c.normalizeUrl(e.value, d.Type.showImage)), this.title || (this.title = i.fetch({ key: "accessibility_swift_showImage" }));
      break;
    case d.Type.openUrl:
      this.value = c.normalizeUrl(e.value, d.Type.openUrl), this.tooltip ? this.tooltip += "\n\n" + this.value : this.tooltip = this.value;
      break;
    case d.Type.payment:
      this.value = this.fallbackUri ? this.fallbackUri : c.normalizeUrl(e.value, d.Type.payment), this.tooltip ? this.tooltip += "\n\n" + this.value : this.tooltip = this.value, this.title || (this.title = this.tooltip);
      break;
    case d.Type.signIn:
      this.value = c.normalizeUrl(e.value, d.Type.signIn), this.title || (this.title = i.fetch({ key: "message_text_swift_signInTitle" }));
      break;
    case d.Type.unsupportedType:
      this.type = d.Type.openUrl, this.title || (this.title = i.fetch({ key: "message_text_swift_unsupported_button" })), this.value || (this.value = h);
      break;
    default:
    }
    this.conversation = t;
    this.action = this.action.bind(this);
    if (!this.isValid()) {
      var p = l.build();
      this.type ? this.title ? this.value || p.publishInvalidCard(f.invalidCardReasons.MissinActionValue, this.senderId) : p.publishInvalidCard(f.invalidCardReasons.MissinActionTitle, this.senderId) : p.publishInvalidCard(f.invalidCardReasons.MissingActionType, this.senderId);
    }
  }
  var t = e("swx-cafe-application-instance"), n = e("ui/viewModels/calling/helpers/callingFacade"), r = e("swx-enums"), i = e("swx-i18n").localization, s = e("vendor/knockout"), o = e("swx-encoder/lib/encoders/mentionsEncoder"), u = e("swx-constants").PEOPLE, a = e("swx-constants").COMMON, f = a.telemetry.swiftCard, l = e("ui/viewModels/chat/messageParsers/swift/telemetry/swiftCardTelemetry"), c = e("ui/viewModels/chat/messageParsers/swift/utils"), h = "https://www.skype.com/", p = "width=600, height=620, menubar=no, status=no, titlebar=no, toolbar=no, rel=noopener noreferrer";
  d.Type = {
    unknown: "unknown",
    unsupportedType: "unsupportedType",
    openUrl: "openUrl",
    imBack: "imBack",
    signIn: "signIn",
    call: "call",
    showImage: "showImage",
    payment: "payment"
  };
  for (var v in d.Type) {
    var m = v.toLowerCase();
    d.Type.hasOwnProperty(v) && !d.Type.hasOwnProperty(m) && (d.Type[m] = d.Type[v]);
  }
  return d.prototype.isValid = function () {
    return !!this.type && !!this.title && (!!this.value || !!this.fallbackUri);
  }, d.prototype.isDisabled = function () {
    return !!this.value && this.value === c.invalidValue;
  }, d.prototype.isSupported = function () {
    return !!this.type && this.type !== d.Type.unknown;
  }, d.prototype.action = function () {
    function n(e, t, n) {
      var r = l.build();
      r.publishCardAction(e, t, n);
    }
    var t = this;
    return this.isValid() && !this.isCalling() ? this[this.type]().then(function () {
      n(t.type, !0, t.senderId);
    }).catch(function () {
      n(t.type, !1, t.senderId);
    }) : (n(this.type, !1, this.senderId), Promise.resolve());
  }, d.prototype[d.Type.openUrl] = function () {
    var t;
    return this.value.match(/^skype:/) ? this.call() : (t = window.open(), t.opener = null, t.location = this.value, Promise.resolve());
  }, d.prototype[d.Type.payment] = function () {
    if (!this.value)
      return;
    var t = window.open(this.value, "_blank", p);
    return t && window.focus && t.focus(), t.opener = null, Promise.resolve();
  }, d.prototype[d.Type.showImage] = d.prototype[d.Type.openUrl], d.prototype[d.Type.signIn] = d.prototype[d.Type.openUrl], d.prototype[d.Type.imBack] = function () {
    return this.conversation.chatService._sendMessageWithoutSanitization(this.value);
  }, d.prototype[d.Type.call] = function () {
    function c() {
      var e = f.results().length, t = e ? f.results(0).result : undefined;
      s.isCalling(!1);
      if (t && t.id() === a)
        return h(t._type() + ":" + t.id());
    }
    function h(e) {
      var r = t.get().conversationsManager._getOrCreateConversation(e);
      if (!o) {
        var i = r.participants(0), s = i && i.person.phoneNumbers(0) ? i.person.phoneNumbers(0).telUri() : a;
        i.audio.endpoint && i.audio.endpoint(s);
      }
      return n.placeCall(r, !1, "swiftCardAction", !0);
    }
    var i = this.value.match(/^(skype|tel):(.*)$/), s = this, o = i[1] === "skype", a = i[2];
    if (o) {
      var f = t.get().personsAndGroupsManager.createPersonSearchQuery(), l = r.searchScope.All;
      return f.sources(l).keywords.id = a, this.isCalling(!0), f.getMore().then(c);
    }
    return h(u.contactTypes.PSTN + ":" + a);
  }, {
    build: function (e, t, n) {
      return new d(e, t, n);
    },
    Type: d.Type
  };
});
