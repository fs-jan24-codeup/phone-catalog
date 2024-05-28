import { useEffect, useState } from 'react';
import { LoginForm } from '../LogIn/LogIn';
import SignupForm from '../SignUp/SignUp';
import Logo from '../../../assets/images/logo.svg';
import FormImg from '../forms img/form-img2.svg';

import '../Forms.scss';

interface InitialBlockProps {
  onClose: () => void;
  setShowForm: (showForm: boolean) => void;
}

const InitialForm: React.FC<InitialBlockProps> = ({ setShowForm }) => {
  const [showInitialForm, setShowInitialForm] = useState(true);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showSignupForm, setShowSignupForm] = useState(false);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'scroll';
    };
  }, []);

  const handleLoginClick = () => {
    setShowInitialForm(false);
    setShowLoginForm(true);
  };

  const handleSignupClick = () => {
    setShowInitialForm(false);
    setShowSignupForm(true);
  };

  const handleCrossClick = () => {
    setShowInitialForm(false);
    setShowLoginForm(false);
    setShowSignupForm(false);
    setShowForm(false);
  };

  return (
    <div>
      {showInitialForm && (
        <>
          <div className="form">
            <div className="form__container">
              <div className="form__upperside upperside">
                <img src={Logo} alt="logo" className="form__logo" />
                <button className="form__cross" onClick={handleCrossClick}>
                  ✖
                </button>
              </div>
              <p className="form__text">
                Nice Gadgets is an online platform for exploring and purchasing a variety of electronic devices, including smartphones and other innovative gadgets.
              </p>
              <img src={FormImg} alt="img" className="form__img" />
              <div className="form__downside">
                <button className="form__button margin-right" onClick={handleLoginClick}>
                  Log In
                </button>
                <button className="form__button" onClick={handleSignupClick}>
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        </>
      )}
      {showLoginForm && (
        <>
          <LoginForm onClose={() => setShowForm(false)} onBack={() => setShowInitialForm(true)} />
        </>
      )}
      {showSignupForm && (
        <>
          <SignupForm onClose={() => setShowForm(false)} onBack={() => setShowInitialForm(true)} />
        </>
      )}
    </div>
  );
};

export default InitialForm;
