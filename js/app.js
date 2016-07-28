// Game Pacman prototype
class PacmanGame {
    
    constructor(wallArray, foodArray, bonusArray) {
        this.wallArray = wallArray;
        this.foodArray = foodArray;
        this.bonusArray = bonusArray;
        this.table = [];
        this.rows = [];
        this.tiles = [];
    };
    
    createMap() {
        var table = document.createElement('table');
        
        this.addTiles(table);
        
        this.rows = this.table.getElementsByTagName('tr');
        this.tiles = this.table.getElementsByTagName('td');
        
        this.addElemsToMap();
        return this.table;
    };
    
    addTiles(table) {
        // Add rows and cells to the table
        for (var i = 0; i < 17; i++) {
            var row = table.insertRow();
            for (var j = 0; j < 17; j++) {
                row.insertCell();
                row.children[j].dataset.x = j;
                row.children[j].dataset.y = i;
            }
        }
        this.table = table; 
    }
    
    addElems(rows, array, clas) {
        for (var i = 0; i < array.length; i++) {
            for (var j = 0; j < array[i].length; j++) {
                this.rows[i].children[array[i][j]].classList.add(clas);
            }
        }
    };
    
    addElemsToMap() {
        this.addElems(this.rows, this.wallArray, 'wall');
        this.addElems(this.rows, this.foodArray, 'food');
        this.addElems(this.rows, this.bonusArray, 'bonus');
    };
    
    
    
    turnRight(posX, posY) {}
};




class PacmanElem {
    
    constructor(game) {
        this.game = game;
    }
    
    addToMap() {
        console.log(this.game.table);
        var newPacman = document.querySelector('div');
        newPacman.classList.add('pac-man');
        console.log(newPacman);
        return newPacman;
    }
    
    
    eatGhost(){
        this.rows.parentElement.turnRight(20,40);
    }
}


/*====================== DOMContentLoaded ======================*/
document.addEventListener('DOMContentLoaded', function () {
    
    var newGame = new PacmanGame(wallArray, foodArray, bonusArray);
   
    // Add table to DOM
    document.querySelector('body').appendChild( newGame.createMap() );
    
    var pacman = new PacmanElem(newGame);
    
    newGame.table.appendChild( pacman.addToMap() );
    
});






/*====================== ARRAYS ======================*/
var wallArray = [
    [8], // Row 0
    [1, 2, 4, 5, 6, 8, 10, 11, 12, 14, 15], // Row 1
    [], // Row 2
    [1, 2, 4, 6, 7, 8, 9, 10, 12, 14, 15], // Row 3
    [4, 8, 12], // Row 4
    [0, 1, 2, 4, 5, 6, 10, 11, 12, 14, 15, 16], // Row 5
    [0, 1, 2, 4, 12, 14, 15, 16], // Row 6
    [6, 7, 8, 9, 10], // Row 7
    [0, 1, 2, 4, 6, 7, 8, 9, 10, 12, 14, 15, 16], // Row 8
    [0, 1, 2, 4, 12, 14, 15, 16], // Row 9
    [6, 7, 8, 9, 10], // Row 10
    [1, 2, 8, 14, 15], // Row 11
    [2, 4, 5, 6, 8, 10, 11, 12, 14], // Row 12
    [0, 2, 14, 16], // Row 13
    [4, 6, 7, 8, 9, 10, 12], // Row 14
    [1, 2, 3, 4, 8, 12, 13, 14, 15], // Row 15
    [] // Row 16
]

var foodArray = [
    [0,1,2,3,4,5,6,7,9,10,11,12,13,14,15,16], // Row 0
    [0,3,7,9,13,16], // Row 1
    [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16], // Row 2
    [0,3,5,11,13,16], // Row 3
    [0,1,2,3,5,6,7,9,10,11,13,16], // Row 4
    [3,7,8,9,13], // Row 5
    [3,13], // Row 6
    [3,13], // Row 7
    [3,13], // Row 8
    [3,13], // Row 9
    [0,1,2,3,4,5,11,12,13,14,15,16], // Row 10 
    [0,3,4,5,6,7,9,10,11,12,13,16], // Row 11
    [0,1,3,7,9,13,15,16], // Row 12
    [1,3,4,5,6,7,8,9,10,11,12,13,15], // Row 13
    [0,1,2,3,5,11,13,14,15,16], // Row 14
    [0,5,6,7,9,10,11,16], // Row 15
    [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16] // Row 16
]

var bonusArray = [
    [], // Row 0
    [0,16], // Row 1
    [], // Row 2
    [], // Row 3
    [], // Row 4
    [], // Row 5
    [], // Row 6
    [], // Row 7
    [], // Row 8
    [], // Row 9
    [], // Row 10 
    [], // Row 11
    [0,16], // Row 12
    [], // Row 13
    [], // Row 14
    [], // Row 15
    [] // Row 16
]

