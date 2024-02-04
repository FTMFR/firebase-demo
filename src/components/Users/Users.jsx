import React, { useEffect, useState } from "react";
import { Button, Form, Modal, Table } from "react-bootstrap";
import { MdDelete } from "react-icons/md";
import { MdEditDocument } from "react-icons/md";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [deletemodal, setDeleteModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [specificUser, setSpecificUser] = useState("");
  const [getData, setGetData] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://fir-demo-8d3af-default-rtdb.firebaseio.com/usersInfo.json"
        );
        if (response.ok) {
          const data = await response.json();
          console.log(data);
          setUsers(Object.entries(data));
        } else {
          console.log(response);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [getData]);

  useEffect(() => {
    const mainUserInfo = users.find((user) => user[0] === specificUser);

    if (mainUserInfo) {
      setFirstName(mainUserInfo[1].firstName);
      setLastName(mainUserInfo[1].lastName);
      setEmail(mainUserInfo[1].email);
    }
  }, [specificUser]);

  const removeHandler = async () => {
    await fetch(
      `https://fir-demo-8d3af-default-rtdb.firebaseio.com/usersInfo/${specificUser}.json`,
      {
        method: "DELETE",
      }
    ).then((res) => console.log(res));

    setDeleteModal(false);

    setGetData((prevState) => !prevState);
  };

  const editHandler = async () => {
    const usersInfo = {
      firstName,
      lastName,
      email,
    };

    console.log('log this');

    await fetch(
      `https://fir-demo-8d3af-default-rtdb.firebaseio.com/usersInfo/${specificUser}.json`,
      {
        method: "PUT",
        body: JSON.stringify(usersInfo),
      }
    ).then((res) => console.log(res));

    setEditModal(false);
    setGetData((prev) => !prev);
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
                <MdDelete
                  value={user[0]}
                  onClick={() => {
                    setDeleteModal(true);
                    setSpecificUser(user[0]);
                  }}
                />
                <MdEditDocument
                  onClick={() => {
                    setEditModal(true);
                    setSpecificUser(user[0]);
                  }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* delete Deletemodal */}
      <Modal className="Deletemodal" show={deletemodal}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Confirm</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>Are You Sure to Delete?</p>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={() => setDeleteModal(false)}>
            No
          </Button>
          <Button variant="primary" onClick={() => removeHandler()}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>

      {/* edit Deletemodal */}
      <Modal className="Deletemodal" show={editModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Confirm</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>Are You Sure to Edit?</p>

          <Form>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>First Name:</Form.Label>
              <Form.Control
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                type="text"
                placeholder="Enter First Name"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Last Name:</Form.Label>
              <Form.Control
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                type="text"
                placeholder="Enter Last Name"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="Enter email"
              />
            </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={() => setEditModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={() => editHandler()}>
            Edit
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Users;
