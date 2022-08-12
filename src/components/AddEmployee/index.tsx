import React from "react";
import { makeStyles, TextField } from "@material-ui/core";
import { Link, useParams } from "react-router-dom";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { formDataType } from "../Homepage";
import { ErrorType } from "../Homepage";

const designations = [
  {
    value: "Trainee Software Engineer",
    title: "Trainee Software Engineer",
  },
  {
    value: "Software Engineer",
    title: "Software Engineer",
  },
  {
    value: "Senior Software Engineer",
    title: "Senior Software Engineer",
  },
];

type DemoFormProps = {
  data: formDataType;
  setData: React.Dispatch<React.SetStateAction<formDataType>>;
  errors: ErrorType;
  setErrors: React.Dispatch<React.SetStateAction<ErrorType>>;
  handleSubmit: (e: React.FormEvent) => void;
};

const useStyles = makeStyles({
  form: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "50px",
    backgroundColor: "#F5EEF8",
    padding: "20px 100px",
    border: "2px solid black",
    borderRadius: "10px",
    margin: "20px 150px",
  },
  formGroup: {
    gap: "10px",
    padding: "10px",
  },
  form__back__button: {
    padding: "5px",
    color: "black",
    backgroundColor: "#27AE60",
    borderRadius: "5px",
    width: "100px",
    margin: "15px",
    marginLeft: "580px",
  },
  form__submit__button: {
    padding: "5px",
    color: "black",
    backgroundColor: "#27AE60",
    borderRadius: "5px",
    width: "100px",
    margin: "15px",
    marginRight: "580px",
  },
  errorMessage: {
    Color: "red",
    padding: "10px",
  },
});

const AddEmployee: React.FC<DemoFormProps> = (props) => {
  const { employeeID } = useParams<{ employeeID: string }>();
  const classes = useStyles();
  const emailRegex = "[^ ]+@[^ ]+.[a-z]{2,3}";

  // ============================== Methods =========================

  /** 
       This Method for get all change on the Input Field
      */
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    props.setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });

    props.setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  /** 
       This Method for validation on the Input Field
      */
  const isValid = () => {
    let hasError = false;
    const copyErrors: ErrorType = { ...props.errors };

    const validationFields = ["firstName", "email"];

    for (let key in copyErrors) {
      if (
        validationFields.includes(key) &&
        props.data[key as keyof typeof props.data] === ""
      ) {
        copyErrors[key] = "required";
        hasError = true;
      } else {
        copyErrors[key] = ``;
      }
    }

    props.setErrors(copyErrors);

    return hasError;
  };

  const fetchDetails = () => {
    // get details data and set like setData(response)
  };

  //========================== Effects ========================

  React.useEffect(() => {
    if (employeeID) {
      fetchDetails();
    }
  }, [employeeID]);

  return (
    <React.Fragment>
      <h1>Add Employee</h1>
      <form onSubmit= {(e) => {
        if (isValid()) return;
        props.handleSubmit(e)}}>
        <Link to={`/`}>
          <button className={classes.form__back__button}>Back</button>
        </Link>
        <div className={classes.form}>
          <div className={classes.formGroup}>
            <TextField
              label="Employee ID"
              name="employeeID"
              value={props.data.employeeID}
              required={true}
              onChange={handleChange}
              helperText={props.errors.employeeID}
              error={Boolean(props.errors.employeeID)}
            />
          </div>
          <div className={classes.formGroup}>
            <TextField
              label="First Name"
              name="firstName"
              value={props.data.firstName}
              required={true}
              onChange={handleChange}
              helperText={props.errors.firstName}
              error={Boolean(props.errors.firstName)}
            />
          </div>

          <div className={classes.formGroup}>
            <TextField
              label="Last Name"
              name="lastName"
              value={props.data.lastName}
              required={true}
              onChange={handleChange}
              helperText={props.errors.lastName}
              error={Boolean(props.errors.lastName)}
            />
          </div>

          <div className={classes.formGroup}>
            <TextField
              label="Company"
              name="company"
              value={props.data.company}
              required={true}
              onChange={handleChange}
              helperText={props.errors.company}
              error={Boolean(props.errors.company)}
            />
          </div>

          <div className={classes.formGroup}>
            <Autocomplete
              id="designation"
              options={designations}
              getOptionLabel={(option: any) => option.title}
              style={{ width: 300 }}
              onChange={(e, value: any) => {
                props.setData((prev) => {
                  return {
                    ...prev,
                    designation: value?.value,
                  };
                });
              }}
              renderInput={(params: any) => (
                <TextField {...params} label="Designation" />
              )}
            />
          </div>

          <div className={classes.formGroup}>
            <TextField
              label="Email"
              name="email"
              value={props.data.email}
              required={true}
              helperText={props.errors.email}
              error={Boolean(props.errors.email)}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                if (event.target.value.match(emailRegex)) {
                  handleChange(event);
                }
              }}
            />
          </div>
        </div>
        <input
          type="submit"
          id="submit"
          value="Submit"
          className={classes.form__submit__button}
        />
      </form>
    </React.Fragment>
  );
};

export default AddEmployee;
