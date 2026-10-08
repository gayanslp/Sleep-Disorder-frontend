import { useCallback, useState } from 'react';
import { emptyFormValues } from '../data/formFields';
import { requestPrediction, toPayload } from '../utils/predictionApi';
import { validateField, validateForm } from '../utils/validation';

export function usePredictionFlow({ useLiveApi, mockOutcome }) {
  const [values, setValues] = useState(emptyFormValues);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle');
  const [result, setResult] = useState(null);
  const [apiError, setApiError] = useState(null);

  const setField = useCallback((name, value) => {
    setValues((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => {
      if (!prev[name]) return prev;
      const next = { ...prev };
      const error = validateField(name, value);
      if (error) next[name] = error;
      else delete next[name];
      return next;
    });
  }, []);

  const runPrediction = useCallback(
    async (current) => {
      setStatus('loading');
      setApiError(null);
      setResult(null);
      try {
        const response = await requestPrediction(toPayload(current), { useLiveApi, mockOutcome });
        setResult(response);
        setStatus('success');
      } catch (err) {
        setApiError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
        setStatus('error');
      }
    },
    [useLiveApi, mockOutcome]
  );

  /** Returns the first invalid field name, or null when the request was sent. */
  const submit = useCallback(() => {
    const nextErrors = validateForm(values);
    setErrors(nextErrors);
    const firstInvalid = Object.keys(values).find((name) => nextErrors[name]);
    if (firstInvalid) return firstInvalid;
    void runPrediction(values);
    return null;
  }, [values, runPrediction]);

  const retry = useCallback(() => {
    void runPrediction(values);
  }, [values, runPrediction]);

  const reset = useCallback(() => {
    setValues(emptyFormValues);
    setErrors({});
    setResult(null);
    setApiError(null);
    setStatus('idle');
  }, []);

  return { values, errors, status, result, apiError, setField, submit, retry, reset };
}
