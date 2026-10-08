import React from 'react';

export function RangeInput({
  id,
  value,
  min,
  max,
  lowLabel,
  highLabel,
  hasError,
  disabled,
  describedBy,
  onChange
}) {
  const isSet = value !== '';
  const numeric = isSet ? Number(value) : Math.round((min + max) / 2);

  return (
    <div
      className={`rounded-lg border bg-field px-3.5 pb-2 pt-2.5 ${
        hasError ? 'border-danger-fg/60' : 'border-line'
      } ${disabled ? 'opacity-60' : ''}`}
    >
      <div className="flex items-center gap-3">
        <input
          id={id}
          type="range"
          min={min}
          max={max}
          step={1}
          value={numeric}
          disabled={disabled}
          aria-invalid={hasError}
          aria-describedby={describedBy}
          aria-valuetext={isSet ? `${value} out of ${max}` : 'Not set'}
          onChange={(e) => onChange(e.target.value)}
          onClick={(e) => !isSet && onChange(e.target.value)}
          className={`h-1.5 flex-1 cursor-pointer accent-brand-600 disabled:cursor-not-allowed ${
            isSet ? '' : 'opacity-40'
          }`}
        />

        <span
          className={`w-14 shrink-0 text-right text-sm tabular-nums ${
            isSet ? 'font-semibold text-ink' : 'text-subtle'
          }`}
        >
          {isSet ? (
            <>
              {value}
              <span className="font-normal text-subtle"> / {max}</span>
            </>
          ) : (
            'Not set'
          )}
        </span>
      </div>
      <div className="mt-1 flex justify-between pr-[68px] text-[11px] text-subtle">
        <span>
          {min} · {lowLabel}
        </span>
        <span>
          {highLabel} · {max}
        </span>
      </div>
    </div>
  );
}
