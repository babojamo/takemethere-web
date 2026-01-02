// Barcode.tsx
import React, { useEffect, useRef } from 'react';
import JsBarcode from 'jsbarcode';

interface BarcodeProps {
  value: string;
  format?: string; // e.g., "CODE128", "EAN13"
  width?: number;
  height?: number;
  displayValue?: boolean;
}

const Barcode: React.FC<BarcodeProps> = ({ value, format = 'CODE128', width = 2, height = 100, displayValue = true }) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (svgRef.current) {
      JsBarcode(svgRef.current, value, {
        format,
        lineColor: '#000',
        width,
        height,
        displayValue
      });
    }
  }, [value, format, width, height, displayValue]);

  return <svg ref={svgRef} />;
};

export default Barcode;
