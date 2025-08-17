<?php
require_once 'db.php';

class RequestHandler {
    private $db;

    public function __construct() {
        $this->db = new myDB();
    }

    public function handle() {
        $routes = [
            'get_data'            => 'getData',
            'get_room_messages'   => 'getRoomMessages',
            'get_rooms'           => 'getRooms',
            'get_room'            => 'getRoom',
            'add_chatroom'        => 'addChatroom',
            'archive_room'        => 'archiveRoom',
            'delete_entry'        => 'deleteEntry',
            'update_chatroom_name'=> 'updateChatroomName',
            'add_message'         => 'addMessage',
        ];

        foreach ($routes as $key => $method) {
            if (isset($_POST[$key])) {
                $this->$method();
                return;
            }
        }

        // If no route matched
        http_response_code(400);
        echo json_encode(['error' => 'Invalid request']);
    }

    private function getData() {
        $table_name = $_POST['table_name'];
        $table_data = $this->db->select($table_name);
        echo json_encode($table_data);
    }

    private function getRoomMessages() {
        $room_id = $_POST['room_id'];
        $room_messages = $this->db->get_room_messages($room_id);
        echo json_encode($room_messages);
    }

    private function getRooms() {
        $is_archived = $_POST['is_archived'];
        $rooms = $this->db->get_rooms($is_archived);
        echo json_encode($rooms);
    }

    private function getRoom() {
        $room_id = $_POST['room_id'];
        $room = $this->db->get_room($room_id);
        echo json_encode($room);
    }

    private function addChatroom() {
        unset($_POST['add_chatroom']);
        $new_id = $this->db->insert('chatroom', [...$_POST]);
        echo json_encode([
            'message' => 'Chatroom added successfully',
            'id' => $new_id
        ]);
    }

    private function archiveRoom() {
        $room_id = $_POST['room_id'];
        $is_archived = $_POST['is_archived'];
        $this->db->archive_room($room_id, $is_archived);
        $message = ($is_archived === 'true') ? 'Chatroom archived successfully' : 'Chatroom unarchived successfully';
        echo json_encode(['message' => $message]);
    }

    private function deleteEntry() {
        $table_name = $_POST['table_name'];
        $table_id = $_POST['table_id'];
        $this->db->delete($table_name, $table_id);
        if ($table_name == 'chatroom') {
            $this->db->delete_room_messages($table_id);
        }
        echo json_encode(['message' => 'Chatroom deleted successfully']);
    }

    private function updateChatroomName() {
        $chatroom_id = $_POST['chatroom_id'];
        $updated_name = $_POST['updated_name'];
        $this->db->update_room_name($chatroom_id, $updated_name);
        echo json_encode(['message' => 'Chatroom name updated successfully']);
    }

    private function addMessage() {
        unset($_POST['add_message']);
        $this->db->insert('message', [...$_POST]);
        echo json_encode(['message' => 'Message sent successfully']);
    }
}