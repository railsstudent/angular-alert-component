import { AlertType } from './alert.type';

export const ALERTS: { type: AlertType, message: string }[] = [
    { 
      type: 'info',
      message: 'New software update available.'
    }, 
    { 
      type: 'success',
      message: 'Your purchase has been confirmed!'
    }, 
    { 
      type: 'warning',
      message: 'Warning: Invalid email address!'
    }, 
    { 
      type: 'error',
      message: 'Error! Task failed successfully.'
    }
];
