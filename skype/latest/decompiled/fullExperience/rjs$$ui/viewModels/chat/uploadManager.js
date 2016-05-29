define("ui/viewModels/chat/uploadManager", [
  "require",
  "vendor/knockout",
  "utils/common/cafeObservable"
], function (e) {
  function r(e) {
    function i() {
      return r.files().length > 0;
    }
    function s() {
      return r.files().length > 1 ? "Sending " + r.files().length + " files" : r.files().length === 1 ? "Sending " + r.files()[0].name() : "";
    }
    var r = this;
    r.conversation = e.conversationModel;
    r.files = n.newObservableCollection(r.conversation.fileTransferService.files);
    r.isUploading = t.computed(i);
    r.statusText = t.computed(s);
    r.dispose = function () {
      r.isUploading.dispose();
      r.statusText.dispose();
    };
  }
  var t = e("vendor/knockout"), n = e("utils/common/cafeObservable");
  return r;
});
