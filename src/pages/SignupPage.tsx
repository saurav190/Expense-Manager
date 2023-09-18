import React, { useState } from "react";
import "../assets/css/singuppage.css";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { signUpInfo } from "../redux/features/useAuth/userSlice";
import { Link, useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import Grid from "@mui/material/Grid";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InputAdornment from "@mui/material/InputAdornment"; 
import IconButton from "@mui/material/IconButton"; 

interface SignUpFormValues {
  username: string;
  email: string;
  password: string;
  confirm_password: string;
}
interface User {
  username: string;
  email: string;
  password: string;
}

const SignUp: React.FC = () => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

 
  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };

  const validationSchema = yup.object({
    username: yup
      .string()
      .required("Username is required")
      .matches(/^[A-Za-z]*$/, "Username can only contain letters")
      .min(4, "Username must be at least 4 characters long"),
    email: yup
      .string()
      .email("Invalid email")
      .required("Email is required")
      .matches(
        /^[A-Za-z0-9._%+-]+@(gmail|yahoo|outlook)\.(com|in|org)$/,
        "Invalid email format or domain"
      ),
    password: yup
      .string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters")
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+}{":;'?/>.<,|~`[\]\\[=-]).{8,}$/,
        "Password must contain at least one letter, one number, and one special character"
      ),
    confirm_password: yup
      .string()
      .oneOf([yup.ref("password")], "Passwords must match")
      .required("Confirm Password is required"),
  });

  const formik = useFormik<SignUpFormValues>({
    initialValues: {
      username: "",
      email: "",
      password: "",
      confirm_password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      dispatch(signUpInfo(values));
      const existingUsers: User[] = JSON.parse(
        localStorage.getItem("usersData") || "[]"
      );
      const newUser = {
        username: values.username,
        email: values.email,
        password: values.password,
        confirm_password: values.confirm_password,
      };
      const emailExists = existingUsers.some(
        (user) => user.email === values.email
      );
      if (emailExists) {
        formik.setFieldError("email", "Email already exists");
      } else {
        existingUsers.push(newUser);
        localStorage.setItem("usersData", JSON.stringify(existingUsers));
        dispatch(signUpInfo(values));
        setSnackbarOpen(true);

        setTimeout(() => {
          navigate("/login");
        }, 1000);
      }
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    formik.handleChange(e);
    formik.setFieldTouched(e.target.name, true, false);
  };

  return (
    <div className="flex-center">
      <div className="signup-container">
        <h2 className="form-title">SIGNUP</h2>
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                className={`form-input ${
                  formik.touched.username && formik.errors.username
                    ? "error"
                    : ""
                }`}
                fullWidth
                id="username"
                name="username"
                label="Username"
                variant="outlined"
                margin="normal"
                value={formik.values.username}
                onChange={handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.username && Boolean(formik.errors.username)
                }
                helperText={
                  formik.touched.username && formik.errors.username
                    ? formik.errors.username
                    : " "
                }
                InputProps={{
                  startAdornment: <AccountCircleIcon />,
                }}
                autoComplete="on"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                className={`form-input ${
                  formik.touched.email && formik.errors.email ? "error" : ""
                }`}
                fullWidth
                id="email"
                name="email"
                label="Email"
                variant="outlined"
                margin="normal"
                value={formik.values.email}
                onChange={handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={
                  formik.touched.email && formik.errors.email
                    ? formik.errors.email
                    : " "
                }
                InputProps={{
                  startAdornment: <EmailIcon />,
                }}
                autoComplete="on"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                className={`form-input ${
                  formik.touched.password && formik.errors.password
                    ? "error"
                    : ""
                }`}
                fullWidth
                id="password"
                name="password"
                label="Password"
                type={passwordVisible ? "text" : "password"}
                variant="outlined"
                margin="normal"
                value={formik.values.password}
                onChange={handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                helperText={
                  formik.touched.password && formik.errors.password
                    ? formik.errors.password
                    : " "
                }
                InputProps={{
                  startAdornment: <LockIcon />,
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={togglePasswordVisibility}>
                        {passwordVisible ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                autoComplete="new-password"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                className={`form-input ${
                  formik.touched.confirm_password &&
                  formik.errors.confirm_password
                    ? "error"
                    : ""
                }`}
                fullWidth
                id="confirm_password"
                name="confirm_password"
                label="Confirm Password"
                type={confirmPasswordVisible ? "text" : "password"}
                variant="outlined"
                margin="normal"
                value={formik.values.confirm_password}
                onChange={handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.confirm_password &&
                  Boolean(formik.errors.confirm_password)
                }
                helperText={
                  formik.touched.confirm_password &&
                  formik.errors.confirm_password
                    ? formik.errors.confirm_password
                    : " "
                }
                InputProps={{
                  startAdornment: <LockIcon />,
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={toggleConfirmPasswordVisibility}>
                        {confirmPasswordVisible ? (
                          <Visibility/>
                        ) : (
                          <VisibilityOff />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                autoComplete="on"
              />
            </Grid>
          </Grid>
          {formik.status && <Alert severity="error">{formik.status}</Alert>}
          <Button
            type="submit"
            variant="contained"
            className="signup-button"
            fullWidth
          >
            Sign Up
          </Button>
          <div className="login-link-container">
            <Link to="/login" className="login-link">
              Already Have an Account? Login Here
            </Link>
          </div>
        </form>
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={() => setSnackbarOpen(false)}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
        >
          <MuiAlert
            elevation={6}
            variant="filled"
            onClose={() => setSnackbarOpen(false)}
            severity="success"
            style={{ backgroundColor: "#134e4a" }}
          >
            Sign up successful! You can now login.
          </MuiAlert>
        </Snackbar>
      </div>
    </div>
  );
};

export default SignUp;
