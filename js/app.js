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
        this.step = this.rows[0].children[0].clientWidth + 1; // !!!!!!!! STEP = CELL.WIDTH + 1 Obramowanie
        
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
        this.pacman = [];
        this.pTop = [];
        this.pBottom = [];
    }
    
    addToMap() {
            
        // Create div with pacman and add it to main container
        var newPacman = document.createElement('div');
        var pTop = document.createElement('div');
        var pBottom = document.createElement('div');
        newPacman.classList.add('pacman');
        pTop.classList.add('pacman-top');
        pBottom.classList.add('pacman-bottom');
        newPacman.appendChild(pTop);
        newPacman.appendChild(pBottom);
        this.game.container.appendChild(newPacman);
        this.pTop = pTop;
        this.pBottom = pBottom;
        this.pacman = newPacman;
        
        
        
        var parentThis = this;
        
        // Default start pacman position
        newPacman.style.top = (parentThis.position[0] * parentThis.game.step) + 'px';
        newPacman.style.left = (parentThis.position[1] * parentThis.game.step) + 'px';
        
        // Default pacman turn
        this.pTop.style.animation = 'right-eating-top 0.5s infinite';
        this.pBottom.style.animation = 'right-eating-bottom 0.5s infinite';
        
        
        this.top = this.pacman.style.top;
        
        // If the key is pressed, check which arrow
        document.addEventListener('keydown', function (event) {
            /*var figure = arguments;
            console.log(figure);*/
            
                switch (event.keyCode) {
                    case 37: 
                        // TURN LEFT
                        parentThis.turn(event.keyCode);
                        // GO LEFT
                        newPacman.style.left = parentThis.go(event.keyCode, parentThis.position[0], parentThis.position[1]);
                        // EAT FOOD AND BONUSES
                        parentThis.eat();
                        break;
                    case 38: 
                        // TURN TOP
                        parentThis.turn(event.keyCode);
                        // GO TOP
                        newPacman.style.top = parentThis.go(event.keyCode, parentThis.position[0], parentThis.position[1]);
                        // EAT FOOD AND BONUSES
                        parentThis.eat();
                        break;
                    case 39: 
                        // TURN RIGHT
                        parentThis.turn(event.keyCode);
                        // GO RIGHT
                        newPacman.style.left = parentThis.go(event.keyCode, parentThis.position[0], parentThis.position[1]);
                        // EAT FOOD AND BONUSES
                        parentThis.eat();
                        break;
                    case 40: 
                        // TURN DOWN 
                        parentThis.turn(event.keyCode);
                        // GO DOWN
                        newPacman.style.top = parentThis.go(event.keyCode, parentThis.position[0], parentThis.position[1]);
                        // EAT FOOD AND BONUSES
                        parentThis.eat();
                        break;
                }  
            
            
        });
    }
    
    eat() {
        if(this.game.foodArray[this.position[0]].indexOf(this.position[1]) >= 0) {
            this.game.rows[this.position[0]].children[this.position[1]].classList.remove('food');
            this.game.points++;
        }
        if(this.game.bonusArray[this.position[0]].indexOf(this.position[1]) >= 0) {
            this.game.rows[this.position[0]].children[this.position[1]].classList.remove('bonus');
            /// METODA ZJEDZENIE BONUSU 
        }
    }
    
    turn(direction) {
        switch (direction) {
            case 37:
                this.pTop.style.animation = 'left-eating-top 0.5s infinite';
                this.pBottom.style.animation = 'left-eating-bottom 0.5s infinite';
                break;
            case 38:
                this.pTop.style.animation = 'top-eating-top 0.5s infinite';
                this.pBottom.style.animation = 'top-eating-bottom 0.5s infinite';
                break;
            case 39:
                this.pTop.style.animation = 'right-eating-top 0.5s infinite';
                this.pBottom.style.animation = 'right-eating-bottom 0.5s infinite';
                break;
            case 40:
                this.pTop.style.animation = 'down-eating-top 0.5s infinite';
                this.pBottom.style.animation = 'down-eating-bottom 0.5s infinite';
                break;
        }
    }
    
    go(direction, rowPos, columnPos) {
        switch (direction) {
        case 37:
            // Sprawdź czy pacman jest w tunelu i chce przejść na drugą stonę
            if (rowPos === 7 && columnPos === 0) {
                this.position[1] = 16;
                return this.position[1] * this.game.step + 'px';
            }
            if (this.game.wallArray[rowPos].indexOf(columnPos - 1) < 0 && columnPos > 0) {
                this.position[1]--;
            }
            return this.position[1] * this.game.step + 'px';
            break;
        case 38:
            if (this.game.wallArray[rowPos - 1].indexOf(this.position[1]) < 0 && rowPos > 0) {
                this.position[0]--;
            }
            return this.position[0] * this.game.step + 'px';
            break;
        case 39:
            // Sprawdź czy pacman jest w tunelu i chce przejść na drugą stonę
            if (rowPos === 7 && columnPos === 16) {
                this.position[1] = 0;
                return this.position[1] * this.game.step + 'px';
            }
            if (this.game.wallArray[rowPos].indexOf(columnPos + 1) < 0 && columnPos < 16) {
                this.position[1]++;
            }
            return this.position[1] * this.game.step + 'px';
            break;
        case 40:
            if (this.game.wallArray[rowPos + 1].indexOf(this.position[1]) < 0 && rowPos < 16) {
                this.position[0]++;
            }
            return this.position[0] * this.game.step + 'px';
            break;
        }
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
        this.pinkyPos = [6, 8];
        this.inky = []; // Blue ghost
        this.inkyPos = [6, 8];
        this.blinky = []; // Red ghost
        this.blinkyPos = [6, 8];
        this.clyde = []; // Orange ghost
        this.clydePos = [6, 8];
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
        
        this.pinky = newGhost.cloneNode(true);
        this.pinky.style.top = '263px';
        this.pinky.style.left = '228px';
        this.pinky.classList.add('pinky');
        this.game.container.appendChild(this.pinky);
        
        this.inky = newGhost.cloneNode(true);
        this.inky.style.top = '263px';
        this.inky.style.left = '263px';
        this.inky.classList.add('inky');
        this.game.container.appendChild(this.inky);
        
        this.blinky = newGhost.cloneNode(true);
        this.blinky.style.top = '263px';
        this.blinky.style.left = '298px';
        this.blinky.classList.add('blinky');
        this.game.container.appendChild(this.blinky);
        
        newGhost.classList.add('clyde');
        this.clyde = newGhost;
        this.clyde.style.top = '263px';
        this.clyde.style.left = '333px';
        
        // MOVING UP AND DOWN AT THE BEGINNING OF THE GAME
        this.clyde.classList.add('ghost-moving');
        this.pinky.classList.add('ghost-moving');
        this.blinky.classList.add('ghost-moving');
        this.inky.classList.add('ghost-moving');
        
        var parentThis = this;
        
        var startPinky = setTimeout(function () {
            ghostsStart(parentThis.pinky, parentThis.pinkyPos);
        }, 1000);
        var startInky = setTimeout(function () {
            ghostsStart(parentThis.inky, parentThis.inkyPos);
        }, 2000);
        var startBlinky = setTimeout(function () {
            ghostsStart(parentThis.blinky, parentThis.blinkyPos);
        }, 4000);
        var startClyde = setTimeout(function () {
            ghostsStart(parentThis.clyde, parentThis.clydePos);
        }, 6000);
        
        function ghostsStart(ghost, pos) {
            ghost.classList.remove('ghost-moving');
            ghost.style.top = pos[0] * parentThis.game.step + 'px';
            ghost.style.left = pos[1] * parentThis.game.step + 'px';
        }
        
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

