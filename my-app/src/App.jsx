import React, { useState, useEffect } from "react";
import "./styles.css";

function App() {
  let [data, setData] = useState(null);
  let [query, setQuery] = useState("");

  let getSearchedData = async () => {
    fetch(`http://localhost:3000/tickets/${query}`)
      .then((data) => {
        return data.json();
      })
      .then((data) => setData(data));
  };

  const handleSearch = async (event) => {
    await setQuery(event.target.value.toLowerCase());
  };

  useEffect(() => {
    getSearchedData()
  }, [query]);

  return (
    <div>
      <section>
        <div className="button-container">
          <form>
            <input type="search" placeholder="search tickets" onChange={handleSearch} value={query}/>
          </form>
          <button onClick={() => document.getElementById('new-ticket-form').style.display = 'grid'}>Create Ticket</button>
        </div>
        <form className="new-ticket-form" id="new-ticket-form">
            <label> Date:</label>
            <input type="date" />
            <label> First Name:</label>
            <input type="text" />
            <label> Last Name:</label>
            <input type="text" />
            <label> Email:</label>
            <input type="email" />
            <label> Phone Number:</label>
            <input type="tel" />
            <label> Brand/Model:</label>
            <input type="text" />
            <label> Serial:</label>
            <input type="text" />
            <label> Issue:</label>
            <textarea cols="30" rows="5" />
            <label> Notes:</label>
            <textarea cols="30" rows="5" />
            <label> Employee:</label>
            <input type="text" />
            <input type='submit' className="ticket-submit" onClick={() => document.getElementById('new-ticket-form').style.display = 'none'}></input>
          </form>
        <div className="table-container">
          <table id="table">
            <thead>
              <tr>
                <th>id:</th>
                <th>Date:</th>
                <th>First Name:</th>
                <th>Last Name:</th>
                <th>Email:</th>
                <th>Phone Number:</th>
                <th>Brand/Model:</th>
                <th>Serial:</th>
                <th>Issue:</th>
                <th>Notes:</th>
                <th>Employee:</th>
              </tr>
            </thead>
            {data !== null
              ? data.map((element) => {
                  return (
                    <tbody>
                      <tr onClick={() => console.log('test')}>
                        <td>{element.id}</td>
                        <td>{element.date}</td>
                        <td>{element.first_name}</td>
                        <td>{element.last_name}</td>
                        <td>{element.email}</td>
                        <td>{element.phone_number}</td>
                        <td>{element.brand_model}</td>
                        <td>{element.serial}</td>
                        <td>{element.issue}</td>
                        <td>{element.notes}</td>
                        <td>{element.employee}</td>
                      </tr>
                    </tbody>
                  );
                })
              : ""}
          </table>
        </div>
      </section>
      <footer>
        <p>Favorite Computer Technicians</p>
        <p>Copyright 2022 &#169;</p>
      </footer>
    </div>
  );
}

export default App;
