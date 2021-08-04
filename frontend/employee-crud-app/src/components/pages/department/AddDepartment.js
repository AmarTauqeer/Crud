import React, { useState } from "react";
import axios from "axios";
import Input from "../../Input";
import Button from "../../Button";
import { useHistory } from "react-router";

const AddDepartment = (props) => {
  const history = useHistory();
  const [message, setMessage] = useState("");
  const [inputs, setInputs] = useState({
    department_name: "",
    description: "",
  });
  const handleChange = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };
  const handleCancelExit = () => {
    history.push({
      pathname: "/all_department",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!inputs.department_name || !inputs.description) {
      alert("Please fill all the requird fields.");
      return false;
    }

    // send data to django
    if (inputs.department_name && inputs.description) {
      const data = {
        department_name: inputs.department_name,
        description: inputs.description,
      };

      axios.post("http://127.0.0.1:8000/add_department/", data).then((res) => {
        if (res) {
          setMessage("Department inserted successfully");
        } else {
          setMessage("Something wrong department is not inserted.");
        }
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group row">
        <label className="col-md-3 col-form-label">Department Name:</label>
        <div className="col-md-9">
          <Input
            name="department_name"
            value={inputs.department_name}
            handleChange={handleChange}
            className="form-control form-control-md"
          />
        </div>
      </div>
      <div className="form-group row">
        <label className="col-md-3 col-form-label">Description:</label>
        <div className="col-md-9">
          <Input
            name="description"
            value={inputs.description}
            handleChange={handleChange}
            className="form-control form-control-md"
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

export default AddDepartment;
