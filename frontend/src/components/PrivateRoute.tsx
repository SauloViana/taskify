import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { ReactElement } from "react";

type PrivateRouteProps = {
    children: ReactElement;
}

export default function PrivateRoute({ children }: PrivateRouteProps) {
    const { token } = useAuth();

    if (!token) {
        return <Navigate to="/login" />;
    }

    return <>{children}</>
}