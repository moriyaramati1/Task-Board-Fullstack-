

let assignments = [];
INFORMATION_KEY = "data";
index = 0;


const divBuilder=()=>{
    // this function builds the div for each note
    let divStr=""
    assignments.map((item)=>{
        divStr+=`<div class="Note" id=${item.assignmentId}>
        &emsp;<br/>
        <span onclick="deleteNote(this)">
        <i class="bi bi-x-square-fill"></i>
        </span>
        <div class="NoteText">${item.Description}</div>
        <p>${item.Date} <br>
            ${item.Time} 
        </p>
    </div> 
    `
    });
    return divStr;
}

// A function for creating new note 
const createNote = () => {

    // adds note's details to the array of all assignments.
    task = {assignmentId:index,
            Description: document.getElementById("Assignment").value,
            Date: document.getElementById("Date").value,
            Time: document.getElementById("Hour").value}
           
    assignments.push(task);

    // update the information in localstorage under key named INFORMATION_KEY
    localStorage.setItem(INFORMATION_KEY,JSON.stringify(assignments))
        
    // represent the new note on html
    document.getElementById("MyNotes").innerHTML = divBuilder()

    // update the unique identifier
    index++;
    // reset the document for new insertion
    document.getElementById("form").reset()
        
}

const deleteNote = (element) => {
    // get the node parent -The note div 
    var parentElement = element.parentElement;
    // get the unique id of this node
    var index = +parentElement.id;

    // find the index in the array of the object with that assignmentId.
    const idxObj = assignments.findIndex(object => {
        return object.assignmentId === index;
      });
    
    // remove this object from the array
    assignments.splice(idxObj, 1);

    // update local storage with array after deletion
    localStorage.setItem(INFORMATION_KEY,JSON.stringify(assignments));

    // remove the note from html list of all notes.
    const MyNotes = document.getElementById("MyNotes");
    MyNotes.removeChild(parentElement);

}


const loadTasks=()=>{
    // load the data from local storage
    let data = localStorage.getItem(INFORMATION_KEY);
    // if the info is not there it create key and empty array.
    if(data == null)
    {
        localStorage.setItem(INFORMATION_KEY,'[]')   
    }
    else if(data != '[]')
    {
        // get the jason info into array
        assignments = JSON.parse(data)
        //get the new unique id according to the last assignmentId
        index = assignments[assignments.length - 1]["assignmentId"] + 1;
        // update the html with previous assignments.
        document.getElementById("MyNotes").innerHTML=divBuilder()

    }
}

loadTasks();