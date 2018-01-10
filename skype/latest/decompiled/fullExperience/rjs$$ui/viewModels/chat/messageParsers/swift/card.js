define("ui/viewModels/chat/messageParsers/swift/card", [
  "require",
  "ui/viewModels/chat/messageParsers/swift/content",
  "ui/viewModels/chat/messageParsers/swift/content",
  "ui/viewModels/chat/messageParsers/swift/content",
  "ui/viewModels/chat/messageParsers/swift/content",
  "ui/viewModels/chat/messageParsers/swift/content",
  "ui/viewModels/chat/messageParsers/swift/utils",
  "swx-constants",
  "ui/viewModels/chat/messageParsers/swift/telemetry/swiftCardTelemetry"
], function (e) {
  function c(e, u, c, h) {
    this.contentType = o.normalizeEnum(e.contentType, l, l.unknown);
    this.messageId = c.clientmessageid;
    this.conversationId = u.conversationId;
    this.content = null;
    var p = f.build();
    if (!e.content) {
      this.isValid() || p.publishInvalidCard(a.invalidCardReasons.CardMissingContent, h.id());
      this.isSupported() || p.publishUnsupportedCard(a.unsupportedCardReasons.CardUnsupportedType, h.id());
      return;
    }
    switch (this.contentType) {
    case l.hero:
    case l.thumb:
      this.content = t.build(e.content, u, h, this.contentType);
      break;
    case l.signIn:
      this.content = r.build(e.content, u, h);
      break;
    case l.receipt:
      this.content = n.build(e.content, u, h);
      break;
    case l.audio:
    case l.video:
    case l.animation:
      this.content = i.build(e.content, u, h, this.contentType);
      break;
    case l.flex:
      this.content = s.build(e.content, u, h, this.contentType);
    }
    !this.isSupported() && this.contentType === l.unknown && p.publishUnsupportedCard(a.unsupportedCardReasons.CardUnsupportedType, h.id());
  }
  var t = e("ui/viewModels/chat/messageParsers/swift/content").main, n = e("ui/viewModels/chat/messageParsers/swift/content").receipt, r = e("ui/viewModels/chat/messageParsers/swift/content").signIn, i = e("ui/viewModels/chat/messageParsers/swift/content").media, s = e("ui/viewModels/chat/messageParsers/swift/content").flex, o = e("ui/viewModels/chat/messageParsers/swift/utils"), u = e("swx-constants").COMMON, a = u.telemetry.swiftCard, f = e("ui/viewModels/chat/messageParsers/swift/telemetry/swiftCardTelemetry"), l = o.ContentType;
  return c.prototype.isValid = function () {
    return this.contentType !== l.unknown && this.content && this.content.isValid() || this.contentType === l.unknown;
  }, c.prototype.isSupported = function () {
    return this.contentType !== l.unknown && (!this.content || this.content.isSupported());
  }, {
    build: function (e, t, n, r) {
      return new c(e, t, n, r);
    }
  };
});
