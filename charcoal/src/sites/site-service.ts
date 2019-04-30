import axios, { AxiosInstance } from 'axios';
import { Guid } from "guid-typescript";
import { Site } from './site';

export class SiteService {
  private baseUrl: string;
  private http: AxiosInstance;


  constructor(accessToken: string) {
    this.baseUrl = 'http://localhost:5309';
    this.http = axios.create({ headers: {
      Authorization: `Bearer ${accessToken}`
    }});
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