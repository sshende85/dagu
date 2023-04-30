import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import React from "react";

function SaveAzureAccount() {
    return (
       <Box
      component="form"
            sx={{
                'width': '500px',
          'maxWidth': '100%'
            }}
      noValidate
      autoComplete="off"
        >
        <div className="form-control">
                <TextField
                    fullWidth
            id="title"
            type="text"
            required
            variant="standard"
            label="Title"
        />
                   
        </div>
        <div className="form-control">
                <TextField
                    fullWidth
            id="tenantId"
            type="text"
            required
            variant="standard"
            label="Tenant ID"
        />
                   
            </div>
            <div className="form-control">
                <TextField
                    fullWidth
            id="subscriptionId"
            type="text"
            required
            variant="standard"
            label="Subscription ID"
        />
                   
            </div>
            <div className="form-control">
                <TextField
                    fullWidth
            id="clientKey"
            type="text"
            required
            variant="standard"
            label="Client key"
        />
                   
        </div>
        <div className="form-control">
                <TextField
                    fullWidth
                id="clientSecret"
                type="password"
                required
                label="Client secret"
                variant="standard"
            />
            </div>
            <div className="form-control">
                <Button variant="contained">Save Azure Account Details </Button>
            </div>
        </Box>
  );
}

export default SaveAzureAccount;

