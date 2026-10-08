export const formFields = [
  { name: 'age', kind: 'number', label: 'Age', unit: 'years', placeholder: 'e.g. 28' },
  {
    name: 'gender',
    kind: 'select',
    label: 'Gender',
    options: ['Male', 'Female'],
    placeholder: 'Select gender'
  },
  {
    name: 'occupation',
    kind: 'select',
    label: 'Occupation',
    options: [
      'Accountant',
      'Doctor',
      'Engineer',
      'Lawyer',
      'Manager',
      'Nurse',
      'Sales Representative',
      'Salesperson',
      'Scientist',
      'Software Engineer',
      'Teacher',
      'Other'
    ],
    placeholder: 'Select occupation'
  },
  {
    name: 'sleepDuration',
    kind: 'number',
    label: 'Sleep Duration',
    unit: 'hours',
    placeholder: 'e.g. 6.5',
    step: 0.1,
    decimal: true,
    hint: 'Average hours of sleep per night'
  },
  {
    name: 'qualityOfSleep',
    kind: 'range',
    label: 'Quality of Sleep',
    min: 1,
    max: 10,
    lowLabel: 'Very poor',
    highLabel: 'Excellent'
  },
  {
    name: 'physicalActivity',
    kind: 'number',
    label: 'Physical Activity Level',
    unit: 'min/day',
    placeholder: 'e.g. 45',
    hint: 'Minutes of physical activity per day'
  },
  {
    name: 'stressLevel',
    kind: 'range',
    label: 'Stress Level',
    min: 1,
    max: 10,
    lowLabel: 'Very low',
    highLabel: 'Very high'
  },
  {
    name: 'bmiCategory',
    kind: 'select',
    label: 'BMI Category',
    options: ['Normal', 'Overweight', 'Obese'],
    placeholder: 'Select category'
  },
  {
    name: 'bloodPressure',
    kind: 'text',
    label: 'Blood Pressure',
    unit: 'mmHg',
    placeholder: 'e.g. 120/80',
    hint: 'Systolic / diastolic'
  },
  { name: 'heartRate', kind: 'number', label: 'Heart Rate', unit: 'BPM', placeholder: 'e.g. 72', hint: 'Resting heart rate' },
  {
    name: 'dailySteps',
    kind: 'number',
    label: 'Daily Steps',
    unit: 'steps/day',
    placeholder: 'e.g. 6500'
  }
];

export const emptyFormValues = {
  age: '',
  gender: '',
  occupation: '',
  sleepDuration: '',
  qualityOfSleep: '',
  physicalActivity: '',
  stressLevel: '',
  bmiCategory: '',
  bloodPressure: '',
  heartRate: '',
  dailySteps: ''
};
