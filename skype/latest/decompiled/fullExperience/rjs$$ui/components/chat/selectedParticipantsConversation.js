define("ui/components/chat/selectedParticipantsConversation", [
  "require",
  "exports",
  "module",
  "ui/viewModels/chat/selectedParticipantsConversation",
  "constants/components",
  "text!views/chat/selectedParticipantsConversation.html"
], function (e, t) {
  function r(e) {
    var t = new n();
    return t.init(e), t;
  }
  var n = e("ui/viewModels/chat/selectedParticipantsConversation");
  t.name = e("constants/components").chat.SELECTED_PARTICIPANTS_CONVERSATION;
  t.template = e("text!views/chat/selectedParticipantsConversation.html");
  t.viewModel = { createViewModel: r };
});
