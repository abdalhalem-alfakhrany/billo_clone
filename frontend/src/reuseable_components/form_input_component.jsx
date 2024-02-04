export function Input({ className = "p-5 mx-5 w-full", state, setState, type, label }) {
  return (
    <div className={className}>
      <label htmlFor={label}>{label}</label>
      <input
        className="w-full rounded-sm border-2"
        id={label}
        onChange={(e) => setState(e.target.value)}
        value={state}
        type={type}
      />
    </div>
  );
}
