"use strict"

let count = 0;
let isBack = false;
let butToRemove;

$('#modal_wrong_data #xwd').on('click', () => {
    $('#modal_wrong_data').hide();
});
$('#modal_wrong_data #ok').on('click', () => {
    $('#modal_wrong_data').hide();
});

$('#modal_accept #nie').on('click', () => {
    $('#modal_accept').hide();
});
$('#modal_accept #tak').on('click', () => {
    removeTask(butToRemove);
    $('#modal_accept').hide();
});
$('#modal_accept #x').on('click', () => {
    $('#modal_accept').hide();
});

function removeTask(but)
{
    localStorage.setItem("task_content", $(but).parent().parent().html());//html()
    localStorage.setItem("which_list", $(but).parent().parent().attr("id"));
    $(but).parent("li").remove();
    isBack = false;
}

function addingButtons(id)
{
    const $input = $('<button class="btn btn-warning" ' +
        ' style="float: right;" data-toggle="modal" data-target="#modal_accept">X</button>');

    $input.on('click', function(event)
        {
            event.stopPropagation();
            butToRemove = event.target;
            $('#modal_accept').show();
        });

    $input.appendTo($("#" + id));

}

const add_task = () => {
    const task = String(document.getElementById("task").value);
    const opt = document.getElementById("tasks_cat").value;

    const date = new Date();
    const data = date.getDate().toString() + "-" + (date.getMonth()+1).toString() + "-" +
        date.getFullYear().toString();
    const dataField = document.createElement("small");
    dataField.innerHTML = data;
    if(task.length === 0)
    {
        $("#modal_wrong_data").show("slow");
        return;
    }
    const newRow = document.createElement("li");
    const button = document.createElement("button");

    newRow.className = "list-group-item list-group-item-success";
    count++;
    newRow.setAttribute("id","task" + count);
    dataField.setAttribute("id","task" + count + "date");
    dataField.style.display = "none";
    newRow.setAttribute("type", "button");
    newRow.setAttribute("onclick", "task_done(id)");
    newRow.style.cursor = 'default';
    newRow.innerHTML = task;
    newRow.append(dataField);
    newRow.insertAdjacentElement("afterend", button);
    let list;
    if (opt === 'pilne')
    {
        list = document.getElementById("tasks_list_pilne");
    }
    else if (opt === "regularne")
    {
        list = document.getElementById("tasks_list_regularne");
    }
    else if (opt === "opcjonalne")
    {
        list = document.getElementById("tasks_list_opcjonalne");
    }
    list.append(newRow);
    addingButtons(newRow.getAttribute("id"));
}

function task_done(id) {
    const date = new Date();
    const data = date.getDate().toString() + "-" + (date.getMonth()+1).toString() + "-" +
        date.getFullYear().toString();
    const task = document.getElementById(id);
    if (task.getAttributeNS("ns", "isDone") ===  "yes")
    {
        task.className = "list-group-item list-group-item-success";
        task.style.textDecoration = 'none';
        task.setAttributeNS("ns", "isDone", "no");
        document.getElementById(id + "date").style.display = "none";
    }
    else
    {
        const d = document.getElementById(id + "date");
        task.className = "list-group-item list-group-item-dark";
        task.style.textDecoration = "line-through red";
        d.innerHTML = ", wykonano: (" + data + ")";
        d.style.display = "inline-block";
        d.style.textDecoration = 'none !important';
        task.setAttributeNS("ns", "isDone", "yes");
    }
}

const hideList = (id) =>
{
    let list;
    if (id === "pil_t")
    {
        list = document.getElementById("tasks_list_pilne");
    }
    else if (id === "reg_t")
    {
        list = document.getElementById("tasks_list_regularne");
    }
    else if (id === "opt_t")
    {
        list = document.getElementById("tasks_list_opcjonalne");
    }

    if (list.getAttributeNS("ns", "isHide") ===  "yes")
    {
        list.style.display = "block";
        list.setAttributeNS("ns", "isHide", "no");
    }
    else
    {
        list.style.display = "none";
        list.setAttributeNS("ns", "isHide", "yes");
    }
}

document.addEventListener("keydown", (event) => {
    if (event.ctrlKey && event.key === 'z' && !isBack)
    {
        const lt = localStorage.getItem('which_list');
        const row = localStorage.getItem('task_content');
        const x = $(row);
        $(x).find("button").remove();
        $('#' + lt).append(x);
        addingButtons(x.attr("id"));
        localStorage.removeItem("task_content");
        localStorage.removeItem("which_list");
        isBack = true;
    }
});