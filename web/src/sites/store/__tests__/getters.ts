import getters from '../getters';
import { Site } from '../../site';
import { Guid } from 'guid-typescript';
import { SiteState } from '../store';

describe('Site Getters', () => {
  describe('listSites', () => {
    test('should return Sites from state', () => {
      const sites: Site[] = [
        { ID: Guid.create(), Name: 'First Site', ImageURL: 'picture1' },
        { ID: Guid.create(), Name: 'Second Site', ImageURL: 'picture2' },
        { ID: Guid.create(), Name: 'Third Site', ImageURL: 'picture13' }
      ];

      const state: SiteState = {
        sites: {}
      };
      sites.forEach(site => state.sites[site.ID.toString()] = site);

      const result = getters.listSites(state);
      
      expect(result).toEqual(sites);
    });
  });

  describe('getSiteById', () => {
    test('should return Site from store based on ID', () => {
      const expected: Site = { ID: Guid.create(), Name: 'First Site', ImageURL: 'picture1' };
  
      const state: SiteState = {
        sites: {}
      };
      state.sites[expected.ID.toString()] = expected;

      const result = getters.getSiteById(state)(expected.ID);
      
      expect(result).toEqual(expected);
    });
  })
});