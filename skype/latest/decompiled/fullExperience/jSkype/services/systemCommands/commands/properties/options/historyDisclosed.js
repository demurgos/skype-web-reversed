define("jSkype/services/systemCommands/commands/properties/options/historyDisclosed", [
  "require",
  "exports",
  "module"
], function (e, t) {
  function n() {
    this.isEnabled = function (t) {
      return t.historyService.isHistoryDisclosed();
    }, this.enable = function (t) {
      t.historyService.isHistoryDisclosed.set(!0).catch(function () {
      });
    }, this.disable = function (t) {
      t.historyService.isHistoryDisclosed.set(!1).catch(function () {
      });
    };
  }
  t.build = function () {
    return new n();
  };
})
