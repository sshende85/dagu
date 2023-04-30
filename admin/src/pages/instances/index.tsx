import { Button, ButtonGroup } from "@mui/material";
import Box from "@mui/material/Box";
import React from "react";
import { DataGrid, GridApi, GridColDef } from "@mui/x-data-grid";
import { InstanceService } from "../../services/instance.service";
import Title from "../../components/atoms/Title";

const columns: GridColDef[] = [
    { field: 'Requested_by', headerName: 'VM Owner', width: 100 },
    { field: 'Name', headerName: 'Instance Name', width: 100 },
    { field: 'Public_Ip', headerName: 'Public Ip', width: 100 },
    { field: 'Private_Ip', headerName: 'Private Ip', width: 100 },
    { field: 'OS_Type', headerName: 'OS Type', width: 100 },
    { field: 'Region', headerName: 'Region', width: 100 },
   { field: 'Status', headerName: 'Status', width: 100 },
  {
    field: "action",
    headerName: "Action",
    sortable: false,
    width: 300,
    renderCell: (params: any) => {
        console.log(params);   
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

        return <ButtonGroup>
            { params.row.Status === 'stopped' ?
            <><Button variant="outlined" color="success">Start</Button>
            <Button variant="outlined" color="error">Terminate</Button></>
                : ""
            }

             { params.row.Status === 'running' ?
            <><Button variant="outlined" color="warning">Stop</Button>
            <Button variant="outlined" color="primary">Connect</Button></>
                : ""
            }
            {
                params.row.Status === 'terminated' ? "-": ""
            }
      </ButtonGroup>;
    }
  },
];

class Environments extends React.Component<{}, { rows: any[] }> {
  private instanceService = new InstanceService();
  constructor(props:any) {
    super(props);
    this.state = { rows:[] }
  }
  getData(){
    this.instanceService.getInstances().then(data => {
      this.setState({ rows: data['Instances']});
    })
  }
  componentDidMount() {
    this.getData();
  }


  render(): React.ReactNode {
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
        <Title>Manage Instances</Title>
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