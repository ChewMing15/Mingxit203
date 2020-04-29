document.getElementById('clear').addEventListener('click', () => {
    var delete_table = document.getElementById('tabletable')
    var delete_download = document.getElementById('downloadButton');
    var delete_thewhat = document.getElementById('thewhat');
//    while (delete_table.firstChild) {
//        delete_table.removeChild(delete_table.firstChild);
//    }
    delete_table.remove(".delete_table");
    delete_download.remove(".downloadButton");
    //delete_thewhat.remove('.delete_thewhat');
    
});

document.getElementById('submit').addEventListener('click', async () => {
    var input_text = document.getElementById('input').value;       
    datafromweb(input_text);
})

async function datafromweb(input_text) {
    const userinput = input_text;
    
    const numbers = await fetch(`/hello/${userinput}`);
    const num = await numbers.json();
    
    document.getElementById('span_type').textContent = num.what;
    document.getElementById('unit').textContent = num.inUnit;
    document.getElementById('thewhat').classList.add('thewhat');
    var txt = [];

    for (x=0; x<num.totalRow+1; x++) {
        txt[x] = num.title[x];
    }

    const a = document.createElement('table');
    document.body.append(a);

    const b = document.querySelector('table').setAttribute('id', 'tabletable');
    const c = document.getElementById('tabletable');

    var row = c.insertRow();
    console.log(num)
    for (k=0; k<5; k++){
        row.insertCell().innerHTML = num.header[k];
    }
    
    for (i=0; i<num.totalRow+1; i++) {
        
        var row = c.insertRow();

        for (j=0; j<4; j++) {
        
            if (j==0) {
                row.insertCell().innerHTML = txt[i];
            }

            var eachbody = num.body[i][j];
            row.insertCell().innerHTML = eachbody;
        }
        
    }

    var download_button = document.createElement('BUTTON');
    download_button.setAttribute('id', 'downloadButton');
    download_button.setAttribute('onClick', 'downloadNOW()');
    download_button.innerText = 'DOWNLOAD!';
   // download_button.appendChild(document.createTextNode('DOWNLOAD'));
   
    document.body.append(download_button);

    document.getElementById('tabletable').classList.add('tablecolor');
}

function downloadNOW() {
    console.log('here1');
    
    var tableID = 'tabletable';
    var downloadLink;
    var dataType = 'application/vnd.ms-excel';
    var tableSelect = document.getElementById(tableID);
    var tableHTML = tableSelect.outerHTML.replace(/ /g, '%20');
    
    // Specify file name
    var input_text = document.getElementById('input').value;   
    filename = input_text.replace('.', '_')+'.xls';
    
    // Create download link element
    downloadLink = document.createElement("a");
    
    if(navigator.msSaveOrOpenBlob){
        var blob = new Blob(['\ufeff', tableHTML], {
            type: dataType
        });
        navigator.msSaveOrOpenBlob( blob, filename);
    } else {
        // Create a link to the file
        downloadLink.href = 'data:' + dataType + ', ' + tableHTML;
    
        // Setting the file name
        downloadLink.download = filename;
    }

    //triggering the function
    downloadLink.click();
}
