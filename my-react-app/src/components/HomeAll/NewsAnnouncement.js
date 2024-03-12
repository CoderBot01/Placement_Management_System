import React, { useEffect } from "react";
import "./NewsAnnouncementstyles.css"; // Import your CSS file

function AnnouncementComponent() {
  useEffect(() => {
    // Function to add a new announcement dynamically
    const addNewAnnouncement = () => {
      const newAnnouncement = document.createElement("p");
      newAnnouncement.textContent =
        "This is a new announcement added dynamically.";
      document.querySelector(".announcement-news").appendChild(newAnnouncement);
    };

    // Function to remove the first announcement
    const removeFirstAnnouncement = () => {
      const announcements = document.querySelectorAll(".announcement-news p");
      if (announcements.length > 0) {
        announcements[0].remove(); // Remove the first announcement
      }
    };

    // Call the functions to add and remove announcements
    addNewAnnouncement(); // Add a new announcement
    removeFirstAnnouncement(); // Remove the first announcement
  }, []); // Run this effect only once when the component mounts

  return (
    <div className="announcementContainer">
      <h1 className="hi">Announcements</h1>
      <div className="announcement-news">
        <p>
          <a href="announcement1.html">This is the first announcement.</a>
        </p>
        <p>
          <a href="announcement2.html">This is the second announcement.</a>
        </p>
        <p>
          <a href="announcement3.html">This is the third announcement.</a>
        </p>
      </div>
    </div>
  );
}

export default AnnouncementComponent;
