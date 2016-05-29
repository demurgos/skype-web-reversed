define("ui/components/people/index", [
  "require",
  "ui/components/people/avatar",
  "ui/components/people/avatarDeprecated",
  "ui/components/people/contactListMenuItem",
  "ui/components/people/contactPicker",
  "ui/components/people/contactProfile",
  "ui/components/people/contactProfilePhoneNumber",
  "ui/components/people/contactsPage",
  "ui/components/people/directorySearch",
  "ui/components/people/discoverAgentsPage",
  "ui/components/people/name",
  "ui/components/people/peopleSearch"
], function (e) {
  return [
    e("ui/components/people/avatar"),
    e("ui/components/people/avatarDeprecated"),
    e("ui/components/people/contactListMenuItem"),
    e("ui/components/people/contactPicker"),
    e("ui/components/people/contactProfile"),
    e("ui/components/people/contactProfilePhoneNumber"),
    e("ui/components/people/contactsPage"),
    e("ui/components/people/directorySearch"),
    e("ui/components/people/discoverAgentsPage"),
    e("ui/components/people/name"),
    e("ui/components/people/peopleSearch")
  ];
});
