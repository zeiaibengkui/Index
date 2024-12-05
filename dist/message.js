var messageBox = document.getElementById("toast-box");
var toastExample = document.getElementById("toast-example");
var message = {
    add: function (text, type) {
        if (type === void 0) { type = "info"; }
        var toast = toastExample.cloneNode(true);
        toast.setAttribute("id", "toast-" + type + "-" + Math.random().toFixed(8) * 10e8);
        Array.from(toast.children).forEach(function (value) {
            if (value.classList.contains("text")) {
                value.textContent = text;
            }
            else if (value.classList.contains("img")) {
                value.classList.add(type);
            }
        });
        toast.addEventListener("click", function (e) {
            toast.style.opacity = "0";
            if (getElementIndex(toast) == 1) { // getElementIndex(toast) == 0 is the example                
                toast.style.marginBottom = -toast.clientHeight - 5 + "px";
            }
            else {
                toast.style.marginTop = -toast.clientHeight - 5 + "px";
            }
            setTimeout(function () {
                toast.remove();
            }, 500);
        });
        messageBox === null || messageBox === void 0 ? void 0 : messageBox.appendChild(toast);
        messageBox === null || messageBox === void 0 ? void 0 : messageBox.scroll({
            top: messageBox.scrollHeight,
            behavior: "smooth"
        });
    }
};
window.message = message;
// export default message;
window.addEventListener("error", function (event) {
    message.add(event.message + "\n", "error");
});
