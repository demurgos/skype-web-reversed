define("ui/viewModels/chat/pollDesigner", [
  "require",
  "lodash-compat",
  "vendor/knockout",
  "utils/common/async",
  "utils/common/eventMixin",
  "utils/common/eventHelper",
  "swx-utils-common",
  "telemetry/chat/poll",
  "constants/keys",
  "constants/common",
  "browser/document",
  "utils/common/outsideClickHandler"
], function (e) {
  function v(e, i, v) {
    function w() {
      c.remove("chatInputPollButton");
    }
    function E() {
      c.add("chatInputPollButton", S);
    }
    function S() {
      r.execute(function () {
        m.isOpened(!1);
      }), w();
    }
    function x(e) {
      return !o.isCarriageReturn(e) && !o.isNewLine(e) && !o.isWhiteSpace(e);
    }
    function T() {
      b && b.focus();
    }
    function N() {
      m.isOpened() ? (m.isOpened(!1), w()) : (u.pollDesignerOpened(i.conversationId), E(), m.isOpened(!0), v.focusPollQuestion());
    }
    var m = this, g, y, b = l.querySelector(".swx .chat .inputField");
    m.isDisabled = e, m.isOpened = n.observable(!1), m.questionText = n.observable(""), m.answers = n.observableArray(), m.isMultipleChoice = n.observable(!1), m.isSendButtonEnabled = n.computed(function () {
      var e = !0, n = m.answers();
      return g = t.filter(n, function (e) {
        return t.trim(e.value()).length > 0;
      }), y = t.trim(m.questionText()), y.length === 0 && (e = !1), g.length < 2 && (e = !1), e;
    }), m.init = function () {
      m.initPollBubble(), m.registerEvent(f.events.mediaPicker.POLL_BUTTON_SELECTED, N);
    }, m.initPollBubble = function () {
      m.questionText(""), v.initPollQuestion(), m.isMultipleChoice(!1), m.answers.removeAll(), m.addNewAnswer("", !0, !1), m.addNewAnswer("", !1, !1);
    }, m.removeCurrentAnswer = function (e) {
      var t = m.answers(), n = t.indexOf(e);
      m.answers.remove(e), t.length === 2 && (t[0].allowRemove(!1), t[1].allowRemove(!1));
      var r = n >= 1 ? n - 1 : 0;
      t[r].focused(!0);
    }, m.addNewAnswer = function (e, t, r) {
      var i = {
        value: n.observable(""),
        focused: n.observable(t),
        allowRemove: n.observable(r)
      };
      m.answers.push(i);
    }, m.onPaste = function (e, t, n) {
      function c(e) {
        s ? x(e) && (u += e, s = !1) : (u += e, o.isNewLine(e) && (s = !0));
      }
      var r = t.clipboardData || window.clipboardData;
      t.originalEvent && (r = r || t.originalEvent.clipboardData);
      var i = r.getData("Text"), s = !0, u = "", a = d(t.target), f = h(t.target), l = p(t.target);
      for (var v = 0; v < i.length; v++)
        c(i[v]);
      n(o.inject(a, u, f, l));
    }, m.onPasteQuestion = function (e, t) {
      m.onPaste(e, t, function (e) {
        m.questionText(e);
      }), m.questionChanged(e, t);
    }, m.onPasteAnswer = function (e, t) {
      m.onPaste(e, t, function (t) {
        var n = m.answers().indexOf(e);
        m.answers()[n].value(t);
      }), m.onAnswerKeypress(e, t);
    }, m.submitPoll = function () {
      if (!m.isSendButtonEnabled())
        return;
      var e = {};
      e.question = y, e.answers = t.map(g, function (e) {
        return e.value();
      }), e.multipleChoice = m.isMultipleChoice(), i.sendPollMessage(JSON.stringify(e)), m.initPollBubble(), S();
    }, m.removeAnswer = function (e) {
      m.removeCurrentAnswer(e);
    }, m.onAnswerKeydown = function (e, n) {
      var r = m.answers(), i = s.getKeyCode(n);
      return i !== a.BACKSPACE ? !0 : e.value().length > 0 ? !0 : e === t.last(r) ? (e.focused(!1), r[r.length - 2].focused(!0), !1) : e.allowRemove() ? (m.removeCurrentAnswer(e), !1) : !0;
    }, m.onAnswerKeypress = function (e, n) {
      var r = m.answers(), i = r.indexOf(e), o = s.getKeyCode(n);
      return o !== a.TAB && e === t.last(r) && (m.addNewAnswer("", !1, !1), e.allowRemove(!0)), i >= 1 && r[0].allowRemove(!0), o === a.ENTER && r[i + 1].focused(!0), v.scrollToBottom(), !0;
    }, m.questionChanged = function () {
      return v.updatePollQuestion(), !0;
    }, m.handleKeyDown = function (e, t) {
      var n = s.getKeyCode(t);
      if (n === a.ESCAPE && m.isOpened()) {
        t.stopPropagation(), S(), T();
        return;
      }
      return !0;
    }, m.dispose = function () {
      m.isSendButtonEnabled.dispose(), w();
    };
  }
  var t = e("lodash-compat"), n = e("vendor/knockout"), r = e("utils/common/async"), i = e("utils/common/eventMixin"), s = e("utils/common/eventHelper"), o = e("swx-utils-common").stringUtils, u = e("telemetry/chat/poll"), a = e("constants/keys"), f = e("constants/common"), l = e("browser/document"), c = e("utils/common/outsideClickHandler"), h = function (e) {
      return e.selectionStart;
    }, p = function (e) {
      return e.selectionEnd;
    }, d = function (e) {
      return e.value;
    };
  return t.assign(v.prototype, i), v;
})
