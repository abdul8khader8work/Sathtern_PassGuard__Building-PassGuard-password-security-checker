import * as React from "react"
import * as SwitchPrimitives from "@radix-ui/react-switch"
import { cn } from "@/lib/utils"

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>
>(({ className, checked, defaultChecked, onCheckedChange, ...props }, ref) => {
  
  const [internalChecked, setInternalChecked] = React.useState(checked ?? defaultChecked ?? false);

  React.useEffect(() => {
    if (checked !== undefined) setInternalChecked(checked);
  }, [checked]);

  const handleChange = (val: boolean) => {
    setInternalChecked(val);
    onCheckedChange?.(val);
  };

  return (
    <SwitchPrimitives.Root
      className={cn(
        "peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50",
        internalChecked ? "bg-gray-900" : "bg-gray-200",
        className
      )}
      checked={internalChecked}
      onCheckedChange={handleChange}
      {...props}
      ref={ref}
    >
      <SwitchPrimitives.Thumb
        className="pointer-events-none block h-5 w-5 rounded-full bg-white shadow-lg ring-0 transition-transform duration-200 ease-in-out"
        style={{ transform: internalChecked ? 'translateX(22px)' : 'translateX(0px)' }}
      />
    </SwitchPrimitives.Root>
  );
});
Switch.displayName = SwitchPrimitives.Root.displayName;

export { Switch }