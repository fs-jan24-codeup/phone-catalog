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
  
  const LoginForm: React.FC<LoginFormProps> = ({ onClose }) => {  
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
        <p className='form__title'>Log In</p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input className='form__input' type="email" placeholder="Enter Email" {...register('email', { required: true })}/>
                {errors.email && <span className="error-message">Username is required.</span>}
          <input className='form__input' type="password" placeholder="Enter Password" {...register('password', { required: true })} />
                {errors.password && <span className="error-message">Password is required.</span>}
          <button className='form__button log' type="submit">Log In</button>
        </form>
        </div>
      </div>
    );
  };
  
  export default LoginForm;