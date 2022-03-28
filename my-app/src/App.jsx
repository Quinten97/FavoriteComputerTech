import React, { useState, useEffect } from "react";
import "./styles.css";

function App() {
  const [data, setData] = useState(null);
  const [query, setQuery] = useState("");
  const [idQuery, setIdQuery] = useState("");
  const [postData, setPostData] = useState({});

  const getSearchedData = async () => {
    fetch(`http://localhost:5000/tickets/${query}`)
      .then((data) => {
        return data.json();
      })
      .then((data) => setData(data));
  };

  const getSearchedDataById = async () => {
    fetch(`http://localhost:5000/tickets/byId/${idQuery}`)
      .then((data) => {
        return data.json();
      })
      .then((data) => setData(data));
  };

  const postTicketData = (ticketData) => {
    fetch("http://localhost:5000/tickets", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(ticketData),
    })
      .then(alert("Ticket Created"))
      .catch((err) => alert(err));
  };

  const handleSearch = async (event) => {
    await setQuery(event.target.value.toLowerCase());
  };

  const handleSearchById = async (event) => {
    await setIdQuery(event.target.value.toLowerCase());
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Array.from(formData.entries());
    let ticketData = {};
    data.forEach(([name, value]) => (ticketData[name] = value.toLowerCase()));
    postTicketData(ticketData);
  };

  const handleOpenClose = (e, id, value) => {
    e.preventDefault();
    document.getElementById(id).style.display = value;
  };

  useEffect(() => {
    getSearchedData();
    // getSearchedDataById();
  }, [query]);

  return (
    // Search bar
    <div>
      <section>
        <div className="button-container">
          <form
            onSubmit={(event) => {
              if (query !== "") {
                event.preventDefault();
                getSearchedData();
              } else if (idQuery !== "") {
                event.preventDefault();
                getSearchedDataById();
              } else {
                event.preventDefault();
                getSearchedData();
              }
            }}
          >
            <input
              type="search"
              placeholder="search"
              onChange={handleSearch}
              value={query}
            />
            <input
              type="search"
              placeholder="search by id"
              onChange={handleSearchById}
              value={idQuery}
            />
            <input type="submit" />
          </form>
          {/* create ticket button and dialouge */}
          <button
            onClick={() =>
              (document.getElementById("new-ticket-form").style.display =
                "grid")
            }
          >
            Create Ticket
          </button>
        </div>
        <form
          className="new-ticket-form"
          id="new-ticket-form"
          onSubmit={(e) => {
            handleSubmit(e);
          }}
        >
          <label> Date:</label>
          <input type="date" name="date" />
          <label> First Name:</label>
          <input type="text" name="firstName" />
          <label> Last Name:</label>
          <input type="text" name="lastName" />
          <label> Email:</label>
          <input type="email" name="email" />
          <label> Phone Number:</label>
          <input type="tel" name="phoneNumber" />
          <label> Brand/Model:</label>
          <input type="text" name="brandModel" />
          <label> Serial:</label>
          <input type="text" name="serial" />
          <label> Issue:</label>
          <textarea cols="30" rows="5" name="issue" />
          <label> Notes:</label>
          <textarea cols="30" rows="5" name="notes" />
          <label> Employee:</label>
          <input type="text" name="employee" />
          <input
            type="submit"
            className="ticket-submit"
            onClick={() =>
              (document.getElementById("new-ticket-form").style.display =
                "none")
            }
          ></input>
        </form>

        <form className="update-form" id="date">
          <label style={{ marginBottom: "1rem", textAlign: "center" }}>
            Update Date:
          </label>
          <input
            type="date"
            style={{ gridColumnEnd: "span 2", marginBottom: "0.5rem" }}
          ></input>
          <input type="submit"></input>
          <button
            onClick={(e) => {
              handleOpenClose(e, "date", "none");
            }}
          >
            Cancel
          </button>
        </form>
        <form className="update-form" id="first-name">
          <label style={{ textAlign: "center", marginBottom: "1rem" }}>
            Update First Name:
          </label>
          <input
            type="text"
            style={{ gridColumnEnd: "span 2", marginBottom: "0.5rem" }}
          ></input>
          <input type="submit"></input>
          <button
            onClick={(e) => {
              handleOpenClose(e, "first-name", "none");
            }}
          >
            Cancel
          </button>
        </form>
        <form className="update-form" id="last-name">
          <label>Update Last Name:</label>
          <input type="text"></input>
          <input type="submit"></input>
          <button
            onClick={(e) => {
              handleOpenClose(e, "last-name", "none");
            }}
          >
            Cancel
          </button>
        </form>
        <form className="update-form" id="email">
          <label>Update Email:</label>
          <input type="email"></input>
          <input type="submit"></input>
          <button
            onClick={(e) => {
              handleOpenClose(e, "email", "none");
            }}
          >
            Cancel
          </button>
        </form>
        <form className="update-form" id="phone">
          <label>Update Phone Number:</label>
          <input type="text"></input>
          <input type="submit"></input>
          <button
            onClick={(e) => {
              handleOpenClose(e, "phone", "none");
            }}
          >
            Cancel
          </button>
        </form>
        <form className="update-form" id="brand-model">
          <label>Update Brand/Model:</label>
          <input type="text"></input>
          <input type="submit"></input>
          <button
            onClick={(e) => {
              handleOpenClose(e, "brand-model", "none");
            }}
          >
            Cancel
          </button>
        </form>
        <form className="update-form" id="serial">
          <label>Update Serial:</label>
          <input type="text"></input>
          <input type="submit"></input>
          <button
            onClick={(e) => {
              handleOpenClose(e, "serial", "none");
            }}
          >
            Cancel
          </button>
        </form>
        <form className="update-form" id="issue">
          <label>Update Issue:</label>
          <textarea col="25" rows="5"></textarea>
          <input type="submit"></input>
          <button
            onClick={(e) => {
              handleOpenClose(e, "issue", "none");
            }}
          >
            Cancel
          </button>
        </form>
        <form className="update-form" id="notes">
          <label>Update Notes:</label>
          <textarea col="25" rows="5"></textarea>
          <input type="submit"></input>
          <button
            onClick={(e) => {
              handleOpenClose(e, "notes", "none");
            }}
          >
            Cancel
          </button>
        </form>

        {/* Display Table */}
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
                <th>Status:</th>
              </tr>
            </thead>
            {data !== null
              ? data.map((element) => {
                  return (
                    <tbody>
                      <tr>
                        <td>{element.id}</td>
                        <td
                          onClick={(e) => {
                            handleOpenClose(e, "date", "grid");
                          }}
                        >
                          {element.date}
                        </td>
                        <td
                          onClick={(e) => {
                            handleOpenClose(e, "first-name", "grid");
                          }}
                        >
                          {element.first_name}
                        </td>
                        <td
                          onClick={(e) => {
                            handleOpenClose(e, "last-name", "grid");
                          }}
                        >
                          {element.last_name}
                        </td>
                        <td
                          onClick={(e) => {
                            handleOpenClose(e, "email", "grid");
                          }}
                        >
                          {element.email}
                        </td>
                        <td
                          onClick={(e) => {
                            handleOpenClose(e, "phone", "grid");
                          }}
                        >
                          {element.phone_number}
                        </td>
                        <td
                          onClick={(e) => {
                            handleOpenClose(e, "brand-model", "grid");
                          }}
                        >
                          {element.brand_model}
                        </td>
                        <td
                          onClick={(e) => {
                            handleOpenClose(e, "serial", "grid");
                          }}
                        >
                          {element.serial}
                        </td>
                        <td
                          onClick={(e) => {
                            handleOpenClose(e, "issue", "grid");
                          }}
                        >
                          {element.issue}
                        </td>
                        <td
                          onClick={(e) => {
                            handleOpenClose(e, "notes", "grid");
                          }}
                        >
                          {element.notes}
                        </td>
                        <td>{element.employee}</td>
                        <td>{element.status}</td>
                        <td>
                          <button
                            onClick={() => {
                              fetch(
                                `http://localhost:5000/tickets/${element.id}`,
                                {
                                  method: "PATCH",
                                  headers: {
                                    "Content-Type": "application/json",
                                  },
                                  body: JSON.stringify({
                                    column: "status",
                                    value: `${
                                      element.status === "open"
                                        ? "closed"
                                        : "open"
                                    }`,
                                  }),
                                }
                              )
                                .then((response) => response.json)
                                .then((res) => console.log(res))
                                .then(alert(`Status Changed`))
                                .catch((err) => alert(err));
                              window.location.reload(false);
                            }}
                          >
                            {element.status === "open" ? "closed" : "open"}
                          </button>
                        </td>
                        <td>
                          <button
                            onClick={() => {
                              fetch(
                                `http://localhost:5000/tickets/${element.id}`,
                                {
                                  method: "DELETE",
                                }
                              )
                                .then((res) => {
                                  console.log(res);
                                })
                                .then(alert(`ticket ${element.id} deleted`))
                                .catch((err) => console.log(err));
                              window.location.reload(false);
                            }}
                          >
                            Delete
                          </button>
                        </td>
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
