
// Load LocalStorage
window.addEventListener('DOMContentLoaded', function () {
    if (localStorage.getItem('username') != null) {
        userNameArray = JSON.parse(localStorage.getItem('username'));
        console.log(userNameArray);
    }      
});

// Make Table
window.addEventListener('DOMContentLoaded', function () {
    let myDiv = document.getElementById('myDiv');
    let myTable = document.createElement('table');
        myTable.id = 'myTable';
    let tHead = document.createElement('thead');
    let hRow = tHead.insertRow(0);
    let cellName = hRow.insertCell(0);
    let cellScore = hRow.insertCell(1);
    cellName.innerHTML = 'NAME';
    cellScore.innerHTML = 'SCORE';
    

    for (let i = 1; i < userNameArray.length; i++) {
        let row = myTable.insertRow(0);
        let cell1 = row.insertCell(0);
        let cell2 = row.insertCell(1);
        cell1.innerHTML = userNameArray[i]['userName'];
        cell2.innerHTML = userNameArray[i]['userScore'];

    }
    myTable.appendChild(tHead);
    myDiv.appendChild(myTable);
});

// Clear whole Table on button 'click'
window.addEventListener('DOMContentLoaded', function () {
    document.querySelector('#clearTable').addEventListener('click', function () {
        localStorage.clear();
        document.querySelector('#myDiv').innerHTML = "";
    });
});

