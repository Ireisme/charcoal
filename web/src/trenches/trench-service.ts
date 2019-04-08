import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import store from '../store/store'
import { Guid } from "guid-typescript";
import { Trench } from './trench';

export class TrenchService {
  private baseUrl: string;
  private http: AxiosInstance;

  constructor() {
    this.baseUrl = 'http://localhost:3000';
    this.http = axios.create();
    this.http.interceptors.request.use(request => this.setAuthHeader(request));
  }

  private setAuthHeader(request: AxiosRequestConfig) {
    const token = store.state.auth.accessToken;
    request.headers.Authorization = `Bearer ${token}`
    return request;
  }

  public async getTrenchesBySite(siteId: Guid): Promise<Trench[]> {
    const response = await this.http.get<Trench[]>(`${this.baseUrl}/sites/${siteId.toString()}/trenches/`);
    return response.data;
  }

  public async addTrench(trench: Trench) {
    const response = await this.http.post<Trench[]>(`${this.baseUrl}/sites/${trench.SiteID.toString()}/trenches/`, { ID: trench.ID.toString(), SiteID: trench.SiteID.toString(), Name: trench.Name });
    return response.data;
  }
}
