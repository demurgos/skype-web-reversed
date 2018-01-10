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
      version: "1.90.16",
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
      ecsSpacesKey: "SWG",
      ecsPesKey: "SkypePersonalization",
      ecsTrapKey: "MDN_TRAP",
      ecsCqfKey: "SkypeRealTimeMedia",
      ecsSkypeCallingT1Key: "SkypeCallingT1",
      ecsTrouterKey: "TrouterJScriptClient",
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
      oneAccountSupportUrl: "https://go.skype.com/one.account.for.skype.and.microsoft",
      feedbackPageUrl: "https://feedback.skype.com",
      pollFallbackUrl: "https://login.skype.com/login/sso?go=webclient",
      meProfileUrl: "https://go.skype.com/myaccount?intsrc=client-_-webapp-_-production-_-go-myaccount",
      listParticipantNamesInConversationTopic: !0,
      isPollingEnabled: !0,
      maximumParticipantsAudio: 25,
      maximumParticipantsVideo: 10,
      mentionsTreshold: 4,
      startConversationMaxParticipantCount: 0,
      defaultBusinessContactsGroup: "Web Contacts",
      businessNotificationPersistence: {
        persistWhenConnectedElsewhere: {
          enabled: !1,
          timeout: 900000
        },
        persistWhenAutoAccepted: {
          enabled: !1,
          timeout: 900000
        }
      },
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
      maxSilentLoginRetries: 3,
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
      unansweredUI: {
        minCallDuration: 5000,
        defaultGreenButtons: {
          chatButton: !0,
          retryButton: !1
        }
      },
      avatarService: {
        host: "https://avatar.skype.com/v1/",
        contactAvatarEndpoint: "avatars/${contactId}?auth_key=${authKey}&returnDefaultImage=false&cacheHeaders=true",
        publicAvatarEndpoint: "avatars/${contactId}/public?returnDefaultImage=false&cacheHeaders=true"
      },
      agentProvisioningService: { host: "https://api.aps.skype.com/v1/" },
      contactSearchWebService: {
        host: "https://skypegraph.skype.com/search/v1.1/namesearch/swx",
        mirroringHost: "https://skypegraphprodcanary2.cloudapp.net/search/v1.1/namesearch/swx"
      },
      inviteWebService: { host: "https://inviteconnector.skype.com" },
      stratusService: {
        host: "https://api.skype.com/",
        retry: n
      },
      contactsService: {
        host: "https://contacts.skype.com/",
        myContactsEndpoint: "contacts/${version}/users/${id}/contacts?delta&$filter=type eq 'skype' or type eq 'msn' or type eq 'pstn' or type eq 'agent' or type eq 'lync'&reason=${reason}",
        retry: n
      },
      entitlementService: {
        host: "https://consumer.entitlement.skype.com/",
        listingEndpoint: "/users/${username}/services",
        serviceEndpoint: "/users/${username}/services/${service}",
        retry: n
      },
      abchUserWebService: {
        appId: "f9606e30-ea4c-4cc2-b655-082b97e630ed",
        host: "https://people.directory.live-int.com/"
      },
      profileService: {
        appId: "f9606e30-ea4c-4cc2-b655-082b97e630ed",
        host: "https://pf.directory.live-int.com/",
        profileEndpoint: "profile/mine/System.ShortCircuitProfile.json"
      },
      pnvService: {
        host: "https://a.qalogin.skype.net/",
        pnvEndpoint: "shortcircuit/phonenumberverification",
        clientId: "580081"
      },
      commerce: {
        purchaseCreditUrl: "https://go.skype.com/store.buy.skypecredit",
        purchaseSubscriptionUrl: "https://go.skype.com/rates"
      },
      skypeFromOutlook: {
        host: "https://support.skype.com/",
        page: "/faq/FA12247/how-do-i-use-skype-from-my-outlook-com-account"
      },
      userOptionsService: {
        host: "https://api.skype.com",
        optionsEndpoint: "/users/${userId}/options/${optionName}"
      },
      messageSearchService: {
        host: "https://scsquerycontroltower.cloudapp.net/",
        endpoints: { query: "v1/query" }
      },
      smsPriceWebService: { host: "https://skypesmssfe.trafficmanager.net" },
      controls: {
        sidebar: "Sidebar",
        content: "Content",
        me: "Me"
      },
      plugin: {
        pingHeartBeatTimeout: 5000,
        loadDelayMilisec: 250,
        loadDuringDetection: !0,
        maxTotalLoadDelayMilisec: 600000,
        managerLoadTimeout: 4000,
        pluginInitTimeout: 25000,
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
          numVideoChannelsGvc: 5,
          renegotiationAttempts: 3,
          preferSdesSrtp: !0,
          iceDisconnectedTimeoutMs: 30000,
          webrtcVideoCapabilityMaxFS: 1200,
          webrtcVideoCapabilityMaxFPS: 3000,
          webrtcScreensharingCapabilityMaxFS: 3600,
          webrtcScreensharingCapabilityMaxFPS: 1500,
          webrtcVideoCapabilityCheckIntervalMin: 20000,
          webrtcVideoCapabilityCheckIntervalMax: 30000,
          webrtcScreensharingCapabilityCheckIntervalMin: 8000,
          webrtcScreensharingCapabilityCheckIntervalMax: 12000,
          enableLocalVideoConstraints: !0,
          webrtcAudioChannelSignalingFeedback: "app recv:dsh",
          webrtcVideoChannelSignalingFeedback: "app send:src recv:src",
          ortcVideoCapabilityMaxFS: 1200,
          ortcVideoCapabilityMaxFPS: 3000,
          ortcVideoCapabilityCheckIntervalMin: 20000,
          ortcVideoCapabilityCheckIntervalMax: 30000,
          webrtcResolutionManagerCooldownTimeout: 15000,
          webrtcResolutionManagerRetryDelay: 5000,
          capabilities: { webrtc: { screensharing: !1 } },
          dtmf: {
            toneDuration: 200,
            toneGap: 100
          },
          activeSpeaker: { timeToPromote: 3000 }
        },
        allowedMinEdgeVersion: 13
      },
      unreadMessageReminderType: "emphasized",
      featureFlags: {
        agentsDiscoverable: !1,
        agentsEnabled: !1,
        showAgentIdOnProfile: !1,
        showAgentRatingOnProfile: !1,
        showAgentExtraInfoOnProfile: !1,
        newChat: !1,
        pinningToDogfoodCloud: !1,
        resizeCallAndChat: !1,
        creditBalanceAutoUpdateEnabled: !1,
        contactListChangeNotification: !1,
        deactivateCache: !1,
        skypeDirectorySearch: !1,
        muteNotifications: !1,
        muteNotificationsWithClosedSidebar: !1,
        muteSpecificConversationsEnabled: !1,
        browserNativeNotificationsEnabled: !1,
        useDarkThemeForBrowserNotificationsOptInFlow: !1,
        browserNotificationEducationalToastEnabled: !1,
        notifyHostEvenWhenMeNotAvailable: !1,
        newConversationV2: !1,
        spaces: !1,
        lastSeen: !1,
        mobileIndicator: !1,
        hasBetaLabel: !1,
        hasFeedbackLink: !1,
        hasFeedbackLinkOnError: !1,
        hasTimelineBadge: !1,
        showContactsPageHint: !1,
        showContactsPageInformationalMessage: !1,
        showFirstRunLandingExperience: !1,
        includeSelfInParticipantsCount: !1,
        showAlternateShareDialogExperience: !1,
        canNotifyWithoutVideo: !1,
        silentLinking: !1,
        showDefaultAvatarInNotifications: !1,
        directorySearchSkypeAndLync: !1,
        fetchContactsByPageEnabled: !1,
        contactPageFilterTabs: !1,
        doNotSendContactsToChatService: !1,
        supportStandbyMode: !1,
        disablePollingOnKahuna: !1,
        unreadMessageReminderToast: !1,
        profileUpdateNotificationsEnabled: !1,
        skypeUriNavigationEnabled: !0,
        timezoneInChatServiceRequest: !1,
        calling: !0,
        autoCalling: !1,
        NGCalling: !1,
        PSTN: !1,
        disableCallingOnIE: !1,
        disableCallingOnEdge: !1,
        disableCallingOnChrome: !1,
        disableCallingOnFirefox: !1,
        disableCallingOnSafari: !1,
        pluginAutoUpdate: !1,
        persistentPlugin: !1,
        persistentShellApp: !1,
        preloadPlugin: !1,
        preloadShellApp: !1,
        GVCEscalation: !1,
        GVCLocalEscalation: !1,
        GVCJoining: !1,
        GVCOutgoing: !1,
        callingFullScreen: !1,
        CQF: !1,
        unansweredCallUIEnabled: !1,
        deviceDisabledDialogEnabled: !1,
        pluginlessCallingFirefox: !1,
        pluginlessCallingChrome: !1,
        pluginlessCallingEdge: !1,
        pluginlessCallingElectron: !1,
        pluginlessCallingChromeLinux: !1,
        pluginlessVideoCallingChromeLinux: !1,
        pluginlessVideoCallingFirefox: !1,
        pluginlessGroupVideoCallingChromeLinux: !1,
        pluginlessPSTNCalling: !1,
        pluginlessIncomingScreenSharingEdge: !1,
        pluginlessRemoteEscalation: !1,
        pluginlessLocalEscalation: !1,
        hostlessGroupCallingPluginless: !0,
        swiftCardCommand: !1,
        swiftCardRendering: !1,
        swiftCardRenderingMediaCards: !1,
        botMessagesModeV2enabled: !1,
        suggestedActionsEnabled: !1,
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
        contextMenuMarkAsReadEnabled: !1,
        contextMenuCopyMessagesEnabled: !1,
        alternativeSidebarLayout: !1,
        formatQuotesEnabled: !1,
        skypeCallPolicySupport: !1,
        skypeVideoCallingPolicySupport: !1,
        spaceTopicEditor: !1,
        markReadMessagesV2Enabled: !1,
        copySelectionAsQuoteKeyboard: !1,
        userSettingsEnabled: !1,
        alternativeSettingsPositionEnabled: !1,
        showUnlistedSettings: !1,
        aboutPageEnabled: !1,
        moodMessageEditEnabled: !1,
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
        emoticonSettingsEnabled: !1,
        emoticonSuggestionEnabled: !1,
        emoticonImplicitSuggestionDisabled: !1,
        showEmoticonSuggestionsSetting: !1,
        suggestHiddenEmoticons: !1,
        pesStoreEnabled: !1,
        canvasEmoticonsEnabled: !1,
        urlPreviews: !1,
        youtubePlayer: !1,
        urlPreviewLoadYoutubePlayer: !1,
        incomingScreenSharing: !1,
        outgoingScreenSharing: !1,
        outgoingScreenSharingPreview: !1,
        transferCall: !1,
        incomingWikiMarkup: !1,
        isCloudVideoMessageEnabled: !1,
        isCloudAudioMessageEnabled: !1,
        isFlikMessageEnabled: !1,
        newUrlPreviewDomainEnabled: !1,
        contactCardRenderingEnabled: !1,
        sendContactCardEnabled: !1,
        aggressiveImplicitMentionsMatching: !1,
        enableAggressiveMentionsToast: !1,
        mentionsEnabled: !1,
        mentionsPeopleEnabled: !1,
        codeSnippetEnabled: !1,
        notificationsCenter: !1,
        supportMessageProperties: !1,
        enablePingEcsConfig: !0,
        enableEndpointEcsConfig: !0,
        heartsEnabled: !1,
        heartsNotificationEnabled: !1,
        showChatIntroText: !1,
        pollsEnabled: !1,
        translatorSendingEnabled: !1,
        showTimestampsInNarrowMode: !1,
        photoSharingEnabled: !1,
        fileTransferEnabled: !1,
        mediaBarEnabled: !1,
        mediaBarV2Enabled: !1,
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
        callEducationBubble: !1,
        chatEducationBubble: !1,
        scheduleCallEducationBubble1: !1,
        scheduleCallEducationBubble2: !1,
        scheduleCallFromConversation: !1,
        useLegacySchedulerUriFormat: !1,
        welcomeDialog: !1,
        useAzureBasedSilentLogin: !1,
        enableRawEmoticonsRendering: !1,
        fullScreenModeFromSidepane: !1,
        contentSearch: !1,
        giphy: !1,
        meCommandEnabled: !1,
        telemetrySearchEnabled: !1,
        uiActionPerfTelemetryEnabled: !1,
        runtimeErrorsTelemetryEnabled: !1,
        captureSourceInAllTelemetryEnabled: !1,
        idleUsersAnalytics: !1,
        usersAnalytics: !1,
        enhancedNotification: !1,
        sidebarReopenEnabled: !1,
        keyEncryptionServiceV2Enabled: !1,
        navigationMenuIconsEnabled: !1,
        favoritesConversationsEnabled: !1,
        favoriteContactsEnabled: !1,
        useGraphSearchAnnotations: !1,
        graphSearchMirroringEnabled: !1,
        syncThreadBeforeJoinConversationEnabled: !1,
        audioVideoSettingsSupport: !1,
        useWhiteThemeForSplashScreen: !1,
        showSignInButtonOnTimeout: !1,
        showSignInButtonOnSignout: !1,
        notificationsSettingsEnabled: !1,
        notificationsSoundsSettingsEnabled: !1,
        ringingDeferring: !1,
        chatNotificationsSettingsEnabled: !1,
        chatNotificationsSoundSettingsEnabled: !1,
        callNotificationsSettingsEnabled: !1,
        callNotificationsSoundSettingsEnabled: !1,
        incomingCallToastNotifications: !1,
        unreadMessageToastNotifications: !1,
        contactRequestToastNotifications: !1,
        chatRequestToastNotifications: !1,
        unreadMessageToastForActiveEndpoint: !1,
        chatMessageTypeNotificationEnabled: !1,
        useAvatarCache: !1,
        useAvatarInitials: !1,
        avatarServiceSupportsSizeParameter: !1,
        showOneAccountLink: !1,
        initPreferencesAfterSignin: !1,
        darkThemeEnabled: !1,
        videoAutoPlaybackSettingsEnabled: !1,
        askToUnblockPlugin: !0,
        smsSupportEnabled: !1,
        unreadConversationDebugger: !1,
        groupAvatarUpdateEnabled: !1,
        hideSystemMessages: !1,
        hideSidebarOnStart: !1,
        messageEnforceTextFormat: !1,
        removeConversationHistory: !1,
        headerControlsDisabled: !1,
        singleConversationMode: !1,
        skipChatCapabilityCheck: !1,
        lowFocusImportanceContactRequest: !1,
        enableBusinessContactManagement: !1,
        useBusinessWording: !1,
        searchEducationBubbleBusiness: !1,
        chatEducationBubbleBusiness: !1,
        notificationsToggleEnabled: !1,
        disableConcurrentActiveCalls: !1,
        disableContactCardMenu: !1,
        disableKes: !1,
        disableLeaveConversation: !1,
        disableOpenConversationWithAuthor: !1,
        disablePersistentContactPresenceSubscription: !1,
        optimizeSpaceForCC: !1,
        disableRemoveConversationConfirmation: !1,
        disableCallScreenChatOption: !1,
        showEducationalCarousel: !1,
        hasFeedbackIcon: !1,
        showPickerSpinner: !1,
        showSearchQueryMoreResultsAvailable: !1,
        callscreenMinMax: !1
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
          noiseFactor: 0.5
        },
        standbyPollingDelayTime: {
          min: 30,
          max: 30
        }
      },
      swift: {
        urlPrefixBlacklist: [
          "http",
          "file",
          "smb"
        ]
      },
      giphy: {
        apiKey: "x4Rn0SRIjjXEc",
        rating: "pg-13"
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
        pnhTemplate: "SkypeWeb_1.5",
        pnhNGCTemplate: "SkypeWebNGC_1.7",
        p2pToNgcNotificationTimeout: 2000,
        connectTimeout: 90000,
        trouterTelemetryEnvironment: "int"
      },
      telemetry: {
        uiTenantToken: "bb15b8f2b7f446d4af2e245fc3b07e79-31d92fdb-e7a5-4be8-b14f-c48048f67a59-7685",
        jSkypeTenantToken: "bb15b8f2b7f446d4af2e245fc3b07e79-31d92fdb-e7a5-4be8-b14f-c48048f67a59-7685",
        skypeConcoreToken: "53fdaa090eb946b5a1d6cbdeb4f2ef66-bcbf6380-2590-41cc-ae60-9e467cd51835-7413",
        chatTenantToken: "b1e7805369ba4b5eaff1c894e532d32e-8ea4e021-e32f-4ba5-82ec-c1c980641d31-7035",
        trouterTenantToken: "19fbe91e74c64280aade16524a7fe51f-e0eb76a5-68df-4e5c-8ce3-6d33e395df6c-7043",
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
      applicationLanguage: "en-us",
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
          apiKey: "x4Rn0SRIjjXEc",
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
          giphyImages: 4
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
      cloudFileSharing: { unsafeFileTypes: ".ade,.adp,.app,.asp,.bas,.bat,.cer,.chm,.cmd,.com,.cpl,.crt,.csh,.der,.exe,.fxp,.gadget,.hlp,.hta,.inf,.ins,.isp,.its,.js,.jse,.ksh,.lnk,.mad,.maf,.mag,.mam,.maq,.mar,.mas,.mat,.mau,.mav,.maw,.mda,.mdb,.mde,.mdt,.mdw,.mdz,.msc,.msh,.msh1,.msh2,.mshxml,.msh1xml,.msh2xml,.msi,.msp,.mst,.ops,.pcd,.pif,.plg,.prf,.prg,.pst,.reg,.scf,.scr,.sct,.shb,.shs,.ps1,.ps1xml,.ps2,.ps2xml,.psc1,.psc2,.tmp,.url,.vb,.vbe,.vbs,.vsmacros,.vsw,.ws,.wsc,.wsf,.wsh,.xnk" },
      flags: "",
      welcomeExperience: {
        enabled: !1,
        minDelayBeforeFirstMessage: 0,
        maxDelayBeforeFirstMessage: 300000,
        toastPersistenceTimeout: 300000,
        whitelist: []
      },
      avatarCacheDuration: 3600000,
      greenId: {
        iframeUrl: "https://fpt.skype.com",
        registerUrl: "https://register.greenid.skype.com/api/register",
        timeout: 20000
      }
    };
  return r;
});
