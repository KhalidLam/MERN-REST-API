import React, { useState } from "react";

const App = () => {
  const [users, setUsers] = useState([]);
  const [formData, setformData] = useState({
    lat: "",
    lng: "",
  });
  const { lat, lng } = formData;

  const handleChange = (e) =>
    setformData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(lat, lng);
    fetch(`http://localhost:4000/api/users?lng=${lng}&lat=${lat}`)
      .then(function (data) {
        return data.json();
      })
      .then((json) => {
        setUsers(json);
        console.log(json);
      });
  };

  return (
    <div className='App'>
      <h1 className='title'>UserGo - a User REST API</h1>
      <div id='homepage'>
        <h1>Hire a person in your area</h1>
        <div id='users'>
          <div id='ninja-container'>
            <form id='search' onSubmit={handleSubmit}>
              <label>Enter your Latitude:</label>
              <input
                type='text'
                name='lat'
                value={lat}
                onChange={handleChange}
                placeholder='latitude'
                required
              />
              <label>Enter your Longitude:</label>
              <input
                type='text'
                name='lng'
                value={lng}
                onChange={handleChange}
                placeholder='longitude'
                required
              />
              <input type='submit' value='Find Ninjas' />
            </form>

            <ul>
              {users.map((user, index) => (
                <li key={index}>
                  <span className={"true"}></span>
                  <span className='name'>{user.name}</span>
                  <span className='rank'>{user.email}</span>
                  <span className='rank'>{user.phone}</span>
                  <span className='dist'>
                    {Math.floor(user.dist.calculated)} m
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
