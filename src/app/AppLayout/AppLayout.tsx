import * as React from 'react';
import { NavLink } from 'react-router-dom';
import {
  Nav,
  NavList,
  NavItem,
  Page,
  PageHeader,
  PageSidebar,
  SkipToContent
} from '@patternfly/react-core';
import { routes } from '@app/routes';
import { Catalog } from '@app/contexts/catalog';
import { KameletCatalog } from '@app/models/kamelet';

interface IAppLayout {
  children: React.ReactNode;
}

const AppLayout: React.FunctionComponent<IAppLayout> = ({children}) => {
  const logoProps = {
    href: '/'
  };
  const [isNavOpen, setIsNavOpen] = React.useState(true);
  const [isMobileView, setIsMobileView] = React.useState(true);
  const [isNavOpenMobile, setIsNavOpenMobile] = React.useState(false);
  const onNavToggleMobile = () => {
    setIsNavOpenMobile(!isNavOpenMobile);
  };
  const onNavToggle = () => {
    setIsNavOpen(!isNavOpen);
  }
  const onPageResize = (props: { mobileView: boolean; windowSize: number }) => {
    setIsMobileView(props.mobileView);
  };
  const Header = (
    <PageHeader
      logo="Kamelet Hub"
      logoProps={logoProps}
      showNavToggle
      isNavOpen={isNavOpen}
      onNavToggle={isMobileView ? onNavToggleMobile : onNavToggle}
    />
  );

  const Navigation = (
    <Nav id="nav-primary-simple" theme="dark">
      <NavList id="nav-list-simple">
        {routes.map((route, idx) => route.label && (
            <NavItem key={`${route.label}-${idx}`} id={`${route.label}-${idx}`}>
              <NavLink exact to={route.path} activeClassName="pf-m-current">{route.label}</NavLink>
            </NavItem>
          ))}
      </NavList>
    </Nav>
  );
  const Sidebar = (
    <PageSidebar
      theme="dark"
      nav={Navigation}
      isNavOpen={isMobileView ? isNavOpenMobile : isNavOpen} />
  );
  const PageSkipToContent = (
    <SkipToContent href="#primary-app-container">
      Skip to Content
    </SkipToContent>
  );

  const [catalog, setCatalog] = React.useState<KameletCatalog>({items: []})
  
  React.useEffect(() => {
    fetch("https://api.github.com/repos/nicolaferraro/kamelet-catalog/releases/latest")
      .then(res => res.json())
      .then(res => fetch("https://raw.githubusercontent.com/nicolaferraro/kamelet-catalog/" + res["tag_name"] +"/dist/catalog.json"))
      .then(res => res.json())
      .then(setCatalog)
  }, [])
  

  return (
      <Catalog.Provider value={catalog}>
        <Page
          mainContainerId="primary-app-container"
          header={Header}
          sidebar={Sidebar}
          onPageResize={onPageResize}
          skipToContent={PageSkipToContent}>
          {children}
        </Page>
      </Catalog.Provider>
  );
}

export { AppLayout };
