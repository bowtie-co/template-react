import {
  storage
} from '.';
import {
  injectPageProps
} from '.';
import {
  AppHome,
  AppNotFound,
  // DocumentCreate
} from '../pages';

export const pageRoutes = {
  '/': AppHome,
  // '/:owner/:repo': RepoOne,
  // '/:owner/:repo/pulls': PullAll,
  // '/:owner/:repo/pulls/:num': PullOne,
  // '/:owner/:repo/users': UserAll,
  // '/:owner/:repo/users/:username': UserOne,
  // '/:owner/:repo/documents': DocumentAll,
  // '/:owner/:repo/documents/:docId': DocumentOne,
  // // '/:owner/:repo/documents/create': DocumentCreate,
  // '/:owner/:repo/submissions': SubmissionAll,
  // '/:owner/:repo/submissions/:subId': SubmissionOne,
  // '/:owner/:repo/collections': RepoOne,
  // '/:owner/:repo/collections/:collection': CollectionOne,
  // '/:owner/:repo/collections/:collection/:entry': CollectionItemOne,
  '/*': AppNotFound
};

export const routes = injectPageProps(pageRoutes, (props) => {
  console.debug('routes.injectPageProps()', props);

  const pageProps = { example: 'value' };

  storage.set('pageProps', pageProps);

  return { pageProps };
});
