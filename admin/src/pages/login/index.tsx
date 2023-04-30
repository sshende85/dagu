import React, { FormEvent, useContext } from "react";
import { withRouter } from "../../utils/with-router";
import AuthService from "../../services/auth.service";
import { SnackBarContext } from "../../contexts/SnackBarContext";
import { Box, Button, TextField } from "@mui/material";
import logo from "../../assets/images/proconnect-logo.png";
class Login extends React.Component<{}, { formData: { username: string, password: string } }> {
  static contextType = SnackBarContext;
   public snackbar: any;
   constructor(public props: any) {
        super(props)
        this.state = { formData: { username: "", password: "" } };
       // this.snackbar = useContext(SnackBarContext);
    }
    onDataChange = (e)=>{
      let cloudProviderForm = document.getElementById("loginForm") as HTMLFormElement;
      if (cloudProviderForm) {
        let formData = new FormData(cloudProviderForm);
        let username = formData.get('username');
        let password = formData.get('password');
        let usernameValue = username ? username.toString() : "";
        let passwordValue = password ? password.toString() : "";
        this.setState({
          formData: {
            username: usernameValue,
            password: passwordValue
          }
        })
      }
    }
    login = async(e: FormEvent<HTMLFormElement>)=>{
      e.preventDefault();
      let response: Response = await AuthService.login(this.state.formData);
      let responseBody: any = await response.json();
      switch (response.status) {
        case 401:
           this.snackbar.setSnackbar({ message: responseBody['Response_Body']["Authentication_status"], severity: "error", isOpen: true });
          break;
        case 200:
           localStorage.setItem("loginResponse", JSON.stringify(responseBody['Response_Body']));
           this.snackbar.setSnackbar({ message: responseBody['Response_Body']["Authentication_status"], severity: "success", isOpen: true });
           this.props.router.navigate("/dashboard/add-aws-account");
          break;
        default:
          break;
      }
    }
  render(): React.ReactNode {
       this.snackbar = this.context;
        return (
            <Box
    display="flex"
    justifyContent="center"
    alignItems="center"
                minHeight="100vh"
                sx={{
                     backgroundColor:"#637d63"
                }}   
>
    <Box
          component="form"
          sx={{
              'width': '500px',
              'maxWidth': '100%',
              'border': 1,
              'padding': '20px',
              backgroundColor:"white"
            }}
          noValidate
          autoComplete="off"
          onInput={this.onDataChange}
          id="loginForm"
          onSubmit={this.login}
                >
        <div className="form-control" style={{ textAlign: "center" }}>
            <div style={{ maxWidth:"200px", maxHeight:"100px", display: "inline-block"}}>
                <img src={logo} style={{ width: "100%", height: "100%" }} />
            </div>
        </div>
        <div className="form-control">
                <TextField
              fullWidth
              variant="standard"
              id="username"
              name="username"
              type="text"
              label="Username"
              value= {this.state.formData.username}
              required
                />
                   
        </div>
        <div className="form-control">
                <TextField
              fullWidth
              variant="standard"
              id="password"
              name="password"
              type="password"
              label="Password"
              
              value={this.state.formData.password}
              required
            />
            </div>
            <div className="form-control">
                <Button type="submit" variant="contained" fullWidth style={{height:"52px"}}>Login</Button>
            </div>
        </Box>
  </Box>   
        )
    }
}

export default withRouter(Login);