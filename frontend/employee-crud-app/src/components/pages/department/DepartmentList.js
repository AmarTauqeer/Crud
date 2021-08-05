import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router";
import Button from "../../Button";
import ReactPaginate from "react-paginate";
import Input from "../../Input";

const DepartmentList = (props) => {
  const history = useHistory();
  const [departments, setDepartments] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);

  const [searchTerms, setSearchTerms] = useState("");
  const [searchResults, setSearchResults] = React.useState([]);

  const departmentsPerPage = 5;
  const pagesVisited = pageNumber * departmentsPerPage;
  useEffect(() => {
    axios.get("http://127.0.0.1:8000/all_department/").then((res) => {
      if (res) {
        setDepartments(res.data);
      }
    });
  }, []);

  const handleChange = (e) => {
    setSearchTerms(e.target.value);

    if (searchTerms) {
      const results = departments.filter((dept) =>
        dept.department_name.toLowerCase().includes(searchTerms)
      );
      setSearchResults(results);
    }
  };

  const handleAdd = () => {
    history.push({
      pathname: "/add_department",
    });
  };

  const editHandleClick = (id) => {
    //console.log(id);
    history.push({
      pathname: "/update_department/" + id,
    });
  };

  const handleDelete = (id) => {
    axios
      .delete("http://127.0.0.1:8000/delete_department/" + id)
      .then((res) => {
        if (res) {
          console.log(res.data);
          window.location.reload();
        }
      });
  };

  let dept = [];
  if (searchTerms) {
    dept = searchResults;
  } else {
    dept = departments;
  }
  const displayDepartments = dept
    .slice(pagesVisited, pagesVisited + departmentsPerPage)
    .map((dpt, index) => {
      return (
        <div className="row" key={index}>
          <div className="col-md-2">{dpt.department_name}</div>
          <div className="col-md-5">{dpt.description}</div>
          <div className="col-md-3">
            <Button
              type="button"
              className="btn btn-primary btn-sm m-1"
              label="Edit"
              onClick={(e) => editHandleClick(dpt.id)}
            />
            <Button
              type="button"
              className="btn btn-danger btn-sm m-1"
              label="Delete"
              onClick={(e) => handleDelete(dpt.id)}
            />
          </div>
        </div>
      );
    });

  const pageCount = Math.ceil(departments.length / departmentsPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  return (
    <div>
      <h6>Department</h6>
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
            placeholder="Enter department name"
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
          Dept.Name
        </div>

        <div
          className="col-md-5"
          style={{ fontWeight: "bold", fontStyle: "italic" }}
        >
          Description
        </div>
        <div
          className="col-md-3"
          style={{ fontWeight: "bold", fontStyle: "italic" }}
        >
          Actions
        </div>
      </div>
      <br />
      {localStorage.getItem("user_name") && displayDepartments}
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

export default DepartmentList;
