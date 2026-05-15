/// <reference types="vite/client" />

declare module '*.svg' {
  import * as React from 'react';
  const src: string;
  export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
  export default src;
}