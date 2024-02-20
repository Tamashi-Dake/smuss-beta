import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

// eslint-disable-next-line react/display-name
const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, disabled, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        disabled={disabled}
        className={twMerge(
          `flex w-full rounded-md bg-neutral-700 border border-transparent p-3 text-neutral-100 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent
          file:border-0 file:bg-transparent
          file:text-neutral-100 file:font-medium placeholder:text-neutral-100 file:cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed`,
          className
        )}
        {...props}
      />
    );
  }
);

export default Textarea;
