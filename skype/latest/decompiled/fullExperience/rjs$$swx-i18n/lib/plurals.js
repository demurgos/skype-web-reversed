function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-i18n/lib/plurals", [
      "require",
      "exports"
    ], e);
}(function (e, t) {
  function a(e, t) {
    t || (t = u);
    var s, a = null, f = "";
    for (s in o)
      o[s].languages.indexOf(t) !== -1 && (a = s);
    switch (a) {
    case "group0":
      f = e === 1 ? n : r;
      break;
    case "group1":
      f = e === 1 ? n : i;
      break;
    case "group2":
      f = e > 1 ? i : n;
      break;
    case "group3":
      f = e % 10 === 1 && e % 100 !== 11 ? n : e === 0 ? r : i;
      break;
    case "group4":
      f = e === 1 || e === 11 ? n : e === 2 || e === 12 ? r : i;
      break;
    case "group5":
      f = e === 1 ? n : e === 0 || e % 100 > 0 && e % 100 < 20 ? r : i;
      break;
    case "group6":
      f = e % 10 === 1 && e % 100 !== 11 ? n : e % 10 >= 2 && (e % 100 < 10 || e % 100 >= 20) ? i : r;
      break;
    case "group7":
      f = e % 10 === 1 && e % 100 !== 11 ? n : e % 10 >= 2 && e % 10 <= 4 && (e % 100 < 10 || e % 100 >= 20) ? r : i;
      break;
    case "group8":
      f = e === 1 ? n : e >= 2 && e <= 4 ? r : i;
      break;
    case "group9":
      f = e === 1 ? n : e % 10 >= 2 && e % 10 <= 4 && (e % 100 < 10 || e % 100 >= 20) ? r : i;
      break;
    case "group11":
      f = e === 1 ? n : e >= 2 && e <= 10 ? r : i;
      break;
    case "group12":
      f = e === 1 ? n : e === 2 ? r : i;
      break;
    default:
      f = "";
    }
    return f;
  }
  function f(e) {
    u = e;
  }
  var n = "", r = "_few", i = "_many", s = {
      af: "af",
      am: "am",
      ar: "ar",
      as: "as",
      az: "az",
      be: "be",
      bg: "bg",
      bn: "bn",
      bs: "bs",
      chr: "chr",
      ca: "ca",
      cs: "cs",
      cy: "cy",
      da: "da",
      de: "de",
      el: "el",
      en: "en",
      es: "es",
      et: "et",
      eu: "eu",
      fa: "fa",
      fi: "fi",
      fil: "fil",
      fr: "fr",
      ga: "ga",
      gd: "gd",
      gl: "gl",
      gu: "gu",
      ha: "ha",
      he: "he",
      hi: "hi",
      hr: "hr",
      hu: "hu",
      hy: "hy",
      id: "id",
      ig: "ig",
      is: "is",
      it: "it",
      iw: "iw",
      ja: "ja",
      ka: "ka",
      kk: "kk",
      km: "km",
      kn: "kn",
      ko: "ko",
      kok: "kok",
      ku: "ku",
      ky: "ky",
      lb: "lb",
      lt: "lt",
      lv: "lv",
      mi: "mi",
      ml: "ml",
      mn: "mn",
      mr: "mr",
      ms: "ms",
      ne: "ne",
      nl: "nl",
      nn: "nn",
      nb: "nb",
      no: "no",
      nso: "nso",
      or: "or",
      pa: "pa",
      pl: "pl",
      prs: "prs",
      pt_br: "pt-br",
      pt_pt: "pt-pt",
      qps: "qps",
      qut: "qut",
      quz: "quz",
      ro: "ro",
      ru: "ru",
      rw: "rw",
      sd: "sd",
      si: "si",
      sl: "sl",
      sk: "sk",
      sq: "sq",
      sr: "sr",
      sv: "sv",
      sw: "sw",
      ta: "ta",
      te: "te",
      tg: "tg",
      th: "th",
      ti: "ti",
      tk: "tk",
      tn: "tn",
      tr_tr: "tr-tr",
      tt: "tt",
      ug: "ug",
      uk: "uk",
      ur: "ur",
      uz: "uz",
      vi: "vi",
      wo: "wo",
      xh: "xh",
      yo: "yo",
      zh: "zh",
      zu: "zu"
    }, o = {
      group0: {
        languages: [
          s.ja,
          s.id,
          s.ko,
          s.tr_tr,
          s.vi,
          s.zh,
          s.az,
          s.ig,
          s.fa,
          s.ka,
          s.km,
          s.kn,
          s.ms,
          s.prs,
          s.th,
          s.tt,
          s.ug,
          s.wo,
          s.yo
        ]
      },
      group1: {
        languages: [
          s.bg,
          s.ca,
          s.cy,
          s.da,
          s.de,
          s.el,
          s.en,
          s.es,
          s.et,
          s.fi,
          s.he,
          s.hu,
          s.it,
          s.iw,
          s.nb,
          s.nl,
          s.no,
          s.pt_pt,
          s.qps,
          s.sv,
          s.af,
          s.as,
          s.bn,
          s.chr,
          s.eu,
          s.gl,
          s.gu,
          s.ha,
          s.hy,
          s.is,
          s.kk,
          s.kok,
          s.ku,
          s.ky,
          s.lb,
          s.mi,
          s.ml,
          s.mn,
          s.mr,
          s.ne,
          s.nn,
          s.or,
          s.pa,
          s.qut,
          s.quz,
          s.rw,
          s.sd,
          s.si,
          s.sq,
          s.sw,
          s.ta,
          s.te,
          s.tk,
          s.tn,
          s.ur,
          s.xh,
          s.zu
        ]
      },
      group2: {
        languages: [
          s.fr,
          s.pt_br,
          s.am,
          s.fil,
          s.hi,
          s.nso,
          s.tg,
          s.ti,
          s.uz
        ]
      },
      group3: { languages: [s.lv] },
      group4: { languages: [s.gd] },
      group5: { languages: [s.ro] },
      group6: { languages: [s.lt] },
      group7: {
        languages: [
          s.ru,
          s.uk,
          s.hr,
          s.sr,
          s.be,
          s.bs,
          s.sl
        ]
      },
      group8: {
        languages: [
          s.cs,
          s.sk
        ]
      },
      group9: { languages: [s.pl] },
      group11: { languages: [s.ga] },
      group12: { languages: [s.ar] }
    };
  t.pluralizationLocale = s;
  var u = s.en;
  t.getPluralSuffix = a, t.setLocale = f;
})
