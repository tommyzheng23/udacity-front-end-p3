// Enemies our player must avoid
var Enemy = function(x,y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y + 55;
    this.left = 101;
    this.endOfGrid = this.left * 5;
    this.speed = speed;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (this.x < this.endOfGrid){
        this.x += this.speed * dt;
    }

    else {
        this.x = -101;
    }

};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

class Hero {
    constructor(){
        this.left = 101;
        this.up=83;
        this.xStart = this.left * 2;
        this.yStart = (this.up * 4) + 55;    
        this.x = this.xStart;
        this.y = this.yStart;
        this.win = false;
        this.sprite = 'images/char-pink-girl.png';
    }

   //render character on x and y coordinates
    render(){
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    // move character by adjusting her x and y coordinates
    handleInput(input){
        switch(input){
            case 'left':
                if (this.x > 0){
                    this.x -=this.left;
                }
                break;
            case 'right':
                if (this.x < 404){
                   this.x +=this.left;
                }
                break;
            case 'up':
                if (this.y > 0){
                    this.y -=this.up;
                }
                break;
            case 'down':
                if (this.y < 332){
                    this.y +=this.up;
                }
                break;
        }
    }

    update() {
        //detect if enemy hits character
        for (let enemy of allEnemies){
            if (this.y === enemy.y && (enemy.x + enemy.left/2 > this.x && enemy.x < this.x + this.left/2)){
                this.reset();
                }
            }

        //check if character won
        if (this.y < 0){
            setTimeout(()=>{
                this.reset();
            },1000);  
        }
    }    

    reset(){
        this.x = this.xStart;
        this.y = this.yStart; 
    }  

};




const player = new Hero();
const enemy1 = new Enemy (-101,0, 200);
const enemy2 = new Enemy(-101,83, 300);
const enemy3 = new Enemy(-252, 166, 350);
const allEnemies = [];
allEnemies.push(enemy1,enemy2,enemy3);
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
