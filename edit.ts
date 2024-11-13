document.addEventListener("contextmenu", (event) => {
    const el = event.target as HTMLElement;
    //console.log(el.childNodes);
    if (el.childNodes.length > 1 || el.tagName !== "A") return;

    const href = window.prompt("Href?") || "";
    el.setAttribute("href", href);

    event.preventDefault();
    el.setAttribute("contenteditable", "plaintext-only");
    el.addEventListener("blur", () => {
        console.log(!el.textContent);
        if(!el.textContent) el.parentElement?.remove();
        //el.focus();
        el.setAttribute("contenteditable","false");
    });
});

const listEl = document.getElementById("list") as HTMLUListElement;

window.addEventListener("keyup", (event) => {
    //console.log(event.code);
    if (event.code !== "KeyA") return;
    const name = window.prompt("Name?") || "";
    const href = window.prompt("Href?") || "";
    const a = document.createElement("a");
    const li = document.createElement("li");
    a.setAttribute("href", href);
    const textNode = document.createTextNode(name);
    a.appendChild(textNode);
    li.appendChild(a);
    listEl.appendChild(li);
    save();
});

window.addEventListener("beforeunload", save);
function save() {
    const list = {};
    document.querySelectorAll("#list a").forEach((value) => {
        console.log(value);
        list[value.textContent || "nothing"] = value.getAttribute("href");
    });
    console.log(list);
    localStorage.setItem("list", JSON.stringify(list));
}

window.addEventListener("DOMContentLoaded", () => {
    const list: object = JSON.parse(localStorage.getItem("list") || "{}");

    for (const property in list) {
        const a = document.createElement("a");
        const li = document.createElement("li");
        a.setAttribute("href", list[property]);
        const textNode = document.createTextNode(property);
        a.appendChild(textNode);
        li.appendChild(a);
        listEl.appendChild(li);
        console.log(li);
    }
});
