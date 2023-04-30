import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { SWRConfig } from 'swr';
import fetchJson from './lib/fetchJson';
import { AppBarContext } from './contexts/AppBarContext';
import Layout from './Layout';
import Workflows from './pages/workflows';
import MasterData from './pages/masterdata';
import DAGs from './pages/dags';
import Login from "./pages/login";
import AwsAccountDetails from './pages/cloudproviders/awsAccountDetails';
import Instances from './pages/instances';
import CreateInstance from './pages/instances/create-instance';
import AddAwsAccount from './pages/cloudproviders/addAwsAccount';
import Environments from './pages/masterdata/environments';
import EnvironmentsRegionsMapping from './pages/masterdata/environments-regions-mappings.tsx';
import { SnackBarContext } from './contexts/SnackBarContext';
import { Alert, Snackbar } from '@mui/material';

export type Config = {
  title: string;
  navbarColor: string;
  version: string;
};

type Props = {
  config: Config;
};

function App({ config }: Props) {
  const [title, setTitle] = React.useState<string>('');
  const [snackbar, setSnackbar] = React.useState<any>({isOpen:false, message: "",severity: "success"});
  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    setSnackbar({ isOpen: false, message: "", severity: "" });
  };
  return (
    <SWRConfig
      value={{
        fetcher: fetchJson,
        onError: (err) => {
          console.error(err);
        },
      }}
    >
      <AppBarContext.Provider
        value={{
          title,
          setTitle,
        }}
      >
        <SnackBarContext.Provider value={{
          snackbar,
          setSnackbar
        }}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />}></Route>
            <Route path="/dashboard" element={<Layout {...config}/>} >
              <Route index element={<AddAwsAccount/>} />
              <Route path="workflows" element={<Workflows/>} />
              <Route path="add-aws-account" element={<AddAwsAccount />} />
              <Route path="view-aws-account-details" element={<AwsAccountDetails/>} />
              <Route path="settings" element={<MasterData/>} />
              <Route path="dags" element={<DAGs />} />
              <Route path="instances" element={<Instances />}></Route>
              <Route path="create-instance" element={<CreateInstance />}></Route>
              <Route path="environments" element={<Environments />}></Route>
              <Route path="environments-regions-mapping" element={<EnvironmentsRegionsMapping/>}></Route>
            </Route>
            </Routes>
          </BrowserRouter>
          </SnackBarContext.Provider>
      </AppBarContext.Provider>
      <Snackbar open={snackbar.isOpen} autoHideDuration={2000} onClose={handleClose}
        anchorOrigin={{vertical:"top", horizontal:"right"}}>
          <Alert onClose={handleClose} severity={snackbar.severity} sx={{ width: '100%' }}>
             {snackbar.message}!
          </Alert>
        </Snackbar>
    </SWRConfig>
  );
}

export default App;
