define("ui/components/chat/suggestions/emoticonSuggestion", [
  "require",
  "lodash-compat",
  "ui/components/chat/suggestions/simpleWordSuggestion"
], function (e) {
  function s(e, t, n, r, i) {
    this.emoticon = r;
    this.textarea = {
      view: t,
      viewModel: e
    };
    this.searchPosition = n;
    this.shortcut = i;
  }
  var t = e("lodash-compat"), n = e("ui/components/chat/suggestions/simpleWordSuggestion"), r = "EMOTICONS", i = "swx-suggestion-emoticon";
  return s.prototype.templateId = i, s.prototype.suggestionType = r, s.prototype.getReplacer = function () {
    return this.shortcut;
  }, s.build = function (t, n, r, i, o) {
    return new s(t, n, r, i, o);
  }, t.assign(s.prototype, n.prototype), s;
});
