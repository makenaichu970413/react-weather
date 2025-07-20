//? Module
import { Suspense, type ReactNode } from "react";
import {
  ErrorBoundary as ReactErrorBoundary,
  type FallbackProps,
} from "react-error-boundary";

//? Component
import { LoadingSpinner } from ".";

type PRouteLoader = { children: ReactNode; loader?: ReactNode };

function Error(props: FallbackProps) {
  const { error, resetErrorBoundary } = props;
  return (
    <div className="error-fallback">
      <h2>Something went wrong</h2>
      <p>
        <b className="text-danger">ERROR : </b>
        {error.message}
      </p>
      <button onClick={resetErrorBoundary}>Try Again</button>
    </div>
  );
}

export function RouteLoader(props: PRouteLoader) {
  const { children, loader = null } = props;

  //? 1. When a route component is loading (e.g., lazy-loaded)
  //? 2. <Suspense> shows the fallback content (<LoadingSpinner />)
  //? 3. Once the route component finishes loading
  //? 4. <Suspense> replaces the "fallback" with the "children" content (Eg: <Outlet />)
  return (
    //? When any children component under <ReactErrorBoundary> throws an error
    //? The error boundary catches it and render the message into <Error/>
    <ReactErrorBoundary
      FallbackComponent={Error}
      onError={(error, info) => {
        //? Log to error monitoring service
        console.error("ERROR:", { error, info });
      }}
    >
      <Suspense fallback={loader ? loader : <LoadingSpinner />}>
        {children}
      </Suspense>
    </ReactErrorBoundary>
  );
}

export default RouteLoader;
