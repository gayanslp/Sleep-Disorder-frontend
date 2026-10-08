import React from 'react';
import { MoonStarIcon } from 'lucide-react';

export function PageHeader() {
  return (
    <header className="flex flex-col items-center text-center">
      <div className="flex items-center gap-3">
        <span
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600 ring-1 ring-brand-100"
          aria-hidden="true"
        >
          <MoonStarIcon className="h-6 w-6" strokeWidth={1.75} />
        </span>
        <h1 className="text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
          Sleep Disorder Prediction
        </h1>
      </div>
      <p className="mt-3 text-base font-medium text-brand-700 sm:text-lg">
        Machine Learning-Based Sleep Disorder Classification
      </p>
      <p className="mt-2 max-w-md text-sm leading-relaxed text-muted">
        Enter your health and lifestyle information to receive an instant prediction.
      </p>
    </header>
  );
}
