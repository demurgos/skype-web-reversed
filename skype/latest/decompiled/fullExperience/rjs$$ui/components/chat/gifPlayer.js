define("ui/components/chat/gifPlayer", [
  "require",
  "exports",
  "module",
  "ui/viewModels/chat/gifPlayer",
  "constants/components",
  "text!views/chat/gifPlayer.html"
], function (e, t) {
  function r(e) {
    var t = n.build(e);
    return t;
  }
  var n = e("ui/viewModels/chat/gifPlayer");
  t.name = e("constants/components").chat.GIFPLAYER;
  t.template = e("text!views/chat/gifPlayer.html");
  t.viewModel = { createViewModel: r };
});
