document.addEventListener("contextmenu", (event) => {
    const el = event.target as HTMLElement;
    if (el.childNodes.length > 1 || el.tagName !== "A") return;
    event.preventDefault();

    el.innerHTML = JSON.stringify({
        href: el.getAttribute("href"),
        name: el.textContent,
    });
    el.setAttribute("contenteditable", "plaintext-only");

    el.addEventListener("blur", () => {
        console.log(!el.textContent);
        if (!el.textContent) el.parentElement?.remove();
        //el.focus();
        try {
            const processedInput = JSON.parse(el.textContent || "null");
            el.innerHTML = processedInput.name;
            el.setAttribute("href", processedInput.href);
            //el.setAttribute("contenteditable", "false");
            el.removeAttribute("contenteditable")
        } catch (err) {
            //window.alert("Format error. Please input again.")
            //el.focus();
        }
    });
});

const listEl = document.getElementById("list") as HTMLUListElement;
function add ()  {
    //console.log(event.code);
    
    const name = window.prompt("Name?") || "";
    const href = window.prompt("Href?") || "";
    const a = document.createElement("a");
    const li = document.createElement("li");
    a.setAttribute("href", href);
    const textNode = document.createTextNode(name);
    a.appendChild(textNode);
    li.appendChild(a);
    listEl.appendChild(li);
}
window.addEventListener("keyup", (e) => {
    if (e.code == "KeyA" && e.altKey) add();
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
