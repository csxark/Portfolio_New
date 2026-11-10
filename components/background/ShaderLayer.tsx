'use client';

import { useEffect } from 'react';
import { ShaderGradientCanvas, ShaderGradient } from '@shadergradient/react';

export type ShaderPalette = {
  color1: string;
  color2: string;
  color3: string;
  brightness: number;
  reflection: number;
  uStrength: number;
  uDensity: number;
  lightType: '3d' | 'env';
  grain: 'on' | 'off';
};

/** Dark mode: warm burnt-orange / red / olive atmosphere on deep black. */
export const DARK_PALETTE: ShaderPalette = {
  color1: '#ff7a2f',
  color2: '#c43a2b',
  color3: '#8a7a2a',
  brightness: 0.6,
  reflection: 0.3,
  uStrength: 0.3,
  uDensity: 0.85,
  lightType: 'env',
  grain: 'on',
};

/** Light mode: saturated sky-blue/cyan highlights that remain visible on a pale base. */
export const LIGHT_PALETTE: ShaderPalette = {
  color1: '#1976D2',
  color2: '#3156C8',
  color3: '#00A5C8',
  brightness: 0.9,
  reflection: 0.2,
  uStrength: 0.3,
  uDensity: 0.82,
  lightType: '3d',
  grain: 'off',
};

type Props = {
  pixelDensity: number;
  animate: boolean;
  speed: number;
  palette: ShaderPalette;
};

/**
 * Geometry/camera/rotation preserved; palette + strength/density/brightness/reflection/grain theme-driven.
 */
export default function ShaderLayer({ pixelDensity, animate, speed, palette }: Props) {
  useEffect(() => {
    return () => {
      // ShaderGradientCanvas manages its renderer; this effect ensures React cleanup boundaries are explicit.
    };
  }, []);

  return (
    <ShaderGradientCanvas
      style={{ width: '100%', height: '100%' }}
      lazyLoad={undefined}
      fov={undefined}
      pixelDensity={pixelDensity}
      pointerEvents="none"
      powerPreference="low-power"
    >
      <ShaderGradient
        animate={animate ? 'on' : 'off'}
        type="sphere"
        wireframe={false}
        shader="defaults"
        uTime={0}
        uSpeed={speed}
        uStrength={palette.uStrength}
        uDensity={palette.uDensity}
        uFrequency={5.5}
        uAmplitude={3.2}
        positionX={-0.1}
        positionY={0}
        positionZ={0}
        rotationX={0}
        rotationY={130}
        rotationZ={70}
        color1={palette.color1}
        color2={palette.color2}
        color3={palette.color3}
        reflection={palette.reflection}
        cAzimuthAngle={270}
        cPolarAngle={180}
        cDistance={0.5}
        cameraZoom={15.1}
        lightType={palette.lightType}
        brightness={palette.brightness}
        envPreset="city"
        grain={palette.grain}
        toggleAxis={false}
        zoomOut={false}
        hoverState=""
        enableTransition={false}
      />
    </ShaderGradientCanvas>
  );
}
