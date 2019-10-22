(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('react'), require('prop-types')) :
  typeof define === 'function' && define.amd ? define(['exports', 'react', 'prop-types'], factory) :
  (global = global || self, factory(global['react-service-worker-update-prompt'] = {}, global.React, global.PropTypes));
}(this, function (exports, React, PropTypes) { 'use strict';

  var React__default = 'default' in React ? React['default'] : React;
  PropTypes = PropTypes && PropTypes.hasOwnProperty('default') ? PropTypes['default'] : PropTypes;

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function _extends() {
    _extends = Object.assign || function (target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];

        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }

      return target;
    };

    return _extends.apply(this, arguments);
  }

  function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);

    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);
      if (enumerableOnly) symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
      keys.push.apply(keys, symbols);
    }

    return keys;
  }

  function _objectSpread2(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? arguments[i] : {};

      if (i % 2) {
        ownKeys(source, true).forEach(function (key) {
          _defineProperty(target, key, source[key]);
        });
      } else if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
      } else {
        ownKeys(source).forEach(function (key) {
          Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
      }
    }

    return target;
  }

  function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();
  }

  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }

  function _iterableToArrayLimit(arr, i) {
    if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) {
      return;
    }

    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"] != null) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance");
  }

  var ServiceWorkerContext = React__default.createContext();
  function ServiceWorkerProvider(_ref) {
    var register = _ref.register;

    var _useState = React.useState(null),
        _useState2 = _slicedToArray(_useState, 2),
        waiting = _useState2[0],
        setServiceWorker = _useState2[1];

    var _useState3 = React.useState(false),
        _useState4 = _slicedToArray(_useState3, 2),
        assetsUpdateReady = _useState4[0],
        setAssetsUpdateReady = _useState4[1];

    var _useState5 = React.useState(false),
        _useState6 = _slicedToArray(_useState5, 2),
        assetsCached = _useState6[0],
        setAssetsCached = _useState6[1];

    var value = React.useMemo(function () {
      return {
        assetsUpdateReady: assetsUpdateReady,
        assetsCached: assetsCached,
        // Call when the user confirm update of application and reload page
        updateAssets: function updateAssets() {
          if (waiting) {
            waiting.addEventListener("statechange", function () {
              if (waiting.state === "activated") {
                window.location.reload();
              }
            });
            waiting.postMessage({
              type: "SKIP_WAITING"
            });
          }
        }
      };
    }, [assetsCached, assetsUpdateReady, waiting]); // Once on component mounted subscribe to Update and Succes events in
    // CRA's service worker wrapper

    React__default.useEffect(function () {
      register({
        onRegister: function onRegister(registration) {
          setServiceWorker(registration.waiting);
          setAssetsUpdateReady(!!registration.waiting);
        },
        onUpdate: function onUpdate(registration) {
          setServiceWorker(registration.waiting);
          setAssetsUpdateReady(true);
        },
        onSuccess: function onSuccess() {
          setAssetsCached(true);
        }
      });
    }, []);
    return React__default.createElement(ServiceWorkerContext.Provider, _extends({
      value: value
    }, props));
  }
  ServiceWorkerProvider.propTypes = {
    register: PropTypes.func.isRequired
  };
  function useServiceWorker() {
    var context = React__default.useContext(ServiceWorkerContext);

    if (!context) {
      throw new Error("useServiceWorker must be used within a ServiceWorkerProvider");
    }

    return context;
  }

  var buttonCommon = {
    display: "flex",
    border: "none",
    cursor: "pointer",
    outline: "inherit",
    height: "2rem",
    padding: "0 1rem",
    borderRadius: "3px"
  };
  var styles = {
    prompt: {
      display: "flex",
      position: "absolute",
      bottom: "3rem",
      right: "9rem",
      backgroundColor: "hsl(209, 61%, 16%)",
      zIndex: 1,
      color: "white",
      padding: "0 1rem 0 2rem",
      borderRadius: "3px",
      alignItems: "center"
    },
    hidden: {
      border: 0,
      clip: "rect(0 0 0 0)",
      height: "1px",
      width: "1px",
      margin: "-1px",
      padding: 0,
      overflow: "hidden",
      position: "absolute"
    },
    loading: {
      display: "inline",
      marginLeft: ".5rem"
    },
    button: _objectSpread2({
      background: "hsl(209, 34%, 30%)",
      color: "hsl(212, 33%, 89%)"
    }, buttonCommon, {
      textTransform: "uppercase",
      marginLeft: "2rem",
      fontWeight: "bold",
      "&:hover": {
        background: "hsl(209, 28%, 39%)"
      }
    }),
    dismiss: _objectSpread2({}, buttonCommon, {
      background: "none",
      marginLeft: "1rem",
      color: "hsl(212, 33%, 89%)"
    })
  };
  function Message(props) {
    return React__default.createElement("div", {
      className: props.className,
      style: assetsUpdateReady ? styles.prompt : styles.hidden
    }, React__default.createElement("p", null, props.message), React__default.createElement("button", {
      style: styles.button,
      type: "button",
      onClick: props.onClick,
      disabled: !visible
    }, props.buttonText), React__default.createElement("button", {
      style: styles.dismiss,
      type: "button",
      onClick: props.onDismiss
    }, "X"));
  }
  Message.propTypes = {
    className: PropTypes.string,
    message: PropTypes.string.isRequired,
    buttonText: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    onDismiss: PropTypes.func
  };

  // import Loading from "./assets/svg/loading.svg";
  // import ClearIcon from "./assets/svg/Clear";

  function UpdatePrompt(props) {
    var _useServiceWorker = useServiceWorker(),
        updateAssets = _useServiceWorker.updateAssets,
        assetsUpdateReady = _useServiceWorker.assetsUpdateReady;

    var _useState = React.useState(false),
        _useState2 = _slicedToArray(_useState, 2),
        loading = _useState2[0],
        setLoading = _useState2[1];

    var _useState3 = React.useState(true),
        _useState4 = _slicedToArray(_useState3, 2),
        visible = _useState4[0],
        setVisible = _useState4[1];

    var handleClick = function handleClick() {
      setLoading(true);
      updateAssets();
    };

    var dismiss = function dismiss() {
      return setVisible(false);
    };

    return visible && React__default.createElement(Message, _extends({}, props, {
      onClick: handleClick,
      onDismiss: dismiss
    }));
  }
  UpdatePrompt.propTypes = {
    className: PropTypes.string,
    message: PropTypes.string.isRequired,
    buttonText: PropTypes.string.isRequired
  };

  exports.ServiceWorkerProvider = ServiceWorkerProvider;
  exports.UpdatePrompt = UpdatePrompt;
  exports.useServiceWorker = useServiceWorker;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=bundle.js.map
