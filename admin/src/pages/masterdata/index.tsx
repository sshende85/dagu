import React from 'react';
import Box from '@mui/material/Box';
import Title from '../../components/atoms/Title';
import { Tab, Tabs } from '@mui/material';
import TabPanel from '../../components/material/TabPanel';
import CloudProviderSettings from './cloudProviderSettings';

function MasterData() {
  const [value, setValue] = React.useState(0);
   const onTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
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
        <Title>Master Data</Title>
      </Box>
      <Tabs value={value} onChange={onTabChange} aria-label="Tabs">
        <Tab label="Cloud Providers" />
      </Tabs>
      <TabPanel value={value} index={0}>
        <CloudProviderSettings></CloudProviderSettings>
      </TabPanel>
    </Box>
  );
}
export default MasterData;
