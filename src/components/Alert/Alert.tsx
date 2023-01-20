import { IAlertProps } from './types';
import './alert.css';

export function Alert({ props }: IAlertProps) {
  return (
    <div className={`alert alert-wrapper alert-${props.alertStatus}`}>
      {props.alertText}
    </div>
  );
}
