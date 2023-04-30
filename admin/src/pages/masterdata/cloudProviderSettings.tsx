import { Button, Divider, FormControl, IconButton, InputLabel } from "@mui/material";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import React, { FormEvent, useEffect } from "react";
import { DataGrid, GridApi, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { MasterSettings } from "../../services/mastersettings.service";
import DeleteIcon from "@mui/icons-material/Delete";

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'cloud_provider', headerName: 'Cloud Provider Name', width: 130, editable: true },
  {
    field: "action",
    headerName: "Action",
    sortable: false,
    width: 300,
    renderCell: (params: any) => {
      const onClick = (e:any) => {
        e.stopPropagation(); // don't select this row after clicking

        const api: GridApi = params.api;
        const thisRow: Record<string, any> = {};

        api
          .getAllColumns()
          .filter((c) => c.field !== "__check__" && !!c)
          .forEach(
            (c) => (thisRow[c.field] = params.getValue(params.id, c.field))
          );

        return alert(JSON.stringify(thisRow, null, 4));
      };

      return <>
        <IconButton aria-label="delete">
          <DeleteIcon />
        </IconButton>
      </>;
    }
  },
];

class CloudProviderSettings extends React.Component<{}, { rows: any[] }> {
  private setting = new MasterSettings();
  constructor(props:any) {
    super(props);
    this.state = { rows:[] }
  }
  getData(){
    this.setting.getCloudProviders().then(data => {
      this.setState({ rows: data['List of Clouds Added']});
    })
  }
  async saveCloudProvider(e: FormEvent<HTMLFormElement>){
      e.preventDefault();
      //let formData = new FormData(e.target);
      let response = await this.setting.saveCloudProvider();
      console.log(response);
      this.setState({rows: []});
    
  }

  componentDidMount() {
    this.getData();
  }


  render(): React.ReactNode {
    return <>
       <Box component="form"
          sx={{'width': '500px','maxWidth': '100%'}}
          noValidate
          autoComplete="off"
          onSubmit={this.saveCloudProvider}
        >
            <div className="form-control">
                <TextField
                    fullWidth
                  id="clud_name"
                  type="text"
                  required
                  variant="standard"
                  label="Name"
                />      
            </div>
            <div className="form-control">
                <Button type="submit" variant="contained">Add Provider</Button>
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
   </>
  }
}

export default CloudProviderSettings;

