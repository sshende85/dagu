import { Button, Checkbox, FormControl, IconButton, InputLabel, List, ListItem, ListItemButton, ListItemIcon, ListItemText, MenuItem, Select} from "@mui/material";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import React, { useEffect } from "react";
import { CloudProviderService } from "../../services/cloudprovider.service";
import Title from "../../components/atoms/Title";
import { MasterSettings } from "../../services/mastersettings.service"; 
import { InstanceService } from "../../services/instance.service";
function CheckboxList() {
  const [checked, setChecked] = React.useState([0]);

  const handleToggle = (value: number) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  return (
    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      {[0, 1, 2, 3].map((value) => {
        const labelId = `checkbox-list-label-${value}`;

        return (
          <ListItem
            key={value}
            disablePadding
          >
            <ListItemButton role={undefined} onClick={handleToggle(value)} dense>
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  checked={checked.indexOf(value) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ 'aria-labelledby': labelId }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={`Http Asebian ${value + 1}`} />
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
  );
}
class CreateInstance extends React.Component<{}, {
      environmentList: any,
      regionList: any,
      osList: any,
      instanceTypeList:any,
      vpcList: any,
      subnetList: any,
      formData: {
         instance_name: string,
          environment: string,
          region: string,
          ami: string,
          instance_type: string,
          vpc: string,
          subnet_id: string
      }
}> {
  public instanceService = new InstanceService();
  public masterSetting = new MasterSettings();
  constructor(public props: any) {
    super(props);
    this.state = {
      environmentList: [],
      regionList: [],
      osList: [],
      instanceTypeList: [],
      vpcList: [],
      subnetList: [],
      formData: {
         instance_name: '',
         environment: '',
         region: '',
          ami: '',
          instance_type: '',
          vpc: '',
          subnet_id: ''
      }
    }
  }
   onInstanceNameChange = (e:any) => {
     this.setState({formData:{...this.state.formData, instance_name: e.target.value}})
  }
  onEnvironmentChange = (e: any) => {
    this.setState({formData:{...this.state.formData, environment: e.target.value}})
    this.masterSetting.getEnvironmentRegions(e.target.value).then(regions => {
      this.setState({
        regionList: regions
      })
    })
  }
  onRegionChange = (e: any) => {
    this.setState({ formData: { ...this.state.formData, region: e.target.value } })
    this.masterSetting.getRegionBasedAmi(e.target.value).then(osList => {
      this.setState({
        osList: osList
      })
    })
    this.masterSetting.getRegionBasedVpc(e.target.value).then(vpcList => {
      this.setState({
        vpcList: vpcList
      })
    })
  }
  onAmiChange = (e: any) => {
    this.setState({ formData: { ...this.state.formData, ami: e.target.value } })
    this.masterSetting.getInstanceTypes(this.state.formData.region, e.target.value).then(instanceTypeList => {
      this.setState({
        instanceTypeList: instanceTypeList
      })
    })
  }
  onInstanceTypeChange = (e: any) => {
    this.setState({ formData: { ...this.state.formData, instance_type: e.target.value } })
  }
  onVpcChange = (e: any) => {
    this.setState({ formData: { ...this.state.formData, vpc: e.target.value } })
    this.masterSetting.getSubnets(e.target.value).then(subnetList => {
      this.setState({
        subnetList: subnetList
      })
    })
  }
onSubnetChange = (e: any) => {
  this.setState({ formData: { ...this.state.formData, subnet_id: e.target.value } });
}
  createInstance = (e:any) => {
    e.preventDefault();
    this.instanceService.createInstance(this.state.formData).then(response => {
      console.log(response);
    })
  }
  getEnvironmentsRegionsVpcsSubnets = () => {
    this.masterSetting.getEnvironments().then(response => {
      this.setState({ environmentList:response });
    })
  }
  componentDidMount(){
      this.getEnvironmentsRegionsVpcsSubnets();
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
          <Title> Create Instance </Title>
        </Box>
        <Box
          component="form"
          sx={{
            'width': '500px',
            'maxWidth': '100%'
          }}
          autoComplete="off"
          onInput={this.onInstanceNameChange}
          id="instanceForm"
          onSubmit={this.createInstance}
        >
              
          <div className="form-control">
            <TextField
              fullWidth
              variant="standard"
              id="instanceName"
              name="instance_name"
              type="text"
              label="Server Name"
              value={this.state.formData.instance_name}
              required
            />
          </div>
          <div className="form-control">
            <FormControl variant="standard" sx={{ minWidth: "100%" }}>
              <InputLabel id="environment">Select Environment*</InputLabel>
              <Select
                labelId="environment"
                id="environment"
                name="environment"
                value={this.state.formData.environment}
                onChange={this.onEnvironmentChange}
                label="Select Environment"
                variant="standard"
                required
              >
                <MenuItem value=""> Select Environment </MenuItem>
                {
                  this.state.environmentList.map((single: any) => (
                    <MenuItem key={single.environment_name} value={single.environment_name}>{single.environment_name} </MenuItem>
                  ))
                }
              </Select>
            </FormControl>
          </div>
          <div className="form-control">
            <FormControl variant="standard" sx={{ minWidth: "100%" }}>
              <InputLabel id="region">Select Region *</InputLabel>
              <Select
                labelId="region"
                id="region"
                name="region"
                value={this.state.formData.region}
                onChange={this.onRegionChange}
                label="Select Region"
                variant="standard"
                required
              >
                <MenuItem value=""> Select Region </MenuItem>
                {
                  this.state.regionList.map((single: any) => (
                    <MenuItem key={single.environment_region} value={single.environment_region}>{single.environment_region} </MenuItem>
                  ))
                }
              </Select>
            </FormControl>
          </div>
          <div className="form-control">
            <FormControl variant="standard" sx={{ minWidth: "100%" }}>
              <InputLabel id="region">Select OS type *</InputLabel>
              <Select
                labelId="ami"
                id="ami"
                name="ami"
                value={this.state.formData.ami}
                onChange={this.onAmiChange}
                label="Select Os Type"
                variant="standard"
                required
              >
              <MenuItem value=""> Select OS type </MenuItem>
              {
                this.state.osList.map((single:any)=> {
                  return <MenuItem key={single.ami_id} value={single.ami_id}>{single.os_type} </MenuItem>
                })
              }
              
              </Select>
            </FormControl>
          </div>
          <div className="form-control">
            <FormControl variant="standard" sx={{ minWidth: "100%" }}>
              <InputLabel id="instanceType">Select Instance Type *</InputLabel>
              <Select
                labelId="instance_type"
                id="instance_type"
                name="instance_type"
                value={this.state.formData.instance_type}
                onChange={this.onInstanceTypeChange}
                label="Select Instance Type"
                variant="standard"
                required
              >
                <MenuItem value=""> Select Instance Type </MenuItem>
                {
                  this.state.instanceTypeList.map((single: any) => (
                    <MenuItem key={single} value={single}>{single} </MenuItem>
                  ))
                }
              </Select>
            </FormControl>
          </div>
          <div className="form-control">
            <FormControl variant="standard" sx={{ minWidth: "100%" }}>
              <InputLabel id="vpc">Select VPC *</InputLabel>
              <Select
                labelId="vpc"
                id="vpc"
                value={this.state.formData.vpc}
                onChange={this.onVpcChange}
                label="Select Vpc"
                variant="standard"
                required
              >
                <MenuItem value=""> Select VPC </MenuItem>
                {
                  this.state.vpcList.map((single: any) => (
                    <MenuItem key={single.vpc_id} value={single.vpc_id}>{single.vpc_id} </MenuItem>
                  ))
                }
              </Select>
            </FormControl>
          </div>
          <div className="form-control">
            <FormControl variant="standard" sx={{ minWidth: "100%" }}>
              <InputLabel id="subnetId">Select Subnet *</InputLabel>
              <Select
                labelId="subnet_id"
                id="subnet_id"
                value={this.state.formData.subnet_id}
                onChange={this.onSubnetChange}
                label="Select Subnet"
                variant="standard"
                required
              >
                <MenuItem value=""> Select Subnet</MenuItem>
                {
                  this.state.subnetList.map((single: any) => (
                    <MenuItem key={ single.subnet} value={single.subnet}>{single.subnet} </MenuItem>
                  ))
                }
              </Select>
            </FormControl>
          </div>
          {/*<div className="form-control">
            <label>Select Components *</label>
           {CheckboxList()}
              </div>*/}
          <div className="form-control">
            <Button type="submit" variant="contained">Create Instance</Button>
          </div>
        </Box>
      </Box>;
  }
}

export default CreateInstance;

