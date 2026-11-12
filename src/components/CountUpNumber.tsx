import React, { useState, useEffect } from 'react';

interface CountUpNumberProps {
  value: string;
  duration?: number;
  className?: string;
}

export const CountUpNumber: React.FC<CountUpNumberProps> = ({
  value,
  duration = 1800,
  className = '',
}) => {
  const [displayValue, setDisplayValue] = useState<string>('0');

  useEffect(() => {
    // Parse numeric part, prefix, and suffix
    // e.g. "850+" -> numeric: 850, suffix: "+"
    // e.g. "4.8 MWh" -> numeric: 4.8, suffix: " MWh"
    // e.g. "99.98%" -> numeric: 99.98, suffix: "%"
    // e.g. "6,000+" -> numeric: 6000, suffix: "+"
    // e.g. "₦0 / $0" -> static string
    const match = value.match(/^([^0-9.]*)([0-9,.]+)(.*)$/);

    if (!match) {
      setDisplayValue(value);
      return;
    }

    const prefix = match[1] || '';
    const numStr = match[2].replace(/,/g, '');
    const suffix = match[3] || '';
    const targetNum = parseFloat(numStr);

    if (isNaN(targetNum)) {
      setDisplayValue(value);
      return;
    }

    const hasComma = match[2].includes(',');
    const decimals = numStr.includes('.') ? numStr.split('.')[1].length : 0;

    let startTimestamp: number | null = null;
    let animId: number;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);

      // Ease out expo / cubic
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      const currentNum = targetNum * easeProgress;

      let formattedNum = currentNum.toFixed(decimals);
      if (hasComma) {
        const parts = formattedNum.split('.');
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        formattedNum = parts.join('.');
      }

      setDisplayValue(`${prefix}${formattedNum}${suffix}`);

      if (progress < 1) {
        animId = requestAnimationFrame(step);
      } else {
        setDisplayValue(value);
      }
    };

    animId = requestAnimationFrame(step);

    return () => {
      if (animId) cancelAnimationFrame(animId);
    };
  }, [value, duration]);

  return <span className={className}>{displayValue}</span>;
};
