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
        var awardIds = ['0', '1', '2', '3', '4', '5', '6', '7', '8'];
        // 随机抽取一个奖品，模拟服务端计算出的用户抽奖结果
        var awardKey = awardIds[Math.floor(Math.random()*(awardIds.length))];
        var award = awards[awardKey];
        console.log("Server return award: " + award.name);

        var angle = award.angle;
        if (typeof angle != "number") {
            // 角度是数组，说明转盘上有多个该奖品，随机取一个
            angle = angle[Math.floor(Math.random() * (angle.length))];
        }
        fStartLottery(angle, "恭喜您抽中" + award.name);
    });

})