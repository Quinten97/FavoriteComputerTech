import React, { useState, useEffect } from "react";
import "./styles.css";

function App() {
  const [data, setData] = useState(null);
  const [query, setQuery] = useState("");
  const [postData, setPostData] = useState({});

  const getSearchedData = async () => {
    fetch(`http://localhost:3000/tickets/${query}`)
      .then((data) => {
        return data.json();
      })
      .then((data) => setData(data));
  };

  const postTicketData = (ticketData) => {
    fetch('http://localhost:3000/tickets', {
      method:"POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(ticketData)
    })
    .then(alert('Ticket Created'))
    .catch(err => console.warn(err))
  };

  const handleSearch = async (event) => {
    await setQuery(event.target.value.toLowerCase());
  };

  const handleSubmit = (event) => {
    event.preventDefault()
    const formData = new FormData(event.target);
    const data = Array.from(formData.entries())
    let ticketData ={}
    data.forEach(([name, value]) => ticketData[name]= value.toLowerCase()) 
    postTicketData(ticketData);
  };
  
  useEffect(() => {
    getSearchedData()
  }, [query]);

  return (
    <div>
      <section>
        <div className="button-container">
          <form>
            <input type="search" placeholder="search tickets" onChange={handleSearch} value={query} />
          </form>
          <button onClick={() => document.getElementById('new-ticket-form').style.display = 'grid'}>Create Ticket</button>
        </div>
        <form className="new-ticket-form" id="new-ticket-form" onSubmit={(e) => {
          handleSubmit(e)
        }}>
            <label> Date:</label>
            <input type="date" name="date"/>
            <label> First Name:</label>
            <input type="text" name="firstName"/>
            <label> Last Name:</label>
            <input type="text" name="lastName"/>
            <label> Email:</label>
            <input type="email" name="email"/>
            <label> Phone Number:</label>
            <input type="tel" name="phoneNumber"/>
            <label> Brand/Model:</label>
            <input type="text" name="brandModel"/>
            <label> Serial:</label>
            <input type="text" name="serial"/>
            <label> Issue:</label>
            <textarea cols="30" rows="5" name="issue"/>
            <label> Notes:</label>
            <textarea cols="30" rows="5" name="notes"/>
            <label> Employee:</label>
            <input type="text" name="employee"/>
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
