import { forwardRef } from "react";

interface SwitchRootProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
}

const SwitchRoot = forwardRef<HTMLButtonElement, SwitchRootProps>(
  ({ checked = false, onCheckedChange, disabled, className, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        type="button"
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={() => !disabled && onCheckedChange?.(!checked)}
        className={`
          inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent
          transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2
          disabled:cursor-not-allowed disabled:opacity-50
          data-[state=checked]:bg-gray-900 data-[state=unchecked]:bg-gray-200
          ${className || ""}
        `}
        data-state={checked ? "checked" : "unchecked"}
        {...props}
      >
        <SwitchThumb />
      </button>
    );
  }
);
SwitchRoot.displayName = "Switch.Root";

interface SwitchThumbProps extends React.HTMLAttributes<HTMLSpanElement> {}

const SwitchThumb = forwardRef<HTMLSpanElement, SwitchThumbProps>(
  ({ className, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={`
          pointer-events-none block h-5 w-5 rounded-full bg-white shadow-lg ring-0
          transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0
          ${className || ""}
        `}
        {...props}
      />
    );
  }
);
SwitchThumb.displayName = "Switch.Thumb";

export const Switch = {
  Root: SwitchRoot,
  Thumb: SwitchThumb,
};