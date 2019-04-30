import { Site } from "../site";

export interface SitesState {
  sites: {[id:string]: Site}
}