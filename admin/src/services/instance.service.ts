import AuthService from "./auth.service";

export class InstanceService {
  async createInstance(formData: any) {
    let response = await fetch(`${REST_API_URL}/create_instance`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: AuthService.getToken()
      },
      body: JSON.stringify(formData),
    });
    let jsonData = await response.json();
    return jsonData;
  }
  async getInstances() {
    let response = await fetch(`${REST_API_URL}/get_instances`);
    let jsonData = response.json();
    console.log(jsonData);
    return jsonData;
  }

  async startAws(formData: any) {
    let response = await fetch(`${REST_API_URL}/start_aws`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    let jsonData = await response.json();
    return jsonData;
  }
  async stopAws(formData: any) {
    let response = await fetch(`${REST_API_URL}/stop_aws`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    let jsonData = await response.json();
    return jsonData;
  }
  async terminateAws(formData: any) {
    let response = await fetch(`${REST_API_URL}/terminate_aws`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    let jsonData = await response.json();
    return jsonData;
  }
}
