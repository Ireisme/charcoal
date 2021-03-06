import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import store from '../store/store'
import { Guid } from "guid-typescript";
import { Site } from './site';

export class SiteService {
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

  public async getSites(): Promise<Site[]> {
    const response = await this.http.get<Site[]>(`${this.baseUrl}/sites`);
    return response.data;
  }

  public async getSite(siteID: Guid): Promise<Site> {
    const response = await this.http.get<Site>(`${this.baseUrl}/sites/${siteID.toJSON()}`);
    return response.data;
  }

  public async addSite(site: Site) {
    const response = await this.http.post<Site[]>(`${this.baseUrl}/sites`, { ID: site.ID.toString(), Name: site.Name, ImageURL: site.ImageURL });
    return response.data;
  }
}

const service = new SiteService();
export default service;