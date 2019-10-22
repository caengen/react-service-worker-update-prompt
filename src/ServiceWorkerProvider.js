// ✂️ code from: https://github.com/facebook/create-react-app/issues/5316#issuecomment-496292914

import React, { useMemo, useState } from "react";
import PropTypes from "prop-types";

const ServiceWorkerContext = React.createContext();

export function ServiceWorkerProvider({ register }) {
  const [waiting, setServiceWorker] = useState(null);
  const [assetsUpdateReady, setAssetsUpdateReady] = useState(false);
  const [assetsCached, setAssetsCached] = useState(false);

  const value = useMemo(
    () => ({
      assetsUpdateReady,
      assetsCached,
      // Call when the user confirm update of application and reload page
      updateAssets: () => {
        if (waiting) {
          waiting.addEventListener("statechange", () => {
            if (waiting.state === "activated") {
              window.location.reload();
            }
          });

          waiting.postMessage({ type: "SKIP_WAITING" });
        }
      }
    }),
    [assetsCached, assetsUpdateReady, waiting]
  );

  // Once on component mounted subscribe to Update and Succes events in
  // CRA's service worker wrapper
  React.useEffect(() => {
    register({
      onRegister: registration => {
        setServiceWorker(registration.waiting);
        setAssetsUpdateReady(!!registration.waiting);
      },
      onUpdate: registration => {
        setServiceWorker(registration.waiting);
        setAssetsUpdateReady(true);
      },
      onSuccess: () => {
        setAssetsCached(true);
      }
    });
  }, []);

  return <ServiceWorkerContext.Provider value={value} {...props} />;
}
ServiceWorkerProvider.propTypes = {
  register: PropTypes.func.isRequired
};

export function useServiceWorker() {
  const context = React.useContext(ServiceWorkerContext);

  if (!context) {
    throw new Error(
      "useServiceWorker must be used within a ServiceWorkerProvider"
    );
  }

  return context;
}

