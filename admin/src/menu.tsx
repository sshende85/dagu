import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Link, useNavigate } from 'react-router-dom';
import { CloudOutlined, LogoutOutlined, ExpandMore, ExpandLess, SouthAmericaOutlined, SettingsOutlined, AddOutlined, GridViewOutlined, GridOnOutlined, RoomOutlined, AccountTreeOutlined} from '@mui/icons-material';
import { Collapse, Typography } from '@mui/material';
import AuthService from "./services/auth.service";

export function MainListItems() {
  const navigate = useNavigate();
  const [isOpenSettings, setIsOpenSettings] = React.useState(false);
  const [isOpenInstances, setIsOpenInstances] = React.useState(false);
  const [isOpenCloudProviders, setIsOpenCloudProviders] = React.useState(false);
  const toggleIsOpenSettings = (isOpen:boolean) => {
    setIsOpenSettings(isOpen);
  }
  const toggleIsOpenInstances = (isOpen:boolean) => {
    setIsOpenInstances(isOpen);
  }
  const toggleIsOpenCloudProviders = (isOpen:boolean) => {
    setIsOpenCloudProviders(isOpen);
  }
  const logout = () => {
    AuthService.logout().then(data => {
      navigate("/");
    });
  }
  return <React.Fragment>
    
    <ListItem text="Cloud Providers" icon={<CloudOutlined />} isNested={true} isOpen={isOpenCloudProviders} toggleIsOpen={ toggleIsOpenCloudProviders } />
    <Collapse in={isOpenCloudProviders} timeout="auto" unmountOnExit style={{paddingLeft:"10px"}}>
      <Link to="/dashboard/add-aws-account">
          <ListItem text="Add AWS Account" icon={<AddOutlined />}/>
      </Link>
    </Collapse>
    
    <ListItem text="Instances" icon={<GridOnOutlined />} isNested={true} isOpen={isOpenInstances} toggleIsOpen={ toggleIsOpenInstances } />
    <Collapse in={isOpenInstances} timeout="auto" unmountOnExit style={{paddingLeft:"10px"}}>
      <Link to="/dashboard/create-instance">
          <ListItem text="Create Instance" icon={<AddOutlined />}/>
      </Link>
      <Link to="/dashboard/instances">
          <ListItem text="Manage Instances" icon={<GridViewOutlined />} />
      </Link>
    </Collapse>
    
    <Link to="/dashboard/dags">
      <ListItem text="Dags" icon={<AccountTreeOutlined />}/>
    </Link>

    <ListItem text="Settings" icon={<SettingsOutlined />} isNested={true} isOpen={isOpenSettings} toggleIsOpen={ toggleIsOpenSettings } />
    <Collapse in={isOpenSettings} timeout="auto" unmountOnExit style={{paddingLeft:"10px"}}>
      <Link to="/dashboard/environments">
          <ListItem text="Environments" icon={<RoomOutlined />}/>
      </Link>
      <Link to="/dashboard/environments-regions-mapping">
          <ListItem text="Regions" description="" icon={<SouthAmericaOutlined />} />
      </Link>
    </Collapse>
    
    <Link to="/">
      <ListItem text="Logout" icon={<LogoutOutlined />} onClick={logout}/>
    </Link>
  </React.Fragment>
  };

type ListItemProps = {
  icon?: React.ReactNode;
  text: string;
  description?: string;
  isOpen?: boolean;
  isNested?: boolean;
  toggleIsOpen?: any;
  onClick?: any;
};

function ListItem({ icon, text, isNested, isOpen,toggleIsOpen, onClick }: ListItemProps) {
  const showArrow = () => {
    if (isNested) {
      if (isOpen) {
        return <ExpandLess color="primary" />
      } else {
        return <ExpandMore color="primary" />
      }
    } else {
      return "";
    }
  }
  const handleClick = () => {
    if (toggleIsOpen) {
      toggleIsOpen(!isOpen); 
    }
    if (onClick) {
      onClick();
    }
  };
  return (
    <ListItemButton onClick={handleClick}>
      { icon ?
        <ListItemIcon
          sx={{
            color: 'white',
          }}
        >
          {icon}
        </ListItemIcon> : ""
      }
      <ListItemText
        primary={
          <Typography
            sx={{
              color: 'white',
              fontWeight: '600'
            }}
          >
            {text}
          </Typography>
        }
      />
      {showArrow()}
    </ListItemButton>
  );
}
