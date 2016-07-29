// Game Pacman class
class PacmanGame {
    
    // Objects variables
    constructor(wallArray, foodArray, bonusArray) {
        this.wallArray = wallArray;
        this.foodArray = foodArray;
        this.bonusArray = bonusArray;
        this.container = [];
        this.table = [];
        this.rows = [];
        this.tiles = [];
        this.tilesposition =[];
        this.step = 0;
        this.points = 0;
    };
    
    // Create map with all stuff
    createMap() {
        var container = document.createElement('div');
        var table = document.createElement('table');
        container.classList.add('container');
        
        this.addTiles(table); // In function this.table = table
        
        this.rows = this.table.getElementsByTagName('tr');
        this.tiles = this.table.getElementsByTagName('td');
        
       
        // Add elements to the table such as walls, food, bonuses 
        this.addElemsToMap();
       
        // Add table to container, container to DOM
        container.appendChild(this.table);
        document.querySelector('body').appendChild(container);
        this.container = container;
        
        // Check one step length
        this.step = this.rows[0].children[0].clientWidth + 1; // !!!!! STEP = CELL.WIDTH + 1
        
        // Return map
        return this.table;
    };
    
    // Add rows and cells to the table with data x and y (row index, column index)
    addTiles(table) {
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
    
    
    
    turnRight(positionX, positionY) {}
};




class PacmanElem {
    
    constructor(game) {
        this.game = game;
        this.position = [13, 8]; // [Row, Column]
    }
    
    addToMap() {
            
        // Create div with pacman and add it to main container
        var newPacman = document.createElement('div');
        newPacman.classList.add('pacman');
        this.game.container.appendChild(newPacman);
        
        console.log('Step ' + this.game.step);
        
        
        var parentThis = this;
        
        // Default start pacman position
        newPacman.style.top = (parentThis.position[0] * parentThis.game.step) + 'px';
        newPacman.style.left = (parentThis.position[1] * parentThis.game.step) + 'px';
        
        // If the key is pressed, check which arrow
        document.addEventListener('keydown', function (event) {
            /*var figure = arguments;
            console.log(figure);*/
            
            switch (event.keyCode) {
                case 37: 
                    
                    // GO LEFT
                    console.log('Actually row position ' + parentThis.position[0]); 
                    console.log('Actually column position ' + parentThis.position[1]); 
                    console.log('Walls row position ' + parentThis.game.wallArray[(parentThis.position[0])]);

                                
                    if (parentThis.game.wallArray[(parentThis.position[0])].indexOf(parentThis.position[1] - 1) < 0 && 
                                                                                    parentThis.position[1] > 0) {
                        parentThis.position[1]--;
                        console.log('Wartosc ' + parentThis.position[1]);
                        console.log((parentThis.position[1] * parentThis.game.step) + 'px');
                        newPacman.style.left = (parentThis.position[1] * parentThis.game.step) + 'px';
                    }
                    console.log('Changed row position ' + parentThis.position[0]);
                    console.log('Changed column position ' + parentThis.position[1]);
                    
                    // EAT FOOD AND BONUS
                    parentThis.game.rows[parentThis.position[0]].children[parentThis.position[1]].classList.remove('food');
                    parentThis.game.rows[parentThis.position[0]].children[parentThis.position[1]].classList.remove('bonus');
                    parentThis.game.points++;
                    
                    break;
                case 38: // GO TOP
                    console.log('Actually row position ' + parentThis.position[0]); 
                    console.log('Actually column position ' + parentThis.position[1]); 
                    console.log('Walls row position ' + parentThis.game.wallArray[(parentThis.position[0]) - 1]);

                                
                    if (parentThis.game.wallArray[(parentThis.position[0]) - 1].indexOf(parentThis.position[1]) < 0 && 
                                                                                    parentThis.position[0] > 0) {
                        parentThis.position[0]--;
                        console.log('Changed top ' + (parentThis.position[0] * parentThis.game.step) + 'px');
                        newPacman.style.top = (parentThis.position[0] * parentThis.game.step) + 'px';
                    }
                    console.log('Changed row position ' + parentThis.position[0]);
                    console.log('Changed column position ' + parentThis.position[1]);
                    
                    // EAT FOOD AND BONUS
                    parentThis.game.rows[parentThis.position[0]].children[parentThis.position[1]].classList.remove('food');
                    parentThis.game.rows[parentThis.position[0]].children[parentThis.position[1]].classList.remove('bonus');
                    parentThis.game.points++;
                    
                    break;
                    
                case 39: // GO RIGHT
                    console.log('Actually row position ' + parentThis.position[0]); 
                    console.log('Actually column position ' + parentThis.position[1]); 
                    console.log('Walls row position ' + parentThis.game.wallArray[(parentThis.position[0])]);

                                
                    if (parentThis.game.wallArray[(parentThis.position[0])].indexOf(parentThis.position[1] + 1) < 0 && 
                                                                                    parentThis.position[1] < 16) {
                        parentThis.position[1]++;
                        console.log('Wartosc ' + parentThis.position[1]);
                        console.log((parentThis.position[1] * parentThis.game.step) + 'px');
                        newPacman.style.left = (parentThis.position[1] * parentThis.game.step) + 'px';
                    }
                    console.log('Changed row position ' + parentThis.position[0]);
                    console.log('Changed column position ' + parentThis.position[1]);
                    
                    // EAT FOOD AND BONUS
                    parentThis.game.rows[parentThis.position[0]].children[parentThis.position[1]].classList.remove('food');
                    parentThis.game.rows[parentThis.position[0]].children[parentThis.position[1]].classList.remove('bonus');
                    parentThis.game.points++;
                    
                    break;
                case 40: // GO DOWN
                    console.log('Actually row position ' + parentThis.position[0]); 
                    console.log('Actually column position ' + parentThis.position[1]); 
                    console.log('Walls row position ' + parentThis.game.wallArray[(parentThis.position[0]) + 1]);

                                
                    if (parentThis.game.wallArray[(parentThis.position[0]) + 1].indexOf(parentThis.position[1]) < 0 && 
                                                                                    parentThis.position[0] < 16) {
                        parentThis.position[0]++;
                        console.log('Changed top ' + (parentThis.position[0] * parentThis.game.step) + 'px');
                        newPacman.style.top = (parentThis.position[0] * parentThis.game.step) + 'px';
                    }
                    console.log('Changed row position ' + parentThis.position[0]);
                    console.log('Changed column position ' + parentThis.position[1]);
                    
                    // EAT FOOD AND BONUS
                    parentThis.game.rows[parentThis.position[0]].children[parentThis.position[1]].classList.remove('food');
                    parentThis.game.rows[parentThis.position[0]].children[parentThis.position[1]].classList.remove('bonus');
                    parentThis.game.points++;
                    
                    break;
            }  
            console.log(parentThis.game.points);
        });
       
    }
    
   
    
    eatGhost(){
        this.rows.parentElement.turnRight(20,40);
    }
}

class GhostElem {
    
    constructor(game, name) {
        this.game = game;
        this.name = name;
        this.pinky = []; // Pink ghost
        this.inky = []; // Blue ghost
        this.blinky = []; // Red ghost
        this.clyde = []; // Orange ghost
    }
    
    addToMap() {
        /*var wrapper = document.createElement('div');*/
        var newGhost = document.createElement('div');
        var eye = document.createElement('div');
        var eye1 = document.createElement('div');
        var mouth = document.createElement('div');
        var iris = document.createElement('div');
        var iris1 = document.createElement('div');
        
        /*wrapper.classList.add('ghost-wrapper');
        wrapper.appendChild(newGhost);*/
        newGhost.classList.add('ghost');
        eye.classList.add('eye-left')
        newGhost.appendChild(eye);
        eye1.classList.add('eye-right')
        newGhost.appendChild(eye1);
        mouth.classList.add('mouth')
        newGhost.appendChild(mouth);
        iris.classList.add('iris')
        eye.appendChild(iris);
        iris1.classList.add('iris')
        eye1.appendChild(iris1);
        this.game.container.appendChild(newGhost); // wrapper
    }
    
    go() {
        var direction = 0; ///////////////////////////////////////////////////////// WORKING HERE
        setInterval(function() {
            direction = Math.random() + 4;
            switch(direction) {
                case 0: newGhost.style.left = '-=35px'; break;
                case 1: newGhost.style.right = '+=35px'; break;
                case 2: newGhost.style.top = '-=35px'; break;
                case 3: newGhost.style.bottom = '+=35px'; break;
            }
        }, 500)
    }
    
}


/*====================== DOMContentLoaded ======================*/
document.addEventListener('DOMContentLoaded', function () {
    
    var newGame = new PacmanGame(wallArray, foodArray, bonusArray);
   
    newGame.createMap();
   
    
    var pacman = new PacmanElem(newGame);
    pacman.addToMap();
    
    var ghost = new GhostElem(newGame);
    ghost.addToMap();
    ghost.go();
    
    
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
    [0, 1, 2, 3, 4, 5, 6, 7, 9, 10, 11, 12, 13, 14, 15, 16], // Row 0
    [0, 3, 7, 9, 13, 16], // Row 1
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16], // Row 2
    [0, 3, 5, 11, 13, 16], // Row 3
    [0, 1, 2, 3, 5, 6, 7, 9, 10, 11, 13, 14, 15, 16], // Row 4
    [3, 7, 8, 9, 13], // Row 5
    [3, 13], // Row 6
    [3, 13], // Row 7
    [3, 13], // Row 8
    [3, 13], // Row 9
    [0, 1, 2, 3, 4, 5, 11, 12, 13, 14, 15, 16], // Row 10 
    [0, 3, 4, 5, 6, 7, 9,10 ,11 ,12, 13, 16], // Row 11
    [0, 1, 3, 7, 9, 13, 15, 16], // Row 12
    [1, 3, 4, 5, 6, 7, 9, 10, 11, 12, 13, 15], // Row 13
    [0, 1, 2, 3, 5, 11, 13, 14, 15, 16], // Row 14
    [0, 5, 6, 7, 9, 10, 11, 16], // Row 15
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16] // Row 16
]

var bonusArray = [
    [], // Row 0
    [0, 16], // Row 1
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
    [0, 16], // Row 12
    [], // Row 13
    [], // Row 14
    [], // Row 15
    [] // Row 16
]

