define("constants/calling.resources", [], function () {
  return {
    notifications: { incomingCall: { linkTemplate: "<a href=\"http://skype.com/go/help.faq.skype.for.web\" target=\"_blank\">{notification_text_learnMore}</a>" } },
    fallbackMessages: {
      windowsUpdateLink: "<a href=\"http://windows.microsoft.com/en-us/windows-10/windows-update-faq\" target=\"_blank\">http://windows.microsoft.com/en-us/windows-10/windows-update-faq</a>",
      skypeUpgradeLink: "<a href=\"http://www.skype.com/en/download-skype\" target=\"_blank\">http://www.skype.com/en/download-skype</a>",
      ngcUpgradeLink: "<a href=\"https://go.skype.com/groupupgrade/\" target=\"_blank\">https://go.skype.com/groupupgrade/</a>"
    },
    pluginInstall: {
      terms: "<a href=\"https://www.skype.com/en/legal/tou/\" target=\"_blank\">{pluginInstall_steps_text_termsLink}</a>",
      privacy: "<a href=\"https://www.skype.com/en/legal/privacy/\" target=\"_blank\">{pluginInstall_steps_text_privacyLink}</a>"
    }
  };
})
