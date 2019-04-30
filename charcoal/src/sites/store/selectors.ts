import { SitesState } from './state';

export const getAllSites = ({ sites }: { sites: SitesState }) => Object.values(sites.sites)