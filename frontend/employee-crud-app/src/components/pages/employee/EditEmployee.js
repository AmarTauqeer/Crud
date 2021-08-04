import React, { useState, useEffect } from "react";
import axios from "axios";
import Input from "../../Input";
import Button from "../../Button";
import { useHistory } from "react-router";

const EditEmployee = (props) => {
  const history = useHistory();
  const [message, setMessage] = useState("");
  const [departments, setDepartments] = useState([]);
  const [inputs, setInputs] = useState({
    employee_name: "",
    department: 6,
    date_of_birth: "",
    joining_date: "",
    address: "",
    phone: "",
  });

  useEffect(() => {
    const id = props.match.params.id;
    axios.get("http://127.0.0.1:8000/get_employee_by_id/" + id).then((res) => {
      if (res) {
        //console.log(res.data);
        setInputs({
          employee_name: res.data.employee_name,
          department: res.data.department,
          date_of_birth: res.data.date_of_birth,
          joining_date: res.data.joining_date,
          address: res.data.address,
          phone: res.data.phone,
        });

        // get departments
        axios.get("http://127.0.0.1:8000/all_department/").then((res) => {
          if (res) {
            console.log(res.data);
            setDepartments(res.data);
          }
        });
      }
    });
  }, [props.match.params.id]);

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

    if (!inputs.employee_name || !inputs.department) {
      alert("Please fill all the requird fields.");
      return false;
    }
    // send data to django
    if (inputs.employee_name && inputs.department) {
      const data = {
        employee_name: inputs.employee_name,
        department: inputs.department,
        date_of_birth: inputs.date_of_birth,
        joining_date: inputs.joining_date,
        address: inputs.address,
        phone: inputs.phone,
      };

      const id = props.match.params.id;
      axios
        .put("http://127.0.0.1:8000/update_employee/" + id, data)
        .then((res) => {
          if (res) {
            setMessage("Employee updated successfully");
          } else {
            setMessage("Something wrong employee is not updated.");
          }
        });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group row">
        <label className="col-md-3 col-form-label">Employee Name:</label>
        <div className="col-md-9">
          <Input
            name="employee_name"
            value={inputs.employee_name}
            handleChange={handleChange}
            className="form-control form-control-md"
          />
        </div>
      </div>
      <div className="form-group row">
        <label className="col-md-3 col-form-label">Department Name:</label>
        <div className="col-md-4">
          <select
            name="department"
            onChange={handleChange}
            value={inputs.department}
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
          <Input
            name="date_of_birth"
            value={inputs.date_of_birth}
            handleChange={handleChange}
            className="form-control form-control-md"
          />
        </div>
      </div>
      <div className="form-group row">
        <label className="col-md-3 col-form-label">Joining date:</label>
        <div className="col-md-9">
          <Input
            name="joining_date"
            value={inputs.joining_date}
            handleChange={handleChange}
            className="form-control form-control-md"
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
            label="Update"
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

export default EditEmployee;
