import classNames from 'classnames';
import { type ComponentProps } from 'react';

import styles from './ui.module.scss';

const Input = ({
  className,
  label,
  value,
  onChange,
  error,
  ...props
}: ComponentProps<'input'> & {
  label?: string;
  error?: string;
}) => {
  return (
    <div className={classNames(styles.wrapper, className)}>
      <label className={classNames(styles.label)}>{label}</label>
      <input
        {...props}
        className={classNames(styles.input)}
        value={value}
        onChange={onChange}
      />
      {<div className={styles.error}>{error}</div>}
    </div>
  );
};

export { Input };
