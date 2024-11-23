var _a;
if (localStorage.getItem("dvp")) {
}
else {
    (_a = document
        .querySelector("#musicFr")) === null || _a === void 0 ? void 0 : _a.setAttribute("src", "//music.163.com/outchain/player?type=2&id=34341364&auto=0&height=66");
}
window.addEventListener("keypress", function (e) {
    if (e.code === "KeyD")
        localStorage.setItem("dvp", "true");
    if (e.code === "KeyE")
        localStorage.setItem("dvp", "");
});
