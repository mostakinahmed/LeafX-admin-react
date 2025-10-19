import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../Context Api/AuthContext";

export default function PrivateRoute({ children }) {
  const { user, loading } = useContext(AuthContext);

  if (loading)
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-blue-600 text-lg font-semibold animate-pulse">
          Checkig credentials...
        </p>
      </div>
    ); // wait until user state is restored
  return user ? children : <Navigate to="/login" replace />;
}
