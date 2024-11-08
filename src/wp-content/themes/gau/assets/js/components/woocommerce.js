/******/ (function() { // webpackBootstrap
/*!**********************************************************************!*\
  !*** ./wp-content/themes/gau/resources/js/components/woocommerce.js ***!
  \**********************************************************************/
jQuery(function ($) {
  var wpg__image = $('.wpg__image');
  wpg__image.find('a').on('click', function (e) {
    e.preventDefault();
    $(this).next('.image-popup').trigger('click');
  });
  var wpg__thumb = $('.wpg__thumb');
  wpg__thumb.find('a').on('click', function (e) {
    e.preventDefault();
  });
});
/******/ })()
;
//# sourceMappingURL=woocommerce.js.map