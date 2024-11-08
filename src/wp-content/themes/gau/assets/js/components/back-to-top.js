/******/ (function() { // webpackBootstrap
/*!**********************************************************************!*\
  !*** ./wp-content/themes/gau/resources/js/components/back-to-top.js ***!
  \**********************************************************************/
(function () {
  var smooth_scroll_back_to_top = true;

  // Feature Test
  if ('querySelector' in document && 'addEventListener' in window) {
    var goTopBtn = document.querySelector('.back-to-top');
    var trackScroll = function trackScroll() {
      var scrolled = window.pageYOffset;
      var coords = goTopBtn.getAttribute('data-start-scroll');
      if (scrolled > coords) {
        goTopBtn.classList.add('back-to-top__show');
      }
      if (scrolled < coords) {
        goTopBtn.classList.remove('back-to-top__show');
      }
    };

    // Function to animate the scroll
    var smoothScroll = function smoothScroll(anchor, duration) {
      // Calculate how far and how fast to scroll
      var startLocation = window.pageYOffset;
      var endLocation = document.body.offsetTop;
      var distance = endLocation - startLocation;
      var increments = distance / (duration / 16);
      var stopAnimation;

      // Scroll the page by an increment, and check if it's time to stop
      var animateScroll = function animateScroll() {
        window.scrollBy(0, increments);
        stopAnimation();
      };

      // Stop animation when you reach the anchor OR the top of the page
      stopAnimation = function stopAnimation() {
        var travelled = window.pageYOffset;
        if (travelled <= (endLocation || 0)) {
          clearInterval(runAnimation);
          document.activeElement.blur();
        }
      };

      // Loop the animation function
      var runAnimation = setInterval(animateScroll, 16);
    };
    if (goTopBtn) {
      // Show the button when scrolling down.
      window.addEventListener('scroll', trackScroll);

      // Scroll back to top when clicked.
      goTopBtn.addEventListener('click', function (e) {
        e.preventDefault();
        if (smooth_scroll_back_to_top) {
          smoothScroll(document.body, goTopBtn.getAttribute('data-scroll-speed') || 400);
        } else {
          window.scrollTo(0, 0);
        }
      }, false);
    }
  }
})();
/******/ })()
;
//# sourceMappingURL=back-to-top.js.map