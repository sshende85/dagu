import { Alert, Button, Snackbar} from "@mui/material";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import React, { useEffect } from "react";
import { CloudProviderService } from "../../services/cloudprovider.service";
import Title from "../../components/atoms/Title";
import { withRouter } from "../../utils/with-router";
import { SnackBarContext } from "../../contexts/SnackBarContext";

class AddAwsAccount extends React.Component<{}, {
  formData: {
    cloud_provider: string,
    access_key: string,
    secret_access_key: string
  },
  isSaving: boolean,
  isAwsAccountConfigured:boolean
}> {
  static contextType?: React.Context<any> | undefined = SnackBarContext;
  public snackbar:any;
  cloudProviderService = new CloudProviderService();
  constructor(public props:any) {
    super(props);
    this.state = {
      formData: {
        cloud_provider: "aws",
        access_key: "",
        secret_access_key: ""
      },
      isSaving: false,
      isAwsAccountConfigured: localStorage.getItem("isAwsAccountConfigured") === 'true' ? true : false
    }
  }
  onDataChange = (e:any) => {
      let cloudProviderForm = document.getElementById("cloudProviderForm") as HTMLFormElement;
      if (cloudProviderForm) {
      let formData = new FormData(cloudProviderForm);
      let acc = formData.get('access_key');
      let sec = formData.get('secret_access_key');
      let access_key = acc ? acc.toString() : "";
      let secret_access_key = sec ? sec.toString() : "";
      this.setState({formData: {
        access_key: access_key,
        secret_access_key: secret_access_key,
        cloud_provider: "aws"
      }})
      }
  }
  addAwsAccount = async(e:any) => {
      e.preventDefault();
      this.setState({ isSaving: true });
      let response: Response = await this.cloudProviderService.addAwsAccount(this.state.formData);
      let responseBody = await response.json();
      if (response.status ===201) {
        this.setState({
            isSaving: false,
            formData: { cloud_provider: "aws", access_key: "", secret_access_key: "" }
        });
        this.snackbar.setSnackbar({
          isOpen: true,
          message: responseBody['Response_Body'],
          severity: "success"
        });
      localStorage.setItem("isAwsAccountConfigured", "true");
      this.props.router.navigate("/dashboard/instances")
    } else {
      this.setState({
          isSaving: false
      });
      this.snackbar.setSnackbar({
        isOpen: true,
        message: responseBody['Response_Body'],
        severity:"error"
      })
    }
  }
    getAwsData = () => {
      this.cloudProviderService.getAwsData().then(response => {
          console.log(response);
      })
  }
    
  handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
  };
 
  render(): React.ReactNode {
    this.snackbar = this.context;
    return <Box
      sx={{
        px: 2,
        mx: 4,
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Title> Add AWS Account </Title>
      </Box>
      {
        this.state.isAwsAccountConfigured ? <div> Aws Account is Already Configured </div> :
          <Box
            component="form"
            sx={{
              'width': '500px',
              'maxWidth': '100%'
            }}
            autoComplete="off"
            onInput={this.onDataChange}
            id="cloudProviderForm"
            onSubmit={this.addAwsAccount}
          >
            <div className="form-control">
              <TextField
                fullWidth
                variant="standard"
                inputProps={{ pattern: "[a-zA-Z0-9+/]{20}" }}
                id="apiKey"
                name="access_key"
                type="text"
                label="API KEY"
                value={this.state.formData.access_key}
                required
              />
                   
            </div>
            <div className="form-control">
              <TextField
                fullWidth
                variant="standard"
                inputProps={{ pattern: "[a-zA-Z0-9+/]{40}" }}
                id="apiSecret"
                name="secret_access_key"
                type="text"
                label="API SECRET"
                value={this.state.formData.secret_access_key}
                required
              />
            </div>
            <div className="form-control">
              <Button type="submit" variant="contained" disabled={this.state.isSaving}>Save AWS Account {this.state.isSaving ? "..." : ""}</Button>
            </div>
          </Box>
      }
      </Box>
 }
}

export default  withRouter(AddAwsAccount);

