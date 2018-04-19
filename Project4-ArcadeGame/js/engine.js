/* Engine.js
 * This file provides the game loop functionality (update entities and render),
 * draws the initial game board on the screen, and then calls the update and
 * render methods on your player and enemy objects (defined in your app.js).
 *
 * A game engine works by drawing the entire game screen over and over, kind of
 * like a flipbook you may have created as a kid. When your player moves across
 * the screen, it may look like just that image/character is moving or being
 * drawn but that is not the case. What's really happening is the entire "scene"
 * is being drawn over and over, presenting the illusion of animation.
 *
 * This engine makes the canvas' context (ctx) object globally available to make 
 * writing app.js a little simpler to work with.
 */
var Engine = (function (global) {
    /* Predefine the variables we'll be using within this scope,
     * create the canvas element, grab the 2D context for that canvas
     * set the canvas elements height/width and add it to the DOM.
     */
    var doc = global.document,
        win = global.window,
        canvas = doc.createElement('canvas'),
        ctx = canvas.getContext('2d'),
        lastTime,
        scoreText = doc.getElementById('score'),
        livesText = doc.getElementById('lives'),
        startButton = doc.getElementById('startbutton'),
        scoreCount = 0,
        canvasContainer = doc.getElementById('canvascontainer'),
        raf = 0,
        rowImagesOriginal = [
                'images/water-block.png', // Top row is water
                'images/stone-block.png', // Row 1 of 3 of stone
                'images/stone-block.png', // Row 2 of 3 of stone
                'images/stone-block.png', // Row 3 of 3 of stone
                'images/grass-block.png', // Row 1 of 2 of grass
                'images/grass-block.png' // Row 2 of 2 of grass
            ],
        rowImages = [
                'images/water-block.png', // Top row is water
                'images/stone-block.png', // Row 1 of 3 of stone
                'images/stone-block.png', // Row 2 of 3 of stone
                'images/stone-block.png', // Row 3 of 3 of stone
                'images/grass-block.png', // Row 1 of 2 of grass
                'images/grass-block.png' // Row 2 of 2 of grass
            ],
        rowImagesWin = [
                'images/Star.png', // Top row is water
                'images/Star.png', // Row 1 of 3 of stone
                'images/Star.png', // Row 2 of 3 of stone
                'images/Star.png', // Row 3 of 3 of stone
                'images/Star.png', // Row 1 of 2 of grass
                'images/Star.png' // Row 2 of 2 of grass
            ],
        rowImagesLost = [
            'images/enemy-bug.png',
            'images/enemy-bug.png',
            'images/enemy-bug.png',
            'images/enemy-bug.png',
            'images/enemy-bug.png',
            'images/enemy-bug.png',
        ]
    livesCount = 3;

    canvas.width = 505;
    canvas.height = 606;
    doc.getElementById('canvas').appendChild(canvas);


    /* This function serves as the kickoff point for the game loop itself
     * and handles properly calling the update and render methods.
     */
    function main() {
        /* Get our time delta information which is required if your game
         * requires smooth animation. Because everyone's computer processes
         * instructions at different speeds we need a constant value that
         * would be the same for everyone (regardless of how fast their
         * computer is) - hurray time!
         */
        var now = Date.now(),
            dt = (now - lastTime) / 1000.0;

        /* Call our update/render functions, pass along the time delta to
         * our update function since it may be used for smooth animation.
         */
        update(dt);
        render();

        /* Set our lastTime variable which is used to determine the time delta
         * for the next time this function is called.
         */
        lastTime = now;

        /* Use the browser's requestAnimationFrame function to call this
         * function again as soon as the browser is able to draw another frame.
         */

        raf = win.requestAnimationFrame(main);
    }

    /* This function does some initial setup that should only occur once,
     * particularly setting the lastTime variable that is required for the
     * game loop.
     */
    //document.getElementById('startbutton').addEventListener('click', init()
    function init() {
        lastTime = Date.now();
        main();
    }

    /* This function is called by main (our game loop) and itself calls all
     * of the functions which may need to update entity's data. Based on how
     * you implement your collision detection (when two entities occupy the
     * same space, for instance when your character should die), you may find
     * the need to add an additional function call here. For now, we've left
     * it commented out - you may or may not want to implement this
     * functionality this way (you could just implement collision detection
     * on the entities themselves within your app.js file).
     */
    let collision = false;

    function update(dt) {
        addNewEnemies();
        updateEntities(dt);
        checkCollisions();
        addScore();
        checkWinLose();
    };
    //check if winning or losing conditions are met
    function checkWinLose() {
        if (scoreCount === 5) {
            wonGame();
        } else if (livesCount === 0) {
            lostGame();
        }
    };

    function addScore() {
        if (player.y === -15) {
            scoreCount++;
            score.textContent = 'Score ' + scoreCount;
            position = [202, 435];
        }
    };
    //A function containing events that should happen when the winning condition is met
    function wonGame() {
        rowImages = rowImagesWin;
        allEnemies = [];
        render();
        swal("Great job!", "You won the game!", "success");
        cancelAnimationFrame();
    };

    //events in case of losing game
    function lostGame() {

        swal("You lost!", "Sorry about that!", "error");
        rowImages = rowImagesLost;
        allEnemies = [];
        position = [150, 150];
        render();
        cancelAnimationFrame();
    };
    /* This is called by the update function and loops through all of the
     * objects within your allEnemies array as defined in app.js and calls
     * their update() methods. It will then call the update function for your
     * player object. These update methods should focus purely on updating
     * the data/properties related to the object. Do your drawing in your
     * render methods.
     */
    function updateEntities(dt) {
        allEnemies.forEach(function (enemy) {
            enemy.update(dt);
        });
        player.update();
    }
    //Check if collision happened and implement changes in that case. Player returns
    //to starting position, lives are -1 and player gets a warning message.
    function checkCollisions() {
        collision = allEnemies.some(EnemyPlayerCollisionDetector);
        if (collision === true) {
            position = [202, 435];
            livesCount--;
            swal("You have been eaten by a bug!", "Be careful you have " + livesCount + " lives left!", "warning");
            livesText.textContent = 'Lives ' + livesCount;
        }
    };

    //Function for checking for conditions for enemy objects colliding with the player object    
    function EnemyPlayerCollisionDetector(enemy) {
        return (enemy.x < player.x + player.width &&
            enemy.x + enemy.width > player.x &&
            enemy.y < player.y + player.height &&
            enemy.height + enemy.y > player.y);
    }

    //function adding enemies randomly on different lanes and assigning random speed to them
    function addNewEnemies() {
        counter = 0;
        while (counter < 4) {
            chanceNumber = randomNumberGenerator(45);
            let distanceCheck = filterTooCloseDistance();
            if (chanceNumber === 1 && allEnemies.length < 9 && distanceCheck.length == 0) {
                let randomEnemy = new Enemy();
                randomEnemy.speed = (randomNumberGenerator(5) + 1) * 65;
                randomEnemy.y = 65 + counter * 83;
                randomEnemy.lane = counter;
                allEnemies.push(randomEnemy);
            }
            counter++;
        }
    };

    // This function makes sure the bugs don't appear too close to each other
    function filterTooCloseDistance() {
        var result = allEnemies.filter(function (enemy) {
            if (enemy.lane == counter && enemy.x < 400) {
                return true;
            } else {
                return false;
            }
        });
        return result;
    };

    //Generates a random number between zero and max.
    let randomNumberGenerator = function (max) {
        return Math.floor(Math.random() * Math.floor(max));
    }



    /* This function initially draws the "game level", it will then call
     * the renderEntities function. Remember, this function is called every
     * game tick (or loop of the game engine) because that's how games work -
     * they are flipbooks creating the illusion of animation but in reality
     * they are just drawing the entire screen over and over.
     */
    function render() {
        /* This array holds the relative URL to the image used
         * for that particular row of the game level.
         */
        var numRows = 6,
            numCols = 5,
            row, col;

        // Before drawing, clear existing canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height)

        /* Loop through the number of rows and columns we've defined above
         * and, using the rowImages array, draw the correct image for that
         * portion of the "grid"
         */
        for (row = 0; row < numRows; row++) {
            for (col = 0; col < numCols; col++) {
                /* The drawImage function of the canvas' context element
                 * requires 3 parameters: the image to draw, the x coordinate
                 * to start drawing and the y coordinate to start drawing.
                 * We're using our Resources helpers to refer to our images
                 * so that we get the benefits of caching these images, since
                 * we're using them over and over.
                 */
                ctx.drawImage(Resources.get(rowImages[row]), col * 101, row * 83);
            }
        }

        renderEntities();
    }

    let renderDelay = 0;

    /* This function is called by the render function and is called on each game
     * tick. Its purpose is to then call the render functions you have defined
     * on your enemy and player entities within app.js
     */
    function renderEntities() {
        /* Loop through all of the objects within the allEnemies array and call
         * the render function you have defined.
         */
        allEnemies.forEach(function (enemy) {
            enemy.render();
        });
        player.render();
    };


    /* Go ahead and load all of the images we know we're going to need to
     * draw our game level. Then set init as the callback method, so that when
     * all of these images are properly loaded our game will start.
     */
    Resources.load([
        'images/stone-block.png',
        'images/water-block.png',
        'images/grass-block.png',
        'images/enemy-bug.png',
        'images/char-boy.png',
        'images/char-cat-girl.png',
        'images/Star.png'
    ]);


    //this is a one time event handler to start the game, make the canvas appear and change the start button
    //to restart button
    let starter = function (e) {

        e.target.removeEventListener(e.type, arguments.callee);
        init();
        canvasContainer.classList.toggle('d-none');
        startButton.innerHTML = "Restart Game";


        startButton.addEventListener('click', restart);


    };

    let start = function () {
        startButton.addEventListener('click', starter);
    }
    let restart = function () {
        rowImages = rowImagesOriginal;
        position = [202, 435];
        allEnemies = [];
        livesCount = 3;
        scoreCount = 0;
        livesText.textContent = 'Lives ' + livesCount;
        scoreText.textContent = 'Score ' + scoreCount;
        init();
    }

    Resources.onReady(start);

    /* Assign the canvas' context object to the global variable (the window
     * object when run in a browser) so that developers can use it more easily
     * from within their app.js files.
     */
    global.ctx = ctx;
})(this);
