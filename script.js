let tasks =
    JSON.parse(localStorage.getItem("tasks")) || [];


function addTask() {

    let taskText =
        document.getElementById("taskInput").value;

    let subject =
        document.getElementById("subjectInput").value;

    let date =
        document.getElementById("dateInput").value;


    if (taskText.trim() === "") {

        alert("Please enter a task.");

        return;
    }


    let task = {

        text: taskText,

        subject: subject,

        date: date,

        completed: false
    };


    tasks.push(task);

    saveTasks();

    displayTasks();


    document.getElementById("taskInput").value = "";

    document.getElementById("subjectInput").value = "";

    document.getElementById("dateInput").value = "";
}


function displayTasks() {

    let taskList =
        document.getElementById("taskList");


    taskList.innerHTML = "";


    tasks.forEach(function(task, index) {

        let taskDiv =
            document.createElement("div");


        taskDiv.className = "task";


        taskDiv.innerHTML = `

            <div class="task-info">

                <h3 class="${task.completed ? "completed" : ""}">
                    ${task.text}
                </h3>

                <p>
                    Subject:
                    ${task.subject || "Not specified"}
                </p>

                <p>
                    Deadline:
                    ${task.date || "Not specified"}
                </p>

            </div>

            <div>

                <button
                    class="complete-btn"
                    onclick="completeTask(${index})">

                    ${task.completed ? "Undo" : "Complete"}

                </button>

                <button
                    class="delete-btn"
                    onclick="deleteTask(${index})">

                    Delete

                </button>

            </div>

        `;


        taskList.appendChild(taskDiv);

    });


    updateProgress();
}


function completeTask(index) {

    tasks[index].completed =
        !tasks[index].completed;

    saveTasks();

    displayTasks();
}


function deleteTask(index) {

    tasks.splice(index, 1);

    saveTasks();

    displayTasks();
}


function updateProgress() {

    let completed = 0;


    tasks.forEach(function(task) {

        if (task.completed) {

            completed++;
        }

    });


    let total = tasks.length;


    document.getElementById("completedCount").textContent =
        completed;

    document.getElementById("totalCount").textContent =
        total;


    let percentage = 0;


    if (total > 0) {

        percentage =
            (completed / total) * 100;
    }


    document.getElementById("progressFill").style.width =
        percentage + "%";
}


function saveTasks() {

    localStorage.setItem(
        "tasks",
        JSON.stringify(tasks)
    );
}


function toggleDarkMode() {

    document.body.classList.toggle("dark");
}


displayTasks();