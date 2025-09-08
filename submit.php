<?php
$servername = "localhost";
$db_username = "root";
$db_password = "spgj2005@";   
$dbname = "restaurant_db";

// Create connection
$conn = new mysqli($servername, $db_username, $db_password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Make sure POST data exists
if(isset($_POST['username']) && isset($_POST['phonenumber'])) {

    // Sanitize user input
    $username = $conn->real_escape_string($_POST['username']);
    $phonenumber = $conn->real_escape_string($_POST['phonenumber']);

    // Insert data into database
    $sql = "INSERT INTO user_details (username, phonenumber) VALUES ('$username', '$phonenumber')";

    if ($conn->query($sql) === TRUE) {
        // Redirect to menu list after successful submit
        header('Location: menulist.html');
        exit();
    } else {
        echo "Error: " . $conn->error;
    }

} else {
    echo "Please fill in the form correctly.";
}

$conn->close();
?>
