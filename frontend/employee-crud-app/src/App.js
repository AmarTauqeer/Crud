import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";

import AddDepartment from "./components/pages/department/AddDepartment";
import DepartmentList from "./components/pages/department/DepartmentList";
import EditDepartment from "./components/pages/department/EditDepartment";

import EmployeeList from "./components/pages/employee/EmployeeList";
import AddEmployee from "./components/pages/employee/AddEmployee";
import EditEmployee from "./components/pages/employee/EditEmployee";
import Header from "./components/navigation/Header";
import Footer from "./components/navigation/Footer";
import Menu from "./components/navigation/Menu";
import Home from "./components/pages/Home";

function App() {
  return (
    <div className="container">
      <Router>
        <Header />
        <div className="row mt-1">
          <div className="col-md-3">
            <Menu />
          </div>
          <div className="col-md-9">
            <br />
            <div>
              <Route exact path="/" component={Home} />

              <Route exact path="/all_department" component={DepartmentList} />
              <Route exact path="/add_department" component={AddDepartment} />
              <Route
                exact
                path="/update_department/:id"
                component={EditDepartment}
              />

              <Route exact path="/all_employee" component={EmployeeList} />
              <Route exact path="/add_employee" component={AddEmployee} />
              <Route
                exact
                path="/update_employee/:id"
                component={EditEmployee}
              />
            </div>
            <hr />
          </div>
        </div>

        <Footer />
      </Router>
    </div>
  );
}

export default App;
