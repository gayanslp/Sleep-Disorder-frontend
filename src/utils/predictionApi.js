import { mockPredict } from './mockPrediction';

const API_BASE_URL = import.meta.env.VITE_API_URL || '';
export const PREDICT_ENDPOINT = `${API_BASE_URL}/api/predict`;

export function toPayload(values) {
  return {
    age: Number(values.age),
    gender: values.gender,
    occupation: values.occupation,
    sleep_duration: Number(values.sleepDuration),
    quality_of_sleep: Number(values.qualityOfSleep),
    physical_activity_level: Number(values.physicalActivity),
    stress_level: Number(values.stressLevel),
    bmi_category: values.bmiCategory,
    blood_pressure: values.bloodPressure.replace(/\s/g, ''),
    heart_rate: Number(values.heartRate),
    daily_steps: Number(values.dailySteps)
  };
}

export async function requestPrediction(payload, { useLiveApi, mockOutcome }) {
  if (useLiveApi) {
    const response = await fetch(PREDICT_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    if (!response.ok) {
      throw new Error(`The prediction service responded with status ${response.status}.`);
    }
    return await response.json();
  }

  await new Promise((resolve) => setTimeout(resolve, 1600));
  if (mockOutcome === 'apiError') {
    throw new Error('The prediction service is not responding. Please try again in a moment.');
  }
  return mockPredict(payload, mockOutcome);
}
