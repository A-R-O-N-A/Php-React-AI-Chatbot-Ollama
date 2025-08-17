
<?php
class myDB
{
    private $servername = "localhost";
    private $username = 'root';
    private $password = '';
    private $db_name = 'millennium_ai';
    private $port = '3307';
    private $conn;
    public $res;

    public function __construct()
    {

        try {
            $this->conn = new mysqli($this->servername, $this->username, $this->password, $this->db_name, $this->port);
        } catch (Exception $e) {
            die("Database connection failed: " . $e);
        }
    }

    public function __destruct()
    {
        $this->conn->close();
    }

    public function insert($table, $data)
    {

        try {
            $table_columns = implode(',', array_keys($data));
            $prep = $types = '';

            foreach ($data as $key => $value) {
                $prep .= '?,';
                $types .= substr(gettype($value), 0, 1);
            }

            $prep = substr($prep, 0, -1);
            $stmt = $this->conn->prepare("INSERT INTO $table($table_columns) VALUES ($prep)");
            $stmt->bind_param($types, ...array_values($data));
            $stmt->execute();
            $new_id = $this->conn->insert_id; // <-- Get the new inserted ID
            $stmt->close();
            return $new_id; // <-- Return the new ID
        } catch (Exception $e) {
            die("Error while inserting Data ! <br>" . $e);
        }
    }

    public function select($table, $row = '*', $where = NULL)
    {
        try {
            $sql = "SELECT $row FROM $table";

            if ($where !== NULL) {
                $sql .= " WHERE $where";
            }

            $result = $this->conn->query($sql);

            if ($result->num_rows > 0) {
                $data = [];
                while ($row_data = $result->fetch_assoc()) {
                    $data[] = $row_data;
                }
                return $data;
            } else {
                return [];
            }
        } catch (Exception $e) {
            die("Error while selecting Data ! <br>" . $e);
        }
    }

    public function delete($table, $id)
    {
        try {
            $stmt = $this->conn->prepare("DELETE FROM $table WHERE id = ?");
            $stmt->bind_param("i", $id);
            $stmt->execute();
            $affected_rows = $stmt->affected_rows;
            $stmt->close();

            return $affected_rows;
        } catch (Exception $e) {
            die("Error while deleting Data ! <br>" . $e);
        }
    }

    public function update($table, $data, $where)
    {
        try {
            $set = '';
            $types = '';

            foreach ($data as $key => $value) {
                $set .= "$key = ?,";
                $types .= substr(gettype($value), 0, 1);
            }

            $set = rtrim($set, ',');
            $stmt = $this->conn->prepare("UPDATE $table SET $set WHERE $where");
            $stmt->bind_param($types, ...array_values($data));
            $stmt->execute();
            $stmt->close();
        } catch (Exception $e) {
            die("Error while updating Data ! <br>" . $e);
        }
    }

    public function get_room_messages($room_id)
    {
        try {
            $sql = 'SELECT 
            message.content as message_content, 
            message.role as message_role, 
            chatroom.name as chatroom_name, 
            chatroom.id as chatroom_id 
            
            FROM 
            message INNER JOIN chatroom 
            ON message.chatroom_id = chatroom.id
            WHERE chatroom.id = ?';

            $stmt = $this->conn->prepare($sql);
            $stmt->bind_param("i", $room_id);
            $stmt->execute();
            $result = $stmt->get_result();

            if ($result->num_rows > 0) {
                $data = [];
                while ($row_data = $result->fetch_assoc()) {
                    $data[] = $row_data;
                }
                $stmt->close();
                return $data;
            } else {
                $stmt->close();
                return [];
            }
        } catch (Exception $e) {
            die("Error while getting room messages ! <br>" . $e);
        }
    }

    public function get_rooms($is_archived)
    {
        try {
            $sql = 'SELECT 
            chatroom.id as chatroom_id, 
            chatroom.name as chatroom_name,
            is_archived

            FROM chatroom

            WHERE chatroom.is_archived = ?
            ORDER BY chatroom.id DESC';

            $stmt = $this->conn->prepare($sql);
            $stmt->bind_param("s",  $is_archived);
            $stmt->execute();
            $result = $stmt->get_result();

            if ($result->num_rows > 0) {
                $data = [];
                while ($row_data = $result->fetch_assoc()) {
                    $data[] = $row_data;
                }
                $stmt->close();
                return $data;
            } else {
                $stmt->close();
                return [];
            }
        } catch (Exception $e) {
            die("Error while getting rooms ! <br>" . $e);
        }
    }

    public function get_room($room_id)
    {
        try {
            $sql = 'SELECT * FROM chatroom WHERE id = ?';
            $stmt = $this->conn->prepare($sql);
            $stmt->bind_param("i", $room_id);
            $stmt->execute();
            $result = $stmt->get_result();

            if ($result->num_rows > 0) {
                $data = $result->fetch_assoc();
                $stmt->close();
                return $data;
            } else {
                $stmt->close();
                return null;
            }
        } catch (Exception $e) {
            die("Error while getting room! <br>" . $e);
        }
    }

    public function archive_room($room_id, $is_archived)
    {
        try {
            $sql = 'UPDATE chatroom SET is_archived = ? WHERE id = ?';
            $stmt = $this->conn->prepare($sql);
            $stmt->bind_param("si", $is_archived, $room_id);
            $stmt->execute();
            $affected_rows = $stmt->affected_rows;
            $stmt->close();
            return $affected_rows;
        } catch (Exception $e) {
            die("Error while archiving room! <br>" . $e);
        }
    }

    public function delete_room_messages($room_id)
    {
        try {
            $sql = 'DELETE FROM message WHERE chatroom_id = ?';
            $stmt = $this->conn->prepare($sql);
            $stmt->bind_param("i", $room_id);
            $stmt->execute();
            $affected_rows = $stmt->affected_rows;
            $stmt->close();
            return $affected_rows;
        } catch (Exception $e) {
            die("Error while deleting room messages! <br>" . $e);
        }
    }

    public function update_room_name($chatroom_id, $update_name)
    {
        try {
            $sql = 'UPDATE chatroom SET name = ? WHERE id = ?';
            $stmt = $this->conn->prepare($sql);
            $stmt->bind_param("si", $update_name, $chatroom_id);
            $stmt->execute();
            $affected_rows = $stmt->affected_rows;
            $stmt->close();
            return $affected_rows;
        } catch (Exception $e) {
            die("Error while updating room name! <br>" . $e);
        }
    }
}

?>
