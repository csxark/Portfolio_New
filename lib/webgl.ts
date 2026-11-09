export function hasWebGL(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl2', { powerPreference: 'low-power' }) || canvas.getContext('webgl', { powerPreference: 'low-power' });
    return !!gl;
  } catch {
    return false;
  }
}
