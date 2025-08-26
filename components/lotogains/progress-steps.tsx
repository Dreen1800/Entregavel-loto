"use client"

interface ProgressStepsProps {
  step: number
}

export function ProgressSteps({ step }: ProgressStepsProps) {
  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center space-x-2">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
              step >= i 
                ? "bg-lime-500 text-white shadow-lg scale-110" 
                : "bg-muted text-muted-foreground"
            }`}
          >
            {i}
          </div>
        ))}
      </div>
      <div className="h-1 flex-1 mx-4 bg-muted rounded overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-lime-400 to-lime-600 rounded transition-all duration-500 ease-out"
          style={{ width: `${((step - 1) / 2) * 100}%` }}
        />
      </div>
    </div>
  )
}
