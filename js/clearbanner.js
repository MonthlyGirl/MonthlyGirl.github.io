
// 去除banner
var full_page = document.getElementsByClassName("full_page");
if (full_page.length != 0) {
  full_page[0].style.background = "transparent";
}

// 手机侧边栏默认不展开
var mobile_sidebar_menus = document.getElementById("mobile-sidebar-menus");
var menus_item_child = mobile_sidebar_menus.getElementsByClassName(
  "menus_item_child"
);
var menus_expand = mobile_sidebar_menus.getElementsByClassName("menus-expand");
for (var i = 0; i < menus_item_child.length; i++) {
  menus_item_child[i].style.display = "none";
  menus_expand[i].className += " menus-closed";

}


// 浏览器搞笑标题
var OriginTitle = document.title;
var titleTime;
document.addEventListener('visibilitychange', function () {
  if (document.hidden) {
    $('[rel="icon"]').attr('href', "/funny.ico");
    document.title = 'ヽ(●-`Д´-)ノ你要走嘛我好伤心！';
    clearTimeout(titleTime);
  }else {
    $('[rel="icon"]').attr('href', "/favicon.ico");
    document.title = '(Ő∀Ő3)ノ哇喔！欢迎！' + OriginTitle;
    titleTime = setTimeout(function () {
      document.title = OriginTitle;
    }, 2000);
  }
});

// 添加八毛卡通人物
/*右下角添加卡通人物*/
var bamao = `
<i class="fas fa-arrow-up" style ="padding:8px" ></i>
<img style="max-width: 234%;transform: translate(-65px,-65px);" src="https://cdn.jsdelivr.net/gh/fudalijunyi/picture-bed/img/20200629182853.gif" title="回到顶部" data-ll-status="loaded" class="loaded">

`;
/*添加到返回顶部按钮下*/
document.getElementById("go-up").innerHTML = bamao



// 分类卡片折叠
var card_category_list = document.getElementsByClassName(
  "card-category-list child"
);
var item = document.getElementsByClassName("card-category-list-item");
function toggle(t) {
  var display = t.parentElement.nextSibling.style.display;
  if (display == "none") {
    t.parentElement.nextSibling.style.display = "block";
    t.parentElement.nextSibling.style.height = "100%";
    t.className = t.className.replace("fa-chevron-up", "fa-chevron-down");
  } else {
    t.parentElement.nextSibling.style.display = "none";
    t.className = t.className.replace("fa-chevron-down", "fa-chevron-up");
  }
}

for (var i = 0; i < card_category_list.length; i++) {
  card_category_list[i].style.display = "none";
  card_category_list[i].style.transition = "all 1s";
  card_category_list[i].previousSibling.innerHTML +=
    '<i class="fa fa-chevron-up menus-expand  menus-closed" aria-hidden="true" style="margin-left:20px;" onclick="toggle(this)"></i>';
}