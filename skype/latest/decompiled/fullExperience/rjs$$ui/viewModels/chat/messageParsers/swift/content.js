define("ui/viewModels/chat/messageParsers/swift/content", [
  "require",
  "lodash-compat",
  "ui/viewModels/chat/messageParsers/swift/action",
  "ui/viewModels/chat/messageParsers/swift/fact",
  "ui/viewModels/chat/messageParsers/swift/section",
  "ui/viewModels/chat/messageParsers/swift/utils",
  "vendor/knockout",
  "swx-i18n",
  "swx-constants",
  "ui/viewModels/chat/messageParsers/swift/image",
  "ui/viewModels/chat/messageParsers/swift/telemetry/swiftCardTelemetry",
  "ui/modelHelpers/personHelper"
], function (e) {
  function m(e) {
    switch (e.length) {
    case 2:
      return !t.every(e, function (e) {
        return e.title.length <= 11;
      });
    case 3:
      return !t.every(e, function (e) {
        return e.title.length <= 5;
      });
    }
    return !0;
  }
  function g(e, t, r, o) {
    this.type = o;
    this.buttons = s.filterOutDisabledItems(e.buttons, function (e) {
      return n.build(e, t, r);
    });
    this.tap = e.tap ? s.getItemIfNotDisabled(n.build(e.tap, t, r)) : null;
    this.mainSection = i.build(e, t, r, o);
    var u = this.computeButtonsLimit();
    this.buttons.length > u && (this.buttons = this.buttons.slice(0, u));
    this.areButtonsMultiLine = m(this.buttons);
    var a = c.build();
    this.isValid() || (this.mainSection.isValid() ? a.publishInvalidCard(f.invalidCardReasons.InvalidButton, r.id()) : a.publishInvalidCard(f.invalidCardReasons.MainSectionNotValid, r.id()));
    this.isSupported() || a.publishUnsupportedCard(f.unsupportedCardReasons.ContentUnsupportedButton, r.id());
  }
  function y(e, t, r, i) {
    this.type = i;
    this.buttons = s.filterOutDisabledItems(e.buttons, function (e) {
      return n.build(e, t, r);
    });
    this.title = e.title ? s.normalizeRichText(e.title) : null;
    this.subtitle = e.subtitle ? s.normalizeRichText(e.subtitle) : null;
    this.text = e.text ? s.normalizeRichText(e.text) : null;
    this.tap = e.tap ? s.getItemIfNotDisabled(n.build(e.tap, t, r)) : null;
    this.images = s.filterOutNotValidItems(e.images, function (e) {
      return l.build(e, t, r, i);
    });
    var o = this.computeButtonsLimit();
    this.buttons.length > o && (this.buttons = this.buttons.slice(0, o));
    this.areButtonsMultiLine = m(this.buttons);
    this.expandedText = function () {
      return this.title && this.subtitle ? "" : this.title || this.subtitle ? "expandedTextOnce" : "expandedTextTwice";
    };
    var u = c.build();
    this.isValid() || u.publishInvalidCard(f.invalidCardReasons.InvalidButton, r.id());
    this.isSupported() || u.publishUnsupportedCard(f.unsupportedCardReasons.ContentUnsupportedButton, r.id());
  }
  function b(e) {
    return h.isAgent(e) && e.capabilities._mediaAutoplay && e.capabilities._mediaAutoplay();
  }
  function w(e) {
    var t = e.replace(/^(https?:\/\/)?(w*\.)?/i, ""), n = "/";
    return t.split(n)[0];
  }
  function E(e, t, r, i) {
    this.type = i;
    this.autoloop = e.autoloop;
    this.autostart = (!t.isGroupConversation() || h.isKnownPerson(r)) && b(r) ? e.autostart : !1;
    this.shareable = e.shareable;
    this.subtitle = e.subtitle ? s.normalizeText(e.subtitle) : null;
    this.title = e.title ? s.normalizeText(e.title) : null;
    this.image = l.build(e.image || {}, t, r, i);
    this.aspect = e.aspect && e.aspect === d ? "portrait" : "landscape";
    this.hasThumbnail = function () {
      return !!this.image && !!this.image.url;
    };
    var o = {}, u = e.media && e.media.length && e.media[0], a = u ? s.normalizeUrl(u.url) : null;
    if (u)
      switch (i) {
      case p.video:
        o[v.VIDEO] = a;
        break;
      case p.audio:
        o[v.AUDIO] = a;
        break;
      case p.animation:
        o[v.ANIMATION] = l.build(u || {}, t, r, i);
      }
    this.media = o;
    this.mediaSourceDomain = a ? w(a) : null;
    this.buttons = s.filterOutDisabledItems(e.buttons, function (e) {
      return n.build(e, t, r);
    });
    this.areButtonsMultiLine = m(this.buttons);
    this.hasTextInfo = function () {
      return !!this.title || !!this.subtitle;
    };
    var g = c.build();
    this.isValid() || g.publishInvalidCard(f.invalidCardReasons.MediaCardMissingSrc, r.id());
  }
  function S(e, r, i) {
    this.type = p.signIn;
    this.buttons = s.filterOutDisabledItems(e.buttons, function (e) {
      return n.build(e, r, i);
    });
    var o = t.find(this.buttons, function (e) {
      return e.type === n.Type.signIn;
    });
    this.buttons = o ? [o] : [];
    this.text = s.normalizeRichText(e.text);
    if (!this.isValid()) {
      var u = c.build();
      this.buttons.length === 0 ? u.publishInvalidCard(f.invalidCardReasons.SignInMissingButtons, i.id()) : this.text || u.publishInvalidCard(f.invalidCardReasons.SignInMissingText, i.id());
    }
  }
  function x(e, t, a) {
    function y() {
      l.displayedItems(h);
      l.foldButtonText(u.fetch({ key: "message_text_swift_showAll" }));
    }
    function b() {
      var e = 0;
      for (var t = 0; t < l.items.length; t++) {
        if (e >= d)
          return;
        h.push(l.items[t]);
        l.items[t].images.length > 0 ? e += v : e++;
      }
      h = [];
    }
    var l = this, h = [], d = 5, v = 3;
    this.type = p.receipt;
    this.buttons = s.filterOutDisabledItems(e.buttons, function (e) {
      return n.build(e, t, a);
    });
    this.buttons.length > 3 && (this.buttons = this.buttons.slice(0, 3));
    this.areButtonsMultiLine = m(this.buttons);
    this.tap = e.tap ? n.build(e.tap, t, a) : null;
    this.title = s.normalizeRichText(e.title);
    this.total = s.normalizeText(e.total);
    this.tax = s.normalizeText(e.tax);
    this.vat = s.normalizeText(e.vat);
    this.facts = s.filterOutNotValidItems(e.facts, function (e) {
      return r.build(e, t);
    });
    this.items = s.filterOutNotValidItems(e.items, function (e) {
      return i.build(e, t, a, p.thumb);
    });
    this.displayedItems = o.observableArray();
    this.showFoldButton = o.observable(!1);
    this.isCollapsed = o.observable(!1);
    this.foldButtonText = o.observable();
    b();
    h.length > 0 ? (this.showFoldButton(!0), l.isCollapsed(!0), y()) : this.displayedItems(this.items);
    var g = c.build();
    this.isValid() || (this.total ? g.publishInvalidCard(f.invalidCardReasons.ReceiptInvalidButton, a.id()) : g.publishInvalidCard(f.invalidCardReasons.ReceiptMissingTotal, a.id()));
    this.isSupported() || g.publishUnsupportedCard(f.unsupportedCardReasons.ReceiptUnsupportedButton, a.id());
    this.triggerFoldAction = function () {
      l.isCollapsed(!l.isCollapsed());
      l.isCollapsed() ? y() : (l.displayedItems(l.items), l.foldButtonText(u.fetch({ key: "message_text_swift_showLess" })));
    };
  }
  var t = e("lodash-compat"), n = e("ui/viewModels/chat/messageParsers/swift/action"), r = e("ui/viewModels/chat/messageParsers/swift/fact"), i = e("ui/viewModels/chat/messageParsers/swift/section"), s = e("ui/viewModels/chat/messageParsers/swift/utils"), o = e("vendor/knockout"), u = e("swx-i18n").localization, a = e("swx-constants").COMMON, f = a.telemetry.swiftCard, l = e("ui/viewModels/chat/messageParsers/swift/image"), c = e("ui/viewModels/chat/messageParsers/swift/telemetry/swiftCardTelemetry"), h = e("ui/modelHelpers/personHelper"), p = s.ContentType, d = "9:16", v = {
      VIDEO: "video",
      AUDIO: "audio",
      ANIMATION: "animation"
    };
  return g.prototype.computeButtonsLimit = function () {
    if (this.type === p.thumb)
      return 3;
    var t = 3;
    return this.mainSection.images.length === 0 && (t += 2), this.mainSection.text || (t++, this.mainSection.title || t++, this.mainSection.subtitle || t++), Math.min(t, 6);
  }, g.prototype.isValid = function () {
    return this.buttons.length !== 0 ? t.every(this.buttons, function (e) {
      return e.isValid();
    }) : this.mainSection.isValid();
  }, g.prototype.isSupported = function () {
    return (this.tap && this.tap.isSupported() || !this.tap) && t.every(this.buttons, function (e) {
      return e.isSupported();
    });
  }, y.prototype.isValid = function () {
    return !!this.title || !!this.subtitle || !!this.text || this.images.length !== 0 && t.every(this.images, function (e) {
      return e.isValid();
    });
  }, y.prototype.isSupported = function () {
    return this.isValid();
  }, y.prototype.computeButtonsLimit = function () {
    if (this.type === p.thumb)
      return 3;
    var t = 3;
    return this.images.length === 0 && (t += 2), this.text || (t++, this.title || t++, this.subtitle || t++), Math.min(t, 6);
  }, E.prototype.isValid = function () {
    return !!this.media && (!!this.media.video || !!this.media.audio || !!this.media.animation && !!this.media.animation.url);
  }, E.prototype.isSupported = function () {
    return this.isValid();
  }, S.prototype.isValid = function () {
    return this.buttons.length !== 0 && !!this.text;
  }, S.prototype.isSupported = function () {
    return this.isValid();
  }, x.prototype.isValid = function () {
    return !!this.total && t.every(this.buttons, function (e) {
      return e.isValid();
    });
  }, x.prototype.isSupported = function () {
    return (this.tap && this.tap.isSupported() || !this.tap) && t.every(this.buttons, function (e) {
      return e.isSupported();
    });
  }, {
    main: {
      build: function (e, t, n, r) {
        return new g(e, t, n, r);
      }
    },
    receipt: {
      build: function (e, t, n) {
        return new x(e, t, n);
      }
    },
    signIn: {
      build: function (e, t, n) {
        return new S(e, t, n);
      }
    },
    media: {
      build: function (e, t, n, r) {
        return new E(e, t, n, r);
      }
    },
    flex: {
      build: function (e, t, n, r) {
        return new y(e, t, n, r);
      }
    }
  };
});
