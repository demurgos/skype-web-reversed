define("ui/components/calling/skypeOut/countryPicker", [
  "require",
  "exports",
  "module",
  "ui/viewModels/calling/skypeOut/countryPickerViewModel",
  "vendor/knockout",
  "constants/components",
  "text!views/calling/skypeOut/countryPicker.html"
], function (e, t) {
  function i(e, t) {
    var i = n.build(e), s = t.element, o = r.dataFor(s);
    return i.setContext(o), i.init(), i;
  }
  var n = e("ui/viewModels/calling/skypeOut/countryPickerViewModel"), r = e("vendor/knockout");
  t.name = e("constants/components").calling.SKYPEOUT_COUNTRY_PICKER, t.template = e("text!views/calling/skypeOut/countryPicker.html"), t.viewModel = { createViewModel: i };
})
