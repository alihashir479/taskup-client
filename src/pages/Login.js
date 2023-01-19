import { Formik } from "formik";
import * as Yup from "yup";
import Dropzone from "react-dropzone";
import { Box, TextField, Typography , Button , useMediaQuery } from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { useState } from "react";
import axiosInstance from "../services/api";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setLogin } from "../Redux/UserSlice";

const initialRegisterValues = {
  name: "",
  email: "",
  password: "",
  picture: "",
};

const initalLoginValues = {
  email: "",
  password: "",
};

const registerSchema = Yup.object().shape({
  name: Yup.string().required("Required"),
  email: Yup.string().email("Not valid").required("Required"),
  password: Yup.string().required("Required"),
});

const loginSchema = Yup.object().shape({
  email: Yup.string().email("Not valid").required("Required"),
  password: Yup.string().required("Required"),
});

const Login = () => {
  const [page, setPage] = useState("login");
  const isRegister = page === "register";
  const isLogin = page === "login";
  const isNotMobile = useMediaQuery("(min-width: 768px)")
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleRegisterForm = (values, onSubmitProps) => {
   let formData = new FormData()
   for(const property of Object.keys(values)) {
    formData.append(property , values[property])
   }
   axiosInstance.post('/auth/register' , formData).then((res) => {
    onSubmitProps.resetForm()
    setPage('login')
   })
  }

  const handleLoginForm = (values , onSubmitProps) => {
   axiosInstance.post('/auth/login' , values).then((res)=> {
    onSubmitProps.resetForm()
    dispatch(setLogin(res.data.user))
    navigate('/home')
   })
  }

  const handleForm = (values, onSubmitProps) => {
    if(isLogin) handleLoginForm(values,onSubmitProps)
    if(isRegister) handleRegisterForm(values,onSubmitProps)
  };

  return (
    <Formik
      initialValues={isLogin ? initalLoginValues : initialRegisterValues}
      validationSchema={isLogin ? loginSchema : registerSchema}
      onSubmit={handleForm}
    >
      {({
        handleSubmit,
        handleBlur,
        touched,
        setFieldValue,
        resetForm,
        values,
        handleChange,
        errors,
      }) => (
        <Box p="2rem 0" m="2rem auto" width={isNotMobile ? "50%" : "90%"}>
        <Typography textAlign="center" mb="2rem">Welcome to Taskup</Typography>
        <form onSubmit={handleSubmit}>
          <Box display="flex" flexDirection="column" gap="30px">
            {isRegister && (
              <>
                <TextField
                  label="Enter Name"
                  name="name"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={Boolean(touched.name) && Boolean(errors.name)}
                  helperText={touched.name && errors.name}
                />
                <Dropzone
                  multiple={false}
                  acceptedFiles=".jpg , .png"
                  onDrop={(acceptedFiles) => {
                    setFieldValue("picture", acceptedFiles[0]);
                  }}
                >
                  {({ getRootProps, getInputProps }) => (
                    <Box
                      {...getRootProps()}
                      p="1rem"
                      border="2px solid #000"
                      textAlign="center"
                      sx={{
                        "&:hover": {
                            "cursor": "pointer"
                        }
                      }}
                    >
                      <input {...getInputProps()} />
                      {!values.picture ? (
                        <Typography>Add picture</Typography>
                      ) : (
                        <Typography>
                          {values.picture.name} <EditOutlinedIcon />
                        </Typography>
                      )}
                    </Box>
                  )}
                </Dropzone>
              </>
            )}
            <TextField
              label="Enter Email"
              name="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              error={Boolean(touched.email) && Boolean(errors.email)}
              helperText={touched.email && errors.email}
            />

            <TextField
              label="Enter Password"
              name="password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              error={Boolean(touched.password) && Boolean(errors.password)}
              helperText={touched.password && errors.password}
            />
            <Button type="submit" m="2rem 0" p="1rem 0" background="#00D5FA">{isLogin ? "Login" : "Register"}</Button>
            <Typography onClick={()=> {setPage(isLogin ? "register" : "login"); resetForm()}} variant="h6" textAlign="center" sx={{
                "&:hover": {
                    cursor: "pointer"
                }
            }}>
                {isLogin ? (
                  <>Not a user, go to Register</>
                ) : 
                (
                 <>Already a user, go to Login</>
                )
                }
            </Typography>
          </Box>
        </form>
        </Box>
      )}
    </Formik>
  );
};

export default Login;
