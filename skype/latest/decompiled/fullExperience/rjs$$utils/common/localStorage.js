define("utils/common/localStorage", [], function () {
  function e() {
    try {
      return window && window.localStorage;
    } catch (e) {
    }
  }
  return {
    set: function (t, n) {
      if (e())
        try {
          window.localStorage.setItem(t, n);
        } catch (r) {
        }
    },
    get: function (t) {
      if (e())
        try {
          return window.localStorage.getItem(t);
        } catch (n) {
        }
    },
    remove: function (t) {
      if (e())
        try {
          window.localStorage.removeItem(t);
        } catch (n) {
        }
    }
  };
})
