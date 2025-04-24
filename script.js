let hasSelectedDate = false;  // 记录用户是否选择过日期
let startDate;
let timeInterval;  // 定义一个变量保存定时器
let hasPaid = false;  // 新增变量判断是否已付款

document.addEventListener("DOMContentLoaded", function () {
    const today = new Date().toISOString().split("T")[0];  // 获取当前日期，格式为 'YYYY-MM-DD'
    document.getElementById("startDateInput").setAttribute("max", today);  // 设置日期选择框的最大值

    // 禁用"我已付款"按钮
    const confirmPaymentBtn = document.getElementById("confirmPaymentBtn");
    confirmPaymentBtn.disabled = true;  // 禁用按钮

    // 10秒后启用"我已付款"按钮
    setTimeout(function () {
        confirmPaymentBtn.disabled = false;  // 启用按钮
    }, 20000);  // 10秒后启用
});

// 用户确认选择日期按钮
document.getElementById("confirmBtn").addEventListener("click", function () {
    const input = document.getElementById("startDateInput").value;
    if (input) {
        startDate = new Date(input);
        if (!isNaN(startDate)) {
            document.getElementById("dateInputBox").style.display = "none";
            document.querySelector(".heart").style.display = "block";
            timeInterval = setInterval(getTimeElapsed, 1000);  // 保存定时器引用

            // 5秒后显示重新选择按钮
            setTimeout(function () {
                document.getElementById("reselectBtn").style.display = "block";
            }, 5000);

            // 第一次选择日期，标记为已选择
            if (!hasSelectedDate) {
                hasSelectedDate = true;  // 标记第一次选择
            }
        } else {
            alert("请输入有效的日期！");
        }
    } else {
        alert("请输入起始日期！");
    }
});

// 获取时间差并显示
function getTimeElapsed() {
    var currentDate = new Date();
    var timeDiff = currentDate - startDate;

    var milliseconds = timeDiff % 1000;
    timeDiff = Math.floor(timeDiff / 1000);
    var seconds = timeDiff % 60;
    timeDiff = Math.floor(timeDiff / 60);
    var minutes = timeDiff % 60;
    timeDiff = Math.floor(timeDiff / 60);
    var hours = timeDiff % 24;
    timeDiff = Math.floor(timeDiff / 24);
    var days = timeDiff;

    var timeString = "已经在一起" + days + " 天 " + hours + " 小时 " + minutes + " 分钟 " + seconds + " 秒啦～";
    document.getElementById("timeElapsed").textContent = timeString;
}

// 创建雪花效果
function createSnowflake() {
    const snowflake = document.createElement('div');
    snowflake.classList.add('snowflake');
    snowflake.style.left = Math.random() * window.innerWidth + 'px';
    snowflake.style.animationDuration = Math.random() * 3 + 2 + 's';
    snowflake.style.opacity = Math.random();
    snowflake.style.fontSize = Math.random() * 10 + 10 + 'px';
    snowflake.style.backgroundColor = getRandomColor();
    snowflake.innerHTML = '❤我爱你❤️';
    return snowflake;
}

// 随机颜色
function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

// 雪花下落效果
function snowfall() {
    const snowContainer = document.getElementById('snow-container');
    const numSnowflakes = 50;
    for (let i = 0; i < numSnowflakes; i++) {
        const snowflake = createSnowflake();
        snowContainer.appendChild(snowflake);
    }
}

snowfall();

// 创建樱花下落效果
function createSakura() {
    const sakura = document.createElement("div");
    sakura.className = "sakura";
    sakura.style.left = Math.random() * 100 + "vw";
    sakura.style.animationDelay = Math.random() * 5 + "s";
    document.body.appendChild(sakura);
    setTimeout(() => sakura.remove(), 10000);
}

setInterval(createSakura, 200);

// 重新选择日期按钮的逻辑
document.getElementById("reselectBtn").addEventListener("click", function () {
    if (hasSelectedDate && !hasPaid) {
        // 如果已经选择过日期，且未付款，显示收款二维码和价格
        document.getElementById("paymentModal").style.display = "flex";  // 显示收款弹窗
    } else {
        // 如果没有选择过日期，直接显示日期输入框
        document.getElementById("dateInputBox").style.display = "block";
        document.querySelector(".heart").style.display = "none";
        document.getElementById("timeElapsed").textContent = '';  // 清除时间显示
        document.getElementById("reselectBtn").style.display = "none";

        // 清除定时器，停止时间显示
        clearInterval(timeInterval);
        timeInterval = null;
    }
});

// 用户确认付款后的操作
document.getElementById("confirmPaymentBtn").addEventListener("click", function () {
    // 付款成功后，标记已付款
    hasPaid = true;
    alert("支付成功！现在您可以重新选择日期。");

    // 关闭支付弹窗
    document.getElementById("paymentModal").style.display = "none";

    // 显示日期输入框
    document.getElementById("dateInputBox").style.display = "block";
    document.querySelector(".heart").style.display = "none";
    document.getElementById("timeElapsed").textContent = '';  // 清除时间显示
    document.getElementById("reselectBtn").style.display = "none";

    // 清除定时器，停止时间显示
    clearInterval(timeInterval);
    timeInterval = null;
});

// 关闭收款二维码弹窗
document.getElementById("closePaymentModal").addEventListener("click", function () {
    document.getElementById("paymentModal").style.display = "none";
});