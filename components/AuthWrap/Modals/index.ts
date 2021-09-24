import AuthModal__AttendeeCapture from './AuthModal__AttendeeCapture';
import AuthModal__Email from './AuthModal__EmailOnly';
import AuthModal__Password from './AuthModal__Password';
import AuthModal__AttendeeList from './AuthModal__AttendeeList';
import AuthModal__AttendeeListRegister from './AuthModal__AttendeeListRegister';
import AuthModal__Register from './AuthModal__Register';
import { AuthModalInputOptions } from '../AuthWrap__Types';


type RequiredValues = {
  [x: string] : AuthModalInputOptions
}

export const check_required = (values : RequiredValues ) => {
  let result = Object.keys(values).filter(
    (v) => values[v].value === '' && values[v].required
  );
  if (result.length > 0) {
    return false;
  }
  return true;
};

export {
  AuthModal__AttendeeCapture,
  AuthModal__AttendeeList,
  AuthModal__Email,
  AuthModal__Password,
  AuthModal__AttendeeListRegister,
  AuthModal__Register,
};
