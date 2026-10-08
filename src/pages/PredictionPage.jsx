import React, { useEffect, useRef } from 'react';
import { PageHeader } from '../components/PageHeader';
import { PredictionForm } from '../components/PredictionForm';
import { ResultCard } from '../components/ResultCard';
import { Disclaimer } from '../components/Disclaimer';
import { usePredictionFlow } from '../hooks/usePredictionFlow';

export function PredictionPage({ useLiveApi = false, mockOutcome = 'auto' }) {
  const { values, errors, status, result, apiError, setField, submit, retry, reset } = usePredictionFlow({
    useLiveApi,
    mockOutcome
  });
  const resultRef = useRef(null);
  const topRef = useRef(null);

  useEffect(() => {
    if (status === 'success' || status === 'error') {
      resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [status]);

  const handleSubmit = () => {
    const firstInvalid = submit();
    if (firstInvalid) document.getElementById(`field-${firstInvalid}`)?.focus();
  };

  const handleReset = () => {
    reset();
    topRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    window.setTimeout(() => document.getElementById('field-age')?.focus({ preventScroll: true }), 250);
  };

  return (
    <div className="min-h-screen w-full bg-canvas font-sans text-ink">
      <main ref={topRef} className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-6 sm:py-14">
        <PageHeader />

        <div className="mt-10">
          <PredictionForm
            values={values}
            errors={errors}
            isLoading={status === 'loading'}
            onFieldChange={setField}
            onSubmit={handleSubmit}
          />
        </div>

        <div ref={resultRef} className="mt-6 scroll-mt-6 space-y-4">
          <ResultCard status={status} result={result} apiError={apiError} onReset={handleReset} onRetry={retry} />
          <Disclaimer />
        </div>
      </main>
    </div>
  );
}
