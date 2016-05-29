define("ui/components/chat/recents", [
  "require",
  "exports",
  "module",
  "ui/viewModels/chat/recentList",
  "ui/viewModels/chat/recent",
  "ui/viewModels/chat/message",
  "telemetry/chat/timelineLoad",
  "constants/components",
  "text!views/chat/recents.html"
], function (e, t) {
  function o(e) {
    var t = new n(e, r, i, s);
    return t.init(), t;
  }
  var n = e("ui/viewModels/chat/recentList"), r = e("ui/viewModels/chat/recent"), i = e("ui/viewModels/chat/message"), s = e("telemetry/chat/timelineLoad");
  t.name = e("constants/components").chat.RECENTS;
  t.template = e("text!views/chat/recents.html");
  t.viewModel = { createViewModel: o };
});
