"use client";

import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import {
  Menu, X, MapPin, Phone, Star, ChevronLeft, ChevronRight,
  ExternalLink, Send, Clock, Users, Building2, Award,
  CheckCircle, Facebook, Instagram, Youtube,
} from "lucide-react";

/* ==========================================================================
   DATA
   ========================================================================== */

const NAV_LINKS = [
  { label: "Inicio", href: "#inicio" },
  { label: "Nuestra Reputación", href: "#reputacion" },
  { label: "Oficinas", href: "#oficinas" },
  { label: "Casos de Éxito", href: "#casos" },
  { label: "Contacto", href: "#contacto" },
];

interface OfficeReview {
  rating: number;
  text: string;
  author: string;
  date: string;
  link: string;
}

interface Office {
  id: string;
  name: string;
  address: string;
  review: OfficeReview;
  mapPos: { left: string; top: string };
}

const OFFICES: Office[] = [
  {
    id: "los-angeles",
    name: "Los Angeles",
    address: "8337 Telegraph Rd suite #115, Pico Rivera, CA 90660",
    review: {
      rating: 5,
      text: "He tenido una grata experiencia con mi preparadora de documentos Veronica Velasquez. Ella me ha asesorado y preparado para la entrevista, eso me hace sentir mucha confianza. Actualizando, recibí mi residencia y seguro social al mismo tiempo. Sin duda las gestiones de Veronica Velasquez fueron de mucha ayuda para mi proceso. Recomiendo al Abogado Manuel Solis.",
      author: "Gilmar Guzman",
      date: "Hace 3 Semanas",
      link: "https://maps.app.goo.gl/gu57uFG4eWHAQZdD9",
    },
    mapPos: { left: "8%", top: "48%" },
  },
  {
    id: "chicago",
    name: "Chicago",
    address: "6000 Cermak Rd, Cicero, IL 60804",
    review: {
      rating: 5,
      text: "Im very grateful with God that after all these years I finally got my green card and that is thanks to the Manuel Solis lawyers. Especial thanks to Elizabeth Vazquez and Cesar Benitez for helping me out all these years. Its been a long process but worth it at the end.",
      author: "Isabel Casco",
      date: "Hace 4 Semanas",
      link: "https://share.google/IQ5vOOn9q0Vc617Ww",
    },
    mapPos: { left: "60%", top: "22%" },
  },
  {
    id: "harlingen",
    name: "Harlingen, TX",
    address: "320 E Jackson Ave, Harlingen, TX 78550",
    review: {
      rating: 5,
      text: "Hola recomiendo mucho el bufet de abogados Manuel Solís pues te ayudan en todo tu trámite migratorio. En mi caso recibí buena asesoría y también desde que viajas a México por tu cita consular ellos también tienen asesoría en Ciudad Juárez te ayudan con estadía, asesoría, estancia, y movimiento de transporte a todas tus citas. Lo recomiendo mucho, es lo mejor y de verdad vayan con el abogado Solís. Buena suerte a todos y no pierdan la fe porque el tiempo de Dios es maravilloso \u{1F64F}",
      author: "Wendy Alfaro",
      date: "Hace 1 Año",
      link: "https://maps.app.goo.gl/wadPG8TUHV7E7rad9",
    },
    mapPos: { left: "40%", top: "88%" },
  },
  {
    id: "dallas",
    name: "Dallas",
    address: "1120 Empire Central Pl, Dallas, TX 75247",
    review: {
      rating: 5,
      text: "Estamos muy contentos con el servicio del Abogado, un excelente trabajo. Incluso me dieron un tiempo estimado y se finalizó antes. Gracias por el apoyo y amabilidad, siempre atentos del equipo de Dallas. Valiosa atención de parte Maribel, Gloria y Julia L. Gracias Sr. Solis siga apoyando a nuestra gente.",
      author: "Marina Cantu",
      date: "Hace 2 Semanas",
      link: "https://maps.app.goo.gl/XvuximSRNNmFbm489",
    },
    mapPos: { left: "46%", top: "56%" },
  },
  {
    id: "denver",
    name: "Denver",
    address: "5400 Ward Rd BLDG IV, Arvada, CO 80002",
    review: {
      rating: 5,
      text: "Gracias a las oficinas del abogado Manuel Solis obtuve mi residencia y proceso fue todo éxito. Agradezco la atención de la oficina de Denver y al asistente Ewdor.",
      author: "Claudia Pereira",
      date: "Hace 4 Semanas",
      link: "https://share.google/kkznzXsqhwz4FnfYI",
    },
    mapPos: { left: "28%", top: "30%" },
  },
  {
    id: "memphis",
    name: "Memphis",
    address: "3385 Airways Blvd Suite 320, Memphis, TN 38116",
    review: {
      rating: 5,
      text: "Excelente Servicio me encantó, estoy Totalmente Agradecida, una forma tan bonita de brindar la información de acuerdo a todo lo Solicitado. Me encantó el servicio de Sandra P. Ella muy amable muy linda llena de empatía y profesionalismo. Las oficinas muy bonito Lugar y un ambiente muy agradable!! Totalmente Recomendado",
      author: "Blanca Romero",
      date: "Hace 4 Semanas",
      link: "https://maps.app.goo.gl/QHRCCbJxFkCoCKbE7",
    },
    mapPos: { left: "58%", top: "46%" },
  },
  {
    id: "bellaire",
    name: "Bellaire (Houston)",
    address: "9188 Bellaire Blvd E, Houston, TX 77036",
    review: {
      rating: 5,
      text: "Hoy fui atendido por Gloria Briceno, excelente servicio, muy amable. Gracias señora Gloria.",
      author: "Rogelio Rios",
      date: "Hace 9 Semanas",
      link: "https://maps.app.goo.gl/yyuJhQDV8R6Ez5gt8",
    },
    mapPos: { left: "48%", top: "66%" },
  },
  {
    id: "houston-navigation",
    name: "Houston (Navigation)",
    address: "6657 Navigation Blvd, Houston, TX 77011",
    review: {
      rating: 5,
      text: "Martha A. Melendez was excellent in all our interviews, she was so knowledgeable and was very patient with all our questions. She was very clear in explaining and letting us know what was expected from us in putting our case together. Overall we are extremely pleased with her services. Thank you so much Martha!",
      author: "Nancy Mendez",
      date: "Hace 8 Semanas",
      link: "https://maps.app.goo.gl/UwkncNrYHBEVaGtw7",
    },
    mapPos: { left: "50%", top: "70%" },
  },
  {
    id: "el-paso",
    name: "El Paso",
    address: "3632 Admiral St, El Paso, TX 79925",
    review: {
      rating: 5,
      text: "La señorita Evelyn ha estado muy atenta con el caso de mi mamá. Ella siempre ha estado presente si tenemos alguna duda o simplemente dejando a saber lo que está sucediendo. Gracias a todo el equipo de Abogados, hacen un gran trabajo por ver familias reunidas.",
      author: "Ana Landeros",
      date: "Hace 6 Semanas",
      link: "https://maps.app.goo.gl/mREbMXjUcFoDKxwQ6",
    },
    mapPos: { left: "24%", top: "60%" },
  },
  {
    id: "accidentes",
    name: "Accidentes (Houston)",
    address: "6705 Navigation Blvd, Houston, TX 77011",
    review: {
      rating: 5,
      text: "My family and I were helped by Himani Vithanage with an issue that we had with a business. We had tried other law firms but none helped us. When we got in contact with Ms. Vithanage and explained to her our problem she gladly took on our case and explained to us in detail how she would fight for us. I am glad we found an eager and willing lawyer to fight for us.",
      author: "Jose Reyes",
      date: "Hace 9 Semanas",
      link: "https://maps.app.goo.gl/PbN8rR5QqbVGHRsF6",
    },
    mapPos: { left: "52%", top: "68%" },
  },
];

const SUCCESS_STORIES = [
  {
    title: "Gilmar obtuvo su residencia y seguro social",
    office: "Los Angeles",
    officeIdx: 0,
  },
  {
    title: "Isabel recibió su Green Card después de años",
    office: "Chicago",
    officeIdx: 1,
  },
  {
    title: "Wendy completó su trámite consular con éxito",
    office: "Harlingen",
    officeIdx: 2,
  },
  {
    title: "Marina finalizó su proceso antes del tiempo estimado",
    office: "Dallas",
    officeIdx: 3,
  },
  {
    title: "Claudia obtuvo su residencia en Denver",
    office: "Denver",
    officeIdx: 4,
  },
  {
    title: "La familia de Ana fue reunida gracias al equipo",
    office: "El Paso",
    officeIdx: 8,
  },
];

const TRUST_ITEMS = [
  {
    icon: "clock",
    title: "35+ Años de Experiencia",
    description:
      "Décadas defendiendo los derechos de inmigrantes en todo EE.UU.",
  },
  {
    icon: "star",
    title: "Reseñas 100% Verificables",
    description:
      "Cada reseña en nuestro sitio tiene un enlace directo a Google para que la compruebes tú mismo.",
  },
  {
    icon: "building",
    title: "15+ Oficinas Nacionales",
    description:
      "Presencia en Texas, California, Illinois, Colorado, Tennessee y más.",
  },
  {
    icon: "users",
    title: "50,000+ Familias Reunidas",
    description:
      "Miles de familias han logrado su estatus migratorio con nosotros.",
  },
];

const STATS = [
  { value: 35, suffix: "+", label: "Años de Experiencia" },
  { value: 15, suffix: "+", label: "Oficinas en EE.UU." },
  { value: 50000, suffix: "+", label: "Familias Reunidas", display: "50,000" },
  { value: 4.8, suffix: "", label: "Estrellas en Google", isDecimal: true },
];

/* ==========================================================================
   HOOKS
   ========================================================================== */

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, inView] as const;
}

function useCountUp(
  target: number,
  inView: boolean,
  duration = 2000,
  isDecimal = false
) {
  const [count, setCount] = useState(0);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!inView || hasAnimated.current) return;
    hasAnimated.current = true;

    const start = performance.now();
    const animate = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);

      if (isDecimal) {
        setCount(parseFloat((target * eased).toFixed(1)));
      } else {
        setCount(Math.floor(target * eased));
      }

      if (progress < 1) requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }, [inView, target, duration, isDecimal]);

  return count;
}

/* ==========================================================================
   UTILITY COMPONENTS
   ========================================================================== */

function GoogleIcon({ size = 20 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size}>
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        fill="#EA4335"
      />
    </svg>
  );
}

function TikTokIcon({ size = 20 }: { size?: number }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="currentColor"
    >
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.88-2.88 2.89 2.89 0 012.88-2.88c.28 0 .55.04.81.1v-3.51a6.37 6.37 0 00-.81-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 007.04 6.3 6.34 6.34 0 005.65-6.3V9.4a8.16 8.16 0 004.75 1.52V7.48a4.82 4.82 0 01-1-.79z" />
    </svg>
  );
}

function StarRating({
  rating,
  animated = false,
  inView = false,
}: {
  rating: number;
  animated?: boolean;
  inView?: boolean;
}) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          size={20}
          className={i < rating ? "text-ms-secondary fill-ms-secondary" : "text-gray-600"}
          style={
            animated && inView
              ? {
                  animation: `ms-star-pop 0.5s ease forwards`,
                  animationDelay: `${i * 0.12}s`,
                  opacity: 0,
                }
              : undefined
          }
        />
      ))}
    </div>
  );
}

function Particles() {
  const particles = useMemo(
    () =>
      Array.from({ length: 25 }, (_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        size: `${2 + Math.random() * 4}px`,
        duration: `${8 + Math.random() * 14}s`,
        delay: `${Math.random() * 12}s`,
        opacity: 0.2 + Math.random() * 0.5,
        drift: `${-40 + Math.random() * 80}px`,
      })),
    []
  );

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <div
          key={p.id}
          className="ms-particle"
          style={
            {
              "--left": p.left,
              "--size": p.size,
              "--duration": p.duration,
              "--delay": p.delay,
              "--particle-opacity": p.opacity,
              "--drift": p.drift,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}

function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    const move = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    const over = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      setHovering(
        !!target.closest(
          'a, button, [role="button"], input, textarea, select, .ms-interactive'
        )
      );
    };
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
    };
  }, []);

  return (
    <div
      className={`ms-cursor hidden md:block ${hovering ? "ms-cursor-hover" : ""}`}
      style={{ left: pos.x, top: pos.y }}
    />
  );
}

function MagneticButton({
  children,
  className = "",
  href,
  onClick,
  type,
  ariaLabel,
}: {
  children: React.ReactNode;
  className?: string;
  href?: string;
  onClick?: () => void;
  type?: "submit" | "button";
  ariaLabel?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const [transform, setTransform] = useState("");

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      setTransform(`translate(${x * 0.12}px, ${y * 0.12}px)`);
    },
    []
  );

  const handleMouseLeave = useCallback(() => setTransform(""), []);

  const props = {
    ref: ref as React.RefObject<never>,
    className,
    style: { transform, transition: "transform 0.3s cubic-bezier(0.16,1,0.3,1)" },
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
    "aria-label": ariaLabel,
  };

  if (href) {
    return (
      <a href={href} {...props}>
        {children}
      </a>
    );
  }

  return (
    <button type={type || "button"} onClick={onClick} {...props}>
      {children}
    </button>
  );
}

/* ==========================================================================
   STAT COUNTER
   ========================================================================== */

function StatCounter({
  value,
  suffix,
  label,
  display,
  isDecimal,
  inView,
}: {
  value: number;
  suffix: string;
  label: string;
  display?: string;
  isDecimal?: boolean;
  inView: boolean;
}) {
  const count = useCountUp(value, inView, 2200, isDecimal);

  const formatted = display
    ? inView
      ? count >= value
        ? display
        : count.toLocaleString()
      : "0"
    : isDecimal
      ? count.toFixed(1)
      : count.toLocaleString();

  return (
    <div className="text-center">
      <div className="font-serif text-4xl md:text-5xl font-bold text-ms-secondary">
        {formatted}
        {suffix}
      </div>
      <div className="mt-2 text-sm md:text-base text-white/70">{label}</div>
    </div>
  );
}

/* ==========================================================================
   NAVBAR
   ========================================================================== */

function Navbar({ scrolled }: { scrolled: boolean }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "ms-navbar-scrolled py-3" : "py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <a
            href="#inicio"
            className="font-serif text-ms-secondary text-lg md:text-xl font-bold tracking-wide"
          >
            ABOGADOS MANUEL SOLIS
          </a>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-white/80 hover:text-ms-secondary transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
            <MagneticButton
              href="#contacto"
              className="ms-interactive bg-ms-secondary text-ms-primary font-semibold px-6 py-2.5 rounded-full text-sm hover:brightness-110 transition-all"
            >
              Agenda Tu Consulta
            </MagneticButton>
          </div>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden text-white"
            onClick={() => setMobileOpen(true)}
            aria-label="Abrir menú"
          >
            <Menu size={26} />
          </button>
        </div>
      </nav>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[60] bg-ms-primary/95 backdrop-blur-xl flex flex-col items-center justify-center gap-8 animate-[ms-fade-in_0.3s_ease]">
          <button
            className="absolute top-6 right-6 text-white"
            onClick={() => setMobileOpen(false)}
            aria-label="Cerrar menú"
          >
            <X size={28} />
          </button>
          {NAV_LINKS.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="text-2xl font-serif text-white hover:text-ms-secondary transition-colors"
              style={{ animationDelay: `${i * 0.08}s` }}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contacto"
            onClick={() => setMobileOpen(false)}
            className="mt-4 bg-ms-secondary text-ms-primary font-bold px-8 py-3 rounded-full text-lg"
          >
            Agenda Tu Consulta
          </a>
        </div>
      )}
    </>
  );
}

/* ==========================================================================
   HERO SECTION
   ========================================================================== */

function HeroSection() {
  const [statsRef, statsInView] = useInView(0.3);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, #0A1628 0%, #1B2A4A 40%, #0A1628 70%, #122244 100%)",
        backgroundSize: "400% 400%",
        animation: "ms-gradient-shift 15s ease infinite",
      }}
    >
      <Particles />

      {/* Parallax decorative elements */}
      <div
        className="absolute top-20 right-10 w-72 h-72 rounded-full opacity-[0.03]"
        style={{
          background:
            "radial-gradient(circle, #C9A84C 0%, transparent 70%)",
          transform: `translateY(${scrollY * 0.15}px)`,
          willChange: "transform",
        }}
      />
      <div
        className="absolute bottom-20 left-10 w-96 h-96 rounded-full opacity-[0.04]"
        style={{
          background:
            "radial-gradient(circle, #C9A84C 0%, transparent 70%)",
          transform: `translateY(${scrollY * 0.25}px)`,
          willChange: "transform",
        }}
      />

      <div
        className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center pt-24 pb-16"
        style={{
          transform: `translateY(${scrollY * 0.08}px)`,
          willChange: "transform",
        }}
      >
        <h1
          className="ms-shimmer-text font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6"
        >
          Tu Familia Merece un Abogado con Reputación Comprobada
        </h1>

        <p className="text-white/70 text-lg sm:text-xl md:text-2xl max-w-3xl mx-auto mb-12 font-sans">
          Con más de 35 años de experiencia reuniendo familias — nuestra
          reputación habla por nosotros
        </p>

        {/* Stats */}
        <div
          ref={statsRef}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-14"
        >
          {STATS.map((stat, i) => (
            <StatCounter
              key={stat.label}
              value={stat.value}
              suffix={stat.suffix}
              label={stat.label}
              display={stat.display}
              isDecimal={stat.isDecimal}
              inView={statsInView}
            />
          ))}
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <MagneticButton
            href="#contacto"
            className="ms-interactive inline-flex items-center gap-2 bg-ms-secondary text-ms-primary font-bold px-8 py-4 rounded-full text-lg hover:brightness-110 transition-all"
            ariaLabel="Agenda tu consulta"
            >
            <span
              style={{ animation: "ms-pulse-glow 2.5s ease-in-out infinite" }}
              className="absolute inset-0 rounded-full pointer-events-none"
            />
            <Send size={20} />
            Envíanos un Mensaje
          </MagneticButton>

          <a
            href="#reputacion"
            className="ms-interactive inline-flex items-center gap-2 border-2 border-white/30 text-white font-semibold px-8 py-4 rounded-full text-lg hover:border-ms-secondary hover:text-ms-secondary transition-all"
          >
            <Star size={18} />
            Ver Reseñas Verificadas
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30">
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <div className="w-5 h-8 border-2 border-white/20 rounded-full flex justify-center">
          <div
            className="w-1 h-2 bg-ms-secondary rounded-full mt-1"
            style={{ animation: "ms-float 2s ease-in-out infinite" }}
          />
        </div>
      </div>
    </section>
  );
}

/* ==========================================================================
   VIDEO SECTION
   ========================================================================== */

function VideoSection() {
  return (
    <section className="py-20 md:py-28 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="ms-reveal text-center mb-12">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-white mb-4">
            Conoce al Abogado Manuel Solis
          </h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            Conoce la voz que ha defendido a miles de familias en la corte
          </p>
        </div>

        <div className="ms-reveal ms-delay-2">
          <div
            className="relative rounded-2xl overflow-hidden shadow-2xl group"
            style={{
              boxShadow: "0 0 0 1px rgba(201,168,76,0.15), 0 25px 60px rgba(0,0,0,0.5)",
            }}
          >
            <div className="aspect-video bg-ms-primary-light/50">
              <iframe
                src="https://www.youtube.com/embed/VIDEO_ID"
                title="Abogado Manuel Solis - Demanda Colectiva"
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <div className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{ boxShadow: "inset 0 0 0 2px rgba(201,168,76,0.3)" }}
            />
          </div>
        </div>

        <div className="ms-reveal ms-delay-4 mt-10 text-center">
          <blockquote className="font-serif text-xl md:text-2xl text-white/80 italic max-w-3xl mx-auto">
            &ldquo;Cada caso es una familia, y cada familia merece justicia&rdquo;
          </blockquote>
          <p className="mt-3 text-ms-secondary font-semibold">
            — Abogado Manuel Solis
          </p>
        </div>
      </div>
    </section>
  );
}

/* ==========================================================================
   REVIEW TABS
   ========================================================================== */

function ReviewCard({ office, inView }: { office: Office; inView: boolean }) {
  const handleTilt = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      e.currentTarget.style.transform = `perspective(1000px) rotateY(${x * 6}deg) rotateX(${-y * 6}deg) translateY(-4px)`;
    },
    []
  );

  const handleTiltLeave = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      e.currentTarget.style.transform = "";
    },
    []
  );

  return (
    <div
      className="ms-glass-card rounded-2xl p-6 md:p-8 relative overflow-hidden max-w-3xl mx-auto"
      onMouseMove={handleTilt}
      onMouseLeave={handleTiltLeave}
      style={{ transition: "transform 0.2s ease, background 0.4s ease, border-color 0.4s ease, box-shadow 0.4s ease" }}
    >
      {/* Quote decoration */}
      <span
        className="absolute -top-2 left-6 text-[8rem] font-serif text-ms-secondary/[0.06] leading-none pointer-events-none select-none"
        aria-hidden="true"
      >
        &ldquo;
      </span>

      {/* Google Maps badge */}
      <div className="absolute top-4 right-4">
        <GoogleIcon size={28} />
      </div>

      {/* Stars */}
      <div className="mb-4">
        <StarRating rating={office.review.rating} animated inView={inView} />
      </div>

      {/* Review text */}
      <p className="relative z-10 text-white/85 text-base md:text-lg leading-relaxed mb-6">
        {office.review.text}
      </p>

      {/* Author */}
      <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
        <div>
          <p className="font-semibold text-white">{office.review.author}</p>
          <p className="text-sm text-white/50">{office.review.date}</p>
        </div>
        <div className="flex items-center gap-2 bg-green-500/10 border border-green-500/20 rounded-full px-3 py-1.5">
          <CheckCircle size={14} className="text-green-400" />
          <span className="text-xs text-green-400 font-medium">
            Verificada en Google
          </span>
        </div>
      </div>

      {/* Address */}
      <div className="flex items-start gap-2 text-white/50 text-sm mb-5">
        <MapPin size={16} className="shrink-0 mt-0.5" />
        <span>{office.address}</span>
      </div>

      {/* Verification button */}
      <a
        href={office.review.link}
        target="_blank"
        rel="noopener noreferrer"
        className="ms-interactive inline-flex items-center gap-2 bg-white/10 hover:bg-ms-secondary/20 border border-white/15 hover:border-ms-secondary/40 rounded-xl px-5 py-3 text-sm font-medium text-white hover:text-ms-secondary transition-all duration-300"
        title="Esta reseña fue publicada directamente en Google Maps. Haz clic para verificarla tú mismo."
      >
        <GoogleIcon size={18} />
        Ver Reseña Original en Google
        <ExternalLink size={14} />
      </a>
    </div>
  );
}

function ReviewTabs() {
  const [activeTab, setActiveTab] = useState(0);
  const [tabInView, setTabInView] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setTabInView(true);
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="reputacion"
      ref={sectionRef}
      className="py-20 md:py-28 relative"
      style={{
        background: "linear-gradient(180deg, #0A1628 0%, #0D1B30 50%, #0A1628 100%)",
      }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="ms-reveal text-center mb-12">
          <p className="text-ms-secondary font-semibold text-sm tracking-widest uppercase mb-3">
            Reputación Comprobada
          </p>
          <h2 className="font-serif text-3xl md:text-5xl font-bold text-white mb-4">
            Nuestra Reputación en Google
          </h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            Reseñas reales de clientes satisfechos — cada una verificable con un clic
          </p>
        </div>

        {/* Tabs */}
        <div className="ms-reveal ms-delay-2 mb-10">
          <div
            className="ms-tabs-scroll flex gap-2 overflow-x-auto pb-3 px-1"
            role="tablist"
            aria-label="Oficinas"
          >
            {OFFICES.map((office, i) => (
              <button
                key={office.id}
                role="tab"
                aria-selected={activeTab === i}
                aria-controls={`panel-${office.id}`}
                onClick={() => setActiveTab(i)}
                className={`ms-interactive shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
                  activeTab === i
                    ? "bg-ms-secondary text-ms-primary shadow-lg shadow-ms-secondary/20"
                    : "ms-glass text-white/70 hover:text-white hover:bg-white/10"
                }`}
              >
                <MapPin size={14} />
                {office.name}
              </button>
            ))}
          </div>
        </div>

        {/* Active review */}
        <div className="ms-reveal ms-delay-3">
          <div
            key={activeTab}
            id={`panel-${OFFICES[activeTab].id}`}
            role="tabpanel"
            style={{ animation: "ms-fade-in 0.5s ease" }}
          >
            <ReviewCard
              office={OFFICES[activeTab]}
              inView={tabInView}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ==========================================================================
   3D CAROUSEL — SUCCESS STORIES
   ========================================================================== */

function SuccessCarousel() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [modalIdx, setModalIdx] = useState<number | null>(null);
  const total = SUCCESS_STORIES.length;

  useEffect(() => {
    if (paused) return;
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % total);
    }, 4500);
    return () => clearInterval(interval);
  }, [paused, total]);

  const prev = () => setActive((p) => (p - 1 + total) % total);
  const next = () => setActive((p) => (p + 1) % total);

  const getStyle = (index: number): React.CSSProperties => {
    const offset = index - active;
    const adjusted =
      offset > total / 2 ? offset - total : offset < -total / 2 ? offset + total : offset;
    const absOff = Math.abs(adjusted);

    if (absOff > 2)
      return { opacity: 0, pointerEvents: "none", position: "absolute" };

    return {
      transform: `translateX(${adjusted * 220}px) translateZ(${-absOff * 180}px) rotateY(${-adjusted * 18}deg) scale(${1 - absOff * 0.12})`,
      opacity: 1 - absOff * 0.3,
      zIndex: 10 - absOff,
      filter: absOff > 0 ? `blur(${absOff * 1.5}px)` : "none",
      position: "absolute" as const,
      transition: "all 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
    };
  };

  const modalStory =
    modalIdx !== null ? SUCCESS_STORIES[modalIdx] : null;
  const modalOffice =
    modalStory ? OFFICES[modalStory.officeIdx] : null;

  return (
    <section id="casos" className="py-20 md:py-28 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="ms-reveal text-center mb-16">
          <p className="text-ms-secondary font-semibold text-sm tracking-widest uppercase mb-3">
            Resultados Reales
          </p>
          <h2 className="font-serif text-3xl md:text-5xl font-bold text-white mb-4">
            Historias Reales de Familias Reunidas
          </h2>
          <p className="text-white/60 text-lg">
            Cada reseña es una familia que logró su sueño americano
          </p>
        </div>

        {/* Desktop 3D carousel */}
        <div
          className="hidden md:block relative h-[320px] mb-10"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          style={{ perspective: "1200px" }}
        >
          <div className="relative w-full h-full flex items-center justify-center">
            {SUCCESS_STORIES.map((story, i) => (
              <div
                key={i}
                className="w-[340px]"
                style={getStyle(i)}
              >
                <div className="ms-glass-card rounded-2xl p-6 h-full">
                  <div className="flex items-center gap-2 mb-3">
                    <MapPin size={14} className="text-ms-secondary" />
                    <span className="text-ms-secondary text-sm font-medium">
                      {story.office}
                    </span>
                  </div>
                  <h3 className="font-serif text-xl font-bold text-white mb-4 leading-snug">
                    {story.title}
                  </h3>
                  <div className="mb-4">
                    <StarRating rating={5} />
                  </div>
                  <button
                    onClick={() => setModalIdx(i)}
                    className="ms-interactive text-ms-secondary text-sm font-medium hover:underline flex items-center gap-1"
                  >
                    Leer Historia Completa
                    <ExternalLink size={13} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Arrows */}
          <button
            onClick={prev}
            className="ms-interactive absolute left-4 top-1/2 -translate-y-1/2 z-20 ms-glass w-10 h-10 rounded-full flex items-center justify-center text-white hover:bg-white/15 transition-colors"
            aria-label="Anterior"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={next}
            className="ms-interactive absolute right-4 top-1/2 -translate-y-1/2 z-20 ms-glass w-10 h-10 rounded-full flex items-center justify-center text-white hover:bg-white/15 transition-colors"
            aria-label="Siguiente"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        {/* Mobile horizontal scroll */}
        <div className="md:hidden flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory -mx-4 px-4">
          {SUCCESS_STORIES.map((story, i) => (
            <div key={i} className="snap-center shrink-0 w-[280px]">
              <div className="ms-glass-card rounded-2xl p-5 h-full">
                <div className="flex items-center gap-2 mb-3">
                  <MapPin size={14} className="text-ms-secondary" />
                  <span className="text-ms-secondary text-sm font-medium">
                    {story.office}
                  </span>
                </div>
                <h3 className="font-serif text-lg font-bold text-white mb-3">
                  {story.title}
                </h3>
                <StarRating rating={5} />
                <button
                  onClick={() => setModalIdx(i)}
                  className="mt-3 text-ms-secondary text-sm font-medium hover:underline flex items-center gap-1"
                >
                  Leer Historia Completa
                  <ExternalLink size={13} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-6">
          {SUCCESS_STORIES.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              aria-label={`Ir a historia ${i + 1}`}
              className={`ms-interactive w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                active === i
                  ? "bg-ms-secondary w-8"
                  : "bg-white/20 hover:bg-white/40"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Modal */}
      {modalStory && modalOffice && (
        <div
          className="fixed inset-0 z-[70] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setModalIdx(null)}
        >
          <div
            className="ms-glass-card rounded-2xl p-6 md:p-8 max-w-lg w-full max-h-[80vh] overflow-y-auto relative"
            onClick={(e) => e.stopPropagation()}
            style={{ animation: "ms-fade-in 0.3s ease" }}
          >
            <button
              onClick={() => setModalIdx(null)}
              className="absolute top-4 right-4 text-white/60 hover:text-white"
              aria-label="Cerrar"
            >
              <X size={22} />
            </button>
            <div className="flex items-center gap-2 mb-3">
              <MapPin size={14} className="text-ms-secondary" />
              <span className="text-ms-secondary text-sm font-medium">
                {modalStory.office}
              </span>
            </div>
            <h3 className="font-serif text-2xl font-bold text-white mb-2">
              {modalStory.title}
            </h3>
            <div className="mb-4">
              <StarRating rating={5} />
            </div>
            <p className="text-white/80 leading-relaxed mb-6">
              {modalOffice.review.text}
            </p>
            <div className="flex items-center justify-between flex-wrap gap-3 mb-4">
              <div>
                <p className="font-semibold text-white">
                  {modalOffice.review.author}
                </p>
                <p className="text-sm text-white/50">
                  {modalOffice.review.date}
                </p>
              </div>
              <div className="flex items-center gap-2 bg-green-500/10 border border-green-500/20 rounded-full px-3 py-1.5">
                <CheckCircle size={14} className="text-green-400" />
                <span className="text-xs text-green-400 font-medium">
                  Verificada en Google
                </span>
              </div>
            </div>
            <a
              href={modalOffice.review.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-ms-secondary text-ms-primary font-semibold px-5 py-3 rounded-xl text-sm hover:brightness-110 transition-all"
            >
              <GoogleIcon size={18} />
              Ver Reseña Original en Google
              <ExternalLink size={14} />
            </a>
          </div>
        </div>
      )}
    </section>
  );
}

/* ==========================================================================
   OFFICE MAP
   ========================================================================== */

function OfficeMapSection() {
  const [activePin, setActivePin] = useState<number | null>(null);

  return (
    <section id="oficinas" className="py-20 md:py-28 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="ms-reveal text-center mb-14">
          <p className="text-ms-secondary font-semibold text-sm tracking-widest uppercase mb-3">
            Cobertura Nacional
          </p>
          <h2 className="font-serif text-3xl md:text-5xl font-bold text-white mb-4">
            Estamos Cerca de Ti
          </h2>
          <p className="text-white/60 text-lg">
            15+ Oficinas en Todo EE.UU.
          </p>
        </div>

        {/* Map */}
        <div className="ms-reveal ms-delay-2 relative mx-auto max-w-4xl mb-16">
          <div
            className="relative rounded-2xl overflow-hidden"
            style={{
              background: "linear-gradient(135deg, rgba(10,22,40,0.8), rgba(27,42,74,0.6))",
              border: "1px solid rgba(255,255,255,0.08)",
              aspectRatio: "16/9",
            }}
          >
            {/* Subtle grid pattern */}
            <div
              className="absolute inset-0 opacity-[0.03]"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)",
                backgroundSize: "40px 40px",
              }}
            />

            {/* Office pins */}
            {OFFICES.map((office, i) => (
              <div
                key={office.id}
                className="absolute group"
                style={{ left: office.mapPos.left, top: office.mapPos.top }}
              >
                <button
                  onClick={() =>
                    setActivePin(activePin === i ? null : i)
                  }
                  className="ms-interactive relative flex items-center justify-center"
                  aria-label={`Oficina ${office.name}`}
                >
                  <span
                    className="w-4 h-4 bg-ms-secondary rounded-full"
                    style={{
                      animation: "ms-pin-pulse 2s ease-in-out infinite",
                      animationDelay: `${i * 0.3}s`,
                    }}
                  />
                  <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] text-white/50 font-medium hidden lg:block">
                    {office.name}
                  </span>
                </button>

                {/* Tooltip */}
                {activePin === i && (
                  <div
                    className="absolute z-20 bottom-full left-1/2 -translate-x-1/2 mb-3 w-64 ms-glass rounded-xl p-4"
                    style={{ animation: "ms-fade-in 0.2s ease" }}
                  >
                    <p className="font-semibold text-white text-sm mb-1">
                      {office.name}
                    </p>
                    <p className="text-white/60 text-xs mb-3">
                      {office.address}
                    </p>
                    <a
                      href={office.review.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-ms-secondary text-xs font-medium hover:underline"
                    >
                      <MapPin size={12} />
                      Ver en Google Maps
                      <ExternalLink size={10} />
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Office grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {OFFICES.map((office, i) => (
            <div
              key={office.id}
              className={`ms-reveal ms-delay-${Math.min(i + 1, 8)} ms-glass-card rounded-xl p-4 text-center`}
            >
              <MapPin
                size={20}
                className="text-ms-secondary mx-auto mb-2"
              />
              <p className="text-white font-medium text-sm">
                {office.name}
              </p>
              <p className="text-white/40 text-xs mt-1 leading-snug">
                {office.address}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ==========================================================================
   TRUST SECTION
   ========================================================================== */

function TrustSection() {
  const iconMap: Record<string, React.ReactNode> = {
    clock: <Clock size={36} className="text-ms-secondary" />,
    star: <Award size={36} className="text-ms-secondary" />,
    building: <Building2 size={36} className="text-ms-secondary" />,
    users: <Users size={36} className="text-ms-secondary" />,
  };

  return (
    <section
      className="py-20 md:py-28 relative"
      style={{
        background:
          "linear-gradient(180deg, #0A1628 0%, #0E1E35 50%, #0A1628 100%)",
      }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="ms-reveal text-center mb-14">
          <p className="text-ms-secondary font-semibold text-sm tracking-widest uppercase mb-3">
            Nuestra Promesa
          </p>
          <h2 className="font-serif text-3xl md:text-5xl font-bold text-white">
            ¿Por Qué Elegirnos?
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {TRUST_ITEMS.map((item, i) => (
            <div
              key={item.title}
              className={`ms-reveal ms-delay-${i + 1} ms-glass-card rounded-2xl p-6 text-center group`}
            >
              <div
                className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-ms-secondary/10 mb-5 group-hover:scale-110 transition-transform duration-300"
                style={{ animation: "ms-float 4s ease-in-out infinite", animationDelay: `${i * 0.5}s` }}
              >
                {iconMap[item.icon]}
              </div>
              <h3 className="font-serif text-xl font-bold text-white mb-3">
                {item.title}
              </h3>
              <p className="text-white/60 text-sm leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ==========================================================================
   CTA SECTION
   ========================================================================== */

function CTASection() {
  const [form, setForm] = useState({
    nombre: "",
    telefono: "",
    oficina: "",
    mensaje: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setForm({ nombre: "", telefono: "", oficina: "", mensaje: "" });
    }, 4000);
  };

  return (
    <section
      id="contacto"
      className="py-20 md:py-28 relative overflow-hidden"
    >
      {/* Decorative background */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, #0A1628 0%, #1B2A4A 30%, rgba(201,168,76,0.08) 60%, #0A1628 100%)",
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, transparent, transparent 40px, rgba(201,168,76,0.3) 40px, rgba(201,168,76,0.3) 41px)",
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6">
        <div className="ms-reveal text-center mb-12">
          <p className="text-ms-secondary font-semibold text-sm tracking-widest uppercase mb-3">
            Da el Primer Paso
          </p>
          <h2 className="font-serif text-3xl md:text-5xl font-bold text-white mb-4">
            ¿Listo Para Dar el Primer Paso?
          </h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            Envíanos un mensaje y agenda tu consulta hoy mismo. Tu familia
            merece la mejor representación legal.
          </p>
        </div>

        <div className="ms-reveal ms-delay-2">
          <form
            onSubmit={handleSubmit}
            className="ms-glass rounded-2xl p-6 md:p-10 space-y-5"
          >
            <div className="grid md:grid-cols-2 gap-5">
              <div>
                <label
                  htmlFor="nombre"
                  className="block text-sm text-white/60 mb-2"
                >
                  Nombre Completo
                </label>
                <input
                  id="nombre"
                  name="nombre"
                  type="text"
                  required
                  value={form.nombre}
                  onChange={handleChange}
                  className="ms-input"
                  placeholder="Tu nombre completo"
                />
              </div>
              <div>
                <label
                  htmlFor="telefono"
                  className="block text-sm text-white/60 mb-2"
                >
                  Teléfono
                </label>
                <input
                  id="telefono"
                  name="telefono"
                  type="tel"
                  required
                  value={form.telefono}
                  onChange={handleChange}
                  className="ms-input"
                  placeholder="(000) 000-0000"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="oficina"
                className="block text-sm text-white/60 mb-2"
              >
                Oficina Más Cercana
              </label>
              <select
                id="oficina"
                name="oficina"
                required
                value={form.oficina}
                onChange={handleChange}
                className="ms-input"
              >
                <option value="">Selecciona una oficina</option>
                {OFFICES.map((o) => (
                  <option key={o.id} value={o.name}>
                    {o.name} — {o.address}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="mensaje"
                className="block text-sm text-white/60 mb-2"
              >
                Breve Descripción de Tu Caso
              </label>
              <textarea
                id="mensaje"
                name="mensaje"
                rows={4}
                required
                value={form.mensaje}
                onChange={handleChange}
                className="ms-input resize-none"
                placeholder="Cuéntanos brevemente sobre tu situación..."
              />
            </div>

            <MagneticButton
              type="submit"
              className={`ms-interactive w-full flex items-center justify-center gap-3 font-bold text-lg py-4 rounded-xl transition-all duration-300 ${
                submitted
                  ? "bg-green-500 text-white"
                  : "bg-ms-secondary text-ms-primary hover:brightness-110"
              }`}
              ariaLabel="Enviar mensaje"
            >
              {submitted ? (
                <>
                  <CheckCircle size={22} />
                  ¡Mensaje Enviado con Éxito!
                </>
              ) : (
                <>
                  <Send size={20} />
                  Enviar Mensaje y Agendar Consulta
                </>
              )}
            </MagneticButton>

            <p className="text-center text-white/40 text-sm">
              Consulta 100% Confidencial &bull; Respondemos en menos de 24
              horas
            </p>
          </form>
        </div>

        {/* Phone */}
        <div className="ms-reveal ms-delay-4 text-center mt-10">
          <a
            href="tel:+17130000000"
            className="ms-interactive inline-flex items-center gap-3 text-2xl md:text-3xl font-bold text-white hover:text-ms-secondary transition-colors"
          >
            <Phone size={28} />
            Llama Ahora: (713) XXX-XXXX
          </a>
        </div>
      </div>
    </section>
  );
}

/* ==========================================================================
   FOOTER
   ========================================================================== */

function SiteFooter() {
  return (
    <footer
      className="py-14 border-t border-white/5"
      style={{ background: "#050D1A" }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid md:grid-cols-3 gap-10 mb-10">
          {/* Brand */}
          <div>
            <p className="font-serif text-ms-secondary text-xl font-bold mb-2">
              ABOGADOS MANUEL SOLIS
            </p>
            <p className="text-white/50 text-sm">
              Reuniendo Familias Desde 1990
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-col gap-2">
            <a
              href="#"
              className="text-white/50 text-sm hover:text-ms-secondary transition-colors"
            >
              Política de Privacidad
            </a>
            <a
              href="#"
              className="text-white/50 text-sm hover:text-ms-secondary transition-colors"
            >
              Términos y Condiciones
            </a>
            <a
              href="#"
              className="text-white/50 text-sm hover:text-ms-secondary transition-colors"
            >
              Mapa del Sitio
            </a>
          </div>

          {/* Social */}
          <div>
            <p className="text-white/60 text-sm font-medium mb-3">
              Síguenos
            </p>
            <div className="flex gap-3">
              {[
                { icon: <Facebook size={18} />, label: "Facebook" },
                { icon: <Instagram size={18} />, label: "Instagram" },
                { icon: <Youtube size={18} />, label: "YouTube" },
                { icon: <TikTokIcon size={18} />, label: "TikTok" },
              ].map((social) => (
                <a
                  key={social.label}
                  href="#"
                  aria-label={social.label}
                  className="ms-interactive w-10 h-10 rounded-full ms-glass flex items-center justify-center text-white/60 hover:text-ms-secondary hover:bg-white/10 transition-all"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8">
          <p className="text-white/30 text-xs text-center mb-3">
            &copy; 2026 Abogados Manuel Solis. Todos los derechos reservados.
          </p>
          <p className="text-white/20 text-xs text-center max-w-3xl mx-auto leading-relaxed">
            Las reseñas mostradas son opiniones de clientes verificables en
            Google Maps. Resultados pasados no garantizan resultados futuros.
            Este sitio no constituye asesoría legal.
          </p>
        </div>
      </div>
    </footer>
  );
}

/* ==========================================================================
   MAIN PAGE
   ========================================================================== */

export default function Home() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* Global scroll-reveal observer */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("ms-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
    );

    document
      .querySelectorAll(".ms-reveal")
      .forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <CustomCursor />
      <Navbar scrolled={scrolled} />
      <main>
        <HeroSection />
        <VideoSection />
        <ReviewTabs />
        <SuccessCarousel />
        <OfficeMapSection />
        <TrustSection />
        <CTASection />
      </main>
      <SiteFooter />
    </>
  );
}
