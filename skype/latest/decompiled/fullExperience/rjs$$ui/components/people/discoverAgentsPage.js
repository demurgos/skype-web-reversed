define("ui/components/people/discoverAgentsPage", [
  "require",
  "exports",
  "module",
  "vendor/knockout",
  "constants/cssClasses",
  "ui/viewModels/people/discoverAgentsPage",
  "constants/components",
  "text!views/people/discoverAgentsPage.html"
], function (e, t) {
  function s(e, t) {
    var r = new i();
    return r.setContext(n.dataFor(t.element)), r.init(o(), t.element), r;
  }
  function o() {
    return {
      className: r.discoverAgents.PAGE,
      isSelectable: !1
    };
  }
  var n = e("vendor/knockout"), r = e("constants/cssClasses"), i = e("ui/viewModels/people/discoverAgentsPage");
  t.name = e("constants/components").people.DISCOVER_AGENTS_PAGE;
  t.template = e("text!views/people/discoverAgentsPage.html");
  t.viewModel = { createViewModel: s };
});
