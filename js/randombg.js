//随机背景图片数组,图片可以换成图床链接，注意最后一条后面不要有逗号
var backimg = [
  "https://s3.ax1x.com/2021/01/18/s6SxtU.jpg",
  "https://s3.ax1x.com/2020/12/18/rtACIe.png",
  "https://s3.ax1x.com/2021/01/18/s6SxtU.jpg"
];
//获取背景图片总数，生成随机数
var bgindex = Math.ceil(Math.random() * (backimg.length - 1));
//重设背景图片
document.getElementById("web_bg").style.backgroundImage = backimg[bgindex];
//随机banner数组,图片可以换成图床链接，注意最后一条后面不要有逗号
var bannerimg = [
  "https://s3.ax1x.com/2021/01/18/s6SxtU.jpg",
  "https://s3.ax1x.com/2020/12/18/rtACIe.png",
  "https://s3.ax1x.com/2021/01/18/s6SxtU.jpg"
];
//获取banner图片总数，生成随机数
var bannerindex = Math.ceil(Math.random() * (bannerimg.length - 1));
//重设banner图片
document.getElementById("page-header").style.backgroundImage = bannerimg[bannerindex];