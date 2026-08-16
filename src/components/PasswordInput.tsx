import { useRef, forwardRef, type ChangeEvent } from 'react';
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Eye, EyeOff, X } from "lucide-react";

interface PasswordInputProps {
  password: string;
  setPassword: (val: string) => void;
  isVisible: boolean;
  setIsVisible: (val: boolean) => void;
  onClear: () => void;
}

// MUST be forwardRef or standard function, NEVER defined inside another component
export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ password, setPassword, isVisible, setIsVisible, onClear }, ref) => {
    const internalRef = useRef<HTMLInputElement>(null);
    const inputRef = (ref as React.RefObject<HTMLInputElement>) || internalRef;

    return (
      <div className="relative flex items-center">
        <Input
          ref={inputRef}
          type={isVisible ? "text" : "password"}
          value={password}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
          maxLength={256}
          autoComplete="new-password"
          autoCapitalize="off"
          autoCorrect="off"
          spellCheck={false}
          aria-label="Password to check"
          className="pr-20 text-lg h-14"
        />
        <div className="absolute right-2 flex items-center gap-1">
          {password && (
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={onClear}
              aria-label="Clear password"
              className="h-8 w-8"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => setIsVisible(!isVisible)}
            aria-label={isVisible ? "Hide password" : "Show password"}
            aria-pressed={isVisible}
            className="h-8 w-8"
          >
            {isVisible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </Button>
        </div>
      </div>
    );
  }
);
PasswordInput.displayName = "PasswordInput";