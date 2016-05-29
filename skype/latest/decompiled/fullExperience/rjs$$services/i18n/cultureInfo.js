define("services/i18n/cultureInfo", [], function () {
  function e() {
    function i(e) {
      for (t = 0; t < n.length; t++)
        if (n[t].language.toLowerCase() === e.toLowerCase())
          return n[t];
    }
    function s(e) {
      for (t = 0; t < r.length; t++)
        if (r[t].locale.toLowerCase() === e.toLowerCase() && r[t])
          return r[t];
    }
    var e = this, t, n = [
        {
          language: "am",
          defaultLocale: "am-et"
        },
        {
          language: "ar",
          defaultLocale: "ar-sa"
        },
        {
          language: "bg",
          defaultLocale: "bg-bg"
        },
        {
          language: "bn",
          defaultLocale: "bn-in"
        },
        {
          language: "ca",
          defaultLocale: "ca-es"
        },
        {
          language: "cs",
          defaultLocale: "cs-cz"
        },
        {
          language: "cy",
          defaultLocale: "cy-gb"
        },
        {
          language: "da",
          defaultLocale: "da-dk"
        },
        {
          language: "de",
          defaultLocale: "de-de"
        },
        {
          language: "el",
          defaultLocale: "el-gr"
        },
        {
          language: "en",
          defaultLocale: "en-us"
        },
        {
          language: "es",
          defaultLocale: "es-es"
        },
        {
          language: "et",
          defaultLocale: "et-ee"
        },
        {
          language: "eu",
          defaultLocale: "eu-es"
        },
        {
          language: "fa",
          defaultLocale: "fa-ir"
        },
        {
          language: "fi",
          defaultLocale: "fi-fl"
        },
        {
          language: "fil",
          defaultLocale: "fil-ph"
        },
        {
          language: "fr",
          defaultLocale: "fr-fr"
        },
        {
          language: "gl",
          defaultLocale: "gl-es"
        },
        {
          language: "gu",
          defaultLocale: "gu-in"
        },
        {
          language: "he",
          defaultLocale: "he-il"
        },
        {
          language: "hi",
          defaultLocale: "hi-in"
        },
        {
          language: "hr",
          defaultLocale: "hr-hr"
        },
        {
          language: "hu",
          defaultLocale: "hu-hu"
        },
        {
          language: "id",
          defaultLocale: "id-id"
        },
        {
          language: "is",
          defaultLocale: "is-is"
        },
        {
          language: "it",
          defaultLocale: "it-it"
        },
        {
          language: "ja",
          defaultLocale: "ja-jp"
        },
        {
          language: "kk",
          defaultLocale: "kk-kz"
        },
        {
          language: "kn",
          defaultLocale: "kn-in"
        },
        {
          language: "ko",
          defaultLocale: "ko-kr"
        },
        {
          language: "ku",
          defaultLocale: "ku-arab-iq"
        },
        {
          language: "lt",
          defaultLocale: "lt-lt"
        },
        {
          language: "lv",
          defaultLocale: "lv-lv"
        },
        {
          language: "ml",
          defaultLocale: "ml-in"
        },
        {
          language: "mr",
          defaultLocale: "mr-in"
        },
        {
          language: "ms",
          defaultLocale: "ms-my"
        },
        {
          language: "nb",
          defaultLocale: "nb-no"
        },
        {
          language: "nl",
          defaultLocale: "nl-nl"
        },
        {
          language: "nn",
          defaultLocale: "nn-no"
        },
        {
          language: "or",
          defaultLocale: "or-in"
        },
        {
          language: "pl",
          defaultLocale: "pl-pl"
        },
        {
          language: "pt",
          defaultLocale: "pt-PT"
        },
        {
          language: "pt-pt",
          defaultLocale: "pt-PT"
        },
        {
          language: "pt-br",
          defaultLocale: "pt-BR"
        },
        {
          language: "ro",
          defaultLocale: "ro-ro"
        },
        {
          language: "ru",
          defaultLocale: "ru-ru"
        },
        {
          language: "sk",
          defaultLocale: "sk-sk"
        },
        {
          language: "sl",
          defaultLocale: "sl-si"
        },
        {
          language: "sr",
          defaultLocale: "sr-cyrl-rs"
        },
        {
          language: "sr-cyrl",
          defaultLocale: "sr-cyrl-rs"
        },
        {
          language: "sr-latn",
          defaultLocale: "sr-latn-rs"
        },
        {
          language: "sv",
          defaultLocale: "sv-se"
        },
        {
          language: "sw",
          defaultLocale: "sw-ke"
        },
        {
          language: "ta",
          defaultLocale: "ta-in"
        },
        {
          language: "te",
          defaultLocale: "te-in"
        },
        {
          language: "th",
          defaultLocale: "th-th"
        },
        {
          language: "tr",
          defaultLocale: "tr-tr"
        },
        {
          language: "uk",
          defaultLocale: "uk-ua"
        },
        {
          language: "ur",
          defaultLocale: "ur-pk"
        },
        {
          language: "vi",
          defaultLocale: "vi-vn"
        },
        {
          language: "zh",
          defaultLocale: "zh-cn"
        },
        {
          language: "zh-hant",
          defaultLocale: "zh-tw"
        },
        {
          language: "zh-cht",
          defaultLocale: "zh-tw"
        },
        {
          language: "zh-hk",
          defaultLocale: "zh-tw"
        },
        {
          language: "zh-mo",
          defaultLocale: "zh-tw"
        }
      ], r = [
        {
          locale: "am-et",
          pesLocale: "am"
        },
        {
          locale: "ar-sa",
          pesLocale: "ar"
        },
        {
          locale: "az-latn-az",
          pesLocale: "az"
        },
        {
          locale: "be-by",
          pesLocale: "be-BY"
        },
        {
          locale: "bg-bg",
          pesLocale: "bg"
        },
        {
          locale: "bn-bd",
          pesLocale: "bn"
        },
        {
          locale: "bn-in",
          pesLocale: "bn"
        },
        {
          locale: "bs-latn-ba",
          pesLocale: "bs-Latn-BA"
        },
        {
          locale: "ca-es",
          pesLocale: "ca"
        },
        {
          locale: "ca-es-valencia",
          pesLocale: "ca"
        },
        {
          locale: "cs-cz",
          pesLocale: "cs"
        },
        {
          locale: "cy-gb",
          pesLocale: "cy-GB"
        },
        {
          locale: "da-dk",
          pesLocale: "da"
        },
        {
          locale: "de-de",
          pesLocale: "de"
        },
        {
          locale: "el-gr",
          pesLocale: "el"
        },
        {
          locale: "en-gb",
          pesLocale: "en"
        },
        {
          locale: "en-us",
          pesLocale: "en"
        },
        {
          locale: "es-es",
          pesLocale: "es"
        },
        {
          locale: "et-ee",
          pesLocale: "et"
        },
        {
          locale: "eu-es",
          pesLocale: "eu"
        },
        {
          locale: "fa-ir",
          pesLocale: "fa"
        },
        {
          locale: "fi-fl",
          pesLocale: "fi"
        },
        {
          locale: "fil-ph",
          pesLocale: "fil_PH"
        },
        {
          locale: "fr-fr",
          pesLocale: "fr"
        },
        {
          locale: "gd-gb",
          pesLocale: "gd-GB"
        },
        {
          locale: "gl-es",
          pesLocale: "gl"
        },
        {
          locale: "gu-in",
          pesLocale: "gu-IN"
        },
        {
          locale: "he-il",
          pesLocale: "he"
        },
        {
          locale: "hi-in",
          pesLocale: "hi"
        },
        {
          locale: "hr-hr",
          pesLocale: "hr"
        },
        {
          locale: "hu-hu",
          pesLocale: "hu"
        },
        {
          locale: "id-id",
          pesLocale: "id"
        },
        {
          locale: "is-is",
          pesLocale: "is"
        },
        {
          locale: "it-it",
          pesLocale: "it"
        },
        {
          locale: "ja-jp",
          pesLocale: "ja"
        },
        {
          locale: "ka-ge",
          pesLocale: "ka-GE"
        },
        {
          locale: "kk-kz",
          pesLocale: "kk"
        },
        {
          locale: "kn-in",
          pesLocale: "kn"
        },
        {
          locale: "ko-kr",
          pesLocale: "ko"
        },
        {
          locale: "ku-arab-iq",
          pesLocale: "ku-Arab-IQ"
        },
        {
          locale: "lb-lu",
          pesLocale: "lb-LU"
        },
        {
          locale: "lt-lt",
          pesLocale: "lt"
        },
        {
          locale: "lv-lv",
          pesLocale: "lv"
        },
        {
          locale: "mk-mk",
          pesLocale: "mk"
        },
        {
          locale: "ml-in",
          pesLocale: "ml"
        },
        {
          locale: "mr-in",
          pesLocale: "mr-IN"
        },
        {
          locale: "ms-my",
          pesLocale: "ms"
        },
        {
          locale: "nb-no",
          pesLocale: "no"
        },
        {
          locale: "nl-nl",
          pesLocale: "nl"
        },
        {
          locale: "nn-no",
          pesLocale: "no"
        },
        {
          locale: "or-in",
          pesLocale: "or-IN"
        },
        {
          locale: "pl-pl",
          pesLocale: "pl"
        },
        {
          locale: "pt-pt",
          pesLocale: "pt-PT"
        },
        {
          locale: "pt-br",
          pesLocale: "pt-BR"
        },
        {
          locale: "ro-ro",
          pesLocale: "ro"
        },
        {
          locale: "ru-ru",
          pesLocale: "ru"
        },
        {
          locale: "sk-sk",
          pesLocale: "sk"
        },
        {
          locale: "sl-sl",
          pesLocale: "sl"
        },
        {
          locale: "sq-al",
          pesLocale: "sq"
        },
        {
          locale: "sr-cyrl-ba",
          pesLocale: "sr"
        },
        {
          locale: "sr-cyrl-rs",
          pesLocale: "sr"
        },
        {
          locale: "sr-latn-rs",
          pesLocale: "sr"
        },
        {
          locale: "sv-se",
          pesLocale: "sv"
        },
        {
          locale: "sw-ke",
          pesLocale: "sw"
        },
        {
          locale: "ta-in",
          pesLocale: "ta"
        },
        {
          locale: "te-in",
          pesLocale: "te"
        },
        {
          locale: "th-th",
          pesLocale: "th"
        },
        {
          locale: "tr-tr",
          pesLocale: "tr"
        },
        {
          locale: "uk-ua",
          pesLocale: "uk"
        },
        {
          locale: "ur-pk",
          pesLocale: "ur-PK"
        },
        {
          locale: "uz-latn-uz",
          pesLocale: "uz"
        },
        {
          locale: "vi-vn",
          pesLocale: "vi"
        },
        {
          locale: "zh-cn",
          pesLocale: "zh_Hans"
        },
        {
          locale: "zh-tw",
          pesLocale: "zh_Hant"
        }
      ];
    e.getPesLocale = function (t) {
      var n, r;
      if (!t)
        return "default";
      n = s(t);
      if (n && n.pesLocale)
        return n.pesLocale;
      r = e.getLocale(t);
      if (r !== t) {
        n = s(r);
        if (n)
          return n.pesLocale;
      }
      return "default";
    };
    e.getLocale = function (t) {
      var n, r = i(t);
      return r ? r.defaultLocale : (n = t.lastIndexOf("-"), n > -1 ? e.getLocale(t.substring(0, n)) : t);
    };
  }
  return new e();
});
