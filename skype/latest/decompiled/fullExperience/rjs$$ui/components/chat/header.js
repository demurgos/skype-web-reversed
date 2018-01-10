define("ui/components/chat/header", [
  "require",
  "exports",
  "module",
  "vendor/knockout",
  "swx-constants",
  "ui/viewModels/chat/header",
  "jsviews/chat/header",
  "utils/common/focusRestrictor",
  "browser/dom",
  "constants/components",
  "text!views/chat/header.html"
], function (e, t) {
  function a(e, u) {
    var a = u.element, l = f(u.element), c = new s(a), h = [
        ".Me",
        ".toasts",
        ".footer",
        ".notifications",
        "swx-sidebar"
      ], p = o.build(a, h), d = i.build(e, p, l);
    return d.setContext(n.dataFor(a)), d.init(c), d.dispatchEvent(r.navigation.COMPONENT_RENDERED, t.name, d.DIRECTION.PARENT), d;
  }
  function f(e) {
    var t = u.getParentWithClass(e, "swxContent");
    return t ? t.getAttribute("id") : null;
  }
  var n = e("vendor/knockout"), r = e("swx-constants").COMMON.events, i = e("ui/viewModels/chat/header"), s = e("jsviews/chat/header"), o = e("utils/common/focusRestrictor"), u = e("browser/dom");
  t.name = e("constants/components").chat.HEADER;
  t.template = e("text!views/chat/header.html");
  t.viewModel = { createViewModel: a };
});
