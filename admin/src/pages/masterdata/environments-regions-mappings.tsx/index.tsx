import React, { FormEvent } from 'react';
import Box from '@mui/material/Box';
import Title from '../../../components/atoms/Title';

import FormControl from '@mui/material/FormControl';
import { Alert, Button, InputLabel, MenuItem, Select } from '@mui/material';
import { MasterSettings } from '../../../services/mastersettings.service';
import MultiselectTwoSides from '../../../components/material/src/src';
import { SnackBarContext } from '../../../contexts/SnackBarContext';

class EnvironmentsRegionsMapping extends React.Component<
  {},
  {
    options: [];
    environmentList: any;
    formData: { environment_name: string; environment_regions: [] };
    value: any;
    isSaving: boolean;
  }
> {
  private setting = new MasterSettings();
  static contextType?: React.Context<any> | undefined = SnackBarContext;
  public snackbar: any;
  constructor(public props: any) {
    super(props);
    this.state = {
      options: [],
      formData: { environment_name: '', environment_regions: [] },
      value: [],
      environmentList: [],
      isSaving: false,
    };
  }
  // On change Environments dropdown
  handleEnvironmentChange = (e: any) => {
    console.log('in env change event' + e.target.value);
    if (e.target.value) {
      this.setState({
        options: [],
      });
      this.setting
        .getEnvironmentBasedRegions(e.target.value)
        .then((data: any) => {
          let arrRegions: any = [];
          if (data) {
            data.forEach((item: any) => {
              if (item.environment_name == e.target.value) {
                arrRegions.push({
                  value: item.environment_region,
                  name: item.environment_region,
                });
              }
            });
          }
          console.log('arrRegions => ' + arrRegions);

          this.setState({
            options: arrRegions,
            formData: {
              environment_name: e.target.value,
              environment_regions: [],
            },
          });
        });
    }
  };

  getData() {
    this.setting.getEnvironments().then((data: any) => {
      if (data) this.setState({ environmentList: data });
    });

    this.setting.getAllRegions().then((data: any) => {
      var regionArr: any = [];
      if (data)
        data.map((item: any) => {
          regionArr.push({ value: item, name: item });
        });
      this.setState({ options: regionArr });
    });
  }

  handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    this.setState({ isOpen: false });
  };

  componentDidMount() {
    this.getData();
  }
  // On select regions
  handleChange = (value: any) => {
    this.setState({
      value: value,
      formData: {
        environment_name: this.state.formData.environment_name,
        environment_regions: value,
      },
    });
  };

  // On Add environment- region mapping
  addEnvRegionsMap = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    this.setState({ isSaving: true });
    let response = await this.setting.addEnvRegionsMapping(this.state.formData);
    this.getData();
    this.setState({
      environmentList: [],
      formData: { environment_name: '', environment_regions: [] },
      value: [],
      isSaving: false,
    });
    this.snackbar.setSnackbar({
      isOpen: true,
      message: response['Response_Body'],
      severity: 'success',
    });
  };

  render() {
    this.snackbar = this.context;
    const { options, value } = this.state;
    const selectedCount = value.length;
    const availableCount = options.length - selectedCount;
    return (
      <Box
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
          <Title>Environments Regions Mapping</Title>
        </Box>
        <Box
          component="form"
          sx={{ width: '500px', maxWidth: '100%' }}
          autoComplete="off"
          name="environmentForm"
          id="environmentForm"
          onSubmit={this.addEnvRegionsMap}
        >
          <div className="form-control">
            <FormControl variant="standard" sx={{ minWidth: '100%' }}>
              <InputLabel id="environment">Select Environment*</InputLabel>
              <Select
                labelId="environment"
                id="environment"
                label="Select Environment"
                variant="standard"
                required
                name="environment_name"
                onChange={this.handleEnvironmentChange}
              >
                <MenuItem value=""> Select Environment </MenuItem>
                {this.state.environmentList.map((single: any) => (
                  <MenuItem value={single.environment_name}>
                    {single.environment_name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <div className="form-control">
            <p>Select Regions * </p>
            <MultiselectTwoSides
              options={this.state.options}
              value={this.state.formData.environment_regions}
              className="msts_theme_example"
              onChange={this.handleChange}
              availableHeader="Regions"
              availableFooter={`Available Regions: ${availableCount}`}
              selectedHeader="Selected Regions"
              placeholder="Filter.."
              selectedFooter={`Selected Regions: ${selectedCount}`}
              labelKey="name"
              showControls
              searchable
            />
          </div>
          <div className="form-control">
            <Button
              type="submit"
              variant="contained"
              disabled={this.state.isSaving}
            >
              Save
            </Button>
          </div>
        </Box>
      </Box>
    );
  }
}
export default EnvironmentsRegionsMapping;
