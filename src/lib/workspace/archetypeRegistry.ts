import { IWorkspaceArchetypePlugin } from '../../types/workspacePlugin';

const registry: Record<string, IWorkspaceArchetypePlugin> = {};

export function registerArchetypePlugin(plugin: IWorkspaceArchetypePlugin) {
  registry[plugin.archetypeId] = plugin;
}

export function getArchetypePlugin(archetypeId: string): IWorkspaceArchetypePlugin | undefined {
  return registry[archetypeId];
}
