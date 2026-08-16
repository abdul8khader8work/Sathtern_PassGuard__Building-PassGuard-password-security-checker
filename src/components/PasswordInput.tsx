import { useRef, forwardRef, type ChangeEvent, type ClipboardEvent } from 'react';
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Eye, EyeOff, X, RefreshCw } from "lucide-react";

interface PasswordInputProps {
  password: string;
  setPassword: (val: string) => void;
  isVisible: boolean;
  setIsVisible: (val: boolean) => void;
  onClear: () => void;
  onPaste: (e: ClipboardEvent<HTMLInputElement>) => void;
  onTryExample: () => void;
}

// MUST be forwardRef or standard function, NEVER defined inside another component
export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ password, setPassword, isVisible, setIsVisible, onClear, onPaste, onTryExample }, ref) => {
    const internalRef = useRef<HTMLInputElement>(null);
    const inputRef = (ref as React.RefObject<HTMLInputElement>) || internalRef;

    return (
      <div className="space-y-3">
        <div className="relative flex items-center">
          <Input
            ref={inputRef}
            type={isVisible ? "text" : "password"}
            value={password}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
            onPaste={onPaste}
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
        <div className="flex items-center justify-between gap-3">
          <p id="password-help" className="text-sm text-gray-600">
            For safety, don't enter a password you actually use.
          </p>
          <Button type="button" variant="outline" onClick={onTryExample} className="shrink-0">
            <RefreshCw className="h-4 w-4" /> Try an example
          </Button>
        </div>
      </div>
    );
  }
);
PasswordInput.displayName = "PasswordInput";