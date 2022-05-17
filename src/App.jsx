import React, { useState, useEffect } from "react";
import "./styles.css";

function App() {
  const [data, setData] = useState(null);
  const [query, setQuery] = useState("");
  const [idQuery, setIdQuery] = useState("");

  let updateId = 0;

  const getSearchedData = async () => {
    fetch(`https://favorite-ticketing-api.herokuapp.com/tickets/${query}`)
      .then((data) => {
        return data.json();
      })
      .then((data) => setData(data));
  };

  const getSearchedDataById = async () => {
    fetch(
      `https://favorite-ticketing-api.herokuapp.com/tickets/byId/${idQuery}`
    )
      .then((data) => {
        return data.json();
      })
      .then((data) => setData(data));
  };

  const postTicketData = (ticketData) => {
    fetch("https://favorite-ticketing-api.herokuapp.com/tickets", {
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
    window.location.reload(false);
  };

  const updateSubmit = (element) => {
    let inputData = document.getElementById(element).value;
    return inputData;
  };

  const handleOpenClose = (e, id, value) => {
    e.preventDefault();
    document.getElementById(id).style.display = value;
  };

  const updateColumn = (e, id, column, value) => {
    e.preventDefault();
    fetch(`https://favorite-ticketing-api.herokuapp.com/tickets/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        column: column,
        value: value,
      }),
    })
      .then((response) => response.json)
      .then((res) => console.log(res))
      .then(alert(`Ticket Updated`))
      .catch((err) => alert(err));
    window.location.reload(false);
  };

  getSearchedData();
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
            className="create-ticket-button"
            style={{
              height: "2.5rem",
              width: "15rem",
              background: "#191ca9",
              border: "none",
              borderRadius: "0.25rem",
              color: "white",
            }}
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
          onSubmit={(e) => handleSubmit(e)}
        >
          <label> Date:</label>
          <input type="date" name="date" required />
          <label> First Name:</label>
          <input type="text" name="firstName" required />
          <label> Last Name:</label>
          <input type="text" name="lastName" required />
          <label> Email:</label>
          <input type="email" name="email" required />
          <label> Phone Number:</label>
          <input type="tel" name="phoneNumber" required />
          <label> Brand/Model:</label>
          <input type="text" name="brandModel" required />
          <label> Serial:</label>
          <input type="text" name="serial" required />
          <label> Issue:</label>
          <textarea cols="30" rows="5" name="issue" required />
          <label> Notes:</label>
          <textarea cols="30" rows="5" name="notes" required />
          <label> Employee:</label>
          <input type="text" name="employee" required />
          <div className="new-ticket-button-container">
            <input
              style={{
                background: "yellow",
                border: "none",
                borderRadius: "0.25rem",
                height: "2.5rem",
              }}
              type="submit"
              className="ticket-submit"
              onClick={() => {
                document.getElementById("new-ticket-form").style.display =
                  "none";
              }}
            ></input>
            <button
              style={{
                background: "red",
                border: "none",
                color: "white",
                borderRadius: "0.25rem",
                height: "2.5rem",
              }}
              className="ticket-cancel"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("new-ticket-form").style.display =
                  "none";
              }}
            >
              Cancel
            </button>
          </div>
        </form>

        <form className="update-form" id="date">
          <label style={{ marginBottom: "1rem", textAlign: "center" }}>
            Update Date:
          </label>
          <input
            id="input-date"
            type="date"
            style={{ gridColumnEnd: "span 2", marginBottom: "0.5rem" }}
          ></input>
          <input
            type="submit"
            onClick={(e) => {
              handleOpenClose(e, "date", "none");
              updateColumn(e, updateId, "date", updateSubmit("input-date"));
            }}
          ></input>
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
            id="input-first-name"
            type="text"
            style={{ gridColumnEnd: "span 2", marginBottom: "0.5rem" }}
          ></input>
          <input
            type="submit"
            onClick={(e) => {
              handleOpenClose(e, "date", "none");
              updateColumn(
                e,
                updateId,
                "first_name",
                updateSubmit("input-first-name")
              );
            }}
          ></input>
          <button
            onClick={(e) => {
              handleOpenClose(e, "first-name", "none");
            }}
          >
            Cancel
          </button>
        </form>
        <form className="update-form" id="last-name">
          <label style={{ textAlign: "center", marginBottom: "1rem" }}>
            Update Last Name:
          </label>
          <input
            id="input-last-name"
            type="text"
            style={{ gridColumnEnd: "span 2", marginBottom: "0.5rem" }}
          ></input>
          <input
            type="submit"
            onClick={(e) => {
              handleOpenClose(e, "date", "none");
              updateColumn(
                e,
                updateId,
                "last_name",
                updateSubmit("input-last-name")
              );
            }}
          ></input>
          <button
            onClick={(e) => {
              handleOpenClose(e, "last-name", "none");
            }}
          >
            Cancel
          </button>
        </form>
        <form className="update-form" id="email">
          <label style={{ textAlign: "center", marginBottom: "1rem" }}>
            Update Email:
          </label>
          <input
            id="input-email"
            type="email"
            style={{ gridColumnEnd: "span 2", marginBottom: "0.5rem" }}
          ></input>
          <input
            type="submit"
            onClick={(e) => {
              handleOpenClose(e, "date", "none");
              updateColumn(e, updateId, "email", updateSubmit("input-email"));
            }}
          ></input>
          <button
            onClick={(e) => {
              handleOpenClose(e, "email", "none");
            }}
          >
            Cancel
          </button>
        </form>
        <form className="update-form" id="phone">
          <label style={{ textAlign: "center", marginBottom: "1rem" }}>
            Update Phone Number:
          </label>
          <input
            id="input-phone-number"
            type="text"
            style={{ gridColumnEnd: "span 2", marginBottom: "0.5rem" }}
          ></input>
          <input
            type="submit"
            onClick={(e) => {
              handleOpenClose(e, "date", "none");
              updateColumn(
                e,
                updateId,
                "phone_number",
                updateSubmit("input-phone-number")
              );
            }}
          ></input>
          <button
            onClick={(e) => {
              handleOpenClose(e, "phone", "none");
            }}
          >
            Cancel
          </button>
        </form>
        <form className="update-form" id="brand-model">
          <label style={{ textAlign: "center", marginBottom: "1rem" }}>
            Update Brand/Model:
          </label>
          <input
            id="input-brand-model"
            type="text"
            style={{ gridColumnEnd: "span 2", marginBottom: "0.5rem" }}
          ></input>
          <input
            type="submit"
            onClick={(e) => {
              handleOpenClose(e, "date", "none");
              updateColumn(
                e,
                updateId,
                "brand_model",
                updateSubmit("input-brand-model")
              );
            }}
          ></input>
          <button
            onClick={(e) => {
              handleOpenClose(e, "brand-model", "none");
            }}
          >
            Cancel
          </button>
        </form>
        <form className="update-form" id="serial">
          <label style={{ textAlign: "center", marginBottom: "1rem" }}>
            Update Serial:
          </label>
          <input
            id="input-serial"
            type="text"
            style={{ gridColumnEnd: "span 2", marginBottom: "0.5rem" }}
          ></input>
          <input
            type="submit"
            onClick={(e) => {
              handleOpenClose(e, "date", "none");
              updateColumn(e, updateId, "serial", updateSubmit("input-serial"));
            }}
          ></input>
          <button
            onClick={(e) => {
              handleOpenClose(e, "serial", "none");
            }}
          >
            Cancel
          </button>
        </form>
        <form className="update-form" id="issue">
          <label style={{ textAlign: "center", marginBottom: "1rem" }}>
            Update Issue:
          </label>
          <textarea
            id="input-issue"
            col="25"
            rows="5"
            style={{ gridColumnEnd: "span 2", marginBottom: "0.5rem" }}
          ></textarea>
          <input
            type="submit"
            onClick={(e) => {
              handleOpenClose(e, "date", "none");
              updateColumn(e, updateId, "issue", updateSubmit("input-issue"));
            }}
          ></input>
          <button
            onClick={(e) => {
              handleOpenClose(e, "issue", "none");
            }}
          >
            Cancel
          </button>
        </form>
        <form className="update-form" id="notes">
          <label style={{ textAlign: "center", marginBottom: "1rem" }}>
            Update Notes:
          </label>
          <textarea
            id="input-notes"
            col="25"
            rows="5"
            style={{ gridColumnEnd: "span 2", marginBottom: "0.5rem" }}
          ></textarea>
          <input
            type="submit"
            onClick={(e) => {
              handleOpenClose(e, "date", "none");
              updateColumn(e, updateId, "notes", updateSubmit("input-notes"));
            }}
          ></input>
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
                <th></th>
                <th></th>
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
                            updateId = element.id;
                            alert(updateId);
                          }}
                        >
                          {element.date}
                        </td>
                        <td
                          onClick={(e) => {
                            handleOpenClose(e, "first-name", "grid");
                            updateId = element.id;
                          }}
                        >
                          {element.first_name}
                        </td>
                        <td
                          onClick={(e) => {
                            handleOpenClose(e, "last-name", "grid");
                            updateId = element.id;
                          }}
                        >
                          {element.last_name}
                        </td>
                        <td
                          onClick={(e) => {
                            handleOpenClose(e, "email", "grid");
                            updateId = element.id;
                          }}
                        >
                          {element.email}
                        </td>
                        <td
                          onClick={(e) => {
                            handleOpenClose(e, "phone", "grid");
                            updateId = element.id;
                          }}
                        >
                          {element.phone_number}
                        </td>
                        <td
                          onClick={(e) => {
                            handleOpenClose(e, "brand-model", "grid");
                            updateId = element.id;
                          }}
                        >
                          {element.brand_model}
                        </td>
                        <td
                          onClick={(e) => {
                            handleOpenClose(e, "serial", "grid");
                            updateId = element.id;
                          }}
                        >
                          {element.serial}
                        </td>
                        <td
                          onClick={(e) => {
                            handleOpenClose(e, "issue", "grid");
                            updateId = element.id;
                          }}
                        >
                          {element.issue}
                        </td>
                        <td
                          onClick={(e) => {
                            handleOpenClose(e, "notes", "grid");
                            updateId = element.id;
                          }}
                        >
                          {element.notes}
                        </td>
                        <td>{element.employee}</td>
                        <td>{element.status}</td>
                        <td>
                          <button
                            style={{
                              background: "yellow",
                              border: "none",
                              borderRadius: "0.25rem",
                              cursor: "pointer",
                            }}
                            onClick={() => {
                              fetch(
                                `https://favorite-ticketing-api.herokuapp.com/tickets/${element.id}`,
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
                            {element.status === "open" ? "close" : "open"}
                          </button>
                        </td>
                        <td>
                          <button
                            style={{
                              background: "red",
                              border: "none",
                              borderRadius: "0.25rem",
                              color: "white",
                              cursor: "pointer",
                            }}
                            onClick={() => {
                              fetch(
                                `https://favorite-ticketing-api.herokuapp.com/tickets/${element.id}`,
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
