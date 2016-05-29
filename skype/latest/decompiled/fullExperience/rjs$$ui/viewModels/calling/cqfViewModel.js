define("ui/viewModels/calling/cqfViewModel", [
  "require",
  "lodash-compat",
  "constants/calling",
  "ui/calling/telemetry/cqfActions",
  "browser/document",
  "utils/common/eventMixin",
  "swx-i18n",
  "vendor/knockout",
  "services/cqf/questionnaire",
  "utils/common/scroll",
  "experience/settings",
  "browser/window"
], function (e) {
  function h() {
    function y() {
      function t(e) {
        return e.category === "q" || e.category === "qe";
      }
      function n(e) {
        return e.category === "pq";
      }
      function r(e) {
        return e.category === "vq" || e.category === "vqe";
      }
      a.forEach(function (i) {
        i.checked = u.observable(!1);
        i.comment = u.observable();
        i.qid && (e.callData.questionaryId = i.qid);
        t(i) && e.audioQuestions.push(i);
        n(i) && e.isPSTN && e.audioQuestions.push(i);
        r(i) && e.isVideoCall && e.videoQuestions.push(i);
      });
    }
    function b() {
      s = c.setTimeout(e.close, l.cqf.inactivityTimeout);
    }
    function w() {
      s && (c.clearTimeout(s), s = null);
    }
    function E() {
      var e = i.querySelector(".CallQualityFeedback-starRating .selected");
      if (e)
        return e;
    }
    function S(e) {
      e.firstElementChild.classList.remove(m);
      e.firstElementChild.classList.add(v);
    }
    function x(e) {
      e.firstElementChild.classList.remove(v);
      e.firstElementChild.classList.add(m);
    }
    function T(e) {
      var t = e.previousElementSibling;
      while (t && t.classList.contains(p))
        S(t), t = t.previousElementSibling;
    }
    function N() {
      var e = E();
      C();
      e && (S(e), T(e));
    }
    function C() {
      var e;
      for (e = 0; e < h.length; ++e)
        x(h[e]);
    }
    function k() {
      w();
      r.get().cancel(e.callData);
      e.selectedStar(0);
    }
    var e = this, t, s, h = i.querySelectorAll(".CallQualityFeedback-starRating .btn"), p = "btn", d = "selected", v = "favouriteOn", m = "favouriteOff";
    e.currentStep = u.observable(1);
    e.selectedStar = u.observable(-1);
    e.canBeSubmitted = u.observable(!1);
    e.audioQuestions = [];
    e.videoQuestions = [];
    e.activitySubscriptions = [];
    var g = e.selectedStar.subscribe(function () {
      e.canBeSubmitted(!0);
      w();
    });
    e.init = function (r, i) {
      e.isVideoCall = r.callData.isVideo;
      e.isPSTN = r.callData.isPSTN;
      e.callData = r.callData;
      e.questionsTitle = u.computed(function () {
        return e.isVideoCall ? o.fetch({ key: "cqf_video_title" }) : o.fetch({ key: "cqf_audio_title" });
      });
      t = f.build(i);
      t.init();
      y();
      b();
      e.registerEvent(n.EVENTS.CQF_CANCEL, k);
    };
    e.starMouseoverHandler = function (e, t) {
      var n = t.currentTarget;
      S(n);
      T(n);
    };
    e.starMouseoutHandler = function () {
      N();
    };
    e.starClickHandler = function (t, n) {
      var r = n.currentTarget, i = E();
      i && i.classList.remove(d);
      e.selectedStar(parseInt(r.getAttribute("data-value")));
      r.classList.add(d);
      N();
    };
    e.close = function () {
      k();
      e.dispatchEvent(n.EVENTS.CQF_SCREEN_CLOSE, e.DIRECTION.PARENT);
    };
    e.submit = function () {
      e.selectedStar() === 4 || e.currentStep() === 2 ? (e.callData.score = e.selectedStar(), e.callData.tokensSelected = [], e.callData.othersSelected = [], e.audioQuestions.concat(e.videoQuestions).forEach(function (t) {
        t.checked() && e.callData.tokensSelected.push({ token: t.token });
        t.comment() && t.comment().trim().length > 1 && e.callData.othersSelected.push({
          token: t.token,
          value: t.comment()
        });
      }), r.get().submit(e.callData), e.dispatchEvent(n.EVENTS.CQF_SCREEN_CLOSE, e.DIRECTION.PARENT)) : e.currentStep(2);
    };
    e.dispose = function () {
      t.dispose();
      g.dispose();
    };
  }
  var t = e("lodash-compat"), n = e("constants/calling"), r = e("ui/calling/telemetry/cqfActions"), i = e("browser/document"), s = e("utils/common/eventMixin"), o = e("swx-i18n").localization, u = e("vendor/knockout"), a = e("services/cqf/questionnaire"), f = e("utils/common/scroll"), l = e("experience/settings"), c = e("browser/window");
  return t.assign(h.prototype, s), {
    build: function () {
      return new h();
    }
  };
});
