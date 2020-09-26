console.log('This is Postman CLone');

// Initialize indexe
let addparamcnt = 0;

//Utiiltiy Functions
function getElementFromString(string) {
    let div = document.createElement('div');
    div.innerHTML = string;
    return div.firstElementChild;
}
// Hide the parameter box initially
let parameterBox = document.getElementById('parameterBox');
parameterBox.style.display = 'none';

// JSON box Hiding
let paramsRadio = document.getElementById('paramsRadio');
paramsRadio.addEventListener('click', () => {
    document.getElementById('requestJsonBox').style.display = 'none';
    document.getElementById('parameterBox').style.display = 'block';
});

let jsonRadio = document.getElementById('jsonRadio');
jsonRadio.addEventListener('click', () => {
    document.getElementById('parameterBox').style.display = 'none';
    document.getElementById('requestJsonBox').style.display = 'block';
});

// Adding extra parameters
let addParam = document.getElementById('addParam');
addParam.addEventListener('click', () => {
    let params = document.getElementById('params');
    let string = `<div class="form-row my-2">
                    <label for="url" class="col-sm-2 col-form-label">Parameter ${addparamcnt + 2}</label>
                    <div class="col-md-4">
                        <input type="text" class="form-control" id="parameterKey${addparamcnt + 2}" placeholder="Enter Paramter${addparamcnt + 2} Key">
                    </div>
                    <div class="col-md-4">
                        <input type="text" class="form-control" id="parameterValue${addparamcnt + 2}" placeholder="Enter Parameter${addparamcnt + 2} Value">
                    </div>
                    <button class="btn btn-primary deleteParam">-</button>
                </div>`
    addparamcnt++;
    let paramElement = getElementFromString(string);
    params.appendChild(paramElement);

    //Add Event Listner to Delete the Tabs
    let deleteParam = document.getElementsByClassName('deleteParam');
    for (item of deleteParam) {
        item.addEventListener('click', (e) => {
            e.target.parentElement.remove();
        });
    }
});

// What happens when we click on the submit button
let submit = document.getElementById('submit');
submit.addEventListener('click', () => {
    document.getElementById('responsePrism').innerHTML = "Please Wait.. Fetching your Request";
    Prism.highlightAll();

    let url =  document.getElementById('url').value;
    let requestType = document.querySelector("input[name='requestType']:checked").value;
    let contentType = document.querySelector("input[name='contentType']:checked").value;

    let data = {};
    if(contentType == 'params'){
        for(let i=0;i<addparamcnt + 1;i++){
            if(document.getElementById('parameterKey' + (i+1)) != undefined){
                let key = document.getElementById('parameterKey' + (i+1)).value;
                let value = document.getElementById('parameterValue' + (i+1)).value;
                data[key] = value;
            }
        }
        data = JSON.stringify(data);
    }
    else
        data = document.getElementById('requestJsonText').value;
    // console.log(url);
    // console.log(requestType);
    // console.log(contentType);
    // console.log(data);

    if(requestType == 'GET'){
        fetch(url, {
            method:'GET',
        }).then(response => response.text()).then(text =>{
            // document.getElementById('responseJsonText').value = text;
            document.getElementById('responsePrism').innerHTML = text;
            Prism.highlightAll();
        })
    }
    else{
        fetch(url, {
            method:'POST',
            body: data,
            headers:{
                "Content-type": "application/json; charset=UTF-8"
            }
        }).then(response => response.text()).then(text =>{
            // document.getElementById('responseJsonText').value = text;
            document.getElementById('responsePrism').innerHTML = text;
            Prism.highlightAll();
        })
    }
})
