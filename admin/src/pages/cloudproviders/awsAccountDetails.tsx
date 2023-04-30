import Box from "@mui/material/Box";
import React, { useEffect } from "react";
import { CloudProviderService } from "../../services/cloudprovider.service";
import Title from "../../components/atoms/Title";
import { Skeleton } from "@mui/material";

function AwsAccountDetails() {
    const [accountDetails, setAccountDetails] = React.useState({id:"", region:"", security:"", subnet:"", vpc:""});
    let cloudProviderService = new CloudProviderService();
    let getAwsData = () => {
        cloudProviderService.getAwsData().then(response => {
            setAccountDetails(response['AWS Status'][0]);
        })
    }
    useEffect(() => {
        getAwsData();
    }, []);
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
        <Title>Aws Account Details </Title>
      </Box>
        <Box>
            { accountDetails.id ? 
                (<>
            <div className="data-container">
                <p className="data-head">ID</p>
                            <p className="data-text">
                                {accountDetails.id}</p>
            </div>
            <div className="data-container">
                <p className="data-head">Region</p>
                <p className="data-text">{accountDetails.region}</p>
            </div>
            <div className="data-container">
                <p className="data-head">Security</p>
                <p  className="data-text">{accountDetails.security}</p>
            </div>
            <div className="data-container">
                <p className="data-head">Subnet</p>
                <p  className="data-text">{accountDetails.subnet}</p>
            </div>
            <div className="data-container">
                <p className="data-head">Vpc</p>
                <p className="data-text">{accountDetails.vpc}</p>                
            </div>
            </>
                )
                
                : (
                   <>
            <div className="data-container">
                <p className="data-head">ID</p>
                            <p className="data-text">
                                <Skeleton variant="text" sx={{ fontSize: '15px' }} /></p>
            </div>
            <div className="data-container">
                <p className="data-head">Region</p>
                                <p className="data-text">
                                    <Skeleton variant="text" sx={{ fontSize: '15px' }} /></p>
            </div>
            <div className="data-container">
                <p className="data-head">Security</p>
                    <p className="data-text">
                       <Skeleton variant="text" sx={{ fontSize:'15px' }} /></p>
            </div>
            <div className="data-container">
                <p className="data-head">Subnet</p>
                <p className="data-text">
                    <Skeleton variant="text" sx={{ fontSize: '15px' }} />
                </p>
            </div>
            <div className="data-container">
                <p className="data-head">Vpc</p>
                <p className="data-text">
                    <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
                </p>                
            </div>
            </>
            )}
            </Box>
    </Box>
  );
}

export default AwsAccountDetails;

