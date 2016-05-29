define("ui/components/chat/header", [
  "require",
  "exports",
  "module",
  "vendor/knockout",
  "constants/common",
  "ui/viewModels/chat/header",
  "jsviews/chat/header",
  "utils/common/focusRestrictor",
  "constants/components",
  "text!views/chat/header.html"
], function (e, t) {
  function u(e, u) {
    var a = u.element, f = new s(a), l = [
        ".Me",
        ".toasts",
        ".footer",
        ".notifications",
        "swx-sidebar"
      ], c = o.build(a, l), h = i.build(e, c);
    return h.setContext(n.dataFor(a)), h.init(f), h.dispatchEvent(r.navigation.COMPONENT_RENDERED, t.name, h.DIRECTION.PARENT), h;
  }
  var n = e("vendor/knockout"), r = e("constants/common").events, i = e("ui/viewModels/chat/header"), s = e("jsviews/chat/header"), o = e("utils/common/focusRestrictor");
  t.name = e("constants/components").chat.HEADER;
  t.template = e("text!views/chat/header.html");
  t.viewModel = { createViewModel: u };
});
