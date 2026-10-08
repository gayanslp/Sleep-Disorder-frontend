import React from 'react';
import { InfoIcon } from 'lucide-react';

export function Disclaimer() {
  return (
    <aside className="flex items-start gap-2.5 rounded-xl border border-line bg-surface/60 px-4 py-3.5 text-xs leading-relaxed text-muted">
      <InfoIcon className="mt-px h-4 w-4 shrink-0 text-subtle" aria-hidden="true" />
      <p>
        <span className="font-semibold text-ink">Disclaimer: </span>
        This tool is developed for research and decision-support purposes only. It does not provide a medical
        diagnosis.
      </p>
    </aside>
  );
}
