define("jSkype/services/mediaAgent/common/utils", [], function () {
  function e(e, t) {
    for (var n in e)
      e.hasOwnProperty(n) && t(e[n], n);
  }
  return { forOwn: e };
})
