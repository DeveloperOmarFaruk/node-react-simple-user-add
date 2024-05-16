import React, { useEffect, useRef, useState } from "react";
import "./App.css";

function App() {
  const [users, setUsers] = useState([]);
  const nameRef = useRef("");
  const emailRef = useRef("");
  const phoneRef = useRef("");
  const URL = `http://localhost:5000/user`;

  useEffect(() => {
    fetch(URL)
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, [URL]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const name = nameRef.current.value;
    const email = emailRef.current.value;
    const phone = phoneRef.current.value;

    const NewUserValue = {
      name: name,
      email: email,
      phone: phone,
    };
    console.log(NewUserValue);
    fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(NewUserValue),
    })
      .then((res) => res.json())
      .then((data) => {
        const NewUsersData = [...users, data];
        setUsers(NewUsersData);
      });

    nameRef.current.value = "";
    emailRef.current.value = "";
    phoneRef.current.value = "";
  };

  return (
    <div className="App">
      <h1 className="mt-4 mb-4 text-primary-emphasis">
        Node React Simple User Add
      </h1>

      <form
        style={{ margin: "4rem auto", width: "40%", display: "block" }}
        onSubmit={handleSubmit}
      >
        <div className="form-floating mb-4">
          <input
            type="text"
            className="form-control border border-info"
            id="floatingInput"
            placeholder="Name"
            ref={nameRef}
            required
          />
          <label for="floatingInput">Name</label>
        </div>
        <div className="form-floating mb-4">
          <input
            type="email"
            className="form-control border border-info"
            id="floatingPassword"
            placeholder="Email"
            ref={emailRef}
            required
          />
          <label for="floatingPassword">Email</label>
        </div>
        <div className="form-floating mb-4">
          <input
            type="number"
            className="form-control border border-info"
            id="floatingPassword"
            placeholder="Phone"
            ref={phoneRef}
            required
          />
          <label for="floatingPassword">Phone</label>
        </div>

        <button
          type="submit"
          className="btn btn-info"
          style={{ padding: "5px 40px" }}
        >
          User Add
        </button>
      </form>

      <table className="table table-bordered border-info container-sm">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Phone</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) =>
            user.name === "" ? (
              <></>
            ) : (
              <tr className="text-start" key={user.id}>
                <th scope="row" className="text-center">
                  {user.id}
                </th>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
}

export default App;
