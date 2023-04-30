import { Alert, Button, Snackbar } from "@mui/material";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import React, { FormEvent } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { MasterSettings } from "../../../services/mastersettings.service";
import Title from "../../../components/atoms/Title";
import { SnackBarContext } from "../../../contexts/SnackBarContext";

const columns: GridColDef[] = [
  { field: 'environment_name', headerName: 'Name', width: 130, editable: true },
  { field: 'environment_description', headerName: 'Description', width: 130, editable: true },
];

class Environments extends React.Component<{}, {
    rows: any[],
    formData: { name: string, description: string },
    isSaving: boolean,
    isOpen: boolean,
    message: string
}> {
  static contextType?: React.Context<any> | undefined = SnackBarContext;
  public snackbar: any;
  private setting = new MasterSettings();
  constructor(props:any) {
    super(props);
      this.state = {
          rows: [],
          formData: { name: "", description: "" },
          isSaving: false,
          isOpen: false,
          message: ""
      }
  }
  getData(){
    this.setting.getEnvironments().then(data => {
      this.setState({ rows: data });
    })
    }
  onDataChange = (e:any) => {
      let environmentForm = document.getElementById("environmentForm") as HTMLFormElement;
      if (environmentForm) {
        let formData = new FormData(environmentForm);
        let nameValue = formData.get('name');
        let descriptionValue = formData.get('description');
        let name = nameValue ? nameValue.toString() : "";
        let description = descriptionValue ? descriptionValue.toString() : "";
        this.setState({
          formData: {name:name,description:description}
        })
      }
  }
  addEnvironment = async (e: FormEvent<HTMLFormElement>)=>{
      e.preventDefault();
      this.setState({ isSaving: true });
      let response: Response = await this.setting.addEnvironment(this.state.formData);
      let responseBody: any = await response.json();
      if (response.status === 201) {
       this.setState({
          isSaving: false,
          formData: { name: "", description: "" }
        })
        this.snackbar.setSnackbar({
            isOpen: true,
            message: responseBody['Response_Body'],
        });
        this.getData(); 
      } else {
        this.setState({
          isSaving: false,
        });
        this.snackbar.setSnackbar({
            isOpen: true,
            message: responseBody['Response_Body'],
        });
      }
  }

  componentDidMount() {
    this.getData();
  }
    
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
        <Title>Environments</Title>
      </Box>
       <Box component="form"
          sx={{'width': '500px','maxWidth': '100%'}}
          autoComplete="off"
            name="environmentForm"
            id="environmentForm"
            onSubmit={this.addEnvironment}
            onInput={this.onDataChange}
        >
            <div className="form-control">
                <TextField
                    fullWidth
                    id="Name"
                    type="text"
                    required
                    variant="standard"
                    label="Name"
                    name="name"
                    value={this.state.formData.name}
                />      
            </div>
            <div className="form-control">
                <TextField
                    fullWidth
                  id="Description"
                  type="text"
                  required
                  variant="standard"
                    label="Description"
                    name="description"
                 value={this.state.formData.description}
                />      
            </div>
            <div className="form-control">
                <Button type="submit" variant="contained" disabled={this.state.isSaving}>
                    Add Environment { this.state.isSaving ? "..." : ""}</Button>
            </div>
        </Box>
        <Box sx={{ flexGrow: 1 }}>
            <div style={{ height: 400, width: '100%' }}>
                <DataGrid
                editMode="row"
                rows={this.state.rows}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                />
            </div>
        </Box>
   </Box>
  }
}

export default Environments;