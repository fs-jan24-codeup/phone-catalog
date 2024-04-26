import React from 'react';
import './ThemeToggler.scss'

type Props = {
  value: any;
  onChange: any;
}

export const ThemeToggler:React.FC<Props> = ({ value, onChange }) => (
  <div className='toggle-container'>
    <input
      type="checkbox"
      id="check"
      className='toggle'
      onClick={onChange}
      checked={value}
    />
    <label htmlFor="check">Dark Mode</label>
  </div>
)
