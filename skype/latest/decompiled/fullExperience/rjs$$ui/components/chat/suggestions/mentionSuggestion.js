define("ui/components/chat/suggestions/mentionSuggestion", [
  "require",
  "lodash-compat",
  "ui/components/chat/suggestions/simpleWordSuggestion"
], function (e) {
  function s(e, t, n, r) {
    this.participant = r;
    this.textarea = {
      view: t,
      viewModel: e
    };
    this.searchPosition = n;
  }
  var t = e("lodash-compat"), n = e("ui/components/chat/suggestions/simpleWordSuggestion"), r = "MENTIONS", i = "swx-suggestion-mention";
  return s.prototype.templateId = i, s.prototype.suggestionType = r, s.prototype.getReplacer = function (t) {
    return t.data.participantsCount = this.textarea.viewModel.conversationModel.participants().length, "@" + this.participant.person.id();
  }, s.build = function (t, n, r, i) {
    return new s(t, n, r, i);
  }, t.assign(s.prototype, n.prototype), s;
});
