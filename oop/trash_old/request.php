<?php
// Add CORS headers
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, PATCH, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');

require 'request_handler.php';

$handler = new RequestHandler();
$handler->handle();

// require 'db.php';

// $mydb = new myDB();

// if (isset($_POST['get_data'])) {
//     $table_name = $_POST['table_name'];

//     $table_data = $mydb->select($table_name);
//     echo json_encode($table_data);
// }

// if (isset($_POST['get_room_messages'])) {
//     $room_id = $_POST['room_id'];

//     $room_messages = $mydb->get_room_messages($room_id);

//     echo json_encode($room_messages);
// }

// if (isset($_POST['get_rooms'])) {
//     $is_archived = $_POST['is_archived'];

//     $rooms = $mydb->get_rooms($is_archived);

//     echo json_encode($rooms);
// }

// if (isset($_POST['get_room'])) {
//     $room_id = $_POST['room_id'];
//     $room = $mydb->get_room($room_id);
//     echo json_encode($room);
// }

// if (isset($_POST['add_chatroom'])) {
//     // dont forget to unset the not-needed values
//     unset($_POST['add_chatroom']);

//     // Insert and get the new chatroom ID
//     $new_id = $mydb->insert('chatroom', [...$_POST]);

//     echo json_encode([
//         'message' => 'Chatroom added successfully',
//         'id' => $new_id
//     ]);
// }

// if (isset($_POST['archive_room'])) {
//     $room_id = $_POST['room_id'];
//     $is_archived = $_POST['is_archived'];

//     $mydb->archive_room($room_id, $is_archived);

//     if ($is_archived === 'true') {
//         $message = 'Chatroom archived successfully';
//     } else {
//         $message = 'Chatroom unarchived successfully';
//     }

//     echo json_encode(['message' => $message]);
// }

// if (isset($_POST['delete_entry'])) {
//     $table_name = $_POST['table_name'];
//     $table_id = $_POST['table_id'];

//     $deleted = $mydb->delete($table_name, $table_id);

//     if ($table_name == 'chatroom') {
//         $mydb->delete_room_messages($table_id);
//     }

//     echo json_encode(['message' => 'Chatroom deleted successfully']);
// }


// if (isset($_POST['update_chatroom_name'])) {
//     $chatroom_id = $_POST['chatroom_id'];
//     $updated_name = $_POST['updated_name'];

//     $mydb->update_room_name($chatroom_id, $updated_name);

//     echo json_encode(['message' => 'Chatroom name updated successfully']);
// }



// if (isset($_POST['add_message'])) {
//     // dont forget to unset the not-needed values
//     unset($_POST['add_message']);

//     $mydb->insert('message', [...$_POST]);

//     // this is analogous to laravel's ->with('message', 'Chatroom added successfully');
//     echo json_encode(['message' => 'Message sent successfully']);
// }



// OLD STUFF BELOW
