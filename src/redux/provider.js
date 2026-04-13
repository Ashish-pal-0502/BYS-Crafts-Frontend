"use client";

import { store } from "./store";
import { Provider } from "react-redux";
import { GoogleOAuthProvider } from "@react-oauth/google";

export function Providers({ children }) {
  return (
    <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}>
      <Provider store={store}>{children}</Provider>
    </GoogleOAuthProvider>
  );
}
