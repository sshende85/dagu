import React from 'react';
import Box from '@mui/material/Box';
import Title from '../../components/atoms/Title';
import TabPanel from '../../components/material/TabPanel';
function CloudProviders() {
  const [value, setValue] = React.useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
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
        <Title>Cloud Providers</Title>
      </Box>
      <TabPanel value={value} index={0}>
      </TabPanel>
    </Box>
  );
}
export default CloudProviders;
