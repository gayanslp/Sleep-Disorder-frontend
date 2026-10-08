/**
 * Demo-only heuristic that stands in for the trained model until
 * POST /api/predict is connected.
 */
export function mockPredict(payload, outcome) {
  if (outcome === 'insomnia') return { prediction: 'Insomnia', confidence: 0.96 };
  if (outcome === 'sleepApnea') return { prediction: 'Sleep Apnea', confidence: 0.93 };
  if (outcome === 'none') return { prediction: 'None', confidence: 0.97 };

  const [systolic, diastolic] = payload.blood_pressure.split('/').map((part) => Number(part.trim()));

  let apnea = 0;
  if (payload.bmi_category === 'Obese') apnea += 3;
  if (payload.bmi_category === 'Overweight') apnea += 2;
  if (systolic >= 135 || diastolic >= 88) apnea += 2;
  if (payload.heart_rate >= 78) apnea += 1;
  if (payload.daily_steps < 5000) apnea += 1;

  let insomnia = 0;
  if (payload.stress_level >= 7) insomnia += 2;
  if (payload.sleep_duration < 6.5) insomnia += 2;
  if (payload.quality_of_sleep <= 6) insomnia += 2;
  if (payload.physical_activity_level < 40) insomnia += 1;

  const top = Math.max(apnea, insomnia);
  if (top < 3) {
    return { prediction: 'None', confidence: round(0.9 + (3 - top) * 0.025) };
  }
  const margin = Math.abs(apnea - insomnia);
  const confidence = round(Math.min(0.98, 0.8 + Math.min(top, 7) * 0.015 + margin * 0.01));
  return { prediction: apnea >= insomnia ? 'Sleep Apnea' : 'Insomnia', confidence };
}

function round(value) {
  return Math.round(value * 1000) / 1000;
}
