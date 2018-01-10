define("ui/controls/calling/micControl", [
  "require",
  "text!views/calling/muteButton.html",
  "vendor/knockout",
  "swx-constants",
  "ui/viewModels/calling/micControlViewModel"
], function (e) {
  var t = e("text!views/calling/muteButton.html"), n = e("vendor/knockout"), r = e("swx-constants").CALLING, i = e("ui/viewModels/calling/micControlViewModel");
  return {
    name: r.CONTROLS.MUTE_CONTROL,
    render: function (e, r) {
      var s, o = document.createElement("div"), u = e.conversation;
      s = i.build(u);
      o.innerHTML = t;
      n.applyBindings(s, o);
      r(o.firstElementChild);
    }
  };
});
