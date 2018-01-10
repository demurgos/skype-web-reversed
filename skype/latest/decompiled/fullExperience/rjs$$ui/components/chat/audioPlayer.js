define("ui/components/chat/audioPlayer", [
  "require",
  "exports",
  "module",
  "vendor/knockout",
  "ui/viewModels/chat/audioPlayer",
  "constants/components",
  "text!views/chat/audioPlayer.html"
], function (e, t) {
  function i(e, t) {
    var i = t.element, s = r.build(i, e), o = n.dataFor(i);
    return s.init(), s.setContext(o), s;
  }
  var n = e("vendor/knockout"), r = e("ui/viewModels/chat/audioPlayer");
  t.name = e("constants/components").chat.AUDIO_PLAYER;
  t.template = e("text!views/chat/audioPlayer.html");
  t.viewModel = { createViewModel: i };
});
