define("ui/controls/calling/endCallControl", [
  "require",
  "text!views/calling/endCallButton.html",
  "vendor/knockout",
  "constants/calling",
  "ui/viewModels/calling/endCallControlViewModel"
], function (e) {
  var t = e("text!views/calling/endCallButton.html"), n = e("vendor/knockout"), r = e("constants/calling"), i = e("ui/viewModels/calling/endCallControlViewModel");
  return {
    name: r.CONTROLS.END_CALL_CONTROL,
    render: function (e, r) {
      var s, o = document.createElement("div"), u = e.conversation;
      s = i.build(u);
      o.innerHTML = t;
      n.applyBindings(s, o);
      r(o.firstElementChild);
    }
  };
});
