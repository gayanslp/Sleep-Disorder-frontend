const numberRules = {
  age: { min: 1, max: 120, integer: true, label: 'Age' },
  sleepDuration: { min: 0, max: 24, label: 'Sleep duration' },
  qualityOfSleep: { min: 1, max: 10, integer: true, label: 'Quality of sleep' },
  physicalActivity: { min: 0, max: 1440, integer: true, label: 'Physical activity' },
  stressLevel: { min: 1, max: 10, integer: true, label: 'Stress level' },
  heartRate: { min: 30, max: 220, integer: true, label: 'Heart rate' },
  dailySteps: { min: 0, max: 100000, integer: true, label: 'Daily steps' }
};

export function validateField(name, raw) {
  const value = (raw || '').trim();

  if (name === 'gender') return value ? undefined : 'Please select a gender.';
  if (name === 'occupation') return value ? undefined : 'Please select an occupation.';
  if (name === 'bmiCategory') return value ? undefined : 'Please select a BMI category.';

  if (name === 'bloodPressure') {
    if (!value) return 'Blood pressure is required.';
    const match = value.match(/^(\d{2,3})\s*\/\s*(\d{2,3})$/);
    if (!match) return 'Use the format systolic/diastolic, e.g. 120/80.';
    const systolic = Number(match[1]);
    const diastolic = Number(match[2]);
    if (systolic < 70 || systolic > 250 || diastolic < 40 || diastolic > 150) {
      return 'Enter a realistic reading, e.g. 120/80.';
    }
    if (diastolic >= systolic) return 'Systolic should be higher than diastolic.';
    return undefined;
  }

  const rule = numberRules[name];
  if (!rule) return undefined;
  if (!value) {
    return name === 'qualityOfSleep' || name === 'stressLevel'
      ? `Please rate your ${rule.label.toLowerCase()}.`
      : `${rule.label} is required.`;
  }
  const num = Number(value);
  if (Number.isNaN(num)) return `${rule.label} must be a number.`;
  if (rule.integer && !Number.isInteger(num)) return `${rule.label} must be a whole number.`;
  if (num < rule.min || num > rule.max) return `Enter a value between ${rule.min} and ${rule.max.toLocaleString()}.`;
  return undefined;
}

export function validateForm(values) {
  const errors = {};
  Object.keys(values).forEach((name) => {
    const error = validateField(name, values[name]);
    if (error) errors[name] = error;
  });
  return errors;
}
