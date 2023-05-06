import React, { Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ReactDOM from "react-dom/client";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";

import store from './state/index'
import { Provider } from "react-redux";

import RootLayout from './Rootpages/RootLayout';
import Index from './pages/Index';
import ErrorPage from './pages/ErrorPage';

const AddPost = React.lazy(() => import("./pages/AddPost"));
const EditPost = React.lazy(() => import("./pages/EditPost"));
const Details = React.lazy(() => import("./pages/Details"));

const paramTypeHandler = ({ params }) => {
  if (isNaN(params.id)) {
    throw new Response("Bad Request", { statusText: "Please, Enter Integer Value", status: 400 });
  }
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Index /> },
      { path: 'post', element: <Index /> },
      {
        path: 'post/add',
        element:
          <Suspense fallback="Loading, Please wait">
            <AddPost />
          </Suspense>
      },
      {
        path: 'post/:id/edit',
        element:
          <Suspense fallback="Loading, Please wait">
            <EditPost />
          </Suspense>,
        loader: paramTypeHandler
      },
      {
        path: 'post/:id',
        element:
          <Suspense fallback="Loading, Please wait">
            <Details />
          </Suspense>,
        loader: paramTypeHandler
      },
    ]
  }
])

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}></RouterProvider>
    </Provider>
  </React.StrictMode>
);
