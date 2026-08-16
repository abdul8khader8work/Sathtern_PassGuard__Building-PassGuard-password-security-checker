import { Eye, EyeOff, X, RefreshCw } from "lucide-react";
import { MAX_PASSWORD_LENGTH } from "../lib/constants";
import { INPUT_CLASS, LABEL_CLASS, HELPER_TEXT_CLASS, ICON_BUTTON_CLASS, BUTTON_SECONDARY_CLASS, TRANSITION_CLASS } from "../lib/constants";

interface PasswordInputProps {
  password: string;
  isVisible: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onPaste: (e: React.ClipboardEvent<HTMLInputElement>) => void;
  toggleVisibility: () => void;
  clearPassword: () => void;
  tryExample: () => void;
  disabled?: boolean;
}

export function PasswordInput({
  password,
  isVisible,
  onChange,
  onPaste,
  toggleVisibility,
  clearPassword,
  tryExample,
  disabled = false,
}: PasswordInputProps) {
  return (
    <div className="space-y-3">
      <label htmlFor="password-input" className={LABEL_CLASS}>
        Enter a password to test
      </label>
      <div className="relative">
        <input
          id="password-input"
          type={isVisible ? "text" : "password"}
          value={password}
          onChange={onChange}
          onPaste={onPaste}
          maxLength={MAX_PASSWORD_LENGTH}
          autoComplete="new-password"
          autoCapitalize="off"
          autoCorrect="off"
          spellCheck={false}
          aria-label="Password to check"
          aria-describedby="password-help"
          disabled={disabled}
          className={`${INPUT_CLASS} pr-32`}
          placeholder="Type or paste a password"
        />
        <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
          {password && (
            <button
              type="button"
              onClick={clearPassword}
              className={ICON_BUTTON_CLASS}
              aria-label="Clear password"
              disabled={disabled}
            >
              <X className="w-5 h-5" aria-hidden="true" />
            </button>
          )}
          <button
            type="button"
            onClick={toggleVisibility}
            className={ICON_BUTTON_CLASS}
            aria-label={isVisible ? "Hide password" : "Show password"}
            aria-pressed={isVisible}
            disabled={disabled}
          >
            {isVisible ? <EyeOff className="w-5 h-5" aria-hidden="true" /> : <Eye className="w-5 h-5" aria-hidden="true" />}
          </button>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <p id="password-help" className={HELPER_TEXT_CLASS}>
          For safety, don&apos;t enter a password you actually use.
        </p>
        <button
          type="button"
          onClick={tryExample}
          className={`${BUTTON_SECONDARY_CLASS} ${TRANSITION_CLASS} text-sm px-3 py-1.5`}
          disabled={disabled}
        >
          <RefreshCw className="w-4 h-4 mr-1.5" aria-hidden="true" />
          Try an example
        </button>
      </div>
    </div>
  );
}