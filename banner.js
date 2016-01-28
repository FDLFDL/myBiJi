var dataAry = ["img/771x245(1).jpg", "img/771x245(2).jpg", "img/771x245(3).jpg", "img/771x245(4).jpg", "img/771x245(5).jpg ", "img/771x245.jpg","img/771x245_1.jpg"];

var banner = document.getElementById("banner"),
    bannerImg = document.getElementById("bannerImg"),
    Tip = document.getElementById("bannerTip");

var divList = bannerImg.getElementsByTagName("div"),
    TipList = Tip.getElementsByTagName("a");
var bannerW = banner.clientWidth, totalW = (dataAry.length + 2) * bannerW,
    count = dataAry.length + 2;
utils.setGroupCss(bannerImg, {width: totalW, left: -bannerW});
var initData = function () {
    var str = "";
    str += "<div trueImg='" + dataAry[dataAry.length - 1] + "'></div>";
    for (var i = 0; i < dataAry.length; i++) {
        str += "<div trueImg='" + dataAry[i] + "'></div>";
    }
    str += "<div trueImg='" + dataAry[0] + "'></div>";
    bannerImg.innerHTML = str;
    str = "";
    for (i = 0; i < dataAry.length; i++) {
        var cName = i === 0 ? "select" : "";
        str += "<a class='" + cName + "'>"+(i+1)+"</a>";
    }
    Tip.innerHTML = str;
};
initData();
var initImg = function () {
    for (var i = 0; i < divList.length; i++) {
        ~function (i) {
            var curDiv = divList[i];
            if (!curDiv.isLoad) {
                var oImg = new Image;
                oImg.src = curDiv.getAttribute("trueImg");
                oImg.onload = function () {
                    curDiv.appendChild(oImg);
                    curDiv.isLoad = true;
                };
            }
        }(i);
    }
};
window.setTimeout(initImg, 500);
var setTip = function (index) {
    index < 0 ? index = TipList.length - 1 : null;
    index >= TipList.length ? index = 0 : null;
    for (var i = 0; i < TipList.length; i++) {
        TipList[i].className = i === index ? "select" : null;
    }
};
var step = 1;
var move = function (dir) {
    if (typeof dir === "undefined" || dir === "right") {
        step++;
        if (step >= count) {
            utils.setCss(bannerImg, "left", -1 * bannerW);
            step = 2;
        }
    } else if (dir === "left") {
        step--;
        if (step < 0) {
            utils.setCss(bannerImg, "left", -(count - 2) * bannerW);
            step = dataAry.length - 1;
        }
    } else if (dir === "tip") {
        step = this.index + 1;
    }
    animate(bannerImg, {left: -step * bannerW}, 500, 1);
    setTip(step - 1);
};
bannerImg.autoTimer = window.setInterval(move, 3000);
banner.onmouseenter = function () {
    window.clearInterval(bannerImg.autoTimer);

};
banner.onmouseleave = function () {
    bannerImg.autoTimer = window.setInterval(move, 3000);

};




for (var i = 0; i < TipList.length; i++) {
    TipList[i].index = i;
    TipList[i].onmouseover = function () {
        move.call(this, "tip");
    };
}