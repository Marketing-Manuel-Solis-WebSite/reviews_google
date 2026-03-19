"use client";

const IMAGES = [
  "/bertha.png",
  "/edgar.png",
  "/juan.png",
  "/margarita.png",
  "/marina.png",
  "/monseraf.png",
  "/nidia.png",
  "/pedro.png",
];

interface BlobPos {
  top: string;
  left?: string;
  right?: string;
  size: number;
  delay: string;
  duration: string;
  opacity: number;
  variant: "small" | "large";
}

const POSITIONS: BlobPos[] = [
  { top: "6%",  right: "3%",  size: 180, delay: "0s",  duration: "26s", opacity: 0.45, variant: "large" },
  { top: "32%", left: "2%",   size: 200, delay: "4s",  duration: "30s", opacity: 0.40, variant: "large" },
  { top: "62%", right: "2%",  size: 170, delay: "8s",  duration: "28s", opacity: 0.42, variant: "large" },
  { top: "85%", left: "3%",   size: 190, delay: "2s",  duration: "32s", opacity: 0.38, variant: "large" },
  { top: "18%", left: "8%",   size: 55,  delay: "3s",  duration: "18s", opacity: 0.35, variant: "small" },
  { top: "45%", right: "10%", size: 48,  delay: "7s",  duration: "20s", opacity: 0.30, variant: "small" },
  { top: "72%", left: "14%",  size: 42,  delay: "5s",  duration: "22s", opacity: 0.33, variant: "small" },
  { top: "92%", right: "12%", size: 50,  delay: "10s", duration: "19s", opacity: 0.28, variant: "small" },
];

export function FloatingBlobs() {
  return (
    <div
      className="fixed inset-0 overflow-hidden pointer-events-none select-none z-30"
      aria-hidden="true"
    >
      {IMAGES.map((src, i) => {
        const pos = POSITIONS[i];
        const isLarge = pos.variant === "large";
        return (
          <img
            key={i}
            src={src}
            alt=""
            draggable={false}
            className={`absolute object-cover ${
              isLarge
                ? "rounded-2xl floating-blob-large"
                : "rounded-full floating-blob"
            }`}
            style={{
              top: pos.top,
              left: pos.left,
              right: pos.right,
              width: pos.size,
              height: pos.size,
              opacity: pos.opacity,
              ["--blob-duration" as string]: pos.duration,
              ["--blob-delay" as string]: pos.delay,
            }}
          />
        );
      })}
    </div>
  );
}
