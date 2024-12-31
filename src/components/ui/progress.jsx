// components/ui/progress.jsx
import * as React from "react"

const Progress = React.forwardRef(({ value, className, ...props }, ref) => (
  <div
    ref={ref}
    role="progressbar"
    aria-valuemin={0}
    aria-valuemax={100}
    aria-valuenow={value}
    className={className}
    {...props}
  >
    <div
      className="h-full bg-emerald-300 transition-all"
      style={{ width: `${value}%` }}
    />
  </div>
))
Progress.displayName = "Progress"

export { Progress }