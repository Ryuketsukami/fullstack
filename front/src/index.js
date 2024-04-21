import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {RouterProvider} from "react-router-dom";
import {BlogProvider} from "./providers/blog-provider";
import {router} from "./routes";
import {AuthProvider} from "./providers/auth-provider";
import {ThemeProvider} from "./providers/theme-provider";

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
      <ThemeProvider>
        <AuthProvider>
            <BlogProvider>
                <RouterProvider router={router} />
            </BlogProvider>
        </AuthProvider>
      </ThemeProvider>
  </React.StrictMode>
);
