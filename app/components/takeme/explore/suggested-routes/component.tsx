import React, { useMemo, useState } from 'react';
import { Card } from 'primereact/card';
import { Route, RouteFares } from '@/app/types/route';
import { Accordion, AccordionTab, AccordionTabChangeEvent } from 'primereact/accordion';

type Props = {
  route_fares: RouteFares[];
  top?: number;
  right?: number;
  width?: number | string;
  onRouteClick?: (route_fare: RouteFares) => void;
};

export function FloatingRouteList({ route_fares, onRouteClick, top = 16, right = 16, width = 360 }: Props) {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const containerStyle = useMemo<React.CSSProperties>(
    () => ({
      position: 'absolute',
      top,
      right,
      width,
      zIndex: 1000
    }),
    [top, right, width]
  );

  const onTabChange = (event: AccordionTabChangeEvent) => {
    const routeFare = route_fares[Number(event.index)];
    setActiveIndex(Number(event.index));
    if (onRouteClick) onRouteClick(routeFare);
  };

  return (
    <div style={containerStyle}>
      <Card className="shadow-3" style={{ borderRadius: 12 }}>
        <Accordion activeIndex={activeIndex} onTabChange={onTabChange}>
          {route_fares.map((r, i) => (
            <AccordionTab key={`route-${i}`} header={`Route ${i + 1}`}>
              <p>
                <strong>Total:</strong> {r.total_fare}
              </p>
              <p>
                <strong>Breakdown:</strong>
              </p>
              <ul>
                {r.route_fare.map((rf, j) => (
                  <li key={`r${j}`}>
                    <span style={{ color: rf.route.points_color ?? 'black' }}> {rf.route.name}</span>: {rf.estimate_fare}
                  </li>
                ))}
              </ul>
            </AccordionTab>
          ))}
        </Accordion>
      </Card>
    </div>
  );
}
