define("jSkype/services/systemCommands/commands/properties/options/joiningEnabled", [
  "require",
  "exports",
  "module"
], function (e, t) {
  function n() {
    this.isEnabled = function (t) {
      return t.isJoiningEnabled();
    }, this.enable = function (t) {
      t.isJoiningEnabled.set(!0).catch(function () {
      });
    }, this.disable = function (t) {
      t.isJoiningEnabled.set(!1).catch(function () {
      });
    };
  }
  t.build = function () {
    return new n();
  };
})
