import '../Forms.scss';
import Logo from '../../../../public/img/logo.svg';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../../hooks/useAuth';

interface LoginFormProps {
  onClose: () => void;
  onBack: () => void;
}

interface FormData {
  // name: string;
  email: string;
  password: string;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onClose, onBack }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const { login } = useAuth();

  const onSubmit = async (data: FormData) => {
    try {
      await login(data);
      onClose();
    } catch (error) {
      console.error('Error during login:', error);
    }
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
          {/* <input
            className="form__input"
            type="text"
            placeholder="Enter Username"
            {...register('name')}
          /> */}
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
