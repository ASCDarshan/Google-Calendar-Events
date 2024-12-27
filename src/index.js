import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { createClient } from "@supabase/supabase-js";
import { SessionContextProvider } from "@supabase/auth-helpers-react";

const supabase = createClient(
  "https://jxpredspxciqzcejsrkg.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp4cHJlZHNweGNpcXpjZWpzcmtnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzUyODM5MDUsImV4cCI6MjA1MDg1OTkwNX0.nIdg_Xfb8sl5I0Ig8w0GfSGvlv2XYA3WO3tnawVZPQ0"
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <SessionContextProvider supabaseClient={supabase}>
      <App />
    </SessionContextProvider>
  </React.StrictMode>
);

reportWebVitals();
