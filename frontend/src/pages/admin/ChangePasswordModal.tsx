import React, { useState } from "react";
import api from "../../services/api";

interface Props {
  userId: number;
  onClose: () => void;
  onSuccess: () => void;
}

const ChangePasswordModal: React.FC<Props> = ({
  userId,
  onClose,
  onSuccess,
}) => {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!password) return alert("Enter password");

    try {
      setLoading(true);
      await api.patch(`/admin/users/${userId}/password`, { password });
      alert("Password updated");
      onSuccess();
      onClose();
    } catch {
      alert("Failed to update password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={overlay}>
      <div style={modal}>
        <h3>Change Password</h3>

        <input
          type="password"
          placeholder="New Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={input}
        />

        <div style={{ display: "flex", gap: 10 }}>
          <button onClick={handleSubmit} style={primaryBtn} disabled={loading}>
            Update
          </button>
          <button onClick={onClose} style={secondaryBtn}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChangePasswordModal;

// ---------------- styles ----------------
const overlay: React.CSSProperties = {
  position: "fixed",
  inset: 0,
  background: "rgba(0,0,0,0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1000,
};

const modal: React.CSSProperties = {
  background: "#fff",
  padding: 20,
  borderRadius: 12,
  width: 350,
};

const input: React.CSSProperties = {
  width: "100%",
  padding: 10,
  marginBottom: 15,
};

const primaryBtn: React.CSSProperties = {
  padding: "8px 16px",
  background: "#0b051e",
  color: "#fff",
  border: "none",
  borderRadius: 6,
};

const secondaryBtn: React.CSSProperties = {
  padding: "8px 16px",
  border: "1px solid #0b051e",
  borderRadius: 6,
  background: "#fff",
};
