define("ui/components/people/avatarDeprecated", [
  "require",
  "exports",
  "module",
  "constants/components",
  "text!views/people/avatarDeprecated.html",
  "ui/viewModels/people/avatarDeprecated"
], function (e, t) {
  t.name = e("constants/components").people.AVATAR_DEPRECATED, t.template = e("text!views/people/avatarDeprecated.html"), t.viewModel = e("ui/viewModels/people/avatarDeprecated");
})
