var defTime = 16;
var canvas = document.getElementById("meteorCanvas");
var ctx = canvas.getContext("2d");
var vmin = Math.min(window.innerHeight, window.innerWidth) / 100;
var time = 0;
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var Meteor = /** @class */ (function () {
    function Meteor() {
        this.angle = Math.PI / 6;
        this.init();
    }
    Meteor.prototype.randomColor = function () {
        var a = Math.ceil(255 - 240 * Math.random());
        //中段颜色
        return "rgba(" + a + "," + a + "," + a + ",1)";
    };
    Meteor.prototype.init = function () {
        this.length = (Math.random() * 50 + 50) * vmin;
        this.x = Math.random() * -2 * window.innerWidth;
        this.y = Math.random() * -2 * window.innerHeight;
        this.color = ["white", this.randomColor(), "transparent"];
        this.speed = (Math.random() * 0.25 + 1) * defTime;
        //console.log(this.speed);
    };
    Meteor.prototype.update = function () {
        this.x += this.speed * Math.cos(this.angle);
        this.y += this.speed * Math.sin(this.angle);
        if (this.x + this.length > canvas.width &&
            this.y - this.length > canvas.height) {
            this.init(); // 重新初始化
        }
    };
    Meteor.prototype.draw = function () {
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        var lingrad = ctx.createLinearGradient(this.x, this.y, this.x - this.width(), this.y - this.height());
        lingrad.addColorStop(0, this.color[0]);
        lingrad.addColorStop(0.3, this.color[1]);
        lingrad.addColorStop(0.6, this.color[2]);
        ctx.strokeStyle = lingrad;
        ctx.lineTo(this.x - this.width(), this.y - this.height());
        ctx.lineWidth = 3;
        ctx.stroke();
    };
    Meteor.prototype.height = function () {
        return this.length * Math.sin(this.angle);
    };
    Meteor.prototype.width = function () {
        return this.length * Math.cos(this.angle);
    };
    return Meteor;
}());
var Star = /** @class */ (function () {
    function Star() {
        this.x = window.innerWidth * Math.random();
        this.y = window.innerHeight * Math.random();
        this.baseOpacity = Math.random().toFixed(2) - 0;
        this.speed = Math.random();
        //console.log(this);
    }
    Star.prototype.draw = function () {
        ctx.fillStyle = this.color;
        ctx.fillText(".", this.x, this.y);
    };
    Star.prototype.update = function () {
        this.opacity = Math.cos(this.baseOpacity * 360 + time * 0.002 * this.speed);
        this.color = "rgb(255,255,255," + this.opacity + ")";
    };
    return Star;
}());
var meteors = [];
var stars = [];
initArray();
function initArray() {
    meteors = stars = [];
    for (var i = 0; i < vmin / 20 + 3; i++) {
        meteors.push(new Meteor());
        for (var index = 0; index < Math.random() * 15 + 20; index++) {
            stars.push(new Star());
        }
    }
}
function moon() {
    var img = new Image(); // 创建 img 元素
    img.onload = function () {
        ctx.drawImage(img, 0, 0);
    };
    img.src =
        "//ts1.cn.mm.bing.net/th/id/R-C.e8561073a98557c2fd30c80f8db75c8a?rik=oGbmcGIrPg65sw&riu=http%3a%2f%2fstatics.888ppt.com%2fUpload%2fphotothumb%2f20171121%2f88192.jpg!w800&ehk=uG43ZPV77TeV17p2tCXilsvMAaxaD61yTKhtECTKQqM%3d&risl=&pid=ImgRaw&r=0";
}
function animate(newTimestamp) {
    defTime = newTimestamp - time;
    time = newTimestamp;
    /*     if (time >= 360) {
        time = 0;
        console.log("360!");
    } */
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    moon();
    meteors.forEach(function (meteor) {
        meteor.update();
        meteor.draw();
    });
    stars.forEach(function (star) {
        star.update();
        star.draw();
    });
    requestAnimationFrame(animate);
}
animate(time);
window.addEventListener("resize", function () {
    vmin = Math.min(window.innerHeight, window.innerWidth) / 100;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initArray();
});
