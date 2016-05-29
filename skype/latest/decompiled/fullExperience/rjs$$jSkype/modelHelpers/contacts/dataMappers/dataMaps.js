define("jSkype/modelHelpers/contacts/dataMappers/dataMaps", [
  "require",
  "exports",
  "module",
  "lodash-compat",
  "swx-enums"
], function (e, t) {
  var n = e("lodash-compat"), r = e("swx-enums");
  t.contactTypeNames = {
    agent: "agent",
    lync: "lync",
    msn: "msn",
    skype: "skype",
    pstn: "pstn"
  };
  t.phoneTypeKeys = {
    Home: "0",
    Work: "1",
    Cell: "2",
    Other: "3"
  };
  t.contactTypes = {};
  t.contactTypes[t.contactTypeNames.agent] = "28";
  t.contactTypes[t.contactTypeNames.lync] = "2";
  t.contactTypes[t.contactTypeNames.msn] = "1";
  t.contactTypes[t.contactTypeNames.skype] = "8";
  t.contactTypes[t.contactTypeNames.pstn] = "4";
  t.phoneTypes = {};
  t.phoneTypes[t.phoneTypeKeys.Home] = r.phoneType.Home;
  t.phoneTypes[t.phoneTypeKeys.Work] = r.phoneType.Work;
  t.phoneTypes[t.phoneTypeKeys.Cell] = r.phoneType.Cell;
  t.phoneTypes[t.phoneTypeKeys.Other] = r.phoneType.Other;
  t.contactTypesByCode = n.invert(t.contactTypes);
});
