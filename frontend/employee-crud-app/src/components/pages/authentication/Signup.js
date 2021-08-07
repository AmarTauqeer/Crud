import React, { useState } from "react";
import axios from "axios";
import Input from "../../Input";
import Button from "../../Button";
import { useHistory } from "react-router";
import moment from "moment";

const Signup = (props) => {
  const history = useHistory();
  const [message, setMessage] = useState("");
  const [inputs, setInputs] = useState({
    user_name: "",
    user_password: "",
    create_date: new Date(),
    is_admin: false,
  });
  const handleChange = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };
  const handleCancelExit = () => {
    history.push({
      pathname: "/",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!inputs.user_name || !inputs.user_password) {
      alert("Please fill all the requird fields.");
      return false;
    }

    // send data to django
    if (inputs.user_name && inputs.user_password) {
      const data = {
        user_name: inputs.user_name,
        user_password: inputs.user_password,
        create_date: moment(inputs.create_date).format("YYYY-MM-DD"),
        is_admin: inputs.is_admin,
      };
      console.log(data);
      axios.post("http://127.0.0.1:8000/add_user/", data).then((res) => {
        if (res) {
          setMessage("User created successfully");
        } else {
          setMessage("Something wrong user is not created.");
        }
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h6>User Registration</h6>
      <hr />
      <div className="form-group row">
        <label className="col-md-3 col-form-label">User Name:</label>
        <div className="col-md-9">
          <Input
            name="user_name"
            value={inputs.user_name}
            handleChange={handleChange}
            className="form-control form-control-md"
          />
        </div>
      </div>
      <div className="form-group row">
        <label className="col-md-3 col-form-label">Password:</label>
        <div className="col-md-9">
          <Input
            name="user_password"
            value={inputs.user_password}
            handleChange={handleChange}
            className="form-control form-control-md"
            type="password"
          />
        </div>
      </div>
      <div className="form-group row">
        <label className="col-md-3 col-form-label"></label>
        <div className="col-md-9">
          <Button
            type="submit"
            className="btn btn-success btn-sm col-md-2"
            label="Save"
          />

          <Button
            type="button"
            className="btn btn-primary btn-sm col-md-2 m-1"
            onClick={handleCancelExit}
            label="Cancel/Exit"
          />
        </div>
      </div>
      <span>{message && <div className="message-div">{message}</div>}</span>
    </form>
  );
};

export default Signup;
