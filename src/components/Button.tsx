import clsx from 'clsx';
import { ButtonHTMLAttributes, FC, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

const Button: FC<ButtonProps> = ({ children, ...props }) => {
  return (
    <button
      className={clsx(
        'rounded-2xl border px-8 py-2 capitalize',
        'transition hover:bg-rose-400 hover:text-white'
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
