import { CheckCircle2Icon, EyeIcon, WindIcon } from 'lucide-react';

export const predictionClasses = {
  Insomnia: {
    label: 'INSOMNIA',
    icon: EyeIcon,
    badgeClass: 'bg-insomnia-bg text-insomnia-fg ring-insomnia-ring',
    textClass: 'text-insomnia-fg',
    barClass: 'bg-insomnia-bar',
    trackClass: 'bg-insomnia-ring/50',
    panelClass: 'bg-insomnia-bg/60 ring-insomnia-ring'
  },
  'Sleep Apnea': {
    label: 'SLEEP APNEA',
    icon: WindIcon,
    badgeClass: 'bg-apnea-bg text-apnea-fg ring-apnea-ring',
    textClass: 'text-apnea-fg',
    barClass: 'bg-apnea-bar',
    trackClass: 'bg-apnea-ring/50',
    panelClass: 'bg-apnea-bg/60 ring-apnea-ring'
  },
  None: {
    label: 'NO SLEEP DISORDER',
    icon: CheckCircle2Icon,
    badgeClass: 'bg-healthy-bg text-healthy-fg ring-healthy-ring',
    textClass: 'text-healthy-fg',
    barClass: 'bg-healthy-bar',
    trackClass: 'bg-healthy-ring/50',
    panelClass: 'bg-healthy-bg/60 ring-healthy-ring'
  }
};
