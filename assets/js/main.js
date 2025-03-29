const ADD = document.querySelector("#adding");
const DEL = document.querySelector("#deleting");

// Elements inside the Edit Task section
const editTask = document.querySelector(".editTask");
const crossbtn = document.querySelector(".nav-crossbtn")
const cancel = document.querySelector("#cancel");
const update = document.querySelector("#update");
const currDate = document.querySelector("#category-date");

//Showing how many list are present in Ul tag
const ul = document.getElementById("toDo-order");
document.getElementById("toDo-num").innerText = ul.children.length;

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
    editTask.style.display = "none";

    //Reseting values
    document.querySelector("#title").value = "";
    document.querySelector("#desc").value = "";
    document.querySelector("#editTask-category").value = "";
})

//By defualt selecting current date
const today = new Date().toISOString().split("T")[0];
currDate.value = today;

document.addEventListener("DOMContentLoaded", async () => {
    document.getElementById("header").innerHTML = await (await fetch("components/header.html")).text();
    const navDate = document.querySelector("#nav-currDate");
    navDate.value = new Date().toISOString().split("T")[0];
});



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
    saveTask(tasks);
    //Showing Only title on to do box
    showTitle();
    
    //Clear the inputs after store them
    document.querySelector("#title").value = "";
    document.querySelector("#desc").value = "";
    document.querySelector("#editTask-category").value = "";
    
    //Hiding the Edit Task popup
    editTask.style.display = "none";
})

//Showing Only title on to do box
function showTitle () {
    const tasks = getTask();
    const ul = document.getElementById("toDo-order");
    ul.innerHTML = "";

    tasks.forEach((task , index) => {
        let li = document.createElement("li");
        li.innerText = task.title;
        ul.append(li);

        //When title of To Do box Click it will appear on Task Detail with show (Title, Desc , category and date)
        li.addEventListener("click", () => {
            showTask(task);
        })
    });
    document.getElementById("toDo-num").innerText = ul.children.length;

    //Show Detail of newly add li by defualt
    if (tasks.length > 0){
        showTask(tasks[0]);
    }
}

//Function to Show Task detail in Task Detail box
function showTask (task) {
    document.getElementById("taskDetail-title").innerText = task.title;
    document.getElementById("taskDetail-desc").innerText = task.desc;
    document.getElementById("box-category").innerText = task.category;
    document.getElementById("box-date").innerText = task.date;
}

//Delete
DEL.addEventListener("click", () => {
    let currTitle = document.getElementById("taskDetail-title").innerText.trim();
    let tasks = getTask();

    if (tasks.length != 0){
        const str = prompt("If you want to Delete Selected List then type 'Delete'");
        
        if ("Delete" == str){
            let updateList = tasks.filter(task => task.title !== currTitle);

            saveTask(updateList);
            showTitle();
        }
        else{
            alert("NO Task Selected to Delete!")
        }
    }
    else (
        alert("List is empty, Nothing to Delete!")
    )
})

//Render all detail when browser is load
document.addEventListener("DOMContentLoaded", showTitle);