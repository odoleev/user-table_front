import React, { useEffect } from 'react';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import { ROUTES } from './index';
import { PagesLayout } from '../components/Layout';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { useActions } from '../hooks/useActions';

export function AppRouter() {
  const { isAuth } = useTypedSelector((state) => state.authReducer);
  const { setToken, setAuth, logout } = useActions();
  const token = localStorage.getItem('token');

  const error = useTypedSelector((state) => state.usersReducer.error);
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      setToken(token);
      setAuth(true);
    }
    if (error) {
      logout();
      navigate('/login');
    }
  }, [error, token]);

  return (
    <Routes>
      {ROUTES.map(
        ({ path, element, auth, type }) =>
          !auth && (
            <Route
              key={path}
              path={path}
              element={
                isAuth ? (
                  <Navigate to="/table" />
                ) : (
                  <PagesLayout type={type} element={element} />
                )
              }
            />
          )
      )}
      {ROUTES.map(
        ({ path, element, auth }) =>
          auth && (
            <Route
              key={path}
              path={path}
              element={
                isAuth ? (
                  <PagesLayout element={element} />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
          )
      )}
      <Route
        path="*"
        element={isAuth ? <Navigate to="/table" /> : <Navigate to="/login" />}
      />
    </Routes>
  );
}
