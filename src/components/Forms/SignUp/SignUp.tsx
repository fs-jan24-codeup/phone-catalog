import '../Forms.scss';
import Logo from '../../../../public/img/logo.svg';
import { useForm } from 'react-hook-form';
import { registerRequest } from '../../../utils/fetchData';
import { useAuth } from '../../../hooks/useAuth';

interface LoginFormProps {
  onClose: () => void;
  onBack: () => void;
}

interface FormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const SignupForm: React.FC<LoginFormProps> = ({ onClose, onBack }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
  const { login } = useAuth();

  const onSubmit = (data: FormData) => {
    console.log(data);
    onClose();
    localStorage.setItem('userData', JSON.stringify(data));
    const { name, email, password } = data;

    registerRequest({
      name, email, password
    }).then(data => {
      console.log({ registerRequest: data });
      login({ email, password });
    });
  };    
  
  const onGoBack = () => {
    onBack();
  };


  return (
    <div className="form">
      <div className='form__container'>
        <div className='form__upperside'>
          <img src={Logo} alt="logo" className='form__logo'/>
          <div className='form__buttons'>
            <button className='form__cross' onClick={onGoBack}>⬅</button>  
            <button className='form__cross' onClick={onClose}>✖</button> 
          </div>
        </div>
        <p className='form__title'>Sign Up</p>
        <p className='form__text'>Explore our community for updates and exclusive offers.</p>
        <form onSubmit={handleSubmit(onSubmit)}>
        <input
            className="form__input"
            type="name"
            placeholder="Enter Username"
            {...register('name', { required: true })}
          />
          <input className='form__input' type="email" placeholder="Enter Email" {...register('email', { required: 'Email is required.', pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i })} />
          {errors.email && <span className="error-message">{errors.email.message}</span>}
          <input className='form__input' type="password" placeholder="Enter Password" {...register('password', { required: 'Password is required.', minLength: { value: 8, message: 'Password must be at least 8 characters long.' } })} />
          {errors.password && <span className="error-message">{errors.password.message}</span>}
          <input className='form__input' type="password" placeholder="Confirm Password" {...register('confirmPassword', { required: 'Confirm Password is required.', minLength: { value: 8, message: 'Password must be at least 8 characters long.' } })} />
          {errors.confirmPassword && <span className="error-message">{errors.confirmPassword.message}</span>}
          <button className='form__button sign' type="submit">Sign Up</button>
        </form>
      </div>
    </div>
  );
};

export default SignupForm;
