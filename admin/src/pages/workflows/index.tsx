import React from 'react';
import Box from '@mui/material/Box';
import Title from '../../components/atoms/Title';

function Workflows() {
  
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
        <Title>Workflows</Title>
      </Box>
    </Box>
  );
}
export default Workflows;
