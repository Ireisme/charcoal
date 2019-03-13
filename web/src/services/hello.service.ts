import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import store from '../store'

export class HelloService {
  private baseUrl: string;
  private http: AxiosInstance;

  constructor() {
    this.baseUrl = 'http://localhost:3000';
    this.http = axios.create();
    this.http.interceptors.request.use(request => this.setAuthHeader(request));
  }

  private setAuthHeader(request: AxiosRequestConfig) {
    const token = store.state.accessToken;
    request.headers.Authorization = `Bearer ${token}`
    return request;
  }

  public async getGreeting(): Promise<GreetingResponse> {
    const response = await this.http.get<GreetingResponse>(`${this.baseUrl}/hello`);
    return response.data;
  }
}

export class GreetingResponse {
  public Greeting: string = '';
}
