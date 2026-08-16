import { INPUT_CLASS } from "../lib/constants";

interface GeneratedOutputProps {
  password: string;
}

export function GeneratedOutput({ password }: GeneratedOutputProps) {
  return (
    <div>
      <label htmlFor="generated-output" className="block text-sm font-medium text-gray-900 mb-2">
        Generated Password
      </label>
      <input
        id="generated-output"
        type="text"
        value={password}
        readOnly
        className={`${INPUT_CLASS} font-mono text-base`}
        aria-label="Generated password (read-only)"
      />
    </div>
  );
}