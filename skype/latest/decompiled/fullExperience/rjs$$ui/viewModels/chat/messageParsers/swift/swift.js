define("ui/viewModels/chat/messageParsers/swift/swift", [
  "require",
  "ui/viewModels/chat/messageParsers/swift/action",
  "lodash-compat",
  "ui/viewModels/chat/messageParsers/swift/card",
  "vendor/knockout",
  "ui/viewModels/chat/messageParsers/swift/utils",
  "swx-constants",
  "ui/viewModels/chat/messageParsers/swift/telemetry/swiftCardTelemetry",
  "utils/common/styleModeHelper",
  "ui/modelHelpers/personHelper",
  "utils/common/rtlChecker"
], function (e) {
  function v(e) {
    return e.some(l.isMePersonId);
  }
  function m(e, l, g, y) {
    var b = a.build();
    this.summary = s.normalizeText(e.summary);
    this.type = e.type ? s.normalizeEnum(e.type, m.Type, m.Type.unknown) : null;
    this.cards = s.mapArray(e.attachments, function (e) {
      return r.build(e, l, g, y);
    });
    if (!this.isValid()) {
      this.type ? this.cards.length === 0 && b.publishInvalidCard(u.invalidCardReasons.SwiftMissingCards, y.id()) : b.publishInvalidCard(u.invalidCardReasons.SwiftMissingType, y.id());
      return;
    }
    this.isSupported() || (this.button = t.build({ type: t.Type.unsupportedType }, l, y), this.type === m.Type.unknown && b.publishUnsupportedCard(u.unsupportedCardReasons.SwiftUnknownType, y.id()));
    if (e.suggestedActions && e.suggestedActions.actions) {
      var w = !0, E = e.suggestedActions.to && e.suggestedActions.to.length > 0;
      l.isGroupConversation() && E && (w = v(e.suggestedActions.to));
      w && s.mapArray(e.suggestedActions.actions, function (e) {
        g.suggestedActions.push(t.build(e, l, y));
      });
    }
    this.areButtonsMultiLine = !n.every(this.cards, function (e) {
      return e.content && e.isValid() && e.content.areButtonsMultiLine === !1;
    });
    this.isFirst = i.observable(!0);
    this.isLast = i.observable(this.cards.length === 1);
    this.selectedCard = i.observable(0);
    this.isMultiple = i.observable(this.cards.length > 1);
    this.isMultiple() && n.each(this.cards, function (e) {
      if (!e.isValid() || !e.content)
        return;
      e.content.mainSection ? n.each(e.content.mainSection.images, function (e) {
        e.isImageInCarousel(!0);
      }) : e.content.media && e.content.media.animation && e.content.media.animation.isImageInCarousel(!0);
    });
    this.calculatePosition = function () {
      var t = h;
      return f.get().currentMode() === o.styleMode.NARROW && (t = p), this.isFirst() ? "0px" : this.isLast() ? "calc(" + this.selectedCard() * -t + "px + (100% - " + t + "px))" : "calc(" + this.selectedCard() * -t + "px + (100% - " + t + "px) / 2)";
    };
    this.carouselLeftPosition = function () {
      return c.isRtl() ? d : this.calculatePosition();
    };
    this.carouselRightPosition = function () {
      return c.isRtl() ? this.calculatePosition() : d;
    };
  }
  var t = e("ui/viewModels/chat/messageParsers/swift/action"), n = e("lodash-compat"), r = e("ui/viewModels/chat/messageParsers/swift/card"), i = e("vendor/knockout"), s = e("ui/viewModels/chat/messageParsers/swift/utils"), o = e("swx-constants").COMMON, u = o.telemetry.swiftCard, a = e("ui/viewModels/chat/messageParsers/swift/telemetry/swiftCardTelemetry"), f = e("utils/common/styleModeHelper"), l = e("ui/modelHelpers/personHelper"), c = e("utils/common/rtlChecker"), h = 288, p = 188, d = "auto";
  return m.prototype.isSupported = function () {
    return this.isValid() && this.type !== m.Type.unknown && n.every(this.cards, function (e) {
      return e.isSupported();
    });
  }, m.prototype.isValid = function () {
    return !!this.type && this.cards.length !== 0 && n.every(this.cards, function (e) {
      return e.isValid();
    });
  }, m.prototype.isCarousel = function () {
    return this.type === m.Type.carousel;
  }, m.prototype.nextCard = function () {
    this.moveTo(this.selectedCard() + 1);
  }, m.prototype.prevCard = function () {
    this.moveTo(this.selectedCard() - 1);
  }, m.prototype.moveTo = function (t) {
    if (t < 0 || t >= this.cards.length)
      return;
    this.selectedCard(t);
    this.isFirst(t === 0);
    this.isLast(t === this.cards.length - 1);
  }, m.prototype.moveToCard = function (t) {
    this.moveTo(this.cards.indexOf(t));
  }, m.Type = {
    unknown: "Unknown",
    card: "Card",
    carousel: "Carousel",
    signIn: "SignIn",
    receipt: "Receipt"
  }, m.Type["message/card"] = m.Type.card, m.Type["message/card.carousel"] = m.Type.carousel, m.Type["message/card.signin"] = m.Type.signIn, m.Type["message/card.receipt"] = m.Type.receipt, {
    build: function (e, t, n, r) {
      return new m(e, t, n, r);
    },
    Type: m.Type
  };
});
