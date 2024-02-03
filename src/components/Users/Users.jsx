import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("https://fir-demo-8d3af-default-rtdb.firebaseio.com/usersInfo.json")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setUsers(Object.entries(data));
      });
  }, []);

  return (
    <div className="table-container">
      <Table striped bordered hover className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{user[1].firstName}</td>
              <td>{user[1].lastName}</td>
              <td>{user[1].email}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Users;
