interface LoginData {
    username: string;
    password: string;
}
export default class AuthService {
  public static async login(login: LoginData) {
    return fetch(`${REST_API_URL}/user_login`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: login.username,
        password: btoa(login.password),
      }),
    });
  }

  public static async logout() {
    return await (
      await fetch(`${REST_API_URL}/user_logout`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: AuthService.getUsername() }),
      })
    ).json();
  }
  public static getUsername() {
    let loginResponse: any = localStorage.getItem('loginResponse');
    if (loginResponse) {
      loginResponse = JSON.parse(loginResponse);
    }
    return loginResponse.user_name;
  }
  public static getToken() {
    let loginResponse: any = localStorage.getItem('loginResponse');
    if (loginResponse) {
      loginResponse = JSON.parse(loginResponse);
    }
    return loginResponse.token;
  }
}