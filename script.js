
// UI Components
const body = document.querySelector("body");
const container = CreateDivWithClass("container p-4");

LoadPage();

// UI Variables
const form = document.querySelector(".addActivityForm");
const txtSubject = document.querySelector("#txtActivityName");
const btnDeleteAll = document.querySelector("#btnDeleteAll");
const taskList = document.querySelector("#task-list");
let items;

LoadItems();
EventListener();

function LoadPage() {
    CreatePageHeader();
    CreateMainContent();
}

function CreatePageHeader() {
    const row = CreateDivWithClass("row");
    const colmd12 = CreateDivWithClass("col-md-12 text-center");
    const image = CreateImg("logo mb-3", "Logo", "toDo.png");
    const header4 = CreateHeader("app-title", "header", "To Do App", "h4");

    colmd12.appendChild(image);
    colmd12.appendChild(header4);
    colmd12.appendChild(document.createElement("hr"));
    row.appendChild(colmd12);
    container.appendChild(row);
    body.appendChild(container);
}

function CreateMainContent() {
    CreateAddActivityForm();
}

function CreateAddActivityForm() {
    const row = CreateDivWithClass("row");
    const col4 = CreateDivWithClass("col-md-4 col-sm-4 col-lg-4");
    const card = CreateDivWithClass("card");
    const cardHeader = CreateDivWithClass("card-header bg-dark text-light text-center");
    cardHeader.innerText = "Adding New Activity";
    const cardBody = CreateDivWithClass("card-body");
    const form = CreateForm("addActivityForm", "off");
    const inputFormGroup = CreateDivWithClass("form-group");
    const activityNameInput = CreateInputElement("form-control", "txtActivityName", "Activity Name", "text", "txtActivityName", "btnAddNewTask");
    const btnFormGroup = CreateDivWithClass("form-group text-right");
    const btnSaveActivity = createButton("btn btn-danger btn-sm", "submit", "<i class='fas fa-plus-square mr-2'></i>Save");

    btnFormGroup.appendChild(btnSaveActivity);
    inputFormGroup.appendChild(activityNameInput);
    form.appendChild(inputFormGroup);
    form.appendChild(btnFormGroup);
    cardBody.appendChild(form);
    card.appendChild(cardHeader);
    card.appendChild(cardBody);
    col4.appendChild(card);
    row.appendChild(col4);
    container.appendChild(row);

    CreateListingActivities(row);
}

function CreateListingActivities(row) {
    const col8 = CreateDivWithClass("col-md-8 col-sm-8 col-lg-8");
    const card = CreateDivWithClass("card");
    const cardBody = CreateDivWithClass("card-body");
    const listHeaderRow = CreateDivWithClass("row justify-content-between pr-3 pl-3");
    const listHeader = CreateSpan("main-header", "Activity List");
    const btnDeleteAll = CreateAnchor("#", "btn btn-danger btn-sm", "btnDeleteAll", "<i class='fas fa-trash mr-2'></i>Delete All")
    const listRow = CreateDivWithClass("row");
    const col12 = CreateDivWithClass("col-md-12 col-sm-12 col-lg-12");
    const ul = CreateUnorederedList("list-group", "task-list");

    col12.appendChild(ul);
    listRow.appendChild(col12);
    listHeaderRow.appendChild(listHeader);
    listHeaderRow.appendChild(btnDeleteAll);
    cardBody.appendChild(listHeaderRow);
    cardBody.appendChild(document.createElement("hr"));
    cardBody.appendChild(listRow);
    card.appendChild(cardBody);
    col8.appendChild(card);
    row.appendChild(col8);
}

// Create div element
function CreateDivWithClass(className) {
    const div = document.createElement("div");
    div.className = className;
    return div;
}

// Create img element
function CreateImg(className, altAttr, srcAttr) {
    const img = document.createElement("img");
    img.setAttribute("src", srcAttr);
    img.setAttribute("alt", altAttr);
    img.className = className;
    return img;
}

// Create h1,h2,h3,h4,h5,h6 Elements
function CreateHeader(className, id, text, headerType) {
    const header = document.createElement(headerType);
    header.className = className;
    header.id = id;
    header.appendChild(document.createTextNode(text));
    return header;
}

// Create form element
function CreateForm(className, autoComplete) {
    const form = document.createElement("form");
    form.className = className;
    form.setAttribute("autocomplete", autoComplete);
    return form;
}

// Create input Element
function CreateInputElement(className, id, placeholder, type, name, ariaDescribeBy) {
    const input = document.createElement("input");
    input.className = className;
    input.id = id;
    input.name = name;
    input.type = type;
    input.placeholder = placeholder;
    input.setAttribute("aria-describeby", ariaDescribeBy);
    return input;
}

// Create button element
function createButton(className, type, innerHtml) {
    const btn = document.createElement("button");
    btn.className = className;
    btn.type = type;
    btn.innerHTML = innerHtml;
    return btn;
}

// Create span element
function CreateSpan(className, innerText) {
    const span = document.createElement("span");
    span.className = className;
    span.innerText = innerText;
    return span;
}

// Create a element
function CreateAnchor(hrefAttr, className, id, innerHTML) {
    const anchor = document.createElement("a");
    anchor.className = className;
    anchor.href = hrefAttr;
    anchor.innerHTML = innerHTML;
    anchor.id = id;
    return anchor;
}

// Create ul element
function CreateUnorederedList(className, id) {
    const ul = document.createElement("ul");
    ul.className = className;
    ul.id = id;
    return ul;
}

// Create li element
function CreateListItem(className) {
    const ul = document.createElement("li");
    ul.className = className;
    return ul;
}

function EventListener() {
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        if (txtSubject.value === "") {
            alert("add new item");
        }
        else {
            if (CheckItemIsSaved(txtSubject.value)) {
                alert("This activity has been already saved.");
            } else {
                CreateItem(txtSubject.value);
                SetItemToLS(txtSubject.value);
                txtSubject.value = "";
            }
        }
    });
    taskList.addEventListener("click", (e) => {
        e.preventDefault();
        if (e.target.className === "fas fa-times-circle fa-2x") {
            if (confirm("Are Your Sure?")) {
                e.target.parentElement.parentElement.remove();

                // delete item from LS
                DeleteItemFromLS(e.target.parentElement.parentElement.textContent);
            }
        }
    });
    btnDeleteAll.addEventListener("click", (e) => {
        e.preventDefault();
        if (confirm("Are Your Sure?")) {
            // taskList.childNodes.forEach(function (item) { // Yol 2
            //     if (item.nodeType === 1) {
            //         item.remove();
            //     }
            // });
            while (taskList.firstChild) {
                taskList.removeChild(taskList.firstChild);
            }
            localStorage.clear();
        }
    });
}

function CreateItem(text) {
    const li = CreateListItem("list-group-item list-group-item-secondary mb-2");
    li.appendChild(document.createTextNode(text));
    const anchor = CreateAnchor("#", "delete-item float-right text-danger", "btnDeleteItem", "<i class='fas fa-times-circle fa-2x'></i>");

    li.appendChild(anchor);
    taskList.appendChild(li);
}

function LoadItems() {
    items = GetItemsFromLS();
    items.forEach(function (item) {
        CreateItem(item);
    });
}

function CheckItemIsSaved(text) {
    var isSaved = false;
    for (var i = 0; i < items.length; i++) {
        if (items[i] === text) {
            isSaved = true;
            break;
        }
    }
    return isSaved;
}

function GetItemsFromLS() {
    if (localStorage.getItem("items") === null) {
        items = [];
    } else {
        items = JSON.parse(localStorage.getItem("items"));
    }
    return items;
}

function SetItemToLS(text) {
    items = GetItemsFromLS();
    items.push(text);
    localStorage.setItem("items", JSON.stringify(items));
}

function DeleteItemFromLS(text) {
    items = GetItemsFromLS();
    items.forEach(function (item, index) {
        if (item === text) {
            items.splice(index, 1);
        }
    });
    localStorage.setItem("items", JSON.stringify(items));
}


