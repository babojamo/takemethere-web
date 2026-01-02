interface DataStatusIconProps {
  status: string;
  className?: string;
  title?: string;
}

const getColor = (status: string) => {
  switch (status) {
    case 'active':
      return '#22C55E'; // Tailwind green-500
    case 'disabled':
      return '#9CA3AF'; // Tailwind gray-400
    case 'blocked':
      return '#EF4444'; // Tailwind red-500
    default:
      return '#9CA3AF';
  }
};

const DataStatusIcon = ({ title, status, className }: DataStatusIconProps) => {
  return (
    <span
      title={title}
      className={className}
      style={{
        display: 'inline-block',
        width: '10px',
        height: '10px',
        borderRadius: '50%',
        backgroundColor: getColor(status)
      }}
    />
  );
};

export default DataStatusIcon;
