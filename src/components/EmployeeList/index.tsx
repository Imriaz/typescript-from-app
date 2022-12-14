import { makeStyles } from "@material-ui/core";
import React, { useRef} from "react";
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
  searchInputForm: {
    display: "flex",
    justifyContent: "left",
  },
  searchInput: {
    width: "50%",
  },
  table: {
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

  const [searchText, setSearchText] = React.useState<string>("");
  const [searchEmployee, setSearchEmployee] = React.useState<Employee[]>([]);
  const [searching, setSearching] = React.useState<boolean>(false);
  const [edit, setEdit] = React.useState<boolean>(false);
  const [editFirstName, setEditFirstName] = React.useState<string>("");
  const [editLastName, setEditLastName] = React.useState<string>("");

  /** 
       This Method for update the employee name field
      */
  const handleEdit = (e: React.FormEvent, employeeID: string) => {
    e.preventDefault();
    setEmployees((prev) =>
      prev.map((employee) =>
        employee.employeeID === employeeID
          ? {
              ...employee,
              firstName: editFirstName,
              lastName: editLastName,
            }
          : employee
      )
    );
    setEdit(false);
  };

  /** 
       This Method for change the edit button state from edit to Update
      */
  const editButtonHandler = (e: React.FormEvent) => {
    e.preventDefault();
    setEdit(true);
  };

  /** 
       This Method for search Employee on the list
      */
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearching(true);
    const findEmployee = employees.filter(
      (employee) =>
        employee.firstName.toLowerCase().includes(searchText.toLowerCase()) ||
        employee.lastName.toLowerCase().includes(searchText.toLowerCase())
    );
    setSearchEmployee(findEmployee);
  };

  /** 
       This Method for Delete Employee on the list
      */
  const handleDelete = (employeeID: string) => {
    setEmployees((prev) =>
      prev.filter((employee) => employee.employeeID !== employeeID)
    );
  };

  return (
    <React.Fragment>
      <div>
        <h1>Employee</h1>
        <div className={classes.employeeAddAndSearch}>
          <form
            className={classes.searchInputForm}
            onSubmit={(e) => {
              handleSearch(e);
              inputRef.current?.blur();
            }}
          >
            <input
              type="input"
              placeholder="Enter Name for Search"
              className={classes.searchInput}
              ref={inputRef}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </form>
          <Link to={`/Add`}>
            <button className={classes.button}>Add Employee</button>
          </Link>
        </div>
        <div className="row">
          <table className={classes.table}>
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
            {searching ? (
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
                        {edit ? (
                          <input
                            value={editFirstName}
                            onChange={(e) => setEditFirstName(e.target.value)}
                          />
                        ) : (
                          <span>{employee?.firstName}</span>
                        )}
                      </td>
                      <td className={classes.table__td__th}>
                        {edit ? (
                          <input
                            value={editLastName}
                            onChange={(e) => setEditLastName(e.target.value)}
                          />
                        ) : (
                          <span>{employee?.lastName}</span>
                        )}
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
                      <td className={classes.table__td__th}>
                        {!edit ? (
                          <button
                            className={classes.button}
                            onClick={editButtonHandler}
                          >
                            Edit
                          </button>
                        ) : (
                          <button
                            className={classes.button}
                            onClick={(e) => handleEdit(e, employee.employeeID)}
                          >
                            Update
                          </button>
                        )}
                        <button
                          onClick={() => handleDelete(employee?.employeeID)}
                          className={classes.delete__button}
                        >
                          Delete
                        </button>
                      </td>
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
                        {edit ? (
                          <input
                            value={editFirstName}
                            onChange={(e) => setEditFirstName(e.target.value)}
                          />
                        ) : (
                          <span>{employee?.firstName}</span>
                        )}
                      </td>
                      <td className={classes.table__td__th}>
                        {edit ? (
                          <input
                            value={editLastName}
                            onChange={(e) => setEditLastName(e.target.value)}
                          />
                        ) : (
                          <span>{employee?.lastName}</span>
                        )}
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
                      <td className={classes.table__td__th}>
                        {!edit ? (
                          <button
                            className={classes.button}
                            onClick={editButtonHandler}
                          >
                            Edit
                          </button>
                        ) : (
                          <button
                            className={classes.button}
                            onClick={(e) => handleEdit(e, employee.employeeID)}
                          >
                            Update
                          </button>
                        )}
                        <button
                          onClick={() => handleDelete(employee?.employeeID)}
                          className={classes.delete__button}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  </tbody>
                ))}
              </>
            )}
          </table>
        </div>
      </div>
    </React.Fragment>
  );
};

export default EmployeeList;
