define("ui/viewModels/calling/helpers/browserInstallContent", [
  "require",
  "swx-browser-detect",
  "experience/settings",
  "swx-i18n",
  "swx-constants",
  "swx-service-locator-instance"
], function (e) {
  function f() {
    var e, n, r = {
        osName: t.getSystemInfo().osName,
        browserName: t.getBrowserInfo().browserName
      };
    return r.osName !== t.OPERATING_SYSTEMS.MACOSX ? n = {
      osName: t.OPERATING_SYSTEMS.WINDOWS,
      browserName: t.BROWSERS.MSIE
    } : n = {
      osName: t.OPERATING_SYSTEMS.MACOSX,
      browserName: t.BROWSERS.SAFARI
    }, l(t.getSystemInfo().osName) ? e = r : e = n, c(e.osName, e.browserName);
  }
  function l(e) {
    return e === t.OPERATING_SYSTEMS.WINDOWS || e === t.OPERATING_SYSTEMS.MACOSX;
  }
  function c(e, t) {
    var n, i = a[e][t];
    return i || (i = a.Windows.Unknown), n = {
      images: {
        closeScreen: d(i.closeScreen.image),
        download: d(i.download.image),
        install: d(i.install.image),
        enjoy: d(i.enjoy.image)
      },
      text: {
        closeScreen: r.fetch({ key: i.closeScreen.text }),
        download: r.fetch({ key: i.download.text }),
        install: r.fetch({ key: i.install.text }),
        enjoy: g(i.enjoy.text)
      }
    }, i.unblock && h(n, i.unblock), i.extensionStart && p(n, i), n;
  }
  function h(e, t) {
    e.images.unblock = d(t.image);
    e.text.unblock = r.fetch({ key: t.text });
  }
  function p(e, t) {
    e.images.extensionStart = d(t.extensionStart.image);
    e.text.extensionStart = r.fetch({ key: t.extensionStart.text });
    e.images.extensionInstallPlugin = d(t.extensionInstallPlugin.image);
    e.text.extensionInstallPlugin = r.fetch({ key: t.extensionInstallPlugin.text });
    e.images.extensionInstallFailed = d(t.extensionInstallFailed.image);
    e.text.extensionInstallFailed = r.fetch({ key: t.extensionInstallFailed.text });
  }
  function d(e) {
    return [
      n.assetsBaseUrl,
      o,
      e,
      u
    ].join("");
  }
  function v() {
    return s.resolve(i.serviceLocator.FEATURE_FLAGS).isFeatureOn(i.featureFlags.USE_BUSINESS_WORDING);
  }
  function m(e) {
    return e + "_4b";
  }
  function g(e) {
    return v() ? r.fetch({ key: m(e) }) : r.fetch({ key: e });
  }
  var t = e("swx-browser-detect").default, n = e("experience/settings"), r = e("swx-i18n").localization, i = e("swx-constants").COMMON, s = e("swx-service-locator-instance").default, o = "/images/components/av/installSteps/", u = ".jpg", a = {
      "Mac OS X": {
        Chrome: {
          closeScreen: {
            image: "CloseScreen",
            text: "pluginInstall_main_close_screen_subtitle"
          },
          download: {
            image: "Mac_01_Chrome",
            text: "pluginInstall_mac_chrome_text_download"
          },
          install: {
            image: "Mac_02_Install",
            text: "pluginInstall_mac_chrome_text_install"
          },
          enjoy: {
            image: "Mac_03_Skype",
            text: "pluginInstall_mac_chrome_text_enjoy"
          },
          unblock: {
            image: "Blocked_Chrome",
            text: "pluginInstall_unblock_text_chrome_subtitle"
          },
          extensionStart: {
            image: "PluginChromeIcon",
            text: "pluginInstall_extension_main_text_subtitle"
          },
          extensionInstallFailed: {
            image: "CloseScreen",
            text: "pluginInstall_extension_main_install_failed_text_subtitle"
          },
          extensionInstallPlugin: {
            image: "DownloadIcon",
            text: "pluginInstall_extension_main_installed_text_subtitle"
          }
        },
        Safari: {
          closeScreen: {
            image: "CloseScreen",
            text: "pluginInstall_main_close_screen_subtitle"
          },
          download: {
            image: "Mac_01_Safari",
            text: "pluginInstall_mac_safari_text_download"
          },
          install: {
            image: "Mac_02_Install",
            text: "pluginInstall_mac_safari_text_install"
          },
          enjoy: {
            image: "Mac_03_Skype",
            text: "pluginInstall_mac_safari_text_enjoy"
          }
        },
        Firefox: {
          closeScreen: {
            image: "CloseScreen",
            text: "pluginInstall_main_close_screen_subtitle"
          },
          download: {
            image: "Mac_01_Firefox",
            text: "pluginInstall_mac_firefox_text_download"
          },
          install: {
            image: "Mac_02_Install",
            text: "pluginInstall_mac_firefox_text_install"
          },
          enjoy: {
            image: "Mac_03_Skype",
            text: "pluginInstall_mac_firefox_text_enjoy"
          },
          unblock: {
            image: "Blocked_Firefox",
            text: "pluginInstall_unblock_text_firefox_subtitle"
          }
        },
        Unknown: {
          closeScreen: {
            image: "CloseScreen",
            text: "pluginInstall_main_close_screen_subtitle"
          },
          download: {
            image: "Mac_01_Safari",
            text: "pluginInstall_mac_unknown_text_download"
          },
          install: {
            image: "Mac_02_Install",
            text: "pluginInstall_mac_unknown_text_install"
          },
          enjoy: {
            image: "Mac_03_Skype",
            text: "pluginInstall_mac_unknown_text_enjoy"
          }
        }
      },
      Windows: {
        Chrome: {
          closeScreen: {
            image: "CloseScreen",
            text: "pluginInstall_main_close_screen_subtitle"
          },
          download: {
            image: "Windows_01_Chrome",
            text: "pluginInstall_windows_chrome_text_download"
          },
          install: {
            image: "Windows_02_Install",
            text: "pluginInstall_windows_chrome_text_install"
          },
          enjoy: {
            image: "Windows_03_Skype",
            text: "pluginInstall_windows_chrome_text_enjoy"
          },
          unblock: {
            image: "Blocked_Chrome",
            text: "pluginInstall_unblock_text_chrome_subtitle"
          },
          extensionStart: {
            image: "PluginChromeIcon",
            text: "pluginInstall_extension_main_text_subtitle"
          },
          extensionInstallFailed: {
            image: "CloseScreen",
            text: "pluginInstall_extension_main_install_failed_text_subtitle"
          },
          extensionInstallPlugin: {
            image: "DownloadIcon",
            text: "pluginInstall_extension_main_installed_text_subtitle"
          }
        },
        MSIE: {
          closeScreen: {
            image: "CloseScreen",
            text: "pluginInstall_main_close_screen_subtitle"
          },
          download: {
            image: "Windows_01_IE",
            text: "pluginInstall_windows_msie_text_download"
          },
          install: {
            image: "Windows_02_Install",
            text: "pluginInstall_windows_msie_text_install"
          },
          enjoy: {
            image: "Windows_03_Skype",
            text: "pluginInstall_windows_msie_text_enjoy"
          }
        },
        Firefox: {
          closeScreen: {
            image: "CloseScreen",
            text: "pluginInstall_main_close_screen_subtitle"
          },
          download: {
            image: "Windows_01_Firefox",
            text: "pluginInstall_windows_firefox_text_download"
          },
          install: {
            image: "Windows_02_Firefox",
            text: "pluginInstall_windows_firefox_text_install"
          },
          enjoy: {
            image: "Windows_03_Skype",
            text: "pluginInstall_windows_firefox_text_enjoy"
          },
          unblock: {
            image: "Blocked_Firefox",
            text: "pluginInstall_unblock_text_firefox_subtitle"
          }
        },
        Unknown: {
          closeScreen: {
            image: "CloseScreen",
            text: "pluginInstall_main_close_screen_subtitle"
          },
          download: {
            image: "Windows_01_IE",
            text: "pluginInstall_windows_unknown_text_download"
          },
          install: {
            image: "Windows_02_Install",
            text: "pluginInstall_windows_unknown_text_install"
          },
          enjoy: {
            image: "Windows_03_Skype",
            text: "pluginInstall_windows_unknown_text_enjoy"
          }
        }
      }
    };
  return { getInstallResources: f };
});
