!function(t){"use strict";t((function(){!function(){const e=t(".tabs");if(0===e.length)return;let a=e.find(".nav-tabs .tab");for(var n=0;n<a.length;n++){let t=e.find(a[n].children[0]);t.addClass(t.attr("href")),t.removeAttr("href")}t(".tabs .nav-tabs").on("click","a",(e=>{e.preventDefault(),e.stopPropagation();let a=t(e.target.parentElement.parentElement.parentElement);return a.find(".nav-tabs .active").removeClass("active"),a.find(e.target.parentElement).addClass("active"),a.find(".tab-content .active").removeClass("active"),a.find(t(e.target).attr("class")).addClass("active"),!1}))}(),t(".scroll-down").on("click",(function(){scrolltoElement(".l_body")})),setTimeout((function(){t("#loading-bar-wrapper").fadeOut(500)}),300)}))}(jQuery);