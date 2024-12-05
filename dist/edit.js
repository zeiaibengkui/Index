//import message from "./message";
var listEl = document.getElementById("list");
function getElementIndex(element) {
    var _a;
    return Array.prototype.indexOf.call((_a = element.parentNode) === null || _a === void 0 ? void 0 : _a.children, element);
}
//Edit
function edit(el) {
    //Don't edit element which has been editing
    if (el.getAttribute("contenteditable"))
        return;
    el.innerHTML = JSON.stringify({
        href: el.getAttribute("href"),
        name: el.textContent
    });
    el.setAttribute("contenteditable", "plaintext-only");
    el.focus();
    //bug
    processEdit(el);
}
function processEdit(el) {
    el.addEventListener("blur", function () {
        var _a;
        if (!el.textContent)
            (_a = el.parentElement) === null || _a === void 0 ? void 0 : _a.remove();
        try {
            //If formated JSON
            var processedInput_1 = JSON.parse(el.textContent || "null");
            //If there's already a same-name link
            document.querySelectorAll("#list a").forEach(function (value) {
                if (value.textContent == processedInput_1.name) {
                    throw new Error("There's already a same-named link! Please try a new name.");
                }
            });
            //Process userinput
            el.innerHTML = processedInput_1.name;
            el.setAttribute("href", processedInput_1.href);
            el.removeAttribute("contenteditable");
        }
        catch (er) {
            //message.add(er.toString(),"error");0
            processEdit(el);
            throw er;
        }
    }, { once: true });
}
window.edit = edit;
document.addEventListener("contextmenu", function (event) {
    var el = event.target;
    if (el.childNodes.length > 1 || el.tagName !== "A")
        return;
    event.preventDefault();
    edit(el);
});
//Add
function add() {
    var a = document.createElement("a");
    var li = document.createElement("li");
    a.setAttribute("href", "https://");
    var textNode = document.createTextNode("Title");
    a.appendChild(textNode);
    li.appendChild(a);
    dragganle(li);
    listEl.appendChild(li);
    edit(a);
}
window.add = add;
window.addEventListener("keyup", function (e) {
    if (e.code == "KeyA" && e.altKey)
        add();
});
var addEl = document.getElementById("add");
addEl === null || addEl === void 0 ? void 0 : addEl.addEventListener("click", add);
//Remove
var removeEl = document.getElementById("remove");
function remove(e) {
    var _a;
    var index = (_a = e.dataTransfer) === null || _a === void 0 ? void 0 : _a.getData("Index");
    var liEl = document.querySelectorAll("#list li")[index];
    console.log(index, listEl.children, liEl);
    liEl.remove();
}
window.remove = remove;
removeEl.addEventListener("drop", remove);
removeEl.addEventListener("dragover", function (e) { return e.preventDefault(); });
//Save and load
window.addEventListener("beforeunload", function (e) {
    //If is editing
    var focusEl = document.querySelector("a[contenteditable]");
    if (focusEl) {
        e.preventDefault();
    }
    save();
});
function save() {
    var list = {};
    document.querySelectorAll("#list a").forEach(function (value) {
        list[value.textContent || "nothing"] = value.getAttribute("href");
    });
    console.log(list);
    localStorage.setItem("list", JSON.stringify(list));
    message.add("Saved!", "success");
}
window.addEventListener("DOMContentLoaded", function () {
    //load
    var list = JSON.parse(localStorage.getItem("list") || "{}");
    for (var property in list) {
        var a = document.createElement("a");
        var li = document.createElement("li");
        a.setAttribute("href", list[property]);
        var textNode = document.createTextNode(property);
        a.appendChild(textNode);
        li.appendChild(a);
        dragganle(li);
        listEl.appendChild(li);
    }
});
//Draggable
function dragganle(li) {
    var a = li.children[0];
    a.setAttribute("draggable", "false");
    li.setAttribute("draggable", "true");
    li.addEventListener("dragstart", function (e) {
        var _a;
        (_a = e.dataTransfer) === null || _a === void 0 ? void 0 : _a.setData("Index", getElementIndex(e.target).toString());
        e.dataTransfer.dropEffect = "move";
        //e.dataTransfer?.setDragImage((e.target as Element).children[0],0,0)
    });
}
