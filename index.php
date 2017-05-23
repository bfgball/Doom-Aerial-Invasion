<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
	<title> Loading... </title>
	<style>
		@font-face {
			font-family: 'mortis';
			src: url('mortis.ttf');
		}
		@font-face {
			font-family: 'DooM';
			src: url('DooM.ttf');
		}
		body{
			padding: 0px;
			margin: 0px;
			background: black;
		}
	</style>
</head>
<body>
	<script>
		var js_resource = ["games/afrit/attack1.png",
		"games/afrit/attack2.png",
		"games/afrit/death.png",
		"games/afrit/fexp.png",
		"games/afrit/fireball.png",
		"games/afrit/fireball2.png",
		"games/afrit/idle.png",
		"games/afrit/idleL.png",
		"games/afrit/idleR.png",
		"games/afrit/pain.png",
		"games/card/Attack1.png",
		"games/card/Attack2.png",
		"games/card/death.png",
		"games/card/idle.png",
		"games/card/idleL.png",
		"games/card/idleR.png",
		"games/card/pain.png",
		"games/explode.png",
		"games/floor1.png",
		"games/floor2.png",
		"games/head/attack.png",
		"games/head/attack2.png",
		"games/head/ball.png",
		"games/head/ballexp.png",
		"games/head/death.png",
		"games/head/fireball.png",
		"games/head/idle.png",
		"games/head/idleL.png",
		"games/head/idleR.png",
		"games/head/pain.png",
		"games/help.png",
		"games/hud/STFDEAD0.png",
		"games/hud/STFEVL0.png",
		"games/hud/STFEVL1.png",
		"games/hud/STFEVL2.png",
		"games/hud/STFEVL3.png",
		"games/hud/STFEVL4.png",
		"games/hud/STFGOD0.png",
		"games/hud/STFKIL00.png",
		"games/hud/STFKIL01.png",
		"games/hud/STFKIL02.png",
		"games/hud/STFKIL10.png",
		"games/hud/STFKIL11.png",
		"games/hud/STFKIL12.png",
		"games/hud/STFKIL20.png",
		"games/hud/STFKIL21.png",
		"games/hud/STFKIL22.png",
		"games/hud/STFKIL30.png",
		"games/hud/STFKIL31.png",
		"games/hud/STFKIL32.png",
		"games/hud/STFKIL40.png",
		"games/hud/STFKIL41.png",
		"games/hud/STFKIL42.png",
		"games/hud/STFOUCH0.png",
		"games/hud/STFOUCH1.png",
		"games/hud/STFOUCH2.png",
		"games/hud/STFOUCH3.png",
		"games/hud/STFOUCH4.png",
		"games/hud/STFST00.png",
		"games/hud/STFST01.png",
		"games/hud/STFST02.png",
		"games/hud/STFST10.png",
		"games/hud/STFST11.png",
		"games/hud/STFST12.png",
		"games/hud/STFST20.png",
		"games/hud/STFST21.png",
		"games/hud/STFST22.png",
		"games/hud/STFST30.png",
		"games/hud/STFST31.png",
		"games/hud/STFST32.png",
		"games/hud/STFST40.png",
		"games/hud/STFST41.png",
		"games/hud/STFST42.png",
		"games/items/AMMOA0.png",
		"games/items/ARM1A0.png",
		"games/items/ARM2A0.png",
		"games/items/BPAKA0.png",
		"games/items/BROKA0.png",
		"games/items/CELPA0.png",
		"games/items/DCELL.png",
		"games/items/MEDIA0.png",
		"games/items/MEGAA0.png",
		"games/items/SBOXA0.png",
		"games/items/SOULA0.png",
		"games/logo.png",
		"games/M_NGAME.png",
		"games/M_OPTION.png",
		"games/M_RANK.png",
		"games/M_READ.png",
		"games/M_SKULL.png",
		"games/null.png",
		"games/pain/attack1.png",
		"games/pain/attack2.png",
		"games/pain/death.png",
		"games/pain/idle.png",
		"games/pain/idleL.png",
		"games/pain/idleR.png",
		"games/pain/pain.png",
		"games/player/BFG10K.png",
		"games/player/BFG9000.png",
		"games/player/bfgball.png",
		"games/player/bfgx.png",
		"games/player/bfgx0.png",
		"games/player/bfgx2.png",
		"games/player/Chaingun.png",
		"games/player/death.png",
		"games/player/fire.png",
		"games/player/fire2.png",
		"games/player/idle.png",
		"games/player/laser.png",
		"games/player/pain.png",
		"games/player/Pistol.png",
		"games/player/plasma.png",
		"games/player/PlasmaRifle.png",
		"games/player/plexp.png",
		"games/player/rocket.png",
		"games/player/RocketLauncher.png",
		"games/player/Shotgun.png",
		"games/player/SuperShotgun.png",
		"games/player/tracer.png",
		"games/RSKY1.png",
		"games/RSKY2.png",
		"games/soul/attack.png",
		"games/soul/death.png",
		"games/soul/idle.png",
		"games/soul/idleL.png",
		"games/soul/idleR.png",
		"games/soul/pain.png"]

		function preloadImages(urls, allImagesLoadedCallback){
			var loadedCounter = 0;
			var toBeLoadedNumber = urls.length;
			urls.forEach(function(url){
				preloadImage(url, function(){
					loadedCounter++;
					document.getElementById("progress").innerHTML = loadedCounter + ' / ' + toBeLoadedNumber;
					console.log('Number of loaded images: ' + loadedCounter);
					if(loadedCounter == toBeLoadedNumber){
						allImagesLoadedCallback();
					}
				});
			});
			function preloadImage(url, anImageLoadedCallback){
				var img = new Image();
				img.src = url;
				img.onload = anImageLoadedCallback;
			}
		}

		preloadImages(js_resource, function(){
			window.location.assign('doom.php');
		});

	</script>
	<div id="progress" class="progress" style="color:#FF0000">0 / 100</div>
</body>
</html>