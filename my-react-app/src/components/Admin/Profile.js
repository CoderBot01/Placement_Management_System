import React, { useState } from 'react';
import AdminDash from "./AdminDash"
// import "./Profile.css"

class AdminProfile extends React.Component {
  render() {
    return (
      <div>
        <header>
          <h1>Admin Panel</h1>
        </header>
        <nav>
          <a href="#">Dashboard</a>
          <a href="#">Users</a>
          <a href="#">Posts</a>
          <a href="#">Settings</a>
          {/* Add more links for other functionalities */}
        </nav>
        <section>
          <h2>Welcome to the Admin Panel</h2>
          <div className="button-container">
            <button className="button">Add User</button>
            <button className="button">Edit User</button>
            <button className="button button-danger">Delete User</button>
            {/* Add more buttons for other admin actions */}
          </div>
        </section>
      </div>
    );
  }
}

export default AdminProfile;
