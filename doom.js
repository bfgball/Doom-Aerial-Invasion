var _skybox;
var _skybox2;
var _skyhell;
var _skyhell2;
var _ground;
var _ground2;
var _logo;
var _newGame;
var _readme;
var _option;
var _rank;
var _help;
var _currentMenu;
var _skull;
var _cursorOffset;
var _selectedMenu;
var _menuItemMax;
var _systemMessage;
var _cursorCooldown = 0;
var _menuCooldown = 0;
var _nextEvent = -1;
var _eventCooldown = 0;
var _pickupFlash = false;
var _pickupColor = 'green';
var _pickupStrength = 1;
var _messageHeight = 0;
var missiles_list = [];
var monsters_list = [];
var monsterball_list = [];
var effect_list = [];
var sound_list = [];
var pickup_list = [];
var message_list = [];
var pixel_list = [];
var pixel_list1 = [];
var highscores_list = [];
var SoundIndex = 0;
var SoundIndex1 = 0;
var myGamePiece;
var myScore;
var myLuck;
var myPowerLevel;
var myDmg;
var myKill;
var myHealth;
var myWeapon;
var myAmmoCounter;
var myMessage;
var myHUD;
var myArmor;
var myArmorCounter;
var myScouter;
var myCrosshairH;
var myCrosshairV;
var _targetCrosshairY
var scouterHidden;
var scouterCheck = 0;
var scouterTarget;
var lastCreatedComponent;
var lastCreatedSpecialEffect;
var lastCreatedPickup;
var lastCreatedPixel;
var lastDamageTaken;
var lastCreatedMonster;
var _gameState = -1;
var _luck = 0;
var _powerLevel = 0;
var _maxPowerLevel = 500;
var _additionalPowerLevel = 0;
var _difficult = 0;
var _tension = 0;
var _spawnSet = 0;
var _monsterSpawnCooldown;
var _fullScale = false;
var _windowWidth = 1000;
var _windowHeight = 1000;
var _killCount = 0;
var _score = 0;
var _hkillCount = 0;
var _hscore = 0;
var _monsterPreferenceMod = [
//0 Army of Hell
[40, 20, 3, 1],
//1 Soulstorm
[50, 1, 1, 1],
//2 Tomato Nightmare
[1, 50, 1, 1],
//3 Ettin
[1, 50, 50, 1],
//4 Torment
[1, 1, 2, 1],
//5 Hatred
[10, 1, 2, 1],
//6 Lord of Darkness
[5, 5, 1, 5],
//7 Brimstone
[50, 1, 1, 5],
//8 Amageddon
[1, 1, 1, 50]
];

const PI = 3.1415926535897932384626433832795;

const convert = {
	bin2dec : s => parseInt(s, 2).toString(10),
	bin2hex : s => parseInt(s, 2).toString(16),
	dec2bin : s => parseInt(s, 10).toString(2),
	dec2hex : s => parseInt(s, 10).toString(16),
	hex2bin : s => parseInt(s, 16).toString(2),
	hex2dec : s => parseInt(s, 16).toString(10)
};

function pixelExplosion(number,color,x,y,angle,spread,speed)
{
	for (l = getRandomInt(number - 1, number * 2); l >= 0; l--) {
		speed0 = getRandomInt(speed/4,speed);
		speed0 = Math.pow(speed0,1.25);
		angle0 = angle + ((Math.random() - 0.5) * spread)
		pixel_list.push(new pixel(color,x,y,speed0,getRandomFloat(0.9,1),angle0))
	}
}

function pixelExplosion1(number,color,x,y,angle,spread,speed)
{
	for (l = getRandomInt(number - 1, number * 2); l >= 0; l--) {
		speed0 = getRandomInt(speed/4,speed);
		speed0 = Math.pow(speed0,1.25);
		angle0 = angle + ((Math.random() - 0.5) * spread)
		pixel_list1.push(new pixel(color,x,y,speed0,getRandomFloat(0.9,1),angle0))
	}
}

function setupSound() {
	for (i=0; i<16; i++)
	{
		sound_list.push(new sound(''))
	}
}

const SOUND_CHANNEL_PLAYER = 11;
const SOUND_CHANNEL_ACTION = 11;
const SOUND_CHANNEL_PICKUP = 12;
const SOUND_CHANNEL_WEAPON = 13;
function playsound(file,index) {
	//index 0-10 for playing random sounds;
	if (!index)
	{
		if (index == SOUND_CHANNEL_WEAPON)
		{
			if (SoundIndex1<15)
			{
				sound_list[SoundIndex1].sound.src = file;
				sound_list[SoundIndex1].play();
				SoundIndex1 += 1;
			} else 
			{
				SoundIndex1 = 13;
			}
		}
		else
		{
			if (SoundIndex<10)
			{
				sound_list[SoundIndex].sound.src = file;
				sound_list[SoundIndex].play();
				SoundIndex += 1;
			} else 
			{
				SoundIndex = 0;
			}
		}
	} else {
		sound_list[index].sound.src = file;
		sound_list[index].play();
	}
}

function sound(src) {
	this.sound = document.createElement("audio");
	this.sound.src = src;
	this.sound.setAttribute("preload", "auto");
	this.sound.setAttribute("controls", "none");
	this.sound.style.display = "none";
	document.body.appendChild(this.sound);
	this.play = function(){
		this.sound.play();
	}
	this.stop = function(){
		this.sound.pause();
	}
}

function createPickupMessage(message,x,y,color)
{
	if (!color)
	{
		color == "white"
	}
	message_list.push(new component("18px", "mortis", color, x, y - _messageHeight, "text"));
	lastCreatedComponent.timer = 75;
	lastCreatedComponent.speedY = -1;
	lastCreatedComponent.accelerationY = 0.01;
	lastCreatedComponent.text = message;
	_messageHeight = _messageHeight + 20;
}

function getRandomInt(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomFloat(min, max) {
	return Math.random() * (max - min) + min;
}

function startGame() {
	_skybox = new component(256, 128, "games/RSKY1.png", 0, 0, "background");
	_skybox2 = new component(256, 128, "games/RSKY1.png", 0, 0, "background");
	_skyhell = new component(256, 128, "games/RSKY2.png", 0, 0, "background");
	_skyhell2 = new component(256, 128, "games/RSKY2.png", 0, 0, "background");
	_ground = new component(256, 256, "games/floor1.png", 0, 0, "background");
	_ground2 = new component(256, 256, "games/floor2.png", 0, 0, "background");	
	_logo = new component(256, 192, "games/logo.png", 0, 0, "image");
	_newGame = new component(140, 20, "games/M_NGAME.png", 0, 0, "image");
	_readme = new component(140, 20, "games/M_READ.png", 0, 0, "image");
	_option =  new component(140, 20, "games/M_OPTION.png", 0, 0, "image");
	_rank = new component(140, 20, "games/M_RANK.png", 0, 0, "image");
	_help = new component(360, 240, "games/help.png", 0, 0, "image");
	_skull = new component(20, 19, "games/M_SKULL.png", 0, 0, "image");
	_systemMessage = new component("16px", "DooM", '#ffffff', 0, 0, "text");
	_currentMenu = 0;
	_selectedMenu = 0;
	_maxPowerLevel = 0;
	_additionalPowerLevel = 0;
	_menuItemMax = 3;
	_cursorOffset = 0;
	myGameArea.start();
	setupSound();
	_gameState = 0;
	_difficult = 0;
	_fullScale = false;
	myGameArea.resize();
}

function mainMenu(){
	_gameState = 0;
	_logo = new component(256, 192, "games/logo.png", 0, 0, "image");
	_newGame = new component(140, 20, "games/M_NGAME.png", 0, 0, "image");
	_readme = new component(140, 20, "games/M_READ.png", 0, 0, "image");
	_option =  new component(140, 20, "games/M_OPTION.png", 0, 0, "image");
	_rank = new component(140, 20, "games/M_RANK.png", 0, 0, "image");
	_help = new component(360, 240, "games/help.png", 0, 0, "image");
	_skull = new component(20, 19, "games/M_SKULL.png", 0, 0, "image");
	delete myGamePiece;
	delete myScore;
	delete myLuck;
	delete myPowerLevel;
	delete myDmg;
	delete myKill;
	delete myMessage;
	delete myHUD;
	delete myArmor;
	delete myArmorCounter;	
	delete myHealth;
	delete myWeapon;
	delete myAmmoCounter;
	delete myScouter;
	delete myCrosshairH;
	delete myCrosshairV;
	_cursorOffset = 96;
	_currentMenu = 3;
	_selectedMenu = 3;
	if (_score > _hscore) {
		_hscore = _score;
	}
	if (_killCount > _hkillCount) {
		_hkillCount = _killCount;
	}
	createHighscores();
	purge();
	myGameArea.resize();
}


function purge(){
	for (i = missiles_list.length - 1; i >= 0; i -= 1) {
		delete missiles_list[i];
		missiles_list.splice(i, 1);
	}

	for (i = monsters_list.length - 1; i >= 0; i -= 1) {
		delete monsters_list[i];
		monsters_list.splice(i, 1);
	}

	for (i = monsterball_list.length - 1; i >= 0; i -= 1) {
		delete monsterball_list[i];
		monsterball_list.splice(i, 1);
	}

	for (i = effect_list.length - 1; i >= 0; i -= 1) 
	{ 
		delete effect_list[i];
		effect_list.splice(i, 1);
	}   

	for (i = pickup_list.length - 1; i >= 0; i -= 1) {
		delete pickup_list[i];
		pickup_list.splice(i, 1);
	}

	for (i = message_list.length - 1; i >= 0; i -= 1) {
		delete message_list[i];
		message_list.splice(i, 1);
	}

	for (i = pixel_list.length - 1; i >= 0; i -= 1) {
		delete pixel_list[i];
		pixel_list.splice(i, 1);
	}

	for (i = pixel_list1.length - 1; i >= 0; i -= 1) {
		delete pixel_list1[i];
		pixel_list1.splice(i, 1);
	}
}

function checkEvent()
{
	if (_nextEvent != -1) 
	{
		if (_eventCooldown>0)
		{
			_eventCooldown -= 1 
		}
		if (_eventCooldown == 0)
		{
			_eventCooldown = -1;
			switch (_nextEvent) 
			{
				case 1:
				// PlayerDeath
				mainMenu();
				break;

				case 2:
				monsters_list.push(new cardinal(104,104,'games/card/idle.png', myGameArea.canvas.width/2,-64,'image'));
				lastCreatedMonster.width = 80;
				lastCreatedMonster.height = 90;
				playsound('games/card/dscybsit.mp3');
				_powerLevel = _powerLevel + 10000;
				break;

				case 3:
				_systemMessage.text = 'Congratulations!'
				_monsterSpawnCooldown = 99999;
				_nextEvent = 4;
				_eventCooldown = 150;
				break;

				case 4:
				_systemMessage.text = 'Once again, the armies of hell is wrecked.'
				_nextEvent = 5;
				_eventCooldown = 300;
				break;

				case 5:
				_systemMessage.text = 'You have successfully defended earth from the alien invasion!'
				_nextEvent = 6;
				_eventCooldown = 300;
				break;

				case 6:
				_systemMessage.text = 'Thanks for playing!'
				_systemMessage.color = '#ffff00'
				_nextEvent = 1;
				_eventCooldown = 300;
				break;
			}
		}
	}
}

function resizeGame() 
{
	myGameArea.resize();
}

function loadLevel(level)
{
	delete _logo;
	delete _newGame;
	delete _readme;
	delete _option;
	delete _rank;
	delete _help;
	delete _skull;
	switch (level) {
		case 1:
		myGamePiece = new player(54, 54, "games/player/idle.png", myGameArea.canvas.width / 2, (myGameArea.canvas.height * 3) / 4, "image");
		lastCreatedComponent.width = 16;  
		lastCreatedComponent.height = 48;   
		myScore = new component("12px", "DooM", "white", myGameArea.canvas.width/2 - 128, 32, "text");
		myLuck = new component("12px", "DooM", "white", myGameArea.canvas.width/2 - 320, 32, "text");
		myPowerLevel = new component("12px", "DooM", "white", myGameArea.canvas.width/2 + 64, 32, "text");
		myDmg = new component("12px", "DooM", "white", myGameArea.canvas.width/2 - 128, 64, "text");
		myKill = new component("12px", "DooM", "white", myGameArea.canvas.width/2 + 64, 64, "text");
		myHealth = new component("16px", "mortis", "#99ff99", 0, 0, "text");
		myCrosshairH = new component(16, 2, "#99ff99", 0, 0, "");
		lastCreatedComponent.transparency = 0.75;
		myCrosshairV = new component(2, 16, "#99ff99", 0, 0, "");
		lastCreatedComponent.transparency = 0.75;
		myAmmoCounter = new component("16px", "mortis", "yellow", 0, 0, "text");
		myWeapon = new component(80, 36, "games/player/Pistol.png", 0, 0, "image");
		myScouter = new component("16px", "mortis", "#888800", 0, 0, "text");
		myMessage = new component("18px", "mortis", "red", 0, 0, "text");
		myHUD = new HUD(24, 30, "games/hud/STFST00.png", 0, 0, "image");
		myArmor = new component(31, 17, "games/null.png", 0, 0, "image");
		myArmorCounter = new component("16px", "mortis", "cyan", 0, 0, "text");
		delete _systemMessage.text;

		_gameState = 1;
		_spawnSet = 0;
		_monsterSpawnCooldown = 0;
		myGameArea.frameNo = 0;
		_difficult = 0;
		_powerLevel = 0;
		_ground2.transparency = 0;
		_killCount = 0;
		_score = 0;
		myGameArea.resize();
		break;
		default:
		// statements_def
		break;
	}
}

function spawnMonster()
{
	if (_monsterSpawnCooldown <= 0)
	{
		if (_difficult>=105 && _gameState < 2)
		{
			_gameState = 2;
			_nextEvent = 2;
			_eventCooldown = 1000;
		}

		rnd = getRandomInt(1,100);
		if (rnd == 1)
		{
			_spawnSet = getRandomInt(0,8);
		}

		rnd = getRandomInt(1,10);
		if (rnd == 1)
		{
			_fullScale = false;
		}

		rnd = getRandomInt(1,1000);
		if (rnd <= _difficult)
		{
			_fullScale = true;
		}

		monsterPreference = 
		[
		//Lostsoul
		0,
		//Cacodemon
		0,
		//PainElemental
		0,
		//Afrit
		0]

		//recaluating monsters chance
		for (m = 0; m < monsterPreference.length; m++) {
			monsterPreference[m] = _monsterPreferenceMod[_spawnSet][m];
			switch (m) {
				//Lostsoul
				case 0:
				monsterPreference[m] = monsterPreference[m]*100;
				break;
				//Cacodemon
				case 1:
				monsterPreference[m] = monsterPreference[m]*(50+_difficult);
				break;
				//PainElemental
				case 2:
				monsterPreference[m] = monsterPreference[m]*(_difficult);
				break;
				//Afrit
				case 3:
				monsterPreference[m] = monsterPreference[m]*(_difficult*2);
				break;
			}
		}

		poolMax = 0;
		for (m = 0; m < monsterPreference.length; m++) {
			poolMax = poolMax + monsterPreference[m];
		}

		rnd = getRandomInt(0,poolMax);

		selector = 0;
		finalItem = 0;
		for (m = 0; m < monsterPreference.length; m++) {
			selector = selector + monsterPreference[m];
			if (selector >= rnd)
			{
				break;
			}
			finalItem += 1;
		}

		_maxPowerLevel = _difficult * 20 + 400;

		minHeight = 32;
		maxHeight = myGameArea.canvas.height / 2;
		height = Math.floor(Math.random()*(maxHeight-minHeight+1)+minHeight);

		rnd = getRandomInt(1,2);
		if (rnd == 1)
		{
			spawnLocation = myGameArea.canvas.width;
			spawnSpeed = -getRandomInt(1,8);
		}
		else
		{
			spawnLocation = 0;
			spawnSpeed = getRandomInt(1,8);
		}
		if (_powerLevel < _maxPowerLevel + _additionalPowerLevel)
		{
			switch (finalItem) {
				case 0:
				//Lostsoul
				monsters_list.push(new lostsoul(44, 51, "games/soul/idle.png", spawnLocation, height,'image'));
				break;
				case 1:
				//cacodemon
				monsters_list.push(new cacodemon(72, 72, "games/head/idle.png", spawnLocation, height,'image'));
				break;
				case 2:
				//painElemental
				monsters_list.push(new painElemental(90,90,"games/pain/idle.png",spawnLocation,height,'image'))
				lastCreatedComponent.width = 72;
				lastCreatedComponent.height = 72;				
				break;
				case 3:
				//afrit
				monsters_list.push(new afrit(85, 85, "games/afrit/idle.png", spawnLocation, height,'image'));
				lastCreatedComponent.width = 64;
				lastCreatedComponent.height = 72;
				break;
			}
			spawnDelayMultiplyer = (100 - Math.floor(_difficult*0.9));;
			if (spawnDelayMultiplyer <= 1)
			{
				spawnDelayMultiplyer = 1;
			}
			_monsterSpawnCooldown += Math.floor(Math.random() * ((_powerLevel / (500+_difficult)) * spawnDelayMultiplyer));

			if (_fullScale == true)
			{
				_monsterSpawnCooldown = 0.1;
				_maxPowerLevel = Math.floor(_maxPowerLevel * 1.5); 
			}
			_powerLevel += lastCreatedMonster.powerLevel;
			updateTension();
		}		
	} else {
		_monsterSpawnCooldown -= 1
	}

}

function updateTension()
{
	v = (125 - _difficult) / 50;
	if (v<0.4)
		{v = 0.4}
	_tension = myGamePiece.health / 100 * (myGamePiece.armor / 200 + 1) * v;
	_tension = _tension * ((myGamePiece.ammo[1] / 800) + (myGamePiece.ammo[3] / 2000) + (myGamePiece.ammo[4] / 400) + (myGamePiece.ammo[5] / 600) + (myGamePiece.ammo[7] / 100) + 0.25);
	_tension = _tension / ((_powerLevel + 1000) / 1000) * ((_luck + 4000) / 4000);
}


function deathDrop(rarity,x,y,chance)
{
	updateTension();
	itemPreference = 
	[
	//Medkit0
	0,
	//shotgun1
	0,
	//Supershotgun2
	0,
	//Chaingun3
	0,
	//RocketLauncher4
	0,
	//PlasmaRifle5	
	0,
	//BFG9K6
	0,
	//BFG10K7
	0,
	//Bullet8
	0,
	//Shells9
	0,
	//Rockets10
	0,
	//Cells11
	0,
	//D-Cells12
	0,
	//GreenArmor13
	0,
	//BlueArmor14
	0,
	//SoulSphere15
	0,
	//MegaSphere16
	0,
	//Backpack17
	0
	];

	//recaluating item chance
	for (m = 0; m < itemPreference.length; m++) {
		itemPreference[m] = 1;
		switch (m) {
			//medkit
			case 0:
			itemPreference[m] = (100 - myGamePiece.health)*2;
			break;
			//shotgun
			case 1:
			if (myGamePiece.weaponAvailable[1] == false) {
				itemPreference[m] = 400
			}
			break;
			//SuperShotgun
			case 2:
			if (myGamePiece.weaponAvailable[1] == true && myGamePiece.weaponAvailable[2] == false) {
				itemPreference[m] = 100
			}
			break;
			//Chaingun
			case 3:
			if (myGamePiece.weaponAvailable[1] == true && myGamePiece.weaponAvailable[3] == false) {
				itemPreference[m] = 100
			}			
			break;
			//RocketLauncher
			case 4:
			if (myGamePiece.weaponAvailable[1] == true) {
				itemPreference[m] += 25
			}
			if (myGamePiece.weaponAvailable[2] == true) {
				itemPreference[m] += 25
			}
			if (myGamePiece.weaponAvailable[3] == true) {
				itemPreference[m] += 25
			}
			if (myGamePiece.weaponAvailable[4] == true) {
				itemPreference[m] = 1
			}
			break
			//Plasma
			case 5:
			if (myGamePiece.weaponAvailable[1] == true) {
				itemPreference[m] += 20
			}
			if (myGamePiece.weaponAvailable[2] == true) {
				itemPreference[m] += 20
			}
			if (myGamePiece.weaponAvailable[3] == true) {
				itemPreference[m] += 20
			}
			if (myGamePiece.weaponAvailable[4] == true) {
				itemPreference[m] += 20
			}
			if (myGamePiece.weaponAvailable[5] == true) {
				itemPreference[m] = 1
			}
			break;
			//BFG9000
			case 6:
			itemPreference[m] += Math.floor(_difficult/10);
			if (myGamePiece.weaponAvailable[1] == true) {
				itemPreference[m] += 5
			}
			if (myGamePiece.weaponAvailable[2] == true) {
				itemPreference[m] += 5
			}
			if (myGamePiece.weaponAvailable[3] == true) {
				itemPreference[m] += 5
			}
			if (myGamePiece.weaponAvailable[4] == true) {
				itemPreference[m] += 5
			}
			if (myGamePiece.weaponAvailable[5] == true) {
				itemPreference[m] += 20
			}
			if (myGamePiece.weaponAvailable[6] == true) {
				itemPreference[m] = 1
			}
			break;
			//BFG10K
			case 7:
			if (myGamePiece.weaponAvailable[4] == true) {
				itemPreference[m] += 2
			}
			if (myGamePiece.weaponAvailable[5] == true) {
				itemPreference[m] += 2
			}
			if (myGamePiece.weaponAvailable[6] == true) {
				itemPreference[m] += 15 + Math.floor(_difficult/10)
			}
			if (myGamePiece.weaponAvailable[7] == true) {
				itemPreference[m] = 0
			}
			break;
			//Bullets
			case 8:
			itemPreference[m] = Math.floor((myGamePiece.ammoMax[3] - myGamePiece.ammo[3])*200/myGamePiece.ammoMax[3]);
			if (myGamePiece.weaponAvailable[3] == false) {
				itemPreference[m] = 1
			}
			break;
			//Shells
			case 9:
			itemPreference[m] = Math.floor((myGamePiece.ammoMax[1] - myGamePiece.ammo[1])*200/myGamePiece.ammoMax[1]);
			if (myGamePiece.weaponAvailable[1] == false && myGamePiece.weaponAvailable[2] == false) {
				itemPreference[m] = 1
			}
			break;
			//Rockets
			case 10:
			itemPreference[m] = Math.floor((myGamePiece.ammoMax[4] - myGamePiece.ammo[4])*100/myGamePiece.ammoMax[4]);
			if (myGamePiece.weaponAvailable[4] == false) {
				itemPreference[m] = 1
			}
			break;
			//Cells
			case 11:
			itemPreference[m] = Math.floor((myGamePiece.ammoMax[5] - myGamePiece.ammo[5])*100/myGamePiece.ammoMax[5]) ;
			if (myGamePiece.weaponAvailable[5] == false && myGamePiece.weaponAvailable[6] == false) {
				itemPreference[m] = 1
			}
			break;
			//D-Cells
			case 12:
			itemPreference[m] = Math.floor((myGamePiece.ammoMax[7] - myGamePiece.ammo[7])*0.1 * _luck/400);
			if (myGamePiece.weaponAvailable[7] == false) {
				itemPreference[m] = 1
			}
			break;
			//GreenArmor
			case 13:
			itemPreference[m] = Math.floor((100 - myGamePiece.armor)*0.40);
			break;
			//BlueArmor
			case 14:
			itemPreference[m] = Math.floor((200 - myGamePiece.armor)*0.10);
			break;
			//Soulsphere
			case 15:
			itemPreference[m] = Math.floor((200 - myGamePiece.health)*0.10);
			break;
			//Megasphere
			case 16:
			itemPreference[m] += Math.floor((200 - myGamePiece.health)*0.02 * _luck/600);
			itemPreference[m] += Math.floor((200 - myGamePiece.armor)*0.02 * _luck/600);
			break;
			//Backpack
			case 17:
			itemPreference[m] = 5;
			break;
			default:
			// statements_def
			break;
		}
		if (itemPreference[m]<0) {
			itemPreference[m] = 0;
		}
	}
	poolMax = 0;
	for (m = 0; m < itemPreference.length; m++) {
		poolMax = poolMax + itemPreference[m];
	}

	rnd = getRandomInt(0,poolMax);

	selector = 0;
	finalItem = 0;
	for (m = 0; m < itemPreference.length; m++) {
		selector = selector + itemPreference[m];
		if (selector >= rnd)
		{
			break;
		}
		finalItem += 1;
	}
	luckMod = 1.5-(_difficult/100);
	if (_tension<2) {luckMod += (luckMod * (2 - _tension) * 0.25)}
		if (luckMod<0.5) {luckMod = 0.5};
	_luck = _luck + Math.floor(rarity*luckMod);
	if (!chance){chance = 100;}
	if (chance >= getRandomInt(0,100)){
		switch (finalItem) {
			case 0:
			//Medkit
			if (_luck > 25)
			{
				_luck -= 25;
				pickup_list.push(new pickup(28, 19, "games/items/MEDIA0.png", x, y,'image'));  
				lastCreatedPickup.healthGive = 25;
			}
			break;
			case 1:
			//Shotgun
			if (_luck > 25)
			{
				_luck -= 25;
				pickup_list.push(new pickup(80, 36, "games/player/Shotgun.png", x, y,'image'));
				lastCreatedPickup.weaponGive = 1; 
				lastCreatedPickup.shellsGive = 12;
				lastCreatedPickup.pickupSound = 'games/items/dswpnup.mp3';
			}
			break;
			case 2:
			//Supershotgun
			if (_luck > 100)
			{
				_luck -= 100;
				pickup_list.push(new pickup(80, 36, "games/player/SuperShotgun.png", x, y,'image'));
				lastCreatedPickup.weaponGive = 2; 
				lastCreatedPickup.shellsGive = 24;
				lastCreatedPickup.pickupSound = 'games/items/dswpnup.mp3';
			}
			break;
			case 3:
			//Chaingun
			if (_luck > 100)
			{
				_luck -= 100;
				pickup_list.push(new pickup(80, 36, "games/player/Chaingun.png", x, y,'image'));
				lastCreatedPickup.weaponGive = 3; 
				lastCreatedPickup.bulletGive = 100;
				lastCreatedPickup.pickupSound = 'games/items/dswpnup.mp3';
			}
			break;
			case 4:
			//RocketLauncher
			if (_luck > 200)
			{
				_luck -= 200;
				pickup_list.push(new pickup(80, 36, "games/player/RocketLauncher.png", x, y,'image'));
				lastCreatedPickup.weaponGive = 4; 
				lastCreatedPickup.rocketGive = 10;
				lastCreatedPickup.pickupSound = 'games/items/dswpnup.mp3';
			}
			break;
			case 5:
			//PlasmaRifle
			if (_luck > 250)
			{
				_luck -= 250;
				pickup_list.push(new pickup(80, 36, "games/player/PlasmaRifle.png", x, y,'image'));
				lastCreatedPickup.weaponGive = 5; 
				lastCreatedPickup.cellsGive = 50;
				lastCreatedPickup.pickupSound = 'games/items/dswpnup.mp3';
			}
			break;
			case 6:
			//BFG9K
			if (_luck > 600 - (_difficult*3))
			{
				_luck -= 600 - (_difficult*3);
				pickup_list.push(new pickup(80, 36, "games/player/BFG9000.png", x, y,'image'));
				lastCreatedPickup.weaponGive = 6; 
				lastCreatedPickup.cellsGive = 100;
				lastCreatedPickup.pickupSound = 'games/items/dswpnup.mp3';
			}
			break;
			case 7:
			//BFG10K
			if (_luck > 1000 - (_difficult*5))
			{
				_luck -= 1000 - (_difficult*5);
				pickup_list.push(new pickup(80, 36, "games/player/BFG10K.png", x, y,'image'));
				lastCreatedPickup.weaponGive = 7; 
				lastCreatedPickup.DcellsGive = 20;
				lastCreatedPickup.pickupSound = 'games/items/dswpnup.mp3';
			}
			break;
			case 8:
			//Bullet
			if (_luck > 50)
			{
				_luck -= 50;
				pickup_list.push(new pickup(28, 16, "games/items/AMMOA0.png", x, y,'image'));  
				lastCreatedPickup.bulletGive = 50;		
			}
			break;
			case 9:
			//Shells
			if (_luck > 50)
			{
				_luck -= 50;	
				pickup_list.push(new pickup(32, 12, "games/items/SBOXA0.png", x, y,'image'));
				lastCreatedPickup.shellsGive = 20;	
			}	  
			break;
			case 10:
			//Rocket
			if (_luck > 100)
			{
				_luck -= 100;	
				pickup_list.push(new pickup(54, 21, "games/items/BROKA0.png", x, y,'image'));
				lastCreatedPickup.rocketGive = 5;	
			} 
			break;
			case 11:
			//Cells
			if (_luck > 200)
			{
				_luck -= 200;
				pickup_list.push(new pickup(32, 21, "games/items/CELPA0.png", x, y,'image'));
				lastCreatedPickup.cellsGive = 100; 
			}
			break;
			case 12:
			//D-Cells
			if (_luck > 400 - (_difficult*2))
			{
				_luck -= 400 - (_difficult*2);
				pickup_list.push(new pickup(32, 21, "games/items/DCELL.png", x, y,'image'));
				lastCreatedPickup.DcellsGive = 20; 
			}
			break;
			case 13:
			//GreenArmor
			if (_luck > 150)
			{
				_luck -= 150;
				pickup_list.push(new pickup(31, 17, "games/items/ARM1A0.png", x, y,'image'));
				lastCreatedPickup.armorGive = 100; 
				lastCreatedPickup.armorSave = 0.33; 
			}
			break;
			case 14:
			//BlueArmor
			if (_luck > 300)
			{
				_luck -= 300;
				pickup_list.push(new pickup(31, 17, "games/items/ARM2A0.png", x, y,'image'));
				lastCreatedPickup.armorGive = 200; 
				lastCreatedPickup.armorMax = 200; 
				lastCreatedPickup.armorSave = 0.5; 
			}
			break;
			case 15:
			//SoulSphere
			if (_luck > 300)
			{
				_luck -= 300;
				pickup_list.push(new pickup(25, 25, "games/items/SOULA0.png", x, y,'image'));
				lastCreatedPickup.healthGive = 100; 
				lastCreatedPickup.healthMax = 200; 
				lastCreatedPickup.pickupSound = 'games/items/dsgetpow.mp3';
			}
			break;
			case 16:
			//MegaSphere
			if (_luck > 600)
			{
				_luck -= 600;
				pickup_list.push(new pickup(25, 25, "games/items/MEGAA0.png", x, y,'image'));
				lastCreatedPickup.healthGive = 200; 
				lastCreatedPickup.healthMax = 200; 
				lastCreatedPickup.armorGive = 200; 
				lastCreatedPickup.armorMax = 200; 
				lastCreatedPickup.armorSave = 0.5; 
				lastCreatedPickup.pickupSound = 'games/items/dsgetpow.mp3';
			}
			break;
			case 17:
			//Backpack
			if (_luck > 200)
			{
				_luck -= 200;
				pickup_list.push(new pickup(22, 29, "games/items/BPAKA0.png", x, y,'image'));
				lastCreatedPickup.doubleAmmo = true; 
				lastCreatedPickup.bulletGive = 20;
				lastCreatedPickup.shellsGive = 5;
				lastCreatedPickup.rocketGive = 2;
				lastCreatedPickup.cellsGive = 20;	
			}
			break;

			default:
			// statements_def
			break;
		}
	}
}


var myGameArea = 
{
	canvas : document.createElement("canvas"),
	start : function() 
	{
		this.context = this.canvas.getContext("2d");
		document.body.insertBefore(this.canvas, document.body.childNodes[0]);
		this.frameNo = 0;
		this.interval = setInterval(updateGameArea, 20);
		window.addEventListener(
			'keydown', 
			function (e) 
			{
				e.preventDefault();
				myGameArea.keys = (myGameArea.keys || []);
				myGameArea.keys[e.keyCode] = (e.type == "keydown");
			})
		window.addEventListener(
			'keyup', 
			function (e) 
			{
				myGameArea.keys[e.keyCode] = (e.type == "keydown");
			})
	},
	clear : function() 
	{
		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
	},
	flash : function()
	{
		if (_pickupFlash == true)
		{
			_pickupFlash = false;
			ctx.globalAlpha = _pickupStrength;
			this.context.fillStyle = _pickupColor;
			this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);  
			ctx.globalAlpha = 1;  
		}
	},
	resize : function() 
	{
		XBefore = this.canvas.width;
		YBefore = this.canvas.height;
		this.canvas.width = (document.body.clientWidth * 0.9875);
		//if (this.canvas.width>1600) {this.canvas.width=1600};
		this.canvas.height = (Math.max( window.innerHeight, document.body.clientHeight ) * 0.975);
		//if (this.canvas.height>900) {this.canvas.height=900};
		XAfter = this.canvas.width;
		YAfter = this.canvas.height;
		XScale = XAfter / XBefore;
		YScale = YAfter / YBefore;

		console.log('NEW WIDTH ' + this.canvas.width + ' / ' + document.body.clientWidth);
		console.log('NEW HEIGHT ' + this.canvas.height + ' / ' + document.body.clientHeight);

		if (_gameState>0) {
			_skybox.x = 0;
			_skybox.y = 0;
			_skybox.imageWidth = this.canvas.width;
			_skybox.imageHeight = this.canvas.height / 2;	

			_skybox2.x = 0;
			_skybox2.y = 0;
			_skybox2.imageWidth = this.canvas.width;
			_skybox2.imageHeight = this.canvas.height / 2;	

			_skyhell.x = 0;
			_skyhell.y = 0;
			_skyhell.imageWidth = this.canvas.width;
			_skyhell.imageHeight = this.canvas.height / 2;	

			_skyhell2.x = 0;
			_skyhell2.y = 0;
			_skyhell2.imageWidth = this.canvas.width;
			_skyhell2.imageHeight = this.canvas.height / 2;	

			_ground.x = 0;
			_ground.y = this.canvas.height / 2;
			_ground.imageWidth = this.canvas.width;
			_ground.imageHeight = this.canvas.height;

			_ground2.x = 0;
			_ground2.y = this.canvas.height / 2;
			_ground2.imageWidth = this.canvas.width;
			_ground2.imageHeight = this.canvas.height;

			_systemMessage.x =  this.canvas.width / 2 - 256;
			_systemMessage.y =  this.canvas.height / 2;		

			myScore.x = this.canvas.width/2 -128;
			myScore.y = 32; 
			myLuck.x = this.canvas.width/2 - 320;
			myLuck.y = 32; 
			myPowerLevel.x = this.canvas.width/2 + 64;
			myPowerLevel.y = 32; 
			myDmg.x = this.canvas.width/2 -128;
			myDmg.y = 64; 
			myKill.x = this.canvas.width/2 + 64;
			myKill.y = 64; 

			myGamePiece.x = myGamePiece.x * XScale;
			myGamePiece.y = myGamePiece.y * YScale;

			for (var i = monsters_list.length - 1; i >= 0; i--) {
				monsters_list[i].x =  monsters_list[i].x * XScale;
				monsters_list[i].y =  monsters_list[i].y * YScale;
			}
			for (var i = monsterball_list.length - 1; i >= 0; i--) {
				monsterball_list[i].x =  monsterball_list[i].x * XScale;
				monsterball_list[i].y =  monsterball_list[i].y * YScale;
			}
			for (var i = missiles_list.length - 1; i >= 0; i--) {
				missiles_list[i].x =  missiles_list[i].x * XScale;
				missiles_list[i].y =  missiles_list[i].y * YScale;
			}
			for (var i = effect_list.length - 1; i >= 0; i--) {
				effect_list[i].x =  effect_list[i].x * XScale;
				effect_list[i].y =  effect_list[i].y * YScale;
			}
		} 
		else if (_gameState==0) {
			_logo.x = this.canvas.width/2;
			_logo.y = this.canvas.height/2 - 128;

			_newGame.x = this.canvas.width/2;
			_newGame.y = this.canvas.height/2;

			_readme.x = this.canvas.width/2;
			_readme.y = this.canvas.height/2 + 32;

			_option.x = this.canvas.width/2;
			_option.y = this.canvas.height/2 + 64;

			_rank.x = this.canvas.width/2;
			_rank.y = this.canvas.height/2 + 96;

			_skull.x = this.canvas.width/2 - 100;
			_skull.y = this.canvas.height/2 + _cursorOffset;

			_help.x = this.canvas.width/2;
			_help.y = this.canvas.height/2;

		}
	}
}



function pixel(color,x,y,speed,friction,angle,life,size)
{
	lastCreatedPixel = this;
	this.x = x;
	this.y = y;
	this.speed = speed;   
	this.acceleration = 0.0;
	this.friction = friction;
	this.color = color;
	if (angle) {
		this.angle = angle;
	} else {
		this.angle = getRandomFloat(-3.14,3.14);
	}
	if (size) {
		this.size = size;
	} else {
		this.size = 4;
	}
	if (life) {
		this.life = life;
	} else {
		this.life = getRandomInt(10,20);
	}
	this.maxlife = this.life;
	this.update = function() {
		ctx = myGameArea.context;
		ctx.save();
		ctx.globalAlpha = this.life/this.maxlife;
		ctx.translate(this.x, this.y);
		ctx.fillStyle = this.color;
		ctx.fillRect(-this.size / 2, -this.size/ 2, this.size, this.size);
		ctx.restore();    
		ctx.globalAlpha = 1;
	}
	this.newPos = function() {
		this.speed += this.acceleration;    
		this.speed = this.speed * this.friction;
		this.x += this.speed * Math.sin(this.angle);
		this.y -= this.speed * Math.cos(this.angle);
	}
}


function component(width, height, color, x, y, type) 
{
	lastCreatedComponent = this;
	this.type = type;
	if (type == "image" || type == "background") {
		this.image = new Image();
		this.image.src = color;
		this.frameLength = 4;
		this.frameTime = 0;
		this.frameX = 0;
		this.frameY = 0;
	} else {
		this.color = color;
	}
	this.transparency = 1;
	this.imageWidth = width;
	this.imageHeight = height;
	this.speed = 0;
	this.width = width;
	this.height = height;
	this.speedX = 0.0;
	this.speedY = 0.0;    
	this.accelerationX = 0.0;
	this.accelerationY = 0.0;
	this.x = x;
	this.y = y;
	this.gravity = 0;
	this.gravitySpeed = 0;
	this.friction = 1.0;
	this.angle = 0.0;
	this.moveAngle = 0.0;
	this.boundCheckImmunityTime = 100;
	this.state = 0;
	this.timer = 0;
	this.health = 100;
	this.maxhealth = 100;
	this.armor = 0;
	this.save = 0;
	this.isDead = false;
	this.damage = 0;
	this.dice = 8;
	this.deathSound = '';
	this.painSound = '';
	this.painChance = 25;
	this.mass = 10;
	this.setState = function(state,image) {
		this.state = state;
		this.timer = 0;
		this.frameX = 0;
		this.frameY = 0;
		this.frameTime = 0;
		if (image) {
			this.image.src = image;
		}
	}
	this.nextFrame = function () {
		if ((this.frameX + this.imageWidth + this.imageWidth) <= this.image.naturalWidth)
		{
			this.frameX = this.frameX + this.imageWidth;
		}
		else if ((this.frameY + this.imageHeight + this.imageHeight) <= this.image.naturalHeight)
		{
			this.frameY = this.frameY + this.imageHeight;
			this.frameX = 0;
		}
		else
		{
			this.frameX = 0;
			this.frameY = 0;
		}
	}
	this.explode = function()
	{

	}
	this.explode0 = function(width,height,image,length,frames,move) {
		effect_list.push(new specialEffect(width, height, image, this.x, this.y,'image'));
		if(!move) {
			move = false;
		} 
		if (move == true) {
			lastCreatedSpecialEffect.speedX = this.speedX;
			lastCreatedSpecialEffect.speedY = this.speedY;
			lastCreatedSpecialEffect.friction = 0.9;
		}
		lastCreatedSpecialEffect.timer = length * frames;
		lastCreatedSpecialEffect.frameLength = length;
		this.isDead = true;
	}
	this.pain = function()
	{

	}
	this.harm = function(target,damage) {
		var dmg;
		if (target.health > 0 && target.isDead == false) {
			if (!damage) {
				dmg = (getRandomInt(1,this.dice))*this.damage;
			} else {
				dmg = damage;
			}

			if (target.armor>0)
			{
				dmg1 = Math.floor(dmg * target.save);
				dmg2 = dmg - dmg1;

				target.armor -= dmg1;
				if (target.armor<0) {
					dmg1 = -target.armor;
					target.armor = 0;
				} else {
					dmg1 = 0;
				}
				dmg = dmg1 + dmg2;
			}

			target.health = target.health - dmg;
			lastDamageTaken = dmg;
			//console.log(target.health);
			this.push(target, dmg / target.mass)
			if (target.health <= 0) {
				target.death();
				target.explode();
			} 
			else if (target.state != -1 && target.painChance > 0) {
				if (getRandomInt(1,100)<=target.painChance) {
					target.pain();
				}
			} 
			else if (target.painChance > 100)
			{
				target.pain();		
			}
		}
	}
	this.splashDamage = function(maximumDamage, range){
		for (k = 0; k < monsters_list.length; k += 1)  {
			dist = Math.sqrt(((this.x - monsters_list[k].x)*(this.x - monsters_list[k].x)) + ((this.y - monsters_list[k].y)*(this.y - monsters_list[k].y)))
			if (dist<range && monsters_list[k].isBoss == false)
			{
				this.harm(monsters_list[k],maximumDamage * (1-(dist/range)))
			}
		}
	}
	this.chargeAt = function(target,speed,acceleration)
	{
		dist = Math.sqrt(((this.x - target.x)*(this.x - target.x)) + ((this.y - target.y)*(this.y - target.y)))
		dX = Math.asin((this.x - target.x)/dist);
		dY = Math.acos((this.y - target.y)/dist);
		if (speed != 0) {
			this.speedX -= speed * Math.sin(dX);
			this.speedY -= speed * Math.cos(dY);
		}
		if (acceleration) {
			this.accelerationX -= acceleration * Math.sin(dX);
			this.accelerationY -= acceleration * Math.cos(dY);
		}
	}
	this.homingAt = function(target,degree)
	{

		dist = Math.sqrt(((this.x - target.x)*(this.x - target.x)) + ((this.y - target.y)*(this.y - target.y)))
		dX = target.x - this.x;
		ang = Math.asin(dX/dist);

		if (target.y > this.y)
		{
			ang -= -PI;
			ang = -ang;
		}

		while (ang<0) {
			ang += PI * 2;
		}
		while (ang>PI*2) {
			ang -= PI * 2;
		}

		while (this.angle<0) {
			this.angle += PI * 2;
		}
		while (this.angle>PI*2) {
			this.angle -= PI * 2;
		}

		if (this.angle<ang)
		{
			this.angle += degree;
		} else 
		{
			this.angle -= degree;		
		}
	}
	this.getDist = function(target)
	{
		dist = Math.sqrt(((this.x - target.x)*(this.x - target.x)) + ((this.y - target.y)*(this.y - target.y)))
		return dist;	

	}
	this.push = function(target,strength) {
		dist = Math.sqrt(((this.x - target.x)*(this.x - target.x)) + ((this.y - target.y)*(this.y - target.y)))
		dX = Math.asin((this.x - target.x)/dist);
		dY = Math.acos((this.y - target.y)/dist);
		target.speedX -= strength * Math.sin(dX);
		target.speedY -= strength * Math.cos(dY);
	}
	this.death = function()
	{
		if(this.deathSound)
		{
			playsound(this.deathSound);
		}
		this.isDead = true;
	}
	this.update = function() {
		ctx = myGameArea.context;
		ctx.save();
		ctx.translate(this.x, this.y);
		ctx.rotate(this.angle);
		ctx.globalAlpha = this.transparency;
		if (this.type == "text") {
			ctx.font = this.width + " " + this.height;
			ctx.fillStyle = this.color;
			ctx.fillText(this.text, 0, 0);
		} 
		else if (type == "image") {
			ctx.drawImage(this.image, 
				this.frameX,
				this.frameY,
				this.imageWidth,
				this.imageHeight,
				-this.imageWidth / 2,
				-this.imageHeight / 2,
				this.imageWidth,
				this.imageHeight);

			this.frameTime = this.frameTime + 1;
			if (this.frameTime > this.frameLength)
			{
				this.nextFrame();
				this.frameTime = 0;
			}
		}
		else if (type == "background") {
			ctx.drawImage(this.image, 
				this.frameX,
				this.frameY,
				this.width,
				this.height,
				0,
				0,
				this.imageWidth,
				this.imageHeight);

		} else {
			ctx.fillStyle = this.color;
			ctx.fillRect(-this.width / 2, -this.height/ 2, this.width, this.height);
		} 
		ctx.globalAlpha = 1;
		ctx.restore();
	}
	this.newPos = function() {
		this.speedX +=  this.accelerationX;
		this.speedY +=  this.accelerationY;         
		this.speedX = this.speedX * this.friction;
		this.speedY = this.speedY * this.friction;
		this.x += this.speedX;
		this.y += this.speedY;
	}
	this.crashWith = function(otherobj) {
		var myleft = this.x - (this.width / 2);
		var myright = this.x + (this.width / 2);
		var mytop = this.y - (this.height / 2);
		var mybottom = this.y + (this.height / 2);
		var otherleft = otherobj.x - (otherobj.width / 2);
		var otherright = otherobj.x + (otherobj.width / 2);
		var othertop = otherobj.y - (otherobj.height / 2);
		var otherbottom = otherobj.y + (otherobj.height / 2);
		var crash = true;
		if (mybottom < othertop || mytop > otherbottom || myright < otherleft || myleft > otherright || this.isDead == true || otherobj.isDead == true) {
			crash = false;
		}
		return crash;
	}
	this.boundCheck = function()
	{
		if (this.boundCheckImmunityTime> -1) {this.boundCheckImmunityTime -= 1;}
		var tol = 100;
		var bottom = myGameArea.canvas.height - this.height;
		var top = 0;
		var right = myGameArea.canvas.width - this.width;
		var left = this.width;  
		var check = false;  
		if (this.boundCheckImmunityTime > 0){
			check = false;
		} 
		else if ((this.y > bottom + tol) || (this.y < top - tol) || (this.x > right + tol) || (this.x < left - tol)) {
			check = true;
		}
		return check;
	}
	this.boundpush = function()
	{
		var spd = 0.25;
		var acc = 0.01
		var bottom = myGameArea.canvas.height - this.height;
		var top = 0;
		var right = myGameArea.canvas.width - this.width;
		var left = this.width;  
		if (this.y > bottom){
			this.speedY = this.speedY - spd;
			this.accelerationY = this.accelerationY - acc;
		} 
		else if (this.y < top){
			this.speedY = this.speedY + spd;
			this.accelerationY = this.accelerationY + acc;
		} 
		else if (this.x > right){
			this.speedX = this.speedX - spd;
			this.accelerationX = this.accelerationX - acc;
		} 
		else if (this.x < left){
			this.speedX = this.speedX + spd;
			this.accelerationX = this.accelerationX + acc;
		}
	}
}

var HUD = function()
{
	component.apply(this,arguments);
	this.HUD_suffix_1 = "0";
	this.HUD_suffix_2 = "0";  
	this.hidden = 150;
	this.HUD_update = function() {
		this.timer += 1;
		if(this.hidden>-1) {this.hidden -= 1}
			myHUD.x = myGamePiece.x;
		if (myGamePiece.y > myGameArea.canvas.height - 64)
		{
			myHUD.y = myGamePiece.y - 64;     
		} else {
			myHUD.y = myGamePiece.y + 64;     			
		}
		myHealth.x = myGamePiece.x + 16;
		myHealth.y = myGamePiece.y + 32;
		myWeapon.x = myGamePiece.x - 48;
		myWeapon.y = myGamePiece.y + 32;
		myAmmoCounter.x = myGamePiece.x - 48;
		myAmmoCounter.y = myGamePiece.y + 32;
		myMessage.x = myGamePiece.x;
		myMessage.y = myGamePiece.y -64;
		myArmor.x =  myGamePiece.x + 32;
		myArmor.y =  myGamePiece.y + 64;
		myArmorCounter.x = myGamePiece.x + 32;
		myArmorCounter.y = myGamePiece.y + 64;
		myCrosshairH.x = myGamePiece.x;
		myCrosshairV.x = myGamePiece.x;
	}
	this.updateMugshot = function()
	{
		switch (this.state) {
			case -1:
			this.HUD_suffix_2 = getRandomInt(0,2);
			if (myGamePiece.health>80) {
				this.HUD_suffix_1 = "KIL0";            
			} else if (myGamePiece.health>60){
				this.HUD_suffix_1 = "KIL1";             
			} else if (myGamePiece.health>40){
				this.HUD_suffix_1 = "KIL2";             
			} else if (myGamePiece.health>20){
				this.HUD_suffix_1 = "KIL3";             
			} else if (myGamePiece.health>0){
				this.HUD_suffix_1 = "KIL4";             
			} else if (myGamePiece.health<=0){
				this.HUD_suffix_1 = "DEAD";             
				this.HUD_suffix_2 = "0"; 
			}
			break;

			case 0:
			this.HUD_suffix_2 = getRandomInt(0,2);
			if (myGamePiece.health>80) {
				this.HUD_suffix_1 = "ST0";            
			} else if (myGamePiece.health>60){
				this.HUD_suffix_1 = "ST1";             
			} else if (myGamePiece.health>40){
				this.HUD_suffix_1 = "ST2";             
			} else if (myGamePiece.health>20){
				this.HUD_suffix_1 = "ST3";             
			} else if (myGamePiece.health>0) {
				this.HUD_suffix_1 = "ST4";             
			} else if (myGamePiece.health<=0){
				this.HUD_suffix_1 = "DEAD";             
				this.HUD_suffix_2 = "0"; 
			}
			break;

			default:
			// statements_def
			break;
		}
		this.image.src = "games/hud/STF" + this.HUD_suffix_1 + this.HUD_suffix_2 + '.png';     
	}
}


HUD.prototype = HUD.prototype;
HUD.prototype.constructor = player;

var player = function()
{
	component.apply(this,arguments);
	this.friction = 0.99;
	this.cooldown = 0;
	this.isFiring = false;
	this.holdFire = false;
	this.usingAmmo = false;
	this.pauseFire = 0;
	this.runSpeed = 0;
	this.speed = 0.5;
	this.weaponSwitchCooldown = 0;
	this.painChance = 101;
	this.weapon = [         'Pistol','Shotgun','SuperShotgun','Chaingun','RocketLauncher','PlasmaRifle','BFG9000','BFG10K'];
	this.ammo = [                 -1,       0,             0,         0,            0,           0,       0,       0];
	this.ammoMax = [   			  -1,       50,            50,      200,          50,          300,     300,      100];
	this.weaponAvailable = [    true,    false,         false,     false,           false,        false,    false,    false];
	this.weaponSwitchSound = ["get0",   "get1",        "get2",    "get3",          "get4",       "get5",   "get6",  "get7"];
	this.weaponAmmoUse = [         -2,        1,            2,         1,             1,            1,          40,      1]
	this.currentWeapon = 0;
	this.weaponHidden = 150;
	this.messageHidden = 0;
	this.weaponState = 0;
	this.tracerAttackNextFrame = false;
	this.isCharging = false;
	this.player_switch = function(index)
	{
		if (this.weaponSwitchCooldown <= 0)
		{
			this.weaponSwitchCooldown = 20;
			if (this.currentWeapon == index)
			{
				return false;        
			}
			else if (this.weaponAvailable[index] == false)
			{
				this.messageHidden = 100;
				myMessage.text = this.weapon[index] + ' is not available';
				playsound('games/player/lowammo.mp3',SOUND_CHANNEL_ACTION);
				return false;
			}
			else if ((this.ammo[index] < this.weaponAmmoUse[index]) && (this.ammo[index] != -1))
			{
				this.messageHidden = 100;
				myMessage.text = this.weapon[index] + ' is out of ammo';
				playsound('games/player/lowammo.mp3',SOUND_CHANNEL_ACTION);
				return false;
			}

			else if (this.weaponState != 0)
			{
				this.messageHidden = 100;
				myMessage.text = "Can't change weapon while firing";
				return false;
			}
			
			this.weaponState = 0;
			this.usingAmmo = false;
			this.currentWeapon = index;
			myWeapon.image.src = 'games/player/' + this.weapon[index] + '.png';
			playsound('games/player/' + this.weaponSwitchSound[index] + '.mp3', SOUND_CHANNEL_ACTION);
			this.weaponHidden = 50;
		}
	}
	this.player_quickSwitch = function(index)
	{
		if (this.currentWeapon == index)
		{
			return false;        
		}
		else if (this.weaponAvailable[index] == false)
		{
			return false;
		}
		else if ((this.ammo[index] < this.weaponAmmoUse[index]) && (this.ammo[index] != -1))
		{
			return false;
		}
		else if (this.weaponState != 0)
		{
			return false;
		}
		this.weaponSwitchCooldown = 20;
		this.weaponState = 0;
		this.usingAmmo = false;
		this.currentWeapon = index;
		myWeapon.image.src = 'games/player/' + this.weapon[index] + '.png';
		playsound('games/player/' + this.weaponSwitchSound[index] + '.mp3', SOUND_CHANNEL_ACTION);
		this.weaponHidden = 50;
		return true;
	}
	this.death = function()
	{
		updateTension();
		this.isDead = true;
		myHUD.updateMugshot();
		myHUD.hidden = 100;
		playsound('games/player/dspdiehi.mp3',SOUND_CHANNEL_PLAYER);            
		myGamePiece.explode0(56, 56, "games/player/death.png",6,7,true);
		myGamePiece.pauseFire == 99999;
		_nextEvent = 1;
		_eventCooldown = 100;
	}
	this.pain = function()
	{
		updateTension();
		playsound('games/player/dsplpain.mp3',SOUND_CHANNEL_PLAYER);  
		this.setState(-1, 'games/player/pain.png');
		myHUD.setState(-1);
		myHUD.updateMugshot();
		myHUD.hidden = 100;
		_pickupColor = '#ff0000';

		_pickupStrength = lastDamageTaken / 100;
		if (_pickupStrength>1)
		{
			_pickupStrength = 1;
		}
		_pickupFlash = true;
	}
	this.eatItem = function(item)
	{
		valueBefore = 0;
		valueAfter = 0;
		valueGain = 0;
		x = myGamePiece.x;
		y = myGamePiece.y - 16;
		_pickupColor = 'white';
		_pickupFlash = true;
		_pickupStrength = 0.1;

		eaten = false;
		if (item.healthMax > myGamePiece.health && item.healthGive>0)
		{
			valueBefore = myGamePiece.health;
			myHUD.hidden = 100;
			eaten = true;
			if (item.healthGive>=100)
			{
				_pickupColor = 'blue';
				_pickupStrength = 0.5;
				_pickupFlash = true;
			}
			myGamePiece.health += item.healthGive;
			if (myGamePiece.health > item.healthMax)
			{
				myGamePiece.health = item.healthMax;
			}
			valueAfter = myGamePiece.health;
			valueGain = valueAfter - valueBefore;
			createPickupMessage('Health + ' + valueGain,x,y,'#99ff99');
			myHUD.setState(0);
			myHUD.updateMugshot();

		}
		if (item.armorMax > myGamePiece.armor && item.armorGive>0)
		{
			valueBefore = myGamePiece.armor;
			myHUD.hidden = 100;
			eaten = true;
			myGamePiece.armor += item.armorGive;
			if (myGamePiece.armor > item.armorMax)
			{
				myGamePiece.armor = item.armorMax;
			}
			myGamePiece.save = item.armorSave;

			if (item.armorGive > 100)
			{
				myArmor.image.src = 'games/items/ARM2A0.png';
			} else {
				myArmor.image.src = item.image.src;				
			}

			valueAfter = myGamePiece.armor;
			valueGain = valueAfter - valueBefore;
			createPickupMessage('Armor + ' + valueGain,x,y,'#99ccff');
			myHUD.setState(0);
			myHUD.updateMugshot();
		}
		if (item.doubleAmmo == true)
		{
			eaten = true;
			_pickupColor = 'yellow';
			_pickupStrength = 0.5;
			_pickupFlash = true;
			myGamePiece.ammoMax[1] = 100;
			myGamePiece.ammoMax[2] = 100;
			myGamePiece.ammoMax[3] = 400;
			myGamePiece.ammoMax[4] = 100;
			myGamePiece.ammoMax[5] = 600;
			myGamePiece.ammoMax[6] = 600;
			createPickupMessage('Backpack - Double ammo cap',x,y,'#ffcc66');
		}
		if (item.shellsGive > 0 && myGamePiece.ammo[1]<myGamePiece.ammoMax[1])
		{
			valueBefore = myGamePiece.ammo[1];
			eaten = true;			
			myGamePiece.ammo[1] += item.shellsGive;
			myGamePiece.ammo[2] += item.shellsGive;
			if (myGamePiece.ammo[1]>myGamePiece.ammoMax[1])
			{
				myGamePiece.ammo[1] = myGamePiece.ammoMax[1];
				myGamePiece.ammo[2] = myGamePiece.ammoMax[1];
			}
			valueAfter = myGamePiece.ammo[1];
			valueGain = valueAfter - valueBefore;
			createPickupMessage('Shell + ' + valueGain,x,y,'#ffff99');
		}
		if (item.bulletGive > 0 && myGamePiece.ammo[3]<myGamePiece.ammoMax[3])
		{	
			valueBefore = myGamePiece.ammo[3];
			eaten = true;			
			myGamePiece.ammo[3] += item.bulletGive;
			if (myGamePiece.ammo[3]>myGamePiece.ammoMax[3])
			{
				myGamePiece.ammo[3] = myGamePiece.ammoMax[3];
			}
			valueAfter = myGamePiece.ammo[3];
			valueGain = valueAfter - valueBefore;
			createPickupMessage('Bullet + ' + valueGain,x,y,'#ffff99');
		}
		if (item.rocketGive > 0 && myGamePiece.ammo[4]<myGamePiece.ammoMax[4])
		{		
			valueBefore = myGamePiece.ammo[4];
			eaten = true;	
			myGamePiece.ammo[4] += item.rocketGive;
			if (myGamePiece.ammo[4]>myGamePiece.ammoMax[4])
			{
				myGamePiece.ammo[4] = myGamePiece.ammoMax[4];
			}
			valueAfter = myGamePiece.ammo[4];
			valueGain = valueAfter - valueBefore;
			createPickupMessage('Rocket + ' + valueGain,x,y,'#ffff99');
		}
		if (item.cellsGive > 0 && myGamePiece.ammo[5]<myGamePiece.ammoMax[5])
		{		
			valueBefore = myGamePiece.ammo[5];
			eaten = true;		
			myGamePiece.ammo[5] += item.cellsGive;
			myGamePiece.ammo[6] += item.cellsGive;
			if (myGamePiece.ammo[5]>myGamePiece.ammoMax[5])
			{
				myGamePiece.ammo[5] = myGamePiece.ammoMax[5];
				myGamePiece.ammo[6] = myGamePiece.ammoMax[5];
			}
			valueAfter = myGamePiece.ammo[5];
			valueGain = valueAfter - valueBefore;
			createPickupMessage('Cell + ' + valueGain,x,y,'#ffff99');
		}
		if (item.DcellsGive > 0 && myGamePiece.ammo[7]<myGamePiece.ammoMax[7])
		{		
			valueBefore = myGamePiece.ammo[7];
			eaten = true;	
			myGamePiece.ammo[7] += item.DcellsGive;
			if (myGamePiece.ammo[7]>myGamePiece.ammoMax[7])
			{
				myGamePiece.ammo[7] = myGamePiece.ammoMax[7];
			}
			valueAfter = myGamePiece.ammo[7];
			valueGain = valueAfter - valueBefore;
			createPickupMessage('D-Cell + ' + valueGain,x,y,'#ffff99');
		}
		if (item.weaponGive>0)
		{
			eaten = true;	
			if (myGamePiece.weaponAvailable[item.weaponGive] == false)
			{
				myGamePiece.weaponAvailable[item.weaponGive] = true;
				myGamePiece.player_switch(item.weaponGive);
			}
			switch (item.weaponGive) {
				case 1:
				createPickupMessage('Shotgun',x,y,'#ffff99');
				break;
				case 2:
				createPickupMessage('Super Shotgun',x,y,'#ffff99');
				break;
				case 3:
				createPickupMessage('Chaingun',x,y,'#ffff99');
				break;
				case 4:
				createPickupMessage('Rocket Launcher',x,y,'#ffff99');
				break;
				case 5:
				createPickupMessage('Plasma Rifle',x,y,'#ffff99');
				break;
				case 6:
				createPickupMessage('BFG9000',x,y,'#ffff99');
				break;
				case 7:
				createPickupMessage('BFG10K',x,y,'#ffff99');
				break;
				default:
				// statements_def
				break;
			}
		}

		if (eaten == true)
		{
			updateTension();
			playsound(item.pickupSound,SOUND_CHANNEL_PICKUP);
		} else {
			_pickupFlash = false;
		}
		return eaten;
	}
	this.player_fire = function()
	{
		switch (this.currentWeapon) 
		{
			//pistol
			case 0:
			missiles_list.push(new tracer(64, 64, "games/player/tracer.png", this.x, this.y,'image'));
			lastCreatedComponent.speed = 48;
			lastCreatedComponent.width = 8;
			lastCreatedComponent.height = 32;
			lastCreatedComponent.angle = this.angle;
			lastCreatedComponent.damage = 5;
			lastCreatedComponent.dice = 3;        
			pixelExplosion(3,'#ffffcc',this.x,this.y-16,this.angle,0.3,5);
			this.cooldown = 15;
			playsound('games/player/DSTPFIR.mp3',SOUND_CHANNEL_WEAPON);
			this.setState(1 , "games/player/fire2.png")
			break;

			//shotgun
			case 1:
			for (i = 0; i < 5; i ++){
				missiles_list.push(new tracer(64, 64, "games/player/tracer.png", this.x, this.y,'image'));
				lastCreatedComponent.speed = getRandomInt(40,56);
				lastCreatedComponent.width = 8;
				lastCreatedComponent.height = 32;
				lastCreatedComponent.angle = this.angle+((Math.random()-0.5)*0.1);
				lastCreatedComponent.damage = 7;
				lastCreatedComponent.dice = 3;
			}
			pixelExplosion(15,'#ffffcc',this.x,this.y-16,this.angle,0.5,7);
			this.cooldown = 50;
			playsound('games/player/DS12GFIR.mp3');
			this.setState(1 , "games/player/fire2.png")
			break;

			//supershotgun
			case 2:
			for (i = 0; i < 10; i ++){
				missiles_list.push(new tracer(64, 64, "games/player/tracer.png", this.x, this.y,'image'));
				lastCreatedComponent.speed = getRandomInt(40,56);
				lastCreatedComponent.width = 8;
				lastCreatedComponent.height = 32;
				lastCreatedComponent.angle = this.angle+((Math.random()-0.5)*0.3);
				lastCreatedComponent.damage = 10;
				lastCreatedComponent.dice = 3;
			}
			pixelExplosion(25,'#ffffcc',this.x,this.y-16,this.angle,0.6,9);
			this.cooldown = 75;
			playsound('games/player/DSDSHTGN.mp3',SOUND_CHANNEL_WEAPON);
			this.setState(1 , "games/player/fire2.png")
			break;

			//chaingun
			case 3:
			switch (this.weaponState) 
			{
				case 0:
				playsound('games/player/DSMINSTA.mp3',SOUND_CHANNEL_ACTION);
				this.cooldown = 15;
				this.holdFire = true;
				this.weaponState = 1;
				this.setState(1 , "games/player/fire.png")
				break;
				case 1:
				this.usingAmmo = true;
				playsound('games/player/DSMINI1.mp3',SOUND_CHANNEL_WEAPON);
				pixelExplosion(3,'#ffffcc',this.x,this.y-16,this.angle,0.35,10);
				this.cooldown = 5;
				missiles_list.push(new tracer(64, 64, "games/player/tracer.png", this.x, this.y,'image'));
				lastCreatedComponent.speed = getRandomInt(40,56);
				lastCreatedComponent.width = 8;
				lastCreatedComponent.height = 32;
				lastCreatedComponent.angle = this.angle+((Math.random()-0.5)*0.2);
				lastCreatedComponent.damage = 5;
				lastCreatedComponent.dice = 3;
				this.setState(1 , "games/player/fire2.png")
				if (this.holdFire == true && this.isFiring == false)
				{
					this.weaponState = 2;
					this.usingAmmo = false;
				}

				break;
				case 2:
				this.holdFire = false;
				playsound('games/player/DSMINSTO.mp3',SOUND_CHANNEL_ACTION);
				this.cooldown = 15;
				this.weaponState = 0;
				break;
			}
			break;

			//rocketlauncher
			case 4:
			missiles_list.push(new rocket(48, 48, "games/player/rocket.png", this.x, this.y,'image'));
			lastCreatedComponent.speed = 20;
			lastCreatedComponent.width = 16;
			lastCreatedComponent.height = 24;
			lastCreatedComponent.angle = this.angle;
			lastCreatedComponent.damage = 20;
			lastCreatedComponent.dice = 8;
			pixelExplosion(10,'#ff6666',this.x,this.y-16,this.angle,0.25,15);
			this.cooldown = 27;
			playsound('games/player/DSRLFIRE.mp3',SOUND_CHANNEL_WEAPON);
			this.setState(1 , "games/player/fire2.png")
			break;

			//plasma
			case 5:
			missiles_list.push(new plasma(15, 15, "games/player/plasma.png", this.x, this.y,'image'));
			lastCreatedComponent.speed = 25;
			lastCreatedComponent.width = 15;
			lastCreatedComponent.height = 15;
			lastCreatedComponent.angle = this.angle;
			lastCreatedComponent.damage = 5;
			lastCreatedComponent.dice = 8;
			pixelExplosion(2,'#3399ff',this.x,this.y-16,this.angle,0.3,12);
			this.cooldown = 4;
			playsound('games/player/DSPLAS2.mp3',SOUND_CHANNEL_WEAPON);
			this.setState(1 , "games/player/fire2.png")
			break;

			//bfg9k
			case 6:
			switch (this.weaponState) 
			{
				case 0:
				this.cooldown = 30;
				this.holdFire = true;
				this.weaponState = 1;
				playsound('games/player/dsbfg.mp3',SOUND_CHANNEL_WEAPON);
				this.setState(1 , "games/player/fire.png")
				break;
				case 1:
				missiles_list.push(new bfgball(45, 45, "games/player/bfgball.png", this.x, this.y,'image'));
				lastCreatedComponent.speed = 20;
				lastCreatedComponent.width = 45;
				lastCreatedComponent.height = 45;
				lastCreatedComponent.angle = this.angle;
				lastCreatedComponent.damage = 100;
				lastCreatedComponent.dice = 8;
				pixelExplosion(25,'#66ff99',this.x,this.y-16,this.angle,0.65,10);
				this.cooldown = 30;
				this.holdFire = false;
				this.weaponState = 0;
				this.setState(1 , "games/player/fire2.png")
				break;
			}
			break;

			case 7:
			missiles_list.push(new laser(64, 64, "games/player/laser.png", this.x, this.y,'image'));
			lastCreatedComponent.speed = 48;
			lastCreatedComponent.width = 8;
			lastCreatedComponent.height = 32;
			lastCreatedComponent.angle = this.angle;
			lastCreatedComponent.deathSound = 'games/player/dbfgex2.mp3';
			lastCreatedComponent.damage = 25;
			lastCreatedComponent.dice = 8;    
			pixelExplosion(5,'#0099ff',this.x,this.y-16,this.angle,0.3,20);    
			this.cooldown = 10;
			playsound('games/player/dbfgfir2.mp3',SOUND_CHANNEL_WEAPON);
			this.setState(1 , "games/player/fire2.png")
			break;
		}
	}
	this.bfgTracerAttack = function(){

		for (i = 0; i < 20; i ++) {  
			missiles_list.push(new bfgtracer(32, 32, "games/null.png", myGamePiece.x + getRandomInt(-256,256), myGamePiece.y,'image'));
			lastCreatedComponent.speed = 40+getRandomInt(0,8);
			lastCreatedComponent.angle = this.angle+((Math.random()-0.5)*2.5);
			lastCreatedComponent.damage = 98;
			lastCreatedComponent.dice = 2;        
		}
	}
	this.useAmmo = function(){
		if (this.currentWeapon == 1 || this.currentWeapon == 2) {
			this.ammo[1] -= this.weaponAmmoUse[this.currentWeapon];
			this.ammo[2] -= this.weaponAmmoUse[this.currentWeapon];
		} else if  (this.currentWeapon == 5 || this.currentWeapon == 6) {
			this.ammo[5] -= this.weaponAmmoUse[this.currentWeapon];
			this.ammo[6] -= this.weaponAmmoUse[this.currentWeapon];
		} else if (this.currentWeapon != 0) {
			this.ammo[this.currentWeapon] -= this.weaponAmmoUse[this.currentWeapon];
		}
	}

	this.player_update = function() {
		this.angle = (this.speedX/100);
		if (this.weaponHidden> -1) {this.weaponHidden -= 1;}
		if (this.pauseFire> -1) {this.pauseFire -= 1;}
		if (this.messageHidden> -1) {this.messageHidden -= 1;}
		if (this.weaponSwitchCooldown> -1) {this.weaponSwitchCooldown -= 1;}
		this.timer = this.timer + 1;
		if (this.tracerAttackNextFrame == true)
		{
			this.bfgTracerAttack();
			this.tracerAttackNextFrame = false;
		}
		if (this.cooldown>0) {
			this.cooldown -= 1;
			switch (this.currentWeapon) {
				case 0:
				myCrosshairH.width = this.cooldown * 3;
				break;
				case 3:
				myCrosshairH.width = this.cooldown * 5;
				break;
				case 4:
				myCrosshairH.width = this.cooldown * 2;
				break;
				case 5:
				myCrosshairH.width = this.cooldown * 8;
				break;
				case 6:
				myCrosshairH.width = this.cooldown * 4;
				break;
				case 7:
				myCrosshairH.width = this.cooldown * 10;
				break;
				default:
				myCrosshairH.width = this.cooldown;
				break;
			}
			myCrosshairH.color = '#ffff66';
			myCrosshairV.color = '#ffff66';
		} else {
			myCrosshairH.color = '#66ff66';
			myCrosshairV.color = '#66ff66';
			myCrosshairH.width = 16;
		}
		if (this.pauseFire > 0){
			this.isFiring = false;
		}
		if(this.weaponState == 0 && this.ammo[this.currentWeapon] < this.weaponAmmoUse[this.currentWeapon])
		{
			myCrosshairH.color = '#ff9999';
			myCrosshairV.color = '#ff9999';
			myMessage.text = 'Out of Ammo!';
			myGamePiece.messageHidden = 50;		
		} else {
			if ((this.isFiring == true || this.holdFire == true) && (this.cooldown <= 0))
			{
				this.player_fire();
				this.weaponHidden = 50;
				if (this.holdFire == false || this.usingAmmo == true){
					if (this.ammo[this.currentWeapon] >= this.weaponAmmoUse[this.currentWeapon])
					{
						this.useAmmo();
					} else {
						myCrosshairH.color = '#ff9999';
						myCrosshairV.color = '#ff9999';
						myMessage.text = 'Out of Ammo!';
						myGamePiece.messageHidden = 50;		
						this.pauseFire = this.cooldown+1;
						playsound('games/player/noammo.mp3',SOUND_CHANNEL_ACTION);
					}
				}
			}		
		}

		var bottom = myGameArea.canvas.height - this.height;
		if (this.y > bottom && this.speedY > 0) {
			this.y = bottom;
			this.speedY = this.speedY * 0.5;
		}
		var top = myGameArea.canvas.height / 2;
		if (this.y < top && this.speedY < 0) {
			this.y = top;
			this.speedY = this.speedY * 0.5;
		}
		var right = myGameArea.canvas.width - this.width;
		if (this.x > right && this.speedX > 0) {
			this.x = right;
			this.speedX = this.speedX * 0.5;
		}
		var left = this.width;
		if (this.x < left && this.speedX < 0) {
			this.x = left;
			this.speedX = this.speedX * 0.5;
		}

		this.runSpeed = Math.abs(this.speedX) + Math.abs(this.speedY);
		if (this.runSpeed > 0)
		{
			this.frameLength = Math.floor(25 / this.runSpeed)
		}
		else
		{
			this.frameLength = 999999999;   
		}

		switch (this.state) {
			case -1:
			if (this.timer == 15)
			{
				this.setState(0,'games/player/idle.png')             
			}
			break;
			case 1:
			if (this.timer == 10)
			{             
				this.setState(0,'games/player/idle.png')       
			}
			break;
			default:
			// statements_def
			break;
		}
	}
}
player.prototype = component.prototype;
player.prototype.constructor = player;

var missile = function()
{
	component.apply(this,arguments);
	this.missileUpdate = function()
	{

	}	
}
missile.prototype = component.prototype;
missile.prototype.constructor = missile;

var laser = function()
{
	missile.apply(this,arguments);
	this.explode = function()
	{
		this.splashDamage(128,128);
		this.explode0(143,114,"games/player/bfgx.png",3,6);
	}
	this.missileUpdate = function()
	{
		pixelExplosion1(1,'#9090ff',this.x,this.y,this.angle,6.28,3);
	}
}
laser.prototype = missile.prototype;
laser.prototype.constructor = laser;

var rocket = function()
{
	missile.apply(this,arguments);
	this.explode = function()
	{
		this.splashDamage(144,144);
		playsound('games/dxbarexp.mp3');
		this.explode0(103,86,"games/explode.png",6,3);
		pixelExplosion1(10,'#ffffcc',this.x,this.y,this.angle,6.28,10);
	}
	this.missileUpdate = function()
	{
		pixelExplosion1(1,'#353535',this.x,this.y,this.angle,6.28,2);
	}
}
rocket.prototype = missile.prototype;
rocket.prototype.constructor = rocket;

var tracer = function()
{
	missile.apply(this,arguments);
	this.explode = function()
	{
		pixelExplosion1(3,'#ff0000',this.x,this.y,this.angle,6.28,5);
	}
}
tracer.prototype = missile.prototype;
tracer.prototype.constructor = tracer;

var plasma = function()
{
	missile.apply(this,arguments);
	this.explode = function()
	{
		playsound('games/dsfirxpl.mp3');
		this.explode0(39,41,"games/player/plexp.png",5,4);
		pixelExplosion1(5,'#99ccff',this.x,this.y,this.angle,6.28,6);
	}
}
rocket.prototype = missile.prototype;
rocket.prototype.constructor = rocket;

var bfgball = function()
{
	missile.apply(this,arguments);
	this.explode = function()
	{
		playsound('games/player/dsrxplod.mp3');
		this.explode0(143,114,"games/player/bfgx2.png",6,6);
		pixelExplosion1(20,'#99ff99',this.x,this.y,this.angle,6.28,7);
		myGamePiece.tracerAttackNextFrame = true;
	}
}
bfgball.prototype = missile.prototype;
bfgball.prototype.constructor = bfgball;

var bfgtracer = function()
{
	missile.apply(this,arguments);
	this.explode = function()
	{
		this.explode0(64,50,"games/player/bfgx0.png",4,4);
		pixelExplosion1(5,'#99ff99',this.x,this.y,this.angle,6.28,7);
	}
}
bfgtracer.prototype = missile.prototype;
bfgtracer.prototype.constructor = bfgtracer;


var monsters = function()
{
	component.apply(this,arguments);
	lastCreatedMonster = this;
	this.targetRange = 99999;
	this.powerLevel = 100;
	this.isBoss = false;
	this.monster_update = function()
	{
	}

}
monsters.prototype = component.prototype;
monsters.prototype.constructor = monsters;

var cacodemon = function()
{
	monsters.apply(this,arguments);
	this.deathSound = "games/head/dscacdth.mp3";
	this.friction = 0.9;
	this.health = 300;
	this.maxhealth = 300;
	this.mass = 40;
	this.painChance = 35;
	this.frameLength = 5;
	this.powerLevel = 100;
	this.explode = function()
	{
		this.explode0(80,80,"games/head/death.png",6,6,true);
		deathDrop(100,this.x,this.y);
	}
	this.pain = function()
	{
		playsound("games/head/dsdmpain.mp3");
		this.setState(-1,'games/head/pain.png')    
	}
	this.monster_update = function()
	{
		this.timer = this.timer + 1;
		rnd = getRandomInt(1,20);
		if (this.state != 0) {
			rnd = getRandomInt(1,200);
		}
		if (rnd <= 2)
		{
			this.targetRange = myGamePiece.x - this.x;
			this.accelerationX = this.accelerationX + (Math.random() * this.targetRange / 6000);
		} 
		else if (rnd <= 4)
		{
			this.accelerationY = this.accelerationY + ((Math.random() - 0.5) / 10);
			this.accelerationX = this.accelerationX + ((Math.random() - 0.5) / 10);
		}
		else if (rnd <= 6)
		{
			range = (myGameArea.canvas.height / 4) - this.y;
			this.accelerationY = this.accelerationY + (Math.random() * range / 3000);
		}
		else if (rnd <= 7)
		{
			if (this.boundCheckImmunityTime < 0)
			{
				this.speedX = this.speedX - (this.speedX * Math.random() * Math.random());
				this.speedY = this.speedY - (this.speedY * Math.random() * Math.random());
			}
		}

		rnd = getRandomInt(0,100);
		if (rnd<=10)
		{
			rnd = Math.floor(Math.random() * Math.abs(this.targetRange) + 1);  
			if (rnd < _difficult / 20 + 5 && this.state == 0)
			{
				this.setState(1,'games/head/attack.png')
				this.targetRange = 99999;
				this.speedX = this.speedX * Math.random();
				this.speedY = this.speedY * Math.random();
				this.accelerationX = this.accelerationX * Math.random();
				this.accelerationY = this.accelerationY * Math.random();
			}
		}

		switch (this.state) {
			case 0:	
			if (this.accelerationX>0.5) {
				this.image.src = 'games/head/idleR.png';
			} 
			else if (this.accelerationX<-0.5) {
				this.image.src = 'games/head/idleL.png';
			}
			break;


			case 1:
			if (this.timer == 10)
			{ 
				playsound('games/head/dscacsit.mp3');
				this.setState(2,'games/head/attack2.png');
			}
			break;

			case 2:
			if (this.timer == 60)
			{
				playsound('games/head/dsfwoosh.mp3');
				this.setState(3);
				monsterball_list.push(new cacodemonBall(11, 49, "games/head/fireball.png", this.x, this.y,'image'));     
				lastCreatedComponent.speedY = 32;
				lastCreatedComponent.damage = 10;
				monsterball_list.push(new cacodemonBall(16, 16, "games/head/ball.png", this.x, this.y,'image'));     
				lastCreatedComponent.speedY = 8;      
				lastCreatedComponent.speedX = -4;          
				monsterball_list.push(new cacodemonBall(16, 16, "games/head/ball.png", this.x, this.y,'image'));     
				lastCreatedComponent.speedY = 8;      
				lastCreatedComponent.speedX = 4;      
				monsterball_list.push(new cacodemonBall(16, 16, "games/head/ball.png", this.x, this.y,'image'));     
				lastCreatedComponent.speedY = 6;      
				lastCreatedComponent.speedX = -6;
				monsterball_list.push(new cacodemonBall(16, 16, "games/head/ball.png", this.x, this.y,'image'));     
				lastCreatedComponent.speedY = 6;      
				lastCreatedComponent.speedX = 6;                   
			}
			break;

			case 3:
			if (this.timer == 10)
			{
				this.setState(0,'games/head/idle.png');               
			}
			break;

			case -1:
			if (this.timer == 5)
			{
				this.setState(0,'games/head/idle.png')   
			}
			break;

			default:
			// statements_def
			break;
		}
	}
}
cacodemon.prototype = monsters.prototype;
cacodemon.prototype.constructor = cacodemon;


var lostsoul = function(){
	monsters.apply(this,arguments);
	this.deathSound = "games/dsfirxpl.mp3";
	this.friction = getRandomFloat(0.85,0.95);
	this.health = 50;
	this.maxhealth = 50;
	this.mass = 10;
	this.frameLength = 6;
	this.damage = 4;
	this.painChance = 50;
	this.powerLevel = 25;
	this.explode = function()
	{
		chance = 125 - _difficult;
		if (chance<25) {chance = 25}
			this.explode0(103,90,"games/soul/death.png",6,6,true);
		deathDrop(30,this.x,this.y,chance);	
	}
	this.pain = function()
	{
		playsound("games/head/dsdmpain.mp3");
		this.setState(-1,'games/soul/pain.png') 
	}
	this.monster_update = function()
	{
		this.timer = this.timer + 1;
		rnd = getRandomInt(1,100);
		if (this.state != 0) {
			rnd = getRandomInt(1,1000);
		}
		if (rnd <= 10)
		{
			this.targetRange = myGamePiece.x - this.x;
			this.accelerationX = this.accelerationX + (Math.random() * this.targetRange / 6000);
		} 
		else if (rnd <= 13)
		{
			this.speedY = this.speedY + ((Math.random() - 0.5)*5);
			this.speedX = this.speedX + ((Math.random() - 0.5)*10);
		}
		else if (rnd <= 20)
		{
			range = (myGameArea.canvas.height / 4) - this.y;
			this.accelerationY = this.accelerationY + (Math.random() * range / 3000);
		}
		else if (rnd <= 30)
		{
			if (this.boundCheckImmunityTime < 0)
			{
				this.speedX = this.speedX - (this.speedX * Math.random() * Math.random());
				this.speedY = this.speedY - (this.speedY * Math.random() * Math.random());
			}
		}

		rnd = getRandomInt(0,100);
		if (this.y < (myGameArea.canvas.height / 3))
		{
			if (rnd<=4)
			{
				rnd = Math.floor(Math.random() * Math.abs(this.targetRange / 4) + 1);  
				if (rnd < _difficult / 20+5 && this.state == 0)
				{
					this.setState(1,'games/soul/attack.png')
					this.frameLength = 5;
					this.targetRange = 99999;
					this.timer = -getRandomInt(0,10);
					this.speedX = this.speedX * Math.random();
					this.speedY = this.speedY * Math.random();
				}
			}
		} else {
			if (this.isCharging == false)
			{
				this.speedY = this.speedY - 1;
			}
		}

		switch (this.state) {
			case 0:	
			this.frameLength = 6;
			if (this.accelerationX>0.5) {
				this.image.src = 'games/soul/idleR.png';
			} 
			else if (this.accelerationX<-0.5) {
				this.image.src = 'games/soul/idleL.png';
			}
			break;

			case 1:
			if (this.timer >= 5)
			{ 
				playsound('games/soul/dssklatk.mp3');
				this.setState(2)
				this.chargeAt(myGamePiece,getRandomInt(5,20)+(myGameArea.canvas.height/100),Math.random());   
				this.timer = getRandomInt(Math.floor(-0.1*_difficult),25)
				this.friction = getRandomFloat(0.95,0.99);
				this.isCharging = true;
			} 
			break;

			case 2:
			this.chargeAt(myGamePiece,1);
			if (this.timer >= 30)
			{
				this.friction = getRandomFloat(0.85,0.95);
				this.setState(0,'games/soul/idle.png');  
				this.isCharging = false;

			}
			break;

			case -1:
			if (this.timer >= 5)
			{
				this.friction = getRandomFloat(0.85,0.95);
				this.setState(0,'games/soul/idle.png')   
				this.isCharging = false;
			}
			break;

			default:
			// statements_def
			break;
		}

	}
}
lostsoul.prototype = monsters.prototype;
lostsoul.prototype.constructor = lostsoul;


var afrit = function(){
	monsters.apply(this,arguments);
	this.deathSound = "games/afrit/dsbrsdth.mp3";
	this.friction = 0.85;
	this.health = 1000;
	this.maxhealth = 1000;
	this.mass = 100;
	this.frameLength = 8;
	this.painChance = 12;
	this.powerLevel = 400;
	this.explode = function()
	{
		this.explode0(64,116,"games/afrit/death.png",6,6,true);
		deathDrop(250,this.x-16,this.y);
		deathDrop(250,this.x+16,this.y);
	}
	this.pain = function()
	{
		playsound("games/head/dsdmpain.mp3");
		this.setState(-1,'games/afrit/pain.png');
	}
	this.monster_update = function()
	{
		this.timer = this.timer + 1;
		rnd = getRandomInt(1,200);
		if (rnd <= 20)
		{
			this.targetRange = myGamePiece.x - this.x;
			this.accelerationX = this.accelerationX + (Math.random() * this.targetRange / 20000);
		} 
		else if (rnd <= 30)
		{
			this.speedY = this.speedY + ((Math.random() - 0.5)*5);
			this.speedX = this.speedX + ((Math.random() - 0.5)*5);
		}
		else if (rnd <= 31)
		{
			this.accelerationY = this.accelerationY + ((Math.random() - 0.5));
			this.accelerationX = this.accelerationX + ((Math.random() - 0.5));
		}
		else if (rnd <= 40)
		{
			range = (myGameArea.canvas.height / 4) - this.y;
			this.accelerationY = this.accelerationY + (Math.random() * range / 3000);
			this.speedY = this.speedY + (Math.random() * range / 300);
		}
		else if (rnd <= 50)
		{
			if (this.boundCheckImmunityTime < 0 && this.speedX + this.speedY > 5)
			{
				this.speedX = this.speedX * Math.random();
				this.speedY = this.speedY * Math.random();
				this.accelerationX = this.accelerationX * Math.random();
				this.accelerationY = this.accelerationY * Math.random();				
			}
		}

		rnd = getRandomInt(0,100);

		if (this.y < (myGameArea.canvas.height / 2))
		{
			if (rnd<=4)
			{
				rnd = Math.floor(Math.random() * Math.abs(this.targetRange) / 2 + 1);  
				if (rnd < _difficult / 40 + 5 && this.state == 0)
				{
					this.setState(1,'games/afrit/attack1.png')
					playsound('games/afrit/dsbrssit.mp3')
					this.frameLength = 6;
					this.targetRange = this.targetRange + (Math.random()*2000);
					this.speedX = this.speedX * Math.random();
					this.speedY = this.speedY * Math.random();
					this.accelerationX = this.accelerationX * Math.random() * Math.random();
					this.accelerationY = this.accelerationY * Math.random() * Math.random();
				}
			}
		} else {
			this.accelerationY = this.accelerationY - 0.001;
		}

		switch (this.state) {
			case 0:	
			if (this.accelerationX>0.5) {
				this.image.src = 'games/afrit/idleR.png';
			} 
			else if (this.accelerationX<-0.5) {
				this.image.src = 'games/afrit/idleL.png';
			}
			break;


			case 1:
			if (this.timer >= 50)
			{ 
				this.setState(2,'games/afrit/attack2.png');
			}
			break;

			case 2:
			if (this.timer >= 14)
			{
				playsound('games/afrit/dsfirsht.mp3');
				playsound('games/afrit/dsskeatk.mp3');
				this.setState(0,'games/afrit/idle.png'); 
				angl = -1;
				for (var z = 0; z < 3; z++) {
					monsterball_list.push(new afritBall(67, 67, "games/afrit/fireball.png", this.x, this.y,'image')); 
					lastCreatedComponent.width = 48;    
					lastCreatedComponent.height = 48;  
					lastCreatedComponent.speed = 20;
					lastCreatedComponent.angle = -3.14 + angl;
					angl = angl + 1;
				}
				for (var z = 0; z < 2; z++) {
					angl = Math.random()-0.5;
					monsterball_list.push(new revenantMissile(49, 49, "games/afrit/fireball2.png", this.x, this.y,'image')); 
					lastCreatedComponent.width = 24;    
					lastCreatedComponent.height = 24;  
					lastCreatedComponent.speed = 10;
					lastCreatedComponent.angle = -3.14 + angl;
				}
			}
			break;

			case -1:
			if (this.timer == 8)
			{
				this.setState(0,'games/afrit/idle.png')   
			}
			break;

			default:
			// statements_def
			break;
		}

	}
}
afrit.prototype = monsters.prototype;
afrit.prototype.constructor = afrit;

var painSpawner = function()
{
	specialEffect.apply(this,arguments);
	this.timer = 10;
	this.effect_update = function()
	{
		if (this.timer > 0)
		{
			this.timer = this.timer - 1;                
		}
		if (this.timer == 1)
		{
			for (var z = 0; z < 3; z++) {
				monsters_list.push(new lostsoul(44, 51, "games/soul/idle.png", this.x, this.y,'image'));
				_powerLevel += lastCreatedMonster.powerLevel;
				lastCreatedComponent.speedX = (Math.random() - 0.5) * 40;
				lastCreatedComponent.speedY = (Math.random() - 0.5) * 40;			
				playsound('games/soul/dssklatk.mp3');
			}
		}
	}
}

var painElemental = function() {
	monsters.apply(this,arguments);
	this.friction = 0.8;
	this.health = 300;
	this.maxhealth = 300;
	this.mass = 40;
	this.painChance = 35;
	this.frameLength = 8;
	this.powerLevel = 150;
	this.explode = function()
	{	
		effect_list.push(new painSpawner(1, 1, 'games/null.png', this.x, this.y,'image'));
		playsound("games/pain/dspedth.mp3");
		this.explode0(102,86,"games/pain/death.png",6,6,true);
		deathDrop(150,this.x,this.y);
	}
	this.pain = function()
	{
		playsound("games/pain/dspepain.mp3");
		this.setState(-1,'games/pain/pain.png')    
	}
	this.monster_update = function()
	{
		this.timer = this.timer + 1;
		rnd = getRandomInt(1,20);
		if (rnd <= 2)
		{
			this.targetRange = myGamePiece.x - this.x;
			this.accelerationX = this.accelerationX + (Math.random() * this.targetRange / 6000);
		} 
		else if (rnd <= 4)
		{
			this.accelerationY = this.accelerationY + ((Math.random() - 0.5) / 10);
			this.accelerationX = this.accelerationX + ((Math.random() - 0.5) / 10);
		}
		else if (rnd <= 6)
		{
			range = (myGameArea.canvas.height / 4) - this.y;
			this.accelerationY = this.accelerationY + (Math.random() * range / 3000);
		}
		else if (rnd <= 8)
		{
			if (this.boundCheckImmunityTime < 0)
			{
				this.speedX = this.speedX * (1 - (Math.random() * Math.random()));
				this.speedY = this.speedY * (1 - (Math.random() * Math.random()));
			}
		}

		rnd = getRandomInt(0,200);
		if (rnd + Math.floor(_powerLevel * 5 / _maxPowerLevel) <=10)
		{
			rnd = Math.floor(Math.random() * Math.abs(this.targetRange) + 1);  
			if (rnd < _difficult / 40 + 5 && this.state == 0)
			{
				this.setState(1,'games/pain/attack1.png')
				this.targetRange = 99999;
				this.speedX = this.speedX * Math.random();
				this.speedY = this.speedY * Math.random();
				this.accelerationX = this.accelerationX * Math.random();
				this.accelerationY = this.accelerationY * Math.random();
			}
		}

		switch (this.state) {
			case 0:	
			if (this.accelerationX>0.5) {
				this.image.src = 'games/pain/idleR.png';
			} 
			else if (this.accelerationX<-0.5) {
				this.image.src = 'games/pain/idleL.png';
			}
			break;


			case 1:
			if (this.timer == 16)
			{
				this.setState(2,'games/pain/attack2.png');
				monsters_list.push(new lostsoul(44, 51, "games/soul/idle.png", this.x, this.y,'image'));
				_powerLevel += lastCreatedMonster.powerLevel;
				playsound('games/soul/dssklatk.mp3');
				lastCreatedComponent.setState(2)
				lastCreatedComponent.chargeAt(myGamePiece,getRandomInt(15,30),Math.random());   
				lastCreatedComponent.timer = getRandomInt(0,25)
				lastCreatedComponent.friction = getRandomFloat(0.95,0.99);
				lastCreatedComponent.isCharging = true;
			}
			break;

			case 2:
			if (this.timer == 6)
			{
				this.setState(0,'games/pain/idle.png');               
			}
			break;

			case -1:
			if (this.timer == 6)
			{
				this.setState(0,'games/pain/idle.png')   
			}
			break;

			default:
			// statements_def
			break;
		}
	}
}
painElemental.prototype = monsters.prototype;
painElemental.prototype.constructor = painElemental;

var cardinal = function()
{
	monsters.apply(this,arguments);
	this.friction = 0.9;
	this.health = 4000;
	this.maxhealth = 4000;
	this.mass = 200;
	this.painChance = 5;
	this.frameLength = 6;
	this.powerLevel = 10000;
	this.isBoss = true
	this.attackRemain = 0;
	this.explode = function()
	{
		myGamePiece.health = 200;
		myGamePiece.armor = 200;
		this.explode0(140,140,"games/card/death.png",8,8,true);
		_score += 50000;
		_nextEvent = 3;
		_eventCooldown = 100;
	}
	this.pain = function()
	{
		playsound("games/head/dsdmpain.mp3");
		this.setState(-1,'games/card/pain.png')    
		this.imageWidth = 140;
		this.imageHeight = 140;
	}
	this.monster_update = function()
	{
		this.timer = this.timer + 1;
		rnd = getRandomInt(1,100);
		if (rnd <= 25)
		{
			this.targetRange = myGamePiece.x - this.x;
			this.accelerationX = this.accelerationX + (Math.random() * this.targetRange / 10000);
			this.speedX = this.speedX + (Math.random() * this.targetRange / 200);
		} 
		else if (rnd <= 30)
		{
			this.speedY = this.speedY + ((Math.random() - 0.5)*2.5);
			this.speedX = this.speedX + ((Math.random() - 0.5)*5);
		}
		else if (rnd <= 32)
		{
			this.accelerationY = this.accelerationY + ((Math.random() - 0.5));
			this.accelerationX = this.accelerationX + ((Math.random() - 0.5));
		}
		else if (rnd <= 40)
		{
			range = (myGameArea.canvas.height / 4) - this.y;
			this.accelerationY = this.accelerationY + (Math.random() * range / 6000);
			this.speedY = this.speedY + (Math.random() * range / 600);
		}
		else if (rnd <= 45)
		{
			if (this.speedX + this.speedY > 5)
			{
				this.speedX = this.speedX * Math.random();
				this.speedY = this.speedY * Math.random();
				this.accelerationX = this.accelerationX * Math.random();
				this.accelerationY = this.accelerationY * Math.random();				
			}
		}

		rnd = getRandomInt(0,100);

		if (this.y < (myGameArea.canvas.height / 2))
		{
			if (rnd<=10)
			{
				rnd = Math.floor(Math.random() * Math.abs(this.targetRange) / 2 + 1);  
				if (rnd < 10 && this.state == 0)
				{
					this.setState(1,'games/card/attack1.png')
					this.imageWidth = 104;
					this.imageHeight = 104;
					this.attackRemain = getRandomInt(1,2)*getRandomInt(1,2)*getRandomInt(1,2)+2;
					//playsound('games/card/dscybsit.mp3')
					this.targetRange = this.targetRange + (Math.random()*1000);
					this.speedX = this.speedX * Math.random();
					this.speedY = this.speedY * Math.random();
					this.accelerationX = this.accelerationX * Math.random();
					this.accelerationY = this.accelerationY * Math.random();
				}
			}
		} 
		else 
		{
			this.speedY = this.speedY - 1;
			this.accelerationY = this.accelerationY - 0.1;	
		}

		switch (this.state) {
			case 0:	
			if (this.accelerationX>0.5) {
				this.image.src = 'games/card/idleR.png';
			} 
			else if (this.accelerationX<-0.5) {
				this.image.src = 'games/card/idleL.png';
			}
			break;


			case 1:
			if (this.timer >= 12)
			{ 
				this.setState(2,'games/card/attack2.png');
				playsound('games/player/DSRLFIRE.mp3');
				this.imageWidth = 104;
				this.imageHeight = 104;
				angl = getRandomFloat(-0.25,0.25);
				monsterball_list.push(new monsterRocket(48, 48, "games/player/rocket.png", this.x + 15, this.y + 2,'image')); 
				lastCreatedComponent.width = 24;    
				lastCreatedComponent.height = 24;  
				lastCreatedComponent.speed = getRandomInt(16,24);
				lastCreatedComponent.angle = -3.14 + angl;
				this.attackRemain -= 1;
				this.speedX = this.speedX * Math.random();
				this.speedY = this.speedY * Math.random();
				this.accelerationX = this.accelerationX * Math.random();
				this.accelerationY = this.accelerationY * Math.random();
			}
			break;

			case 2:
			if (this.timer >= 12)
			{
				if (this.attackRemain>0)
				{
					this.setState(1,'games/card/attack1.png');
				}
				else
				{
					this.setState(0,'games/card/idle.png')   			
				}
				this.imageWidth = 104;
				this.imageHeight = 104;
			}
			break;

			case -1:
			if (this.timer == 8)
			{
				this.setState(0,'games/card/idle.png')   
				this.imageWidth = 104;
				this.imageHeight = 104;
			}
			break;

			default:
			// statements_def
			break;
		}
	}


}
cardinal.prototype = monsters.prototype;
cardinal.prototype.constructor = cardinal;

var specialEffect = function(){
	lastCreatedSpecialEffect = this;
	component.apply(this,arguments);               
	this.timer = -1;
	this.effect_update = function(){
		if (this.timer > 0)
		{
			this.timer = this.timer - 1;                
		}
	}
}
specialEffect.prototype = component.prototype;
specialEffect.prototype.constructor = specialEffect;

var pickup = function(){
	lastCreatedPickup = this;
	component.apply(this,arguments);     
	this.healthGive = 0;
	this.bulletGive = 0;
	this.shellsGive = 0;
	this.rocketGive = 0;
	this.cellsGive = 0;
	this.DcellsGive = 0;
	this.armorGive = 0;
	this.armorSave = 0;
	this.healthMax = 100;
	this.armorMax = 100;
	this.doubleAmmo = false;
	this.weaponGive = -1;
	this.accelerationY = 0.05;
	this.speedY = -1;
	this.pickupSound = 'games/items/dsitemup.mp3';
}
pickup.prototype = component.prototype;
pickup.prototype.constructor = pickup;

var monsterBall = function(){
	component.apply(this,arguments);
	this.explode = function()
	{

	}
	this.monsterballUpdate = function()
	{

	}
}
monsterBall.prototype = component.prototype;
monsterBall.prototype.constructor = monsterBall;


var cacodemonBall = function(){
	monsterBall.apply(this,arguments);
	this.damage = 5;
	this.dice = 8;
	this.deathSound = 'games/dsfirxpl.mp3';
	this.explode = function()
	{
		this.explode0(64, 64, "games/head/ballexp.png",3,3);
	}
	this.monsterballUpdate = function()
	{
		this.friction = ((Math.random() * 0.02) + 0.98);
		this.accelerationY = this.accelerationY + ((Math.random() - 0.5)*(0.02+(_difficult / 1000)));
		this.accelerationX = this.accelerationX + ((Math.random() - 0.5)*(0.02+(_difficult / 1000)));
	}
}
cacodemonBall.prototype = monsterBall.prototype;
cacodemonBall.prototype.constructor = cacodemonBall;


var afritBall = function() {
	monsterBall.apply(this,arguments);
	this.damage = 8;
	this.dice = 8;
	this.state = 1;
	this.deathSound = 'games/dsfirxpl.mp3';
	this.explode = function()
	{
		this.explode0(103, 86, "games/explode.png",6,3);
	}
}
afritBall.prototype = monsterBall.prototype;
afritBall.prototype.constructor = afritBall;

var revenantMissile = function() {
	monsterBall.apply(this,arguments);
	this.damage = 10;
	this.dice = 8;
	this.state = 1;
	this.friction = 0.95;
	this.deathSound = 'games/dxbarexp.mp3';
	this.homingStrength = 0.05
	this.explode = function()
	{
		this.explode0(45, 45, "games/afrit/fexp.png",6,3);
	}
	this.monsterballUpdate = function()
	{
		this.homingAt(myGamePiece,this.homingStrength);
		if (this.homingStrength>0)
		{
			this.homingStrength -= 0.001;
			pixelExplosion1(1,'#555555',this.x,this.y,this.angle,6.28,2);
		}
	}
}
revenantMissile.prototype = monsterBall.prototype;
revenantMissile.prototype.constructor = revenantMissile;

var monsterRocket = function() {
	monsterBall.apply(this,arguments);
	this.damage = 20;
	this.dice = 4;
	this.state = 1;
	this.friction = 0.95;
	this.deathSound = 'games/dxbarexp.mp3';
	this.homingStrength = getRandomFloat(0.01,0.05);
	this.explode = function()
	{
		this.explode0(103,86,"games/explode.png",6,3);
	}
	this.monsterballUpdate = function()
	{
		this.homingAt(myGamePiece,this.homingStrength);
		if (this.homingStrength>0)
		{
			this.homingStrength -= 0.00025;
			pixelExplosion1(1,'#444444',this.x,this.y,this.angle,6.28,2);
		}
	}	
}
monsterRocket.prototype = monsterBall.prototype;
monsterRocket.prototype.constructor = monsterRocket;

function updateGameArea() 
{
	if (_windowWidth != document.body.clientWidth || _windowHeight != document.body.clientHeight)
	{
		myGameArea.resize();
	}

	_windowWidth = document.body.clientWidth;
	_windowHeight = document.body.clientHeight;
	myGameArea.clear();
	myGameArea.frameNo += 1;

	// 	console.log('MISSILES[] ' + missiles_list.length)
	// 	console.log('MONSTERS[] ' + monsters_list.length)
	// 	console.log('MONSTER_BALL[] ' + monsterball_list.length)
	// 	console.log('EFFECT[] ' + effect_list.length)

	if (_gameState > 0)
	{
		if (_messageHeight>0)
		{
			_messageHeight -= 1;
		}

		for (i = missiles_list.length - 1; i >= 0; i -= 1)
		{
			missiles_list[i].missileUpdate();
			for (j = monsters_list.length - 1; j >= 0; j -= 1)
			{
				if (missiles_list[i].crashWith(monsters_list[j])) 
				{
					missiles_list[i].harm(monsters_list[j]);
					_score += Math.floor(lastDamageTaken);

					if (scouterCheck == 0 && monsters_list[j].maxhealth > 100 || myGamePiece.currentWeapon == 0)
					{
						scouterTarget = monsters_list[j];
						scouterHidden = Math.floor(Math.sqrt(lastDamageTaken) + 10);
						scouterCheck = 1;
					}

					missiles_list[i].explode();
					missiles_list[i].death();
				}
			} 
			if (missiles_list[i].isDead == true)
			{
				delete missiles_list[i];
				missiles_list.splice(i, 1);
			}
		}

		myScore.text="Progress: " + (_difficult - 10) + ' %';
		myLuck.text="Drop Rate: " + _luck;
		myPowerLevel.text="Threat Level: " + _powerLevel;
		myDmg.text="Score: " + _score;
		myKill.text="Kills: " + _killCount;		
		_skybox.frameX = _skybox.frameX - 0.1;
		_skyhell.frameX = _skyhell.frameX - 0.1;
		if (_skybox.frameX <= -_skybox.width) {
			_skybox.frameX = 0;
			_skyhell.frameX = 0;
		}

		_skybox2.frameX = _skybox.frameX + _skybox.width;
		_skyhell2.frameX = _skybox.frameX + _skybox.width;


		_skyhell.update();	
		_skyhell2.update();		

		_skybox.update();
		_skybox2.update();

		_skybox.transparency = 1.25 - _difficult*0.015;
		if (_skybox.transparency > 1) 
			{_skybox.transparency = 1}
		if (_skybox.transparency < 0) 
			{_skybox.transparency = 0}
		_skybox2.transparency = _skybox.transparency;

		_ground.update();
		targetAlpha =  (3 - _tension) / 3;
		if (_ground2.transparency < targetAlpha)
		{
			_ground2.transparency += 0.01;
		} else {
			_ground2.transparency -= 0.01;			
		}
		_ground2.transparency = _ground2.transparency + (Math.sin(myGameArea.frameNo / 30) * 0.0125);
		if (_ground2.transparency > 1) 
			{_ground2.transparency = 1}
		if (_ground2.transparency < 0) 
			{_ground2.transparency = 0}

		_ground2.update();

		myGameArea.flash();

		if (_systemMessage.text)
		{
			_systemMessage.update();
		}

		myGamePiece.accelerationX = 0;
		myGamePiece.accelerationY = 0;          
		myGamePiece.isFiring = false;

		if (myGameArea.keys && (myGameArea.keys[37] || myGameArea.keys[65])) {myGamePiece.accelerationX = -myGamePiece.speed; }
		if (myGameArea.keys && (myGameArea.keys[39] || myGameArea.keys[68])) {myGamePiece.accelerationX = myGamePiece.speed; }
		if (myGameArea.keys && (myGameArea.keys[38] || myGameArea.keys[87])) {myGamePiece.accelerationY= -myGamePiece.speed; }
		if (myGameArea.keys && (myGameArea.keys[40] || myGameArea.keys[83])) {myGamePiece.accelerationY= myGamePiece.speed; }

		if (myGameArea.keys && (myGameArea.keys[16] || myGameArea.keys[13])) {myGamePiece.isFiring = true; }

		if (myGameArea.keys && myGameArea.keys[49]) {myGamePiece.player_switch(0); }
		else if (myGameArea.keys && myGameArea.keys[50]) {myGamePiece.player_switch(1); }
		else if (myGameArea.keys && myGameArea.keys[51]) {myGamePiece.player_switch(2); }
		else if (myGameArea.keys && myGameArea.keys[52]) {myGamePiece.player_switch(3); }
		else if (myGameArea.keys && myGameArea.keys[53]) {myGamePiece.player_switch(4); }
		else if (myGameArea.keys && myGameArea.keys[54]) {myGamePiece.player_switch(5); }
		else if (myGameArea.keys && myGameArea.keys[55]) {myGamePiece.player_switch(6); }
		else if (myGameArea.keys && myGameArea.keys[56]) {myGamePiece.player_switch(7); }
		else if (myGameArea.keys && myGameArea.keys[69]) 
		{
			if (myGamePiece.weaponSwitchCooldown <= 0)
			{
				i = 1;
				j = myGamePiece.currentWeapon + i;
				if (j>7) {j-=8};
				while (myGamePiece.player_quickSwitch(j) == false && i < 6) {
					i++;
					j = myGamePiece.currentWeapon + i;
					if (j>7) {j-=8};
				}
			}
		} 
		else if (myGameArea.keys && myGameArea.keys[81]) {
			if (myGamePiece.weaponSwitchCooldown <= 0)
			{
				i = -1;
				j = myGamePiece.currentWeapon + i;
				if (j<0) {j+=8};
				while (myGamePiece.player_quickSwitch(j) == false && i > -6) {
					i--;
					j = myGamePiece.currentWeapon + i;
					if (j<0) {j+=8};
				}
			}
		} else 
		{
			myGamePiece.weaponSwitchCooldown = 0;
		}

		myHealth.text = myGamePiece.health;
		myScore.update();
		myLuck.update();
		myPowerLevel.update();
		myKill.update();
		myDmg.update();

		_targetCrosshairY = 0;
		//myCrosshairH.height = 2;
		//myCrosshairV.width = 2;
		myCrosshairV.height = 16;
		for (var i = monsters_list.length - 1; i >= 0; i--) {
			if (myCrosshairH.x < monsters_list[i].x + monsters_list[i].width && myCrosshairH.x > monsters_list[i].x - monsters_list[i].width && monsters_list[i].y < myGamePiece.y) 
			{
				if (_targetCrosshairY < monsters_list[i].y + monsters_list[i].height)
				{
					_targetCrosshairY = monsters_list[i].y + monsters_list[i].height;
					//myCrosshairH.height = 4;
					//myCrosshairV.width = 4;
					yextend = (monsters_list[i].width - Math.abs(myCrosshairH.x-monsters_list[i].x)) * 0.5;
					myCrosshairV.height = Math.floor((myGameArea.canvas.height - myCrosshairH.y)*0.025 + yextend);
				}
			}
		}
		if (_targetCrosshairY < 1)
		{
			_targetCrosshairY = myGameArea.canvas.height/2
		}

		if (myCrosshairH.y < _targetCrosshairY)
		{
			myCrosshairH.y += (_targetCrosshairY - myCrosshairH.y) * 0.05
		} else {
			myCrosshairH.y -= (myCrosshairH.y - _targetCrosshairY) * 0.05
		}
		myCrosshairV.y = myCrosshairH.y;

		if (scouterCheck>0 && scouterTarget) {
			myScouter.text = Math.floor(scouterTarget.health);

			hp = scouterTarget.health / scouterTarget.maxhealth;
			// console.log(hp);
			if (hp > 0.5)
			{
				colorG = 'ff';
				colorR = convert.dec2hex(Math.floor((2 - (hp*2))*255));		
				if (colorR.length < 2){
					colorR = '0' + colorR;
				}
			}
			else if (hp <= 0.5 && hp > 0)
			{
				colorG = convert.dec2hex(Math.floor((hp*2)*255));
				if (colorG.length < 2){
					colorG = '0' + colorG;
				}
				colorR = 'ff';
			} 
			else if (hp <= 0)
			{
				colorG = 'ff';
				colorR = 'ff';
			}
			// console.log('#' + colorR + colorG + '00');
			myScouter.color = '#' + colorR + colorG + '00';
			myScouter.x = scouterTarget.x;
			myScouter.y = scouterTarget.y + Math.ceil(scouterTarget.height / 2 + 16);
			scouterCheck = 0;
		}

		if (myHUD.hidden > 0) {
			myHUD.update();
			if (myGamePiece.armor > 0)
			{
				myArmorCounter.text = myGamePiece.armor;
				myArmor.update();
				myArmorCounter.update();
			}
		}
		if (myGamePiece.isDead == false) {
			myHealth.update();
		}
		if (myGamePiece.weaponHidden > 0) {
			myWeapon.update();
			if (myGamePiece.currentWeapon != 0) {
				myAmmoCounter.text = myGamePiece.ammo[myGamePiece.currentWeapon];
				myAmmoCounter.update();
			}
		}
		if (myGamePiece.messageHidden > 0) {
			myMessage.update();
		}
		myHUD.HUD_update();

		for (i = 0; i < pixel_list.length; i += 1) 
		{
			pixel_list[i].update();
			pixel_list[i].newPos();
			if (pixel_list[i].life>0)
			{
				pixel_list[i].life -= 1;
				if (pixel_list[i].life<=0)
				{
					delete pixel_list[i];
					pixel_list.splice(i, 1);
				}
			}
		}

		if (myGamePiece.isDead == false) {
			myGamePiece.player_update();
			myGamePiece.newPos();
			myGamePiece.update();
		}

		if (everyinterval(10)) {

			_difficult = Math.floor(myGameArea.frameNo / 200) + 10;
			spawnMonster();
		}

		for (i = 0; i < missiles_list.length; i += 1) {
			missiles_list[i].x += missiles_list[i].speed * Math.sin(missiles_list[i].angle);
			missiles_list[i].y -= missiles_list[i].speed * Math.cos(missiles_list[i].angle);
			missiles_list[i].update();
			if (missiles_list[i].boundCheck())
			{
				delete missiles_list[i];
				missiles_list.splice(i, 1);
			}
		}

		for (i = monsters_list.length - 1; i >= 0; i -= 1) {
			monsters_list[i].newPos();
			monsters_list[i].update();
			monsters_list[i].monster_update();
			monsters_list[i].boundpush();     
			if (monsters_list[i].isDead)
			{
				_killCount += 1;
				_powerLevel -= monsters_list[i].powerLevel;
				delete monsters_list[i];
				monsters_list.splice(i, 1);
			} 
			else if (monsters_list[i].boundCheck() && monsters_list[i].isBoss == false) {
				_powerLevel -= monsters_list[i].powerLevel;
				delete monsters_list[i];
				monsters_list.splice(i, 1);
			}
			else if(monsters_list[i].isCharging == true) {
				if (monsters_list[i].crashWith(myGamePiece)) {
					monsters_list[i].harm(myGamePiece);
					monsters_list[i].isCharging = false;
					monsters_list[i].timer = 99999;
					monsters_list[i].speedX = monsters_list[i].speedX * Math.random();
					monsters_list[i].speedY = monsters_list[i].speedY * Math.random();
					monsters_list[i].chargeAt(myGamePiece,-getRandomInt(10,20));
				}
			}
		}

		for (i = 0; i < monsterball_list.length; i += 1) {
			if (monsterball_list[i].state == 1)
			{
				monsterball_list[i].x += monsterball_list[i].speed * Math.sin(monsterball_list[i].angle);
				monsterball_list[i].y -= monsterball_list[i].speed * Math.cos(monsterball_list[i].angle);
			} 
			monsterball_list[i].newPos();
			monsterball_list[i].update();
			monsterball_list[i].monsterballUpdate();
			if (monsterball_list[i].boundCheck())
			{
				delete monsterball_list[i];
				monsterball_list.splice(i, 1);
			}
		}


		for (i = 0; i < effect_list.length; i += 1) 
		{ 
			effect_list[i].update();
			effect_list[i].newPos();
			effect_list[i].effect_update();
			if (effect_list[i].timer == 0) 
			{
				delete effect_list[i];
				effect_list.splice(i, 1);
			}
		}    

		for (i = 0; i < pickup_list.length; i += 1) { 
			pickup_list[i].update();
			pickup_list[i].newPos();
			if (pickup_list[i].speedY > 4)
			{
				pickup_list[i].speedY = 4;
			}

			if (pickup_list[i].timer>0) {
				pickup_list[i].timer -= 1
			}

			if (pickup_list[i].y > myGameArea.canvas.height + 32) 
			{
				delete pickup_list[i];
				pickup_list.splice(i, 1);
			} 
			else if (pickup_list[i].crashWith(myGamePiece) && pickup_list[i].timer<=0) 
			{
				pickup_list[i].timer = pickup_list[i].timer + 5;
				if (myGamePiece.eatItem(pickup_list[i]))
				{
					delete pickup_list[i];
					pickup_list.splice(i, 1);
				}
			}
		}    

		for (i = 0; i < message_list.length; i += 1) { 
			message_list[i].update();
			message_list[i].newPos();
			message_list[i].timer -= 1;

			//degrade color
			colorR = convert.hex2dec(message_list[i].color.slice(1,3));
			colorG = convert.hex2dec(message_list[i].color.slice(3,5));
			colorB = convert.hex2dec(message_list[i].color.slice(5,7));
			if (colorR>0) 
			{
				colorR -= 1
			}
			if (colorG>0) 
			{
				colorG -= 1
			}
			if (colorB>0) 
			{
				colorB -= 1
			}
			colorR = convert.dec2hex(colorR);
			if (colorR.length < 2){
				colorR = '0' + colorR;
			}
			colorG = convert.dec2hex(colorG);
			if (colorG.length < 2){
				colorG = '0' + colorG;
			}
			colorB = convert.dec2hex(colorB);
			if (colorB.length < 2){
				colorB = '0' + colorB;
			}
			message_list[i].color = ('#' + colorR + colorG + colorB);

			if (message_list[i].timer <= 0) 
			{
				delete message_list[i];
				message_list.splice(i, 1);
			}
		}

		for (i = 0; i < monsterball_list.length; i += 1) 
		{
			if ((monsterball_list[i].crashWith(myGamePiece) && (myGamePiece.isDead == false))) 
			{
				monsterball_list[i].harm(myGamePiece)                 
				monsterball_list[i].explode();
				delete monsterball_list[i];
				monsterball_list.splice(i, 1);      
			}
		}

		myCrosshairH.update();
		myCrosshairV.update();

		if (scouterHidden > 0)
		{
			myScouter.update();
			scouterHidden -= 1;
		}

	} 
	else if(_gameState == 0)
	{
		switch (_currentMenu) {
			case 0:
			_logo.update();
			_newGame.update();
			_readme.update();
			_option.update();
			_rank.update();
			_skull.update();
			break;
			case 1:
			_help.update();
			break;
			case 2:
			
			break;
			case 3:
			for (var i = highscores_list.length - 1; i >= 0; i--) {
				highscores_list[i].update();

			}
			break;
			default:
			// statements_def
			break;
		}

		if(_cursorCooldown > -15) {_cursorCooldown -= 1;}
		_skull.y = myGameArea.canvas.height/2 + _cursorOffset;
		if (_cursorCooldown<0 && myGameArea.keys && _currentMenu == 0 && (myGameArea.keys[38] || myGameArea.keys[87])) 
		{
			_cursorCooldown = (6 - _cursorCooldown)	
			_selectedMenu -= 1;		
			playsound('games/dspstop.mp3');
			if (_selectedMenu<0)
			{
				_selectedMenu = _menuItemMax
				_cursorOffset = _menuItemMax * 32;
			} else {
				_cursorOffset -= 32;	
			}
		}
		else if (_cursorCooldown<0 && myGameArea.keys && _currentMenu == 0 && (myGameArea.keys[40] || myGameArea.keys[83])) 
		{
			_cursorCooldown = (6 - _cursorCooldown)			
			_selectedMenu += 1;
			playsound('games/dspstop.mp3');
			if (_selectedMenu>_menuItemMax)
			{
				_selectedMenu = 0
				_cursorOffset = 0;
			} else {
				_cursorOffset += 32;	
			}
		}
		if (_menuCooldown > 0) {_menuCooldown -= 1;}
		if (_menuCooldown<=0 && myGameArea.keys && (myGameArea.keys[13]))
		{
			_menuCooldown = 20;
			playsound('games/player/DSTPFIR.mp3');
			switch (_currentMenu) {
				case 0:
				switch (_selectedMenu) {
					case 0:
					loadLevel(1);
					break;
					case 1:
					_currentMenu = 1;
					break;
					case 2:
					_currentMenu = 2;
					break;
					case 3:
					_currentMenu = 3;
					createHighscores();
					break;
					default:
					// statements_def
					break;
				}
				break;
				case 1:
				_currentMenu = 0;
				break;
				case 2:
				_currentMenu = 0;
				break;
				case 3:
				_currentMenu = 0;
				for (var i = highscores_list.length - 1; i >= 0; i--) 
				{
					delete highscores_list[i];
					highscores_list.splice(i, 1);
				}
				break;
			}
			// console.log('Menu   - ' + _currentMenu);
			// console.log('Select - ' + _selectedMenu);
		}
	}

	for (i = 0; i < pixel_list1.length; i += 1) 
	{
		pixel_list1[i].update();
		pixel_list1[i].newPos();
		if (pixel_list1[i].life>0)
		{
			pixel_list1[i].life -= 1;
			if (pixel_list1[i].life<=0)
			{
				delete pixel_list1[i];
				pixel_list1.splice(i, 1);
			}
		}
	}
	checkEvent();
}

function createHighscores()
{
	x = myGameArea.canvas.width / 2 - 128;
	y = myGameArea.canvas.height / 2 - 64;
	offset = 0;

	highscores_list.push(new component("16px", "DooM", '#ff0000', x, y + offset, "text"));
	lastCreatedComponent.text = 'Your last score is' + ' - ' + _score;
	offset += 32;
	highscores_list.push(new component("16px", "DooM", '#ff0000', x, y + offset, "text"));
	lastCreatedComponent.text = 'Your last kill count is' + ' - ' + _killCount;
	offset += 32;
	highscores_list.push(new component("16px", "DooM", '#ffff00', x, y + offset, "text"));
	lastCreatedComponent.text = 'Your highest score is' + ' - ' + _hscore;
	offset += 32;
	highscores_list.push(new component("16px", "DooM", '#ffff00', x, y + offset, "text"));
	lastCreatedComponent.text = 'Your highest kill count is' + ' - ' + _hkillCount;
}

function everyinterval(n) {
	if ((myGameArea.frameNo / n) % 1 == 0) {return true;}
	return false;
}
