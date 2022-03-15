import React, { useState, useEffect } from "react";
import "./styles.css";

function App() {
  let [data, setData] = useState(null);
  let [query, setQuery] = useState(null);

  let getAllData = () => {
    fetch("http://localhost:3000/tickets")
      .then((data) => {
        return data.json();
      })
      .then((data) => setData(data));
  };

  let getSearchedData = async () => {
    setQuery(document.getElementById("search-bar").value);

    fetch(`http://localhost:3000/tickets/${query}`)
      .then((data) => {
        return data.json();
      })
      .then((data) => setData(data));
  };

  useEffect(() => {
    getAllData();
  }, []);

  return (
    <div>
      <header>
        <nav>
          <a href="">Home</a>
        </nav>
        <img />
      </header>
      <section>
        <div className="button-container">
          <form>
            <input type="text" placeholder="search tickets" id="seach-bar" />
            <button onSubmit={getSearchedData()}>Submit</button>
          </form>
          <button>Create Ticket</button>
        </div>
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
