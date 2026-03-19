import { Star } from "lucide-react";

export function Stars({
  count = 5,
  size = 14,
}: {
  count?: number;
  size?: number;
}) {
  return (
    <div className="flex gap-0.5" aria-label={`${count} de 5 estrellas`}>
      {Array.from({ length: count }, (_, i) => (
        <Star key={i} size={size} className="fill-gold text-gold" />
      ))}
    </div>
  );
}
