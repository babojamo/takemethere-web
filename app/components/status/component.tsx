import { Badge } from 'primereact/badge';
import { useMemo } from 'react';

interface StatusBadgeProps {
  status: string;
}

const StatusBadge = ({ status }: StatusBadgeProps) => {
  const success = ['completed', 'production-running'];
  const danger = ['in-active'];

  const formatStatus = status
    .toLowerCase()
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  const statusSevirity = useMemo<'success' | 'info' | 'warning' | 'danger' | 'secondary' | 'contrast' | null | undefined>(() => {
    let sevirity: any = 'contrast';

    if (success.includes(status)) sevirity = 'success';
    else if (danger.includes(status)) sevirity = 'danger';

    return sevirity;
  }, [status]);

  return <Badge value={formatStatus} severity={statusSevirity} />;
};

export default StatusBadge;
