import React from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { AlertTriangleIcon, RotateCcwIcon, RefreshCwIcon, SparklesIcon } from 'lucide-react';
import { predictionClasses } from '../data/predictionClasses';

const ease = [0.23, 1, 0.32, 1];

export function ResultCard({ status, result, apiError, onReset, onRetry }) {
  const reduceMotion = useReducedMotion();
  const enter = reduceMotion
    ? { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } }
    : {
        initial: { opacity: 0, y: 6, scale: 0.98 },
        animate: { opacity: 1, y: 0, scale: 1 },
        exit: { opacity: 0, y: -4, scale: 0.98 }
      };

  return (
    <section
      aria-labelledby="result-heading"
      aria-live="polite"
      className="overflow-hidden rounded-2xl border border-line bg-surface shadow-card"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div key={status} {...enter} transition={{ duration: 0.22, ease }} className="p-5 sm:p-8">
          {status === 'idle' && (
            <div className="flex flex-col items-center py-6 text-center">
              <span className="flex h-11 w-11 items-center justify-center rounded-full border border-dashed border-brand-200 text-brand-500">
                <SparklesIcon className="h-5 w-5" aria-hidden="true" />
              </span>
              <h2 id="result-heading" className="mt-3 text-sm font-medium text-ink">
                Your prediction will appear here
              </h2>
              <p className="mt-1 text-sm text-subtle">Complete the form above and select Predict Sleep Disorder.</p>
            </div>
          )}

          {status === 'loading' && (
            <div className="py-2">
              <h2 id="result-heading" className="text-sm font-medium text-muted">
                Analyzing your information...
              </h2>
              <div className="mt-5 animate-pulse space-y-4" aria-hidden="true">
                <div className="h-9 w-56 rounded-md bg-brand-50" />
                <div className="h-2.5 w-full rounded-full bg-brand-50" />
                <div className="h-3 w-3/4 rounded bg-canvas" />
              </div>
            </div>
          )}

          {status === 'error' && (
            <div className="flex flex-col items-start gap-4 sm:flex-row">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-danger-bg text-danger-fg ring-1 ring-danger-ring">
                <AlertTriangleIcon className="h-5 w-5" aria-hidden="true" />
              </span>
              <div className="flex-1">
                <h2 id="result-heading" className="text-base font-semibold text-ink">
                  Prediction could not be completed
                </h2>
                <p className="mt-1 text-sm leading-relaxed text-muted">{apiError}</p>
                <p className="mt-1 text-sm text-subtle">Your entered information has been kept.</p>
                <button
                  type="button"
                  onClick={onRetry}
                  className="mt-4 inline-flex h-10 items-center gap-2 rounded-lg border border-line bg-surface px-4 text-sm font-medium text-ink transition-[background-color,border-color] duration-150 ease-snappy hover:border-brand-200 hover:bg-brand-50 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-100"
                >
                  <RefreshCwIcon className="h-4 w-4" aria-hidden="true" />
                  Try again
                </button>
              </div>
            </div>
          )}

          {status === 'success' && result && (
            <SuccessContent result={result} onReset={onReset} reduceMotion={Boolean(reduceMotion)} />
          )}
        </motion.div>
      </AnimatePresence>
    </section>
  );
}

function SuccessContent({ result, onReset, reduceMotion }) {
  const display = predictionClasses[result.prediction];
  const Icon = display.icon;
  const percent = Math.max(0, Math.min(100, result.confidence * 100));

  return (
    <div>
      <h2 id="result-heading" className="text-sm font-medium text-muted">
        Prediction Result
      </h2>

      <div className={`mt-4 rounded-xl p-5 ring-1 sm:p-6 ${display.panelClass}`}>
        <div className="flex items-center gap-4">
          <span
            className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-surface ring-1 ${display.badgeClass}`}
            aria-hidden="true"
          >
            <Icon className="h-6 w-6" strokeWidth={1.9} />
          </span>
          <p className={`text-2xl font-bold tracking-wide sm:text-3xl ${display.textClass}`}>{display.label}</p>
        </div>

        <div className="mt-6">
          <div className="flex items-baseline justify-between text-sm">
            <span className="font-medium text-ink">Confidence</span>
            <span className="font-semibold tabular-nums text-ink">{percent.toFixed(1)}%</span>
          </div>
          <div
            className={`mt-2 h-2.5 w-full overflow-hidden rounded-full ${display.trackClass}`}
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Number(percent.toFixed(1))}
            aria-label="Model confidence"
          >
            <motion.div
              className={`h-full rounded-full ${display.barClass}`}
              initial={{ width: reduceMotion ? `${percent}%` : '0%' }}
              animate={{ width: `${percent}%` }}
              transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1], delay: 0.08 }}
            />
          </div>
        </div>
      </div>

      <p className="mt-5 text-sm leading-relaxed text-muted">
        Based on the information provided, the machine learning model predicts the above sleep disorder category.
      </p>

      <button
        type="button"
        onClick={onReset}
        className="mt-5 inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg border border-line bg-surface px-5 text-sm font-semibold text-brand-700 transition-[background-color,border-color] duration-150 ease-snappy hover:border-brand-200 hover:bg-brand-50 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-100 sm:w-auto"
      >
        <RotateCcwIcon className="h-4 w-4" aria-hidden="true" />
        Make Another Prediction
      </button>
    </div>
  );
}
