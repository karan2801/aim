import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import AlertBanner from 'components/kit/AlertBanner';
import SideBar from 'components/SideBar/SideBar';
import ProjectWrapper from 'components/ProjectWrapper/ProjectWrapper';
import Theme from 'components/Theme/Theme';
import BusyLoaderWrapper from 'components/BusyLoaderWrapper/BusyLoaderWrapper';
import ErrorBoundary from 'components/ErrorBoundary/ErrorBoundary';

import { checkIsBasePathInCachedEnv, getBasePath } from 'config/config';

import routes from 'routes/routes';

import { inIframe } from 'utils/helper';

import './App.scss';

const basePath = getBasePath(false);

const isVisibleCacheBanner = checkIsBasePathInCachedEnv(basePath) && inIframe();

function App(): React.FunctionComponentElement<React.ReactNode> {
  React.useEffect(() => {
    let timeoutId: number;
    const preloader = document.getElementById('preload-spinner');
    if (preloader) {
      preloader.classList.add('preloader-fade-out');
      timeoutId = window.setTimeout(() => {
        preloader.remove();
      }, 1000);
    }
    return () => {
      window.clearTimeout(timeoutId);
    };
  }, []);

  return (
    <BrowserRouter basename={basePath}>
      <ProjectWrapper />
      <Theme>
        {isVisibleCacheBanner && (
          <AlertBanner type='warning' isVisiblePermanently={true}>
            You are using UI from notebook env, please make sure to
            <b>keep server running</b> for a better experience
          </AlertBanner>
        )}
        <div className='pageContainer'>
          <ErrorBoundary>
            <SideBar />
          </ErrorBoundary>
          <div className='mainContainer'>
            <React.Suspense
              fallback={<BusyLoaderWrapper height='100vh' isLoading />}
            >
              <Switch>
                {Object.values(routes).map((route, index) => {
                  const { component: Component, path, isExact } = route;
                  return (
                    <Route path={path} key={index} exact={isExact}>
                      <ErrorBoundary>
                        <Component />
                      </ErrorBoundary>
                    </Route>
                  );
                })}
                <Redirect to='/' />
              </Switch>
            </React.Suspense>
          </div>
        </div>
      </Theme>
    </BrowserRouter>
  );
}

export default App;
