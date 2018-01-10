define("ui/viewModels/calling/cqfViewModel", [
  "require",
  "lodash-compat",
  "swx-constants",
  "ui/calling/telemetry/cqfActions",
  "utils/common/eventMixin",
  "swx-i18n",
  "vendor/knockout",
  "services/cqf/questionnaire",
  "utils/common/scroll",
  "experience/settings",
  "browser/window",
  "utils/common/accessibility"
], function (e) {
  function h() {
    function p() {
      function t(e) {
        return e.category === "q" || e.category === "qe";
      }
      function n(e) {
        return e.category === "pq";
      }
      function r(e) {
        return e.category === "vq" || e.category === "vqe";
      }
      u.forEach(function (i) {
        i.checked = o.observable(!1);
        i.comment = o.observable();
        i.qid && (e.callData.questionaryId = i.qid);
        t(i) && e.audioQuestions.push(i);
        n(i) && e.isPSTN && e.audioQuestions.push(i);
        r(i) && e.isVideoCall && e.videoQuestions.push(i);
      });
    }
    function d() {
      i = l.setTimeout(e.close, f.cqf.inactivityTimeout);
    }
    function v() {
      i && (l.clearTimeout(i), i = null);
    }
    function m() {
      e.selectedStar() === -1 ? e.close() : e.submitWithoutTokens();
    }
    function g() {
      e.callData.score = e.selectedStar();
    }
    function y() {
      e.callData.tokensSelected = [];
      e.callData.othersSelected = [];
      e.audioQuestions.concat(e.videoQuestions).forEach(function (t) {
        t.checked() && e.callData.tokensSelected.push({ token: t.token });
        t.comment() && t.comment().trim().length > 0 && e.callData.othersSelected.push({
          token: t.token,
          value: t.comment()
        });
      });
    }
    function b() {
      c.announce(s.fetch({ key: "cqf_thanks_title" }));
      e.currentStep(n.CQF.STEPS.THANKS);
      l.setTimeout(function () {
        e.dispatchEvent(n.EVENTS.CQF_SCREEN_CLOSE, e.DIRECTION.PARENT);
      }, n.CQF.THANKS_TIMEOUT);
    }
    var e = this, t, i;
    e.currentStep = o.observable(n.CQF.STEPS.INTRO);
    e.selectedStar = o.observable(-1);
    e.canBeSubmitted = o.observable(!1);
    e.audioQuestions = [];
    e.videoQuestions = [];
    var h = e.selectedStar.subscribe(function () {
      e.canBeSubmitted(!0);
      v();
    });
    e.init = function (r, i) {
      e.isVideoCall = r.callData.isVideo;
      e.isPSTN = r.callData.isPSTN;
      e.callData = r.callData;
      e.questionsTitle = o.computed(function () {
        return e.isVideoCall ? s.fetch({ key: "cqf_video_title" }) : s.fetch({ key: "cqf_audio_title" });
      });
      t = a.build(i);
      t.init();
      p();
      d();
      e.registerEvent(n.EVENTS.CQF_CANCEL, m);
    };
    e.close = function () {
      v();
      r.get().cancel(e.callData);
      e.selectedStar(0);
      e.dispatchEvent(n.EVENTS.CQF_SCREEN_CLOSE, e.DIRECTION.PARENT);
    };
    e.handleStarRating = function () {
      e.selectedStar() === 4 ? e.submitWithoutTokens() : e.currentStep(n.CQF.STEPS.QUESTIONNAIRE);
    };
    e.submitWithoutTokens = function () {
      g();
      r.get().submit(e.callData);
      b();
    };
    e.submit = function () {
      g();
      y();
      r.get().submit(e.callData);
      b();
    };
    e.dispose = function () {
      t.dispose();
      h.dispose();
    };
  }
  var t = e("lodash-compat"), n = e("swx-constants").CALLING, r = e("ui/calling/telemetry/cqfActions"), i = e("utils/common/eventMixin"), s = e("swx-i18n").localization, o = e("vendor/knockout"), u = e("services/cqf/questionnaire"), a = e("utils/common/scroll"), f = e("experience/settings"), l = e("browser/window"), c = e("utils/common/accessibility").narrator;
  return t.assign(h.prototype, i), {
    build: function () {
      return new h();
    }
  };
});
