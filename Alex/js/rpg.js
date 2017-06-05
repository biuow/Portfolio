var canvas = document.getElementById("game");
var ctx = canvas.getContext("2d");
var timer = 5000;
var numberCollect = 1;
var level = 1;
var record = 1;
var mouseX = -1;
var mouseY = -1;
ctx.tabIndex = 1;

window.addEventListener('keydown', function(e){
    move = false;
    x = false;
    y = false;
    var keycode;
    if (window.event) keycode = window.event.keyCode;
    else if (e) keycode = e.which;
    switch(keycode){
        case 37:
            move = true;
            x = 'negative';
        break;
        case 38:
            move = true;
            y = 'negative'
        break;
        case 39:
            move = true;
            x = 'positive'
        break;
        case 40:
            move = true;
            y = 'positive'
        break;
    }
    //if(move){
    //    animation.move(x,y);
    //}
    e.preventDefault();
    return false;
});


var bgReady = false;

var bgimg = new Image();

bgimg.src="image/bg0.png";

bgimg.onload = function(){

	bgReady = true;
	var ptn = ctx.createPattern(bgimg, 'repeat');
	ctx.fillStyle = ptn;
	ctx.fillRect(0,0,canvas.width, canvas.height);
} 

var heroReady = false;

var heroimg = new Image();

heroimg.src="image/hero.png";

heroimg.onload = function(){

	heroReady = true;

} 

var monsterReady = false;

var monsterimg = new Image();

monsterimg.src="image/monster.png";

monsterimg.onload = function(){

	monsterReady = true;

} 


var hero = {
	speed: 256
};

var monster = {};

var monsterCought = 0;

var keysDown = {};

addEventListener("keydown", function(e){
	keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function(e){
	delete keysDown[e.keyCode];
}, false);

var reset = function(){
	//hero.x = canvas.width/2;
	//hero.y = canvas.height/2;

	if(monsterCought == numberCollect){
		level++;
		numberCollect*=2;
		timer = timer + (numberCollect/4)*1000;
		monsterCought = 0;

		if(level > record){
			record = level;
		}

		var rnd = Math.floor(Math.random()*3);

		bgimg.src="image/bg"+rnd+".png";
	}

	monster.x = 32 + (Math.random() * (canvas.width-64));
	monster.y = 32 + (Math.random() * (canvas.height-64));
};

var update = function(modifier){


	timer--;
	
	if(38 in keysDown && hero.y >0){
		hero.y-= hero.speed * modifier;
		mouseX = -1;
		mouseY = -1;
	}
	if(40 in keysDown && hero.y <canvas.height-32){
		hero.y+= hero.speed * modifier;
		mouseX = -1;
		mouseY = -1;
	}
	if(37 in keysDown && hero.x >0){
		hero.x-= hero.speed * modifier;
		mouseX = -1;
		mouseY = -1;
	}
	if(39 in keysDown && hero.x < canvas.width-32){
		hero.x+= hero.speed * modifier;
		mouseX = -1;
		mouseY = -1;
	}

	if(mouseX != -1 && mouseY != -1){
		if(mouseX > hero.x){
			hero.x+= hero.speed * modifier;

		} 

		if (mouseX < hero.x){
			hero.x-= hero.speed * modifier;

		}

		if(mouseY > hero.y){
			hero.y+= hero.speed * modifier;

		} 

		if (mouseY < hero.y){
			hero.y-= hero.speed * modifier;

		}


	}


	
	if (hero.x <= (monster.x + 32) &&
		monster.x <= (hero.x + 32) &&
		hero.y <= (monster.y + 32) &&
		monster.y <= (hero.y + 32)) {
		++monsterCought;
		reset();
	}


	if(timer<0){
		timer = 5000;
		numberCollect = 1;
		level = 1;
		monsterCought = 0;
		hero.x = canvas.width/2;
		hero.y = canvas.height/2;
		bgimg.src="image/bg0.png";
		reset();
	}
};

canvas.addEventListener('mousedown', function(evt) {
        var mousePos = getMousePos(canvas, evt);
        mouseX = (mousePos.x/window.zoomScale);
        mouseY = (mousePos.y/window.zoomScale);
      }, false);

var render = function(){

	if(bgReady){

	var ptn = ctx.createPattern(bgimg, 'repeat');
	ctx.fillStyle = ptn;
	ctx.fillRect(0,0,canvas.width, canvas.height);

	}

	if(heroReady){
		ctx.drawImage(heroimg, hero.x, hero.y);
	}

	if(monsterReady){
		ctx.drawImage(monsterimg, monster.x, monster.y);
	}

ctx.fillStyle = "rgb(250,250,250)";
ctx.font = "12px tahoma";
ctx.textAlign = "left";
ctx.textBaseline = "top";
ctx.fillText("Capturados : "+ monsterCought + " / "+numberCollect, 32, 32);
ctx.fillText("Timer : "+ timer/1000, 32, 64);
ctx.fillText("Level : "+ level, 32, 96);
ctx.fillText("LevelRecorde : "+ record, 32, 128);

};


var main = function(){
	var now = Date.now();
	var delta = now - then;
	update(delta / 1000);
	render();
	then = now;

};

reset();
hero.x = canvas.width/2;
hero.y = canvas.height/2;
var then = Date.now();

setInterval(main, 1);

function getMousePos(canvas, evt) {
        var rect = canvas.getBoundingClientRect();
        return {
          x: evt.clientX - rect.left,
          y: evt.clientY - rect.top
        };
      }