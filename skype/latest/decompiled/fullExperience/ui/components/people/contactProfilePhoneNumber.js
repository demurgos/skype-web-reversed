define("ui/components/people/contactProfilePhoneNumber", [
  "require",
  "exports",
  "module",
  "ui/viewModels/people/phoneNumber",
  "constants/components",
  "text!views/people/contactProfilePhoneNumber.html"
], function (e, t) {
  function r(e) {
    var t = n.build(e.phoneNumber);
    return t;
  }
  var n = e("ui/viewModels/people/phoneNumber");
  t.name = e("constants/components").people.CONTACT_PROFILE_PHONE_NUMBER, t.template = e("text!views/people/contactProfilePhoneNumber.html"), t.viewModel = { createViewModel: r };
})
