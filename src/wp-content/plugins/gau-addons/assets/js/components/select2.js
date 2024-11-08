/******/ (function() { // webpackBootstrap
/*!***************************************************************!*\
  !*** ./wp-content/plugins/gau-addons/resources/js/select2.js ***!
  \***************************************************************/
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
jQuery(function ($) {
  // select2 multiple
  var select2_multiple = $('.select2-multiple');
  $.each(select2_multiple, function (i, el) {
    $(el).select2({
      multiple: true,
      allowClear: true,
      width: 'resolve',
      dropdownAutoWidth: true,
      placeholder: $(el).attr('placeholder')
    });
  });

  // select2 tags
  var select2_tags = $('.select2-tags');
  $.each(select2_tags, function (i, el) {
    $(el).select2({
      multiple: true,
      tags: true,
      allowClear: true,
      width: 'resolve',
      dropdownAutoWidth: true,
      placeholder: $(el).attr('placeholder')
    });
  });

  // select2 IPs
  var select2_ips = $('.select2-ips');
  $.each(select2_ips, function (i, el) {
    $(el).select2({
      multiple: true,
      tags: true,
      allowClear: true,
      width: 'resolve',
      dropdownAutoWidth: true,
      placeholder: $(el).attr('placeholder'),
      createTag: function createTag(params) {
        var term = $.trim(params.term);

        // Validate the term as an IP address or range
        if (isValidIPRange(term)) {
          return {
            id: term,
            text: term
          };
        } else {
          return null;
        }
      }
    });
  });

  // select2 emails
  var select2_emails = $('.select2-emails');
  $.each(select2_emails, function (i, el) {
    $(el).select2({
      multiple: true,
      tags: true,
      allowClear: true,
      width: 'resolve',
      dropdownAutoWidth: true,
      placeholder: $(el).attr('placeholder'),
      createTag: function createTag(params) {
        var term = $.trim(params.term);
        if (isValidEmail(term)) {
          return {
            id: term,
            text: term
          };
        } else {
          return null;
        }
      }
    });
  });
});

/**
 * Validate email address
 *
 * @param {string} email
 * @returns {boolean}
 */
function isValidEmail(email) {
  var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
}

/**
 * validate IP range (IPv4)
 *
 * @param range
 * @returns {boolean}
 */
function isValidIPRange(range) {
  var ipPattern = /^(25[0-5]|2[0-4]\d|1\d{2}|\d{1,2})\.(25[0-5]|2[0-4]\d|1\d{2}|\d{1,2})\.(25[0-5]|2[0-4]\d|1\d{2}|\d{1,2})\.(25[0-5]|2[0-4]\d|1\d{2}|\d{1,2})$/;
  var rangePattern = /^(25[0-5]|2[0-4]\d|1\d{2}|\d{1,2})\.(25[0-5]|2[0-4]\d|1\d{2}|\d{1,2})\.(25[0-5]|2[0-4]\d|1\d{2}|\d{1,2})\.(25[0-5]|2[0-4]\d|1\d{2}|\d{1,2})-(\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])$/;
  var cidrPattern = /^(25[0-5]|2[0-4]\d|1\d{2}|\d{1,2})\.(25[0-5]|2[0-4]\d|1\d{2}|\d{1,2})\.(25[0-5]|2[0-4]\d|1\d{2}|\d{1,2})\.(25[0-5]|2[0-4]\d|1\d{2}|\d{1,2})\/(\d|[1-2]\d|3[0-2])$/;
  if (ipPattern.test(range)) {
    return true;
  }
  if (rangePattern.test(range)) {
    var _range$split = range.split('-'),
      _range$split2 = _slicedToArray(_range$split, 2),
      startIP = _range$split2[0],
      endRange = _range$split2[1];
    var endIP = startIP.split('.').slice(0, 3).join('.') + '.' + endRange;
    return compareIPs(startIP, endIP) < 0;
  }
  return cidrPattern.test(range);
}

/**
 * compare two IP addresses
 *
 * @param ip1
 * @param ip2
 * @returns {number}
 */
function compareIPs(ip1, ip2) {
  var ip1Parts = ip1.split('.').map(Number);
  var ip2Parts = ip2.split('.').map(Number);
  for (var i = 0; i < 4; i++) {
    if (ip1Parts[i] < ip2Parts[i]) return -1;
    if (ip1Parts[i] > ip2Parts[i]) return 1;
  }
  return 0;
}
/******/ })()
;
//# sourceMappingURL=select2.js.map