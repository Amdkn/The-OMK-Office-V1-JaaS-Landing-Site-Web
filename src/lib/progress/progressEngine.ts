export type MilestoneStatus = 'completed' | 'current' | 'upcoming' | 'blocked';

export interface Milestone {
  id: string | number;
  status: MilestoneStatus;
  evidenceId?: string;
}

export function calculateProgress(milestones: Milestone[]): number {
  if (milestones.length === 0) return 0;

  const completedCount = milestones.filter((m) => m.status === 'completed').length;
  return Math.round((completedCount / milestones.length) * 100);
}
