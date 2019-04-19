import actions from '../actions';
import service from '../../site-service';
import { Site } from '../../site';
import { Guid } from 'guid-typescript';
import { AddSiteAction } from '../action-types';
import { ActionContext } from 'vuex';
import { SiteState } from '../store';
import { AppState } from '../../../store/store';

const mockGetSites = jest.fn();
const mockaddSite = jest.fn();

jest.mock('../../site-service', () => {
  return {
    getSites: jest.fn(),
    addSite: jest.fn()
  };
});

describe('Site Actions', () => {
  describe('getSites', () => {
    test.skip('should call SiteService.getSites and commit AddSite mutation for each Site returned', done => {
      const sites: Site[] = [
        { ID: Guid.create(), Name: 'First Site', ImageURL: 'picture1' },
        { ID: Guid.create(), Name: 'Second Site', ImageURL: 'picture2' },
        { ID: Guid.create(), Name: 'Third Site', ImageURL: 'picture13' }
      ];
      const getSites = service.getSites as any;
      getSites.mockImplementation(() => Promise.resolve(sites));
      const context = { commit: jest.fn() };

      actions.getSites(context as unknown as ActionContext<SiteState, AppState>);

      setTimeout(() => {
        sites.forEach(site => {
          expect(context.commit).toBeCalledWith(new AddSiteAction(site));
        });
        done();
      }, 100);
    });
  })
});