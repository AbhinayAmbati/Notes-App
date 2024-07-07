const notesContainer = document.querySelector(".notes-container");
const createBtn = document.querySelector("button");

function showNotes(){
    const storedNotes = localStorage.getItem("notes");
    if (storedNotes) {
        notesContainer.innerHTML = storedNotes;
    }
}

function updateStorage() {
    localStorage.setItem("notes", notesContainer.innerHTML);
}

createBtn.addEventListener("click", () => {
    let inputBox = document.createElement("p");
    let img = document.createElement("img");
    inputBox.className = "input-box";
    inputBox.setAttribute("contenteditable", "true");
    img.src = "images/delete.png";
    inputBox.appendChild(img);
    notesContainer.appendChild(inputBox);
    attachListeners(inputBox);
    updateStorage();
});

function attachListeners(note) {
    note.addEventListener("click", function(e) {
        if (e.target.tagName === "IMG") {
            e.target.parentElement.remove();
            updateStorage();
        }
    });

    note.addEventListener("input", updateStorage);

    note.addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
            document.execCommand("insertLineBreak");
            event.preventDefault();
        }
    });
}

showNotes();

document.querySelectorAll(".input-box").forEach(note => {
    attachListeners(note);
});