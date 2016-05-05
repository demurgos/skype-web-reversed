define("jSkype/client", [], function () {
  function t(t) {
    e = t;
  }
  function n() {
    if (!e)
      throw new Error("Instance does not exist yet!");
    return e;
  }
  var e;
  return {
    set: t,
    get: n
  };
})
