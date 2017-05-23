<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
	<title> Doom Aerial Invasion </title>
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
		canvas{
			border:0px solid #000000;
			background-color: #000000;
		}
	</style>
</head>
<body onresize='resizeGame()'>
	<?php
	require_once 'Model.class.php';
	$link = mysqli_connect('localhost','root','','doom');
	Model::setDefaultAdapter($link);
	class highscores extends Model{}

	$highscores = new highscores();
	$row = $highscores->order('score','ASC')->fetchAll();
	echo '<pre>';
	print_r ($row);
	echo '</pre>';	

	foreach ($row as $key => $value) 
	{
		foreach ($value as $key2 => $value2) 
		{
			if ($key2 == 'name')
			{
				$a_name[] = $value2;
			}
			else if ($key2 == 'score')
			{
				$a_score[] = $value2;
			}
		}
	}				
	?>
	<script type="text/javascript">
		var hscore_name = <?php echo json_encode($a_name); ?>;	
		var hscore_score = <?php echo json_encode($a_score); ?>;
	</script>
	<script src='doom.js'></script>
	<script>

		startGame();
	</script>
</body>