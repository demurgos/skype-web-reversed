define("ui/components/chat/videoPlayer", [
  "require",
  "exports",
  "module",
  "vendor/knockout",
  "ui/viewModels/chat/videoPlayer",
  "constants/components",
  "text!views/chat/videoPlayer.html"
], function (e, t) {
  function i(e, t) {
    var i = t.element, s = r.build(i, e), o = n.dataFor(i);
    return s.init(), s.setContext(o), s;
  }
  var n = e("vendor/knockout"), r = e("ui/viewModels/chat/videoPlayer");
  t.name = e("constants/components").chat.VIDEO_PLAYER, t.template = e("text!views/chat/videoPlayer.html"), t.viewModel = { createViewModel: i };
})
