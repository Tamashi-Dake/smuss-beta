import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

interface HeaderButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}
const HeaderButton = forwardRef<HTMLButtonElement, HeaderButtonProps>(
  ({ className, children, type = "button", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={twMerge(
          `
          rounded-full
          bg-green-500
          py-2
          px-4
          flex
          items-center
          justify-center
          hover:opacity-75
          opacity-100
          transition-all
          text-black
          cursor-pointer
          font-bold
          text-lg

        `,
          className
        )}
        type={type}
        {...props}
      >
        {children}
      </button>
    );
  }
);

HeaderButton.displayName = "HeaderButton";

export default HeaderButton;
