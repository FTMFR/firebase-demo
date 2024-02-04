import React, { useState } from "react";

const Form = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  const registerHandler = async (e) => {
    e.preventDefault();

    const userInfo = {
      firstName,
      lastName,
      email,
    };
    try {
      const response = await fetch(
        "https://fir-demo-8d3af-default-rtdb.firebaseio.com/usersInfo.json",
        {
          method: "POST",
          body: JSON.stringify(userInfo),
        }
      );
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error("Error:", error);
    }

    setFirstName("");
    setLastName("");
    setEmail("");
  };

  return (
    <div className="bgc-green">
      <form action="#" onSubmit={registerHandler}>
        <input
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button>Register</button>
      </form>
    </div>
  );
};

export default Form;
