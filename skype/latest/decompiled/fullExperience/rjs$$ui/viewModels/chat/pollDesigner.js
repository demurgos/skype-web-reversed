define("ui/viewModels/chat/pollDesigner", [
  "require",
  "lodash-compat",
  "vendor/knockout",
  "swx-utils-common",
  "utils/common/eventMixin",
  "utils/common/eventHelper",
  "swx-utils-common",
  "telemetry/chat/poll",
  "swx-constants",
  "swx-constants",
  "browser/document",
  "utils/common/outsideClickHandler",
  "swx-focus-handler"
], function (e) {
  function m(e, i, m) {
    function E() {
      c.remove("chatInputPollButton");
    }
    function S() {
      c.add("chatInputPollButton", x);
    }
    function x() {
      r.execute(function () {
        g.isOpened(!1);
      });
      E();
    }
    function T(e) {
      return !o.isCarriageReturn(e) && !o.isNewLine(e) && !o.isWhiteSpace(e);
    }
    function N() {
      w && h.get().addFocusRequestToQueue(w);
    }
    function C() {
      g.isOpened() ? (g.isOpened(!1), E()) : (u.pollDesignerOpened(i.conversationId), S(), g.isOpened(!0), m.focusPollQuestion());
    }
    var g = this, y, b, w = l.querySelector(".swx .chat .inputField");
    g.isDisabled = e;
    g.isOpened = n.observable(!1);
    g.questionText = n.observable("");
    g.answers = n.observableArray();
    g.isMultipleChoice = n.observable(!1);
    g.isSendButtonEnabled = n.computed(function () {
      var e = !0, n = g.answers();
      return y = t.filter(n, function (e) {
        return t.trim(e.value()).length > 0;
      }), b = t.trim(g.questionText()), b.length === 0 && (e = !1), y.length < 2 && (e = !1), e;
    });
    g.init = function () {
      g.initPollBubble();
      g.registerEvent(f.events.mediaPicker.POLL_BUTTON_SELECTED, C);
    };
    g.initPollBubble = function () {
      g.questionText("");
      m.initPollQuestion();
      g.isMultipleChoice(!1);
      g.answers.removeAll();
      g.addNewAnswer("", !0, !1);
      g.addNewAnswer("", !1, !1);
    };
    g.removeCurrentAnswer = function (e) {
      var t = g.answers(), n = t.indexOf(e);
      g.answers.remove(e);
      t.length === 2 && (t[0].allowRemove(!1), t[1].allowRemove(!1));
      var r = n >= 1 ? n - 1 : 0;
      t[r].focused(!0);
    };
    g.addNewAnswer = function (e, t, r) {
      var i = {
        value: n.observable(""),
        focused: n.observable(t),
        allowRemove: n.observable(r)
      };
      g.answers.push(i);
    };
    g.onPaste = function (e, t, n) {
      function c(e) {
        s ? T(e) && (u += e, s = !1) : (u += e, o.isNewLine(e) && (s = !0));
      }
      var r = t.clipboardData || window.clipboardData;
      t.originalEvent && (r = r || t.originalEvent.clipboardData);
      var i = r.getData("Text"), s = !0, u = "", a = v(t.target), f = p(t.target), l = d(t.target);
      for (var h = 0; h < i.length; h++)
        c(i[h]);
      n(o.inject(a, u, f, l));
    };
    g.onPasteQuestion = function (e, t) {
      g.onPaste(e, t, function (e) {
        g.questionText(e);
      });
      g.questionChanged(e, t);
    };
    g.onPasteAnswer = function (e, t) {
      g.onPaste(e, t, function (t) {
        var n = g.answers().indexOf(e);
        g.answers()[n].value(t);
      });
      g.onAnswerKeypress(e, t);
    };
    g.submitPoll = function () {
      if (!g.isSendButtonEnabled())
        return;
      var e = {};
      e.question = b;
      e.answers = t.map(y, function (e) {
        return e.value();
      });
      e.multipleChoice = g.isMultipleChoice();
      i.sendPollMessage(JSON.stringify(e));
      g.initPollBubble();
      x();
    };
    g.removeAnswer = function (e) {
      g.removeCurrentAnswer(e);
    };
    g.onAnswerKeydown = function (e, n) {
      var r = g.answers(), i = s.getKeyCode(n);
      return i !== a.BACKSPACE ? !0 : e.value().length > 0 ? !0 : e === t.last(r) ? (e.focused(!1), r[r.length - 2].focused(!0), !1) : e.allowRemove() ? (g.removeCurrentAnswer(e), !1) : !0;
    };
    g.onAnswerKeypress = function (e, n) {
      var r = g.answers(), i = r.indexOf(e), o = s.getKeyCode(n);
      return o !== a.TAB && e === t.last(r) && (g.addNewAnswer("", !1, !1), e.allowRemove(!0)), i >= 1 && r[0].allowRemove(!0), o === a.ENTER && r[i + 1].focused(!0), m.scrollToBottom(), !0;
    };
    g.questionChanged = function () {
      return m.updatePollQuestion(), !0;
    };
    g.handleKeyDown = function (e, t) {
      var n = s.getKeyCode(t);
      if (n === a.ESCAPE && g.isOpened()) {
        t.stopPropagation();
        x();
        N();
        return;
      }
      return !0;
    };
    g.dispose = function () {
      g.isSendButtonEnabled.dispose();
      E();
    };
  }
  var t = e("lodash-compat"), n = e("vendor/knockout"), r = e("swx-utils-common").async, i = e("utils/common/eventMixin"), s = e("utils/common/eventHelper"), o = e("swx-utils-common").stringUtils, u = e("telemetry/chat/poll"), a = e("swx-constants").KEYS, f = e("swx-constants").COMMON, l = e("browser/document"), c = e("utils/common/outsideClickHandler"), h = e("swx-focus-handler"), p = function (e) {
      return e.selectionStart;
    }, d = function (e) {
      return e.selectionEnd;
    }, v = function (e) {
      return e.value;
    };
  return t.assign(m.prototype, i), m;
});
