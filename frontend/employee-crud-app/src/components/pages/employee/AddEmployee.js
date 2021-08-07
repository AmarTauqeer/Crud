import React, { useState, useEffect } from "react";
import axios from "axios";
import Input from "../../Input";
import Button from "../../Button";
import { useHistory } from "react-router";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";

const AddEmployee = (props) => {
  const history = useHistory();
  const [message, setMessage] = useState("");
  const [departments, setDepartments] = useState([]);
  const [dob, setDob] = useState(new Date());
  const [joiningDate, setJoiningDate] = useState(new Date());
  const [inputs, setInputs] = useState({
    department: 6,
    date_of_birth: "",
    joining_date: "",
    address: "",
    phone: "",
  });

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/all_department/").then((res) => {
      if (res) {
        console.log(res.data);
        setDepartments(res.data);
      }
    });
  }, []);

  const handleChange = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };
  const handleCancelExit = () => {
    history.push({
      pathname: "/all_employee",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    //console.log(inputs);
    if (!inputs.employee_name || !inputs.department) {
      alert("Please fill all the requird fields.");
      return false;
    }

    // send data to django
    if (inputs.employee_name && inputs.department) {
      const data = {
        employee_name: inputs.employee_name,
        department: inputs.department,
        date_of_birth: moment(dob).format("YYYY-MM-DD"),
        joining_date: moment(joiningDate).format("YYYY-MM-DD"),
        address: inputs.address,
        phone: inputs.phone,
      };

      console.log(data);
      axios.post("http://127.0.0.1:8000/add_employee/", data).then((res) => {
        if (res) {
          setMessage("Employee inserted successfully");
        } else {
          setMessage("Something wrong employee is not inserted.");
        }
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <br />
      <h6>Add Employee</h6>
      <br />
      <br />
      <div className="form-group row">
        <label className="col-md-3 col-form-label">Employee Name:</label>
        <div className="col-md-9">
          <Input
            name="employee_name"
            value={inputs.employee_name}
            handleChange={handleChange}
            className="form-control form-control-sm"
          />
        </div>
      </div>
      <div className="form-group row">
        <label className="col-md-3 col-form-label">Department Name:</label>
        <div className="col-md-4">
          <select
            name="department"
            onChange={handleChange}
            value={inputs.department_id}
            className="form-control form-control-sm"
          >
            {departments.map((dept, index) => {
              return (
                <option value={dept.id} key={index}>
                  {dept.department_name}
                </option>
              );
            })}
          </select>
        </div>
      </div>
      <div className="form-group row">
        <label className="col-md-3 col-form-label">Date of birth:</label>
        <div className="col-md-9">
          <DatePicker
            selected={dob}
            dateFormat="yyyy-MM-dd"
            onChange={(date) => setDob(date)}
          />
        </div>
      </div>
      <div className="form-group row">
        <label className="col-md-3 col-form-label">Joining date:</label>
        <div className="col-md-9">
          <DatePicker
            selected={joiningDate}
            dateFormat="yyyy-MM-dd"
            onChange={(date) => setJoiningDate(date)}
          />
        </div>
      </div>
      <div className="form-group row">
        <label className="col-md-3 col-form-label">Address:</label>
        <div className="col-md-9">
          <Input
            name="address"
            value={inputs.address}
            handleChange={handleChange}
            className="form-control form-control-md"
          />
        </div>
      </div>
      <div className="form-group row">
        <label className="col-md-3 col-form-label">Phone:</label>
        <div className="col-md-9">
          <Input
            name="phone"
            value={inputs.phone}
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

export default AddEmployee;
