import mutations from '../mutations';
import { Site } from '../../site';
import { Guid } from 'guid-typescript';
import { SiteState } from '../store';
import { AddSiteMutation } from '../mutation-types';

describe('Site Mutations', () => {
  describe('addSite', () => {
    test('should add payload.site to sites', () => {
      const state: SiteState = {
        sites: {}
      };
      const newSite: Site = { ID: Guid.create(), Name: 'New Site', ImageURL: 'picture1' };

      mutations.addSite(state, new AddSiteMutation(newSite));
      
      expect(state.sites[newSite.ID.toString()]).toEqual(newSite);
    });

    test('should overwrite existing Site with the same ID', () => {
      const ID = Guid.create();
      const existingSite: Site = { ID: ID, Name: 'Existing Site', ImageURL: 'picture1' };
  
      const state: SiteState = {
        sites: {}
      };
      state.sites[existingSite.ID.toString()] = existingSite;

      const newSite: Site = { ID: ID, Name: 'New Site', ImageURL: 'picture1' };
      mutations.addSite(state, new AddSiteMutation(newSite));
      
      expect(state.sites[ID.toString()]).toEqual(newSite);
    });

    test('should not overwrite unrelated Sites', () => {
      const sites: Site[] = [
        { ID: Guid.create(), Name: 'First Site', ImageURL: 'picture1' },
        { ID: Guid.create(), Name: 'Second Site', ImageURL: 'picture2' },
        { ID: Guid.create(), Name: 'Third Site', ImageURL: 'picture13' }
      ];

      const state: SiteState = {
        sites: {}
      };
      sites.forEach(site => state.sites[site.ID.toString()] = site);

      const newSite: Site = { ID: Guid.create(), Name: 'New Site', ImageURL: 'picture1' };
      mutations.addSite(state, new AddSiteMutation(newSite));
      
      sites.forEach(site => {
        expect(state.sites[site.ID.toString()]).toEqual(site);
      });
    });
  });
});