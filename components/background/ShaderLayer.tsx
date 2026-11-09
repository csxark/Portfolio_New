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
  grain: 'on' | 'off';
};

/** Dark mode: restrained electric-blue/cyan atmosphere on #080D17 base. Preserved. */
export const DARK_PALETTE: ShaderPalette = {
  color1: '#16B9F2',
  color2: '#357FE8',
  color3: '#73D8FF',
  brightness: 0.72,
  reflection: 0.32,
  uStrength: 0.3,
  uDensity: 0.8,
  grain: 'on',
};

/** Light mode: soft blue/pale cyan/icy-white wash on #F8FAFD. Subtle, non-dominant. */
export const LIGHT_PALETTE: ShaderPalette = {
  color1: '#C6E8F3',
  color2: '#BBD9F0',
  color3: '#E0F0F7',
  brightness: 0.62,
  reflection: 0.12,
  uStrength: 0.15,
  uDensity: 0.62,
  grain: 'off',
};

type Props = {
  pixelDensity: number;
  animate: boolean;
  speed: number;
  palette: ShaderPalette;
};

/**
 * WebGL shader layer adapted from Aditya-J/Aditya-J src/components/Background.
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
        lightType="env"
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

