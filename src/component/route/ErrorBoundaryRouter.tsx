import { useRouteError } from "react-router-dom";

export function ErrorBoundaryRouter() {
  const error: any = useRouteError();
  console.error(error);

  const className = "d-flex justify-content-center align-items-center vh-100";

  const status = error?.status ?? null;
  // Check if it's a 404 error
  if (status === 404) {
    return (
      <div className={className}>
        <h1>404 - Page Not Found</h1>
      </div>
    );
  }

  return (
    <div className={className}>
      <h1>Something went wrong!</h1>
    </div>
  );
}

export default ErrorBoundaryRouter;
