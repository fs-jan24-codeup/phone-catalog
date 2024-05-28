import '../Forms.scss';
import Logo from '../../../../public/img/logo.svg';

import { useForm } from 'react-hook-form';
import { loginRequest } from '../../../utils/fetchData';

interface LoginFormProps {
  onClose: () => void;
  onBack: () => void;
}

interface FormData {
  name: string;
  email: string;
  password: string;
}

const LoginForm: React.FC<LoginFormProps> = ({ onClose, onBack }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    onClose();
    localStorage.setItem('userData', JSON.stringify(data));
    const { email, password } = data;
 
    loginRequest({
      email,
      password,
    }).then(data => {
      if (data.token) {
        
        console.log(data.token);
      }
      console.log({ registerRequest: data });
    }).catch(error => {
      console.error('Error during login:', error);
    });
  };

  const onGoBack = () => {
    onBack();
  };

  return (
    <div className="form">
      <div className="form__container">
        <div className="form__upperside">
          <img src={Logo} alt="logo" className="form__logo" />
          <div className="form__buttons">
            <button className="form__cross" onClick={onGoBack}>
              ⬅
            </button>
            <button className="form__cross" onClick={onClose}>
              ✖
            </button>
          </div>
        </div>
        <p className="form__title">Log In</p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            className="form__input"
            type="name"
            placeholder="Enter Username"
            {...register('name', { required: true })}
          />
          {errors.name && (
            <span className="error-message">Username is required.</span>
          )}
          <input
            className="form__input"
            type="email"
            placeholder="Enter Email"
            {...register('email', { required: true })}
          />
          {errors.email && (
            <span className="error-message">Email is required.</span>
          )}
          <input
            className="form__input"
            type="password"
            placeholder="Enter Password"
            {...register('password', { required: true })}
          />
          {errors.password && (
            <span className="error-message">Password is required.</span>
          )}
          <button className="form__button log" type="submit">
            Log In
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
