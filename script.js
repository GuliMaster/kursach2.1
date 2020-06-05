const server = "http://95.217.210.154"
$(document).ready(function(){
    let table = document.getElementById('table');
    let html1 = "";
    $.ajax({
        url: server,
        method: "GET",
        data: {"actionType":"r"},
        success: function (data) {
            for(let key in data.dat){
                html1 += `<tr id="${key}"><td class="col-xs-2">${data.dat[key].id}</td> 
                     <td class="col-xs-8" id="item ${key}">${data.dat[key].name}</td><td><button class="btn" onclick="editTask(this)"><i class="fa fa-pencil"></i></button></td><td><button class="btn del-btn" onclick="removeTask(this)"><i class="fa fa-trash"></i></button></td>
                </tr>`;
            }
            table.innerHTML = html1;
        }
    });
});

let removeAll = function() {
    let table = document.getElementById('table');
    $.ajax({
        url: server,
        method: "GET",
        data: {"actionType": "da"},
        success: function (data) {
            table.innerHTML = '';
        }
    });
}

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

let amount = function() {
    let table =  document.getElementById('table');
    document.write(table.childElementCount);
}

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


