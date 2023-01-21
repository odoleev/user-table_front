import React, { MutableRefObject, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthEnum, IAuthPage } from '../pages.types';
import { firstLetterToUpperCase } from '../../utils/firstLetterToUpperCase';
import './auth.css';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { Spinner } from '../../components/Spinner/Spinner';
import { useActions } from '../../hooks/useActions';

export function AuthPage({ type }: IAuthPage) {
  const { isLoading } = useTypedSelector((state) => state.authReducer);
  const [isAllFields, setIsAllFields] = useState<boolean>(false);
  const emailRef = useRef() as MutableRefObject<HTMLInputElement>;
  const passwordRef = useRef() as MutableRefObject<HTMLInputElement>;
  const usernameRef = useRef() as MutableRefObject<HTMLInputElement>;
  const { login, registration } = useActions();
  const title = firstLetterToUpperCase(type);
  const navigate = useNavigate();

  const cleanRefValue = () => {
    emailRef.current.value = '';
    usernameRef.current.value = '';
    passwordRef.current.value = '';
  };

  const handleLogin = (email: string, password: string) => {
    if (!email || !password) {
      setIsAllFields(true);
      return;
    }

    const result = login(email, password);
    if (!result) navigate('/table');
  };

  const handleRegistration = async (
    email: string,
    password: string,
    username: string
  ) => {
    if (!email || !password || !username) {
      setIsAllFields(true);
      return;
    }

    const result = registration(email, password, username);

    if (await result) {
      navigate('/login');
    }
    cleanRefValue();
  };

  const onSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    switch (type) {
      case AuthEnum.LOGIN:
        handleLogin(emailRef.current.value, passwordRef.current.value);
        break;
      case AuthEnum.REGISTRATION:
        handleRegistration(
          emailRef.current.value,
          passwordRef.current.value,
          usernameRef.current.value
        );
        break;
      default:
        break;
    }
  };

  return (
    <div className="container">
      <h3>{title}</h3>
      <form className="form-group auth_form" onSubmit={onSubmit}>
        <label className="auth_label">
          Email
          <input
            onFocus={() => setIsAllFields(false)}
            ref={emailRef}
            type="email"
            className="form-control"
          />
        </label>
        {type === AuthEnum.REGISTRATION && (
          <label onFocus={() => setIsAllFields(false)} className="auth_label">
            Name
            <input ref={usernameRef} type="text" className="form-control" />
          </label>
        )}
        <label className="auth_label">
          Password
          <input
            onFocus={() => setIsAllFields(false)}
            ref={passwordRef}
            type="password"
            className="form-control"
          />
        </label>
        {isAllFields && (
          <div className="alert alert-danger" role="alert">
            Fill in all fields
          </div>
        )}
        <button type="submit" className="btn btn-dark auth-btn">
          {isLoading ? <Spinner top={5} left={20} /> : title}
        </button>
      </form>
      {type === AuthEnum.LOGIN ? (
        <div>
          <span className="question_text">Don't have account?</span>
          <Link to="/registration">Sign up</Link>
        </div>
      ) : (
        <div>
          <span>Have account? </span>
          <Link onClick={cleanRefValue} to="/login">
            Sign in
          </Link>
        </div>
      )}
    </div>
  );
}
