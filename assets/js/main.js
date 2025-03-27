const ADD = document.querySelector("#adding");
const DEL = document.querySelector("#deleting");

// Elements inside the Edit Task section
const editTask = document.querySelector(".editTask");
const crossbtn = document.querySelector(".nav-crossbtn")
const cancel = document.querySelector("#cancel");
const update = document.querySelector("#update");
const currDate = document.querySelector("#category-date");


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

//By defualt selecting current date
const today = new Date().toISOString().split("T")[0];
currDate.value = today;

//Storing Task Detail in local storage
function saveTask (tasks) {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}
function getTask () {
    return JSON.parse(localStorage.getItem("tasks")) || [];
}

//function to save from edit task bar and hide edit task bar
update.addEventListener("click", function addTask() {
    let title = document.querySelector("#title").value.trim();
    let desc = document.querySelector("#desc").value.trim();
    let category = document.querySelector("#editTask-category").value;
    let date = document.querySelector("#category-date").value;

    if (title === "" || desc === "" || category === ""){
        alert("Please fill all field!");
        return;
    }
    
    let tasks = getTask();
    tasks.unshift({title, desc, category, date});
    console.log(tasks);
    saveTask(tasks);
    //Showing Only title on to do box
    showTitle();
    
    //Clear the inputs after store them
    document.querySelector("#title").value = ""
    document.querySelector("#desc").value = ""
    document.querySelector("#editTask-category").value = "";
    
    //Hiding the Edit Task popup
    editTask.style.display = "none";
})

//Showing Only title on to do box
function showTitle() {
    let task = getTask();
    let li = document.createElement("li");
    li.textContent = task[0].title;
    document.getElementById("toDo-order").prepend(li);

    //Showing how many list are present in Ul tag
    const ul = document.getElementById("toDo-order");
    document.getElementById("toDo-num").innerText = ul.children.length;
}
