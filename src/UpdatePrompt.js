import React, { useState } from "react";
import PropTypes from "prop-types";
import { useServiceWorker } from "./ServiceWorkerProvider";
import { Message } from "./Message";
// import Icon from "./components/common/Icon";
// import Loading from "./assets/svg/loading.svg";
// import ClearIcon from "./assets/svg/Clear";

export function UpdatePrompt(props) {
  const { updateAssets, assetsUpdateReady } = useServiceWorker();
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(true);

  const handleClick = () => {
    setLoading(true);
    updateAssets();
  };

  const dismiss = () => setVisible(false);

  return (
    visible && (
      <Message 
        {...props}
        onClick={handleClick}
        onDismiss={dismiss}
        visible={assetsUpdateReady}
      />
    )
  );
}

UpdatePrompt.propTypes = {
  className: PropTypes.string,
  message: PropTypes.string.isRequired,
  buttonText: PropTypes.string.isRequired
};

