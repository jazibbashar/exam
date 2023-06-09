import React, { useEffect, useState } from 'react';

const UserCards = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    fetch('https://randomuser.me/api/?inc=gender,name,nat,location,picture,email&results=20')
      .then(response => response.json())
      .then(data => setUsers(data.results))
      .catch(error => console.error(error));
  }, []);

  const handleUserClick = user => {
    setSelectedUser(user);
  };

  return (
    <div className="user-cards">
      {users.map(user => (
        <div
          key={user.email}
          className={`user-card ${selectedUser === user ? 'selected' : ''}`}
          onClick={() => handleUserClick(user)}
        >
          <p className="gender">{user.gender} . {user.location.city}</p>
          <h3 className="name">{`${user.name.first} ${user.name.last}`}</h3>
       
          <p className="mail">{user.email}</p>
        </div>
      ))}

      {selectedUser && (
        <div className="selected-card">
          <img src={selectedUser.picture.large} alt="User" />
          <h3 className='newName'>{selectedUser.name.first} {selectedUser.name.last}</h3>
          <h3>{selectedUser.location.street.number} Born {selectedUser.location.city} {selectedUser.location.country} {selectedUser.location.postcode}</h3>
          <h3>{selectedUser.location.timezone.offset} {selectedUser.location.timezone.description}</h3>
          <p className="gender1">{selectedUser.gender}</p>
        </div>
      )}
    </div>
  );
};

export default UserCards;
