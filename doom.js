if(typeof(Storage) !== "undefined") 
{
	if (!localStorage.money) 
	{
		localStorage.money = 5000;
	}
	if (!localStorage.shop) 
	{
		var shop = new Array();
		shop = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
		localStorage.shop = shop;
	}
	if (!localStorage.upgrade) 
	{
		var upgrade = new Array();
		upgrade = [0,0,0,0,0,0,0];
		localStorage.upgrade = upgrade;
	}
	if (!localStorage.progress) 
	{
		localStorage.progress = 0;
	}
	if (!localStorage.score) 
	{
		var score = new Array();
		score = [0,0,0,0,0];
		localStorage.score = score;
	}
} else 
{
	alert("Sorry, your browser does not support web storage... so you may not save your progress")
	localStorage.money = 50000;
	localStorage.shop  = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
	localStorage.progress = 0;
	localStorage.upgrade = [0,0,0,0,0,0,0];
}


var _skybox;
var _skybox2;
var _skyhell;
var _skyhell2;
var _ground;
var _ground2;
var _logo;
var _map;
var _mapOverlay;
var _mouseObject
var _help;
var _miniature;
var _mapName;
var mouseX;
var mouseY;
var mouseClicked = false;
var mouseRightClicked = false;
var mouseHold = false;
var mouseRightHold = false;
var moveX;
var moveY;
var mouseMove = 0;
var _gameProgress = Number(localStorage.progress);
var _totalBfgBall = 0;
var _level;
var _skull;
var _skullStep = 32;
var _menuItemMax;
var _systemMessage;
var _cursorCooldown = 0;
var _menuCooldown = 0;
var _nextEvent = -1;
var _tag666 = -1;
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
var lines_list = [];
var menus_list0 = [];
var menus_list = [];
var interface_list = [];
var powerups_list = [];
var powerTimer_list = []
var _soundIndex = [0,0,0,0,0,0]
var myGamePiece;
var dropship
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
var _weaponTimeBonus = 0;
var _tension = 0;
var _spawnSet = 0;
var _monsterSpawnCooldown;
var _fullScale = false;
var _fullScaleRollMax = 1000;
var _spawnSpeedMut = 1.0;
var _windowWidth = 1000;
var _windowHeight = 1000;
var _killCount = 0;
var _score = 0;
var _money = Number(localStorage.money);
var _hkillCount = 0;
var _hscore = localStorage.score.split(",");
var _highscoreMarker = false;
var _gameSpeedMod = 200;
// default:200
var _maxMonsterType = 4;
var _monsterPreferenceMod = [
[0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0]
];
var _monsterSpawnRateBase = [0,0,0,0];
var _monsterSpawnRateInc = [0,0,0,0];

var _currentMenu;
var _menuLevel;
var _cursorOffset;
var _cursorExtraOffsetX = 0;
var _cursorExtraOffsetY = 0;
var _selectedMenu;
var _selectLevel = 0;
var _uid = -1;

var _powerLevelMut = 20;
var _powerLevelBase = 400;

var _useUpgrade = localStorage.upgrade.split(",");
for (var i = _useUpgrade.length - 1; i >= 0; i--) {
	if (_useUpgrade[i] == 0)
	{
		_useUpgrade[i] = false;
	} else {
		_useUpgrade[i] = true;
	}
}
//console.log(localStorage.upgrade);
//console.log(_useUpgrade);
var _tier1WeaponName = ['Pistol','Shotgun','SuperShotgun','Chaingun','RocketLauncher','PlasmaRifle','BFG9000','BFG10K'];
var _tier2WeaponName = ['Repeater','AutoShotgun','QuadShotgun','Minigun','Eightball','Railgun','BFG9000MKII','BFG10K'];
var _tier1WeaponDescription;
var _weaponUpgradeCost = [5000,10000,15000,15000,20000,30000,50000];
var _tier1AmmoUse = [-2,1,2,1,1,1,40,1]
var _tier2AmmoUse = [-2,1,4,2,1,10,50,1]
var _shopItem = localStorage.shop.split(",");
//console.log(_shopItem);
var _shopItemCost = [200,500,500,1000,2000,6000,4000,4000,1500,13500,9000,4500,4500];
var _shopItemIndex = [1,2,3,4,5,6,14,15,17,18,19,20,21];


const M_MAINMENU = 0;
const M_NEWGAME = 0;
const M_README = 1;
const M_OPTION = 2;
const M_RANK = 3;
const M_MAP = 4;
const M_UPGRADE = 5;
const M_SHOP = 6;
const M_GAME = 7;

var cvar_movement_style = 1;
const C_MOVEMENT_DEFAULT = 0;
const C_MOVEMENT_PRECISE = 1;
const C_MOVEMENT_HEAVY = 2;

const TEXT_MOVEMENT_STYLE = ['Hoverboard' , 'DooM', 'Call of Duty'];

var cvar_crosshair_style = 0;
const C_CROSSHAIR_DEFAULT = 0;
const C_CROSSHAIR_THICK = 1;
const C_CROSSHAIR_NONE = 2;

const TEXT_CROSSHAIR_STYLE = ['Default','Thick','None'];

var cvar_difficulty = 2;
const C_DIFFICULTY_BABY = 0;
const C_DIFFICULTY_EASY = 1;
const C_DIFFICULTY_MEDIUM = 2;
const C_DIFFICULTY_HARD = 3;
const C_DIFFICULTY_VHARD = 4;

const TEXT_DIFFICULTY = ['Too young to Die','Not too Rough','Hurt me Plenty','Ultra-Violence','Nightmare!'];

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

function pixelExplosion1(number,color,x,y,angle,spread,speed,size,life)
{
	for (l = getRandomInt(number - 1, number * 2); l >= 0; l--) {
		speed0 = getRandomInt(speed/4,speed);
		speed0 = Math.pow(speed0,1.25);
		angle0 = angle + ((Math.random() - 0.5) * spread)
		pixel_list1.push(new pixel(color,x,y,speed0,getRandomFloat(0.9,1),angle0,life,size))
	}
}

const MAX_SOUND_CHANNEL = 24
function setupSound() {
	for (i=0; i<MAX_SOUND_CHANNEL; i++)
	{
		sound_list.push(new sound(''))
	}
}

var _maxLevel = _gameProgress;

const SOUND_CHANNEL_PLAYER = 6;
const SOUND_CHANNEL_ACTION = 7;
const SOUND_CHANNEL_PICKUP = 8;
const SOUND_CHANNEL_BFGBALL = 9;
const SOUND_CHANNEL_WEAPON = 10; //10-12
const SOUND_CHANNEL_MONSTERWEAPON = 13; //13-15
const SOUND_CHANNEL_EXPLOSION = 16; //16-17
const SOUND_CHANNEL_WARNING = 18; //18-20
const SOUND_CHANNEL_QDMG = 21;
const SOUND_CHANNEL_FLYBY = 22;
const SOUND_CHANNEL_POWER = 23;
var lastPlayedSound;
function playsound(file,index) 
{
	if (index == SOUND_CHANNEL_WEAPON)
	{
		sound_list[_soundIndex[1]].id= -1;
		sound_list[_soundIndex[1]].sound.src = file;
		sound_list[_soundIndex[1]].play();
		if (_soundIndex[1]<12)
		{
			_soundIndex[1] += 1;
		} else 
		{
			_soundIndex[1] = SOUND_CHANNEL_WEAPON;
		}
	} else if (index == SOUND_CHANNEL_MONSTERWEAPON)
	{
		sound_list[_soundIndex[2]].id= -1;
		sound_list[_soundIndex[2]].sound.src = file;
		sound_list[_soundIndex[2]].play();
		if (_soundIndex[2]<15)
		{
			_soundIndex[2] += 1;
		} else 
		{
			_soundIndex[2] = SOUND_CHANNEL_MONSTERWEAPON;
		}
	} else if (index == SOUND_CHANNEL_EXPLOSION)
	{
		sound_list[_soundIndex[3]].id= -1;
		sound_list[_soundIndex[3]].sound.src = file;
		sound_list[_soundIndex[3]].play();
		if (_soundIndex[3]<17)
		{
			_soundIndex[3] += 1;
		} else 
		{
			_soundIndex[3] = SOUND_CHANNEL_EXPLOSION;
		}
	} else if (index == SOUND_CHANNEL_WARNING)
	{
		sound_list[_soundIndex[4]].id= -1;
		sound_list[_soundIndex[4]].sound.src = file;
		sound_list[_soundIndex[4]].play();
		if (_soundIndex[4]<20)
		{
			_soundIndex[4] += 1;
		} else 
		{
			_soundIndex[4] = SOUND_CHANNEL_WARNING;
		}
	}
	else if (!index)
	{
		//index 0-5 for playing random sounds;
		if (_soundIndex[0]<5)
		{
			sound_list[_soundIndex[0]].id= -1;
			sound_list[_soundIndex[0]].sound.src = file;
			sound_list[_soundIndex[0]].play();
			_soundIndex[0] += 1;
		} else 
		{
			_soundIndex[0] = 0;
		}
	} else {
		sound_list[index].id= -1;
		sound_list[index].sound.src = file;
		sound_list[index].play();
	}
}


function StopSound(index)
{
	sound_list[index].stop();
}

function sound(src) {
	this.sound = document.createElement("audio");
	this.sound.src = src;
	this.sound.setAttribute("preload", "auto");
	this.sound.setAttribute("controls", "none");
	this.sound.style.display = "none";
	this.id = -1;
	document.body.appendChild(this.sound);
	this.play = function(){
		lastPlayedSound = this;
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
	_mouseObject = new component(2, 2, "games/null.png", 0, 0, "image");		
	createMainMenu();
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
	createMainMenu();
	delete myGamePiece;
	delete myScore;
	delete myLuck;
	delete myAirdrop;
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
	_airdropCooldown = 0;
	_cursorOffset = 96;
	_currentMenu = 3;
	_selectedMenu = 3;
	_menuItemMax = 3;
	_highscoreMarker = false;
	if (_score > _hscore[_level]) {
		_hscore[_level] = _score;
		localStorage.score = _hscore;
		_highscoreMarker = true;
	}
	if (_killCount > _hkillCount) {
		_hkillCount = _killCount;
	}
	createHighscores();
	purge();
	myGameArea.resize();
	_cursorExtraOffsetX = 0;
	_cursorExtraOffsetY = 0;
}


function purge(){
	_totalBfgBall = 0;
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

	for (i = powerups_list.length - 1; i >= 0; i -= 1) {
		delete powerups_list[i];
		powerups_list.splice(i, 1);
	}

	for (i = powerTimer_list.length - 1; i >= 0; i -= 1) {
		delete powerTimer_list[i];
		powerTimer_list.splice(i, 1);
	}

	delete dropship;
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
				_gameState = 3;
				monsters_list.push(new cardinal(104,104,'games/card/idle.png', myGameArea.canvas.width/2 - 64,-64,'image'));
				lastCreatedMonster.width = 80;
				lastCreatedMonster.height = 90;
				playsound('games/card/dscybsit.mp3');
				_powerLevel += lastCreatedMonster.powerLevel;

				if (cvar_difficulty > 3)
				{
					monsters_list.push(new cardinal(104,104,'games/card/idle.png', myGameArea.canvas.width/2 + 64,-64,'image'));
					lastCreatedMonster.width = 80;
					lastCreatedMonster.height = 90;
					playsound('games/card/dscybsit.mp3');
					_powerLevel += lastCreatedMonster.powerLevel;
				}
				_monsterSpawnCooldown = 9999999999;
				break;

				case 3:
				if (_gameProgress<1)
				{
					_gameProgress = 1;
					localStorage.progress = 1;
				}
				myGamePiece.health = 200;
				myGamePiece.armor = 200;
				_systemMessage.text = 'Good job marine!'
				_nextEvent = 4;
				_eventCooldown = 150;
				break;

				case 4:
				_systemMessage.text = 'The city is safe... for now.'
				_nextEvent = 5;
				_eventCooldown = 200;
				break;

				case 5:
				_systemMessage.text = 'But the battle is far from over.'
				_nextEvent = 6;
				_eventCooldown = 200;
				break;

				case 6:
				_systemMessage.text = 'You must now head to the starport'
				_nextEvent = 1;
				_eventCooldown = 200;
				break;

				case 12:
				_gameState = 3;
				monsters_list.push(new master(170,80,'games/master/idle.png', myGameArea.canvas.width/2 - 128,-64,'image'));
				lastCreatedMonster.width = 140;
				lastCreatedMonster.height = 80;
				playsound('games/master/dsspisit.mp3');
				_powerLevel += lastCreatedMonster.powerLevel;

				if (cvar_difficulty > 3)
				{
					monsters_list.push(new master(170,80,'games/master/idle.png', myGameArea.canvas.width/2 + 128,-64,'image'));
					lastCreatedMonster.width = 140;
					lastCreatedMonster.height = 80;
					playsound('games/master/dsspisit.mp3');
					_powerLevel += lastCreatedMonster.powerLevel;
				}
				_monsterSpawnCooldown = 9999999999;
				break;

				case 13:
				if (_gameProgress<2)
				{
					_gameProgress = 2;
					localStorage.progress = 2;
				}
				myGamePiece.health = 200;
				myGamePiece.armor = 200;
				_systemMessage.text = 'The starport is secure'
				_monsterSpawnCooldown = 9999999999;
				_nextEvent = 14;
				_eventCooldown = 150;
				break;

				case 14:
				_systemMessage.text = 'You will be transported to Mars shortly'
				_nextEvent = 15;
				_eventCooldown = 200;
				break;

				case 15:
				_systemMessage.text = 'Good Luck!'
				_nextEvent = 1;
				_eventCooldown = 200;
				break;

				case 22:
				_gameState = 3;
				monsters_list.push(new terminator(58,76,'games/term/idle.png', myGameArea.canvas.width/2 - 128,-64,'image'));
				playsound('games/term/TSIGHT.mp3');
				_powerLevel += lastCreatedMonster.powerLevel;
				_monsterSpawnCooldown = 9999999999;
				break;

				case 23:
				if (_gameProgress<3)
				{
					_gameProgress = 3;
					localStorage.progress = 3;
				}
				myGamePiece.health = 200;
				myGamePiece.armor = 200;
				_systemMessage.text = 'Enemy force terminated'
				_monsterSpawnCooldown = 9999999999;
				_nextEvent = 24;
				_eventCooldown = 150;
				break;

				case 24:
				_systemMessage.text = 'Day T-minus 1 Arrive in Mars'
				_nextEvent = 1;
				_eventCooldown = 300;
				break;

				case 32:
				_gameState = 3;
				monsters_list.push(new queen(107,99,'games/queen/idle.png', myGameArea.canvas.width/2 - 64,-64,'image'));
				playsound('games/queen/QUESIT.mp3');
				_powerLevel += lastCreatedMonster.powerLevel;

				_monsterSpawnCooldown = 9999999999;
				break;

				case 33:
				if (_gameProgress<4)
				{
					_gameProgress = 4;
					localStorage.progress = 4;
				}
				myGamePiece.health = 200;
				myGamePiece.armor = 200;
				_systemMessage.text = ''
				_monsterSpawnCooldown = 9999999999;
				_nextEvent = 34;
				_eventCooldown = 150;
				break;

				case 34:
				_systemMessage.text = "The forces of hell are pushed back"
				_nextEvent = 35;
				_eventCooldown = 200;
				break;

				case 35:
				_systemMessage.text = 'Now is the time to counter attack'
				_nextEvent = 36;
				_eventCooldown = 200;
				break;

				case 36:
				_systemMessage.text = "Give all you've got for the next battle"
				_nextEvent = 37;
				_eventCooldown = 200;
				break;

				case 37:
				_systemMessage.text = "Things are going to get tough"
				_nextEvent = 1;
				_eventCooldown = 200;
				break;

				case 42:
				_gameState = 3;
				monsters_list.push(new hitler(63,120,'games/hitler/idle.png', myGameArea.canvas.width/2 - 128,-64,'image'));
				lastCreatedComponent.width = 60;
				lastCreatedComponent.height = 60;
				playsound('games/hitler/DSHTHA.mp3');
				_powerLevel += lastCreatedMonster.powerLevel;

				_monsterSpawnCooldown = 9999999999;
				break;

				case 43:
				if (_gameProgress<5)
				{
					_gameProgress = 5;
					localStorage.progress = 5;
				}
				myGamePiece.health = 200;
				myGamePiece.armor = 200;
				_systemMessage.text = 'Well done marine!';
				_monsterSpawnCooldown = 9999999999;
				_nextEvent = 44;
				_eventCooldown = 150;
				break;

				case 44:
				_systemMessage.text = 'The source of evil is defeated';
				_nextEvent = 45;
				_eventCooldown = 200;
				break;

				case 45:
				_systemMessage.text = "Hell is wrecked...";
				_nextEvent = 46;
				_eventCooldown = 200;
				break;

				case 46:
				_systemMessage.text = "And it's time to go home";
				_nextEvent = 47;
				_eventCooldown = 200;
				break;

				case 47:
				_systemMessage.text = 'Thanks for playing';
				_systemMessage.color = '#ffff00'
				_money += 50000;
				localStorage.money = Number(localStorage.money) + 50000;
				_nextEvent = 1;
				_eventCooldown = 400;
				break;
			}
		}
	}


}

function resizeGame() 
{
	myGameArea.resize();
}

function initGame()
{
	_uid = 0;
	myGamePiece = new player(54, 54, "games/player/idle.png", myGameArea.canvas.width / 2, (myGameArea.canvas.height * 3) / 4, "image");
	lastCreatedComponent.width = 16;  
	lastCreatedComponent.height = 48;   
	myScore = new component("12px", "DooM", "white", myGameArea.canvas.width/2 - 128, 32, "text");
	myLuck = new component("12px", "DooM", "white", myGameArea.canvas.width/2 - 320, 32, "text");
	myAirdrop = new component("12px", "DooM", "white", myGameArea.canvas.width/2 - 320, 64, "text");	
	myPowerLevel = new component("12px", "DooM", "white", myGameArea.canvas.width/2 + 64, 32, "text");
	myDmg = new component("12px", "DooM", "white", myGameArea.canvas.width/2 - 128, 64, "text");
	myKill = new component("12px", "DooM", "white", myGameArea.canvas.width/2 + 64, 64, "text");
	myHealth = new component("16px", "mortis", "#99ff99", 0, 0, "text");
	switch (cvar_crosshair_style) {
		case C_CROSSHAIR_DEFAULT:
		myCrosshairH = new component(16, 2, "#99ff99", 0, 0, "");
		lastCreatedComponent.transparency = 0.75;
		myCrosshairV = new component(2, 16, "#99ff99", 0, 0, "");
		lastCreatedComponent.transparency = 0.75;
		break;
		case C_CROSSHAIR_THICK:
		myCrosshairH = new component(16, 4, "#99ff99", 0, 0, "");
		lastCreatedComponent.transparency = 0.75;
		myCrosshairV = new component(4, 16, "#99ff99", 0, 0, "");
		lastCreatedComponent.transparency = 0.75;
		break;
		case C_CROSSHAIR_NONE:
		myCrosshairH = new component(16, 2, "#99ff99", 0, 0, "");
		lastCreatedComponent.transparency = 0.0;
		myCrosshairV = new component(2, 16, "#99ff99", 0, 0, "");
		lastCreatedComponent.transparency = 0.0;
		//I am a lazy piece of shit
		break;
	}
	for (var i = 0; i < 8; i++) {
		if (!_useUpgrade[i])
		{
			myGamePiece.weapon[i] = _tier1WeaponName[i];
			myGamePiece.weaponAmmoUse[i] = _tier1AmmoUse[i];		
		} else {
			myGamePiece.weapon[i] = _tier2WeaponName[i];		
			myGamePiece.weaponAmmoUse[i] = _tier2AmmoUse[i];		
		}
	}

	myAmmoCounter = new component("16px", "mortis", "yellow", 0, 0, "text");
	myWeapon = new component(80, 36, "games/player/" + myGamePiece.weapon[0] + ".png", 0, 0, "image");
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
	_weaponTimeBonus = 0;
	myGameArea.resize();

}

function setSky(sky1,sky2,floor)
{
	_skybox.image.src = sky1;
	_skybox2.image.src = sky1;
	_skyhell.image.src = sky2;
	_skyhell2.image.src = sky2;
	_ground.image.src= floor;
}

function loadLevel(level)
{
	_currentMenu = M_GAME;
	_shopItem[0] = 4;
	_shopItem[8] = 2;
	_shopItem[9] = 2;
	_shopItem[13] = 1;
	_spawnSet = 0;
	delete _logo;
	clearMenus();
	for (var i = menus_list0.length - 1; i >= 0; i--) {
		delete menus_list0[i];
		menus_list0.splice(i, 1);
	}
	delete _help;
	delete _skull;
	switch (level) {
		case 1:
		initGame();
		setSky('games/RSKY1.png','games/RSKY2.png','games/floor1.png')
		_level = 0;
		//monsters_list.push(new hitler(63,120,'games/hitler/idle.png', myGameArea.canvas.width/2 - 128,-64,'image'));
		_monsterPreferenceMod = [
		//0 Army of Hell
		[40,20, 3, 1,0,0,0,0,0,0,0,0],
		//1 Soulstorm
		[50, 1, 1, 1,0,0,0,0,0,0,0,0],
		//2 Tomato Nightmare
		[ 1,50, 1, 1,0,0,0,0,0,0,0,0],
		//3 Ettin
		[ 1,50,50, 1,0,0,0,0,0,0,0,0],
		//4 Torment
		[ 1, 1, 2, 1,0,0,0,0,0,0,0,0],
		//5 Hatred
		[ 5, 1, 2, 1,0,0,0,0,0,0,0,0],
		//6 Lord of Darkness
		[ 5, 5, 1, 5,0,0,0,0,0,0,0,0],
		//7 Brimstone
		[25, 1, 1, 5,0,0,0,0,0,0,0,0],
		//8 Amageddon
		[ 1, 1, 1, 50,0,0,0,0,0,0,0,0]
		];
		_fullScaleRollMax = 1500 - (cvar_difficulty * 250);
		_spawnSpeedMut = 1.4 - (cvar_difficulty * 0.2);
		_powerLevelMut = 12 + (cvar_difficulty * 4);
		_powerLevelBase = 300 + (cvar_difficulty * 50);
		_monsterSpawnRateBase = [100,50,0,0,0,0,0,0,0,0,0,0];
		_monsterSpawnRateInc = [0,1,1,2,0,0,0,0,0,0,0,0];
		_gameSpeedMod = 100 * ((10 - cvar_difficulty)/10);
		break;
		case 2:
		initGame();
		setSky('games/SKY2YELO.png','games/SKY2MO.png','games/floor1.png');
		_level = 1;
		_monsterPreferenceMod = [
		//0 Spiders!
		[50,0,0,1,0,20,0,2,0,0,0,0],
		//1 Bulletstorm
		[10,0,0,0,0,20,0,0,0,0,0,0],
		//2 fattyRush
		[2,0,0,2,0,0,0,20,0,0,0,0],
		//3 GunsNGas
		[0,0,0,0,0,20,0,20,0,0,0,0],
		//4 Bombardment
		[0,0,0,10,0,20,0,0,0,0,0,0],
		//5 Airforce
		[0,20,0,0,0,20,0,0,0,0,0,0]
		];
		_fullScaleRollMax = 1500 - (cvar_difficulty * 250);
		_spawnSpeedMut = 1.4 - (cvar_difficulty * 0.2);
		_powerLevelMut = 12 + (cvar_difficulty * 4);
		_powerLevelBase = 300 + (cvar_difficulty * 50);
		_monsterSpawnRateBase = [50,25,25,25,25,25,25,25,0,0,0,0];
		_monsterSpawnRateInc = [0,1,1,1,1,1,1,2,0,0,0,0];
		_gameSpeedMod = 110 * ((10 - cvar_difficulty)/10);
		break;
		case 3:
		initGame();
		setSky('games/SKYML1.png','games/SKYML6.png','games/GRY_44D.png');
		_level = 2;
		_monsterPreferenceMod = [
		//0 Kamikaz
		[0,0,0,0,20,0,0,2,0,0,0,0],
		//1 Carrier
		[0,0,0,0,20,20,0,0,0,0,0,0],
		//2 GreenSky
		[0,0,0,0,20,0,4,0,0,0,0,0],
		//3 a bit of eveything
		[0,0,0,0,20,5,4,5,0,1,0,0]	
		];
		_fullScaleRollMax = 1500 - (cvar_difficulty * 250);
		_spawnSpeedMut = 1.4 - (cvar_difficulty * 0.2);
		_powerLevelMut = 12 + (cvar_difficulty * 4);
		_powerLevelBase = 300 + (cvar_difficulty * 50);
		_monsterSpawnRateBase = [0,0,0,0,50,25,10,25,0,1,0,0];
		_monsterSpawnRateInc = [0,0,0,0,0,1,1,1,0,0,0,0];
		_gameSpeedMod = 120 * ((10 - cvar_difficulty)/10);
		break;
		case 4:
		initGame();
		setSky('games/SKY3.png','games/SKYML7.png','games/floor1.png');
		_level = 3;
		_monsterPreferenceMod = [
		//0 red Magic
		[0,0,0,5,20,0,0,0,2,0,0,0],
		//1 Black Magic
		[0,0,0,10,0,0,0,0,20,0,0,0],
		//2 Darkforce
		[0,0,0,0,0,0,0,20,20,0,0,0],	
		//3 beholders
		[0,0,0,0,15,0,10,0,20,0,0,0],
		//4 FullscaleAssult
		[0,0,0,5,15,5,10,5,20,0,3,0],
		];
		_fullScaleRollMax = 900 - (cvar_difficulty * 150);
		_spawnSpeedMut = 0.9 - (cvar_difficulty * 0.1);
		_powerLevelMut = 12 + (cvar_difficulty * 6);
		_powerLevelBase = 400 + (cvar_difficulty * 100);
		_monsterSpawnRateBase = [100,100,100,100,100,100,100,100,100,0,3,0];
		_monsterSpawnRateInc = [0,0,0,0,0,0,0,0,2,0,0,0];
		_gameSpeedMod = 130 * ((10 - cvar_difficulty)/10);
		break;
		case 5:
		initGame();
		setSky('games/SKY4.png','games/RSKY2.png','games/floor3.png');
		_level = 4;
		_monsterPreferenceMod = [
		//0 Warfare
		[40,15,2,4,40,10,2,10,5,1,1,0]
		];
		_fullScaleRollMax = 800 - (cvar_difficulty * 200);
		_spawnSpeedMut = 0.6 - (cvar_difficulty * 0.1);
		_powerLevelMut = 20 + (cvar_difficulty * 10);
		_powerLevelBase = 500 + (cvar_difficulty * 200);
		_monsterSpawnRateBase = [0,50,50,50,25,50,50,50,50,0,0,0];
		_monsterSpawnRateInc = [0,1,1,1,0,1,1,1,1,2,2,1];
		_gameSpeedMod = 140 * ((10 - cvar_difficulty)/10);
		break;
		default:
		// statements_def
		break;
	}
}

function spawnMonster()
{
	if (_gameState == 3 && _powerLevel <= 0)
	{
		_gameState = 4;
		_eventCooldown = 100;
		_nextEvent = _nextEvent + 1;	
	}
	if (_monsterSpawnCooldown <= 0)
	{
		if (_difficult>=105 && _gameState < 2 && !myGamePiece.isDead)
		{
			_gameState = 2;
			_eventCooldown = 100;
			_nextEvent = 2 + (10*_level);
		}

		rnd = getRandomInt(1,75);
		if (rnd == 1)
		{
			//console.log('CurrentSpawnSet: ' + _spawnSet);
			//console.log('MaxSpawnSet: ' + _monsterPreferenceMod.length);
			_spawnSet = getRandomInt(0,_monsterPreferenceMod.length - 1);
		}

		rnd = getRandomInt(1,10);
		if (rnd == 1)
		{
			_fullScale = false;
		}

		rnd = getRandomInt(1,_fullScaleRollMax);
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
		0,
		//GreenLostSoul
		0,
		//Spider
		0,
		//GreenPainElemental
		0,
		//Fatso
		0,
		//Inferno
		0,
		//Cyber
		0,
		//Master
		0,
		//Term
		0
		]

		//recaluating monsters chance
		//console.log('TypeofMonsters: ' + monsterPreference.length);
		for (var i = 0; i < monsterPreference.length; i++) {
			monsterPreference[i] = _monsterPreferenceMod[_spawnSet][i];
			monsterPreference[i] = monsterPreference[i]*(_monsterSpawnRateBase[i]+(_monsterSpawnRateInc[i] * _difficult));
		}

		poolMax = 0;
		for (var m = 0; m < monsterPreference.length; m++) {
			poolMax = poolMax + monsterPreference[m];
		}

		rnd = getRandomInt(0,poolMax);

		selector = 0;
		finalItem = 0;
		for (var m = 0; m < monsterPreference.length; m++) {
			selector = selector + monsterPreference[m];
			if (selector >= rnd)
			{
				break;
			}
			finalItem += 1;
		}

		_maxPowerLevel = (_difficult * _powerLevelMut) + _powerLevelBase * ((cvar_difficulty + 2) / 3);

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
				break;
				case 3:
				//afrit
				monsters_list.push(new afrit(85, 85, "games/afrit/idle.png", spawnLocation, height,'image'));
				lastCreatedComponent.width = 64;
				lastCreatedComponent.height = 72;
				break;
				case 4:
				//GreenLostSoul
				monsters_list.push(new lostsoul2(44, 52, "games/soul2/idle.png", spawnLocation, height,'image'));
				break;
				case 5:
				//Spider
				monsters_list.push(new spider(84, 51, "games/spider/idle.png", spawnLocation, height,'image'));			
				break;
				case 6:
				//GreenPainElemental
				monsters_list.push(new painElemental2(90,90,"games/pain2/idle.png",spawnLocation,height,'image'))
				break;
				case 7:
				//fatso
				monsters_list.push(new fatso(98, 108, "games/fatso/idle.png", spawnLocation, height,'image'));
				lastCreatedComponent.width = 100;
				lastCreatedComponent.height = 80;
				break;
				case 8:
				//Inferno
				monsters_list.push(new inferno(95,64,'games/inferno/idle.png', spawnLocation, height,'image'));
				lastCreatedComponent.width = 72;
				break;
				case 9:
				//Cyber
				monsters_list.push(new cardinal(104,104,'games/card/idle.png', spawnLocation, height,'image'));
				lastCreatedMonster.width = 80;
				lastCreatedMonster.height = 90;
				lastCreatedMonster.isBoss = false;
				lastCreatedMonster.health = 3000;
				lastCreatedMonster.Maxhealth = 3000;
				playsound('games/card/dscybsit.mp3');
				break;
				case 10:
				//Master
				monsters_list.push(new master(170,80,'games/master/idle.png', spawnLocation, height,'image'));
				lastCreatedMonster.width = 140;
				lastCreatedMonster.height = 80;
				lastCreatedMonster.isBoss = false;
				lastCreatedMonster.health = 3000;
				lastCreatedMonster.Maxhealth = 3000;
				playsound('games/master/dsspisit.mp3');
				break;
				case 11:
				//Term
				monsters_list.push(new terminator(58,76,'games/term/idle.png', spawnLocation, height,'image'));
				playsound('games/term/TSIGHT.mp3');
				lastCreatedMonster.isBoss = false;
				lastCreatedMonster.health = 4000;
				lastCreatedMonster.Maxhealth = 4000;
				break;				


			}
			spawnDelayMultiplyer = (100 - Math.floor(_difficult*0.9) * ((12 - (cvar_difficulty*2) )/10)) * ( (lastCreatedMonster.powerLevel + 25)
				/ 200);
			if (spawnDelayMultiplyer <= 1)
			{
				spawnDelayMultiplyer = 1;
			}
			_monsterSpawnCooldown += Math.floor(Math.random() * ((_powerLevel / (500+_difficult)) * spawnDelayMultiplyer) * _spawnSpeedMut);

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

function checkLuck(need,forceSpawn = false)
{
	if (!forceSpawn)
	{
		forceSpawn = false;
	}
	if (_luck > need || forceSpawn)
	{
		if (need < 0)
		{
			need = 0;
		}
		if (!forceSpawn)
		{
			_luck -= need;
		}
		return true;
	}
	return false;
}

function spawnItem(x,y,itemIndex)
{
	deathDrop(0,x,y,100,true,itemIndex);
}
function deathDrop(rarity,x,y,chance = 100,forceSpawn = false,itemIndex = -1)
{
	if (!forceSpawn)
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
		0,
		//quad18
		0,
		//regen19
		0,
		//haste20
		0,
		//guard21
		0,
		];

		//recaluating item chance
		for (var m = 0; m < itemPreference.length; m++) {
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
					itemPreference[m] = 75
				}
				break;
				//Chaingun
				case 3:
				if (myGamePiece.weaponAvailable[1] == true && myGamePiece.weaponAvailable[3] == false) {
					itemPreference[m] = 75
				}			
				break;
				//RocketLauncher
				case 4:
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
					itemPreference[m] = 1
				}
				break
				//Plasma
				case 5:
				if (myGamePiece.weaponAvailable[1] == true) {
					itemPreference[m] += 15
				}
				if (myGamePiece.weaponAvailable[2] == true) {
					itemPreference[m] += 15
				}
				if (myGamePiece.weaponAvailable[3] == true) {
					itemPreference[m] += 15
				}
				if (myGamePiece.weaponAvailable[4] == true) {
					itemPreference[m] += 15
				}
				if (myGamePiece.weaponAvailable[5] == true) {
					itemPreference[m] = 1
				}
				break;
				//BFG9000
				case 6:
				itemPreference[m] += Math.floor(_difficult/10);
				if (myGamePiece.weaponAvailable[1] == true) {
					itemPreference[m] += 4
				}
				if (myGamePiece.weaponAvailable[2] == true) {
					itemPreference[m] += 4
				}
				if (myGamePiece.weaponAvailable[3] == true) {
					itemPreference[m] += 4
				}
				if (myGamePiece.weaponAvailable[4] == true) {
					itemPreference[m] += 4
				}
				if (myGamePiece.weaponAvailable[5] == true) {
					itemPreference[m] += 15
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
				itemPreference[m] += Math.floor((200 - myGamePiece.health)*0.02 * _luck/1000);
				itemPreference[m] += Math.floor((200 - myGamePiece.armor)*0.02 * _luck/1000);
				break;
				//Backpack
				case 17:
				itemPreference[m] = 5;
				break;
				//quad
				case 18:
				itemPreference[m] = Math.floor(_difficult/30);
				break;
				//regen
				case 19:
				itemPreference[m] = Math.floor(_difficult/30);
				break;
				//haste
				case 20:
				itemPreference[m] = Math.floor(_difficult/30);
				break;
				//guard
				case 21:
				itemPreference[m] = Math.floor(_difficult/30);
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
		_luck += Math.floor((rarity*luckMod) * ((10 - cvar_difficulty)/10));
		if (!chance){chance = 100;}
		//--Item--
	}

	if (itemIndex != -1)  {
		finalItem = itemIndex
		//console.log('ITEM-INDEX ' + finalItem);
	}
	if (chance >= getRandomInt(0,100) || forceSpawn){
		switch (finalItem) {
			case 0:
			//Medkit
			if (checkLuck(25,forceSpawn))
			{
				pickup_list.push(new pickup(28, 19, "games/items/MEDIA0.png", x, y,'image'));  
				lastCreatedPickup.healthGive = 25;
			}
			break;
			case 1:
			//Shotgun
			if (checkLuck(25,forceSpawn))
			{
				pickup_list.push(new pickup(80, 36, "games/player/" + myGamePiece.weapon[1] + ".png", x, y,'image'));
				lastCreatedPickup.weaponGive = 1; 
				if (!_useUpgrade[1])
				{
					lastCreatedPickup.shellsGive = 16;
				} else {
					lastCreatedPickup.shellsGive = 24;
				}
				lastCreatedPickup.pickupSound = 'games/items/dswpnup.mp3';
			}
			break;
			case 2:
			//Supershotgun
			if (checkLuck(100,forceSpawn))
			{
				pickup_list.push(new pickup(80, 36, "games/player/" + myGamePiece.weapon[2] + ".png", x, y,'image'));
				lastCreatedPickup.weaponGive = 2; 
				lastCreatedPickup.shellsGive = 24;
				lastCreatedPickup.pickupSound = 'games/items/dswpnup.mp3';
			}
			break;
			case 3:
			//Chaingun
			if (checkLuck(100,forceSpawn))
			{
				pickup_list.push(new pickup(80, 36, "games/player/" + myGamePiece.weapon[3] + ".png", x, y,'image'));
				lastCreatedPickup.weaponGive = 3; 
				lastCreatedPickup.bulletGive = 100;
				lastCreatedPickup.pickupSound = 'games/items/dswpnup.mp3';
			}
			break;
			case 4:
			//RocketLauncher
			if (checkLuck(200,forceSpawn))
			{
				pickup_list.push(new pickup(80, 36, "games/player/" + myGamePiece.weapon[4] + ".png", x, y,'image'));
				lastCreatedPickup.weaponGive = 4; 
				lastCreatedPickup.rocketGive = 10;
				lastCreatedPickup.pickupSound = 'games/items/dswpnup.mp3';
			}
			break;
			case 5:
			//PlasmaRifle
			if (checkLuck(250,forceSpawn))
			{
				_luck -= 250;
				pickup_list.push(new pickup(80, 36, "games/player/" + myGamePiece.weapon[5] + ".png", x, y,'image'));
				lastCreatedPickup.weaponGive = 5; 
				lastCreatedPickup.cellsGive = 50;
				lastCreatedPickup.pickupSound = 'games/items/dswpnup.mp3';
			}
			break;
			case 6:
			//BFG9K
			if (checkLuck(600 - (_difficult*3),forceSpawn))
			{
				pickup_list.push(new pickup(80, 36, "games/player/" + myGamePiece.weapon[6] + ".png", x, y,'image'));
				lastCreatedPickup.weaponGive = 6; 
				lastCreatedPickup.cellsGive = 100;
				lastCreatedPickup.pickupSound = 'games/items/dswpnup.mp3';
			}
			break;
			case 7:
			//BFG10K
			if (checkLuck(1000 - (_difficult*5),forceSpawn))
			{
				pickup_list.push(new pickup(80, 36, "games/player/BFG10K.png", x, y,'image'));
				lastCreatedPickup.weaponGive = 7; 
				lastCreatedPickup.DcellsGive = 20;
				lastCreatedPickup.pickupSound = 'games/items/dswpnup.mp3';
			}
			break;
			case 8:
			//Bullet
			if (checkLuck(50,forceSpawn))
			{
				pickup_list.push(new pickup(28, 16, "games/items/AMMOA0.png", x, y,'image'));  
				lastCreatedPickup.bulletGive = 100;		
			}
			break;
			case 9:
			//Shells
			if (checkLuck(50,forceSpawn))
			{
				pickup_list.push(new pickup(32, 12, "games/items/SBOXA0.png", x, y,'image'));
				lastCreatedPickup.shellsGive = 20;	
			}	  
			break;
			case 10:
			//Rocket
			if (checkLuck(75,forceSpawn))
			{
				pickup_list.push(new pickup(54, 21, "games/items/BROKA0.png", x, y,'image'));
				lastCreatedPickup.rocketGive = 5;	
			} 
			break;
			case 11:
			//Cells
			if (checkLuck(200,forceSpawn))
			{
				pickup_list.push(new pickup(32, 21, "games/items/CELPA0.png", x, y,'image'));
				lastCreatedPickup.cellsGive = 100; 
			}
			break;
			case 12:
			//D-Cells
			if (checkLuck(400 - (_difficult*2),forceSpawn))
			{
				pickup_list.push(new pickup(32, 21, "games/items/DCELL.png", x, y,'image'));
				lastCreatedPickup.DcellsGive = 20; 
			}
			break;
			case 13:
			//GreenArmor
			if  (checkLuck(150,forceSpawn))
			{
				pickup_list.push(new pickup(31, 17, "games/items/ARM1A0.png", x, y,'image'));
				lastCreatedPickup.armorGive = 100; 
				lastCreatedPickup.armorSave = 0.33; 
			}
			break;
			case 14:
			//BlueArmor
			if (checkLuck(300,forceSpawn))
			{
				pickup_list.push(new pickup(31, 17, "games/items/ARM2A0.png", x, y,'image'));
				lastCreatedPickup.armorGive = 200; 
				lastCreatedPickup.armorMax = 200; 
				lastCreatedPickup.armorSave = 0.5; 
			}
			break;
			case 15:
			//SoulSphere
			if (checkLuck(300,forceSpawn))
			{
				pickup_list.push(new pickup(25, 25, "games/items/SOULA0.png", x, y,'image'));
				lastCreatedPickup.healthGive = 100; 
				lastCreatedPickup.healthMax = 200; 
				lastCreatedPickup.pickupSound = 'games/items/dsgetpow.mp3';
			}
			break;
			case 16:
			//MegaSphere
			if (checkLuck(600,forceSpawn))
			{
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
			if (checkLuck(200,forceSpawn))
			{
				pickup_list.push(new pickup(22, 29, "games/items/BPAKA0.png", x, y,'image'));
				lastCreatedPickup.doubleAmmo = true; 
				if (!forceSpawn)
				{
					lastCreatedPickup.bulletGive = 20;
					lastCreatedPickup.shellsGive = 5;
					lastCreatedPickup.rocketGive = 2;
					lastCreatedPickup.cellsGive = 20;	
				} else {
					lastCreatedPickup.bulletGive = 100;
					lastCreatedPickup.shellsGive = 20;
					lastCreatedPickup.rocketGive = 10;
					lastCreatedPickup.cellsGive = 100;	
				}
			}
			break;
			case 18:
			//Quad
			if (checkLuck(1000,forceSpawn))
			{
				pickup_list.push(new pickup(60, 60, "games/powerups/quadItem.png", x, y,'image'));
				lastCreatedPickup.powergive[0] = 30 * 60;
				lastCreatedPickup.pickupSound = 'games/powerups/quaddamage.mp3';
				playsound('games/powerups/poweruprespawn.mp3',SOUND_CHANNEL_WARNING)
			}
			break;
			case 19:
			//regen
			if (checkLuck(800,forceSpawn))
			{
				pickup_list.push(new pickup(60, 60, "games/powerups/regenItem.png", x, y,'image'));
				lastCreatedPickup.powergive[1] = 30 * 60;
				lastCreatedPickup.pickupSound = 'games/powerups/regeneration.mp3';
				playsound('games/powerups/poweruprespawn.mp3',SOUND_CHANNEL_WARNING)
			}
			break;
			case 20:
			//haste
			if (checkLuck(600,forceSpawn))
			{
				pickup_list.push(new pickup(60, 60, "games/powerups/hasteItem.png", x, y,'image'));
				lastCreatedPickup.powergive[2] = 30 * 60;
				lastCreatedPickup.pickupSound = 'games/powerups/haste.mp3';
				playsound('games/powerups/poweruprespawn.mp3',SOUND_CHANNEL_WARNING)
			}
			break;
			case 21:
			//guard
			if (checkLuck(600,forceSpawn))
			{
				pickup_list.push(new pickup(60, 60, "games/powerups/guardItem.png", x, y,'image'));
				lastCreatedPickup.powergive[3] = 30 * 60;
				lastCreatedPickup.pickupSound = 'games/powerups/protect.mp3';
				playsound('games/powerups/poweruprespawn.mp3',SOUND_CHANNEL_WARNING)
			}
			break;




			default:
			// statements_def
			break;
		}
	}
}

function doMouseDown(event)
{
	{
		if (event.button === 0) {
			mouseX = event.pageX;
			mouseY = event.pageY;	
			mouseClicked = true;
			mouseHold = true;
			_mouseObject.x = event.pageX;
			_mouseObject.y = event.pageY;     
		}
		if (event.button === 2) {
			mouseRightClicked = true;   
			mouseRightHold = true;
		}
	}
}

function doMouseUp(event)
{
	{
		if (event.button === 0) {
			mouseHold = false;
		}
		if (event.button === 2) {
			mouseRightHold = false;
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
		window.addEventListener('mousedown', doMouseDown, false);
		window.addEventListener('mouseup', doMouseUp, false);
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

		//console.log('NEW WIDTH ' + this.canvas.width + ' / ' + document.body.clientWidth);
		//console.log('NEW HEIGHT ' + this.canvas.height + ' / ' + document.body.clientHeight);

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
			_systemMessage.y =  this.canvas.height / 2 + 32;		

			myScore.x = this.canvas.width/2 -128;
			myScore.y = 32; 
			myLuck.x = this.canvas.width/2 - 320;
			myLuck.y = 32; 
			myAirdrop.x = this.canvas.width/2 - 320;
			myAirdrop.y = 64; 
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

			for (var i = 0; i < menus_list0.length; i++) {
				menus_list0[i].x = this.canvas.width/2;
				menus_list0[i].y = this.canvas.height/2 + (i*32);
			}

			_skull.x = this.canvas.width/2 - 100
			_skull.y = this.canvas.height/2 + _cursorOffset;

			_help.x = this.canvas.width/2;
			_help.y = this.canvas.height/2;

			if (_currentMenu == M_MAP)
			{
				_map.x = this.canvas.width * 0.10;
				_map.y = this.canvas.height * 0.10;
				_map.imageWidth = this.canvas.width * 0.85;
				_map.imageHeight = this.canvas.height * 0.60;	
				_mapOverlay.x = this.canvas.width * 0.10;
				_mapOverlay.y = this.canvas.height * 0.10;
				_mapOverlay.imageWidth = this.canvas.width * 0.85;
				_mapOverlay.imageHeight = this.canvas.height * 0.60;
				interface_list[0].x = myGameArea.canvas.width * 0.15;
				interface_list[0].y = myGameArea.canvas.height * 0.5;
				interface_list[1].x = myGameArea.canvas.width * 0.80;
				interface_list[1].y = myGameArea.canvas.height * 0.50;
				interface_list[2].x = myGameArea.canvas.width * 0.70;
				interface_list[2].y = myGameArea.canvas.height * 0.35;
				interface_list[3].x = myGameArea.canvas.width * 0.2;
				interface_list[3].y = myGameArea.canvas.height * 0.225;
				interface_list[4].x = myGameArea.canvas.width * 0.525;
				interface_list[4].y = myGameArea.canvas.height * 0.125;
				_mapName.x = myGameArea.canvas.width * 0.125;
				_mapName.y = myGameArea.canvas.height * 0.05;
				for (var i = 0; i < menus_list.length; i++) {
					menus_list[i].x = myGameArea.canvas.width/2 - 128;
					menus_list[i].y = (myGameArea.canvas.height * 0.75) + (i*32);
				}	
				_cursorExtraOffsetY = myGameArea.canvas.height * (0.24);
			} else {
				for (var i = 0; i < menus_list.length; i++) {

					menus_list[i].x = myGameArea.canvas.width/2 - 128;
					menus_list[i].y = myGameArea.canvas.height/2 + (i*32);
				}	

			}
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

function line(color,x,y,x2,y2,size,life)
{
	this.x = x;
	this.y = y;
	this.x2 = x2;
	this.y2 = y2;
	if (size) {
		this.size = size;
	} else {
		this.size = 2;
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
		ctx.beginPath();
		ctx.lineWidth = size;
		ctx.moveTo(this.x,this.y);
		ctx.lineTo(this.x2,this.y2);
		ctx.strokeStyle = color;
		ctx.stroke();

		ctx.restore();
		ctx.globalAlpha = 1;
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
	_uid = _uid + 1;
	this.uid = _uid;
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
	this.health = 1;
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
	this.filp = false;
	this.resistance = 1.0;
	this.playsound = function(file,index) 
	{
		for (var i = 0; i < sound_list.length; i += 1) {
			if (sound_list[i].id == this.uid)
			{
				sound_list[i].stop();
			}
		}
		playsound(file,index);
		lastPlayedSound.id = this.uid;
	}
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

			dmg = Math.round(dmg * target.resistance);

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
				var damage;
				if (myGamePiece.hasPower[0])
				{
					damage = maximumDamage * (1-(dist/range)) * 4;
				} else {
					damage = maximumDamage * (1-(dist/range));
				}
				this.harm(monsters_list[k],damage)
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
	this.getAngle = function(target)
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

		return ang;
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
			this.playsound(this.deathSound);
		}
		this.isDead = true;
	}
	this.update = function() {
		//--Draw--
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

			if (this.filp)
			{
				ctx.scale(-1, 1);
			}
			ctx.drawImage(this.image, 
				this.frameX,
				this.frameY,
				this.imageWidth,
				this.imageHeight,
				-this.imageWidth / 2,
				-this.imageHeight / 2,
				this.imageWidth,
				this.imageHeight);
			if (this.filp)
			{
				ctx.scale(1, 1);
			}

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
	function getTextWidth(text, font) {
		// re-use canvas object for better performance
		var canvas = getTextWidth.canvas || (getTextWidth.canvas = document.createElement("canvas"));
		var context = canvas.getContext("2d");
		context.font = font;
		var metrics = context.measureText(text);
		return metrics.width;
	}
	this.textCrashWith = function(otherobj) {
		var myleft = this.x;
		var myright = this.x + this.imageWidth;
		var mytop = this.y - this.imageHeight;
		var mybottom = this.y + this.imageHeight;
		var otherleft = otherobj.x - (otherobj.width / 2);
		var otherright = otherobj.x + (otherobj.width / 2);
		var othertop = otherobj.y - (otherobj.height / 2);
		var otherbottom = otherobj.y + (otherobj.height / 2);
		//console.log('myleft ' + myleft);
		//console.log('myright ' + myright);
		//console.log('mytop ' + mytop);
		//console.log('mybottom ' + mybottom);
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
		var spd = 0.5;
		var acc = 0.01;
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

var _airdropCooldown = 0;
function callAirdrop()
{
	if (_airdropCooldown>0)
	{
		return;
	}
	//console.log(_shopItem);
	var totalItem = 0;
	for (var i = 0; i < _shopItem.length; i++) {
		if (Number(_shopItem[i]) > 0)
		{
			totalItem += 1;
		}
	}
	//console.log(totalItem);
	playsound('games/FLYBYCLO.mp3',SOUND_CHANNEL_FLYBY);
	dropship = new specialEffect(136, 51,'games/dropship.png', myGameArea.canvas.width + 32, 64, 'image');
	dropship.spawnInterval = myGameArea.canvas.width / ((totalItem + 1)*12);
	dropship.nextitem = 0;
	dropship.timer = dropship.spawnInterval;
	lastCreatedSpecialEffect.speedX = -10;
	lastCreatedSpecialEffect.timer = 15
	_airdropCooldown = 1000;
}

var player = function()
{
	component.apply(this,arguments);
	this.cooldown = 0;
	this.isFiring = false;
	this.holdFire = false;
	this.usingAmmo = false;
	this.pauseFire = 0;
	this.runSpeed = 0;
	this.health = 100;
	this.healthMax = 100;
	this.powerups = [0,0,0,0];
	this.hasPower = [false,false,false,false];
	switch (cvar_movement_style) {
		case C_MOVEMENT_DEFAULT:
		this.friction = 0.99;
		this.speed = 0.5;
		break;
		case C_MOVEMENT_PRECISE:
		this.friction = 0.95;
		this.speed = 1;
		break;
		case C_MOVEMENT_HEAVY:
		this.friction = 0.90;
		this.speed = 1.33;
		break;
	}
	this.weaponSwitchCooldown = 0;
	this.painChance = 101;
	this.weapon = ['Pistol','Shotgun','SuperShotgun','Chaingun','RocketLauncher','PlasmaRifle','BFG9000','BFG10K'];
	this.ammo = [                 -1,       0,             0,         0,            0,           0,       0,       0];
	this.ammoMax = [   			  -1,       50,            50,      200,          50,          300,     300,      100];
	this.weaponAvailable = [true,    false,         false,     false,           false,        false,    false,    false];
	//this.weaponAvailable = [true,true,true,true,true,true,true,true];
	//this.ammo = [-1,50,50,200,50,300,300,100];
	this.weaponSwitchSound = ["get0",   "get1",        "get2",    "get3",          "get4",       "get5",   "get6",  "get7"];
	this.weaponAmmoUse = [         -2,        1,            2,         1,             1,            1,          40,      1]
	this.currentWeapon = 0;
	this.weaponHidden = 150;
	this.messageHidden = 0;
	this.weaponState = 0;
	this.tracerAttackNextFrame = false;
	this.isCharging = false;
	this.rocketCharged = 0;
	this.mouseMove = function()
	{	
		dist = Math.sqrt(((this.x - moveX)*(this.x - moveX)) + ((this.y - moveY)*(this.y - moveY)))
		radius = 32;
		dX = Math.asin((this.x - moveX)/dist);
		dY = Math.acos((this.y - moveY)/dist) - (PI * 0.5);
		speed0 = Math.sqrt((this.speedX*this.speedX)+(this.speedY*this.speedY)) * 10;
		if (dist<radius || speed0>dist)
		{
			this.accelerationX = 0;
			this.accelerationY = 0;
			this.speedX = this.speedX*(0.75 + 0.99 - this.friction);
			this.speedY = this.speedY*(0.75 + 0.99 - this.friction);
		}
		else {
			this.accelerationX = -(this.speed * dX);
			this.accelerationY = (this.speed * dY);	
		}

		// this.speedX = -(this.speed * dX);
		// this.speedY = (this.speed * dY);	
		// console.log(dY);
	}
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
			if (myGamePiece.ammoMax[1]<100)
			{
				createPickupMessage('Backpack - Double ammo cap',x,y,'#ffcc66');
			}
			myGamePiece.ammoMax[1] = 100;
			myGamePiece.ammoMax[2] = 100;
			myGamePiece.ammoMax[3] = 400;
			myGamePiece.ammoMax[4] = 100;
			myGamePiece.ammoMax[5] = 600;
			myGamePiece.ammoMax[6] = 600;
			
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
				createPickupMessage(myGamePiece.weapon[1],x,y,'#ffff99');
				break;
				case 2:
				createPickupMessage(myGamePiece.weapon[2],x,y,'#ffff99');
				break;
				case 3:
				createPickupMessage(myGamePiece.weapon[3],x,y,'#ffff99');
				break;
				case 4:
				createPickupMessage(myGamePiece.weapon[4],x,y,'#ffff99');
				break;
				case 5:
				createPickupMessage(myGamePiece.weapon[5],x,y,'#ffff99');
				break;
				case 6:
				createPickupMessage(myGamePiece.weapon[6],x,y,'#ffff99');
				break;
				case 7:
				createPickupMessage(myGamePiece.weapon[7],x,y,'#ffff99');
				break;
				default:
				// statements_def
				break;
			}
		}

		for (var i = 0; i < 4; i++) {
			if (item.powergive[i] > 0)
			{		
				eaten = true;	
				playsound(item.pickupSound,SOUND_CHANNEL_POWER);
				myGamePiece.powerups[i] += item.powergive[i];
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
	//--weapon--
	this.fireBullet = function(speed,spread,damage)
	{
		if (!this.hasPower[0])
		{
			missiles_list.push(new tracer(64, 64, "games/player/tracer.png", this.x, this.y,'image'));
		} else 
		{
			missiles_list.push(new tracer(64, 64, "games/player/tracer2.png", this.x, this.y,'image'));
		}
		lastCreatedComponent.speed = speed;
		lastCreatedComponent.width = 8;
		lastCreatedComponent.height = 32;
		if (!spread)
		{
			lastCreatedComponent.angle = this.angle;
		} else {
			lastCreatedComponent.angle = this.angle+((Math.random()-0.5)*spread);			
		}
		lastCreatedComponent.dice = 3;    
		if (!damage)
		{
			lastCreatedComponent.damage = 5;
		} else {
			lastCreatedComponent.damage = damage;
		}
	}
	this.player_fire = function()
	{
		switch (this.currentWeapon) 
		{
			//pistol
			case 0:
			if (!_useUpgrade[0])
			{
				this.fireBullet(48) 
				pixelExplosion(3,'#ffffcc',this.x,this.y-16,this.angle,0.3,5);
				this.cooldown = 15;
				playsound('games/player/DSTPFIR.mp3',SOUND_CHANNEL_WEAPON);
				this.setState(1 , "games/player/fire2.png")
			}
			else
			{
				switch (this.weaponState) 
				{
					case 0:
					case 1:
					this.fireBullet(getRandomInt(48,56),0.15) 
					pixelExplosion(3,'#ffffcc',this.x,this.y-16,this.angle,0.3,5);
					this.cooldown = 5;
					this.holdFire = true;
					playsound('games/player/harfir2.mp3',SOUND_CHANNEL_WEAPON);
					this.setState(1 , "games/player/fire2.png")
					this.weaponState = this.weaponState + 1;
					break;
					case 2:
					this.fireBullet(getRandomInt(48,56),0.15)    
					pixelExplosion(3,'#ffffcc',this.x,this.y-16,this.angle,0.3,5);
					this.cooldown = 25;
					this.holdFire = false;
					playsound('games/player/harfir2.mp3',SOUND_CHANNEL_WEAPON);
					this.setState(1 , "games/player/fire2.png")
					this.weaponState = 0;
					break;
				}
			}
			break;

			//shotgun
			case 1:
			if (!_useUpgrade[1])
			{
				for (i = 0; i < 5; i ++){
					this.fireBullet(getRandomInt(40,56),0.10,7)  
				}
				pixelExplosion(15,'#ffffcc',this.x,this.y-16,this.angle,0.5,7);
				this.cooldown = 50;
				playsound('games/player/DS12GFIR.mp3');
				this.setState(1 , "games/player/fire2.png")
			} else {
				for (i = 0; i < 5; i ++){
					this.fireBullet(getRandomInt(40,56),0.25,5)  
				}
				pixelExplosion(15,'#ffffcc',this.x,this.y-16,this.angle,0.5,7);
				this.cooldown = 20;
				playsound('games/player/DSASGFR1.mp3');
				this.setState(1 , "games/player/fire2.png")
			}

			break;

			//supershotgun
			case 2:
			if (!_useUpgrade[2])
			{
				for (i = 0; i < 10; i ++){
					this.fireBullet(getRandomInt(40,56),0.30,10)  
				}
				pixelExplosion(25,'#ffffcc',this.x,this.y-16,this.angle,0.6,9);
				this.cooldown = 75;
				playsound('games/player/DSDSHTGN.mp3',SOUND_CHANNEL_WEAPON);
				this.setState(1 , "games/player/fire2.png")
			}
			else
			{
				for (i = 0; i < 20; i ++){
					this.fireBullet(getRandomInt(40,72),0.30,15)  
				}
				this.speedY += 5;
				pixelExplosion(25,'#ffffcc',this.x,this.y-16,this.angle,0.6,9);
				this.cooldown = 130;
				playsound('games/player/QSGFIRE1.mp3',SOUND_CHANNEL_WEAPON);
				this.setState(1 , "games/player/fire2.png")				
			}
			break;

			//chaingun
			case 3:
			if (!_useUpgrade[3])
			{
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
					this.fireBullet(48,0.20,5);
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
			}
			else
			{
				switch (this.weaponState) 
				{
					case 0:
					playsound('games/player/DTHDLRST.mp3',SOUND_CHANNEL_ACTION);
					this.cooldown = 18;
					this.holdFire = true;
					this.weaponState = 1;
					this.setState(1 , "games/player/fire.png")
					break;
					case 1:
					this.usingAmmo = true;
					for (i = 1; i < 3; i ++){
						this.fireBullet(getRandomInt(40,56),i*0.15);
					}
					playsound('games/player/ChaingunFire.mp3',SOUND_CHANNEL_WEAPON);
					pixelExplosion(3,'#ffffcc',this.x,this.y-16,this.angle,0.35,10);
					this.cooldown = 3;
					this.setState(1 , "games/player/fire2.png")
					this.speedX = this.speedX * 0.75;
					this.speedY = this.speedY * 0.75;					
					if (this.holdFire == true && this.isFiring == false)
					{
						this.weaponState = 2;
						this.usingAmmo = false;
					}

					break;
					case 2:
					this.holdFire = false;
					playsound('games/player/DTHDLRSP.mp3',SOUND_CHANNEL_ACTION);
					this.cooldown = 18;
					this.weaponState = 0;
					break;
				}
			}
			break;

			//rocketlauncher
			case 4:
			if (!_useUpgrade[4])
			{
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
			}
			else
			{
				this.cooldown = 33;
				playsound('games/player/RLCYCLE.mp3',SOUND_CHANNEL_ACTION);
				this.rocketCharged += 1;
				this.setState(1 , "games/player/fire.png");		
			}
			break;

			//plasma
			case 5:
			if (!_useUpgrade[5])
			{
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
			}
			else
			{
				for (var i = 0; i < 3; i++) {
					missiles_list.push(new railshot(8, 192, "games/player/railshot.png", this.x, this.y + (i * (-75)),'image'));
					lastCreatedComponent.speed = 200;
					lastCreatedComponent.width = 15;
					lastCreatedComponent.height = 225;
					lastCreatedComponent.angle = 0;
					lastCreatedComponent.damage = 100;
					lastCreatedComponent.health = 100;
					lastCreatedComponent.dice = 1;
				}
				pixelExplosion(10,'#3399ff',this.x,this.y-16,this.angle,0.1,16);
				this.cooldown = 110;
				playsound('games/player/RAILGF1.mp3',SOUND_CHANNEL_WEAPON);
				this.setState(1 , "games/player/fire2.png")
			}
			break;

			//bfg9k
			case 6:
			if (!_useUpgrade[6])
			{
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
			}
			else
			{
				switch (this.weaponState) 
				{
					case 0:
					this.cooldown = 105;
					this.holdFire = true;
					this.weaponState = 1;
					playsound('games/player/DSDEVCHR.mp3',SOUND_CHANNEL_WEAPON);
					this.setState(1 , "games/player/fire.png")
					break;
					case 1:
					playsound('games/player/DEVASFIR.mp3',SOUND_CHANNEL_WEAPON);
					playsound('games/player/DSDTBBL.mp3',SOUND_CHANNEL_BFGBALL);					
					missiles_list.push(new bfgball2(45, 45, "games/player/bfgball.png", this.x, this.y,'image'));
					_totalBfgBall += 1;
					lastCreatedComponent.speed = 4;
					lastCreatedComponent.width = 45;
					lastCreatedComponent.height = 45;
					lastCreatedComponent.angle = this.angle;
					lastCreatedComponent.damage = 100;
					lastCreatedComponent.dice = 8;
					pixelExplosion(25,'#66ff99',this.x,this.y-16,this.angle,0.65,10);
					this.cooldown = 60;
					this.holdFire = false;
					this.weaponState = 0;
					this.setState(1 , "games/player/fire2.png")
					break;
				}			
			}
			break;

			case 7:
			missiles_list.push(new laser(64, 64, "games/player/laser.png", this.x, this.y,'image'));
			lastCreatedComponent.speed = 48;
			lastCreatedComponent.width = 8;
			lastCreatedComponent.height = 32;
			lastCreatedComponent.angle = this.angle;
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

		for (var i = 0; i < 20; i ++) {  
			missiles_list.push(new bfgtracer(32, 32, "games/null.png", myGamePiece.x + getRandomInt(-256,256), myGamePiece.y,'image'));
			lastCreatedComponent.speed = 40+getRandomInt(0,8);
			lastCreatedComponent.angle = this.angle+((Math.random()-0.5)*2.5);
			lastCreatedComponent.damage = 98;
			lastCreatedComponent.dice = 2;    
			lastCreatedComponent.state = 1;    
		}
	}
	this.releaseCharge = function(){
		var MaxAngle;
		var MaxCharge;
		MaxAngle = this.rocketCharged * 0.05;
		MaxCharge = this.rocketCharged;
		if (this.hasPower[0])
		{
			playsound('games/powerups/damage3.mp3',SOUND_CHANNEL_QDMG);
		}
		for (var i = 0; i < this.rocketCharged; i ++) {  
			missiles_list.push(new rocket2(48, 48, "games/player/misxa7a3.png", this.x, this.y,'image'));
			lastCreatedComponent.speed = 24;
			lastCreatedComponent.width = 16;
			lastCreatedComponent.height = 24;
			lastCreatedComponent.angle = -MaxAngle + (MaxAngle * 2 / MaxCharge * (i+1)) - 0.05;
			lastCreatedComponent.damage = 20;
			lastCreatedComponent.dice = 8;
			pixelExplosion(5,'#ff6666',this.x,this.y-16,lastCreatedComponent.angle,0.25,15);     
		}
		this.rocketCharged = 0;
		playsound('games/player/dsrktfir.mp3',SOUND_CHANNEL_WEAPON);
		this.setState(1 , "games/player/fire2.png")
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

		this.resistance = 1.0;
		if (this.hasPower[3])
		{
			this.resistance = this.resistance * 0.5;
		}
		if (cvar_difficulty == 0)
		{
			this.resistance = this.resistance * 0.5;
		}

		if (this.hasPower[1] && this.powerups[1] % 60 == 0)
		{
			if (this.health < 100)
			{
				playsound('games/powerups/regen.mp3');
				this.health += 15;
			} else if (this.health < 200)
			{
				playsound('games/powerups/regen.mp3');
				this.health += 5;
				if (this.health > 200)
				{
					this.health = 200;
				}
			}
		}

		if (this.cooldown>0) {
			if (this.hasPower[2])
			{
				this.cooldown -= 2;
			} else {
				this.cooldown -= 1;
			}
			myCrosshairH.width = this.cooldown;	
			switch (this.currentWeapon) {
				case 0:
				myCrosshairH.width = this.cooldown * 3;
				break;
				case 1:
				if (_useUpgrade[1])
				{
					myCrosshairH.width = this.cooldown * 3;					
				}
				break;
				case 3:
				myCrosshairH.width = this.cooldown * 5;
				break;
				case 4:
				myCrosshairH.width = this.cooldown * 2;
				break;
				case 5:
				if (_useUpgrade[5])
				{
					myCrosshairH.width = this.cooldown * 2;					
				} else {
					myCrosshairH.width = this.cooldown * 8;
				}
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
						if ((this.currentWeapon != 4 || !_useUpgrade[4]) && this.hasPower[0] && this.currentWeapon < 6)
						{
							playsound('games/powerups/damage3.mp3',SOUND_CHANNEL_QDMG);
						}
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
		if ((!this.isFiring && this.rocketCharged > 0) || this.rocketCharged >= 8)
		{
			this.releaseCharge();
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
		playsound('games/player/dbfgex2.mp3',SOUND_CHANNEL_EXPLOSION);
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


var railshot = function()
{
	missile.apply(this,arguments);
	this.missileUpdate = function()
	{
		for (var i = -4; i <= 4; i++) {
			pixelExplosion1(1,'#bbbbff',this.x,this.y + (i*25),this.angle,6.28,1,4,40);
		}
	}
}
railshot.prototype = missile.prototype;
railshot.prototype.constructor = railshot;

var rocket = function()
{
	missile.apply(this,arguments);
	this.explode = function()
	{
		this.splashDamage(144,144);
		playsound('games/dxbarexp.mp3',SOUND_CHANNEL_EXPLOSION);
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

var rocket2 = function()
{
	missile.apply(this,arguments);
	this.explode = function()
	{
		this.splashDamage(128,128);
		playsound('games/dsbarex2.mp3',SOUND_CHANNEL_EXPLOSION);
		this.explode0(103,86,"games/explode.png",6,2);
		pixelExplosion1(7,'#ffffcc',this.x,this.y,this.angle,6.28,10);
	}
	this.missileUpdate = function()
	{
		pixelExplosion1(1,'#eeffcc',this.x,this.y,this.angle,6.28,2,2);
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

var bfgball2 = function()
{

	missile.apply(this,arguments);
	this.cooldown = 0;
	this.explode = function()
	{
		playsound('games/player/DSDEVEXP.mp3');
		this.explode0(143,114,"games/player/bfgx2.png",6,6);
		pixelExplosion1(20,'#99ff99',this.x,this.y,this.angle,6.28,10);
	}
	this.missileUpdate = function()
	{
		var targetMonster;
		var targetDist;
		var dist = 99999;
		this.cooldown -= 1;
		if (this.cooldown <= 0)
		{
			this.cooldown = Math.floor(myGameArea.canvas.height / 100) + 1;
			for (var i = monsters_list.length - 1; i >= 0; i--) {
				targetDist = this.getDist(monsters_list[i]);
				if (targetDist < dist)
				{
					targetMonster = monsters_list[i];
					dist = targetDist;
				}
			}
			if (targetMonster && dist<500)
			{
				lines_list.push(new line('#aaffaa',this.x,this.y,targetMonster.x,targetMonster.y,4,10));
				if (targetMonster.isBoss)
				{
					this.harm(targetMonster,50 - (dist*0.09));
				} else {
					this.harm(targetMonster,100 - (dist*0.15));
				}
				_score += Math.floor(lastDamageTaken);
				localStorage.money = Number(localStorage.money) + Math.floor(lastDamageTaken);
				_money += Math.floor(lastDamageTaken);
				pixelExplosion1(6,'#aaffaa',targetMonster.x,targetMonster.y,this.angle,6.28,6);
			}
		}
		pixelExplosion1(1,'#aaffaa',this.x,this.y,this.angle,6.28,5);
	}
	this.death = function()
	{
		_totalBfgBall -= 1;
		if (_totalBfgBall<= 0)
		{
			StopSound(SOUND_CHANNEL_BFGBALL);
		}
	}
}
bfgball2.prototype = missile.prototype;
bfgball2.prototype.constructor = bfgball;

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
	this.chargeHit = function(target)
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
		this.playsound("games/head/dsdmpain.mp3");
		this.setState(-1,'games/head/pain.png')    
		this.filp = false;
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
				this.image.src = 'games/head/idleL.png';
				this.filp = true;
			} 
			else if (this.accelerationX<-0.5) {
				this.image.src = 'games/head/idleL.png';
				this.filp = false;
			} else {
				this.image.src = 'games/head/idle.png';
				this.filp = false;
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
				playsound('games/head/dsfwoosh.mp3',SOUND_CHANNEL_MONSTERWEAPON);
				this.setState(3);
				monsterball_list.push(new afritBall(90, 90, "games/head/fireball.png", this.x, this.y,'image'));
				lastCreatedComponent.height = 49;
				lastCreatedComponent.width = 15;
				lastCreatedComponent.speed = 32;
				lastCreatedComponent.angle = -3.14;
				lastCreatedComponent.state = 1;
				if (cvar_difficulty > 2)
				{
					lastCreatedComponent.damage = 20;
				} else {
					lastCreatedComponent.damage = 10;
				}
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

var inferno = function()
{
	monsters.apply(this,arguments);
	this.friction = 0.825;
	this.health = 400;
	this.maxhealth = 400;
	this.mass = 40;
	this.painChance = 35;
	this.frameLength = 8;
	this.powerLevel = 250;
	this.explode = function()
	{	
		playsound("games/pain/dspedth.mp3");
		this.explode0(116,98,"games/inferno/death116x98.png",6,6,true);
		deathDrop(250,this.x,this.y);
	}
	this.pain = function()
	{
		this.playsound("games/pain/dspepain.mp3");
		this.setState(-1,'games/inferno/pain.png')    
		this.filp = false;
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


		if (this.y < (myGameArea.canvas.height / 2))
		{
			rnd = getRandomInt(0,150);
			if (rnd <=10)
			{
				rnd = Math.floor(Math.random() * Math.abs(this.targetRange) + 1);  
				if (rnd < _difficult / 10 + 10 && this.state == 0)
				{
					this.targetRange = 99999;
					this.setState(1,'games/inferno/attack.png');
					this.frameLength = 9;
					this.targetRange = 99999;
				}
			}
		}
		else 
		{
			this.accelerationY = this.accelerationY - 0.1;	
		}

		switch (this.state) {
			case 0:	
			if (this.accelerationX>0.5) {
				this.image.src = 'games/inferno/idleL.png';
				this.filp = true;
			} 
			else if (this.accelerationX<-0.5) {
				this.image.src = 'games/inferno/idleL.png';
				this.filp = false;
			} else {
				this.image.src = 'games/inferno/idle.png';
				this.filp = false;
			}
			break;

			case 1:
			if (this.timer == 16)
			{
				this.setState(2,'games/inferno/attack1.png');
				this.playsound('games/inferno/vorethrw.mp3');
				monsterball_list.push(new voreBall(19, 17, "games/inferno/vore.png", this.x, this.y,'image'));
				lastCreatedComponent.height = 15;
				lastCreatedComponent.width = 15;
				lastCreatedComponent.speed = 5;
				lastCreatedComponent.angle = -3.14 + (Math.random() - 0.5);
				lastCreatedComponent.state = 1;
			}
			break;

			case 2:
			if (this.timer == 6)
			{
				this.setState(0,'games/inferno/idle.png'); 
				this.frameLength = 4;              
			}
			break;

			case -1:
			if (this.timer == 6)
			{
				this.setState(0,'games/inferno/idle.png')   
				this.frameLength = 4;    
			}
			break;

			default:
			// statements_def
			break;
		}
	}
}

var lostsoul = function(){
	monsters.apply(this,arguments);
	this.deathSound = "games/dsfirxpl.mp3";
	this.friction = getRandomFloat(0.85,0.95);
	this.health = 30;
	this.maxhealth = 30;
	this.mass = 10;
	this.frameLength = 6;
	this.damage = 4;
	this.painChance = 60;
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
		this.playsound("games/head/dsdmpain.mp3");
		this.setState(-1,'games/soul/pain.png');
		this.filp = false;
	}
	this.chargeHit = function(target)
	{
		this.harm(target);
		this.isCharging = false;
		this.timer = 99999;
		this.speedX = this.speedX * Math.random();
		this.speedY = this.speedY * Math.random();
		this.chargeAt(myGamePiece,-getRandomInt(10,20));
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
				this.image.src = 'games/soul/idleL.png';
				this.filp = true;
			} 
			else if (this.accelerationX<-0.5) {
				this.image.src = 'games/soul/idleL.png';
				this.filp = false;
			}
			else {
				this.image.src = 'games/soul/idle.png';
				this.filp = false;
			}
			break;

			case 1:
			if (this.timer >= 5)
			{ 
				this.playsound('games/soul/dssklatk.mp3');
				this.setState(2)
				this.chargeAt(myGamePiece,getRandomInt(7,12)+(myGameArea.canvas.height/100),Math.random());   
				this.timer = getRandomInt(Math.floor(-0.1*_difficult),25);
				this.friction = getRandomFloat(0.99,1.00);
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


var lostsoul2 = function(){
	lostsoul.apply(this,arguments);
	this.suicide = false;
	this.powerLevel = 40;
	this.health = 40;
	this.maxhealth = 40;
	this.painChance = 50;
	this.chargeHit = function(target)
	{
		if (!this.suicide)
		{
			this.harm(target);
			this.isCharging = false;
			this.timer = 99999;
			this.speedX = this.speedX * Math.random();
			this.speedY = this.speedY * Math.random();
			this.chargeAt(myGamePiece,-getRandomInt(10,20));
		}
		else
		{
			this.isDead = true;
			this.speedX = 0;
			this.speedY = 0;
			if (cvar_difficulty>2)
			{
				this.damage = 20;
			} else {
				this.damage = 10;
			}
			this.dice = 8;
			playsound('games/dxbarexp.mp3');
			this.harm(target);
			this.explode();
		}
	}
	this.explode = function()
	{
		var chance = 125 - _difficult;
		if (chance<25) {chance = 25}
			this.explode0(103,90,"games/soul2/death.png",6,6,true);
		deathDrop(30,this.x,this.y,chance);	
	}
	this.pain = function()
	{
		this.setState(-1,'games/soul2/pain.png') 
		if (this.suicide)
		{
			this.isDead = true;
			this.explode();
			return;
		}
		this.playsound("games/DM2PAIN.mp3");
		this.filp = false;
	}
	this.monster_update = function()
	{
		this.timer = this.timer + 1;
		if (!this.isCharging)
		{
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
		}
		rnd = getRandomInt(0,100);
		if (this.y < (myGameArea.canvas.height / 3))
		{
			if (rnd<=3)
			{
				rnd = Math.floor(Math.random() * Math.abs(this.targetRange / 4) + 1);  
				if (rnd < _difficult / 40 + 1 && this.state == 0)
				{
					this.suicide = true;
					this.setState(3,'games/soul2/attack.png')
					this.playsound('games/soul2/FRGTSEE.mp3',SOUND_CHANNEL_WARNING);
					this.frameLength = 5;
					this.targetRange = 99999;
					this.speedX = this.speedX * Math.random() * Math.random();
					this.speedY = this.speedY * Math.random() * Math.random();
					this.accelerationX = this.accelerationX * Math.random() * Math.random();
					this.accelerationY = this.accelerationX * Math.random() * Math.random();
				}
			} else if (rnd <= 7)
			{
				rnd = Math.floor(Math.random() * Math.abs(this.targetRange / 3) + 1);  
				if (rnd < _difficult / 20+5 && this.state == 0)
				{
					this.setState(1,'games/soul2/attack.png')
					this.frameLength = 5;
					this.targetRange = 99999;
					this.timer = -getRandomInt(0,10);
					this.speedX = this.speedX * Math.random();
					this.speedY = this.speedY * Math.random();
				}
			}
		} else {
			if (!this.isCharging)
			{
				this.speedY = this.speedY - 1;
			}
		}

		switch (this.state) {
			case 0:	
			this.frameLength = 6;
			if (this.accelerationX>0.5) {
				this.image.src = 'games/soul2/idleL.png';
				this.filp = true;
			} 
			else if (this.accelerationX<-0.5) {
				this.image.src = 'games/soul2/idleL.png';
				this.filp = false;
			}
			break;
			case 1:
			if (this.timer >= 5)
			{ 
				this.playsound('games/soul2/SKL2ATK.mp3');
				this.setState(2)
				this.chargeAt(myGamePiece,getRandomInt(8,13)+(myGameArea.canvas.height/100),Math.random());   
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
				this.setState(0,'games/soul2/idle.png');  
				this.isCharging = false;

			}
			break;
			case -1:
			if (this.timer >= 5)
			{
				this.friction = getRandomFloat(0.85,0.95);
				this.setState(0,'games/soul2/idle.png')   
				this.isCharging = false;
			}
			break;
			case 3:
			pixelExplosion(1,'#33bb66',this.x,this.y,this.angle,6.28,6);
			if (this.timer >= 20)
			{ 
				playsound('games/soul2/RICTKAMA.mp3');
				this.setState(4)
				this.chargeAt(myGamePiece,getRandomInt(5,10)+(myGameArea.canvas.height/200));   
				this.friction = 1.0;
				this.isCharging = true;
			} 
			case 4:
			pixelExplosion(1,'#44cc44',this.x,this.y,this.angle,6.28,1);
			this.chargeAt(myGamePiece,0.25);
			break;
			default:
			// statements_def
			break;
		}
	}
}
lostsoul2.prototype = lostsoul.prototype;
lostsoul2.prototype.constructor = lostsoul;




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
		deathDrop(200,this.x-16,this.y);
		deathDrop(200,this.x+16,this.y);
	}
	this.pain = function()
	{
		this.playsound("games/head/dsdmpain.mp3");
		this.setState(-1,'games/afrit/pain.png');
		this.filp = false;
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
		if (this.y < (myGameArea.canvas.height * 0.5))
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
			this.accelerationY = this.accelerationY - 0.01;
		}

		switch (this.state) {
			case 0:	
			if (this.accelerationX>0.5) {
				this.image.src = 'games/afrit/idleL.png';
				this.filp = true;
			} 
			else if (this.accelerationX<-0.5) {
				this.image.src = 'games/afrit/idleL.png';
				this.filp = false;
			} else {
				this.image.src = 'games/afrit/idle.png';
				this.filp = false;
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
				playsound('games/afrit/afritatk.mp3',SOUND_CHANNEL_MONSTERWEAPON);
				this.setState(0,'games/afrit/idle.png'); 
				angl = -1;
				for (var z = 0; z < 3; z++) {
					monsterball_list.push(new afritBall(67, 67, "games/afrit/fireball.png", this.x, this.y,'image')); 
					lastCreatedComponent.width = 48;    
					lastCreatedComponent.height = 48;  
					lastCreatedComponent.speed = 20;
					lastCreatedComponent.angle = -3.14 + angl;
					lastCreatedComponent.damage = 8;
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

var spider = function(){
	monsters.apply(this,arguments);
	this.deathSound = "games/spider/dsbspdth.mp3";
	this.friction = 0.88;
	this.health = 500;
	this.maxhealth = 500;
	this.mass = 50;
	this.frameLength = 6;
	this.painChance = 30;
	this.powerLevel = 200;
	this.explode = function()
	{
		this.explode0(99,58,"games/spider/death99x58.png",6,5,true);
		deathDrop(100,this.x-16,this.y);
		deathDrop(100,this.x+16,this.y);
	}
	this.pain = function()
	{
		this.playsound("games/head/dsdmpain.mp3");
		this.setState(-1,'games/spider/pain.png');
		this.filp = false;
	}
	this.monster_update = function()
	{
		this.timer = this.timer + 1;
		rnd = getRandomInt(1,150);
		if (rnd <= 20)
		{
			this.targetRange = myGamePiece.x - this.x;
			this.accelerationX = this.accelerationX + (Math.random() * this.targetRange / 40000);
			this.SpeedX = this.SpeedX + (Math.random() * this.targetRange / 10000);						
		} 
		else if (rnd <= 23)
		{
			this.accelerationY = this.accelerationY + ((Math.random() - 0.5) * 0.5);
			this.accelerationX = this.accelerationX + ((Math.random() - 0.5) * 0.5);
		}
		else if (rnd <= 30)
		{
			range = (myGameArea.canvas.height / 5) - this.y;
			this.accelerationY = this.accelerationY + (Math.random() * range / 8000);
			this.speedY = this.speedY + (Math.random() * range / 6000);
		}
		else if (rnd <= 40)
		{
			if (this.boundCheckImmunityTime < 0 && this.speedX + this.speedY > 6)
			{
				this.speedX = this.speedX * Math.random();
				this.speedY = this.speedY * Math.random();
				this.accelerationX = this.accelerationX * Math.random();
				this.accelerationY = this.accelerationY * Math.random();				
			}
		}

		rnd = getRandomInt(0,100);
		if (this.y < (myGameArea.canvas.height * 0.5))
		{
			if (rnd<=3)
			{
				rnd = Math.floor(Math.random() * Math.abs(this.targetRange) / 3 + 1);  
				if (rnd < _difficult / 20 + 1 && this.state == 0)
				{
					this.setState(1,'games/spider/attack.png')
					playsound('games/spider/dsbspsit.mp3',SOUND_CHANNEL_WARNING)
					this.frameLength = 6;
					this.targetRange = this.targetRange + (Math.random()*2000);
					this.speedX = this.speedX * Math.random();
					this.speedY = this.speedY * Math.random();
					this.accelerationX = this.accelerationX * Math.random() * Math.random();
					this.accelerationY = this.accelerationY * Math.random() * Math.random();
				}
			} else if (rnd<=7)
			{
				rnd = Math.floor(Math.random() * Math.abs(this.targetRange) + 1);  
				if (rnd < _difficult / 20 + 20 && this.state == 0)
				{
					this.setState(4,'games/spider/attack.png')
					playsound('games/spider/dsbspact.mp3')
					this.frameLength = 6;
					this.targetRange = this.targetRange + (Math.random()*2000);
					this.speedX = this.speedX * Math.random();
					this.speedY = this.speedY * Math.random();
					this.accelerationX = this.accelerationX * Math.random();
					this.accelerationY = this.accelerationY * Math.random();
				}
			}
		} else {
			this.speedY = this.speedY - 0.1;
			this.accelerationY = this.accelerationY - 0.02;
		}

		switch (this.state) {
			case 0:	
			if (this.accelerationX>0.5) {
				this.image.src = 'games/spider/idleL.png';
				this.filp = true;
			} 
			else if (this.accelerationX<-0.5) {
				this.image.src = 'games/spider/idleL.png';
				this.filp = false;
			} else {
				this.image.src = 'games/spider/idle.png';
				this.filp = false;
			}
			break;


			case 1:
			pixelExplosion1(1,'#bb6633',this.x,this.y + 8,this.angle,6.28,6);
			lines_list.push(new line('#ff1111',this.x,this.y + 8,myGamePiece.x,myGamePiece.y,2,1));
			if (this.timer >= 45)
			{ 
				this.setState(2,'games/spider/attack1.png');
			}
			break;

			case 2:
			if (this.timer >= 14)
			{
				playsound('games/spider/DMC_FIRE.mp3',SOUND_CHANNEL_MONSTERWEAPON);
				this.setState(3,'games/spider/attack2.png'); 
				angl = -0.7;
				for (var z = 0; z < 5; z++) {
					monsterball_list.push(new afritBall(90, 90, "games/head/fireball.png", this.x, this.y + 8,'image'));
					lastCreatedComponent.height = 32;
					lastCreatedComponent.width = 32;
					lastCreatedComponent.speed = 32;
					lastCreatedComponent.angle = this.getAngle(myGamePiece) + angl;
					lastCreatedComponent.state = 1;
					if (cvar_difficulty > 2)
					{
						lastCreatedComponent.damage = 20;
					} else {
						lastCreatedComponent.damage = 10;
					}
					angl = angl + 0.35;
				}
			}
			break;

			case 3:
			if (this.timer >= 8)
			{ 
				this.setState(0,'games/spider/idle.png');
			}
			break;

			case 4:
			if (this.timer >= 25)
			{ 
				this.setState(5,'games/spider/attack3.png');
				playsound('games/spider/dsdshtgn.mp3');
				monsterball_list.push(new monsterBall(64, 64, "games/player/tracer.png", this.x, this.y,'image'));
				lastCreatedComponent.height = 8;
				lastCreatedComponent.width = 32;
				lastCreatedComponent.speed = 48;
				lastCreatedComponent.angle = -3.14 + (((Math.random() - 0.5) * 2) * Math.random());
				lastCreatedComponent.state = 1;
				lastCreatedComponent.damage = 5;
				lastCreatedComponent.dice = 3;		
			}
			break;

			case 5:
			case 6:
			case 7:
			case 8:
			case 9:
			case 10:
			case 11:
			case 12:
			case 13:
			case 14:
			case 15:
			case 16:
			case 17:
			case 18:
			case 19:
			case 20:
			case 21:
			case 22:
			if (this.timer >= 5)
			{ 
				playsound('games/spider/dsdshtgn.mp3');
				if (this.state % 2 == 0)
				{
					this.setState(this.state + 1,'games/spider/attack3.png');
				} else {
					this.setState(this.state + 1,'games/spider/attack4.png');
				}
				monsterball_list.push(new monsterBall(64, 64, "games/player/tracer.png", this.x, this.y,'image'));
				lastCreatedComponent.height = 8;
				lastCreatedComponent.width = 32;
				lastCreatedComponent.speed = 48;
				lastCreatedComponent.angle = -3.14 + (((Math.random() - 0.5) * 2) * Math.random());
				lastCreatedComponent.state = 1;
				lastCreatedComponent.damage = 5;
				lastCreatedComponent.dice = 3;	
			}
			break;

			case 23:
			if (this.timer >= 3)
			{ 
				this.setState(0,'games/spider/idle.png')  
			}
			break;

			case -1:
			if (this.timer == 8)
			{
				this.setState(0,'games/spider/idle.png')   
			}
			break;

			default:
			// statements_def
			break;
		}
	}
}


var master = function(){
	monsters.apply(this,arguments);
	//this.deathSound = "games/master/dsbspdth.mp3";
	this.friction = 0.875;
	this.health = 4000;
	this.maxhealth = 4000;
	this.mass = 100;
	this.frameLength = 6;
	this.painChance = 12;
	this.powerLevel = 1000;
	this.isBoss = true;
	this.explode = function()
	{
		if (!this.isBoss)
		{
			deathDrop(500,this.x-32,this.y);
			deathDrop(500,this.x+32,this.y);
			deathDrop(500,this.x-64,this.y);
			deathDrop(500,this.x+64,this.y);
		}
		this.playsound('games/master/dsspidth.mp3')
		this.explode0(197,105,"games/master/death197x105.png",7,5,true);
	}
	this.pain = function()
	{
		//playsound("games/head/dsdmpain.mp3");
		this.setState(-1,'games/master/pain.png');
		this.filp = false;
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
		else if (rnd <= 60)
		{
			if (this.speedX + this.speedY > 5 && this.targetRange < 200)
			{
				this.speedX = this.speedX * Math.random();
				this.speedY = this.speedY * Math.random();
				this.accelerationX = this.accelerationX * Math.random();
				this.accelerationY = this.accelerationY * Math.random();				
			}
		}

		rnd = getRandomInt(0,100);
		if (this.y < (myGameArea.canvas.height * 0.5))
		{
			if (rnd<=5)
			{
				rnd = Math.floor(Math.random() * Math.abs(this.targetRange) / 2 + 1);  
				if (rnd < _difficult / 20 + 20 && this.state == 0)
				{
					this.setState(1,'games/master/idle.png');
					playsound('games/spider/dsbspact.mp3');
					this.frameLength = 6;
					this.targetRange = this.targetRange + (Math.random()*2000);
					this.speedX = this.speedX * Math.random();
					this.speedY = this.speedY * Math.random();
					this.accelerationX = this.accelerationX * Math.random();
					this.accelerationY = this.accelerationY * Math.random();
				}
			}
		} else {
			this.accelerationY = this.accelerationY - 0.01;
		}

		switch (this.state) {
			case 0:	
			if (this.accelerationX>0.5) {
				this.image.src = 'games/master/idleL.png';
				this.filp = true;
			} 
			else if (this.accelerationX<-0.5) {
				this.image.src = 'games/master/idleL.png';
				this.filp = false;
			}
			else 
			{
				this.image.src = 'games/master/idle.png';
				this.filp = false;			
			}
			break;


			case 1:
			if (this.timer >= 15)
			{ 
				this.setState(2,'games/master/attack2.png');
				monsterball_list.push(new monsterBall(64, 64, "games/player/tracer.png", this.x, this.y,'image'));
				lastCreatedComponent.height = 8;
				lastCreatedComponent.width = 8;
				lastCreatedComponent.speed = getRandomInt(32,48);
				lastCreatedComponent.angle = this.getAngle(myGamePiece) + ((Math.random() - 0.5) * Math.random());
				lastCreatedComponent.state = 1;
				lastCreatedComponent.damage = 5;
				lastCreatedComponent.dice = 3;		
			}
			break;

			case 2:
			case 3:
			case 4:
			case 5:
			case 6:
			case 7:
			case 8:
			case 9:
			case 10:
			case 11:
			case 12:
			case 13:
			case 14:
			case 15:
			case 16:
			case 17:
			case 18:
			case 19:
			if (this.timer >= 4)
			{ 
				playsound('games/player/ChaingunFire.mp3');
				if (this.state % 2 == 0)
				{
					this.setState(this.state + 1,'games/master/attack1.png');
				} else {
					this.setState(this.state + 1,'games/master/attack2.png');
				}
				monsterball_list.push(new monsterBall(64, 64, "games/player/tracer.png", this.x, this.y + 15,'image'));
				lastCreatedComponent.height = 8;
				lastCreatedComponent.width = 8;
				lastCreatedComponent.speed = getRandomInt(32,48);
				lastCreatedComponent.angle = this.getAngle(myGamePiece) + ((Math.random() - 0.5) * Math.random() * 0.25);
				lastCreatedComponent.state = 1;
				lastCreatedComponent.damage = 5;
				lastCreatedComponent.dice = 3;		
			}
			break;

			case 20:
			if (this.timer >= 3)
			{ 
				this.setState(0,'games/master/idle.png')  
			}
			break;

			case -1:
			if (this.timer == 8)
			{
				this.setState(0,'games/master/idle.png')   
			}
			break;

			default:
			// statements_def
			break;
		}
	}
}


var queen = function(){
	monsters.apply(this,arguments);
	//this.deathSound = "games/master/dsbspdth.mp3";
	this.friction = 0.875;
	this.health = 8000;
	this.maxhealth = 8000;
	this.mass = 100;
	this.frameLength = 6;
	this.painChance = 10;
	this.powerLevel = 2000;
	this.isBoss = true;
	this.explode = function()
	{
		this.playsound('games/queen/octady.mp3')
		this.explode0(165,114,"games/queen/death.png",7,5,true);
	}
	this.pain = function()
	{
		playsound("games/queen/octapn.mp3");
		this.setState(-1,'games/queen/pain.png');
		this.filp = false;
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
		else if (rnd <= 60)
		{
			if (this.speedX + this.speedY > 5 && this.targetRange < 200)
			{
				this.speedX = this.speedX * Math.random();
				this.speedY = this.speedY * Math.random();
				this.accelerationX = this.accelerationX * Math.random();
				this.accelerationY = this.accelerationY * Math.random();				
			}
		}

		rnd = getRandomInt(0,125);
		if (this.y < (myGameArea.canvas.height * 0.5))
		{
			if (rnd<=5)
			{
				rnd = Math.floor(Math.random() * Math.abs(this.targetRange) / 2 + 1);  
				if (rnd < _difficult / 20 + 20 && this.state == 0)
				{
					this.setState(1,'games/queen/attack.png');
					this.frameLength = 6;
					this.targetRange = this.targetRange + (Math.random()*2000);
					this.speedX = this.speedX * Math.random();
					this.speedY = this.speedY * Math.random();
					this.accelerationX = this.accelerationX * Math.random();
					this.accelerationY = this.accelerationY * Math.random();
				}
			}
			else if (rnd<=10)
			{
				rnd = Math.floor(Math.random() * Math.abs(this.targetRange) / 2 + 1);  
				if (rnd < _difficult / 20 + 20 && this.state == 0)
				{
					this.setState(4,'games/queen/attack.png');
					this.frameLength = 6;
					this.targetRange = this.targetRange + (Math.random()*2000);
					this.speedX = this.speedX * Math.random();
					this.speedY = this.speedY * Math.random();
					this.accelerationX = this.accelerationX * Math.random();
					this.accelerationY = this.accelerationY * Math.random();
				}
			}
		} else {
			this.accelerationY = this.accelerationY - 0.01;
		}

		switch (this.state) {
			case 0:	
			if (this.accelerationX>0.5) {
				this.image.src = 'games/queen/idleL.png';
				this.filp = true;
			} 
			else if (this.accelerationX<-0.5) {
				this.image.src = 'games/queen/idleL.png';
				this.filp = false;
			}
			else 
			{
				this.image.src = 'games/queen/idle.png';
				this.filp = false;			
			}
			break;


			case 1:
			if (this.timer >= 15)
			{ 
				this.setState(2,'games/queen/attack1.png');

			}
			break;

			case 2:
			if (this.timer >= 15)
			{ 
				playsound('games/afrit/afritatk.mp3');
				this.setState(3,'games/queen/attack1.png');
				for (var i = 0; i < (Math.floor(myGameArea.canvas.height/50)+1); i++) 
				{
					monsterball_list.push(new fatsoball(26, 27, "games/fatso/ball.png", this.x, this.y+4,'image'));
					lastCreatedComponent.height = 16;
					lastCreatedComponent.width = 16;
					lastCreatedComponent.speed = getRandomInt(6,12);
					lastCreatedComponent.angle = this.getAngle(myGamePiece) + ((Math.random() - 0.5) * 2);
					lastCreatedComponent.state = 1;
					lastCreatedComponent.damage = 5;
					lastCreatedComponent.dice = 8;	
				}
			}
			break;

			case 4:
			if (this.timer >= 30)
			{ 
				playsound('games/queen/octaat1.mp3',SOUND_CHANNEL_WARNING);
				this.setState(5,'games/queen/attack1.png');
			}
			break;

			case 5:
			if (this.timer >= 15)
			{ 
				this.setState(6,'games/queen/attack.png');
				monsterball_list.push(new queenball(64, 64, "games/queen/queenball.png", this.x, this.y+4,'image'));
				lastCreatedComponent.height = 16;
				lastCreatedComponent.width = 16;
				lastCreatedComponent.speed = 6;
				lastCreatedComponent.angle = this.getAngle(myGamePiece) + ((Math.random() - 0.5) * 2);
				lastCreatedComponent.state = 1;
				lastCreatedComponent.damage = 20;
				lastCreatedComponent.dice = 4;	
			}
			break;		

			case 3:
			if (this.timer >= 10)
			{ 
				this.setState(0,'games/queen/idle.png')  
			}
			break;

			case 6:
			if (this.timer >= 10)
			{ 
				this.setState(0,'games/queen/idle.png')  
			}
			break;

			case -1:
			if (this.timer == 8)
			{
				this.setState(0,'games/queen/idle.png')   
			}
			break;

			default:
			// statements_def
			break;
		}
	}
}


var fatso = function()
{
	monsters.apply(this,arguments);
	this.deathSound = "games/fatso/dsmandth.mp3";
	this.friction = 0.825;
	this.health = 600;
	this.maxhealth = 600;
	this.mass = 80;
	this.frameLength = 7;
	this.painChance = 40;
	this.powerLevel = 250;
	this.explode = function()
	{
		this.explode0(135,106,"games/fatso/death.png",5,7,true);
		deathDrop(125,this.x-16,this.y);
		deathDrop(125,this.x+16,this.y);
	}
	this.pain = function()
	{
		this.playsound("games/fatso/dsmnpain.mp3");
		this.setState(-1,'games/fatso/pain.png');
		this.filp = false;
	}
	this.monster_update = function()
	{
		this.timer = this.timer + 1;
		rnd = getRandomInt(1,150);
		if (rnd <= 20)
		{
			this.targetRange = myGamePiece.x - this.x;
			this.accelerationX = this.accelerationX + (Math.random() * this.targetRange / 20000);
			this.SpeedX = this.SpeedX + (Math.random() * this.targetRange / 2000);						
		} 
		else if (rnd <= 22)
		{
			this.accelerationY = this.accelerationY + ((Math.random() - 0.5) * 0.5);
			this.accelerationX = this.accelerationX + ((Math.random() - 0.5) * 0.5);
		}
		else if (rnd <= 30)
		{
			range = (myGameArea.canvas.height / 4) - this.y;
			this.accelerationY = this.accelerationY + (Math.random() * range / 4000);
			this.speedY = this.speedY + (Math.random() * range / 300);
		}
		else if (rnd <= 35)
		{
			if (this.boundCheckImmunityTime < 0 && this.targetRange < 250)
			{
				this.speedX = this.speedX * 0.5;
				this.speedY = this.speedY * 0.5;
				this.accelerationX = this.accelerationX * 0.5;
				this.accelerationY = this.accelerationY * 0.5;				
			}
		}

		rnd = getRandomInt(0,100);
		if (this.y < (myGameArea.canvas.height * 0.5))
		{
			if (rnd<=3)
			{
				rnd = Math.floor(Math.random() * Math.abs(this.targetRange) / 3 + 1);  
				if (rnd < _difficult / 20 + 5 && this.state == 0)
				{
					this.setState(1,'games/fatso/attack.png')
					this.playsound('games/fatso/dsmanatk.mp3')
					this.frameLength = 6;
					this.targetRange = this.targetRange + (Math.random()*2000);
					this.speedX = this.speedX * Math.random() * Math.random();
					this.speedY = this.speedY * Math.random() * Math.random();
					this.accelerationX = this.accelerationX * Math.random() * Math.random();
					this.accelerationY = this.accelerationY * Math.random() * Math.random();
				}
			}
		}
		else {
			this.accelerationY = this.accelerationY - 0.01;
		}

		switch (this.state) {
			case 0:	
			if (this.accelerationX>0.5) {
				this.image.src = 'games/fatso/idleL.png';
				this.filp = true;
			} 
			else if (this.accelerationX<-0.5) {
				this.image.src = 'games/fatso/idleL.png';
				this.filp = false;
			} else {
				this.image.src = 'games/fatso/idle.png';
				this.filp = false;
			}
			break;


			case 1:
			if (this.timer >= 35)
			{ 
				this.setState(2,'games/fatso/attack3.png');
				playsound('games/dsfirsht.mp3');
				for (var z = 0; z < 3; z++) {
					monsterball_list.push(new fatsoball(29, 27, "games/fatso/ball.png", this.x - 36, this.y,'image'));
					lastCreatedComponent.height = 24;
					lastCreatedComponent.width = 24;
					lastCreatedComponent.speed = getRandomInt(3,13);
					lastCreatedComponent.angle = -3.14 + ((Math.random()-0.5)*2.5);
					lastCreatedComponent.state = 1;
					lastCreatedComponent.damage = 5;
				}
				for (var z = 0; z < 3; z++) {
					monsterball_list.push(new fatsoball(29, 27, "games/fatso/ball.png", this.x + 36, this.y,'image'));
					lastCreatedComponent.height = 24;
					lastCreatedComponent.width = 24;
					lastCreatedComponent.speed = getRandomInt(3,13);
					lastCreatedComponent.angle = -3.14 + ((Math.random()-0.5)*2.5);
					lastCreatedComponent.state = 1;
					lastCreatedComponent.damage = 5;
				}
			}
			break;

			case 2:
			case 3:
			case 4:
			case 5:	
			case 6:
			if (this.timer >= 15)
			{
				if (this.state % 2 == 0)
				{
					this.setState(this.state + 1,'games/fatso/attack2.png');
				} else {
					this.setState(this.state + 1,'games/fatso/attack3.png');
					playsound('games/dsfirsht.mp3');
					for (var z = 0; z < 3; z++) {
						monsterball_list.push(new fatsoball(29, 27, "games/fatso/ball.png", this.x - 36, this.y,'image'));
						lastCreatedComponent.height = 24;
						lastCreatedComponent.width = 24;
						lastCreatedComponent.speed = getRandomInt(3,13);
						lastCreatedComponent.angle = this.getAngle(myGamePiece) + ((Math.random()-0.5)*2.5);
						lastCreatedComponent.state = 1;
						lastCreatedComponent.damage = 5;
					}
					for (var z = 0; z < 3; z++) {
						monsterball_list.push(new fatsoball(29, 27, "games/fatso/ball.png", this.x + 36, this.y,'image'));
						lastCreatedComponent.height = 24;
						lastCreatedComponent.width = 24;
						lastCreatedComponent.speed = getRandomInt(3,13);
						lastCreatedComponent.angle = this.getAngle(myGamePiece) + ((Math.random()-0.5)*2.5);
						lastCreatedComponent.state = 1;
						lastCreatedComponent.damage = 5;
					}
				}

			}
			break;

			case 7:	
			if (this.timer >= 10)
			{ 
				this.setState(0,'games/fatso/idle.png');
			}
			break;

			case -1:
			if (this.timer == 8)
			{
				this.setState(0,'games/fatso/idle.png')   
			}
			break;

			default:
			// statements_def
			break;
		}
	}
}

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


var painSpawner2 = function()
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
				monsters_list.push(new lostsoul2(44, 52, "games/soul2/idle.png", this.x, this.y,'image'));
				_powerLevel += lastCreatedMonster.powerLevel;
				lastCreatedComponent.speedX = (Math.random() - 0.5) * 40;
				lastCreatedComponent.speedY = (Math.random() - 0.5) * 40;			
				playsound('games/soul2/SKL2ATK.mp3');
			}
		}
	}
}


var painElemental = function() {
	monsters.apply(this,arguments);
	this.friction = 0.8;
	this.health = 400;
	this.maxhealth = 400;
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
		this.playsound("games/pain/dspepain.mp3");
		this.setState(-1,'games/pain/pain.png')    
		this.filp = false;
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
				this.image.src = 'games/pain/idleL.png';
				this.filp = true;
			} 
			else if (this.accelerationX<-0.5) {
				this.image.src = 'games/pain/idleL.png';
				this.filp = false;
			}
			else {
				this.image.src = 'games/pain/idle.png';
				this.filp = false;
			}
			break;


			case 1:
			if (this.timer == 16)
			{
				this.setState(2,'games/pain/attack2.png');
				monsters_list.push(new lostsoul(44, 51, "games/soul/idle.png", this.x, this.y,'image'));
				//monsters_list.push(new lostsoul2(44, 52, "games/soul2/idle.png", this.x, this.y,'image'));
				_powerLevel += lastCreatedMonster.powerLevel;
				this.playsound('games/soul/dssklatk.mp3');
				lastCreatedComponent.setState(2)
				lastCreatedComponent.chargeAt(myGamePiece,getRandomInt(12,20),Math.random());   
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


var painElemental2 = function() {
	monsters.apply(this,arguments);
	this.friction = 0.8;
	this.health = 400;
	this.maxhealth = 400;
	this.mass = 40;
	this.painChance = 35;
	this.frameLength = 8;
	this.powerLevel = 150;
	this.explode = function()
	{	
		effect_list.push(new painSpawner2(1, 1, 'games/null.png', this.x, this.y,'image'));
		playsound("games/pain/dspedth.mp3");
		this.explode0(102,86,"games/pain2/death.png",6,6,true);
		deathDrop(150,this.x,this.y);
	}
	this.pain = function()
	{
		this.playsound("games/pain/dspepain.mp3");
		this.setState(-1,'games/pain2/pain.png')    
		this.filp = false;
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
				this.setState(1,'games/pain2/attack1.png')
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
				this.image.src = 'games/pain2/idleL.png';
				this.filp = true;
			} 
			else if (this.accelerationX<-0.5) {
				this.image.src = 'games/pain2/idleL.png';
				this.filp = false;
			}
			else {
				this.image.src = 'games/pain2/idle.png';
				this.filp = false;
			}
			break;


			case 1:
			if (this.timer == 16)
			{
				this.setState(2,'games/pain2/attack2.png');
				monsters_list.push(new lostsoul2(44, 52, "games/soul2/idle.png", this.x, this.y,'image'));
				//monsters_list.push(new lostsoul2(44, 52, "games/soul2/idle.png", this.x, this.y,'image'));
				_powerLevel += lastCreatedMonster.powerLevel;
				this.playsound('games/soul2/SKL2ATK.mp3');
				lastCreatedComponent.setState(2)
				lastCreatedComponent.chargeAt(myGamePiece,getRandomInt(11,20),Math.random());   
				lastCreatedComponent.timer = getRandomInt(0,25)
				lastCreatedComponent.friction = getRandomFloat(0.95,0.99);
				lastCreatedComponent.isCharging = true;
			}
			break;

			case 2:
			if (this.timer == 6)
			{
				this.setState(0,'games/pain2/idle.png');               
			}
			break;

			case -1:
			if (this.timer == 6)
			{
				this.setState(0,'games/pain2/idle.png')   
			}
			break;

			default:
			// statements_def
			break;
		}
	}
}
painElemental2.prototype = monsters.prototype;
painElemental2.prototype.constructor = painElemental2;

var cardinal = function()
{
	monsters.apply(this,arguments);
	this.friction = 0.9;
	this.health = 4000;
	this.maxhealth = 4000;
	this.mass = 125;
	this.painChance = 7;
	this.frameLength = 6;
	this.isBoss = true
	this.attackRemain = 0;
	this.powerLevel = 1000;
	this.explode = function()
	{
		if (!this.isBoss)
		{
			deathDrop(500,this.x-32,this.y);
			deathDrop(500,this.x+32,this.y);
			deathDrop(500,this.x-64,this.y);
			deathDrop(500,this.x+64,this.y);
		}
		this.playsound('games/card/dscybdth.mp3');
		this.explode0(140,140,"games/card/death.png",8,8,true);
	}
	this.pain = function()
	{
		this.playsound("games/head/dsdmpain.mp3");
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
					this.attackRemain = 3;
					//playsound('games/card/dscybsit.mp3')
					this.targetRange = this.targetRange + (Math.random()*1000);
					if (rnd <= 5)
					{
						this.speedX = this.speedX * Math.random();
						this.speedY = this.speedY * Math.random();
						this.accelerationX = this.accelerationX * Math.random();
						this.accelerationY = this.accelerationY * Math.random();
					}
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
			else {
				this.image.src = 'games/card/idle.png';
			}
			break;


			case 1:
			if (this.timer >= 15)
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
			if (this.timer >= 15)
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

var terminator = function(){
	monsters.apply(this,arguments);
	this.friction = 0.9;
	this.health = 6000;
	this.maxhealth = 6000;
	this.mass = 200;
	this.painChance = 4;
	this.frameLength = 6;
	this.powerLevel = 1500;
	this.isBoss = true;
	this.attackRemain = 0;
	this.explode = function()
	{
		if (!this.isBoss)
		{
			deathDrop(500,this.x-32,this.y);
			deathDrop(500,this.x+32,this.y);
			deathDrop(500,this.x-64,this.y);
			deathDrop(500,this.x+64,this.y);
		}
		this.playsound('games/term/TDEATH.mp3');
		this.explode0(83,81,"games/term/death83x81.png",8,6,true);
	}
	this.pain = function()
	{
		this.playsound("games/term/TPAIN1.mp3");
		this.setState(-1,'games/term/pain.png') 
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



		if (this.y < (myGameArea.canvas.height / 2))
		{
			rnd = getRandomInt(0,100);
			if (rnd<=4)
			{
				rnd = Math.floor(Math.random() * Math.abs(this.targetRange) / 3 + 1);  
				if (rnd < 15 && this.state == 0)
				{
					this.setState(1,'games/term/attack.png');
					playsound('games/term/DSBFG.mp3');
					this.targetRange = this.targetRange + (Math.random()*1000);
					this.speedX = this.speedX * Math.random();
					this.speedY = this.speedY * Math.random();
					this.accelerationX = this.accelerationX * Math.random();
					this.accelerationY = this.accelerationY * Math.random();
				}
			} else if (rnd<=10)
			{
				rnd = Math.floor(Math.random() * Math.abs(this.targetRange) + 1);  
				if (rnd < 10 && this.state == 0)
				{
					this.attackRemain = 10;
					this.setState(3,'games/term/attack4.png');
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
				this.image.src = 'games/term/idleR.png';
			} 
			else if (this.accelerationX<-0.5) {
				this.image.src = 'games/term/idleL.png';
			} else {
				this.image.src = 'games/term/idle.png';
			}
			break;


			case 1:
			if (this.timer >= 30)
			{ 
				this.setState(2,'games/term/attack2.png');
				monsterball_list.push(new devBall(45, 45, "games/term/devball.png", this.x - 10, this.y,'image')); 
				lastCreatedComponent.width = 40;    
				lastCreatedComponent.height = 40;  
				lastCreatedComponent.speed = 6;
				lastCreatedComponent.angle = -3.14;
			}
			break;

			case 2:
			if (this.timer >= 30)
			{
				this.setState(0,'games/term/idle.png')   			
			}
			break;

			case -1:
			if (this.timer == 8)
			{
				this.setState(0,'games/term/idle.png')   
			}
			break;

			case 3:
			if (this.timer == 5)
			{
				playsound('games/term/bfg_fire.mp3');
				this.setState(4,'games/term/attack5.png');
				monsterball_list.push(new laser2(64, 64, "games/term/laser.png", this.x + 16, this.y,'image'));
				lastCreatedComponent.width = 8;    
				lastCreatedComponent.height = 64;  
				lastCreatedComponent.damage = 10;		
				lastCreatedComponent.speed = 45;
				lastCreatedComponent.state = 1;
				lastCreatedComponent.angle = -3.14 + ((Math.random() - 0.5) * 0.15);
			}

			case 4:
			if (this.timer >= 5) 
			{
				if (this.attackRemain > 0)
				{
					this.attackRemain -= 1;
					this.setState(3,'games/term/attack5.png');
				}
				else {
					this.setState(0,'games/term/idle.png') 
				}  
			}

			default:
			// statements_def
			break;
		}
	}
}

var hitler2 = function(){
	monsters.apply(this,arguments);
	this.friction = 0.8;
	this.health = 100;
	this.maxhealth = 100;
	this.mass = 10;
	this.painChance = 0;
	this.frameLength = 6;
	this.powerLevel = 0;
	this.isBoss = true;
	this.attackRemain = 0;
	this.explode = function()
	{
		this.playsound('games/hitler/DSHTLD1.mp3');
		this.explode0(70,57,"games/hitler/death2.png",16,8,false);
	}
	this.monster_update = function()
	{
		this.speedY = 5;
		this.targetRange = (myGameArea.canvas.width / 2) - this.x;
		this.speedX = this.speedX + this.targetRange / 50;
		if (this.y > myGameArea.canvas.height/2 + 64)
		{
			this.explode();
			this.isDead = true;
		}
	}
}


var hitlerspawner = function()
{
	specialEffect.apply(this,arguments);
	this.timer = 23;
	this.effect_update = function()
	{
		if (this.timer > 0)
		{
			this.timer = this.timer - 1;                
		}
		if (this.timer == 1)
		{
			monsters_list.push(new hitler2(44, 57, "games/hitler/fall.png", this.x, this.y,'image'));
			_powerLevel += lastCreatedMonster.powerLevel;
			lastCreatedComponent.speedX = 0;
			lastCreatedComponent.speedY = 0;			
		}
	}
}


var hitler = function(){
	monsters.apply(this,arguments);
	this.friction = 0.9;
	this.health = 7500;
	this.maxhealth = 7500;
	this.mass = 25;
	this.painChance = 1;
	this.frameLength = 6;
	this.powerLevel = 3000;
	this.isBoss = true;
	this.attackRemain = 0;
	this.explode = function()
	{
		this.playsound('games/hitler/DSHTLD1.mp3');
		effect_list.push(new hitlerspawner(1, 1, 'games/null.png', this.x, this.y,'image'));
		this.explode0(62,63,"games/hitler/death.png",8,3,false);
	}
	this.pain = function()
	{
		this.setState(-1,'games/hitler/idle.png') 
	}
	this.monster_update = function()
	{
		this.timer = this.timer + 1;
		rnd = getRandomInt(1,100);
		if (rnd <= 10)
		{
			this.targetRange = myGamePiece.x - this.x;
			this.accelerationX = this.accelerationX + (Math.random() * this.targetRange / 10000);
			this.speedX = this.speedX + (Math.random() * this.targetRange / 50);
		} 
		else if (rnd <= 12)
		{
			this.speedY = this.speedY + ((Math.random() - 0.5)*2.5);
			this.speedX = this.speedX + ((Math.random() - 0.5)*10);
		}
		else if (rnd <= 14)
		{
			this.accelerationY = this.accelerationY + ((Math.random() - 0.5));
			this.accelerationX = this.accelerationX + ((Math.random() - 0.5));
		}
		else if (rnd <= 20)
		{
			range = (myGameArea.canvas.height / 4) - this.y;
			this.accelerationY = this.accelerationY + (Math.random() * range / 6000);
			this.speedY = this.speedY + (Math.random() * range / 600);
		}
		else if (rnd <= 25)
		{
			if (this.targetRange < 100)
			{
				this.speedX = this.speedX * Math.random() * Math.random();
				this.speedY = this.speedY * Math.random();
				this.accelerationX = this.accelerationX * Math.random() * Math.random();
				this.accelerationY = this.accelerationY * Math.random();				
			}
		}



		if (this.y < (myGameArea.canvas.height / 2))
		{
			rnd = getRandomInt(0,100);
			if (rnd<=10)
			{
				rnd = Math.floor(Math.random() * Math.abs(this.targetRange) / 2 + 1);  
				if (rnd < 25 && this.state == 0)
				{
					this.attackRemain = 20;
					//this.playsound('games/hitler/DSHTLSH.mp3')
					this.setState(1,'games/hitler/idle.png');
					this.targetRange = this.targetRange + (Math.random()*20);
				}
			}
			else if (rnd<=20)
			{
				rnd = Math.floor(Math.random() * Math.abs(this.targetRange) / 2 + 1);  
				if (rnd < 25 && this.state == 0)
				{
					this.attackRemain = 2;
					this.playsound('games/hitler/DSHTLSH.mp3')
					this.setState(4,'games/hitler/idle.png');
					this.targetRange = this.targetRange + (Math.random()*20);
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
				this.image.src = 'games/hitler/idleL.png';
				this.filp = true;
			} 
			else if (this.accelerationX<-0.5) {
				this.image.src = 'games/hitler/idleL.png';
				this.filp = false;
			} else {
				this.image.src = 'games/hitler/idle.png';
				this.filp = false;
			}
			break;


			case 1:
			if (this.timer >= 20)
			{
				this.setState(2,'games/hitler/attack.png')   			
			}
			break;

			case -1:
			if (this.timer == 2)
			{
				this.setState(0,'games/hitler/idle.png')   
			}
			break;

			case 2:
			if (this.timer >= 3)
			{
				playsound('games/hitler/DSHTLF.mp3');
				monsterball_list.push(new monsterBall(64, 64, "games/player/tracer.png", this.x - 20, this.y,'image'));
				lastCreatedComponent.height = 8;
				lastCreatedComponent.width = 8;
				lastCreatedComponent.speed = getRandomInt(32,48);
				lastCreatedComponent.angle = this.getAngle(myGamePiece) + ((Math.random() - 0.5) * 0.25);
				lastCreatedComponent.state = 1;
				lastCreatedComponent.damage = 5;
				lastCreatedComponent.dice = 3;		
				monsterball_list.push(new monsterBall(64, 64, "games/player/tracer.png", this.x + 20, this.y,'image'));
				lastCreatedComponent.height = 8;
				lastCreatedComponent.width = 8;
				lastCreatedComponent.speed = getRandomInt(32,48);
				lastCreatedComponent.angle = this.getAngle(myGamePiece) + ((Math.random() - 0.5) * 0.25);
				lastCreatedComponent.state = 1;
				lastCreatedComponent.damage = 5;
				lastCreatedComponent.dice = 3;		
				this.setState(3,'games/hitler/attack2.png');
			}
			break;


			case 4:
			if (this.timer >= 30)
			{
				this.setState(5,'games/hitler/attack.png')   			
			}
			break;		

			case 5:
			if (this.timer >= 4)
			{
				this.setState(6,'games/hitler/attack2.png');
				playsound('games/player/DSRLFIRE.mp3');
				var angl = getRandomFloat(-0.25,0.25);
				monsterball_list.push(new monsterRocket(48, 48, "games/player/rocket.png", this.x - 20, this.y + 2,'image')); 
				lastCreatedComponent.width = 24;    
				lastCreatedComponent.height = 24;  
				lastCreatedComponent.speed = 16;
				lastCreatedComponent.angle = -3.14 + angl;
				this.speedX = this.speedX * Math.random();
				this.speedY = this.speedY * Math.random();
				this.accelerationX = this.accelerationX * Math.random();
				this.accelerationY = this.accelerationY * Math.random();
				angl = getRandomFloat(-0.25,0.25);
				monsterball_list.push(new monsterRocket(48, 48, "games/player/rocket.png", this.x + 20, this.y + 2,'image')); 
				lastCreatedComponent.width = 24;    
				lastCreatedComponent.height = 24;  
				lastCreatedComponent.speed = 16;
				lastCreatedComponent.angle = -3.14 + angl;
				this.speedX = this.speedX * Math.random();
				this.speedY = this.speedY * Math.random();
				this.accelerationX = this.accelerationX * Math.random();
				this.accelerationY = this.accelerationY * Math.random();
			}
			break;	

			case 6:
			if (this.timer >= 4)
			{
				if (this.attackRemain > 0)
				{
					this.attackRemain -= 1;
					this.setState(5,'games/hitler/attack.png');
				}
				else {
					this.setState(0,'games/hitler/idle.png')   
				}
			}
			break;


			case 3:
			if (this.timer >= 3)
			{
				if (this.attackRemain > 0)
				{
					this.attackRemain -= 1;
					this.setState(2,'games/hitler/attack.png');
				}
				else {
					this.setState(0,'games/hitler/idle.png')   
				}
			}
			break;

			default:
			// statements_def
			break;
		}
	}
}


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
	this.powergive = [0,0,0,0];
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
	this.explode = function()
	{
		playsound('games/dsfirxpl.mp3');
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
	this.state = 1;
	this.explode = function()
	{	
		if (this.damage <= 10)
		{
			playsound('games/dsfirxpl.mp3');
		} else {
			playsound('games/dxbarexp.mp3');
		}
		this.explode0(103, 86, "games/explode.png",6,3);
	}
}
afritBall.prototype = monsterBall.prototype;
afritBall.prototype.constructor = afritBall;

var laser2 = function()
{
	monsterBall.apply(this,arguments);
	this.explode = function()
	{
		playsound('games/dxbarexp.mp3',SOUND_CHANNEL_EXPLOSION);
		this.explode0(143,114,"games/term/devexp.PNG",3,6);
	}
	this.monsterballUpdate = function()
	{
		pixelExplosion1(1,'#ff3030',this.x,this.y,this.angle,6.28,3);
	}
}


var fatsoball = function() {
	monsterBall.apply(this,arguments);
	this.state = 1;
	this.explode = function()
	{
		playsound('games/fatso/DSBRBCM.mp3');
		this.explode0(51, 49, "games/fatso/exp.png",5,5);
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

	this.homingStrength = 0.05
	this.explode = function()
	{
		playsound('games/dxbarexp.mp3');
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

var devBall = function() {
	monsterBall.apply(this,arguments);
	this.damage = 100;
	this.dice = 4;
	this.state = 1;
	this.homingStrength = 0.001;
	this.cooldown = 0;
	this.explode = function()
	{
		playsound("games/player/DSDEVEXP.mp3");
		this.explode0(143,114,"games/term/devexp.png",4,6);
	}
	this.monsterballUpdate = function()
	{
		this.homingAt(myGamePiece,this.homingStrength);
		pixelExplosion1(1,'#ff9966',this.x,this.y,this.angle,6.28,2);
		this.cooldown -= 1;
		if (this.cooldown <= 0)
		{
			this.cooldown = 10;
			targetDist = this.getDist(myGamePiece);
			if (targetDist< (myGameArea.canvas.width * myGameArea.canvas.height / 2500))
			{
				lines_list.push(new line('#ffaaaa',this.x,this.y,myGamePiece.x,myGamePiece.y,4,10));
				if (cvar_difficulty > 2)
				{
					this.harm(myGamePiece,4);
				} else 
				{
					this.harm(myGamePiece,2);			
				}
				pixelExplosion1(3,'#ffaaaa',myGamePiece.x,myGamePiece.y,this.angle,6.28,6);
			}
		}
		pixelExplosion1(1,'#ffaaaa',this.x,this.y,this.angle,6.28,5);
	}
}

var queenball = function() {
	monsterBall.apply(this,arguments);
	this.state = 1;
	this.friction = 0.95;
	this.homingStrength = 0.25;
	this.explode = function()
	{
		playsound("games/player/DSDEVEXP.mp3");
		this.explode0(143,114,"games/player/bfgx2.png",6,6);
	}
	this.monsterballUpdate = function()
	{
		this.homingAt(myGamePiece,this.homingStrength);
		if (this.homingStrength>0)
		{
			this.homingStrength -= 0.001;
			pixelExplosion1(1,'#99ff22',this.x,this.y,this.angle,6.28,2);
		}
	}
}

var voreBall = function() {
	monsterBall.apply(this,arguments);
	this.damage = 10;
	this.dice = 8;
	this.state = 1;
	this.homingPhaseLeft = 3;
	this.cooldown = 0;
	this.homingStrength = 0.01;
	this.explode = function()
	{
		this.explode0(43,38,"games/inferno/voreexp.png",3,5);
		playsound('games/dxbarexp.mp3');
	}
	this.monsterballUpdate = function()
	{
		this.homingAt(myGamePiece,this.homingStrength);
		this.cooldown -= 1;
		if (this.cooldown <= 0 && this.homingPhaseLeft > 0)
		{
			this.homingPhaseLeft -= 1;
			this.cooldown = 50;
			this.homingStrength = 0.25;
		}
		if (this.homingStrength>0)
		{
			this.speed = 5;
			this.homingStrength -= 0.01;
		} else 
		{
			this.speed = 10;
			pixelExplosion1(1,'#ee33dd',this.x,this.y,this.angle,6.28,2);
		}

	}
}

var monsterRocket = function() {
	monsterBall.apply(this,arguments);
	this.damage = 20;
	if (cvar_difficulty > 2)
	{
		this.dice = 8;
	} else {
		this.dice = 4;
	}

	this.state = 1;
	this.friction = 0.95;

	this.homingStrength = getRandomFloat(0.01,0.03);
	this.explode = function()
	{
		playsound('games/dxbarexp.mp3');
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
	if(mouseClicked == true)
	{
		if (_gameState == 0)
		{
			switch (_currentMenu) {
				case M_MAINMENU:
				for (var i = menus_list0.length - 1; i >= 0; i--) {
					if (menus_list0[i].crashWith(_mouseObject))
					{
						selectMenu(menus_list0[i].state);
					}
				}
				break;
				case M_OPTION:
				for (var i = 0; i < menus_list.length; i++) {
					if (menus_list[i].textCrashWith(_mouseObject))
					{
						selectMenu(i);
					}
				}
				break;
				case M_README:
				case M_RANK:
				selectMenu(0);
				break;
			}
			mouseClicked = false;
		} else if (_gameState > 0) {
			// if (mouseY > myGameArea.canvas.height / 2)
			// {
				// 	moveX = _mouseObject.x;
				// 	moveY = _mouseObject.y;
				// 	mouseMove = 100;
				// }
			}
			mouseClicked = false;
		}

		if(mouseRightClicked == true)
		{
			if (_gameState > 0)
			{

			}
			mouseRightClicked = false;
		}

		if (_gameState > 0)
			//GameLogic
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
						if (myGamePiece.hasPower[0] && myGamePiece.currentWeapon<6 && monsters_list[j].isBoss == false)
						{
							missiles_list[i].damage = missiles_list[i].damage * 4;
						}
						if (missiles_list[i].state == 1 && monsters_list[j].isBoss)
						{
							missiles_list[i].damage = Math.floor(missiles_list[i].damage / 2);
						}
						missiles_list[i].harm(monsters_list[j]);

						_score += Math.floor(lastDamageTaken);
						localStorage.money = Number(localStorage.money) + Math.floor(lastDamageTaken);
						_money += Math.floor(lastDamageTaken);

						if (scouterCheck == 0 && monsters_list[j].maxhealth > 100 || myGamePiece.currentWeapon == 0)
						{
							scouterTarget = monsters_list[j];
							scouterHidden = Math.floor(Math.sqrt(lastDamageTaken) + 10);
							scouterCheck = 1;
						}

						missiles_list[i].health -= 1;
						if (missiles_list[i].health<=0)
						{
							missiles_list[i].explode();
							missiles_list[i].death();
						}
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

			if (_airdropCooldown>0)
			{
				_airdropCooldown -= 1;
				myAirdrop.text = "AirDrop: " + (100 - Math.floor(_airdropCooldown/10)) + "%";
			} else if (_airdropCooldown == 0)
			{
				myAirdrop.text = "AirdropReady" 			
			}
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

			if (myGameArea.keys && (myGameArea.keys[37] || myGameArea.keys[65])) 
			{
				myGamePiece.accelerationX = -myGamePiece.speed; 
				mouseMove = 0;
			}
			if (myGameArea.keys && (myGameArea.keys[39] || myGameArea.keys[68]))
			{
				myGamePiece.accelerationX = myGamePiece.speed; 
				mouseMove = 0;
			}
			if (myGameArea.keys && (myGameArea.keys[38] || myGameArea.keys[87])) 
			{
				myGamePiece.accelerationY= -myGamePiece.speed; 
				mouseMove = 0;
			}
			if (myGameArea.keys && (myGameArea.keys[40] || myGameArea.keys[83])) 
			{
				myGamePiece.accelerationY= myGamePiece.speed;
				mouseMove = 0;
			}

			if (myGameArea.keys && (myGameArea.keys[32]) && _airdropCooldown<=0)
			{
				var hasItem = false;
				for (var i = 0; i < _shopItem.length; i++) {
					if (_shopItem[i]>0)
					{
						hasItem = true;
						break;
					}
				}
				if (hasItem)
				{
					//console.log('--Airdrop Begin--')
					callAirdrop();
				} else {
					myMessage.text = 'No Item in shop!';
					myGamePiece.messageHidden = 50;
				}
			}

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
			myAirdrop.update();

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
				if (mouseMove > 0)
				{
					// myGamePiece.mouseMove();
					// mouseMove -= 1;
				}
				if (mouseHold == true && mouseY < Math.floor(myGameArea.canvas.height / 2))
				{
					// myGamePiece.isFiring = true;
				}
				myGamePiece.player_update();
				myGamePiece.newPos();
				myGamePiece.update();
				for (var i = 0; i < myGamePiece.powerups.length; i++) {
					if (myGamePiece.powerups[i]>0)
					{
						myGamePiece.powerups[i] -= 1;
					}
					if (myGamePiece.powerups[i] > 0 && !myGamePiece.hasPower[i])
					{
						var image;
						switch (i) {
							case 0:
							image = 'games/powerups/quad.png';
							break;
							case 1:
							image = 'games/powerups/regen.png';
							break;
							case 2:
							image = 'games/powerups/haste.png';
							break;
							case 3:
							image = 'games/powerups/envirosuit.png';
							break;
							default:
							// statements_def
							break;
						}
						var powerIndex = powerups_list.push(new component(32, 32, image, 0, 0, "image"));
						lastCreatedComponent.state = i;
						powerTimer_list.push(new component("12px", "mortis", '#22ff99', 0, 0, "text"));
						myGamePiece.hasPower[i] = true;
					} else if (myGamePiece.powerups[i] <= 0 && myGamePiece.hasPower[i])
					{
						myGamePiece.hasPower[i] = false;
						for (var j = powerups_list.length - 1; j >= 0; j--) {
							if (powerups_list[j].state == i)
							{
								delete powerups_list[j];
								powerups_list.splice(j, 1);
								delete powerTimer_list[j];
								powerTimer_list.splice(j, 1);
							}
						}
					}
				}
				var offset = 64;
				for (var i = powerups_list.length - 1; i >= 0; i--) {
					offset += 32;
					powerups_list[i].x = myGamePiece.x;
					powerups_list[i].y = myGamePiece.y + offset;
					powerups_list[i].update();

					powerTimer_list[i].x = myGamePiece.x + 32;
					powerTimer_list[i].y = myGamePiece.y + offset;		
					powerTimer_list[i].text = Math.floor(myGamePiece.powerups[powerups_list[i].state] / 60);
					powerTimer_list[i].update();
				}


				if (dropship)
				{
					dropship.newPos();
					dropship.update();
					dropship.timer -= 1;
					if (dropship.timer <= 0)
					{
						dropship.timer = dropship.spawnInterval;

						for (var i = dropship.nextitem; i < _shopItem.length; i++) {
							if (Number(_shopItem[i]) > 0)
							{
								_shopItem[i] = Number(_shopItem[i]) - 1;
								var shop = new Array();
								shop = _shopItem;
								localStorage.shop = shop;
								//localStorage.shop[_shopItemIndex[i]] = Number(localStorage.shop[_shopItemIndex[i]]) - 1;
								//console.log(_shopItem);
								//console.log('DROPSHIP.ITEM - '+ i);
								spawnItem(dropship.x,dropship.y,i);

								dropship.nextitem = i + 1;		
								break;
							}
						}
						if (dropship.boundCheck)
						{
							delete dropship;
						}
					};
				}
				_mouseObject.update();
			}

			//--GameFlow--
			if (everyinterval(10)) {
				if (myGamePiece.weaponAvailable[6] && _difficult<95)
				{
					_weaponTimeBonus += 1;
				}
				_difficult = Math.floor(myGameArea.frameNo / _gameSpeedMod) + 10 + Math.floor(_weaponTimeBonus / 10);
				spawnMonster();
				_airdropCooldown -= 1;
			}

			for (i = 0; i < missiles_list.length; i += 1) {
				missiles_list[i].x += missiles_list[i].speed * Math.sin(missiles_list[i].angle);
				missiles_list[i].y -= missiles_list[i].speed * Math.cos(missiles_list[i].angle);
				missiles_list[i].update();
				if (missiles_list[i].boundCheck())
				{
					missiles_list[i].death();
					delete missiles_list[i];
					missiles_list.splice(i, 1);
				}
			}

			for (i = monsters_list.length - 1; i >= 0; i -= 1) {
				monsters_list[i].newPos();
				monsters_list[i].update();
				monsters_list[i].monster_update();   
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
						monsters_list[i].chargeHit(myGamePiece);
					}
				} else {
					monsters_list[i].boundpush(); 
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

			//--MenuInput--
			if(_cursorCooldown > -15) {_cursorCooldown -= 1;}

			if (_currentMenu == M_MAINMENU || _currentMenu == M_OPTION || _currentMenu == M_MAP || _currentMenu == M_UPGRADE || _currentMenu == M_SHOP)
			{
				if (myGameArea.keys && (myGameArea.keys[38] || myGameArea.keys[87])) 
				{
					if (_cursorCooldown<0)
					{
						_cursorCooldown = (6 - _cursorCooldown)	
						_selectedMenu -= 1;		
						playsound('games/dspstop.mp3');

						if (_currentMenu == M_MAP)
						{
							if (_selectLevel<_maxLevel)
							{
								_selectLevel += 1;
							} else {
								_selectLevel = -_menuItemMax - 1;
							}				
							updateMapName();	
							if (_selectLevel<0)
							{
								_selectedMenu = -_selectLevel - 1;
							}
						} else if (_currentMenu == M_UPGRADE)
						{
							updateUpgradeMenu();
						} else if (_currentMenu == M_SHOP)
						{
							updateShopMenu();
						}

						if (_currentMenu != M_MAP || _selectLevel<0)
						{
							if (_selectedMenu<0)
							{
								_selectedMenu = _menuItemMax
							}
							_cursorOffset = _selectedMenu * _skullStep;	
						}
						//console.log('selected_level  ' + _selectLevel);
						//console.log('selected_menu   ' + _selectedMenu);
					}
				}
				else if (myGameArea.keys && (myGameArea.keys[40] || myGameArea.keys[83])) 
				{
					if (_cursorCooldown<0)
					{
						_cursorCooldown = (6 - _cursorCooldown)			
						_selectedMenu += 1;
						playsound('games/dspstop.mp3');

						if (_currentMenu == M_MAP)
						{
							if (_selectLevel> -_menuItemMax - 1)
							{
								_selectLevel -= 1;	
							} else {
								_selectLevel = _maxLevel;
							}					
							updateMapName();
							if (_selectLevel<0)
							{
								_selectedMenu = -_selectLevel - 1;
							}
						} else if (_currentMenu == M_UPGRADE)
						{
							updateUpgradeMenu();
						} else if (_currentMenu == M_SHOP)
						{
							updateShopMenu();
						}


						if (_currentMenu != M_MAP || _selectLevel<0)
						{

							if (_selectedMenu>_menuItemMax)
							{
								_selectedMenu = 0
							}
							_cursorOffset = _selectedMenu * _skullStep;	
						}
						//console.log('selected_level  ' + _selectLevel);
						//console.log('selected_menu   ' + _selectedMenu);
					}
				}
				else {
					_cursorCooldown=-15
				}
				_skull.x = myGameArea.canvas.width/2 - 100 + _cursorExtraOffsetX
				_skull.y = myGameArea.canvas.height/2 + _cursorOffset + _cursorExtraOffsetY;
			}

			if (_menuCooldown > 0) {_menuCooldown -= 1;}
			if (myGameArea.keys && (myGameArea.keys[13]))
			{
				if (_menuCooldown<=0){
					_menuCooldown = 20;
					selectMenu(_selectedMenu);
				}
			}
			else
			{
				_menuCooldown = 0;
			}

			//--MenuUpdate--
			switch (_currentMenu) {
				case M_MAINMENU:
				_logo.update();
				for (var i = menus_list0.length - 1; i >= 0; i--) {
					menus_list0[i].update();
				}
				_skull.update();
				break;
				case M_README:
				_help.update();
				break;
				case M_OPTION:
				_skull.update();
				case M_RANK:
				for (var i = menus_list.length - 1; i >= 0; i--) {
					menus_list[i].update();
				}
				break;
				case M_MAP:
				_map.update();
				_mapOverlay.update();
				if (_selectLevel>=0 && _selectLevel<=4)
				{
					_miniature.x = interface_list[_selectLevel].x;
					_miniature.y = interface_list[_selectLevel].y;
				}

				_mapName.update();
				for (var i = interface_list.length - 1; i >= 0; i--) {
					interface_list[i].update();
				}		
				for (var i = menus_list.length - 1; i >= 0; i--) {
					menus_list[i].update();
				}
				if (_selectLevel<0)
				{
					_skull.update();
				} else {
					_miniature.update();
				}
				break;
				case M_SHOP:
				case M_UPGRADE:
				_skull.update();
				for (var i = interface_list.length - 1; i >= 0; i--) {
					interface_list[i].update();
				}		
				for (var i = menus_list.length - 1; i >= 0; i--) {
					menus_list[i].update();
				}
				break;
				default:
				// statements_def
				break;
			}
		}

		for (var i = 0; i < lines_list.length; i += 1) 
		{
			lines_list[i].update();
			if (lines_list[i].life>0)
			{
				lines_list[i].life -= 1;
				if (lines_list[i].life<=0)
				{
					delete lines_list[i];
					lines_list.splice(i, 1);
				}
			}
		}

		for (var i = 0; i < pixel_list1.length; i += 1) 
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

	function selectMenu(index)
	{
		//--MenuLogic
		playsound('games/player/DSTPFIR.mp3');
		switch (_currentMenu) {
			case M_MAINMENU:
			switch (index) {
				case M_NEWGAME:
				//loadLevel(1);
				_currentMenu = M_MAP;
				createMap();
				_cursorExtraOffsetX = -64;
				_cursorExtraOffsetY = myGameArea.canvas.height * (0.24);
				_selectedMenu = 0;
				_cursorOffset = 0;
				_menuItemMax = 2;
				_maxLevel = _gameProgress;
				if (_maxLevel > 4);
				{
					_maxLevel = 4;
				}
				_selectLevel = _maxLevel;
				updateMapName();
				break;
				case M_README:
				_currentMenu = M_README;
				break;
				case M_OPTION:
				_currentMenu = M_OPTION;
				createOptions();
				_cursorExtraOffsetX = -64;
				_cursorExtraOffsetY = -8;
				_selectedMenu = 0;
				_cursorOffset = 0;
				_menuItemMax = 3;
				break;
				case M_RANK:
				_currentMenu = M_RANK;
				createHighscores();
				break;
				default:
				// statements_def
				break;
			}
			break;
			case M_README:
			case M_RANK:
			_currentMenu = M_MAINMENU;
			clearMenus();
			break;
			case M_OPTION:
			switch (index) {
				case 0:
				if (cvar_movement_style < 2)
				{
					cvar_movement_style += 1;
				} else {
					cvar_movement_style = 0
				}
				menus_list[0].text = 'Movement Style - ' + TEXT_MOVEMENT_STYLE[cvar_movement_style];

				break;
				case 1:
				if (cvar_crosshair_style < 2)
				{
					cvar_crosshair_style += 1;
				} else {
					cvar_crosshair_style = 0
				}
				menus_list[1].text = 'Crosshair Style - ' + TEXT_CROSSHAIR_STYLE[cvar_crosshair_style];

				break;
				case 2:
				if (cvar_difficulty < 4)
				{
					cvar_difficulty += 1;
				} else {
					cvar_difficulty = 0
				}
				menus_list[2].text = 'Game Difficult - ' + TEXT_DIFFICULTY[cvar_difficulty];

				break;
				case 3:
				_selectedMenu = 2;
				_cursorOffset = 64;
				_currentMenu = M_MAINMENU;
				_menuItemMax = 3;
				_cursorExtraOffsetX = 0;
				_cursorExtraOffsetY = 0;
				clearMenus();
				break;
			}
			break;
			case M_MAP:
			switch (_selectLevel) {
				case 0:
				loadLevel(1);
				break;
				case 1:
				loadLevel(2);
				break;
				case 2:
				loadLevel(3);
				break;
				case 3:
				loadLevel(4);
				break;
				case 4:
				loadLevel(5);
				break;
				case -1:
				_currentMenu = M_UPGRADE;
				clearMenus();
				createUpgradeMenu();
				_cursorExtraOffsetX = -64;
				_cursorExtraOffsetY = 0;
				_selectedMenu = 0;
				_cursorOffset = 0;
				_menuItemMax = 7;
				break;
				case -2:
				_currentMenu = M_SHOP;
				clearMenus();
				createShopMenu();
				_skullStep = 24;
				_cursorExtraOffsetX = -64;
				_cursorExtraOffsetY = -136;
				_selectedMenu = 0;
				_cursorOffset = 0;
				_menuItemMax = 13;
				break;
				case -3:
				_selectedMenu = 0;
				_selectLevel = 0;
				_cursorOffset = 0;
				_currentMenu = M_MAINMENU;
				_menuItemMax = 3;
				_cursorExtraOffsetX = 0;
				_cursorExtraOffsetY = 0;
				clearMenus();
				break;
				default:
				// statements_def
				break;
			}
			break;
			case M_UPGRADE:
			switch (index) {
				case 0:
				case 1:
				case 2:
				case 3:
				case 4:
				case 5:
				case 6:
				for (var i = 0; i < 7; i++) {
					if (index == i)
					{
						if(!_useUpgrade[i])
						{
							if (_money>=_weaponUpgradeCost[i])
							{
								_useUpgrade[i] = true;
								_money -= _weaponUpgradeCost[i];
								localStorage.money = Number(localStorage.money) - _weaponUpgradeCost[i];
								updateUpgradeMenu();
								var upgrade = new Array();
								for (var i = 0; i < _useUpgrade.length; i++) {
									if (_useUpgrade[i] == true)
										{upgrade[i] = 1}
									else
										{upgrade[i] = 0}
								}
								localStorage.upgrade = upgrade;
								//console.log(localStorage.upgrade);
							} else {
								interface_list[4].text = 'Not enough money!';
								interface_list[4].color = '#ff0000';
							}
						}
						else
						{
							_useUpgrade[i] = false;
							_money += _weaponUpgradeCost[i];	
							localStorage.money = Number(localStorage.money) + _weaponUpgradeCost[i];	
							updateUpgradeMenu();	
							var upgrade = new Array();
							for (var i = 0; i < _useUpgrade.length; i++) {
								if (_useUpgrade[i] == true)
									{upgrade[i] = 1}
								else
									{upgrade[i] = 0}
							}
							localStorage.upgrade = upgrade;	
							//console.log(localStorage.upgrade);	
						}

					}
				}
				break;			
				case 7:
				clearMenus();
				_currentMenu = M_MAP;
				createMap();
				_cursorExtraOffsetX = -64;
				_cursorExtraOffsetY = myGameArea.canvas.height * (0.24);
				_selectedMenu = 0;
				_cursorOffset = 0;
				_menuItemMax = 2;
				_selectLevel = _maxLevel;
				updateMapName();
				break;
			}
			break;
			case M_SHOP:
			switch (index) {
				case 0:
				case 1:
				case 2:
				case 3:
				case 4:
				case 5:
				case 6:
				case 7:
				case 8:
				case 9:
				case 10:
				case 11:
				case 12:
				for (var i = 0; i < 13; i++) {
					if (index == i)
					{
						if (_money>=_shopItemCost[i])
						{
							_money -= _shopItemCost[i];
							localStorage.money = Number(localStorage.money) - _shopItemCost[i];
							_shopItem[_shopItemIndex[i]] = Number(_shopItem[_shopItemIndex[i]]) + 1;
							var shop = new Array();
							shop = _shopItem;
							localStorage.shop = shop;
							updateShopMenu();

						} else {
							interface_list[1].text = 'Not enough money!';
							interface_list[1].color = '#ff0000';
						}
					}
				}
				break;			
				case 13:
				clearMenus();
				_currentMenu = M_MAP;
				_skullStep = 32;
				createMap();
				_cursorExtraOffsetX = -64;
				_cursorExtraOffsetY = myGameArea.canvas.height * (0.24);
				_selectedMenu = 0;
				_cursorOffset = 0;
				_menuItemMax = 2;
				_selectLevel = _maxLevel;
				updateMapName();
				break;
			}
			break;
		}
	}

	function clearMenus()
	{
		for (var i = menus_list.length - 1; i >= 0; i--) 
		{
			delete menus_list[i];
			menus_list.splice(i, 1);
		}
		for (var i = interface_list.length - 1; i >= 0; i--) 
		{
			delete interface_list[i];
			interface_list.splice(i, 1);
		}
		delete _map;
		delete _mapName;
		delete _mapOverlay;
		delete _miniature;
	}
	function createMainMenu()
	{
		_logo = new component(256, 192, "games/logo.png", 0, 0, "image");
		if (_gameProgress>0){
			menus_list0.push(new component(140, 20,"games/M_NGAME2.png", 0, 0, "image"));
		} else {
			menus_list0.push(new component(140, 20,"games/M_NGAME.png", 0, 0, "image"));
		}
		lastCreatedComponent.state = M_NEWGAME;
		menus_list0.push(new component(140, 20,"games/M_READ.png", 0, 0, "image"));
		lastCreatedComponent.state = M_README;
		menus_list0.push(new component(140, 20,"games/M_OPTION.png", 0, 0, "image"));
		lastCreatedComponent.state = M_OPTION;
		menus_list0.push(new component(140, 20,"games/M_RANK.png", 0, 0, "image"));
		lastCreatedComponent.state = M_RANK;
		_help = new component(360, 300,"games/help.png", 0, 0, "image");
		_skull = new component(20, 19, "games/M_SKULL.png", 0, 0, "image");
	}
	function createHighscores()
	{
		var x = myGameArea.canvas.width / 2 - 100;
		var y = myGameArea.canvas.height / 2 - 100;
		var offset = 0;

		menus_list.push(new component("16px", "DooM", '#ff0000', x - 128, y + offset, "text"));

		if (_highscoreMarker)
		{
			lastCreatedComponent.text = 'Your last score is - ' + _score + '  NEW HIGHSCORE';	
			lastCreatedComponent.color = '#ff0000';
		} else {
			lastCreatedComponent.text = 'Your last score is - ' + _score;
			lastCreatedComponent.color = '#ff9933';
		}
		offset += 48;
		menus_list.push(new component("16px", "DooM", '#ff2222', x, y + offset, "text"));
		lastCreatedComponent.text = 'Highscores:';
		offset += 40;
		for (var i = _hscore.length - 1; i >= 0; i--) {
			menus_list.push(new component("16px", "DooM", '#ffff22', x, y + offset, "text"));
			lastCreatedComponent.text = 'MAP'+(Number(i)+1) + ' - ' + _hscore[i];
			offset += 32;
		}
	}

	function createMap()
	{
		_map = new component(320, 240, "games/map.png", myGameArea.canvas.width * 0.10, myGameArea.canvas.height * 0.10, "background");
		_map.imageWidth = myGameArea.canvas.width * 0.85;
		_map.imageHeight = myGameArea.canvas.height * 0.60;
		_mapOverlay = new component(320, 240, "games/null.png", myGameArea.canvas.width * 0.10, myGameArea.canvas.height * 0.10, "background");
		_mapOverlay.imageWidth = myGameArea.canvas.width * 0.85;
		_mapOverlay.imageHeight = myGameArea.canvas.height * 0.60;

		var x = myGameArea.canvas.width / 2 - 128;
		var y = myGameArea.canvas.height * 0.75;
		var offset = 0;

		menus_list.push(new component("16px", "DooM", '#ff0000', x, y + offset, "text"));
		lastCreatedComponent.text = 'Upgrades';
		lastCreatedComponent.imageWidth = 320;
		lastCreatedComponent.imageHeight = 12;
		offset += 32;
		menus_list.push(new component("16px", "DooM", '#ff0000', x, y + offset, "text"));
		lastCreatedComponent.text = 'Shop';
		lastCreatedComponent.imageWidth = 320;
		lastCreatedComponent.imageHeight = 12;
		offset += 32;
		menus_list.push(new component("16px", "DooM", '#ff0000', x, y + offset, "text"));
		lastCreatedComponent.text = '<< Back';
		lastCreatedComponent.imageWidth = 100;
		lastCreatedComponent.imageHeight = 12;

		for (var i = 0; i < 5; i++) {
			interface_list.push(new component(28, 22, "games/null.png", 0, 0, "background"));
			lastCreatedComponent.imageWidth = 56;
			lastCreatedComponent.imageHeight = 44;
		}
		interface_list[0].x = myGameArea.canvas.width * 0.15;
		interface_list[0].y = myGameArea.canvas.height * 0.5;
		interface_list[1].x = myGameArea.canvas.width * 0.80;
		interface_list[1].y = myGameArea.canvas.height * 0.50;
		interface_list[2].x = myGameArea.canvas.width * 0.70;
		interface_list[2].y = myGameArea.canvas.height * 0.35;
		interface_list[3].x = myGameArea.canvas.width * 0.2;
		interface_list[3].y = myGameArea.canvas.height * 0.225;
		interface_list[4].x = myGameArea.canvas.width * 0.525;
		interface_list[4].y = myGameArea.canvas.height * 0.125;
		_miniature = new component(36, 56, "games/menu/player.png", myGameArea.canvas.width * 0.10, myGameArea.canvas.height * 0.10, "image");
		_mapName = new component("16px", "DooM", '#ff0000', myGameArea.canvas.width * 0.125, myGameArea.canvas.height * 0.05, "text");
		updateMapName();

		switch (_gameProgress) {
			case 0:
			_mapOverlay.image.src = "games/null.png";
			break;
			case 1:
			_mapOverlay.image.src = "games/map_overlay1.png";
			interface_list[0].image.src = "games/menu/WISPLAT.png";
			break;
			case 2:
			_mapOverlay.image.src = "games/map_overlay2.png";
			interface_list[0].image.src = "games/menu/WISPLAT.png";
			interface_list[1].image.src = "games/menu/WISPLAT.png";
			break;
			case 3:
			_mapOverlay.image.src = "games/map_overlay3.png";
			interface_list[0].image.src = "games/menu/WISPLAT.png";
			interface_list[1].image.src = "games/menu/WISPLAT.png";
			interface_list[2].image.src = "games/menu/WISPLAT.png";
			break;
			case 4:
			_mapOverlay.image.src = "games/map_overlay4.png";
			interface_list[0].image.src = "games/menu/WISPLAT.png";
			interface_list[1].image.src = "games/menu/WISPLAT.png";
			interface_list[2].image.src = "games/menu/WISPLAT.png";
			interface_list[3].image.src = "games/menu/WISPLAT.png";
			break;
			case 5:
			_mapOverlay.image.src = "games/map_overlay4.png";
			interface_list[0].image.src = "games/menu/WISPLAT.png";
			interface_list[1].image.src = "games/menu/WISPLAT.png";
			interface_list[2].image.src = "games/menu/WISPLAT.png";
			interface_list[3].image.src = "games/menu/WISPLAT.png";
			interface_list[4].image.src = "games/menu/WISPLAT.png";
			break;
			default:
			// statements_def
			break;
		}

	}

	function createUpgradeMenu()
	{
		var x = myGameArea.canvas.width / 2 - 128;
		var y = myGameArea.canvas.height / 2;
		var offset = 0;

		for (var i = 0; i < 7; i++) {
			menus_list.push(new component("16px", "DooM", '#ff0000', x, y + offset, "text"));
			lastCreatedComponent.imageWidth = 100;
			lastCreatedComponent.imageHeight = 12;
			offset += 32;
		}
		menus_list.push(new component("16px", "DooM", '#ff0000', x, y + offset, "text"));
		lastCreatedComponent.text = '<< Back';
		lastCreatedComponent.imageWidth = 100;
		lastCreatedComponent.imageHeight = 12;
		interface_list.push(new component(80, 36, "games/menu/pistol.png", 0, 0, "image"));
		lastCreatedComponent.x = myGameArea.canvas.width / 2 - 80;
		lastCreatedComponent.y = myGameArea.canvas.height / 2 - 64;
		interface_list.push(new component(80, 36, "games/menu/pistol.png", 0, 0, "image"));
		lastCreatedComponent.x = myGameArea.canvas.width / 2 + 80;
		lastCreatedComponent.y = myGameArea.canvas.height / 2 - 64;
		interface_list.push(new component("16px", "DooM", '#ffff00', x, y + offset, "text"));
		lastCreatedComponent.x = myGameArea.canvas.width / 2 - 192;
		lastCreatedComponent.y = myGameArea.canvas.height / 2 - 128;
		interface_list.push(new component("16px", "DooM", '#ffffff', x, y + offset, "text"));
		lastCreatedComponent.x = myGameArea.canvas.width / 2 - 192;
		lastCreatedComponent.y = myGameArea.canvas.height / 2 - 160;
		interface_list.push(new component("16px", "DooM", '#ff9900', x, y + offset, "text"));
		lastCreatedComponent.x = myGameArea.canvas.width / 2 - 192;
		lastCreatedComponent.y = myGameArea.canvas.height / 2 - 192;
		updateUpgradeMenu();
	}

	function updateUpgradeMenu()
	{
		interface_list[4].text = 'Your Money: ' + _money;
		interface_list[4].color = '#ff9900';
		if (_selectedMenu == 8)
		{
			return;
		}
		for (var i = 0; i < 7; i++) {
			if (_useUpgrade[i])
			{
				menus_list[i].text = 'Slot - ' + (i+1) + '   ' + _tier2WeaponName[i];
				if (_selectedMenu == i)
				{
					interface_list[0].image.src = "games/menu/" + _tier2WeaponName[i] + ".png";
					interface_list[1].image.src = "games/menu/" + _tier1WeaponName[i] + ".png";
					interface_list[2].text = _tier2WeaponName[i] + ' Reverts to ' + _tier1WeaponName[i];
					interface_list[3].text = 'Money refund: ' + _weaponUpgradeCost[i];				
				}

			} else 
			{
				menus_list[i].text = 'Slot - ' + (i+1) + '   ' + _tier1WeaponName[i];
				if (_selectedMenu == i)
				{
					interface_list[0].image.src = "games/menu/" + _tier1WeaponName[i] + ".png";
					interface_list[1].image.src = "games/menu/" + _tier2WeaponName[i] + ".png";
					interface_list[2].text = _tier1WeaponName[i] + ' Upgrades to ' + _tier2WeaponName[i];
					interface_list[3].text = 'Upgrade cost: ' + _weaponUpgradeCost[i];
				}
			}
		}
	}


	function createShopMenu()
	{
		var x = myGameArea.canvas.width / 2 - 128;
		var y = myGameArea.canvas.height / 2 - 128;
		var offset = 0;
		//shotgun
		//ssg
		//chaingun
		//rocketlauncher
		//plasma
		//bfg
		//megaarmor
		//soulsphere
		//pack
		//quad
		//regen
		//haste
		//guard

		for (var i = 0; i < _shopItemIndex.length; i++) {
			menus_list.push(new component("16px", "DooM", '#ff0000', x, y + offset, "text"));
			lastCreatedComponent.imageWidth = 100;
			lastCreatedComponent.imageHeight = 12;
			offset += 24;
		}
		menus_list.push(new component("16px", "DooM", '#ff0000', x, y + offset, "text"));
		lastCreatedComponent.text = '<< Back';
		lastCreatedComponent.imageWidth = 100;
		lastCreatedComponent.imageHeight = 12;
		interface_list.push(new component("16px", "DooM", '#ffff00', x, y + offset, "text"));
		lastCreatedComponent.x = myGameArea.canvas.width / 2 - 192;
		lastCreatedComponent.y = myGameArea.canvas.height / 2 - 192;
		interface_list.push(new component("16px", "DooM", '#ffffff', x, y + offset, "text"));
		lastCreatedComponent.x = myGameArea.canvas.width / 2 - 192;
		lastCreatedComponent.y = myGameArea.canvas.height / 2 - 224;
		updateShopMenu();
	}

	function updateShopMenu()
	{
		interface_list[1].text = 'Your Money: ' + _money;
		interface_list[1].color = '#ff9900';
		var shopItemName = [];
		for (var i = 0; i <= 5; i++) {
			if (!_useUpgrade[i + 1])
			{
				shopItemName[i] = _tier1WeaponName[i + 1];
			} else 
			{
				shopItemName[i] = _tier2WeaponName[i + 1];
			}
		}
		shopItemName.push('MegaArmor');
		shopItemName.push('Soulsphere');
		shopItemName.push('Backpack');
		shopItemName.push('QuadDamage');
		shopItemName.push('Regeneration');
		shopItemName.push('Haste');
		shopItemName.push('Guard');	

		if (_selectedMenu == 13)
		{
			interface_list[0].text = '';	
			return;
		}

		for (var i = 0; i < 13; i++) {
			menus_list[i].text = shopItemName[i] + ' -- X ' + _shopItem[_shopItemIndex[i]];
			if (_selectedMenu == i)
			{
				interface_list[0].text = 'Cost: ' + _shopItemCost[i];	
			}
		}

	}




	function updateMapName()
	{
		switch (_selectLevel) {
			case 0:
			_mapName.text = 'Earth City';
			break;
			case 1:
			_mapName.text = 'Starport';
			break;
			case 2:
			_mapName.text = 'UAC Shuttle';
			break;
			case 3:
			_mapName.text = 'Mars Command';
			break;
			case 4:
			_mapName.text = 'Hell Crater';
			break;
			case -1:
			_mapName.text = 'Spend your score to upgrade your weapons';
			break;
			case -2:
			_mapName.text = 'Back to main menu';
			break;
			default:
			// statements_def
			break;
		}


	}

	function createOptions()
	{
		var x = myGameArea.canvas.width / 2 - 128;
		var y = myGameArea.canvas.height / 2;
		var offset = 0;

		menus_list.push(new component("16px", "DooM", '#ff0000', x, y + offset, "text"));
		lastCreatedComponent.text = 'Movement Style - ' + TEXT_MOVEMENT_STYLE[cvar_movement_style];
		lastCreatedComponent.imageWidth = 320;
		lastCreatedComponent.imageHeight = 12;
		offset += 32;
		menus_list.push(new component("16px", "DooM", '#ff0000', x, y + offset, "text"));
		lastCreatedComponent.text = 'Crosshair Style - ' + TEXT_CROSSHAIR_STYLE[cvar_crosshair_style];
		lastCreatedComponent.imageWidth = 320;
		lastCreatedComponent.imageHeight = 12;
		offset += 32;
		menus_list.push(new component("16px", "DooM", '#ff0000', x, y + offset, "text"));
		lastCreatedComponent.text = 'Game Difficult - ' + TEXT_DIFFICULTY[cvar_difficulty];;
		lastCreatedComponent.imageWidth = 100;
		lastCreatedComponent.imageHeight = 12;
		offset += 32;
		menus_list.push(new component("16px", "DooM", '#ff0000', x, y + offset, "text"));
		lastCreatedComponent.text = '<< Back';
		lastCreatedComponent.imageWidth = 100;
		lastCreatedComponent.imageHeight = 12;
	}


	function everyinterval(n) {
		if ((myGameArea.frameNo / n) % 1 == 0) {return true;}
		return false;
	}
