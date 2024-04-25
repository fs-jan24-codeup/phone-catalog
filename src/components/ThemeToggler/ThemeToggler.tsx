import React from 'react'
import styles from './ThemeToggler.module.scss'
type Props = {
  value: any;
  onChange: any;
}

export const ThemeToggler:React.FC<Props> = ({ value, onChange }) => (
  <label className={styles.switch} htmlFor="toggler">
    <input
      id="toggler"
      type="checkbox"
      onClick={onChange}
      checked={value}
      readOnly
    />
  </label>
)
