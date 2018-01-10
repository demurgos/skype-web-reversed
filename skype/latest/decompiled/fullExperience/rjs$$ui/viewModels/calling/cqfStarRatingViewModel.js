define("ui/viewModels/calling/cqfStarRatingViewModel", [
  "require",
  "browser/document"
], function (e) {
  function n(e) {
    function a() {
      var e = t.querySelector(".CallQualityFeedbackStarRating .selected");
      if (e)
        return e;
    }
    function f(e) {
      e.firstElementChild.classList.remove(u);
      e.firstElementChild.classList.add(o);
    }
    function l(e) {
      e.firstElementChild.classList.remove(o);
      e.firstElementChild.classList.add(u);
    }
    function c(e) {
      var t = e.previousElementSibling;
      while (t && t.classList.contains(i))
        f(t), t = t.previousElementSibling;
    }
    function h() {
      var e = a();
      p();
      e && (f(e), c(e));
    }
    function p() {
      var e;
      for (e = 0; e < r.length; ++e)
        l(r[e]);
    }
    var n = this, r = t.querySelectorAll(".CallQualityFeedbackStarRating .btn"), i = "btn", s = "selected", o = "favouriteOn", u = "favouriteOff";
    n.selectedStar = e.selectedStar;
    n.mouseoverHandler = function (e, t) {
      var n = t.currentTarget;
      f(n);
      c(n);
    };
    n.mouseoutHandler = function () {
      h();
    };
    n.clickHandler = function (e, t) {
      var r = t.currentTarget, i = a();
      i && i.classList.remove(s);
      n.selectedStar(parseInt(r.getAttribute("data-value")));
      r.classList.add(s);
      h();
    };
  }
  var t = e("browser/document");
  return {
    build: function (e) {
      return new n(e);
    }
  };
});
