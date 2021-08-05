import React, { useState } from "react";
import axios from "axios";
import Input from "../../Input";
import Button from "../../Button";
import { useHistory } from "react-router";

const Login = (props) => {
  const history = useHistory();
  const [message, setMessage] = useState("");
  const [inputs, setInputs] = useState({
    user_name: "",
    user_password: "",
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
        is_admin: inputs.is_admin,
      };

      axios.post("http://127.0.0.1:8000/check_user/", data).then((res) => {
        if (res.data === "Found") {
          localStorage.setItem("user_name", inputs.user_name);
          localStorage.setItem("user_password", inputs.user_password);

          history.push({
            pathname: "/",
          });
          window.location.reload();
          setMessage("User found");
        } else {
          setMessage("Invalid user credentials.");
        }
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h6>Login</h6>
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
            label="Login"
          />

          <Button
            type="button"
            className="btn btn-primary btn-sm col-md-2 m-1"
            onClick={handleCancelExit}
            label="Cancel/Exit"
          />
        </div>
      </div>
      <div className="form-group row">
        <label className="col-md-3 col-form-label"></label>
        <div className="col-md-9">{message}</div>
      </div>
    </form>
  );
};

export default Login;
