/* jshint browser: true */
// Game Pacman class
class PacmanGame {

    constructor(wallArray, foodArray, bonusArray, intersectionArray, baseArray) {
        this.wallArray = wallArray;
        this.foodArray = foodArray;
        this.bonusArray = bonusArray;
        this.intersectionArray = intersectionArray;
        this.baseArray = baseArray;
        this.pointsAside = [];
        this.container = [];
        this.table = [];
        this.rows = [];
        this.tiles = [];
        this.step = 0;
        this.points = 0;
        this.frightenedMode = false;
        this.chaseMode = false;
        this.scatterMode = true;
    }

    // Create map with all stuff
    createMap() {
        // Create elements
        var container = document.createElement('div'),
            table = document.createElement('table'),
            overlay = document.createElement('div');

        // Find aside span
        this.pointsAside = document.querySelector('.points-aside');

        // Add classes
        container.classList.add('container');
        overlay.classList.add('overlay');

        // Add 7 divs to overlay
        for (var i = 0; i < 7; i++) {
            overlay.appendChild(document.createElement('div'));
        }


        this.addTiles(table);
        this.container = container;
        this.table = table;
        this.rows = this.table.getElementsByTagName('tr');
        this.tiles = this.table.getElementsByTagName('td');

        // Add elements to the table such as walls, food, bonuses
        this.addElemsToMap();

        // Add elements to DOM
        container.appendChild(overlay);
        container.appendChild(this.table);
        document.querySelector('body').appendChild(container);

        // Check one step length
        this.step = this.rows[0].children[0].clientWidth;
        // Return map
        return this.table;
    }

    // Add rows and cells to the table with data x and y (row index, column index)
    addTiles(table) {
        for (var i = 0; i < 17; i++) {
            var row = table.insertRow();
            for (var j = 0; j < 17; j++) {
                row.insertCell();
                /*row.children[j].dataset.x = j;
                row.children[j].dataset.y = i;*/
            }
        }
    }

    addElems(rows, array, clas) {
        for (var i = 0; i < array.length; i++) {
            for (var j = 0; j < array[i].length; j++) {
                this.rows[i].children[array[i][j]].classList.add(clas);
            }
        }
    }

    addElemsToMap() {
        this.addElems(this.rows, this.wallArray, 'wall');
        this.addElems(this.rows, this.foodArray, 'food');
        this.addElems(this.rows, this.bonusArray, 'bonus');
        this.addElems(this.rows, this.intersectionArray, 'intersection');
        this.addElems(this.rows, this.baseArray, 'base');
    }

}




class PacmanElem {

    constructor(game, ghost) {
        this.game = game;
        this.ghost = ghost;
        this.position = [13, 8]; // [Row, Column]
        this.pacman = [];
        this.pTop = [];
        this.pBottom = [];
        this.isKeyAvailable = true;
        this.direction = 37; // Default direction - go left
        this.speed = 250;
        this.pacmanSize = game.tileSize;
        this.pacmanMoving = [];
        this.counter = 0;
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



        this.top = this.pacman.style.top;

        // Pacman moving 250ms by tile
        this.pacmanMoving = setInterval(function() {
            newPacman.style.transition = 'top 400ms, left 400ms';
            /*parentThis.checkKeydown();*/ // If the key is pressed, check which arrow
            parentThis.addEventListenerOnce(document, 'keydown');
            parentThis.turn(parentThis.direction); // Turn pacman if direction has changed
            switch(parentThis.direction) {
                case 37: newPacman.style.left = parentThis.go(parentThis.direction, parentThis.position[0], parentThis.position[1]); break;
                case 38: newPacman.style.top = parentThis.go(parentThis.direction, parentThis.position[0], parentThis.position[1]); break;
                case 39: newPacman.style.left = parentThis.go(parentThis.direction, parentThis.position[0], parentThis.position[1]); break;
                case 40: newPacman.style.top = parentThis.go(parentThis.direction, parentThis.position[0], parentThis.position[1]); break;
            }
            parentThis.eat();
            //console.log(parentThis.game.frightenedMode);
            if (parentThis.game.frightenedMode) {
                parentThis.eatGhost();
            }
        }, this.speed);




    } // End of class

    // One time keydown event
    addEventListenerOnce(element, event) {
        var parentThis = this;
        var func = function (e) {
            element.removeEventListener(event, func);
            switch(e.keyCode) {
                case 37: parentThis.direction = 37; break;
                case 38: parentThis.direction = 38; break;
                case 39: parentThis.direction = 39; break;
                case 40: parentThis.direction = 40; break;
            }
        };
        element.addEventListener(event, func);
    }

    // Eat food and bonuses and increase game points
    eat() {
        if ((' ' + this.game.rows[this.position[0]].children[this.position[1]].className + ' ' ).indexOf( ' ' + 'food' + ' ' ) > - 1) {
            this.game.rows[this.position[0]].children[this.position[1]].classList.remove('food');
            this.game.pointsAside.textContent = this.game.points += 10;
            this.counter++;
        }
        if ((' ' + this.game.rows[this.position[0]].children[this.position[1]].className + ' ' ).indexOf( ' ' + 'bonus' + ' ' ) > - 1) {
            this.game.rows[this.position[0]].children[this.position[1]].classList.remove('bonus');
            this.game.pointsAside.innerHTML = this.game.points += 50;
            // eatBonus call
            this.eatBonus(this.ghost.pinky, this.ghost.inky, this.ghost.blinky, this.ghost.clyde);
            this.counter++;
        }
        if (this.counter > 154 ) {
            // Create game over div and add it to DOM with class game-over
            var youWinCaption = document.createElement('div');
            youWinCaption.classList.add('you-win');
            document.querySelector('body').appendChild(youWinCaption);
            // Show button after 4 seconds
            setTimeout(function () {
                var againButton = document.createElement('a');
                againButton.classList.add('again-button');
                againButton.classList.add('win');
                againButton.setAttribute('href', '#');
                document.querySelector('body').appendChild(againButton);
                againButton.addEventListener('click', function (event) {
                    location.reload();
                });
            }, 4000)
        }

    }

    // When pacman ate ghost, show only his eyes
    eatGhost() {
        if (this.position[0] === this.ghost.pinkyPos[0] && this.position[1] === this.ghost.pinkyPos[1]) {
            this.ghost.pinky.classList.add('ghost-eaten');
            this.game.pointsAside.innerHTML = this.game.points += 200;
        } else if (this.position[0] === this.ghost.inkyPos[0] && this.position[1] === this.ghost.inkyPos[1]) {
            this.ghost.inky.classList.add('ghost-eaten');
            this.game.pointsAside.innerHTML = this.game.points += 200;
        } else if (this.position[0] === this.ghost.blinkyPos[0] && this.position[1] === this.ghost.blinkyPos[1]) {
            this.ghost.blinky.classList.add('ghost-eaten');
            this.game.pointsAside.innerHTML = this.game.points += 200;
        } else if (this.position[0] === this.ghost.clydePos[0] && this.position[1] === this.ghost.clydePos[1]) {
            this.ghost.clyde.classList.add('ghost-eaten');
            this.game.pointsAside.innerHTML = this.game.points += 200;
        }
    }

    // 5 sec Frightened mode after pacman ate bonus
    eatBonus() {
        this.game.frightenedMode = true;
        this.game.scatterMode = false;
        var parentThis = this;
        var array = Array.from(arguments);
        array.forEach(function (element) {
            element.classList.add('ghost-catched');
            element.classList.remove('pinky', 'inky', 'blinky', 'clyde');
        });

        this.eatGhost();
        setTimeout(function () {
                array.forEach(function (element) {
                    element.classList.remove('ghost-catched');
                });
                array[0].classList.add('pinky');
                array[1].classList.add('inky');
                array[2].classList.add('blinky');
                array[3].classList.add('clyde');
                parentThis.game.scatterMode = true;
                parentThis.game.frightenedMode = false;
        }, 5000);
    }

    turn(direction) {
        switch (direction) {
            case 37:
                this.pTop.style.animation = 'left-eating-top 0.3s infinite';
                this.pBottom.style.animation = 'left-eating-bottom 0.3s infinite';
                break;
            case 38:
                this.pTop.style.animation = 'top-eating-top 0.3s infinite';
                this.pBottom.style.animation = 'top-eating-bottom 0.3s infinite';
                break;
            case 39:
                this.pTop.style.animation = 'right-eating-top 0.3s infinite';
                this.pBottom.style.animation = 'right-eating-bottom 0.3s infinite';
                break;
            case 40:
                this.pTop.style.animation = 'down-eating-top 0.3s infinite';
                this.pBottom.style.animation = 'down-eating-bottom 0.3s infinite';
                break;
        }
    }

    go(direction, rowPos, columnPos) {
        switch (direction) {
        case 37:
            // Sprawdź czy pacman jest w tunelu i chce przejść na drugą stonę
            if (rowPos === 7 && columnPos === 0) {
                this.pacman.style.transition = 'top 0ms, left 0ms';
                console.log(this.pacman.style.transition);
                this.position[1] = 16;
                return this.position[1] * this.game.step + 'px';
            }
            if (columnPos > 0 && this.game.wallArray[rowPos].indexOf(columnPos - 1) < 0) {
                this.position[1]--;
            }
            return this.position[1] * this.game.step + 'px';
        case 38:
            if (rowPos > 0 && this.game.wallArray[rowPos - 1].indexOf(this.position[1]) < 0) {
                this.position[0]--;
            }
            return this.position[0] * this.game.step + 'px';
        case 39:
            // Sprawdź czy pacman jest w tunelu i chce przejść na drugą stonę
            if (rowPos === 7 && columnPos === 16) {
                this.pacman.style.transition = 'top 0ms, left 0ms';
                this.position[1] = 0;
                return this.position[1] * this.game.step + 'px';
            }
            if (columnPos < 16 && this.game.wallArray[rowPos].indexOf(columnPos + 1) < 0) {
                this.position[1]++;
            }
            return this.position[1] * this.game.step + 'px';
        case 40:
            if (rowPos < 16 && this.game.wallArray[rowPos + 1].indexOf(this.position[1]) < 0) {
                this.position[0]++;
            }
            return this.position[0] * this.game.step + 'px';
        }
    }


}





// GHOST //
class GhostElem {

    constructor(game) {
        this.game = game;
        this.pinky = []; // Pink ghost
        this.pinkyPos = [7, 8];
        this.pinkyDirection = [37, 37]; // [OLD DIRECTION, CURRENT DIRECTION]
        this.inky = []; // Blue ghost
        this.inkyPos = [7, 8];
        this.inkyDirection = [39, 39]; // [OLD DIRECTION, CURRENT DIRECTION]
        this.blinky = []; // Red ghost
        this.blinkyPos = [7, 8];
        this.blinkyDirection = [38, 38]; // [OLD DIRECTION, CURRENT DIRECTION]
        this.clyde = []; // Orange ghost
        this.clydePos = [7, 8];
        this.clydeDirection = [37, 37]; // [OLD DIRECTION, CURRENT DIRECTION]
        this.pacman = [];
        this.speed = 300;
        this.ghostsMoving = [];
        this.choose = false;
        this.futurePos = [0, 0];
        this.futureDir = [0, 0];
        this.length = 0;
        this.homePos = [6, 8];
        this.gameover = false;
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
        eye.classList.add('eye-left');
        newGhost.appendChild(eye);
        eye1.classList.add('eye-right');
        newGhost.appendChild(eye1);
        mouth.classList.add('mouth');
        newGhost.appendChild(mouth);
        iris.classList.add('iris');
        eye.appendChild(iris);
        iris1.classList.add('iris');
        eye1.appendChild(iris1);
        this.game.container.appendChild(newGhost); // wrapper

        this.pinky = newGhost.cloneNode(true);
        this.pinky.style.left = '38%';
        this.pinky.classList.add('pinky');
        this.game.container.appendChild(this.pinky);

        this.inky = newGhost.cloneNode(true);
        this.inky.style.left = '44%';
        this.inky.classList.add('inky');
        this.game.container.appendChild(this.inky);

        this.blinky = newGhost.cloneNode(true);
        this.blinky.style.left = '50%';
        this.blinky.classList.add('blinky');
        this.game.container.appendChild(this.blinky);

        newGhost.classList.add('clyde');
        this.clyde = newGhost;
        this.clyde.style.left = '56%';

        // MOVING UP AND DOWN AT THE BEGINNING OF THE GAME
        this.clyde.classList.add('ghost-moving');
        this.pinky.classList.add('ghost-moving');
        this.blinky.classList.add('ghost-moving');
        this.inky.classList.add('ghost-moving');

        var parentThis = this;



        var startPinky = setTimeout(function () {
            ghostsStart(parentThis.pinky, parentThis.pinkyPos);
            parentThis.ghostsMoving = setInterval(parentThis.moving.bind(null, parentThis, parentThis.pinky, parentThis.pinkyPos, parentThis.pinkyDirection), 300);
        }, 10);

        var startInky = setTimeout(function () {
            ghostsStart(parentThis.inky, parentThis.inkyPos);
            parentThis.ghostsMoving = setInterval(parentThis.moving.bind(null, parentThis, parentThis.inky, parentThis.inkyPos, parentThis.inkyDirection), 300);
        }, 1000);

        var startBlinky = setTimeout(function () {
            ghostsStart(parentThis.blinky, parentThis.blinkyPos);
            parentThis.ghostsMoving = setInterval(parentThis.moving.bind(null, parentThis, parentThis.blinky, parentThis.blinkyPos, parentThis.blinkyDirection), 300);
        }, 2500);

        var startClyde = setTimeout(function () {
            ghostsStart(parentThis.clyde, parentThis.clydePos);
            parentThis.ghostsMoving = setInterval(parentThis.moving.bind(null, parentThis, parentThis.clyde, parentThis.clydePos, parentThis.clydeDirection), 300);
        }, 4000);

        function ghostsStart(ghost, pos) {
            ghost.classList.remove('ghost-moving');
            ghost.style.top = pos[0] * parentThis.game.step + 'px';
            ghost.style.left = pos[1] * parentThis.game.step + 'px';
        }

    }
    addPacman(pacman) {
        this.pacman = pacman;
    }

    moving(thiz, ghost, pos, direction) {
        switch (true) {
            // If ghost has been eaten, go to home to respawn
        case ghost.classList.contains('ghost-eaten'):
            thiz.goToHome(ghost, pos, direction);
            break;
        case thiz.game.chaseMode:
            console.log('chaseMode');
            thiz.ghostEat(ghost, pos);
            break;
        case thiz.game.frightenedMode:
            thiz.frightenedMoving(ghost, pos, direction);
            break;
        case thiz.game.scatterMode:
            thiz.scatterMoving(ghost, pos, direction);
            thiz.ghostEat(ghost, pos);
            break;
        }
        console.log(thiz);
        if (thiz.gameover) { // 614
            clearInterval(thiz.ghostsMoving);
        }
    }

    lengthFunc(homePos, futurePos) {
        return Math.sqrt((futurePos[1] - homePos[1]) * (futurePos[1] - homePos[1]) + (futurePos[0] - homePos[0]) * (futurePos[0] - homePos[0]));

    }

    goToHome(ghost, pos, direction) {
        var naj = 100;
        if (this.choose) {
            this.futureDir[1] = this.futureDir[0];
            this.go(ghost, pos, this.game.wallArray, this.futureDir);
            //direction = this.futureDir[1];
            this.choose = false;
        } else {
            if (this.nextIntersection(direction, pos, this.game.intersectionArray)) {
                this.scatterMoving(ghost, pos, direction);
                for (var i = 37; i < 41; i++) {
                    this.futureDir[1] = i;
                    switch (this.futureDir[1]) {
                    case 37:
                        if (this.nextTile(this.futureDir, pos, this.game.wallArray, ghost)) {
                            this.futurePos[1] = pos[1] - 1;
                            this.futurePos[0] = pos[0];
                            this.length = this.lengthFunc(this.homePos, this.futurePos);
                        }
                        break;
                    case 38:
                        if (this.nextTile(this.futureDir, pos, this.game.wallArray, ghost)) {
                            this.futurePos[0] = pos[0] - 1;
                            this.futurePos[1] = pos[1];
                            this.length = this.lengthFunc(this.homePos, this.futurePos);
                        }
                        break;
                    case 39:
                        if (this.nextTile(this.futureDir, pos, this.game.wallArray, ghost)) {
                            this.futurePos[1] = pos[1] + 1;
                            this.futurePos[0] = pos[0];
                            this.length = this.lengthFunc(this.homePos, this.futurePos);
                        }
                        break;
                    case 40:
                        if (this.nextTile(this.futureDir, pos, this.game.wallArray, ghost)) {
                            this.futurePos[0] = pos[0] + 1;
                            this.futurePos[1] = pos[1];
                            this.length = this.lengthFunc(this.homePos, this.futurePos);
                        }
                        break;
                    }
                    if (naj > this.length && Math.abs(this.futureDir[0] - this.futureDir[1] !== 2)) {
                        naj = this.length;
                        this.futureDir[0] = this.futureDir[1];
                        this.choose = true;
                    }
                }
            }
            else {
                if (pos[0] === 6 && pos[1] === 8) {
                    ghost.classList.remove('ghost-eaten');
                }
                this.scatterMoving(ghost, pos, this.futureDir);
            }
        }
    }

    // Ghost movement when they are in scatter Mode
    scatterMoving(ghost, pos, direction) {

        // While on the next tile is wall or board is ending, change direction
        while (!this.nextTile(direction, pos, this.game.wallArray, ghost)) {
            direction[1] = (Math.floor(Math.random() * 4) + 37);
            // While you want reverse, change direction
            while (Math.abs(direction[0] - direction[1]) === 2) {
                direction[1] = (Math.floor(Math.random() * 4) + 37);
            }
        }

        // If the next tile is intersection
        if (this.nextIntersection(direction, pos, this.game.intersectionArray)) {
            // Go to the next tile
            this.go(ghost, pos, this.game.wallArray, direction);
            // Save old direction
            direction[0] = direction[1];
            // Change direction
            direction[1] = (Math.floor(Math.random() * 4) + 37);
            // While on the next tile is wall or board is ending, change direction
            while (!this.nextTile(direction, pos, this.game.wallArray, ghost)) {
                direction[1] = (Math.floor(Math.random() * 4) + 37);
            }
            // While you want reverse, change direction
            while (Math.abs(direction[0] - direction[1]) === 2) {
                direction[1] = (Math.floor(Math.random() * 4) + 37);
            }
        } else {
            // Go to appointed direction
            this.go(ghost, pos, this.game.wallArray, direction);
        }
        // Save old direction
        direction[0] = direction[1];
    }

    frightenedMoving(ghost, pos, direction) {
        this.scatterMoving(ghost, pos, direction);
    }

    // Check next tile, if there is intersection RETURN TRUE
    nextIntersection(direction, pos, inter) {
        switch (direction[1]) {
            case 37: if (pos[1] > 0 && inter[pos[0]].indexOf(pos[1] - 1) > -1) return true; break; // Left
            case 38: if (pos[0] > 0 && inter[pos[0] - 1].indexOf(pos[1]) > -1) return true; break; // Up
            case 39: if (pos[1] < 16 && inter[pos[0]].indexOf(pos[1] + 1) > -1) return true; break; // Right
            case 40: if (pos[0] < 16 && inter[pos[0] + 1].indexOf(pos[1]) > -1) return true; break; // Down
        }
        return false;
    }

    // Check next tile, if there is no wall and tile is on board RETURN TRUE
    nextTile(direction, pos, wall, ghost) {
        // If there is a wall or board is ending, break and return false
        switch (direction[1]) {
            case 37: if (pos[0] === 7 && pos[1] === 0) {pos[1] = 17; }
                     if (pos[1] > 0 && wall[pos[0]].indexOf(pos[1] - 1) < 0) return true; break; // Left
            case 38: if (pos[0] > 0 && wall[pos[0] - 1].indexOf(pos[1]) < 0) return true; break; // Up
            case 39: if (pos[0] === 7 && pos[1] === 16) {pos[1] = -1;}
                     if (pos[1] < 16 && wall[pos[0]].indexOf(pos[1] + 1) < 0) return true; break; // Right
            case 40: if (pos[0] < 16 && wall[pos[0] + 1].indexOf(pos[1]) < 0) return true; break; // Down
        }
        return false;
    }

    go(ghost, pos, wall, direction) {
        switch (direction[1]) {
            case 37: pos[1]--; ghost.style.left = this.game.step * pos[1] + 'px'; break; // Left
            case 38: pos[0]--; ghost.style.top = this.game.step * pos[0] + 'px'; break; // Up
            case 39: pos[1]++; ghost.style.left = this.game.step * pos[1] + 'px'; break; // Right
            case 40: pos[0]++; ghost.style.top = this.game.step * pos[0] + 'px'; break; // Down
        }
    }

    doNotReverse() {
        while (Math.abs(this.direction[0] - this.direction[1]) === 2) {
            this.direction[1] = (Math.floor(Math.random() * 4) + 37);
        }
    }

    ghostEat(ghost, pos) {
        // If ghost isn't in frightened Mode then enter
        if (!this.game.frightenedMode && this.pacman.pTop.getAttribute('style') !== '') {
            // If ghost is on the same tile sa pacman then enter
            if (this.pacman.position[0] === pos[0] && this.pacman.position[1] === pos[1] && !ghost.classList.contains('ghost-eaten')) {
                // Create game over div and add it to DOM with class game-over
                var gameOverCaption = document.createElement('div');
                gameOverCaption.classList.add('game-over');
                document.querySelector('body').appendChild(gameOverCaption);
                // Show button after 4 seconds
                setTimeout(function () {
                    var againButton = document.createElement('a');
                    againButton.classList.add('again-button');
                    againButton.setAttribute('href', '#');
                    document.querySelector('body').appendChild(againButton);
                    againButton.addEventListener('click', function (event) {
                        location.reload();
                    });
                }, 4000)
                // Stop moving pacman
                this.pacman.pTop.setAttribute('style', '');
                this.pacman.pBottom.setAttribute('style', '');
                clearInterval(this.pacman.pacmanMoving);
                this.gameover = true; // 456
            }
        }
    }


}


/*====================== DOMContentLoaded ======================*/
document.addEventListener('DOMContentLoaded', function () {

    /* CHANGE GAME THEME */
    var lightTheme = document.querySelector('.fa-sun-o');
    var darkTheme = document.querySelector('.fa-moon-o');
    var body = document.querySelector('body');

    darkTheme.addEventListener('click', function(event) {
        darkTheme.classList.add('hide');
        lightTheme.classList.remove('hide');
        body.classList.add('dark-theme');
    })
    lightTheme.addEventListener('click', function(event) {
        lightTheme.classList.add('hide');
        darkTheme.classList.remove('hide');
        body.classList.remove('dark-theme');
    })


    var newGame = new PacmanGame(wallArray, foodArray, bonusArray, intersectionArray, baseArray);

    newGame.createMap();

    var ghost = new GhostElem(newGame);
    var pacman = new PacmanElem(newGame, ghost);
    pacman.addToMap();
    ghost.addPacman(pacman);

    ghost.addToMap();

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
];

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
    [0, 3, 4, 5, 6, 7, 9, 10 ,11 ,12, 13, 16], // Row 11
    [0, 1, 3, 7, 9, 13, 15, 16], // Row 12
    [1, 3, 4, 5, 6, 7, 9, 10, 11, 12, 13, 15], // Row 13
    [0, 1, 2, 3, 5, 11, 13, 14, 15, 16], // Row 14
    [0, 5, 6, 7, 9, 10, 11, 16], // Row 15
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16] // Row 16
];

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
];

var intersectionArray = [
    [3, 13], // Row 0
    [], // Row 1
    [0, 3, 5, 7, 9, 11, 13, 16], // Row 2
    [], // Row 3
    [3, 13], // Row 4
    [], // Row 5
    [7, 9], // Row 6
    [3, 5, 11, 13], // Row 7
    [], // Row 8
    [5, 11], // Row 9
    [], // Row 10
    [3, 5, 11, 13], // Row 11
    [], // Row 12
    [3, 5, 7, 9, 11, 13], // Row 13
    [1, 15], // Row 14
    [], // Row 15
    [5, 11] // Row 16
];

var baseArray = [
    [], // Row 0
    [], // Row 1
    [], // Row 2
    [], // Row 3
    [], // Row 4
    [], // Row 5
    [], // Row 6
    [6, 7, 8, 9, 10], // Row 7
    [6, 7, 8, 9, 10], // Row 8
    [], // Row 9
    [], // Row 10
    [], // Row 11
    [], // Row 12
    [], // Row 13
    [], // Row 14
    [], // Row 15
    [] // Row 16
];

