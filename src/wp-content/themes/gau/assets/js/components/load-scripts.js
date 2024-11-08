/******/ (function() { // webpackBootstrap
/*!***********************************************************************!*\
  !*** ./wp-content/themes/gau/resources/js/components/load-scripts.js ***!
  \***********************************************************************/
(function () {
  var timeout = 4000;
  var loadScriptsTimer = setTimeout(loadScripts, timeout);
  var userInteractionEvents = ['mouseover', 'keydown', 'touchstart', 'touchmove', 'wheel'];
  userInteractionEvents.forEach(function (event) {
    window.addEventListener(event, triggerScriptLoader, {
      once: true,
      passive: true
    });
  });
  function triggerScriptLoader() {
    loadScripts();
    clearTimeout(loadScriptsTimer);
  }
  function loadScripts() {
    document.querySelectorAll("script[data-type='lazy']").forEach(function (elem) {
      elem.setAttribute('src', elem.getAttribute('data-src'));
      elem.removeAttribute('data-src');
      elem.removeAttribute('data-type');
    });
  }
})();
/******/ })()
;
//# sourceMappingURL=load-scripts.js.map