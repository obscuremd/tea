declare module "*.png" {
  const content: string;
  export default content;
}

declare module "*.jpg" {
  const content: string;
  export default content;
}

declare module "*.jpeg" {
  const content: string;
  export default content;
}

declare module "*.gif" {
  const content: string;
  export default content;
}

declare module "*.bmp" {
  const content: string;
  export default content;
}

declare module "*.tiff" {
  const content: string;
  export default content;
}


declare module "*.svg" {
    import React from 'react';
    export const ReactComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
    const src: string;
    export default src;
  }

declare module 'use-react-countries' {
    interface Country {
      name: string;
      capital: string;
      area: number;
      coordinates: [number, number];
      currencies: { name: string; symbol: string }[];
      languages: { name: string; nativeName: string }[];
    }
  
    interface UseCountriesResult {
      countries: Country[];
    }
  
    export function useCountries(): UseCountriesResult;
  }
  