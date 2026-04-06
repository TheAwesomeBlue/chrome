var _____WB$wombat$assign$function_____=function(name){return (self._wb_wombat && self._wb_wombat.local_init && self._wb_wombat.local_init(name))||self[name];};if(!self.__WB_pmw){self.__WB_pmw=function(obj){this.__WB_source=obj;return this;}}{
let window = _____WB$wombat$assign$function_____("window");
let self = _____WB$wombat$assign$function_____("self");
let document = _____WB$wombat$assign$function_____("document");
let location = _____WB$wombat$assign$function_____("location");
let top = _____WB$wombat$assign$function_____("top");
let parent = _____WB$wombat$assign$function_____("parent");
let frames = _____WB$wombat$assign$function_____("frames");
let opens = _____WB$wombat$assign$function_____("opens");

/******************************************************************************
*     GAME SETTINGS
*******************************************************************************/

// Upsell Settings
var Enable_Upsell = true;
var Upsell_Url = 'https://web.archive.org/web/20120415203346/http://www.popcap.com/games/pvz/?cid=cws_pvz_CA'; // This doesn't get used if Enable_Upsell = false

// Absolute Path to Game Files
// (If left blank, it will be assumed that the game files are in the same folder as this include file.)
var Base_Path = '';
  
/******************************************************************************
*     POPCAPGAME BASE
*******************************************************************************/

var thePopCapGame = null;

function popCapGame(gameName, id, gameWidth, gameHeight)
{
    popCapGame.prototype.displayName = gameName;
    popCapGame.prototype.id = id;
    popCapGame.prototype.width = gameWidth;
    popCapGame.prototype.height = gameHeight;
    
    popCapGame.prototype.paramNames = new Array();
    popCapGame.prototype.params = new Array();	
    popCapGame.prototype.hosts = new Array();
    popCapGame.prototype.signatures = new Array();
	
    popCapGame.prototype.partnerName = '';
	popCapGame.prototype.basePath = '';
    popCapGame.prototype.upsellUrl = '';
	popCapGame.prototype.objectSetup = '';
	popCapGame.prototype.containerId = 'gamediv';
	
	popCapGame.prototype.LoadBroadcast = 'LoadBroadcast';
	popCapGame.prototype.SessionReady = 'SessionReady';
	popCapGame.prototype.GameReady = 'GameReady';
	popCapGame.prototype.ScoreBroadcast = 'ScoreBroadcast';
	popCapGame.prototype.GameBreak = 'GameBreak';
	popCapGame.prototype.ScoreSubmit = 'ScoreSubmit';
	popCapGame.prototype.GameEnd = 'GameEnd';
	popCapGame.prototype.CustomEvent = 'CustomEvent';
	
    popCapGame.prototype.levelCount = 0;
	popCapGame.prototype.gameObject = null;
    popCapGame.prototype.hide = false;
}

popCapGame.prototype.pathConcat = function(first,last)
{
	if (first == '') return last;
	if (first.search(/\/$/) == -1) return first + '/' + last;
	return first + last;
}

popCapGame.prototype.applyBasePath = function()
{
}

popCapGame.prototype.write = function()
{
}

popCapGame.prototype.getParams = function()
{
}

popCapGame.prototype.sendNotification = function(method,params)
{
}

popCapGame.prototype.receiveNotification = function(method,params)
{
	if (method == this.LoadBroadcast) { LoadBroadcast(params); }
	else if (method == this.SessionReady) { SessionReady(params); }
	else if (method == this.GameReady) { GameReady(params); }
	else if (method == this.ScoreBroadcast) { ScoreBroadcast(params); }
	else if (method == this.GameBreak) { GameBreak(params); }
	else if (method == this.ScoreSubmit) { ScoreSubmit(params); }
	else if (method == this.GameEnd) { GameEnd(params); }
	else if (method == this.CustomEvent) { CustomEvent(params); }
	else {}	
}

/*---- CALLS TO GAME ----*/

popCapGame.prototype.SessionStart = function()
{
	this.sendNotification('SessionStart','');
}

popCapGame.prototype.GameStart = function()
{
	this.sendNotification('GameStart','');
}

popCapGame.prototype.GameMenu = function()
{
	this.sendNotification('GameMenu','');
}

popCapGame.prototype.GameContinue = function()
{
	this.sendNotification('GameContinue','');
}

popCapGame.prototype.CustomReturn = function(params)
{
	this.sendNotification('CustomReturn',params);
}

popCapGame.prototype.Mute = function(isMute)
{
	this.sendNotification(isMute ? 'MuteOn' : 'MuteOff','');
}

popCapGame.prototype.Pause = function(isPause)
{
	this.sendNotification(isPause ? 'PauseOn' : 'PauseOff','');
}

/*---- EVENT HANDLING ----*/

popCapGame.prototype.OnLoadBroadcast = function(params)
{
}

popCapGame.prototype.OnSessionReady = function(params)
{

	this.SessionStart();

}

popCapGame.prototype.OnGameReady = function(params)
{
	this.GameStart();
}

popCapGame.prototype.OnScoreBroadcast = function(params)
{    
}

popCapGame.prototype.OnGameBreak = function(params)
{

	this.GameContinue();

}

popCapGame.prototype.OnScoreSubmit = function(params)
{
}

popCapGame.prototype.OnGameEnd = function(params)
{

	this.GameMenu();

}

popCapGame.prototype.OnCustomEvent = function(params)
{
    if (Enable_Upsell) window.open(this.upsellUrl);
    this.CustomReturn(params);
}

/******************************************************************************
*     FLASH : POPCAPGAME
*******************************************************************************/

popCapFlashGame.prototype = popCapGame.prototype;
popCapFlashGame.prototype.constructor = popCapFlashGame;
popCapFlashGame.prototype.baseClass = popCapGame.prototype.constructor;

function popCapFlashGame(gameName, id, gameWidth, gameHeight, gameSwf)
{
    popCapGame(gameName, id, gameWidth, gameHeight);
    
    popCapFlashGame.prototype.gameSwf = gameSwf;
}

popCapFlashGame.prototype.applyBasePath = function()
{	
	this.basePath = this.pathConcat(this.basePath, '');
	this.gameSwf = this.pathConcat(this.basePath, this.gameSwf);
}

popCapFlashGame.prototype.write = function()
{

	this.applyBasePath();

    this.objectSetup = '<!--[if !IE]><!-->\r\n';
    this.objectSetup += '<div id="' + this.containerId + '"';
    if (this.hide) this.objectSetup += ' style="visibility: hidden;"';
	this.objectSetup += '>\r\n';
    this.objectSetup += '<embed name="'+this.id+'" id="'+this.id+'" src="'+this.gameSwf+'" ';
    this.objectSetup += 'width="'+this.width+'" ';
    this.objectSetup += 'height="'+this.height+'" ';
    if (this.basePath != '') this.objectSetup += 'base="'+this.basePath+'" ';
    this.objectSetup += 'play="true" ';
    this.objectSetup += 'loop="false" ';
    this.objectSetup += 'menu="false" ';
    this.objectSetup += 'quality="high" ';
    this.objectSetup += 'bgcolor="#000000" ';
    this.objectSetup += 'swLiveConnect="true" ';
    this.objectSetup += 'FlashVars="'+this.getParams()+'" ';
    this.objectSetup += 'pluginspage="http://www.macromedia.com/shockwave/download/index.cgi?P1_Prod_Version=ShockwaveFlash"></embed>\r\n';
    this.objectSetup += '</div>\r\n';
    this.objectSetup += '<!--<![endif]-->\r\n';
    this.objectSetup += '<!--[if IE]>\r\n';
    this.objectSetup += '<div id="' + this.containerId + '"';
    if (this.hide) this.objectSetup += ' style="visibility: hidden;"';
	this.objectSetup += '>\r\n';
    this.objectSetup += '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" ';
    this.objectSetup += 'codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=9,0,0,0" ';
    this.objectSetup += 'id="'+this.id+'" ';
    this.objectSetup += 'width="'+this.width+'" ';
    this.objectSetup += 'height="'+this.height+'">\r\n';
    this.objectSetup += '<param name="movie" value="'+this.gameSwf+'">\r\n';
    if (this.basePath != '') this.objectSetup += '<param name="base" value="'+this.basePath+'">\r\n';
    this.objectSetup += '<param name="loop" value="false">\r\n';
    this.objectSetup += '<param name="menu" value="false">\r\n';
    this.objectSetup += '<param name="play" value="true">\r\n';
    this.objectSetup += '<param name="quality" value="high">\r\n';
    this.objectSetup += '<param name="bgcolor" value="#000000">\r\n';
    this.objectSetup += '<param name="FlashVars" value="'+this.getParams()+'">\r\n';
    this.objectSetup += '</object>\r\n';
    this.objectSetup += '</div>\r\n';
    this.objectSetup += '<![endif]-->\r\n';
    

	document.write(this.objectSetup);
	this.gameObject = document.getElementById(this.id);
}

popCapFlashGame.prototype.getParams = function()
{    
    var tags = '';

	if (this.paramNames.length > 0)
	{
		for(var i = 0; i < this.paramNames.length-1; i++)
			tags += this.paramNames[i]+'='+this.params[i]+'&';

		tags += this.paramNames[this.paramNames.length-1]+'='+this.params[this.paramNames.length-1];
	}

    return tags;
}

// -- Registered methods in PvZ to ensure that JS is loaded.
var mSWFReady = false;

isProxyReady = function()
{
	return true;
}

setSWFIsReady = function() 
{
	mSWFReady = true;
}
// --

popCapFlashGame.prototype.SessionStart = function()
{
	this.gameObject.onSessionStart();
}

popCapFlashGame.prototype.GameStart = function()
{
	this.gameObject.onGameStart();
}

popCapFlashGame.prototype.GameContinue = function(params)
{		
	this.gameObject.onGameContinue();
}

popCapFlashGame.prototype.GameMenu = function()
{
	this.gameObject.onGameMenu();
}

popCapFlashGame.prototype.CustomReturn = function(params)
{
	var args = '';
	if (typeof(params) != 'undefined')
		args = params.toString();
		
	this.gameObject.onCustomReturn(args);
}

popCapFlashGame.prototype.Mute = function(isMute)
{
	this.gameObject.onGameMute(isMute ? 'on' : 'off'); 
}

popCapFlashGame.prototype.Pause = function(isPause)
{
	this.gameObject.onGamePause(isPause ? 'on' : 'off');
}

/******************************************************************************
*     MSN API FUNCTIONS (Registered in ActionScript 3 Games)
*******************************************************************************/

LoadBroadcast = function(params)
{
	thePopCapGame.OnLoadBroadcast(params);
}

SessionReady = function(params)
{
	thePopCapGame.OnSessionReady(params);
}

GameReady = function(params)
{
	thePopCapGame.OnGameReady(params);
}

ScoreBroadcast = function(params)
{
	thePopCapGame.OnScoreBroadcast(params);
}

GameBreak = function(params)
{
	thePopCapGame.OnGameBreak(params);
}

ScoreSubmit = function(params)
{
	thePopCapGame.OnScoreSubmit(params);
}

GameEnd = function(params)
{
	thePopCapGame.OnGameEnd(params);
}

CustomEvent = function(params)
{
	thePopCapGame.OnCustomEvent(params);
}

/******************************************************************************
*     INSTANTIATE GAME
*******************************************************************************/

thePopCapGame = new popCapFlashGame("Plants Vs. Zombies",
	'GameObject',
	'540',
	'405',
	'pvz_9_15.swf');

/******************************************************************************
*     PARTNER-SPECIFIC SETTINGS
*******************************************************************************/

thePopCapGame.partnerName = 'Google';

thePopCapGame.basePath = Base_Path;
thePopCapGame.upsellUrl = Upsell_Url;

}

/*
     FILE ARCHIVED ON 20:33:46 Apr 15, 2012 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 19:49:02 Apr 06, 2026.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  capture_cache.get: 5.657
  load_resource: 216.511
  PetaboxLoader3.resolve: 144.5
  PetaboxLoader3.datanode: 58.748
*/