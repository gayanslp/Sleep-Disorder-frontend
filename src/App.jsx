import React from 'react';
import { PredictionPage } from './pages/PredictionPage';

export function App({ mockOutcome = 'auto', useLiveApi = true }) {
  return <PredictionPage mockOutcome={mockOutcome} useLiveApi={useLiveApi} />;
}
