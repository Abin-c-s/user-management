import { useState } from "react";
import UserForm from "./components/UserForm";
import UserTable from "./components/UserTable";

function App() {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);

  // Add a new user
  const addUser = (user) => {
    setUsers([...users, user]);
  };

  // Update an existing user
  const updateUser = (updatedUser) => {
    const updatedUsers = users.map((user) =>
      user.id === updatedUser.id ? updatedUser : user
    );

    setUsers(updatedUsers);
    setEditingUser(null);
  };

  // Delete user
  const deleteUser = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );

    if (confirmDelete) {
      setUsers(users.filter((user) => user.id !== id));
      if (editingUser && editingUser.id === id) {
        setEditingUser(null);
      }
    }
  };

  // Edit user
  const editUser = (user) => {
    setEditingUser(user);
  };

  return (
    <div className="container">
      <h1>User Management Application</h1>

      <UserForm
        addUser={addUser}
        updateUser={updateUser}
        editingUser={editingUser}
      />

      <UserTable
        users={users}
        onEdit={editUser}
        onDelete={deleteUser}
      />
    </div>
  );
}

export default App;