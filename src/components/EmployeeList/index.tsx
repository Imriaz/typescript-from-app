import { makeStyles } from "@material-ui/core";
import { Table } from "@mui/material";
import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Employee } from "../../model/model";

interface EmployeeListProps {
  employees: Employee[];
  setEmployees: React.Dispatch<React.SetStateAction<Employee[]>>;
}

const useStyles = makeStyles({
  employeeAddAndSearch: {
    display: "grid",
    gridTemplateColumns: "900px 200px",
    gap: "50px",
    padding: "10px",
  },
  searchInput: {
    color: "black",
    backgroundColor: "#27AE60",
  },
  table: {
    // border: "1px solid black",
    borderCollapse: "collapse",
    width: "100%",
  },
  table__td__th: {
    textAlign: "center",
    border: "1px solid gray",
    padding: "8px",
    "&:hover": {
      backgroundColor: "transparent",
      border: "2px solid #27AE60",
    },
  },
  button: {
    padding: "5px",
    color: "black",
    backgroundColor: "#27AE60",
    border: "1px solid gray",
    borderRadius: "5px",
    width: "70px",
  },
  delete__button: {
    padding: "5px",
    color: "black",
    border: "1px solid gray",
    // backgroundColor: "#27AE60",
    backgroundColor: "rgba(255, 0, 0, 0.8)",
    borderRadius: "5px",
    width: "70px",
    marginLeft: "5px",
    "&:hover": {
      border: "2px solid rgba(255, 0, 0, 0.8)",
    },
  },
});

const EmployeeList = ({ employees, setEmployees }: EmployeeListProps) => {
  const classes = useStyles();
  const inputRef = useRef<HTMLInputElement>(null);

  const [searchText, setSearchText] = useState<string>("");
  const [searchEmployee, setSearchEmployee] = React.useState<Employee[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  /** 
       @handleSearch Method for search Employee on the list
      */
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearching(true);
    // console.log(searchText);
    const findEmployee = employees.filter(
      (employee) =>
        employee.firstName.toLowerCase().includes(searchText.toLowerCase()) ||
        employee.lastName.toLowerCase().includes(searchText.toLowerCase())
    );
    setSearchEmployee(findEmployee);
    // setSearchText("");
  };

  /** 
       @handleDelete Method for Delete Employee on the list
      */
  // const handleDelete = (employeeID) => {
  //   console.log("employeeID", employeeID);
  //   const updatedEmployee = employees.filter((employee) => employee.employeeID !== employeeID);
  //   setEmployees(updatedEmployee);
  // };

  return (
    <React.Fragment>
      <div>
        <h1 className="">
          <span className="">Employee</span>
        </h1>
        <div className={classes.employeeAddAndSearch}>
          <form
            className="searchInput"
            onSubmit={(e) => {
              handleSearch(e);
              inputRef.current?.blur();
            }}
          >
            <input
              type="input"
              placeholder="Enter Name for Search"
              className="input__box"
              ref={inputRef}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </form>
          <Link to={`/Add`}>
            <button className={classes.button}>Add Employee</button>
          </Link>
        </div>
        <div className="row">
          <Table className={classes.table}>
            <thead>
              <tr>
                <th className={classes.table__td__th}>
                  <input type="checkbox" />
                </th>
                <th className={classes.table__td__th}>Sl No</th>
                <th className={classes.table__td__th}>Employee ID</th>
                <th className={classes.table__td__th}>First Name</th>
                <th className={classes.table__td__th}>Last Name</th>
                <th className={classes.table__td__th}>Company</th>
                <th className={classes.table__td__th}>Designation</th>
                <th className={classes.table__td__th}>Email</th>
                <th className={classes.table__td__th}>Action</th>
              </tr>
            </thead>
            {isSearching ? (
              <>
                {searchEmployee?.map((employee, index) => (
                  <tbody>
                    <tr>
                      <td className={classes.table__td__th}>
                        {<input type="checkbox" />}
                      </td>
                      <td className={classes.table__td__th}>{index + 1}</td>
                      <td className={classes.table__td__th}>
                        {employee?.employeeID}
                      </td>
                      <td className={classes.table__td__th}>
                        {employee?.firstName}
                      </td>
                      <td className={classes.table__td__th}>
                        {employee?.lastName}
                      </td>
                      <td className={classes.table__td__th}>
                        {employee?.company}
                      </td>
                      <td className={classes.table__td__th}>
                        {employee?.designation}
                      </td>
                      <td className={classes.table__td__th}>
                        {employee?.email}
                      </td>

                      <button
                        // onClick={() => "handleEdit(employee?.employeeID)"}
                        className={classes.button}
                      >
                        Edit
                      </button>
                      <button
                        // onClick={() => handleDelete(employee?.employeeID)}
                        className={classes.delete__button}
                      >
                        Delete
                      </button>
                    </tr>
                  </tbody>
                ))}
              </>
            ) : (
              <>
                {employees?.map((employee, index) => (
                  <tbody>
                    <tr>
                      <td className={classes.table__td__th}>
                        {<input type="checkbox" />}
                      </td>
                      <td className={classes.table__td__th}>{index + 1}</td>
                      <td className={classes.table__td__th}>
                        {employee?.employeeID}
                      </td>
                      <td className={classes.table__td__th}>
                        {employee?.firstName}
                      </td>
                      <td className={classes.table__td__th}>
                        {employee?.lastName}
                      </td>
                      <td className={classes.table__td__th}>
                        {employee?.company}
                      </td>
                      <td className={classes.table__td__th}>
                        {employee?.designation}
                      </td>
                      <td className={classes.table__td__th}>
                        {employee?.email}
                      </td>

                      <button
                        // onClick={() => handleEdit(employee?.employeeID)}
                        className={classes.button}
                      >
                        Edit
                      </button>
                      <button
                        // onClick={() => handleDelete(employee?.employeeID)}
                        className={classes.delete__button}
                      >
                        Delete
                      </button>
                    </tr>
                  </tbody>
                ))}
              </>
            )}
          </Table>
        </div>
      </div>
    </React.Fragment>
  );
};

export default EmployeeList;
