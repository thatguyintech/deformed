import { clsx } from 'clsx';
import { useMemo } from 'react';

import { LoadingSpinner } from '../LoadingSpinner/LoadingSpinner';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  theme:
    | 'primary'
    | 'secondary'
    | 'gray'
    | 'white'
    | 'custom'
    | 'black'
    | 'whiteBorder';
  className?: string;
  disabled?: boolean;
  loading?: boolean;
}

const bodyFont = 'font-semibold';

const transitionStyle = 'transition duration-150 ease-out';
const hoverStyle =
  'hover:scale-[1.03] hover:opacity-80 transition duration-150 ease-out';
const baseStyle =
  'py-2 px-4 rounded-xl min-w-10 whitespace-nowrap flex items-center justify-center';

const primary = clsx(
  'shadow-button bg-gradient-to-r from-[#b9e5cd] to-[#b7d4f7] text-white',
  baseStyle,
  hoverStyle,
  bodyFont
);

const deactivated = clsx(
  'bg-disabled shadow-button text-white',
  baseStyle,
  bodyFont
);

const secondary = clsx(
  'py-2 text-[#1a1a1a] opacity-50 hover:scale-105',
  bodyFont
);

const gray = clsx(
  'bg-[#DBDBDB66]/30 text-[17rem] font-medium ease-out',
  baseStyle,
  hoverStyle
);

const deactivatedGray = clsx(
  'bg-[#DBDBDB66]/50 text-[17rem] font-medium text-white ease-out',
  baseStyle
);

const white = clsx('shadow-button bg-white', baseStyle, hoverStyle, bodyFont);

const whiteBorder = clsx(
  'border-[1.5px] border-solid border-black bg-white',
  baseStyle,
  hoverStyle,
  bodyFont
);

const black = clsx(
  'shadow-button bg-black text-white',
  baseStyle,
  hoverStyle,
  bodyFont
);

const custom = clsx(hoverStyle);

const Button = ({
  children,
  theme,
  className,
  disabled,
  type,
  loading,
  ...rest
}: ButtonProps) => {
  const isDisabledStyle: boolean = useMemo(() => {
    return (disabled || loading) ?? false;
  }, [disabled, loading]);

  const style = useMemo(() => {
    if (theme === 'primary') {
      return isDisabledStyle ? deactivated : primary;
    }
    if (theme === 'secondary') {
      return secondary;
    }
    if (theme === 'gray') {
      return isDisabledStyle ? deactivatedGray : gray;
    }
    if (theme === 'white') {
      return isDisabledStyle ? deactivated : white;
    }
    if (theme === 'custom') {
      return isDisabledStyle ? '' : custom;
    }
    if (theme === 'black') {
      return isDisabledStyle ? deactivatedGray : black;
    }
    if (theme === 'whiteBorder') {
      return isDisabledStyle ? deactivatedGray : whiteBorder;
    }
    return '';
  }, [theme, isDisabledStyle]);

  return (
    <button
      className={clsx(className, style, !disabled ? transitionStyle : '')}
      type={type}
      disabled={isDisabledStyle}
      {...rest}
    >
      {loading && <LoadingSpinner className="mr-3 h-2 w-2" />}
      {children}
    </button>
  );
};

Button.defaultProps = {
  type: 'button',
  theme: 'black',
};

export default Button;
