import React, { useEffect, useState } from "react";
import { Button, Modal, Table } from "react-bootstrap";
import { MdDelete } from "react-icons/md";
import { MdEditDocument } from "react-icons/md";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [modal, setModal] = useState(false);
  const [specificUser, setSpecificUser] = useState("");
  const [getData, setGetData] = useState(false);

  useEffect(async () => {
   await fetch("https://fir-demo-8d3af-default-rtdb.firebaseio.com/usersInfo.json")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setUsers(Object.entries(data));
      });
  }, [getData]);

  const deleteHandler = (e) => {
    setModal(true);
    setSpecificUser(e.target.value);
  };

  const removeHandler = async (e) => {
    console.log(e.target);

    await fetch(
      `https://fir-demo-8d3af-default-rtdb.firebaseio.com/usersInfo/${specificUser}.json`,
      {
        method: "DELETE",
      }
    ).then((res) => res.json());

    setModal(false);

    setGetData((prevState) => !prevState);
  };

  return (
    <div className="table-container">
      <Table striped bordered hover className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{user[1].firstName}</td>
              <td>{user[1].lastName}</td>
              <td>{user[1].email}</td>
              <td style={{ cursor: "pointer" }}>
                <MdDelete value={user[0]} onClick={(e) => deleteHandler(e)} />
                <MdEditDocument />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal className="modal" show={modal}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Confirm</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>Are You Sure to Delete?</p>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={() => setModal(false)}>
            No
          </Button>
          <Button
            variant="primary"
            onClick={(e) => removeHandler(e.target.value)}
          >
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Users;
