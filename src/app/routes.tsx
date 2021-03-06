import * as React from 'react';
import { Route, RouteComponentProps, Switch } from 'react-router-dom';
import { accessibleRouteChangeHandler } from '@app/utils/utils';
import { CatalogPage } from '@app/Catalog/CatalogPage';
import { RedHatCatalogPage } from '@app/Catalog/RedHatCatalogPage';
import { NotFound } from '@app/NotFound/NotFound';
import { useDocumentTitle } from '@app/utils/useDocumentTitle';
import { LastLocationProvider, useLastLocation } from 'react-router-last-location';
import { KameletDetailPage } from './Kamelet/KameletDetailPage';
import { NewKameletPage } from './Kamelet/NewKameletPage';
import { KameletTryPage } from './Kamelet/KameletTryPage';

let routeFocusTimer: number;
export interface IAppRoute {
  label?: string;
  /* eslint-disable @typescript-eslint/no-explicit-any */
  component: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>;
  /* eslint-enable @typescript-eslint/no-explicit-any */
  exact?: boolean;
  path: string;
  title: string;
  isAsync?: boolean;
}

const routes: IAppRoute[] = [
  {
    component: CatalogPage,
    exact: true,
    label: '1. Apache Catalog',
    path: '/',
    title: 'Kamelet Hub | Apache Catalog',
  },
  {
    component: RedHatCatalogPage,
    exact: true,
    label: '2. Kamelets.io',
    path: '/hub',
    title: 'Kamelet Hub | Kamelets.io',
  },
  {
    component: KameletDetailPage,
    exact: false,
    path: '/kamelets/:id',
    title: 'Kamelet Hub | Kamelet',
  },
  {
    component: KameletDetailPage,
    exact: false,
    path: '/:mode/kamelets/:id',
    title: 'Kamelet Hub | Kamelet',
  },
  {
    component: KameletTryPage,
    exact: false,
    path: '/try/:id',
    title: 'Kamelet Hub | Try Kamelet',
  },
  {
    component: NewKameletPage,
    exact: true,
    label: '3. Designer',
    path: '/create',
    title: 'Kamelet Hub | Create Kamelet',
  }
];

// a custom hook for sending focus to the primary content container
// after a view has loaded so that subsequent press of tab key
// sends focus directly to relevant content
const useA11yRouteChange = (isAsync: boolean) => {
  const lastNavigation = useLastLocation();
  React.useEffect(() => {
    if (!isAsync && lastNavigation !== null) {
      routeFocusTimer = accessibleRouteChangeHandler();
    }
    return () => {
      window.clearTimeout(routeFocusTimer);
    };
  }, [isAsync, lastNavigation]);
};

const RouteWithTitleUpdates = ({ component: Component, isAsync = false, title, ...rest }: IAppRoute) => {
  useA11yRouteChange(isAsync);
  useDocumentTitle(title);

  function routeWithTitle(routeProps: RouteComponentProps) {
    return <Component {...rest} {...routeProps} />;
  }

  return <Route path={rest.path} exact={rest.exact} render={routeWithTitle} />;
};

const PageNotFound = ({ title }: { title: string }) => {
  useDocumentTitle(title);
  return <Route component={NotFound} />;
};

const AppRoutes = (): React.ReactElement => (
  <LastLocationProvider>
    <Switch>
      {routes.map(({ path, exact, component, title, isAsync }, idx) => (
        <RouteWithTitleUpdates
          path={path}
          exact={exact}
          component={component}
          key={idx}
          title={title}
          isAsync={isAsync}
        />
      ))}
      <PageNotFound title="404 Page Not Found" />
    </Switch>
  </LastLocationProvider>
);

export { AppRoutes, routes };
