import '../Forms.scss';
import Logo from '../../../../public/img/logo.svg';
import { useForm } from 'react-hook-form';

interface LoginFormProps {
  onClose: () => void;
}

interface FormData {
  email: string;
  password: string;
}

const SignupForm: React.FC<LoginFormProps> = ({ onClose }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    console.log(data);
    onClose();
    localStorage.setItem('userData', JSON.stringify(data));
  };

  return (
    <div className="form">
      <div className='form__container'>
        <div className='form__upperside'>
          <img src={Logo} alt="logo" className='form__logo'/> 
          <button className='form__cross' onClick={onClose}>✖</button> 
        </div>
        <p className='form__title'>Sign Up</p>
        <p className='form__text'>Explore our community for updates and exclusive offers.</p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input className='form__input' type="email" placeholder="Enter Email" {...register('email', { required: 'Email is required.', pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i })} />
          {errors.email && <span className="error-message">{errors.email.message}</span>}
          <input className='form__input' type="password" placeholder="Enter Password" {...register('password', { required: 'Password is required.', minLength: { value: 8, message: 'Password must be at least 8 characters long.' } })} />
          {errors.password && <span className="error-message">{errors.password.message}</span>}
          <input className='form__input' type="password" placeholder="Confirm Password" {...register('password', { required: 'Password is required.', minLength: { value: 8, message: 'Password must be at least 8 characters long.' } })} />
          {errors.password && <span className="error-message">{errors.password.message}</span>}
          <button className='form__button sign' type="submit">Sign Up</button>
        </form>
      </div>
    </div>
  );
};

export default SignupForm;
