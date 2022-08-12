import React from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { Employee } from "../../model/model";
import AddEmployee from "../AddEmployee";
import EmployeeList from "../EmployeeList";
import NotFound from "../NotFound";

type formDataType = {
  employeeID: string;
  firstName: string;
  lastName: string;
  company: string;
  designation: string;
  email: string;
};
const formData: formDataType = {
  employeeID: "",
  firstName: "",
  lastName: "",
  company: "",
  designation: "",
  email: "",
};

type ErrorType = {
  [key: string]: string;
};

const initialError: ErrorType = {
  employeeID: "",
  firstName: "",
  lastName: "",
  company: "",
  designation: "",
  email: "",
};

const Homepage = () => {
  const [employees, setEmployees] = React.useState<Employee[]>([]);
  const [data, setData] = React.useState<formDataType>(formData);
  const [errors, setErrors] = React.useState(initialError);

  const navigation = useNavigate();

  /** 
       This Method to Add Employee on the state
      */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setEmployees((prev)=>[
        ...prev,
        {
          employeeID: data.employeeID,
          firstName: data.firstName,
          lastName: data.lastName,
          company: data.company,
          designation: data.designation,
          email: data.email,
        },
      ]);
      setData({
        employeeID: "",
        firstName: "",
        lastName: "",
        company: "",
        designation: "",
        email: "",
      });
      navigation("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            <EmployeeList employees={employees} setEmployees={setEmployees} />
          }
        />
        <Route
          path="/add"
          element={
            <AddEmployee
              handleSubmit={handleSubmit}
              data={data}
              setData={setData}
              errors={errors}
              setErrors={setErrors}
            />
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default Homepage;
