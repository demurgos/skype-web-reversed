define("ui/components/people/avatar", [
  "require",
  "exports",
  "module",
  "constants/components",
  "text!views/people/avatar.html",
  "ui/viewModels/people/avatar"
], function (e, t) {
  t.name = e("constants/components").people.AVATAR;
  t.template = e("text!views/people/avatar.html");
  t.viewModel = e("ui/viewModels/people/avatar");
});
