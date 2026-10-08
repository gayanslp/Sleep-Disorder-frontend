import React from 'react';
import { AlertCircleIcon, BrainIcon, Loader2Icon } from 'lucide-react';
import { formFields } from '../data/formFields';
import { FormField } from './form/FormField';

export function PredictionForm({ values, errors, isLoading, onFieldChange, onSubmit }) {
  const errorCount = Object.keys(errors).length;

  return (
    <form
      noValidate
      onSubmit={(e) => {
        e.preventDefault();
        if (!isLoading) onSubmit();
      }}
      aria-labelledby="form-heading"
    >
      <section className="rounded-2xl border border-line bg-surface p-5 shadow-card sm:p-8">
        <div className="mb-6 border-b border-line pb-5">
          <h2 id="form-heading" className="text-lg font-semibold text-ink">
            Enter Your Information
          </h2>
          <p className="mt-1 text-sm text-muted">All ten fields are used by the model. Units are shown inside each field.</p>
        </div>

        <div className="grid grid-cols-1 gap-x-6 gap-y-5 md:grid-cols-2">
          {formFields.map((field) => (
            <FormField
              key={field.name}
              field={field}
              value={values[field.name]}
              error={errors[field.name]}
              disabled={isLoading}
              onChange={(value) => onFieldChange(field.name, value)}
            />
          ))}
        </div>
      </section>

      <div className="mt-6">
        {errorCount > 0 && (
          <div
            role="alert"
            className="mb-4 flex items-start gap-2.5 rounded-lg bg-danger-bg px-4 py-3 text-sm text-danger-fg ring-1 ring-danger-ring"
          >
            <AlertCircleIcon className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
            <span>
              Please review {errorCount === 1 ? '1 field' : `${errorCount} fields`} highlighted above before
              predicting.
            </span>
          </div>
        )}

        <button
          type="submit"
          disabled={isLoading}
          aria-busy={isLoading}
          className="flex h-14 w-full items-center justify-center gap-2.5 rounded-xl bg-brand-600 px-6 text-base font-semibold text-white shadow-button transition-[background-color,transform] duration-150 ease-snappy hover:bg-brand-700 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-200 active:scale-[0.99] disabled:cursor-wait disabled:bg-brand-500"
        >
          {isLoading ? (
            <>
              <Loader2Icon className="h-5 w-5 animate-spin" aria-hidden="true" />
              Analyzing your information...
            </>
          ) : (
            <>
              <BrainIcon className="h-5 w-5" aria-hidden="true" />
              Predict Sleep Disorder
            </>
          )}
        </button>
      </div>
    </form>
  );
}
