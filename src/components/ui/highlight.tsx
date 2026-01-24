export const Highlight: React.FC<{
  children: React.ReactNode;
  highlight: string[];
}> = ({ children, highlight }) => {
  const text = typeof children === "string" ? children : "";

  if (!text || highlight.length === 0) {
    return (
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
        {children}
      </h1>
    );
  }

  const parts = text.split(new RegExp(`(${highlight.join("|")})`, "gi"));

  return (
    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
      {parts.map((part, i) =>
        highlight.some((h) => part.toLowerCase() === h.toLowerCase()) ? (
          <span key={`${part}-${i}`} className="gradient-text">
            {part}
          </span>
        ) : (
          part
        ),
      )}
    </h1>
  );
};
