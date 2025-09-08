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

if (isset($_POST['username'], $_POST['phonenumber'], $_POST['table_number'], $_POST['items'], $_POST['total_price'])) {

    $username = $conn->real_escape_string($_POST['username']);
    $phonenumber = $conn->real_escape_string($_POST['phonenumber']);
    $table_number = $conn->real_escape_string($_POST['table_number']);
    $items = $conn->real_escape_string($_POST['items']);  // JSON string of cart items
    $total_price = $conn->real_escape_string($_POST['total_price']);

    // Insert into orders table
    $sql = "INSERT INTO orders (username, phonenumber, table_number, items, total_price, order_time) 
            VALUES ('$username', '$phonenumber', '$table_number', '$items', '$total_price', NOW())";

    if ($conn->query($sql) === TRUE) {
        echo "success";
    } else {
        echo "Error: " . $conn->error;
    }

} else {
    echo "Missing order data.";
}

$conn->close();
?>
