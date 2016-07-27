document.addEventListener('DOMContentLoaded', function () {
    
    var table = document.createElement('table');
    
    // Add rows and cells to the table
    for (var i = 0; i < 17; i++) {
        var row = table.insertRow();
        for (var j = 0; j < 17; j++) {
            row.insertCell();
            
        }
    }
    var tiles = table.getElementsByTagName('td');
    var rows = table.getElementsByTagName('tr');
    
    addWalls(rows);
    addFood(rows);

    // Add table to DOM
    document.querySelector('body').appendChild(table);

  
});

function addFood (rows) {
    
    
        for (var i = 0; i < rows.children.length; i++) {
            if (!rows.children[i].hasClass('wall')) {
                rows.children[i].classList.add('food');
            }
        }
    
}

function addWalls (rows) {
    
    var wallArray = [
        [8],
        [1,2,4,5,6,8,10,11,12,14,15],
        [],
        [1,2,4,6,7,8,9,10,12,14,15],
        [4,8,12],
        [0,1,2,4,5,6,10,11,12,14,15,16],
        [0,1,2,4,12,14,15,16],
        [6,7,8,9,10],
        [0,1,2,4,6,7,8,9,10,12,14,15,16],
        [0,1,2,4,12,14,15,16],
        [6,7,8,9,10],
        [1,2,8,14,15],
        [2,4,5,6,8,10,11,12,14],
        [0,2,14,16],
        [4,6,7,8,9,10,12],
        [1,2,3,4,8,12,13,14,15]
        ]
    
    for (var i = 0; i < wallArray.length; i++) {
        for (var j = 0; j < wallArray[i].length; j++) {
            rows[i].children[wallArray[i][j]].classList.add('food');
        }
    }
}