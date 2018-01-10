define("ui/components/calling/screenSharingPreview", [
  "require",
  "exports",
  "module",
  "ui/viewModels/calling/screenSharingPreviewViewModel",
  "vendor/knockout",
  "constants/components",
  "text!views/calling/screenSharingPreview.html"
], function (e, t) {
  function i(e, t) {
    var i = n.build(e.conversation, t.element);
    return i.setContext(r.dataFor(t.element)), i.init(), i;
  }
  var n = e("ui/viewModels/calling/screenSharingPreviewViewModel"), r = e("vendor/knockout");
  t.name = e("constants/components").calling.SCREEN_SHARING_PREVIEW;
  t.template = e("text!views/calling/screenSharingPreview.html");
  t.viewModel = { createViewModel: i };
});
