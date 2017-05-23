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
		<?php
		header('content-type:text/html;charset=utf-8');
		$path = 'games';
		$resource = NULL;
		function loadResource($path){
			$handle = opendir($path);
			global $resource;
			while(($item = readdir($handle))!==false){
				if($item != '.' && $item != '..'){
					if(is_file($path . '/' . $item)){
						if (pathinfo($path . '/' . $item,PATHINFO_EXTENSION) == 'png')
						{
							$resource[] = $path . '/' . $item;
						}
					} else {
						$func = __FUNCTION__;
						$func($path . '/' . $item);
					}
				}
			}
			closedir($handle);
		}
		loadResource($path);
		?>
		var js_resource= <?php echo json_encode($resource); ?>;	

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