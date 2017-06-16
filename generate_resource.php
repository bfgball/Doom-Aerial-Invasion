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

		foreach ($resource as $key => $value) {
			echo '"';
			echo $value;
			echo '"';
			echo ',';
			echo '<br>';
		}

		// foreach ($resource as $key => $value) {
		// 	echo 'background-image: url(';
		// 	echo $value;
		// 	echo ');';
		// 	echo '<br>';
		// }