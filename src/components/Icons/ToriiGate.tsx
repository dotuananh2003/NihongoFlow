export const ToriiGate = ({ size = 24, className = "" }: { size?: number, className?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M4 6h16" />
      <path d="M3 6l1-2h16l1 2" />
      <path d="M6 6v14" />
      <path d="M18 6v14" />
      <path d="M6 11h12" />
      <path d="M12 6v5" />
      <path d="M4 20h4" />
      <path d="M16 20h4" />
    </svg>
  );
};
