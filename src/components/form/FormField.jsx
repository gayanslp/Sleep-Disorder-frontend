import React from 'react';
import { ChevronDownIcon } from 'lucide-react';
import { RangeInput } from './RangeInput';

const baseInput =
  'block h-11 w-full rounded-lg border bg-field px-3.5 text-[15px] text-ink placeholder:text-subtle transition-[border-color,box-shadow,background-color] duration-150 ease-snappy focus:bg-surface focus:outline-none focus:ring-4 disabled:cursor-not-allowed disabled:opacity-60';

export function FormField({ field, value, error, disabled, onChange }) {
  const id = `field-${field.name}`;
  const hintId = `${id}-hint`;
  const errorId = `${id}-error`;
  const describedBy = [field.hint && field.kind !== 'range' ? hintId : null, error ? errorId : null]
    .filter(Boolean)
    .join(' ') || undefined;
  const stateClass = error
    ? 'border-danger-fg/60 focus:border-danger-fg focus:ring-danger-ring/60'
    : 'border-line hover:border-brand-200 focus:border-brand-500 focus:ring-brand-100';

  return (
    <div className="flex flex-col">
      <label htmlFor={id} className="mb-1.5 text-sm font-medium text-ink">
        {field.label}
      </label>

      {field.kind === 'range' ? (
        <RangeInput
          id={id}
          value={value}
          min={field.min}
          max={field.max}
          lowLabel={field.lowLabel}
          highLabel={field.highLabel}
          hasError={Boolean(error)}
          disabled={disabled}
          describedBy={error ? errorId : undefined}
          onChange={onChange}
        />
      ) : field.kind === 'select' ? (
        <div className="relative">
          <select
            id={id}
            value={value}
            disabled={disabled}
            aria-invalid={Boolean(error)}
            aria-describedby={describedBy}
            onChange={(e) => onChange(e.target.value)}
            className={`${baseInput} ${stateClass} appearance-none pr-10 ${value ? '' : 'text-subtle'}`}
          >
            <option value="" disabled>
              {field.placeholder}
            </option>
            {field.options.map((option) => (
              <option key={option} value={option} className="text-ink">
                {option}
              </option>
            ))}
          </select>
          <ChevronDownIcon
            className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-subtle"
            aria-hidden="true"
          />
        </div>
      ) : (
        <div className="relative">
          <input
            id={id}
            type={field.kind === 'number' ? 'number' : 'text'}
            inputMode={field.kind === 'number' ? (field.decimal ? 'decimal' : 'numeric') : 'text'}
            step={field.kind === 'number' ? field.step ?? 1 : undefined}
            value={value}
            placeholder={field.placeholder}
            disabled={disabled}
            aria-invalid={Boolean(error)}
            aria-describedby={describedBy}
            onChange={(e) => onChange(e.target.value)}
            className={`${baseInput} ${stateClass} ${field.unit ? 'pr-24' : ''}`}
          />
          {field.unit && (
            <span className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-medium text-subtle">
              {field.unit}
            </span>
          )}
        </div>
      )}

      {error ? (
        <p id={errorId} className="mt-1.5 text-xs font-medium text-danger-fg">
          {error}
        </p>
      ) : (
        field.hint &&
        field.kind !== 'range' && (
          <p id={hintId} className="mt-1.5 text-xs text-subtle">
            {field.hint}
          </p>
        )
      )}
    </div>
  );
}
