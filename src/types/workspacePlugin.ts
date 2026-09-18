import React from 'react';

export interface IWorkspaceArchetypePlugin {
  archetypeId: 'dossier_builder' | 'cash_matrix' | 'career_studio';
  renderWorkspace: (props: { serviceId: string; onComplete?: () => void }) => React.ReactElement;
  renderSideDrawer?: (props: { serviceId: string }) => React.ReactElement;
  validateData: (serviceId: string) => { isValid: boolean; errors: string[] };
}
