var taskInput = document.getElementById("new-task"); //new-task
var addButton = document.getElementById("add-task"); //add-task
var incompleteTaskHolder = document.getElementById("incomplete-tasks"); //incomplete-tasks
var completedTaskHolder = document.getElementById("completed-tasks"); //completed-tasks

//New Task List Item
var createNewTaskElement = function (taskString) {
    //create list item
    var listItem = document.createElement("li");
        listItem.className = "task";

    //create elements for list item (li)
    var div = document.createElement("div"); //div
        div.className = "checkbox";
    var checkBox = document.createElement("input"); //input (checkbox)
    var label = document.createElement("label"); //label
    var editInput = document.createElement("input"); //input (text)
    var editButton = document.createElement("button"); //button
        editButton.className = "btn btn-info edit";
    var deleteButton = document.createElement("button"); //button
        deleteButton.className = "btn btn-danger delete";

    //modifying each element
    checkBox.type = "checkbox";
    editInput.type = "text";

    editButton.innerText = "Edit";
    deleteButton.innerText = "Delete";
    label.innerText = taskString;

    div.appendChild(checkBox);
    div.appendChild(label);
    div.appendChild(editInput);

    //append elements to list item (li)
    listItem.appendChild(div);
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);

    return listItem;
};
//Add a new task
var addTask = function () {
    console.log("addtask is clicked !");

    if (taskInput.value.length == 0){
        console.log("empty !");
        return;
    }

    //create a new list item with the text from #new-task
    var listItem = createNewTaskElement(taskInput.value);

    //append listItem to incompleteTaskHolder
    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);

    taskInput.value = "";
};

//Edit an existing task
var editTask = function () {
    console.log("editTask is clicked !");

    var listItem = this.parentNode;
    var editInput = listItem.querySelector("input[type=text]");
    var label = listItem.querySelector("label");
    var btnEdit = listItem.querySelector("button.edit");

    var containsClass = listItem.classList.contains("editMode");
    if (containsClass){
        btnEdit.innerText = "Edit";
        label.innerText = editInput.value;
    }
    else {
        btnEdit.innerText = "Save";
        editInput.value = label.innerText;
    }

    //add or remove .editMode to list item
    listItem.classList.toggle("editMode");
};

//Delete an existing task
var deleteTask = function () {
    console.log("deleteTask is clicked !");
    var listItem = this.parentNode;
    var ul = listItem.parentNode;

    //remove list item
    ul.removeChild(listItem);
};

//Mark a task as complete
var taskCompleted = function () {
    console.log("taskCompleted is clicked !");

    var listItem = this.parentNode;
    listItem = listItem.parentNode;

    completedTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskIncomplete);
};

//Mark a task as incomplete
var taskIncomplete = function () {
    console.log("taskIncomplete is clicked !");

    var listItem = this.parentNode;
    listItem = listItem.parentNode;

    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);
};

var bindTaskEvents = function (taskListItem, checkBoxEventHandler) {
    console.log("Bind list item events ...");

    //select taskListItem's children
    var checkBox = taskListItem.querySelector("input[type=checkbox]");
    var editButton = taskListItem.querySelector("button.edit");
    var deleteButton = taskListItem.querySelector("button.delete");

    //bind editTask to edit button
    editButton.onclick = editTask;

    //bind deleteTask to delete button
    deleteButton.onclick = deleteTask;

    checkBox.onchange = checkBoxEventHandler;
};

var ajaxRequest = function () {
  console.log("AJAX request");
};

//set the click handler to the addTask function
addButton.addEventListener("click", addTask);
addButton.addEventListener("click", ajaxRequest);

//cycle over incompleted task Holders ul li items
for(var i = 0 ; i < incompleteTaskHolder.children.length ; i++){
    //bind events to list item's children (taskCompleted)
    bindTaskEvents(incompleteTaskHolder.children[i], taskCompleted);
    console.log(incompleteTaskHolder.children[i]);
}


//cycle over completed task Holders ul li items
for(var i = 0 ; i < completedTaskHolder.children.length ; i++){
    //bind events to list item's children (taskIncomplete)
    bindTaskEvents(completedTaskHolder.children[i], taskIncomplete);
}