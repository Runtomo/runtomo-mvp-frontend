import React from "react";
import { AuthProvider } from "./context/authcontext/AuthContext";
import { DataProvider } from "./context/datacontext/DataContext";
import AppNavContainer from "./navigations/AppNavContainer";
import useCachedResources from "./helpers/useCashedResources";
import Spinner from "./screens/spinner/Spinner";

(function () {
  var cors_api_host = "cors-anywhere.herokuapp.com";
  var cors_api_url = "https://" + cors_api_host + "/";
  var slice = [].slice;
  var origin = window.location.protocol + "//" + window.location.host;
  var open = XMLHttpRequest.prototype.open;
  XMLHttpRequest.prototype.open = function () {
    var args = slice.call(arguments);
    var targetOrigin = /^https?:\/\/([^\/]+)/i.exec(args[1]);
    if (
      targetOrigin &&
      targetOrigin[0].toLowerCase() !== origin &&
      targetOrigin[1] !== cors_api_host
    ) {
      args[1] = cors_api_url + args[1];
    }
    return open.apply(this, args);
  };
})();

export default function App() {
  const isLoadingComplete = useCachedResources();
  if (!isLoadingComplete) {
    return <Spinner />;
  } else {
    return (
      <AuthProvider>
        <DataProvider>
          <AppNavContainer />
        </DataProvider>
      </AuthProvider>
    );
  }
}
