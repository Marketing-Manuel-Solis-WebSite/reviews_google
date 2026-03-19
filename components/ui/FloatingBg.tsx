export function FloatingBg({ dark = false }: { dark?: boolean }) {
  const color = dark ? "text-white/[0.03]" : "text-navy/[0.03]";
  const items = [
    { top: "8%", duration: "22s", delay: "0s", size: "text-[100px]" },
    { top: "30%", duration: "28s", delay: "5s", size: "text-[140px]" },
    { top: "55%", duration: "24s", delay: "10s", size: "text-[110px]" },
    { top: "75%", duration: "30s", delay: "3s", size: "text-[120px]" },
    { top: "18%", duration: "35s", delay: "15s", size: "text-[90px]" },
    { top: "65%", duration: "26s", delay: "8s", size: "text-[130px]" },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none" aria-hidden="true">
      {items.map((item, i) => (
        <span
          key={i}
          className={`absolute font-bold ${color} ${item.size} blur-[2px] floating-slash`}
          style={{
            top: item.top,
            ["--duration" as string]: item.duration,
            ["--delay" as string]: item.delay,
          }}
        >
          //
        </span>
      ))}
    </div>
  );
}
