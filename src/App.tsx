import { BrowserRouter } from 'react-router-dom';
import { AppRouter } from './routes/AppRouter';
import { Header } from './components/Header/Header';
import { useTypedSelector } from './hooks/useTypedSelector';
import { Alert } from './components/Alert/Alert';

export function App() {
  const { alert } = useTypedSelector((state) => state.authReducer);

  return (
    <BrowserRouter>
      <Header />
      {alert.alertText && <Alert props={alert} />}
      <AppRouter />
    </BrowserRouter>
  );
}
