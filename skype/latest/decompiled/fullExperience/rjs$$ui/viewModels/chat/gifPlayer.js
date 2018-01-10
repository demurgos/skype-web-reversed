define("ui/viewModels/chat/gifPlayer", [
  "require",
  "exports",
  "module",
  "lodash-compat",
  "utils/common/eventMixin",
  "vendor/knockout"
], function (e, t) {
  function s(e) {
    var t = this;
    t.media = e.media && e.media.url ? e.media : null;
    t.canPlay = i.observable(!1);
    t.isLoading = i.observable(!0);
    t.failed = i.observable(!1);
    if (t.media) {
      var n = new Image();
      n.onload = function () {
        t.canPlay(!0);
        t.isLoading(!1);
      };
      n.onerror = function () {
        t.canPlay(!1);
        t.isLoading(!1);
        t.failed(!0);
      };
      n.src = t.media.url;
    }
  }
  var n = e("lodash-compat"), r = e("utils/common/eventMixin"), i = e("vendor/knockout");
  t.build = function (e, t) {
    return new s(e, t);
  };
  n.assign(s.prototype, r);
});
