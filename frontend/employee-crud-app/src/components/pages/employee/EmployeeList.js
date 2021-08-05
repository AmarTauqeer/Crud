import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router";
import Button from "../../Button";
import ReactPaginate from "react-paginate";
import Input from "../../Input";

const EmployeeList = (props) => {
  const history = useHistory();

  const [departments, setDepartments] = useState([]);
  const [employees, setEmployees] = useState([]);

  const [pageNumber, setPageNumber] = useState(0);

  const [searchTerms, setSearchTerms] = useState("");
  const [searchResults, setSearchResults] = React.useState([]);

  const employeesPerPage = 5;
  const pagesVisited = pageNumber * employeesPerPage;

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/all_employee/").then((res) => {
      if (res) {
        //console.log(res.data);
        setEmployees(res.data);
      }
    });
    // get departments
    // get department name
    axios.get("http://127.0.0.1:8000/all_department/").then((response) => {
      setDepartments(response.data);
    });
  }, []);

  const handleChange = (e) => {
    setSearchTerms(e.target.value);

    if (searchTerms) {
      const results = employees.filter((emp) =>
        emp.employee_name.toLowerCase().includes(searchTerms)
      );
      setSearchResults(results);
    }
  };

  const handleAdd = () => {
    history.push({
      pathname: "/add_employee/",
    });
  };

  const editHandleClick = (id) => {
    //console.log(id);
    history.push({
      pathname: "/update_employee/" + id,
    });
  };

  const handleDelete = (id) => {
    axios.delete("http://127.0.0.1:8000/delete_employee/" + id).then((res) => {
      if (res) {
        window.location.reload();
      }
    });
  };

  let employee = [];
  if (searchTerms) {
    employee = searchResults;
  } else {
    employee = employees;
  }
  const displayEmployees = employee
    .slice(pagesVisited, pagesVisited + employeesPerPage)
    .map((emp, index) => {
      return (
        <div className="row" key={index}>
          <div className="col-md-2">{emp.employee_name}</div>
          <div className="col-md-2">
            {departments
              .filter((dpt) => dpt.id === emp.department)
              .map((filteredName) => (
                <div key={filteredName.id}>{filteredName.department_name}</div>
              ))}
          </div>
          <div className="col-md-1">{emp.date_of_birth}</div>
          <div className="col-md-2">{emp.address}</div>
          <div className="col-md-2">{emp.phone}</div>
          <div className="col-md-3">
            <Button
              type="button"
              className="btn btn-primary btn-sm m-1"
              label="Edit"
              onClick={(e) => editHandleClick(emp.id)}
            />
            <Button
              type="button"
              className="btn btn-danger btn-sm m-1"
              label="Delete"
              onClick={(e) => handleDelete(emp.id)}
            />
          </div>
        </div>
      );
    });

  const pageCount = Math.ceil(employees.length / employeesPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  return (
    <div>
      <h6>Employee</h6>
      <hr />
      <div className="row">
        <div className="col-md-1">
          {localStorage.getItem("user_name") && (
            <Button
              type="button"
              className="btn btn-success btn-sm"
              onClick={handleAdd}
              label="Add"
            />
          )}
        </div>
      </div>
      <br />
      <div className="row">
        <div className="col-md-2">
          <label>Search:</label>
        </div>
        <div className="col-md-5">
          <Input
            type="text"
            className="form-control form-control-md"
            handleChange={handleChange}
            placeholder="Enter employee name"
            value={searchTerms}
          />
        </div>
      </div>
      <br />
      <div className="row">
        <div
          className="col-md-2"
          style={{ fontWeight: "bold", fontStyle: "italic" }}
        >
          Emp.Name
        </div>

        <div
          className="col-md-2"
          style={{ fontWeight: "bold", fontStyle: "italic" }}
        >
          Department
        </div>
        <div
          className="col-md-1"
          style={{ fontWeight: "bold", fontStyle: "italic" }}
        >
          Dob
        </div>
        <div
          className="col-md-2"
          style={{ fontWeight: "bold", fontStyle: "italic" }}
        >
          Address
        </div>
        <div
          className="col-md-2"
          style={{ fontWeight: "bold", fontStyle: "italic" }}
        >
          Phone
        </div>

        <div
          className="col-md-3"
          style={{ fontWeight: "bold", fontStyle: "italic" }}
        >
          Actions
        </div>
      </div>
      <br />
      {localStorage.getItem("user_name") && displayEmployees}
      <br />
      <ReactPaginate
        previousLabel={"Previous"}
        nextLabel={"Next"}
        pageCount={pageCount}
        onPageChange={changePage}
        containerClassName={"paginationBttns"}
        previousLinkClassName={"previousBttn"}
        nextLinkClassName={"nextBttn"}
        disabledClassName={"paginationDisabled"}
        activeClassName={"paginationActive"}
      />
    </div>
  );
};

export default EmployeeList;
