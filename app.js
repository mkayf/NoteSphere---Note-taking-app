const createTitle = document.querySelector("#create-title");
const createDescription = document.querySelector("#create-description");
const createBtn = document.querySelector("#create-btn");
const noteBox = document.querySelector(".note-box");
const notes = JSON.parse(localStorage.getItem("notes") || "[]");


// update local storage function

const updateLocalStorage = () => {
  localStorage.setItem('notes',JSON.stringify(notes));
}


// creating notes using below function:

createBtn.addEventListener("click", () => {
  if ((createTitle.value || createDescription.value) == "") {
    return false;
  } else {
    let notesObj = {
      title: createTitle.value,
      description: createDescription.value,
      date: dateStr
    };
    notes.push(notesObj);
    localStorage.setItem("notes", JSON.stringify(notes));
  }
  showNotes();

  createTitle.value = "";
  createDescription.value = "";



});

// creating date object

const monthArray = [
  "January",
  "February",
  "Mfarch",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

let dateObj = new Date();
let date = dateObj.getDate();
let month = monthArray[dateObj.getMonth()];
let year = dateObj.getFullYear();
let dateStr = `${month} ${date}, ${year}`;

// a function to show notes in the noteBox container

const showNotes = () => {
  noteBox.innerHTML = "";
  notes.forEach((note,index) => {
    let noteComponent = `
    <div class="note">
    <div class="upper-part">
    <input type="text" class="note-title input-box" spellcheck="false" value="${note.title}">
    <i class="fa-solid fa-trash delete-btn" onclick="deleteNote(${index})"></i>
  </div>
    <textarea class="note-description input-box" cols="30" rows="6" spellcheck="false">${note.description}</textarea>
    <div class="bottom-part">
    <p class="display-date">${note.date}</p>
    </div>
    </div>
    `;
    noteBox.insertAdjacentHTML("afterbegin", noteComponent);
  });
};

showNotes();


// creating delete note function
const deleteNote = (noteId) => {
  notes.splice(noteId,1);
  updateLocalStorage();
  showNotes();
}
  

// creating edit note functionality:

let noteDiv = document.querySelectorAll('.note');
noteDiv.forEach((div)=>{
  div.addEventListener('click',(e)=>{
    if(e.target.tagName == 'INPUT' || e.target.tagName == 'TEXTAREA'){
      let inputBox = document.querySelectorAll('.input-box');
      inputBox.forEach((input)=>{
        input.onkeyup = () => {
          updateLocalStorage();
        }
      })
    }
  })
})

