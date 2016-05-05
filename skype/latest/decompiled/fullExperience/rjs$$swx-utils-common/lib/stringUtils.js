function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-utils-common/lib/stringUtils", [
      "require",
      "exports",
      "lodash-compat"
    ], e);
}(function (e, t) {
  function o(e, t) {
    if (!e)
      return !1;
    var r = new RegExp("\\b" + n.escapeRegExp(t), "i");
    return a(e).search(r) !== -1;
  }
  function u(e) {
    return e.replace(/[\W]+|[\s]+/gi, " ").trim();
  }
  function a(e) {
    var t = parseInt("0xD800"), r = parseInt("0xDBFF"), i = 0, o = "", u = "", a;
    if (!e)
      return e;
    while (i < e.length) {
      o += e.charAt(i), a = e.charCodeAt(i);
      if (a < t || a > r)
        u += n.has(s, o) ? s[o] : o, o = "";
      i++;
    }
    return u;
  }
  function f(e, t, n, r) {
    return typeof r == "undefined" && (r = n), e.substr(0, n) + t + e.substr(r, e.length);
  }
  function l(e) {
    return e === "";
  }
  function c(e) {
    return n.isString(e) && e.length > 0;
  }
  function h(e) {
    return e === "\r";
  }
  function p(e) {
    return e === "\n";
  }
  function d(e) {
    return e === " ";
  }
  function v(e, t) {
    var n = this.wordBoundariesAt(e, t);
    return n.start === -1 ? "" : e.substring(n.start, n.end);
  }
  function m(e, t) {
    if (t > e.length)
      return {
        start: -1,
        end: -1
      };
    if (t === e.length) {
      if (e.search(/\s$/) !== -1)
        return {
          start: -1,
          end: -1
        };
      t--;
    }
    var n = e.substring(0, t).search(/\S+$/), r = e.substring(t).search(/\s/);
    return n === -1 && (n = t), r === -1 ? r = e.length : r += t, {
      start: n,
      end: r
    };
  }
  function g(e) {
    return r + e + i;
  }
  var n = e("lodash-compat"), r = "\u202A", i = "\u202C", s = {
      "ª": "a",
      "º": "o",
      "À": "A",
      "Á": "A",
      "Â": "A",
      "Ã": "A",
      "Ä": "A",
      "Å": "A",
      "Ç": "C",
      "È": "E",
      "É": "E",
      "Ê": "E",
      "Ë": "E",
      "Ì": "I",
      "Í": "I",
      "Î": "I",
      "Ï": "I",
      "Ñ": "N",
      "Ò": "O",
      "Ó": "O",
      "Ô": "O",
      "Õ": "O",
      "Ö": "O",
      "Ù": "U",
      "Ú": "U",
      "Û": "U",
      "Ü": "U",
      "Ý": "Y",
      "à": "a",
      "á": "a",
      "â": "a",
      "ã": "a",
      "ä": "a",
      "å": "a",
      "ç": "c",
      "è": "e",
      "é": "e",
      "ê": "e",
      "ë": "e",
      "ì": "i",
      "í": "i",
      "î": "i",
      "ï": "i",
      "ñ": "n",
      "ò": "o",
      "ó": "o",
      "ô": "o",
      "õ": "o",
      "ö": "o",
      "ù": "u",
      "ú": "u",
      "û": "u",
      "ü": "u",
      "ý": "y",
      "ÿ": "y",
      "Ā": "A",
      "ā": "a",
      "Ă": "A",
      "ă": "a",
      "Ą": "A",
      "ą": "a",
      "Ć": "C",
      "ć": "c",
      "Ĉ": "C",
      "ĉ": "c",
      "Ċ": "C",
      "ċ": "c",
      "Č": "C",
      "č": "c",
      "Ď": "D",
      "ď": "d",
      "Ē": "E",
      "ē": "e",
      "Ĕ": "E",
      "ĕ": "e",
      "Ė": "E",
      "ė": "e",
      "Ę": "E",
      "ę": "e",
      "Ě": "E",
      "ě": "e",
      "Ĝ": "G",
      "ĝ": "g",
      "Ğ": "G",
      "ğ": "g",
      "Ġ": "G",
      "ġ": "g",
      "Ģ": "G",
      "ģ": "g",
      "Ĥ": "H",
      "ĥ": "h",
      "Ĩ": "I",
      "ĩ": "i",
      "Ī": "I",
      "ī": "i",
      "Ĭ": "I",
      "ĭ": "i",
      "Į": "I",
      "į": "i",
      "İ": "I",
      "Ĳ": "IJ",
      "ĳ": "ij",
      "Ĵ": "J",
      "ĵ": "j",
      "Ķ": "K",
      "ķ": "k",
      "Ĺ": "L",
      "ĺ": "l",
      "Ļ": "L",
      "ļ": "l",
      "Ľ": "L",
      "ľ": "l",
      "Ŀ": "L\xB7",
      "ŀ": "l\xB7",
      "Ń": "N",
      "ń": "n",
      "Ņ": "N",
      "ņ": "n",
      "Ň": "N",
      "ň": "n",
      "ŉ": "ʼn",
      "Ō": "O",
      "ō": "o",
      "Ŏ": "O",
      "ŏ": "o",
      "Ő": "O",
      "ő": "o",
      "Ŕ": "R",
      "ŕ": "r",
      "Ŗ": "R",
      "ŗ": "r",
      "Ř": "R",
      "ř": "r",
      "Ś": "S",
      "ś": "s",
      "Ŝ": "S",
      "ŝ": "s",
      "Ş": "S",
      "ş": "s",
      "Š": "S",
      "š": "s",
      "Ţ": "T",
      "ţ": "t",
      "Ť": "T",
      "ť": "t",
      "Ũ": "U",
      "ũ": "u",
      "Ū": "U",
      "ū": "u",
      "Ŭ": "U",
      "ŭ": "u",
      "Ů": "U",
      "ů": "u",
      "Ű": "U",
      "ű": "u",
      "Ų": "U",
      "ų": "u",
      "Ŵ": "W",
      "ŵ": "w",
      "Ŷ": "Y",
      "ŷ": "y",
      "Ÿ": "Y",
      "Ź": "Z",
      "ź": "z",
      "Ż": "Z",
      "ż": "z",
      "Ž": "Z",
      "ž": "z",
      "ſ": "s",
      "Ơ": "O",
      "ơ": "o",
      "Ư": "U",
      "ư": "u",
      "Ǆ": "DZ",
      "ǅ": "Dz",
      "ǆ": "dz",
      "Ǉ": "LJ",
      "ǈ": "Lj",
      "ǉ": "lj",
      "Ǌ": "NJ",
      "ǋ": "Nj",
      "ǌ": "nj",
      "Ǎ": "A",
      "ǎ": "a",
      "Ǐ": "I",
      "ǐ": "i",
      "Ǒ": "O",
      "ǒ": "o",
      "Ǔ": "U",
      "ǔ": "u",
      "Ǖ": "U",
      "ǖ": "u",
      "Ǘ": "U",
      "ǘ": "u",
      "Ǚ": "U",
      "ǚ": "u",
      "Ǜ": "U",
      "ǜ": "u",
      "Ǟ": "A",
      "ǟ": "a",
      "Ǡ": "A",
      "ǡ": "a",
      "Ǧ": "G",
      "ǧ": "g",
      "Ǩ": "K",
      "ǩ": "k",
      "Ǫ": "O",
      "ǫ": "o",
      "Ǭ": "O",
      "ǭ": "o",
      "ǰ": "j",
      "Ǳ": "DZ",
      "ǲ": "Dz",
      "ǳ": "dz",
      "Ǵ": "G",
      "ǵ": "g",
      "Ǹ": "N",
      "ǹ": "n",
      "Ǻ": "A",
      "ǻ": "a",
      "Ȁ": "A",
      "ȁ": "a",
      "Ȃ": "A",
      "ȃ": "a",
      "Ȅ": "E",
      "ȅ": "e",
      "Ȇ": "E",
      "ȇ": "e",
      "Ȉ": "I",
      "ȉ": "i",
      "Ȋ": "I",
      "ȋ": "i",
      "Ȍ": "O",
      "ȍ": "o",
      "Ȏ": "O",
      "ȏ": "o",
      "Ȑ": "R",
      "ȑ": "r",
      "Ȓ": "R",
      "ȓ": "r",
      "Ȕ": "U",
      "ȕ": "u",
      "Ȗ": "U",
      "ȗ": "u",
      "Ș": "S",
      "ș": "s",
      "Ț": "T",
      "ț": "t",
      "Ȟ": "H",
      "ȟ": "h",
      "Ȧ": "A",
      "ȧ": "a",
      "Ȩ": "E",
      "ȩ": "e",
      "Ȫ": "O",
      "ȫ": "o",
      "Ȭ": "O",
      "ȭ": "o",
      "Ȯ": "O",
      "ȯ": "o",
      "Ȱ": "O",
      "ȱ": "o",
      "Ȳ": "Y",
      "ȳ": "y",
      "ʰ": "h",
      "ʲ": "j",
      "ʳ": "r",
      "ʷ": "w",
      "ʸ": "y",
      "ˡ": "l",
      "ˢ": "s",
      "ˣ": "x"
    };
  t.anyWordStartsWith = o, t.clean = u, t.normalize = a, t.inject = f, t.isEmpty = l, t.isNotEmpty = c, t.isCarriageReturn = h, t.isNewLine = p, t.isWhiteSpace = d, t.wordAt = v, t.wordBoundariesAt = m, t.forceLTREmbedding = g;
})
