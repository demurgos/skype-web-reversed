define("experience/settings", [
  "require",
  "experience/defaultInitParams"
], function (e) {
  var t = e("experience/defaultInitParams"), n = {
      enabled: !0,
      limit: 3,
      delay: 1000,
      strategy: "fixed"
    }, r = {
      version: "1.40.107",
      biAppName: "swx-local",
      biClientName: "Web",
      platformId: "908",
      productName: "SWX",
      API: {
        version: 1,
        exposeCafe: !1
      },
      ecsHosts: [
        "https://a.config.skype.com",
        "https://b.config.skype.com"
      ],
      ecsSpacesKey: "swg",
      ecsPesKey: "SkypePersonalization",
      ecsTrapKey: "MDN_TRAP",
      ecsCqfKey: "SkypeRealTimeMedia",
      ecsClientCobrandTag: "0",
      webApiServiceHost: "https://client-s.gateway.messenger.live.com",
      amdServiceHost: "https://api.asm.skype.com",
      assetsServiceHost: "https://apps.skypeassets.com/rates/skypeout",
      urlPServiceHost: "https://urlp.asm.skype.com",
      xmmFallbackUrl: "https://login.skype.com/login/sso",
      keyEncryptionServiceHost: "https://kes.skype.com/v1/swx",
      keyEncryptionServiceHostV2: "https://kes.skype.com/v2/swx",
      locationHost: "https://www.bing.com/maps",
      faqPageUrl: "https://www.skype.com/go/help.faq.skype.for.web",
      feedbackPageUrl: "https://feedback.skype.com",
      pollFallbackUrl: "https://login.skype.com/login/sso?go=webclient",
      meProfileUrl: "https://go.skype.com/myaccount?intsrc=client-_-webapp-_-production-_-go-myaccount",
      isVideoMessagesDisabled: !1,
      listParticipantNamesInConversationTopic: !0,
      isPollingEnabled: !0,
      maximumParticipantsAudio: 25,
      maximumParticipantsVideo: 10,
      mentionsTreshold: 4,
      startConversationMaxParticipantCount: 0,
      defaultBusinessContactsGroup: "Web Contacts",
      youtubeWrapDelay: 500,
      youtubeApiUrl: "https://www.youtube.com/iframe_api",
      mapsApiUrl: "https://ecn.dev.virtualearth.net/mapcontrol/mapcontrol.ashx?v=7.0",
      flagsApiUrl: "https://flagsapi.skype.com/flags/v1",
      calendarUrl: "https://outlook.live.com/owa/?path=/calendar/action/compose&",
      legacyCalendarUrl: "https://calendar.live.com/?rru=addevent&",
      webLoginUrl: "https://login.skype.com/login",
      webLoginClientId: "680081",
      cookiesPrivacyUrl: "https://go.skype.com/privacy/",
      loginPopup: {
        loginUrl: "https://login.microsoftonline.com/common/oauth2/authorize",
        clientId: "e48d4214-364e-4731-b2b6-47dabf529218",
        redirectUrl: "https://latest-swx.cdn.skype.com/swx4b/aad/externalSignInHandler.html",
        resourceUrl: "https://webdir.online.lync.com",
        defaultWidth: 800,
        defaultHeight: 600
      },
      application: { endpointId: "d97583cc-9781-4a59-9628-06c4e609c65b" },
      shellApp: {
        contactPollingInterval: 15000,
        chromeExtensionId: "blakpkgjpemejpbmfiglncklihnhjkij",
        chromeExtensionWebstoreUrl: "https://chrome.google.com/webstore/detail/blakpkgjpemejpbmfiglncklihnhjkij",
        bootstrapperUrl: "https://swx.cdn.skype.com/shared/v/1.2.9/SkypeBootstrap.min.js",
        indexPageUrl: undefined,
        connectShellAppHostRetries: 2
      },
      images: {
        skypeLogo: "https://swx.cdn.skype.com/assets/skype_logo_white.png",
        relativeToAppBase: {
          defaultProfileAvatarSvg: "/assets/images/avatars/default-avatar-contact.svg",
          defaultGroupAvatarSvg: "/assets/images/avatars/default-avatar-group.svg",
          defaultPstnAvatarSvg: "/assets/images/avatars/avatar-pstn.svg"
        }
      },
      uicServiceUrl: {
        byPassword: "https://rtc-uic.cloudapp.net/v0/getuic-jsonp",
        bySkypeToken: "https://uic.login.skype.com/login/uic"
      },
      autoCalling: {
        waitTimeOut: 6000,
        callTimeout: 120000,
        serviceFailureTimeout: 3000
      },
      cqf: {
        skypeCallPercentage: 10,
        groupCallPercentage: 10,
        pstnCallPercentage: 10,
        minimumCallLengthSec: 5,
        inactivityTimeout: 60000
      },
      agentProvisioningService: { host: "https://api.aps.skype.com/v1/" },
      stratusService: {
        avatarUrl: "users/${contactId}/profile/avatar?cacheHeaders=1",
        avatarUpdateUrl: "users/${contactId}/profile/avatar",
        blockContactEndpoint: "users/self/contacts/${contactId}/block",
        contactRequestEndpoint: "users/self/contacts/auth-request",
        contactRequestTimeInterval: 60000,
        contactsEndpoint: "users/self/authorized-contacts",
        directorySearchEndpointSkypeOnly: "search/users/any?keyWord=${keyword}&contactTypes[]=skype",
        directorySearchEndpoint: "search/users/any?keyWord=${keyword}",
        directorySearchByIdEndpoint: "search/users?skypename=${skypeName}",
        firstContactRequestDelay: 10000,
        host: "https://api.skype.com/",
        myContactsEndpoint: "users/self/contacts?hideDetails=true",
        profileEndpoint: "users/self/profile",
        profilesEndpoint: "users/self/contacts/profiles",
        batchProfilesEndpoint: "users/batch/profiles",
        userInfoEndpoint: "users/self",
        unblockContactEndpoint: "users/self/contacts/${contactId}/unblock",
        deleteContactEndpoint: "users/self/contacts/${contactId}",
        retry: n
      },
      contactsProxyService: {
        blockContactEndpoint: "contacts/${version}/users/${id}/contacts/${contactType}/${contactId}/block",
        unblockContactEndpoint: "contacts/${version}/users/${id}/contacts/${contactType}/${contactId}/unblock",
        deleteContactEndpoint: "contacts/${version}/users/${id}/contacts/${contactType}/${contactId}",
        host: "https://contacts.skype.com/",
        myContactsEndpoint: "contacts/${version}/users/${id}/contacts?$filter=type eq 'skype' or type eq 'msn' or type eq 'pstn' or type eq 'agent' or type eq 'lync'&reason=${reason}",
        myDeltaContactsEndpoint: "contacts/${version}/users/${id}/contacts?delta&$filter=type eq 'skype' or type eq 'msn' or type eq 'pstn' or type eq 'agent' or type eq 'lync'&reason=${reason}",
        retry: n
      },
      entitlementService: {
        host: "https://consumer.entitlement.skype.com/",
        listingEndpoint: "/users/${username}/services",
        serviceEndpoint: "/users/${username}/services/${service}",
        retry: n
      },
      peopleService: {
        appId: "5c7a1e34-3a23-4a36-b2e6-7aa15be85f07",
        host: "https://people.directory.live-int.com/",
        settingsEndpoint: "people/account/settings"
      },
      profileService: {
        appId: "5c7a1e34-3a23-4a36-b2e6-7aa15be85f07",
        host: "https://pf.directory.live-int.com/",
        profileEndpoint: "profile/mine/System.ShortCircuitProfile.json"
      },
      pnvService: {
        host: "https://a.qalogin.skype.net/",
        pnvEndpoint: "shortcircuit/phonenumberverification",
        finishEndpoint: "finish",
        clientId: "580081"
      },
      commerce: {
        purchaseCreditUrl: "https://go.skype.com/store.buy.skypecredit",
        purchaseSubscriptionUrl: "https://go.skype.com/rates"
      },
      userOptionsService: {
        host: "https://api.skype.com",
        optionsEndpoint: "/users/${userId}/options/${optionName}"
      },
      messageSearchService: {
        host: "https://scsquerycontroltower.cloudapp.net/",
        endpoints: { query: "v1/query" }
      },
      controls: {
        sidebar: "Sidebar",
        content: "Content",
        me: "Me"
      },
      plugin: {
        pingHeartBeatTimeout: 5000,
        loadDelayMilisec: 250,
        maxTotalLoadDelayMilisec: 600000,
        manifestKey: "SkypePluginManifestProd",
        ecsService: "prod",
        download: {
          msi: "https://swx.cdn.skype.com/plugin/SkypeWebPlugin.msi",
          pkg: "https://swx.cdn.skype.com/plugin/SkypeWebPlugin.pkg",
          minVersion: "7.0.0.5",
          maxVersion: "99.99.99.99"
        }
      },
      pluginless: {
        conversationServiceUrl: "https://api.conv.skype.com/conv/",
        mediaAgent: {
          numVideoChannelsGvc: 10,
          renegotiationAttempts: 3,
          sdes: !0
        },
        allowedEdgeVersion: {
          lowerBound: 13,
          upperBound: 13
        }
      },
      featureFlags: {
        agentsDiscoverable: !1,
        agentsEnabled: !1,
        contactsServiceV2: !1,
        showAgentIdOnProfile: !1,
        showAgentRatingOnProfile: !1,
        newChat: !1,
        pinningToDogfoodCloud: !1,
        pluginAutoUpdate: !1,
        resizeCallAndChat: !1,
        calling: !0,
        NGCalling: !1,
        GVCEscalation: !1,
        GVCLocalEscalation: !1,
        GVCJoining: !1,
        GVCOutgoing: !1,
        PSTN: !1,
        CQF: !1,
        creditBalanceAutoUpdateEnabled: !1,
        persistentPlugin: !1,
        persistentShellApp: !1,
        contactListChangeNotification: !1,
        deactivateCache: !1,
        preloadPlugin: !1,
        preloadShellApp: !1,
        skypeDirectorySearch: !1,
        muteNotifications: !1,
        muteNotificationsWithClosedSidebar: !1,
        notifyHostEvenWhenMeNotAvailable: !1,
        newConversationV2: !1,
        spaces: !1,
        lastSeen: !1,
        mobileIndicator: !1,
        mobileActive: !1,
        hasBetaLabel: !1,
        hasFeedbackLink: !1,
        hasFeedbackLinkOnError: !1,
        hasFeedbackIcon: !1,
        hasTimelineBadge: !1,
        showContactsPageHint: !1,
        showContactsPageInformationalMessage: !1,
        contactProfile: !1,
        deleteContactUsingContactsService: !1,
        includeSelfInParticipantsCount: !1,
        showAlternateShareDialogExperience: !1,
        pluginlessCallingFirefox: !1,
        pluginlessCallingChrome: !1,
        pluginlessCallingEdge: !1,
        pluginlessCallingElectron: !1,
        pluginlessCallingChromeLinux: !1,
        silentLinking: !1,
        autoCalling: !1,
        showDefaultAvatarInNotifications: !1,
        showSearchQueryMoreResultsAvailable: !1,
        contactProfileCache: !1,
        directorySearchSkypeAndLync: !1,
        presenceDataCache: !1,
        newSelfPresence: !1,
        batchProfilesV2: !1,
        contactPageFilterTabs: !1,
        doNotSendContactsToChatService: !1,
        supportStandbyMode: !1,
        disablePollingOnKahuna: !1,
        swiftCardCommand: !1,
        swiftCardRendering: !1,
        reAuthEnabled: !1,
        hideSidebarOnStart: !1,
        messageEnforceTextFormat: !1,
        useBusinessWording: !1,
        removeConversationHistory: !1,
        disableLeaveConversation: !1,
        showContactsPageSignIn: !1,
        hideConversationHeader: !1,
        headerControlsDisabled: !1,
        singleConversationMode: !1,
        skipChatCapabilityCheck: !1,
        disablePersistentContactPresenceSubscription: !1,
        enableBusinessContactManagement: !1,
        enableBusinessPresenceMapping: !1,
        issueReporting: !1,
        callInfoCommand: !1,
        serviceFailureReporting: !1,
        skypeDataTelemetry: !1,
        shellAppLogs: !1,
        consoleLogging: !1,
        errorLogReporting: !1,
        enableUnreadMessagesLogging: !1,
        contextMenuQuoteMessagesEnabled: !1,
        contextMenuSaveVideoMessagesEnabled: !1,
        alternativeSidebarLayout: !1,
        skypeCallPolicySupport: !1,
        skypeVideoCallingPolicySupport: !1,
        spaceTopicEditor: !1,
        userSettingsEnabled: !1,
        showUnlistedSettings: !1,
        aboutPageEnabled: !1,
        inviteFree: !1,
        inviteFreeImplicitIncomingContactRequest: !1,
        shortCircuit: !1,
        pesCDNAuthUrlFallbackEnabled: !1,
        pesFetchSmallAssetsOnDemand: !1,
        pesFetchMediumAssetsOnDemand: !1,
        pesFetchLargeAssetsOnDemand: !1,
        pesFetchMojiAssetsOnDemand: !1,
        pesCDNAuthEnabled: !1,
        pesUseExtraLargeEmoticons: !1,
        hideEmoticonPickerButton: !1,
        pesBingImageSearchEnabled: !1,
        pesGiphyImageSearchEnabled: !1,
        pesLocalSearchEnabled: !1,
        pesV2Enabled: !1,
        emoticonSuggestionEnabled: !1,
        emoticonImplicitSuggestionDisabled: !1,
        suggestHiddenEmoticons: !1,
        pesStoreEnabled: !1,
        urlPreviews: !1,
        youtubePlayer: !1,
        urlPreviewLoadYoutubePlayer: !1,
        incomingScreenSharing: !1,
        outgoingScreenSharing: !1,
        incomingWikiMarkup: !1,
        isCloudVideoMessageEnabled: !1,
        isFlikMessageEnabled: !1,
        newUrlPreviewDomainEnabled: !1,
        contactCardRenderingEnabled: !1,
        sendContactCardEnabled: !1,
        aggressiveImplicitMentionsMatching: !1,
        enableAggressiveMentionsToast: !1,
        mentionsEnabled: !1,
        notificationsCenter: !1,
        supportMessageProperties: !1,
        enablePingEcsConfig: !0,
        enableEndpointEcsConfig: !0,
        heartsEnabled: !1,
        heartsNotificationEnabled: !1,
        showChatIntroText: !1,
        pollsEnabled: !1,
        translatorSendingEnabled: !1,
        photoSharingEnabled: !1,
        fileTransferEnabled: !1,
        mediaBarEnabled: !1,
        fileDragDropEnabled: !1,
        filePasteEnabled: !1,
        showMessageDeliveryIndicator: !1,
        showMessageDeliveryStatus: !1,
        readReceiptEnabled: !1,
        isTypingIndicator: !1,
        showWhenIamTyping: !1,
        creditGifting: !1,
        failInitializationOnIE: !1,
        searchEducationBubble: !1,
        searchEducationBubbleBusiness: !1,
        callEducationBubble: !1,
        chatEducationBubble: !1,
        chatEducationBubbleBusiness: !1,
        scheduleCallEducationBubble1: !1,
        scheduleCallEducationBubble2: !1,
        scheduleCallFromConversation: !1,
        useLegacySchedulerUriFormat: !1,
        welcomeDialog: !1,
        useAzureBasedSilentLogin: !1,
        enableRawEmoticonsRendering: !1,
        contentSearch: !1,
        giphy: !1,
        telemetrySearchEnabled: !1,
        uiActionPerfTelemetryEnabled: !1,
        runtimeErrorsTelemetryEnabled: !1,
        keyEncryptionServiceV2Enabled: !1,
        navigationMenuIconsEnabled: !1,
        favoritesConversationsEnabled: !1,
        syncThreadBeforeJoinConversationEnabled: !1
      },
      retry: n,
      webApiService: {
        retry: {
          limit: 5,
          delay: 100,
          strategy: "exponential"
        },
        overrides: { ping: { strategy: "fixed" } },
        pingDelayTime: {
          min: 30,
          max: 60
        },
        endpointRetry: {
          base: 5,
          limit: 120,
          noiseFactor: 0
        },
        standbyPollingDelayTime: {
          min: 30,
          max: 30
        }
      },
      giphy: {
        apiKey: "dc6zaTOxFJmzC",
        rating: "pg-13"
      },
      activeSpeaker: {
        tickInterval: 100,
        timeToPromote: 3000,
        timeToDemote: 3000,
        ticksToCancel: 3,
        recentlySpokenTimeout: 20000
      },
      contactsPageInformationalMessage: {
        key: "",
        link: ""
      },
      conversationHistoryPageSize: 30,
      incomingCalls: {
        notificationTimeout: 30000,
        trouterServiceUrl: "https://go.trouter.io/v2/a",
        tpcServiceUrl: "https://prod.tpc.skype.com/v1/policies",
        registrarServiceUrl: "https://prod.registrar.skype.com/v2/registrations",
        registrarTtlInSeconds: 3600,
        registrarRefreshTimeoutInMs: 3540000,
        trouterReadyTimeoutInMs: 20000,
        trouterConnectTimeoutInMs: 10000,
        maxRegistrationTimeInMs: 86400000,
        pnhAppId: "skype",
        pnhTemplate: "SkypeWeb_1.3",
        pnhNGCTemplate: "SkypeWebNGC_1.3",
        p2pToNgcNotificationTimeout: 2000
      },
      telemetry: {
        uiTenantToken: "bb15b8f2b7f446d4af2e245fc3b07e79-31d92fdb-e7a5-4be8-b14f-c48048f67a59-7685",
        jSkypeTenantToken: "bb15b8f2b7f446d4af2e245fc3b07e79-31d92fdb-e7a5-4be8-b14f-c48048f67a59-7685",
        skypeConcoreToken: "53fdaa090eb946b5a1d6cbdeb4f2ef66-bcbf6380-2590-41cc-ae60-9e467cd51835-7413",
        mdscToken: "695e6c4def6c4847b178d16c83b926c4-51ac8017-8fbb-4069-9bf4-3e9cc75ebad8-7393",
        logReportingToken: "695e6c4def6c4847b178d16c83b926c4-51ac8017-8fbb-4069-9bf4-3e9cc75ebad8-7393",
        logThrottleInterval: 10000,
        issueReportUrl: "",
        issueReportScript: "",
        upnCorrelationIdEnabled: !1
      },
      serviceQosReporter: { iterationCountBeforeFlushingQoSMetrics: 50 },
      URLSanitizer: {
        securedResources: {
          allowedDomains: [
            "**.skypeassets.com",
            "**.skype.com"
          ],
          allowedProtocols: [
            "http",
            "https"
          ]
        }
      },
      initParams: t,
      pesCDNAuthentication: {
        skypeServiceHost: "static.asm.skype.com",
        tokenSourceEndpoint: "/pes/v1/petoken",
        cdnServiceHost: "static-asm.secure.skypeassets.com",
        cookieSourceEndpoint: "/token/token_to_cookies",
        securedPathsPattern: "static[.]asm[.]skype[.]com",
        cdnTokenTtlMs: 300000,
        rewriteRules: [
          {
            from: "static.asm.skype.com",
            to: "static-asm.secure.skypeassets.com"
          },
          {
            from: "api.asm.skype.com",
            to: "static-asm.secure.skypeassets.com"
          }
        ]
      },
      pesSearchServices: {
        bingApiKey: "aGt3dUhqZkFrbnZyU2doM1FqQ0RPQUdEUTFTbzNqc0FmYlFWMEFSSytMVTpoa3d1SGpmQWtudnJTZ2gzUWpDRE9BR0RRMVNvM2pzQWZiUVYwQVJLK0xV",
        bingAuthMethod: "Basic",
        bingServiceURL: "https://api.datamarket.azure.com/Bing/Search/v1/Image",
        bingTriggerWords: [
          "bing",
          "meme",
          "gif"
        ],
        bingDefaultSearchTerm: "popular",
        bingPickFirst: "gif",
        bingMergeItems: !0,
        bingBorderStyle: "thin",
        giphy: {
          withQuerySources: [
            "translate",
            "random",
            "search"
          ],
          withoutQuerySources: ["trending"],
          serviceUrl: "https://api.giphy.com",
          apiKey: "dc6zaTOxFJmzC",
          rating: "pg-13"
        },
        localSearchCategories: [
          "Greetings",
          "Happy",
          "Love",
          "Angry",
          "Confused",
          "Disgust"
        ],
        localSearchGroupByType: !0
      },
      pesPicker: {
        useSelectedTabIconForPicker: !1,
        tabPlacementOverrides: {
          bing: -1,
          giphyImages: 1
        }
      },
      pesStoreServices: {
        catalogApiHost: "apps.skypeassets.com",
        catalogServiceEndpoint: "/personal-expression?expansion=full&language=${lang}",
        catalogItemByIdServiceEndpoint: "/offers/sticker-pack/skus/${offerId}",
        catalogPurchaseEndpoint: "/purchase",
        catalogDogfoodContentEnabled: !1,
        catalogPurchaseApiHost: "api.skype.com",
        catalogServiceVersion: "3.0",
        catalogPurchaseApiVersion: "1.0"
      },
      splashScreen: {
        learnMoreUrl: "",
        signInNotificationEnabled: !1
      },
      authentication: { anonymousMode: !1 },
      messageFilters: {
        outgoingMessageFilter: null,
        chatLogMessageFilter: null
      },
      xcoEnv: "qa",
      translatorClientAppId: "FF63883DDDED40068EC45030A601460C",
      translatorServiceURI: {
        TRANSLATE: "https://dev.microsofttranslator.com/api/skype/translate",
        LANGUAGES: "https://dev.microsofttranslator.com/api/languages"
      },
      userSettings: {
        hiddenCategories: [],
        hiddenPreferences: [],
        privacySettingsFetchTimeout: 1000
      },
      displayAppVersion: !1,
      cloudFileSharing: { unsafeFileTypes: ".ade,.adp,.app,.asp,.bas,.bat,.cer,.chm,.cmd,.com,.cpl,.crt,.csh,.der,.exe,.fxp,.gadget,.hlp,.hta,.inf,.ins,.isp,.its,.js,.jse,.ksh,.lnk,.mad,.maf,.mag,.mam,.maq,.mar,.mas,.mat,.mau,.mav,.maw,.mda,.mdb,.mde,.mdt,.mdw,.mdz,.msc,.msh,.msh1,.msh2,.mshxml,.msh1xml,.msh2xml,.msi,.msp,.mst,.ops,.pcd,.pif,.plg,.prf,.prg,.pst,.reg,.scf,.scr,.sct,.shb,.shs,.ps1,.ps1xml,.ps2,.ps2xml,.psc1,.psc2,.tmp,.url,.vb,.vbe,.vbs,.vsmacros,.vsw,.ws,.wsc,.wsf,.wsh,.xnk" }
    };
  return r;
});
