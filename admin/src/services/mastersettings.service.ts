import AuthService from './auth.service';

export class MasterSettings {
  async getCloudProviders() {
    let response = await fetch(`${REST_API_URL}/add_clouds`);
    let jsonData = await response.json();
    return jsonData;
  }
  async saveCloudProvider() {
    let response = await fetch(`${REST_API_URL}/add_clouds`, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ cloud_name: 'Testy' }),
    });
    let jsonData = await response.json();
    return jsonData;
  }

  async getEnvironments() {
    let response = await fetch(`${REST_API_URL}/get_environmenttype`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: AuthService.getToken(),
      },
    });
    let jsonData = await response.json();
    return jsonData['Response_Body'];
  }

  addEnvironment(formData: any) {
    return fetch(`${REST_API_URL}/register_environmenttype`, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: AuthService.getToken(),
      },
      body: JSON.stringify({
        environment_name: formData.name,
        environment_description: formData.description,
      }),
    });
  }

  async addEnvRegionsMapping(formData: any) {
    let response = await fetch(`${REST_API_URL}/register_environment_regions`, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: AuthService.getToken(),
      },
      body: JSON.stringify({
        environment_name: formData.environment_name,
        environment_regions: formData.environment_regions,
      }),
    });
    let jsonData = await response.json();
    return jsonData;
  }

  async getAllRegions() {
    let response = await fetch(`${REST_API_URL}/get_all_regions`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: AuthService.getToken(),
      },
    });

    let jsonData = await response.json();
    return jsonData['Response_Body'];
  }

  async getEnvironmentBasedRegions(environmentName: string) {
    let response = await fetch(`${REST_API_URL}/get_environment_regions`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: AuthService.getToken(),
      },
      body: JSON.stringify({ environment_name: environmentName }),
    });

    let jsonData = await response.json();
    return jsonData['Response_Body'];
  }

  async getRegions() {
    let response = await fetch(`${REST_API_URL}/get_all_regions`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username: 'ui-team' }),
    });

    let jsonData = await response.json();
    return jsonData['Response_Body'];
  }
  async getVpcs() {
    let response = await fetch(`${REST_API_URL}/get_vpcs`);
    let jsonData = await response.json();
    return jsonData;
  }

  async getEnvironmentRegions(environment: string) {
    let response = await fetch(`${REST_API_URL}/get_environment_regions`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: AuthService.getToken(),
      },
      body: JSON.stringify({ environment_name: environment }),
    });

    let jsonData = await response.json();
    return jsonData['Response_Body'];
  }

  async getRegionBasedAmi(region: string) {
    let response = await fetch(`${REST_API_URL}/get_region_based_ami`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: AuthService.getToken(),
      },
      body: JSON.stringify({ region: region }),
    });

    let jsonData = await response.json();
    return jsonData['Response_Body'];
  }

  async getRegionBasedVpc(region: string) {
    let response = await fetch(`${REST_API_URL}/get_vpc_type`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: AuthService.getToken(),
      },
      body: JSON.stringify({ region: region }),
    });

    let jsonData = await response.json();
    return jsonData['Response_Body'];
  }

  async getInstanceTypes(region: string, ami: string) {
    let response = await fetch(`${REST_API_URL}/get_instance_type`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: AuthService.getToken(),
      },
      body: JSON.stringify({ region: region, ami: ami }),
    });

    let jsonData = await response.json();
    return jsonData['Response_Body'];
  }

  async getSubnets(vpc: string) {
    let response = await fetch(`${REST_API_URL}/get_subnet_type`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: AuthService.getToken(),
      },
      body: JSON.stringify({ vpc: vpc }),
    });

    let jsonData = await response.json();
    return jsonData['Response_Body'];
  }
}
