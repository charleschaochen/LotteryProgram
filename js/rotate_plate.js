$(function () {
    // 在异步请求期间旋转转盘，持续10s，转5圈
    // 如果这段时间内请求成功返回，会取消旋转，如果超时，回调会执行，提示网络超时
    var fRotateDuringReq = function () {
        $("#lotteryPlate").rotate({
            angle: 0,
            duration: 10000,
            animateTo: -1800,
            callback: function () {
                alert('网络似乎不给力哦')
            }
        });
    }

    /**
     * 开始抽奖
     * @param awards 预设的抽奖结果
     * @param angle 抽奖结果图片所对应的角度
     * @param text 抽奖结果提示文案
     */
    var fStartLottery = function (angle, text) {
        $('#lotteryPlate').stopRotate();  // 停止之前的旋转
        $("#lotteryPlate").rotate({
            angle: 0,
            duration: 5000,
            animateTo: angle - 1440, // 1440表示4圈，转4圈之后转到抽奖结果的角度
            callback: function () {
                alert(text);    // 提示文案
            }
        });
    };

// 奖品池，仙丹是阳光普照奖
    var awards = [{name: "仙丹", angle: [0, -51, -103, -180]}, {name: "鹅卵石", angle: -26}, {
        name: "经书",
        angle: -77
    }, {name: "仙草", angle: -129}, {name: "令牌", angle: -154}, {name: "黄钻", angle: -206}, {
        name: "暗器",
        angle: -231
    }, {name: "珍珠", angle: -283}, {name: "鱼雷", angle: -334}];

    /**
     * 抽奖按钮点击事件
     */
    $("#lotteryBtn").click(function () {
        fRotateDuringReq(); // 请求期间的旋转
        var probability = 1; // 模拟请求返回的中奖概率
        var data = [];
        if (probability <= 0) {
            // 如果没有中奖概率，抽奖盒子中只放入未中奖（或阳光普照奖）的种子值
            data.push(0);
        } else {
            // 如果有中奖概率，放入相应概率的中奖类型与不中奖的种子值
            for (var i = 1; i < awards.length; i++) {
                data.push(i);
            }
            var awardCount = awards.length - 1; // 减掉第一个阳光普照奖
            var total = Math.ceil(awardCount / parseFloat(probability));
            for (var i = 0; i < total - awardCount; i++) data.push(0);
        }
        console.log("Lottery seeds: " + data);

        var seedIndex = data[Math.floor(Math.random() * data.length)];   // 随机抽取种子

        var angle = awards[seedIndex].angle;
        if (typeof angle != "number") {
            // 角度是数组，说明转盘上有多个该奖品，随机取一个
            angle = angle[Math.floor(Math.random() * angle.length)];
        }
        fStartLottery(angle, "恭喜您抽中" + awards[seedIndex].name);
    });

})