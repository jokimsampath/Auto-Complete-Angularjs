<?php
// Getting posted data and decodeing the json data
$_POST = json_decode(file_get_contents('php://input'), true);
// Database credentials
$server = "localhost";
$username = "root";
$password = "";
$database = "autoComplete";
$con = mysqli_connect($server,$username,$password,$database);
// Check connection
if (!$con) {
    die("Connection failed: " . mysqli_connect_error());
}else{
	// Check if the form is set
	if(isset($_POST['value'])){
		$val = $_POST['value'];
		$output = array();
		$query = "SELECT * FROM city_details WHERE city_id = (SELECT DISTINCT city_id from cities_in_india WHERE city_name = '".$val."')";
		$result = mysqli_query($con,$query);
		if(mysqli_num_rows($result) > 0){			
			while($row = mysqli_fetch_array($result)){
			$output['details'] = $row['details_description'];				 
			}
		}
		else{
			$output[]='No result found';
		}
		echo json_encode($output);
	}
}
?>