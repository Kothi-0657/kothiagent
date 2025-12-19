import React, { useEffect, useState } from "react";
import api from "../../services/api";
import CreateUserModal from "./CreateUserModal";
import ChangePasswordModal from "./ChangePasswordModal";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  is_active: boolean;
  created_at: string;
}

const Users: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showCreate, setShowCreate] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [showChangePassword, setShowChangePassword] = useState(false);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await api.get("/admin/users");
      setUsers(res.data.data);
    } catch (err: any) {
      setError("Failed to fetch users.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      await api.delete(`/admin/users/${id}`);
      fetchUsers();
    } catch {
      alert("Failed to delete user");
    }
  };

  return (
    <div>
      <div style={styles.header}>
        <h3>Users</h3>
        <button style={styles.createBtn} onClick={() => setShowCreate(true)}>
          + Create User
        </button>
      </div>

      {loading ? (
        <p>Loading users...</p>
      ) : error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : (
        <div style={styles.table}>
          <div style={styles.tableHeader}>
            <span>Name</span>
            <span>Email</span>
            <span>Role</span>
            <span>Status</span>
            <span>Created At</span>
            <span>Actions</span>
          </div>

          {users.map((user) => (
            <div key={user.id} style={styles.tableRow}>
              <span>{user.name}</span>
              <span>{user.email}</span>
              <span>{user.role}</span>
              <span>{user.is_active ? "Active" : "Inactive"}</span>
              <span>{new Date(user.created_at).toLocaleString()}</span>
              <span style={styles.actions}>
                <button
                  style={styles.actionBtn}
                  onClick={() => {
                    setSelectedUserId(user.id);
                    setShowChangePassword(true);
                  }}
                >
                  Change Password
                </button>
                <button
                  style={{ ...styles.actionBtn, backgroundColor: "#ff4d4f" }}
                  onClick={() => handleDelete(user.id)}
                >
                  Delete
                </button>
              </span>
            </div>
          ))}
        </div>
      )}

      {showCreate && (
        <CreateUserModal
          onClose={() => {
            setShowCreate(false);
            fetchUsers();
          }}
          onCreated={fetchUsers}
        />
      )}

      {showChangePassword && selectedUserId && (
        <ChangePasswordModal
          userId={selectedUserId}
          onClose={() => setShowChangePassword(false)} onSuccess={function (): void {
            throw new Error("Function not implemented.");
          } }        />
      )}
    </div>
  );
};

export default Users;

// ---------------- STYLES ----------------
const styles: { [key: string]: React.CSSProperties } = {
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  createBtn: {
    padding: "8px 16px",
    backgroundColor: "#0b051e",
    color: "#fff",
    border: "none",
    borderRadius: 6,
    cursor: "pointer",
  },
  table: {
    display: "grid",
    gridTemplateColumns: "repeat(6, 1fr)",
    gap: 10,
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
    padding: 10,
  },
  tableHeader: {
    display: "contents",
    fontWeight: "bold",
    textAlign: "left",
  },
  tableRow: {
    display: "contents",
    padding: "8px 0",
    borderBottom: "1px solid #ddd",
  },
  actions: {
    display: "flex",
    gap: 8,
  },
  actionBtn: {
    padding: "4px 8px",
    backgroundColor: "#1890ff",
    color: "#fff",
    border: "none",
    borderRadius: 4,
    cursor: "pointer",
  },
};
