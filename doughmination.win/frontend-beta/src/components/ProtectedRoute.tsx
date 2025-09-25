import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

interface ProtectedRouteProps {
  children: React.ReactNode;
  adminRequired?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, adminRequired = false }) => {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');
      
      if (!token) {
        setIsAuthenticated(false);
        setLoading(false);
        return;
      }

      // Fast-path for mock dev token
      if (token.startsWith('mock-')) {
        setIsAuthenticated(true);
        setIsAdmin(token === 'mock-admin');
        setLoading(false);
        return;
      }

      try {
        // Check if admin when required
        if (adminRequired) {
          const adminRes = await fetch('/api/is_admin', {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          
          if (adminRes.ok) {
            const data = await adminRes.json();
            setIsAdmin(!!data.isAdmin);
          } else {
            setIsAdmin(false);
          }
        }
        
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Auth check error:', error);
        setIsAuthenticated(false);
        setIsAdmin(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [adminRequired]);

  if (loading) {
    return <div className="text-center p-8 font-comic">Verifying access...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  if (adminRequired && !isAdmin) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;