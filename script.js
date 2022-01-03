const inputBox = document.querySelector("input");
const addBtn = document.querySelector("button");
const todoList = document.querySelector(".todoList");
const taskCount = document.querySelector("span");
const clearAllBtn = document.querySelector(".clrAllBtn");


inputBox.onkeyup = () => {
    let userData = inputBox.value;
    if (userData.trim() != 0) {
        addBtn.classList.add("active");
    } else {
        addBtn.classList.remove("active")
    }
}

showTasks();

addBtn.addEventListener('click', () => {
    let userData = inputBox.value;
    let getLocalStorage = localStorage.getItem("Todo");
    if (getLocalStorage == null) {
        listArr = [];
    } else {
        listArr = JSON.parse(getLocalStorage);
    }

    listArr.push(userData);
    localStorage.setItem("Todo", JSON.stringify(listArr));
    showTasks();
})

function showTasks() {
    let getLocalStorage = localStorage.getItem("Todo");
    if (getLocalStorage == null) {
        listArr = [];
    } else {
        listArr = JSON.parse(getLocalStorage);
    }
    let newLiTag = '';
    const pendingNumber = document.querySelector(".pendingNumber");
    pendingNumber.textContent = listArr.length;

    if (listArr.length > 0) {
        clearAllBtn.classList.add("active")
    } else {
        clearAllBtn.classList.remove("active");
    }

    listArr.forEach((element, index) => {
        newLiTag += `<li> ${element} <span onclick="deleteTask(${index})";>x</span></li>`;
    });
    todoList.innerHTML = newLiTag;
    inputBox.value = "";

}

function deleteTask(index) {
    let getLocalStorage = localStorage.getItem("Todo");
    listArr = JSON.parse(getLocalStorage);
    listArr.splice(index, 1);
    localStorage.setItem("Todo", JSON.stringify(listArr));
    showTasks();
}

clearAllBtn.addEventListener('click', () => {

    listArr = [];
    localStorage.setItem("Todo", JSON.stringify(listArr));
    showTasks();
})