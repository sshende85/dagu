import AuthService from "./auth.service";

export class CloudProviderService {
  async addAwsAccount(formData: any) {
    return fetch(`${REST_API_URL}/register_cloudprovider_details`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: AuthService.getToken()
      },
      body: JSON.stringify({
        cloud_provider: formData.cloud_provider,
        aws_access_key: formData.access_key,
        aws_secret_access_key: formData.secret_access_key
      }),
    });
  }
  async getAwsData() {
    let response = await fetch(`${REST_API_URL}/get_aws_data`);
    let jsonData = response.json();
    console.log(jsonData);
    return jsonData;
  }

  async checkAwsStatus() {
    let response = await fetch(`${REST_API_URL}/check_aws_status`);
    let jsonData = response.json();
    console.log(jsonData);
    return jsonData;
  }
}
