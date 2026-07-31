export default function Badge({ children }) {
  return (
    <span className="badge">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 1.5l2.1 6.02a4 4 0 0 0 2.38 2.38L22.5 12l-6.02 2.1a4 4 0 0 0-2.38 2.38L12 22.5l-2.1-6.02a4 4 0 0 0-2.38-2.38L1.5 12l6.02-2.1a4 4 0 0 0 2.38-2.38L12 1.5z" />
      </svg>
      {children}
    </span>
  );
}
