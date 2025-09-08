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

$sql = "SELECT * FROM orders ORDER BY order_time DESC";
$result = $conn->query($sql);
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin - All Orders</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #222;
            color: #fff;
            text-align: center;
        }

        table {
            width: 95%;
            margin: 20px auto;
            border-collapse: collapse;
        }

        th, td {
            border: 1px solid #ffffff;
            padding: 10px;
            text-align: center;
        }

        th {
            background-color: #1e3a8a;
        }

        .items-list {
            text-align: left;
        }
    </style>
</head>

<body>
    <h2>All Customer Orders</h2>

    <table>
        <thead>
            <tr>
                <th>Order ID</th>
                <th>Username</th>
                <th>Phone Number</th>
                <th>Table Number</th>
                <th>Items Ordered</th>
                <th>Total Price (₹)</th>
                <th>Order Time</th>
            </tr>
        </thead>
        <tbody>
            <?php if ($result->num_rows > 0): ?>
                <?php while($row = $result->fetch_assoc()): ?>
                    <tr>
                        <td><?= $row['id'] ?></td>
                        <td><?= htmlspecialchars($row['username']) ?></td>
                        <td><?= htmlspecialchars($row['phonenumber']) ?></td>
                        <td><?= htmlspecialchars($row['table_number']) ?></td>
                        <td class="items-list">
                            <?php
                                $items = json_decode($row['items'], true);
                                foreach ($items as $item) {
                                    echo "• " . htmlspecialchars($item['name']) . " × " . $item['quantity'] . " @ ₹" . $item['price'] . "<br>";
                                }
                            ?>
                        </td>
                        <td>₹<?= $row['total_price'] ?></td>
                        <td><?= $row['order_time'] ?></td>
                    </tr>
                <?php endwhile; ?>
            <?php else: ?>
                <tr><td colspan="7">No orders found.</td></tr>
            <?php endif; ?>
        </tbody>
    </table>
</body>

</html>

<?php
$conn->close();
?>
