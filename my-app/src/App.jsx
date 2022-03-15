import React from "react";
import { useState } from "react";
import "./styles.css";

function App() {
  let [data, setData] = useState(null);

  let getAllData = () => {
    fetch("http://localhost:3000/tickets")
      .then((data) => {
        return data.json();
      })
      .then((data) => setData(data));
  };

  const toggle = () => {
    const table = document.getElementById("table");
    table.style.display = "block";
  };

  let clickHandler = () => {
    getAllData();
    toggle();
  };

  return (
    <div>
      <header>
        <nav>
          <a>Home</a>
        </nav>
        <img />
      </header>
      <section>
        <button onClick={() => clickHandler()}>Search Tickets</button>
        <div className="table-container">
          <table id="table">
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
            {data !== null
              ? data.map((element) => {
                  return (
                    <tr>
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
                  );
                })
              : ""}
          </table>
        </div>
        <button>Create Ticket</button>
      </section>
      <footer>
        <p>Favorite Computer Technicians</p>
        <p>Copyright 2022 &#169;</p>
      </footer>
    </div>
  );
}

export default App;
