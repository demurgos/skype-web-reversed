define("ui/components/chat/suggestions/simpleWordSuggestion", [
  "require",
  "swx-utils-common"
], function (e) {
  function n() {
  }
  var t = e("swx-utils-common").stringUtils;
  return n.prototype.applySuggestion = function (n) {
    var r = this.textarea.viewModel.messageBody(), i = t.wordBoundariesAt(r, this.searchPosition), s = this.getReplacer(n), o = r.slice(i.end);
    o === "" && (s += "\xA0");
    r = r.slice(0, i.start) + s + o;
    this.textarea.viewModel.messageBody(r);
    this.textarea.view.setCursorAt(i.start + s.length);
    n.data.criteriaLength = i.end - i.start;
    n.data.suggestionType = this.suggestionType;
  }, n;
});
