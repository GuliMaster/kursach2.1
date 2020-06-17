/**
 * @fileOverview
 * "Script"||| Description: Generator of get requests to the server.
 */
const server = "http://95.217.210.154:8080";
/** "Read-function"; Description: makes a request to the server, receives data from the server, adds it to the html-page.*/
let readItems = function() {
    let table = document.getElementById('table');
    let html1 = "";
    $.ajax({
        url: server,
        method: "GET",
        data: {"actionType": "r"},
        success: function (data) {
            for (let key in data.dat) {
                html1 += `<tr id="${key}"><td class="col-xs-2">${data.dat[key].id}</td>
                     <td class="col-xs-8" id="item ${key}">${data.dat[key].name}</td><td><button class="btn" onclick="editTask(this)"><i class="fa fa-pencil"></i></button></td><td><button class="btn del-btn" onclick="removeTask(this)"><i class="fa fa-trash"></i></button></td></tr>`;
            }
            table.innerHTML = html1;
        }
    });
}
$(document).ready(readItems());
/**
 * "RemoveTask-function"; Description: makes a request to the server, receives data from the server, removes it out of the html-page.
 * @param {HTMLObjectElement} obj - item to be removed.
 */
let removeTask = function(obj) {
    let ItemId = obj.parentNode.parentNode.id;
    $.ajax({
        url: server,
        method: "GET",
        data: {"actionType": "d", "id": ItemId},
        success: function (data) {
            document.getElementById(`${data}`).remove();
        }
    });
}
/**
 * "RemoveAll-function"; Description: makes a request to the server, removes all items out of the html-page.
 */
let removeAll = function() {
    let table = document.getElementById('table');
    $.ajax({
        url: server,
        method: "GET",
        data: {"actionType":"da"},
        success: function () {
            table.innerHTML = '';
        }
    });
}
/**
 * "Amount-function"; Description: gets a number of elements in the <table>, adds it to the html-page.
 **/
let amount = function() {
    let table =  document.getElementById('table');
    let p = document.createElement('p');
    p.className = "amount_text";
    p.innerHTML =  table.firstChild.childElementCount;
    obj.parentNode.append(p);
}
/**
 * "EditTask-function"; Description: get new data from user, makes a request to change data to the server, receives data from the server, adds it to the html-page.
 * @param {HTMLObjectElement} obj - item to be edited.
 **/
let editTask = function (obj) {
    let idEl = obj.parentNode.parentNode.id;
    let subj = document.getElementById(`item ${idEl}`);
    let promise = new Promise(function (resolve, reject) {
        let textBefore = subj.textContent;
        subj.innerHTML = `<input type="text" value="${textBefore}" class="elDiff">`;
        $(`\#${idEl} .elDiff`).keydown(function(e){
            if(($(`\#${idEl} .elDiff`).val() != '') && (e.key === 'Enter')){
                let newText = $(`\#${idEl} .elDiff`).val();
                $.ajax({
                    url: server,
                    method: "GET",
                    data:{"actionType":"u","id":idEl,"item":newText},
                    success:resolve(),
                    error:reject("Error")
                });
            }
        })
    });
    promise.then(()=>{
        subj.innerHTML = $(`\#${idEl} .elDiff`).val();
    });
}


