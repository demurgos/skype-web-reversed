define("text", {
  load: function (e) {
    throw new Error("Dynamic load not allowed: " + e);
  }
})
