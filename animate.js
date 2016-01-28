var animate = (function () {
    var Effect = {
        Linear: function (t, b, c, d) {
            return c * t / d + b;
        }
    };
    return function (curEle, options, duration, effect, callback) {
        var fnEffect = Effect.Linear;
        if (typeof effect === "number") {
            var ary = ["Linear"];
            for (var i = 0; i < ary.length; i++) {
                if (effect === (i + 1)) {
                    var curItem = ary[i].split("-");
                    var curItemFir = curItem[0];
                    var curItemTwo = curItem[1];
                    fnEffect = curItem.length === 1 ? Effect[curItemFir] : Effect[curItemFir][curItemTwo];
                    break;
                }
            }
        } else if (effect instanceof Array) {
            var effectFir = effect[0];
            var effectTwo = effect[1];
            fnEffect = effect.length === 1 ? Effect[effectFir] : Effect[effectFir][effectTwo];
        } else if (typeof effect === "function") {
            callback = effect;
        }
        var times = 0, interval = 15, oBegin = {}, oChange = {};
        for (var key in options) {
            if (options.hasOwnProperty(key)) {

                oBegin[key] = utils.getCss(curEle, key);
                oChange[key] = options[key] - oBegin[key];
            }
        }
        var move = function () {
            window.clearTimeout(curEle.timer);
            times += interval;
            if (times >= duration) {
                for (var key in options) {
                    if (options.hasOwnProperty(key)) {
                       utils. setCss(curEle, key, options[key]);
                    }
                }
                typeof callback === "function" ? callback.call(curEle) : null;
                return;
            }
            for (var attr in oChange) {
                if (oChange.hasOwnProperty(attr)) {
                    var curVal = fnEffect(times, oBegin[attr], oChange[attr], duration);
                   utils. setCss(curEle, attr, curVal);
                }
            }
            curEle.timer = window.setTimeout(move, interval);
        };
        move();
    }
})();