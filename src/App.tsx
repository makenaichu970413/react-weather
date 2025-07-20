//? Module
import { lazy } from "react";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Outlet,
} from "react-router-dom";

//? Context
import { MainContext } from "./context";

//? Component
import { ErrorBoundaryRouter, MainLayout } from "./component";

//? Page
//? LazyLoading - Route-Level Splitting
const Weather = lazy(() => import("./page/Weather/Weather"));

const RouterElements = createRoutesFromElements(
  <Route
    path="/"
    element={
      <MainContext>
        <MainLayout>
          <Outlet />
        </MainLayout>
      </MainContext>
    }
    errorElement={
      //? Error Fallback when the router path is invalid
      <ErrorBoundaryRouter />
    }
  >
    <Route index element={<Weather />} />
  </Route>
);

// const basename = `/${BASE_PATH}`;
// const router = createBrowserRouter(RouterElements, { basename });
const router = createBrowserRouter(RouterElements);

//? Hot Module Replacement (HMR) for router:
//? * Maintains application stability during development
//? * Prevents memory leaks when modules are hot-reloaded
//? * Ensures old router instances are garbage collected
if (import.meta.hot) {
  import.meta.hot.dispose(() => router.dispose());
  //? 1. `import.meta.hot` only available in development
  //? 2. `.dispose()` Registers a cleanup callback when the module is replaced
  //? 3. `router.dispose()` Properly cleans up the router instance
}

function App() {
  return <RouterProvider router={router} />;
}

export default App;
