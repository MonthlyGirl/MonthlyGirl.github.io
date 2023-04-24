/* eslint-disable */
(function ($) {
  "use strict";
  function setTabs() {
    const $tabs = $(".tabs");
    if ($tabs.length === 0) return;
    let $navs = $tabs.find(".nav-tabs .tab");
    for (var i = 0; i < $navs.length; i++) {
      let $a = $tabs.find($navs[i].children[0]);
      $a.addClass($a.attr("href"));
      $a.removeAttr("href");
    }
    $(".tabs .nav-tabs").on("click", "a", (e) => {
      e.preventDefault();
      e.stopPropagation();
      let $tab = $(e.target.parentElement.parentElement.parentElement);
      $tab.find(".nav-tabs .active").removeClass("active");
      $tab.find(e.target.parentElement).addClass("active");
      $tab.find(".tab-content .active").removeClass("active");
      $tab.find($(e.target).attr("class")).addClass("active");
      return false;
    });
  }

  $(function () {
    setTabs();
    // $(".article .video-container").fitVids();
    $(".scroll-down").on("click", function () {
      scrolltoElement(".l_body");
    });
    setTimeout(function () {
      $("#loading-bar-wrapper").fadeOut(500);
    }, 300);
  });
})(jQuery);

