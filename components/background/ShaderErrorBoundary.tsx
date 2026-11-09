'use client';

import { Component, type ReactNode } from 'react';

type State = { failed: boolean };

/**
 * If shader/WebGL init fails, drop only the shader layer. Static CSS fallback and content remain.
 * Adapted from Aditya-J/Aditya-J src/components/Background/ShaderErrorBoundary.tsx.
 */
export class ShaderErrorBoundary extends Component<{ children: ReactNode }, State> {
  state: State = { failed: false };

  static getDerivedStateFromError(): State {
    return { failed: true };
  }

  componentDidCatch(error: unknown) {
    if (process.env.NODE_ENV !== 'production') {
      console.warn('[Background] Shader disabled:', error);
    }
  }

  render() {
    return this.state.failed ? null : this.props.children;
  }
}

