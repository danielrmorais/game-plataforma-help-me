// @ = Player
// o = Coin
// LAVA PARADA " ! "
// MOVIMENTAÇÃO HORIZONTAL DA LAVA " = " 
// MOVIMENTAÇÃO VERTICAL DA LAVA " | "
// MOVIMENTAÇÃO DE LOOP, CHEGOU ATÉ O TETO, VOLTA AO PONTO DE ORIGEM.. RESPINGO " v " = Lava
// x = chao
// CRIA ESPAÇO AO LEVEL "				"

var LEVELS=[];
LEVELS[0]=[
  "                                 ",
  "@                      =o        ",
  "xx xx xxxxxxxxxxxxxxxxxxxxxxxxxxx",
  "o     x!!!          =           x",
  "                                o",
  "                                 ",
  "x!x              !=o             ",
  "    x|xxxxxxxxxxxxxxxxxxxxxxxxx x",
  "     |xx=                   o   x",
  "o xx!oxxo                      =x",
  "xxxo                            x",
  "xxx      |xxxxxxxx xxxxxxx xxxxxx",
  "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"  
];


LEVELS[1]=[
  "o              x=      x        o",
  "                       xo        ",
  "  @                    x         ",
  "  x     o        o     |      !xx",
  "!!x                          ox |",
  "xxx          !xxx           xxx  ",
  "             x!!!    o       |  o",
  "   o       xxx      xxx          ",
  "                      !    x     ",
  "o                |           o   ",
  "        x  |     x    o  x    xx ",
  "x!!x!!!!x= o     x!     !x       ",
  "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx" 
];


LEVELS[2]=[
  "=                        x=      ",
  "      o                   vxxx  o",
  "           xxxo           x     x",
  "   x       x|xx           !    xx",
  "@ xv       x x x       |  !o     ",
  "x xo         o         o  !      ",
  "                  x    x!!!x!xx  ",
  "     x         o x           o   ",
  " x    x     x  x|   x           x",
  "o       o          = o         x ",
  "x       =xx =        x  xxx x x  ",
  "!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!",
  "!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!"
];


LEVELS[3]=[
  "                !!  | o                                              |                                           vv      v       !!!",
  "   |                                             o                    o                                                             ",
  " o      oxxxxx            = o                    x     o              x        x                             o                      ",
  "     xxxx!!v!           x                           o                 v        v                  o         xx                      ",
  "     x !x     x     x                                           x x     x                                                           ",
  "     x| x  o  !     v           o                 x       x     v !!          x                    |    xx                          ",
  "     x ox         x          xx                                 !!!!!!!!!!!!!!!                                                    o",
  "     x  !         !                                                                            x     x                            xx",
  "   o            x      x           x!!  x      x        x   xo                        x       xx|    xx        o                    ",
  "               x        x       = xx   =     x!!!!!!!!!!!!!!!x                                   |  |          x      x      x  |   ",
  "@    o        xxo=       ox      xxx o     !xx!!!!!!!!!!!!!!!x                     x!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!",
  "xxx |xxxxxx  xxxxxx!!!xxxxxxxxxxxxxxxxxxxx!!xxxxxxxxxxxxxxxx!!xx xxxxxxxxoxxx x xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
  "xxx!!xxxxxx!!xxxxxx!!!xxxxxxxxxxxxxxxxxxxx!!xxxxxxxxxxxxxxxx!!xxxxxxxxxxxxxxxxx xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
];


LEVELS[4]=[
  "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
  "x      x=                      vx",
  "x@     xo      =              o x",
  "xxxxxx xxxxxx  xxxxxxxxxxxxxxx  x",
  "x! o !                          x",
  "x!   !                           ",
  "xxxx xxx!xxxxxxxxxxxxxxx  xx x   ",
  "xo   x!o =                 |    o",
  "x    x!                     o   x",
  "x! xxxxxxxxxxxxxxxxxxxxxxxxxx|  x",
  "x!                              x",
  "x!                             |x",
  "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx" 
];


LEVELS[5]=[
  "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
  "x               x              vx",
  "x               x               x",
  "x   o  x  o     v    o          x",
  "   xx    xxx        xxx         x",
  "           !        !          ox",
  "x      |                   xxxxxx",
  "x @                            vx",
  "x!x!!  o            x         o x",
  "x!x!   x    xx= o       !xx     x",
  "x!x!o  !   x!!  x!!    xx    xx x",
  "x!x!xx!!!!!x!!!!x!!!!!!!!!!!!!!!x",
  "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx" 
];


var moedas = 0;
var relogio = 90;

 

function pontos()
{
 	var txtponto = document.getElementById("txtponto");
	txtponto.innerHTML =" Pontos: "+moedas;

	var tempo = document.getElementById("tempo");
	tempo.innerHTML =" Tempo: "+relogio;
	relogio--; 
	setTimeout(pontos, 1000);
}
pontos();


function Level(plan)
{
	this.width = plan[0].length;
	this.height = plan.length;
	this.grid = [];
	this.actors = [];
	
	for (var y = 0; y < this.height; y++)
		{
			var line = plan[y], gridLine = [];
			for (var x = 0; x < this.width; x++)
				{
					var ch = line[x], fieldType = null;
					var Actor = actorChars[ch];
					if (Actor)
						this.actors.push(new Actor(new Vector(x, y), ch));
					else if (ch == "x")
						fieldType = "wall";
					else if (ch == "!")
						fieldType = "lava";
					gridLine.push(fieldType);
				}
			this.grid.push(gridLine);
		}
	
	this.player = this.actors.filter(function(actor){
		return actor.type == "player";
	})[0];
	this.status = this.finishDelay = null;
}

Level.prototype.isFinished = function()
{
	return this.status != null && this.finishDelay < 0;
};
function Vector(x, y)
{
	this.x = x;
	this.y = y;
}
Vector.prototype.plus = function(other)
{
	return new Vector(this.x + other.x, this.y + other.y);
};
Vector.prototype.times = function(factor)
{
	return new Vector(this.x * factor, this.y * factor);
};
var actorChars = {
	"@": Player,
	"o": Coin,
	"=": Lava, "|": Lava, "v": Lava
};
function Player(pos)
{
	this.pos = pos.plus(new Vector( 0, -0.3)); //POSIÇÃO ONDE NASCE
	this.size = new Vector(0.83, 1.3); //TAMANHO DO PLAYER
	this.speed = new Vector(0, 0);
}
Player.prototype.type = "player";
function Lava(pos, ch)
{
	this.pos = pos;
	this.size = new Vector(1, 1);
	if(ch == "=")
		this.speed = new Vector(2, 0);
	else if (ch == "|")
		this.speed = new Vector(0, 2);
	else if (ch == "v")
		{
			this.speed = new Vector(0, 3);
			this.repeatPos = pos;
		}
}
Lava.prototype.type = "lava";
function Coin(pos)
{
	this.basePos = this.pos = pos.plus(new Vector(0.3, 0.3)); //POSIÇÃO DA MOEDA
	this.size = new Vector(0.46, 0.53); //TAMANHO DA MOEDA
	this.wobble = Math.random() * Math.PI * 2;
}
Coin.prototype.type = "coin";

function elt(name, className)
{
	var elt = document.createElement(name);
	if (className) elt.className = className;
	return elt;
}

function DOMDisplay(parent, level)
{
	this.wrap = parent.appendChild(elt("div", "game"));
	this.level = level;
	
	this.wrap.appendChild(this.drawBackground());
	this.actorLayer = null;
	this.drawFrame();
}

var scale = 40;

DOMDisplay.prototype.drawBackground = function()
{
	var table = elt("table", "background");
	table.style.width = this.level.width * scale + "px";
	this.level.grid.forEach(function(row)
	{
		var rowElt = table.appendChild(elt("tr"));
		rowElt.style.height = scale + "px";
		row.forEach(function(type)
		{
			rowElt.appendChild(elt("td", type));
		});
	});
	return table;
};
DOMDisplay.prototype.drawActors = function()
{
	var wrap = elt("div");
	this.level.actors.forEach(function(actor)
	{
		var rect = wrap.appendChild(elt("div", "actor " + actor.type));
		rect.style.width = actor.size.x * scale + "px";
		rect.style.height = actor.size.y * scale + "px";
		rect.style.left = actor.pos.x * scale + "px";
		rect.style.top = actor.pos.y * scale + "px";
	});
	return wrap;
};
DOMDisplay.prototype.drawFrame = function()
{
	if(this.actorLayer)
		this.wrap.removeChild(this.actorLayer);
	this.actorLayer = this.wrap.appendChild(this.drawActors());
	this.wrap.className = "game " + (this.level.status || "");
	this.scrollPlayerIntoView();
};
DOMDisplay.prototype.scrollPlayerIntoView = function()
{
	var width = this.wrap.clientWidth;
	var height = this.wrap.clientHeight;
	var margin = width / 3;
	
	var left = this.wrap.scrollLeft, right = left + width;
	var top = this.wrap.scrollTop, bottom = top + height;
	
	var player = this.level.player;
	var center = player.pos.plus(player.size.times(0.5)).times(scale);
	
	if(center.x < left + margin)
		this.wrap.scrollLeft = center.x - margin;
	else if (center.x > right - margin)
		this.wrap.scrollLeft = center.x + margin - width;
	if(center.y < top + margin)
		this.wrap.scrollTop = center.y - margin;
	else if(center.y > bottom - margin)
		this.wrap.scrollTop = center.y + margin - height;
};
DOMDisplay.prototype.clear = function()
{
	this.wrap.parentNode.removeChild(this.wrap);
};
Level.prototype.obstacleAt = function(pos, size)
{
	var xStart = Math.floor(pos.x);
	var xEnd = Math.ceil(pos.x + size.x);
	var yStart = Math.floor(pos.y);
	var yEnd = Math.ceil(pos.y + size.y);
	
	if(xStart < 0 || xEnd > this.width || yStart < 0)
		return "wall";
	if(yEnd > this.height)
		return "lava";
	for(var y = yStart; y < yEnd; y++)
		{
			for(var x = xStart; x < xEnd; x++)
				{
					var fieldType = this.grid[y][x];
					if (fieldType) return fieldType;
				}
		}
};
Level.prototype.actorAt = function(actor)
{
	for(var i = 0; i < this.actors.length; i++)
		{
			var other = this.actors[i];
			if (other != actor && actor.pos.x + actor.size.x > other.pos.x && actor.pos.x < other.pos.x + other.size.x && actor.pos.y + actor.size.y > other.pos.y && actor.pos.y < other.pos.y + other.size.y)
				return other;
		}
};
var maxStep = 0.05;
Level.prototype.animate = function(step, keys)
{
	if(this.status != null)
		this.finishDelay -= step;
	
	while(step > 0)
		{
			var thisStep = Math.min(step, maxStep);
			this.actors.forEach(function(actor)
			{
				actor.act(thisStep, this, keys);
			}, this);
			step -= thisStep;
		}
};
Lava.prototype.act = function(step, level)
{
	var newPos = this.pos.plus(this.speed.times(step));
	if(!level.obstacleAt(newPos, this.size))
		this.pos = newPos;
	else if(this.repeatPos)
		this.pos = this.repeatPos;
	else
		this.speed = this.speed.times(-1);
};
var wobbleSpeed = 8, wobbleDist = 0.07;

Coin.prototype.act = function(step)
{
	this.wobble += step * wobbleSpeed;
	var wobblePos = Math.sin(this.wobble) * wobbleDist;
	this.pos = this.basePos.plus(new Vector(0, wobblePos));
};
var PlayerXSpeed = 7;
Player.prototype.moveX = function(step, level, keys)
{
	this.speed.x = 0;
	if(keys.left) this.speed.x -= PlayerXSpeed;
	if(keys.right) this.speed.x += PlayerXSpeed;
	
	var motion = new Vector(this.speed.x * step, 0);
	var newPos = this.pos.plus(motion);
	var obstacle = level.obstacleAt(newPos, this.size);
	if(obstacle)
		level.playerTouched(obstacle);
	else
		this.pos = newPos;
};
var gravity = 30;
var jumpSpeed = 15;

Player.prototype.moveY = function(step, level, keys)
{
	this.speed.y += step * gravity;
	var motion = new Vector(0, this.speed.y * step);
	var newPos = this.pos.plus(motion);
	var obstacle = level.obstacleAt(newPos, this.size);
	if(obstacle)
		{
			level.playerTouched(obstacle);
			if(keys.up && this.speed.y > 0)
				this.speed.y = -jumpSpeed;
			else
				this.speed.y = 0;
		}
	else
		{
			this.pos = newPos;
		}
};
Player.prototype.act = function(step, level, keys)
{
	this.moveX(step, level, keys);
	this.moveY(step, level, keys);
	
	var otherActor = level.actorAt(this);
	if(otherActor)
		level.playerTouched(otherActor.type, otherActor);
	
	if(level.status == "lost")
		{
			this.pos.y += step;
			this.size.y -= step;
		}
};
Level.prototype.playerTouched = function(type, actor)
{

	if (relogio <= 0)
	{
	    this.status = "lost";
	    this.finishDelay = 0.5;
	}

	if(type == "lava" && this.status == null)
		{
			this.status = "lost";
			this.finishDelay = 0.5;
		}
	else if(type == "coin")
		{
			moedas++;
			txtponto.innerHTML ="Pontos: "+moedas;

			this.actors = this.actors.filter(function(other)
			{
				return other != actor;
			});
			if(!this.actors.some(function(actor)
			{
				return actor.type == "coin";
			}))
				{
					this.status = "won";
					this.finishDelay = 0.5;
				}
		}
};
var arrowCodes = {37: "left", 38: "up", 39: "right"};

function trackKeys(codes)
{
	var pressed = Object.create(null);
	function handler(event)
	{
		if(codes.hasOwnProperty(event.keyCode))
			{
				var down = event.type == "keydown";
				pressed[codes[event.keyCode]] = down;
				event.preventDefault();
			}
	}
	addEventListener("keydown", handler);
	addEventListener("keyup", handler);
	return pressed;
}
function runAnimation(frameFunc)
{
	var lastTime = null;
	function frame(time)
	{
		var stop = false;
		if(lastTime != null)
			{
				var timeStep = Math.min(time - lastTime, 100) / 1000;
				stop = frameFunc(timeStep) === false;
			}
		lastTime = time;
		if(!stop)
			requestAnimationFrame(frame);
	}
	requestAnimationFrame(frame);
}
var arrows = trackKeys(arrowCodes);

function runLevel(level, Display, andThen)
{
	var display = new Display(document.body, level);
	runAnimation(function(step)
	{
		level.animate(step, arrows);
		display.drawFrame(step);
		if(level.isFinished())
			{
				display.clear();
				if(andThen)
					andThen(level.status);
				return false;
			}
	});
}
function runGame(plans, Display)
{
	function startLevel(n)
	{
		runLevel(new Level(plans[n]), Display, function(status)
		{
			if(status == "lost")
			{
				window.location.href = "gameover.html";
				//window.open('gameover.html');
				//document.body.innerHTML='<div class="lose"></div>';
			
				moedas = 0;
				relogio = 90;
				//startLevel(n);
			}
			else if (n < plans.length - 1)
			{
				startLevel(n + 1);
				moedas = 0;
				relogio = 90;
			}
			else
				{
					window.location.href = "won.html";
					//window.open('end.html');
					//document.body.innerHTML='<div class="won"></div>';
				}
		});
	}
	startLevel(0);
}
runGame(LEVELS, DOMDisplay);