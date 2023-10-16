import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./home";
import ItemsList from "./itemList";
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import '@aws-amplify/ui-react/styles.css';
import { Amplify, Auth } from 'aws-amplify';
import configure from './aws-exports';
import { AmplifyProvider } from '@aws-amplify/ui-react';

Amplify.configure(configure);

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <AmplifyProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path="itemList" element={<ItemsList />} />
          
        </Route>
      </Routes>
    </BrowserRouter>
  </AmplifyProvider>,
  document.getElementById('root')
);

reportWebVitals();