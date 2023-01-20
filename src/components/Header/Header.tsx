import React from 'react';
import './header.css';
import { useNavigate } from 'react-router-dom';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { useActions } from '../../hooks/useActions';

export function Header() {
  const { isAuth } = useTypedSelector((state) => state.authReducer);
  const { logout } = useActions();
  const user = localStorage.getItem('user');
  const navigate = useNavigate();

  const onClick = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="navbar navbar-dark bg-dark header-container ">
      <div className="container flex ">
        <h2 style={{ color: 'white' }}>{user || 'Sign in'}</h2>
        <button
          disabled={!isAuth}
          type="button"
          className="btn btn-light"
          onClick={onClick}
        >
          Logout
        </button>
      </div>
    </header>
  );
}
