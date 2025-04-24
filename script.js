document.addEventListener("DOMContentLoaded", function () {
    const today = new Date().toISOString().split("T")[0];  // 获取当前日期，格式为 'YYYY-MM-DD'
    document.getElementById("startDateInput").setAttribute("max", today);  // 设置日期选择框的最大值
});

let startDate;
let timeInterval;  // 定义一个变量保存定时器

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
        } else {
            alert("请输入有效的日期！");
        }
    } else {
        alert("请输入起始日期！");
    }
});

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

function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function snowfall() {
    const snowContainer = document.getElementById('snow-container');
    const numSnowflakes = 50;
    for (let i = 0; i < numSnowflakes; i++) {
        const snowflake = createSnowflake();
        snowContainer.appendChild(snowflake);
    }
}

snowfall();

function createSakura() {
    const sakura = document.createElement("div");
    sakura.className = "sakura";
    sakura.style.left = Math.random() * 100 + "vw";
    sakura.style.animationDelay = Math.random() * 5 + "s";
    document.body.appendChild(sakura);
    setTimeout(() => sakura.remove(), 10000);
}

setInterval(createSakura, 200);

// 重新选择日期
document.getElementById("reselectBtn").addEventListener("click", function () {
    // 重置页面状态
    document.getElementById("dateInputBox").style.display = "block";
    document.querySelector(".heart").style.display = "none";
    document.getElementById("timeElapsed").textContent = '';  // 清除时间显示
    document.getElementById("reselectBtn").style.display = "none";

    // 清除定时器，停止时间显示
    clearInterval(timeInterval);
    timeInterval = null;
});