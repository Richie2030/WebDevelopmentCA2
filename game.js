let canvas;
let context;
let xhttp;
let request_id;
let fpsInterval = 1000 / 30;
let now;
let then = Date.now();

let player = {
    x : 370,
    y : 120,
    width : 36,
    height : 37,
    frameX : 0,
    frameY : 0,
    xChange : 4,
    yChange : 4,
    size : 10,
    health:100
};

let enemies = [];
let fireball = [];

let fireCooldown = 0;

let score = 0;


            
let moveLeft = false;
let moveRight = false;
let moveUp = false;
let moveDown = false;
let space = false;

let playerImage = new Image();
let backgroundImage = new Image();
let enemiesImage = new Image();
let fireballImage = new Image();
let Music = new Audio ("a.mp3");

let tilesPerRow = 12;
let tileSize = 16;

let background = [
    [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 14, 1, 1, 1, 1, 1, 1, 1, 1, ],
    [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 14, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 14, 1, 1, 1, 1, 1, 1, 1, 26, 1, 1, 1, 1 ,1],
    [ 1, 1, 1, 38, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 26, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [ 1, 1, 1, 1, 1, 1, 26, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 38, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 14, 1, 1, 1, 26, 1, 1],
    [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 14, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 14, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 38, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 38, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [ 1, 1, 14, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 26, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 26, 1, 1, 1, 1, 1, 1, 1, 1,14, 1, 1, 1, 1, 1, 1, 1, 26, 1, 1, 1, 1, 1, 1, 1],
    [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 38, 1, 1, 1, 14, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 38, 1, 1, 1, 1, 1, 1, 1, 1],
    [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [ 1, 1, 1, 26, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 38, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 14, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 26, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 14, 1, 1, 1, 1, 1, 1, 1, 26, 1, 1, 1, 1, 1, 1, 1, 14, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 38, 1, 1, 1],
    [ 1, 1, 1, 1, 1, 38, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 38, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
]

document.addEventListener("DOMContentLoaded", init, false);


function init() {
    canvas = document.querySelector("canvas");
    context = canvas.getContext("2d");

    playerImage.src = "player.png";
    backgroundImage.src = "background.png";
    enemiesImage.src = "enemies.png"
    fireballImage.src = "fireball.png"

    window.addEventListener("keydown", activate, false);
    window.addEventListener("keyup", deactivate, false);

    load_assets([
        {"var": playerImage, "url" : "player.png"},
        {"var" : backgroundImage, "url" : "background.png"},
        {"var" : enemiesImage, "url" : "enemies.png"},
        {"var" : fireballImage, "url" : "fireball.png"}
    ], draw);
    Music.play();
}

    
function draw() {
    request_id = window.requestAnimationFrame(draw);
    let now = Date.now();
    let elapsed = now - then;
    if (elapsed <= fpsInterval) {
        return;
    }
   then = now - (elapsed % fpsInterval);

   context.clearRect(0, 0, canvas.width, canvas.height);
    
    //Background
   for (let r = 0; r < 20; r+= 1) {
        for (let c = 0; c < 52; c += 1) {
            let tile = background[r][c];
            if (tile >= 0) {
                let tileRow = Math.floor(tile / tilesPerRow);
                let tileCol = Math.floor(tile % tilesPerRow);
                context.drawImage(backgroundImage,
                    tileCol * tileSize, tileRow * tileSize, tileSize, tileSize,
                    c * tileSize, r * tileSize, tileSize, tileSize);
            }
        }
    }

    //Player
    // context.fillStyle = "cyan"
    // context.fillRect(player.x, player.y, player.size, player.size);

    context.drawImage(playerImage,
        player.width * player.frameX, player.height * player.frameY, player.width, player.height,
        player.x, player.y, player.width, player.height );
    
    
    if (moveLeft || moveRight || moveUp || moveDown) {
        player.frameX = (player.frameX + 1) % 6;
    }

    if (moveLeft) {
        player.x = player.x - player.xChange;
        player.frameY = 3;
        if (player.x <= 0) {
            player.x = 0;
        }
    }
    if (moveUp) {
        player.y = player.y - player.yChange;
        player.frameY = 1;
        if (player.y <= 0) {
            player.y = 0;
        }
    }

    if (moveRight) {
        player.x = player.x + player.xChange;
        player.frameY = 2;
        if (player.x + player.width >= canvas.width) {
            player.x = canvas.width - player.width;
        }
    }

    if (moveDown) {
        player.y = player.y + player.yChange;
        player.frameY = 0;
        if (player.y + player.height >= canvas.height) {
            player.y = canvas.height - player.height;
        }
    }
    

    // player.xChange = player.xChange * 0.90;
    // player.yChange = player.yChange * 0.90;


    // if (player.x + width > canvas.width) {
    //     player.x = canvas.width - width;
    // }

    // if (player.y + height > canvas.height) {
    //     player.y = canvas.height - height;
    // }

    // player.x += player.xChange;
    // player.y += player.yChange;



    //enemies

    if (enemies.length < 100) {
        let e = {
            size : 10,
            width : 36,
            height : 36,
            xChange : 0,
            yChange : 0,
            frameX : 0,
            frameY : 0
        };
        let direction = randint(1, 2); // Enemies will spawn from left or right

        //https://www.w3schools.com/js/js_switch.asp

        switch(direction) {
            case 1: // Spawn from left
                e.x = 0;
                e.y = randint(0, canvas.height);
                break;
            case 2: // Spawn from right
                e.x = canvas.width + 0;
                e.y = randint(0, canvas.height);
                break;
        }
        
        enemies.push(e);
    }



    for (let e of enemies) {

        context.drawImage(enemiesImage,
            e.width * e.frameX, e.height * e.frameY, e.width, e.height,
            e.x, e.y, 30, 30 );

        // Calculate distance between player and enemy
        let dx = player.x - e.x;
        let dy = player.y - e.y;
        let distance = Math.sqrt(dx*dx + dy*dy);

        // Move enemy towards player if player is within a certain distance
        if (distance < 99999) {
            e.x += (dx/distance) * 2;
            e.y += (dy/distance) * 2;
        }

        else {
            if (e.x + e.size < 0) {
                e.x = canvas.width;
                e.y = randint(0, canvas.height);
            } else {
                e.x = e.x + e.xChange;
                e.y = e.y + e.yChange;
            }
        }
    }

    // e.x += e.xChange;
    // e.y += e.yChange;

    // for (let e of enemies) {
    //     e.xChange = e.xChange + randint(-1,1)
    //     e.yChange = e.yChange + randint(-1,1)
    // }

    for (let e of enemies) {
        if (player_collides(e)) {
            stop();
            return;
        }
    }

    //Fireball

    for (let f of fireball) {
        context.drawImage(fireballImage,
            f.width * f.frameX, f.height * f.frameY, f.width, f.height,
            f.x, f.y, 20, 20 );
    }
    for (let f of fireball) {
        f.x = f.x + f.xChange;
        f.y = f.y + f.yChange;
    }
    

    if (space && Date.now() > fireCooldown) {
        let f = {
            x : player.x + 25,
            y : player.y,
            size : 30,
            width : 40,
            height : 40,
            xChange : 0,
            yChange : 0,
            frameX : 0,
            frameY : 0
        };

        let fireIdle = randint(1, 2)
        
        if (moveLeft) {
            f.xChange = (randint(-5, -10))

        }else if (moveRight) {
            f.xChange = (randint(5, 10))

        }else {
            switch(fireIdle) {
                case 1: 
                f.xChange = (randint(-5, -10));
                    break;
                case 2: 
                f.xChange = (randint(5, 10));
                    break;
            }
           
        }
        fireball.push(f);
        fireCooldown = Date.now() + 50; // 50ms cooldown period
    }

    
    // Deletes fireballs off canvas
    for (let f of fireball) {
        if (f.x + f.width >= canvas.width - 10 || f.x <= 10) {
            let position = fireball.indexOf(f)
            fireball.splice(position, 1)
        };
    };

    
    for (let f of fireball) {
        for (let e of enemies) {
            if (fireball_collides(e, f)) {
                let position = fireball.indexOf(f);
                fireball.splice(position, 1);
                position = enemies.indexOf(e);
                enemies.splice(position, 1);
                score = score + 1

            };
        };
    };

    // max_enemies -= 1
                // score = score + round
                // if (max_enemies === 0) {
                //     round += 1
                //     max_enemies = round * 10
                // };

    

    // Borders
    // if (player.y + player.height > canvas.height) {
    //     player.y = canvas.height - player.height;
    //     player.yChange = 0;
    // }
    // else if (player.x + player.width > canvas.width) {
    //     player.x = canvas.width - player.width;
    //     player.xChange = 0;
    // }
    // else if (player.y < 0) {
    //     player.y = 0;
    //     player.yChange = 0;
    // }
    // else if (player.x < 0) {
    //     player.x = 0;
    //     player.xChange = 0;
    // }


}

function randint(min, max) {
    return Math.round(Math.random() * (max - min)) + min;
}



function player_collides(e) {
    if (player.x + player.size < e.x ||
        e.x + e.height < player.x ||
        player.y > e.y + e.height ||
        e.y > player.y + player.size) {
            return false;
        } else {
            return true;
        }
}



function fireball_collides(e, f) {
    if (e.x + e.width < f.x || 
        f.x + f.width < e.x || 
        e.y > f.y + f.height || 
        f.y > e.y + e.height) {
        return false;
    } else {
        return true;
    }
}




function activate(event) {
    let key = event.key;

    if (key === ' ') {
        space = true;

    }if (key === "ArrowLeft") {
        moveLeft = true;
    } else if (key === "ArrowUp") {
        moveUp = true;
    } else if (key === "ArrowRight") {
        moveRight = true;
    } else if (key === "ArrowDown") {
        moveDown = true;
    }
}

function deactivate(event) {
    let key = event.key;
    if (key === ' ') {
        space = false;
        
    }if (key === "ArrowLeft") {
        moveLeft = false;
    } else if (key === "ArrowUp") {
        moveUp = false;
    } else if (key === "ArrowRight") {
        moveRight = false;
    } else if (key === "ArrowDown") {
        moveDown = false;
    }
}

function load_assets(assets, callback) {
    let num_assets = assets.length;
    let loaded = function() {
        console.log("loaded");
        num_assets = num_assets - 1;
        if (num_assets === 0) {
            callback();
        }
    };
    for (let asset of assets) {
        let element = asset.var;
        if (element instanceof HTMLImageElement ) {
            console.log("img")
            element.addEventListener("load", loaded, false);
        }
        else if (element instanceof HTMLAudioElement ) {
            console.log("audio");
            element.addEventListener("canplaythrough", loaded, false);
        }
        element.src = asset.url
    }
}






function stop(outcome) {

    window.cancelAnimationFrame(request_id);
    window.removeEventListener("keydown", activate);
    window.removeEventListener("keyup", deactivate);


    let outcome_element = document.querySelector("#outcome");
    outcome_element.innerHTML =  "Score: " +score;


    let data = new FormData();
    data.append("score", score);

    xhttp = new XMLHttpRequest();
    xhttp.addEventListener("readystatechange", handle_response, false);
    xhttp.open("POST", "../run.py/store_score", true);
    xhttp.send(data);
}
// function handle_response() {
//     if (xhttp.readyState === 4) {
//         if (xhttp.status === 200) {
//             if (xhttp.responseText === "success") {
//                 console.log("Yes")
//             }
//             else {
//                 console.log("No")
//             }
//         }
//     }
// 