const ADD = document.querySelector("#adding");
const DEL = document.querySelector("#deleting");

// Elements inside the Edit Task section
const editTask = document.querySelector(".editTask");
const crossbtn = document.querySelector(".nav-crossbtn")
const cancel = document.querySelector("#cancel");
const update = document.querySelector("#update");


// Display Edit Task bar
ADD.addEventListener("click", () => {
    editTask.style.display = "block";
})

// Hide Edit Task Bar without reset the values inside it
crossbtn.addEventListener("click", () => {
    editTask.style.display = "none";
})

//Hide the Edit Task bar with reset the values inside it
cancel.addEventListener("click", () => {
    editTask.style.display = "none"

    //Reseting values
    document.querySelector("#title").value = "";
    document.querySelector("#desc").value = "";
    document.querySelector("#editTask-category").value = "";
})