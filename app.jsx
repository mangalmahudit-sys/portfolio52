const { useState, useEffect, useRef } = React;
const { motion, useScroll, useTransform, useSpring, useInView } = window.Motion;

// Custom Cursor
const Cursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const cursorX = useSpring(mousePosition.x, { stiffness: 420, damping: 30, mass: 0.18 });
  const cursorY = useSpring(mousePosition.y, { stiffness: 420, damping: 30, mass: 0.18 });

  useEffect(() => {
    const mediaQuery = window.matchMedia('(pointer: fine)');
    const syncMode = () => {
      setIsEnabled(mediaQuery.matches);
    };

    syncMode();

    const updateMousePosition = e => {
      const position = { x: e.clientX, y: e.clientY };
      setMousePosition(position);
      setIsVisible(true);
    };
    const handleMouseOver = e => {
      if (e.target.closest('a') || e.target.closest('button') || e.target.closest('.hover-target')) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };
    const handleMouseLeave = () => {
      setIsVisible(false);
      setIsHovered(false);
    };

    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('mouseleave', handleMouseLeave);
    mediaQuery.addEventListener('change', syncMode);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mouseleave', handleMouseLeave);
      mediaQuery.removeEventListener('change', syncMode);
    };
  }, []);

  if (!isEnabled) {
    return null;
  }

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 h-8 w-8 pointer-events-none z-[10010] rounded-full border border-accent/50 bg-accent/10"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
          scale: isHovered ? 1.6 : 1
        }}
        animate={{ opacity: isVisible ? 0.9 : 0 }}
        transition={{ duration: 0.18, ease: "easeOut" }}
      />
      <motion.div
        className="fixed top-0 left-0 h-2.5 w-2.5 pointer-events-none z-[10012] rounded-full bg-accent shadow-[0_0_14px_rgba(249,93,19,0.65)]"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%"
        }}
        animate={{
          scale: isVisible ? (isHovered ? 0.85 : 1) : 0,
          opacity: isVisible ? 1 : 0
        }}
        transition={{ type: "spring", stiffness: 260, damping: 22, mass: 0.3 }}
      />
    </>
  );
};

// Icons
const ArrowDownRight = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="7" y1="7" x2="17" y2="17"></line>
    <polyline points="17 7 17 17 7 17"></polyline>
  </svg>
)

const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress, { stiffness: 140, damping: 24, mass: 0.25 });

  return (
    <div className="fixed right-4 top-1/2 z-[70] hidden -translate-y-1/2 md:flex flex-col items-center gap-4">
      <span className="text-[9px] font-mono uppercase tracking-[0.45em] text-white/35 [writing-mode:vertical-rl] rotate-180">
        Scroll
      </span>
      <div className="relative h-40 w-[2px] overflow-hidden rounded-full bg-white/10">
        <motion.div
          className="absolute inset-x-0 top-0 origin-top rounded-full bg-gradient-to-b from-accent via-white to-accent"
          style={{ scaleY }}
        />
      </div>
    </div>
  );
};

const Navbar = () => {
  return (
    <nav className="fixed w-full z-50 top-0 left-0 px-4 py-4 md:px-8 md:py-6 text-white">
      <div className="mx-auto flex max-w-[1600px] items-center justify-between rounded-full border border-white/10 bg-black/25 px-4 py-3 backdrop-blur-xl md:px-6 md:py-4 shadow-[0_12px_40px_rgba(0,0,0,0.25)]">
      <div className="text-xl font-display font-bold tracking-tighter uppercase">
        <span className="block leading-none">TAHER</span>
        <span className="block text-graytext leading-none">MANGAL MAHUDI</span>
      </div>
      <div className="hidden md:flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-[11px] font-semibold tracking-[0.25em] uppercase">
        <a href="#work" className="hover-target rounded-full px-4 py-2 text-white/85 transition-colors duration-300 hover:bg-white/8 hover:text-accent">
          Selected Work
        </a>
        <a href="#about" className="hover-target rounded-full px-4 py-2 text-white/85 transition-colors duration-300 hover:bg-white/8 hover:text-accent">
          Ethos
        </a>
      </div>
      <a href="#contact" className="hover-target rounded-full border border-white/15 bg-white/5 px-4 py-2 text-[11px] uppercase tracking-[0.25em] font-semibold hover:border-accent hover:bg-accent hover:text-black transition-colors">
        Initiate <br/> Project
      </a>
      </div>
    </nav>
  )
}

const HeroSerpentField = () => {
  const serpents = [
    {
      d: "M -120 210 C 120 80, 280 330, 470 180 S 830 80, 1100 220 S 1440 380, 1700 210",
      stroke: "rgba(249,93,19,0.9)",
      width: 3.5,
      duration: 14,
      delay: 0,
      glow: "rgba(249,93,19,0.35)"
    },
    {
      d: "M -80 470 C 120 360, 290 590, 500 460 S 860 280, 1140 440 S 1450 620, 1730 470",
      stroke: "rgba(255,255,255,0.6)",
      width: 2.2,
      duration: 18,
      delay: -4,
      glow: "rgba(255,255,255,0.18)"
    },
    {
      d: "M -150 620 C 160 500, 340 750, 600 610 S 980 430, 1230 600 S 1510 760, 1750 620",
      stroke: "rgba(249,93,19,0.5)",
      width: 1.4,
      duration: 22,
      delay: -9,
      glow: "rgba(249,93,19,0.18)"
    }
  ];

  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      <motion.div
        className="absolute -top-[18vh] left-[8vw] h-[34vw] w-[34vw] rounded-full bg-accent/15 blur-[110px]"
        animate={{ x: [0, 60, -20, 0], y: [0, 40, 90, 0], scale: [1, 1.15, 0.9, 1] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute right-[-8vw] top-[18vh] h-[26vw] w-[26vw] rounded-full bg-white/8 blur-[130px]"
        animate={{ x: [0, -80, 20, 0], y: [0, 60, -20, 0], scale: [1, 0.85, 1.1, 1] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-[-18vh] left-[24vw] h-[30vw] w-[30vw] rounded-full bg-accent/10 blur-[120px]"
        animate={{ x: [0, 70, -50, 0], y: [0, -45, 35, 0], scale: [1, 1.05, 0.92, 1] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.svg
        viewBox="0 0 1600 900"
        className="absolute inset-0 h-full w-full opacity-90"
        preserveAspectRatio="xMidYMid slice"
        animate={{ scale: [1, 1.04, 1], rotate: [0, -1, 0.6, 0] }}
        transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
      >
        <defs>
          <filter id="snakeBlur" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="7" />
          </filter>
          <pattern id="heroGrid" width="120" height="120" patternUnits="userSpaceOnUse">
            <path d="M 120 0 L 0 0 0 120" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
            <circle cx="0" cy="0" r="2" fill="rgba(249,93,19,0.35)" />
          </pattern>
          <linearGradient id="snakeFade" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(255,255,255,0)" />
            <stop offset="18%" stopColor="rgba(255,255,255,0.12)" />
            <stop offset="50%" stopColor="rgba(249,93,19,0.95)" />
            <stop offset="82%" stopColor="rgba(255,255,255,0.12)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
          </linearGradient>
        </defs>

        <rect width="1600" height="900" fill="url(#heroGrid)" opacity="0.16" />

        {serpents.map((serpent, index) => (
          <g key={index}>
            <motion.path
              d={serpent.d}
              fill="none"
              stroke={serpent.glow}
              strokeWidth={serpent.width * 5}
              strokeLinecap="round"
              filter="url(#snakeBlur)"
              initial={{ pathLength: 0.2, opacity: 0.18 }}
              animate={{ pathLength: [0.2, 1, 0.75, 1], opacity: [0.18, 0.45, 0.25, 0.18] }}
              transition={{ duration: 10 + index * 3, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.path
              d={serpent.d}
              fill="none"
              stroke={index === 0 ? "url(#snakeFade)" : serpent.stroke}
              strokeWidth={serpent.width}
              strokeLinecap="round"
              strokeDasharray={index === 0 ? "420 120" : "18 22"}
              initial={{ pathLength: 0.2, opacity: 0.3 }}
              animate={{
                pathLength: [0.25, 1, 0.82, 1],
                opacity: [0.3, 0.9, 0.55, 0.3],
                strokeDashoffset: [0, index === 0 ? -540 : -160]
              }}
              transition={{ duration: 8 + index * 4, repeat: Infinity, ease: "linear" }}
            />

            <circle r={index === 0 ? "11" : "8"} fill={serpent.stroke} opacity="0.95" filter="url(#snakeBlur)">
              <animateMotion dur={`${serpent.duration}s`} begin={`${serpent.delay}s`} repeatCount="indefinite" path={serpent.d} />
            </circle>
            <circle r={index === 0 ? "4.5" : "3"} fill="#fff" opacity="0.9">
              <animateMotion dur={`${serpent.duration}s`} begin={`${serpent.delay}s`} repeatCount="indefinite" path={serpent.d} />
            </circle>
          </g>
        ))}
      </motion.svg>

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,rgba(7,7,7,0.32)_55%,rgba(7,7,7,0.88)_100%)]" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/65" />
    </div>
  );
};

const Hero = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, 200]);
  const scale = useTransform(scrollY, [0, 1000], [1, 1.1]);

  return (
    <section className="h-screen w-full relative flex items-center justify-center overflow-hidden">
      <motion.div 
        style={{ y: y1, scale }}
        className="absolute inset-0 z-0"
      >
        <HeroSerpentField />
      </motion.div>

      <div className="relative z-10 w-full px-6 md:px-12 flex flex-col justify-end h-full pb-24 max-w-[1600px] mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end w-full gap-12">
          
          <motion.div 
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="flex-1"
          >
             <div className="mb-8 flex flex-wrap items-center gap-3">
               <p className="text-accent text-xs font-mono uppercase tracking-[0.3em] flex items-center gap-4">
               <span className="w-8 h-[1px] bg-accent inline-block"></span>
               UI/UX Product Designer
               </p>
               <span className="rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-[10px] font-mono uppercase tracking-[0.28em] text-accent">
                 Ahmedabad Based
               </span>
             </div>
             <h1 className="text-[12vw] md:text-[8vw] leading-[0.8] uppercase font-display font-bold tracking-tighter">
               <span className="block text-outline">Intuitive</span>
               <span className="block pl-[10vw]">Experiences</span>
               <span className="block text-graytext italic font-serif lowercase tracking-normal pl-[5vw] text-[10vw] md:text-[7vw]">systematized.</span>
             </h1>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.6 }}
            className="hidden md:flex w-full md:w-[28rem] flex-col pl-0 md:pl-12 md:border-l border-white/10 items-start justify-end gap-6"
          >
            <div className="w-full rounded-[1.75rem] border border-white/10 bg-black/30 p-5 backdrop-blur-md">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-mono uppercase tracking-[0.35em] text-accent">Current Vibe</p>
                  <p className="mt-2 text-2xl font-display uppercase tracking-tight">Minimal, but not quiet.</p>
                </div>
                <div className="grid h-12 w-12 place-items-center rounded-2xl border border-white/10 bg-white/5 text-accent">
                  01
                </div>
              </div>
              <div className="space-y-3 text-sm text-offwhite/75">
                <div className="flex items-center justify-between border-b border-white/8 pb-3">
                  <span className="uppercase tracking-[0.18em] text-graytext text-[11px]">User Flow</span>
                  <span>Fast and clear</span>
                </div>
                <div className="flex items-center justify-between border-b border-white/8 pb-3">
                  <span className="uppercase tracking-[0.18em] text-graytext text-[11px]">Visual Tone</span>
                  <span>Bold contrast</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="uppercase tracking-[0.18em] text-graytext text-[11px]">Goal</span>
                  <span>Memorable first screen</span>
                </div>
              </div>
            </div>
            <div 
              className="w-16 h-16 rounded-full border border-white/20 flex items-center justify-center hover-target group cursor-none hover:bg-white hover:text-black transition-colors duration-300" 
              onClick={() => document.getElementById('work').scrollIntoView({ behavior: 'smooth' })}
            >
              <ArrowDownRight />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}

const ProjectGallery = ({ id, heading, subtitle, categoryNumber, projects }) => {
  return (
    <section id={id} className="pt-32 pb-32 px-6 md:px-12 bg-surface">
      <div className="mb-24 flex items-end justify-between border-b border-white/10 pb-8 relative z-[100]">
        <h2 className="text-5xl md:text-7xl font-display uppercase tracking-tighter" dangerouslySetInnerHTML={{ __html: heading }}></h2>
        <p className="text-xs font-mono uppercase tracking-widest text-graytext">{categoryNumber} // {subtitle}</p>
      </div>

      <div className="relative w-full">
        {projects.map((proj, idx) => (
           <div 
             key={idx} 
             className="sticky w-full mb-24 grid grid-cols-1 md:grid-cols-12 gap-8 items-center group p-6 md:p-12 rounded-[2rem] border border-white/10 shadow-[0_-20px_50px_rgba(0,0,0,0.6)]"
             style={{ 
               top: `calc(15vh + ${idx * 40}px)`, 
               backgroundColor: proj.bgColor,
               zIndex: idx + 1 
             }}
           >
             
             {/* Info Block */}
             <div className="md:col-span-4 z-10 flex flex-col items-start pr-0 md:pr-12">
               <span className="text-accent text-xs font-mono mb-4 block">No. 0{idx + 1}</span>
               <h3 className="text-4xl lg:text-5xl font-display uppercase tracking-tight mb-4">{proj.title}</h3>
               <p className="text-xs uppercase tracking-widest text-graytext font-semibold mb-8">{proj.category}</p>
               <a href={proj.link} target="_blank" className="hover-target text-sm border border-white/20 px-8 py-3 rounded-full hover:bg-white hover:text-black transition-all inline-block uppercase tracking-wider font-semibold">
                 View Case
               </a>
             </div>

             {/* Image Block */}
             <div className="md:col-span-8 h-[40vh] md:h-[60vh] w-full overflow-hidden relative hover-target pointer-events-auto rounded-xl border border-white/10 bg-[#0a0a0a] group-hover:border-white/30 transition-all duration-700">
                <img 
                  src={proj.img} 
                  alt={proj.title} 
                  className="w-full h-full object-cover object-top filter grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" 
                />
             </div>

           </div>
        ))}
      </div>
    </section>
  )
}

// =============================================
// ETHOS — UI/UX & Graphic Design Canvas
// =============================================
const SnakeTransition = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const progress = useSpring(scrollYProgress, { stiffness: 110, damping: 22, mass: 0.3 });
  const labelY = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const labelOpacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0.35, 1, 1, 0.35]);
  const headX = useTransform(
    scrollYProgress,
    [0, 0.18, 0.36, 0.54, 0.74, 1],
    ["12%", "68%", "58%", "24%", "70%", "84%"]
  );
  const headY = useTransform(
    scrollYProgress,
    [0, 0.18, 0.36, 0.54, 0.74, 1],
    ["18%", "24%", "46%", "60%", "74%", "84%"]
  );
  const headRotate = useTransform(scrollYProgress, [0, 0.3, 0.55, 0.8, 1], [-10, 20, -18, 16, 8]);
  const trailDash = useTransform(scrollYProgress, [0, 1], [620, 0]);
  const trailOpacity = useTransform(scrollYProgress, [0, 0.1, 1], [0.15, 1, 1]);
  const pulseScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.85, 1.1, 0.9]);

  return (
    <section ref={sectionRef} className="relative h-[220vh] bg-[#050505]">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden px-6 py-24 md:px-12 md:py-32">
      <div className="absolute inset-0">
        <div className="absolute left-[8%] top-[12%] h-40 w-40 rounded-full bg-accent/10 blur-[100px]" />
        <div className="absolute right-[10%] top-[25%] h-48 w-48 rounded-full bg-white/6 blur-[120px]" />
        <div className="absolute bottom-[8%] left-1/2 h-56 w-56 -translate-x-1/2 rounded-full bg-accent/10 blur-[140px]" />
      </div>

      <div className="relative mx-auto grid max-w-[1600px] grid-cols-1 items-center gap-12 lg:grid-cols-[0.9fr_1.1fr]">
        <motion.div className="max-w-xl" style={{ y: labelY, opacity: labelOpacity }}>
          <p className="mb-6 flex items-center gap-4 text-xs font-mono uppercase tracking-[0.3em] text-accent">
            <span className="inline-block h-[1px] w-8 bg-accent"></span>
            Scroll Motion
          </p>
          <h2 className="text-5xl font-display uppercase tracking-tighter md:text-7xl">
            Scroll and watch
            <span className="block text-outline">it move.</span>
          </h2>
          <p className="mt-6 max-w-md text-sm leading-relaxed text-graytext md:text-base">
            This section now scrubs with your scroll, so the snake trail reveals and the head shifts position as you move down the page.
          </p>
        </motion.div>

        <div className="relative h-[65vh] min-h-[520px] overflow-hidden rounded-[2rem] border border-white/10 bg-[#090909]">
          <svg viewBox="0 0 900 900" className="absolute inset-0 h-full w-full">
            <defs>
              <linearGradient id="snakeTransitionStroke" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="rgba(255,255,255,0.18)" />
                <stop offset="45%" stopColor="rgba(249,93,19,0.95)" />
                <stop offset="100%" stopColor="rgba(255,255,255,0.08)" />
              </linearGradient>
              <filter id="snakeTransitionGlow" x="-40%" y="-40%" width="180%" height="180%">
                <feGaussianBlur stdDeviation="12" />
              </filter>
            </defs>

            {[...Array(9)].map((_, i) => (
              <line
                key={`grid-v-${i}`}
                x1={100 * i}
                y1="0"
                x2={100 * i}
                y2="900"
                stroke="rgba(255,255,255,0.05)"
                strokeDasharray="4 14"
              />
            ))}
            {[...Array(9)].map((_, i) => (
              <line
                key={`grid-h-${i}`}
                x1="0"
                y1={100 * i}
                x2="900"
                y2={100 * i}
                stroke="rgba(255,255,255,0.04)"
                strokeDasharray="4 14"
              />
            ))}

            <path
              id="snakeTransitionPath"
              d="M 120 120 C 310 10, 575 90, 610 255 C 645 425, 260 410, 282 575 C 300 730, 660 680, 760 790"
              fill="none"
              stroke="rgba(255,255,255,0.08)"
              strokeWidth="2"
              strokeDasharray="10 18"
              strokeLinecap="round"
            />

            <motion.path
              d="M 120 120 C 310 10, 575 90, 610 255 C 645 425, 260 410, 282 575 C 300 730, 660 680, 760 790"
              fill="none"
              stroke="rgba(249,93,19,0.2)"
              strokeWidth="18"
              strokeLinecap="round"
              filter="url(#snakeTransitionGlow)"
              style={{ pathLength: progress, opacity: trailOpacity }}
            />

            <motion.path
              d="M 120 120 C 310 10, 575 90, 610 255 C 645 425, 260 410, 282 575 C 300 730, 660 680, 760 790"
              fill="none"
              stroke="url(#snakeTransitionStroke)"
              strokeWidth="5"
              strokeLinecap="round"
              strokeDasharray="620"
              style={{ pathLength: progress, strokeDashoffset: trailDash, opacity: trailOpacity }}
            />
          </svg>

          <motion.div
            className="absolute h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/25 blur-2xl"
            style={{ left: headX, top: headY, scale: pulseScale }}
          />

          <motion.div
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: headX, top: headY, rotate: headRotate }}
          >
            <div className="relative">
              <div className="h-10 w-10 rounded-full border border-white/20 bg-accent shadow-[0_0_35px_rgba(249,93,19,0.75)]" />
              <div className="absolute left-[8px] top-[13px] h-[5px] w-[5px] rounded-full bg-black/80" />
              <div className="absolute right-[8px] top-[13px] h-[5px] w-[5px] rounded-full bg-black/80" />
            </div>
          </motion.div>

          <motion.div
            className="absolute left-6 top-6 rounded-full border border-white/10 bg-black/40 px-4 py-2 text-[10px] font-mono uppercase tracking-[0.35em] text-white/65 backdrop-blur-md"
            style={{ opacity: labelOpacity }}
          >
            Scroll Trace
          </motion.div>

          <motion.div
            className="absolute bottom-6 right-6 flex items-center gap-3 rounded-full border border-accent/20 bg-accent/10 px-4 py-2 text-[10px] font-mono uppercase tracking-[0.35em] text-accent backdrop-blur-md"
          >
            <span className="inline-block h-2 w-2 rounded-full bg-accent"></span>
            Scroll Controlled
          </motion.div>
        </div>
      </div>
      </div>
    </section>
  );
};

const Ethos = () => {
  const containerRef = useRef(null);

  // Pen tool bezier paths
  const penPaths = [
    { d: "M 55 490 C 110 390, 195 445, 255 375 C 305 315, 345 355, 385 285", color: "#f95d13", w: 1.5 },
    { d: "M 20 525 C 75 465, 155 505, 215 435 C 265 375, 325 395, 375 335", color: "#ffffff", w: 0.6 },
    { d: "M 25 545 C 95 515, 175 555, 235 505 C 275 465, 335 480, 390 445", color: "#ffffff", w: 0.4 },
  ];
  // Anchor (solid square) & control-handle points
  const anchors = [
    { cx: 55,  cy: 490, main: true }, { cx: 255, cy: 375, main: true }, { cx: 385, cy: 285, main: true },
    { cx: 110, cy: 390, main: false }, { cx: 195, cy: 445, main: false },
    { cx: 305, cy: 315, main: false }, { cx: 345, cy: 355, main: false },
  ];
  const ctrlLines = [
    { x1: 55,  y1: 490, x2: 110, y2: 390 },
    { x1: 255, y1: 375, x2: 195, y2: 445 },
    { x1: 255, y1: 375, x2: 305, y2: 315 },
    { x1: 385, y1: 285, x2: 345, y2: 355 },
  ];
  const swatches = ["#f95d13", "#ffffff", "#888888", "#1a1a1a", "#f97316", "#e2e2e2"];
  const colGuides = [30, 115, 200, 285, 370];

  return (
    <section id="about" className="py-32 md:py-48 px-6 md:px-12 relative overflow-hidden bg-[#050505]" ref={containerRef}>
      <div className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">

        {/* LEFT — Typographic Ethos */}
        <div className="lg:col-span-7">
          <p className="text-xs uppercase font-mono text-accent mb-8 tracking-[0.3em] flex items-center gap-4">
             <span className="w-8 h-[1px] bg-accent inline-block"></span>Ethos & Core
          </p>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-display leading-[1.1] tracking-tight mb-8">
            I don't just push pixels. <br/>
            I architect <span className="text-outline">logic</span> & <span className="font-serif italic font-normal text-graytext lowercase">emotion.</span>
          </h2>
          <p className="text-lg md:text-xl text-graytext font-light leading-relaxed mb-16 max-w-2xl">
            Great design begins with deeply understanding users, their goals, and the friction they face. My approach fuses rigorous research with systematic creativity to craft robust, user-centered digital environments that deliver meaningful impact.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 text-left pt-12 border-t border-white/10">
            <div>
              <span className="text-xs font-mono text-white/50 block mb-4">01</span>
              <h4 className="text-xl font-display uppercase tracking-widest mb-3">Strategic Logic</h4>
              <p className="text-sm text-graytext font-light leading-relaxed">Prioritizing structural integrity. Every layout decision is grounded in cognitive psychology and mental mapping.</p>
            </div>
            <div>
              <span className="text-xs font-mono text-white/50 block mb-4">02</span>
              <h4 className="text-xl font-display uppercase tracking-widest mb-3">Seamless Impact</h4>
              <p className="text-sm text-graytext font-light leading-relaxed">Aligning user empathy with strict business objectives, turning ideas into purposeful, converting experiences.</p>
            </div>
          </div>
        </div>

        {/* RIGHT — Design Canvas Animation */}
        <div className="lg:col-span-5 relative h-[50vh] md:h-[80vh] w-full overflow-hidden rounded-[2rem] border border-white/10 group bg-[#0a0a0a]">

          <svg viewBox="0 0 400 600" className="absolute inset-0 w-full h-full">
            <defs>
              {/* Figma-style dot grid */}
              <pattern id="dotgrid" width="20" height="20" patternUnits="userSpaceOnUse">
                <circle cx="1" cy="1" r="0.65" fill="#ffffff" fillOpacity="0.09"/>
              </pattern>
              {/* Scan glow gradient */}
              <linearGradient id="scanGlowDesign" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#f95d13" stopOpacity="0"/>
                <stop offset="50%" stopColor="#f95d13" stopOpacity="0.18"/>
                <stop offset="100%" stopColor="#f95d13" stopOpacity="0"/>
              </linearGradient>
            </defs>

            {/* ── BG: Dot grid ── */}
            <rect width="400" height="600" fill="url(#dotgrid)"/>

            {/* ── LAYER 1: Layout column guides (4-col grid) ── */}
            {colGuides.map((x, i) => (
              <motion.line key={`cg-${i}`} x1={x} y1="0" x2={x} y2="600"
                stroke="#f95d13" strokeWidth="0.6" strokeOpacity={0.18} strokeDasharray="3 9"
                initial={{ opacity: 0, pathLength: 0 }}
                whileInView={{ opacity: 1, pathLength: 1 }}
                transition={{ duration: 1.2, delay: i * 0.1, ease: "easeOut" }}
              />
            ))}

            {/* ── LAYER 2: Ruler ticks (top) ── */}
            {[...Array(21)].map((_, i) => (
              <motion.line key={`rt-${i}`}
                x1={i * 20} y1="0" x2={i * 20} y2={i % 5 === 0 ? 9 : 5}
                stroke="#ffffff" strokeWidth="0.5" strokeOpacity={0.18}
                initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 + i * 0.02 }}
              />
            ))}
            {/* Ruler ticks (left) */}
            {[...Array(16)].map((_, i) => (
              <motion.line key={`rl-${i}`}
                y1={i * 38} x1="0" y2={i * 38} x2={i % 5 === 0 ? 9 : 5}
                stroke="#ffffff" strokeWidth="0.5" strokeOpacity={0.18}
                initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 + i * 0.03 }}
              />
            ))}

            {/* ── LAYER 3: Wireframe — Nav bar ── */}
            <motion.rect x="25" y="20" width="350" height="26" rx="5"
              fill="none" stroke="#ffffff" strokeWidth="0.9" strokeOpacity={0.3}
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
            />
            {[55, 110, 165].map((x, i) => (
              <motion.rect key={`ni-${i}`} x={x} y="27" width="42" height="11" rx="3"
                fill="#ffffff" fillOpacity={0.08}
                initial={{ scaleX: 0, opacity: 0 }} whileInView={{ scaleX: 1, opacity: 1 }}
                style={{ transformOrigin: `${x}px 0` }}
                transition={{ duration: 0.5, delay: 0.6 + i * 0.1 }}
              />
            ))}
            {/* Nav CTA button */}
            <motion.rect x="305" y="24" width="60" height="18" rx="9"
              fill="#f95d13" fillOpacity={0.55}
              initial={{ scale: 0, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.45, delay: 0.9, ease: "backOut" }}
            />

            {/* ── LAYER 4: Wireframe — Hero block ── */}
            <motion.rect x="25" y="58" width="350" height="115" rx="7"
              fill="none" stroke="#ffffff" strokeWidth="0.8" strokeOpacity={0.22}
              initial={{ pathLength: 0, opacity: 0 }} whileInView={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1.2, delay: 0.5 }}
            />
            {/* Headline lines */}
            {[0, 1, 2].map(i => (
              <motion.rect key={`hl-${i}`} x="38" y={72 + i * 18} width={190 - i * 40} height="11" rx="3"
                fill="#ffffff" fillOpacity={0.1}
                initial={{ scaleX: 0, opacity: 0 }} whileInView={{ scaleX: 1, opacity: 1 }}
                style={{ transformOrigin: "38px 0" }}
                transition={{ duration: 0.6, delay: 0.9 + i * 0.1 }}
              />
            ))}
            {/* Hero CTA pill */}
            <motion.rect x="38" y="134" width="85" height="24" rx="12"
              fill="none" stroke="#f95d13" strokeWidth="1.2" strokeOpacity={0.7}
              initial={{ pathLength: 0, opacity: 0 }} whileInView={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 0.7, delay: 1.2 }}
            />
            {/* Hero image placeholder */}
            <motion.rect x="238" y="64" width="128" height="103" rx="5"
              fill="none" stroke="#ffffff" strokeWidth="0.6" strokeOpacity={0.15}
              initial={{ pathLength: 0, opacity: 0 }} whileInView={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 0.9, delay: 0.7 }}
            />
            <motion.line x1="238" y1="64" x2="366" y2="167"
              stroke="#ffffff" strokeWidth="0.4" strokeOpacity={0.1}
              initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }}
              transition={{ duration: 0.7, delay: 0.9 }}
            />
            <motion.line x1="366" y1="64" x2="238" y2="167"
              stroke="#ffffff" strokeWidth="0.4" strokeOpacity={0.1}
              initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }}
              transition={{ duration: 0.7, delay: 1.0 }}
            />

            {/* ── LAYER 5: Wireframe — 3 content cards ── */}
            {[0, 1, 2].map(ci => (
              <motion.rect key={`card-${ci}`} x={30 + ci * 120} y="195" width="108" height="82" rx="7"
                fill="none" stroke="#ffffff" strokeWidth="0.7"
                strokeOpacity={ci === 1 ? 0.45 : 0.2}
                initial={{ pathLength: 0, opacity: 0 }} whileInView={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.9, delay: 0.7 + ci * 0.18 }}
              />
            ))}
            {/* Card image placeholder top */}
            {[0, 1, 2].map(ci => (
              <motion.rect key={`cimg-${ci}`} x={32 + ci * 120} y="198" width="104" height="36" rx="5"
                fill="#ffffff" fillOpacity={0.05}
                initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 1.0 + ci * 0.12 }}
              />
            ))}
            {/* Card text lines */}
            {[0, 1, 2].map(ci => [0, 1].map(li => (
              <motion.rect key={`cl-${ci}-${li}`} x={38 + ci * 120} y={244 + li * 13} width={68 - li * 18} height="8" rx="2"
                fill="#ffffff" fillOpacity={0.08}
                initial={{ scaleX: 0, opacity: 0 }} whileInView={{ scaleX: 1, opacity: 1 }}
                style={{ transformOrigin: `${38 + ci * 120}px 0` }}
                transition={{ duration: 0.5, delay: 1.1 + ci * 0.12 + li * 0.08 }}
              />
            )))}
            {/* Accent card top strip */}
            <motion.rect x="150" y="195" width="108" height="4" rx="2"
              fill="#f95d13" fillOpacity={0.8}
              initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }}
              style={{ transformOrigin: "150px 0" }}
              transition={{ duration: 0.55, delay: 1.1 }}
            />

            {/* ── LAYER 6: Typography baseline lines ── */}
            {[295, 312, 325, 340].map((y, i) => (
              <motion.line key={`bl-${i}`} x1="25" y1={y} x2="375" y2={y}
                stroke={i === 0 ? "#f95d13" : "#ffffff"}
                strokeWidth={i === 0 ? "0.9" : "0.4"}
                strokeOpacity={i === 0 ? 0.45 : 0.14}
                strokeDasharray={i === 2 ? "4 6" : "0"}
                initial={{ pathLength: 0, opacity: 0 }} whileInView={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 1, delay: 1.1 + i * 0.1 }}
              />
            ))}
            {/* Letter glyphs sitting on baseline */}
            <text x="34" y="312" fontSize="17" fontFamily="Georgia, serif" fill="#ffffff" fillOpacity="0.2">Aa Bb Gg Hh</text>
            <text x="348" y="293" fontSize="5" fontFamily="monospace" fill="#f95d13" fillOpacity="0.65">cap</text>
            <text x="344" y="327" fontSize="5" fontFamily="monospace" fill="#ffffff" fillOpacity="0.4">base</text>
            <text x="341" y="343" fontSize="5" fontFamily="monospace" fill="#ffffff" fillOpacity="0.25">desc</text>

            {/* ── LAYER 7: Color palette swatches ── */}
            {swatches.map((color, i) => (
              <motion.circle key={`sw-${i}`} cx={38 + i * 27} cy="362" r="11"
                fill={color}
                fillOpacity={i === 3 ? 0.55 : 0.8}
                stroke="#ffffff" strokeWidth={i === 0 ? "1.2" : "0.5"}
                strokeOpacity={i === 0 ? 0.8 : 0.25}
                initial={{ scale: 0, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.45, delay: 1.3 + i * 0.07, ease: "backOut" }}
              />
            ))}
            <text x="25" y="386" fontSize="5.5" fontFamily="monospace" fill="#f95d13" fillOpacity="0.65" letterSpacing="2">UI / UX  ·  GRAPHICS</text>

            {/* ── LAYER 8: Pen-tool bezier paths ── */}
            {penPaths.map((p, i) => (
              <motion.path key={`pen-${i}`} d={p.d}
                fill="none" stroke={p.color} strokeWidth={p.w}
                strokeOpacity={i === 0 ? 0.88 : 0.38} strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }} whileInView={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 2.2 + i * 0.4, delay: 0.8 + i * 0.3, ease: "easeInOut" }}
              />
            ))}
            {/* Control-point dashed lines */}
            {ctrlLines.map((l, i) => (
              <motion.line key={`cl-${i}`}
                x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2}
                stroke="#f95d13" strokeWidth="0.7" strokeOpacity={0.5} strokeDasharray="2 3"
                initial={{ pathLength: 0, opacity: 0 }} whileInView={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 1.8 + i * 0.1 }}
              />
            ))}
            {/* Anchor squares */}
            {anchors.map((a, i) => (
              <motion.rect key={`anc-${i}`}
                x={a.cx - 4} y={a.cy - 4} width="8" height="8"
                fill={a.main ? "#f95d13" : "#0a0a0a"}
                stroke={a.main ? "#f95d13" : "#ffffff"}
                strokeWidth={a.main ? "0" : "1"} fillOpacity={a.main ? 0.95 : 0}
                strokeOpacity={a.main ? 0 : 0.75}
                initial={{ scale: 0, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.35, delay: 1.9 + i * 0.07, ease: "backOut" }}
              />
            ))}
            {/* Control-handle circles */}
            {ctrlLines.map((l, i) => (
              <motion.circle key={`cp-${i}`} cx={l.x2} cy={l.y2} r="3.5"
                fill="transparent" stroke="#f95d13" strokeWidth="0.9" strokeOpacity={0.65}
                initial={{ scale: 0 }} whileInView={{ scale: 1 }}
                transition={{ duration: 0.35, delay: 2.1 + i * 0.07, ease: "backOut" }}
              />
            ))}

            {/* ── LAYER 9: Selection bounding box (pulses) ── */}
            <motion.rect x="25" y="56" width="350" height="225" rx="7"
              fill="none" stroke="#f95d13" strokeWidth="1.1" strokeDasharray="5 5"
              strokeOpacity={0}
              animate={{ strokeOpacity: [0, 0.65, 0.65, 0] }}
              transition={{ duration: 3.5, delay: 2.5, repeat: Infinity, repeatDelay: 4 }}
            />
            {[[25,56],[375,56],[25,281],[375,281]].map(([x,y], i) => (
              <motion.rect key={`sh-${i}`} x={x - 4.5} y={y - 4.5} width="9" height="9"
                fill="#f95d13" fillOpacity={0}
                animate={{ fillOpacity: [0, 1, 1, 0] }}
                transition={{ duration: 3.5, delay: 2.5 + i * 0.06, repeat: Infinity, repeatDelay: 4 }}
              />
            ))}

            {/* ── LAYER 10: Snap / alignment lines (flash) ── */}
            <motion.line x1="200" y1="0" x2="200" y2="600"
              stroke="#f95d13" strokeWidth="0.7" strokeOpacity={0}
              animate={{ strokeOpacity: [0, 0.55, 0.55, 0] }}
              transition={{ duration: 1.2, delay: 4, repeat: Infinity, repeatDelay: 6 }}
            />
            <motion.line x1="0" y1="300" x2="400" y2="300"
              stroke="#f95d13" strokeWidth="0.7" strokeOpacity={0}
              animate={{ strokeOpacity: [0, 0.55, 0.55, 0] }}
              transition={{ duration: 1.2, delay: 4.3, repeat: Infinity, repeatDelay: 6 }}
            />

            {/* ── LAYER 11: Moving design cursor with click ripple ── */}
            <motion.g
              animate={{ x: [60, 200, 140, 310, 195, 60], y: [120, 70, 250, 380, 490, 120] }}
              transition={{ duration: 9, ease: "easeInOut", repeat: Infinity }}
            >
              {/* Arrow cursor shape */}
              <path d="M 0 0 L 0 15 L 4.5 10.5 L 7.5 17 L 9.5 16 L 6.5 9.5 L 12 9.5 Z"
                fill="#ffffff" fillOpacity={0.92} stroke="#000" strokeWidth="0.5"
              />
              {/* Click ripple */}
              <motion.circle cx="1" cy="1" r="0"
                fill="none" stroke="#f95d13" strokeWidth="1.2" strokeOpacity={0.85}
                animate={{ r: [0, 14, 0], strokeOpacity: [0.85, 0, 0.85] }}
                transition={{ duration: 1.8, repeat: Infinity, repeatDelay: 2.5 }}
              />
            </motion.g>

            {/* ── LAYER 12: Inspection scan line ── */}
            <motion.rect x="0" width="400" height="16" fill="url(#scanGlowDesign)"
              animate={{ y: [-16, 600] }}
              transition={{ duration: 4.5, ease: "linear", repeat: Infinity, repeatDelay: 1.5 }}
            />

          </svg>

          {/* Vignette overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none"></div>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,#0a0a0a_100%)] pointer-events-none opacity-55"></div>

          {/* Caption */}
          <div className="absolute bottom-8 left-8 right-8 flex justify-between items-end z-10">
            <div>
              <p className="text-xs font-sans text-graytext">UI/UX Designer & Graphics Designer</p>
            </div>
            <p className="text-6xl font-serif italic text-white/20 leading-none group-hover:text-accent transition-colors duration-500">T.</p>
          </div>

        </div>
      </div>
    </section>
  )
}

const Skills = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  const categories = [
    {
      label: "UX Strategy",
      number: "01",
      color: "#f95d13",
      skills: ["User Research", "Journey Mapping", "Personas", "Information Architecture", "Usability Testing"],
      icon: (
        <svg viewBox="0 0 60 60" fill="none" className="w-10 h-10">
          <circle cx="30" cy="22" r="10" stroke="#f95d13" strokeWidth="1.5" strokeDasharray="3 4"/>
          <path d="M12 50 C12 38 48 38 48 50" stroke="#f95d13" strokeWidth="1.5" strokeLinecap="round"/>
          <circle cx="30" cy="22" r="4" fill="#f95d13" fillOpacity="0.4"/>
          <line x1="30" y1="32" x2="30" y2="40" stroke="#f95d13" strokeWidth="1" strokeDasharray="2 2"/>
        </svg>
      ),
      desc: "Human-centered thinking that connects goals to outcomes.",
      featured: true,
    },
    {
      label: "UI Design",
      number: "02",
      color: "#ffffff",
      skills: ["Visual Hierarchy", "Component Systems", "Responsive Layout", "Micro-interactions", "Design Tokens"],
      icon: (
        <svg viewBox="0 0 60 60" fill="none" className="w-10 h-10">
          <rect x="8" y="10" width="44" height="30" rx="4" stroke="#ffffff" strokeWidth="1.2" strokeOpacity="0.6"/>
          <rect x="14" y="16" width="20" height="12" rx="2" fill="#ffffff" fillOpacity="0.08" stroke="#ffffff" strokeWidth="0.8" strokeOpacity="0.3"/>
          <rect x="38" y="16" width="8" height="5" rx="1.5" fill="#f95d13" fillOpacity="0.6"/>
          <rect x="38" y="24" width="8" height="4" rx="1.5" fill="#ffffff" fillOpacity="0.2"/>
          <line x1="14" y1="34" x2="46" y2="34" stroke="#ffffff" strokeWidth="0.8" strokeOpacity="0.2"/>
          <rect x="22" y="40" width="16" height="6" rx="3" fill="#ffffff" fillOpacity="0.1" stroke="#ffffff" strokeWidth="0.6" strokeOpacity="0.3"/>
        </svg>
      ),
      desc: "Pixel-precise interfaces built on systems, not chaos.",
      featured: false,
    },
    {
      label: "Graphics Design",
      number: "03",
      color: "#f97316",
      skills: ["Brand Identity", "Typography", "Color Theory", "Visual Composition", "Motion Graphics"],
      icon: (
        <svg viewBox="0 0 60 60" fill="none" className="w-10 h-10">
          <circle cx="20" cy="20" r="8" fill="#f97316" fillOpacity="0.25" stroke="#f97316" strokeWidth="1.2"/>
          <circle cx="40" cy="20" r="8" fill="#ffffff" fillOpacity="0.1" stroke="#ffffff" strokeWidth="0.8" strokeOpacity="0.4"/>
          <circle cx="30" cy="36" r="8" fill="#f95d13" fillOpacity="0.2" stroke="#f95d13" strokeWidth="1"/>
          <path d="M 28 12 A 8 8 0 0 1 32 12" stroke="#f97316" strokeWidth="1.5"/>
        </svg>
      ),
      desc: "Bold visual language that speaks before words do.",
      featured: false,
    },
    {
      label: "Prototyping",
      number: "04",
      color: "#888888",
      skills: ["Interactive Flows", "Animations", "Handoff Specs", "Design Systems", "A/B Testing"],
      icon: (
        <svg viewBox="0 0 60 60" fill="none" className="w-10 h-10">
          <rect x="10" y="10" width="16" height="16" rx="3" stroke="#888" strokeWidth="1.2"/>
          <rect x="34" y="10" width="16" height="16" rx="3" stroke="#888" strokeWidth="1.2"/>
          <rect x="22" y="34" width="16" height="16" rx="3" stroke="#f95d13" strokeWidth="1.2"/>
          <line x1="18" y1="26" x2="30" y2="34" stroke="#888" strokeWidth="0.8" strokeDasharray="2 2"/>
          <line x1="42" y1="26" x2="30" y2="34" stroke="#888" strokeWidth="0.8" strokeDasharray="2 2"/>
        </svg>
      ),
      desc: "From wireframe to living, breathing experience.",
      featured: false,
    },
  ];

  return (
    <section className="py-32 px-6 md:px-12 bg-[#070707] relative overflow-hidden">

      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60vw] h-[40vh] bg-accent/5 rounded-full blur-[120px] pointer-events-none"></div>

      {/* Section header */}
      <div className="max-w-[1600px] mx-auto mb-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-white/10 pb-12">
          <div>
            <p className="text-xs uppercase font-mono text-accent mb-4 tracking-[0.3em] flex items-center gap-4">
              <span className="w-8 h-[1px] bg-accent inline-block"></span>Capabilities
            </p>
            <h2 className="text-5xl md:text-7xl font-display uppercase tracking-tighter leading-none">
              What I <span className="text-outline">Bring</span><br/>
              <span className="font-serif italic font-normal lowercase text-graytext text-4xl md:text-6xl">to the table.</span>
            </h2>
          </div>
          <p className="text-sm text-graytext font-light max-w-xs leading-relaxed md:text-right">
            Four pillars of craft that drive every project from concept to delivered experience.
          </p>
        </div>
      </div>

      {/* Bento grid */}
      <div ref={ref} className="max-w-[1600px] mx-auto grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {categories.map((cat, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 60 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: idx * 0.12, ease: [0.16, 1, 0.3, 1] }}
            className={`relative group rounded-[1.5rem] border border-white/10 p-8 flex flex-col justify-between overflow-hidden cursor-none hover-target
              ${cat.featured ? "xl:col-span-2 xl:row-span-1 bg-[#0f0f0f]" : "bg-[#0a0a0a]"}
            `}
            style={{ minHeight: cat.featured ? "360px" : "320px" }}
          >
            {/* Card glow on hover */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-[1.5rem]"
              style={{ background: `radial-gradient(circle at 30% 30%, ${cat.color}15 0%, transparent 70%)` }}
            ></div>

            {/* Accent corner line */}
            <motion.div
              className="absolute top-0 left-8 h-[2px] rounded-full"
              style={{ backgroundColor: cat.color }}
              initial={{ width: 0 }}
              animate={isInView ? { width: "40%" } : {}}
              transition={{ duration: 0.8, delay: 0.3 + idx * 0.12, ease: "easeOut" }}
            />

            {/* Top row */}
            <div className="flex items-start justify-between mb-6 relative z-10">
              <div>
                <span className="text-xs font-mono block mb-3 tracking-widest" style={{ color: cat.color, opacity: 0.7 }}>{cat.number}</span>
                <div className="p-2 rounded-xl border border-white/10 bg-white/5 inline-block group-hover:border-white/20 transition-colors duration-300">
                  {cat.icon}
                </div>
              </div>
              <span
                className="text-[4.5rem] font-display font-bold leading-none select-none transition-all duration-500 group-hover:opacity-100"
                style={{ color: cat.color, opacity: 0.06 }}
              >
                {cat.number}
              </span>
            </div>

            {/* Label + desc */}
            <div className="relative z-10 mb-6">
              <h3 className="text-2xl md:text-3xl font-display uppercase tracking-tight mb-2">{cat.label}</h3>
              <p className="text-xs text-graytext font-light leading-relaxed">{cat.desc}</p>
            </div>

            {/* Skill pills */}
            <div className="relative z-10 flex flex-wrap gap-2">
              {cat.skills.map((skill, si) => (
                <motion.span
                  key={si}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.4, delay: 0.5 + idx * 0.1 + si * 0.06, ease: "backOut" }}
                  className="text-[10px] uppercase tracking-wider font-semibold px-3 py-1.5 rounded-full border transition-all duration-300"
                  style={{
                    borderColor: `${cat.color}30`,
                    color: cat.color,
                    backgroundColor: `${cat.color}08`,
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.backgroundColor = `${cat.color}22`;
                    e.currentTarget.style.borderColor = `${cat.color}80`;
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.backgroundColor = `${cat.color}08`;
                    e.currentTarget.style.borderColor = `${cat.color}30`;
                  }}
                >
                  {skill}
                </motion.span>
              ))}
            </div>

            {/* Proficiency animated line */}
            <div className="relative z-10 mt-6 pt-4 border-t border-white/10">
              <div className="flex justify-between items-center mb-2">
                <span className="text-[9px] font-mono uppercase tracking-widest text-white/30">Proficiency</span>
                <span className="text-[9px] font-mono uppercase tracking-widest" style={{ color: cat.color }}>{idx === 0 ? "Expert" : idx === 1 ? "Expert" : idx === 2 ? "Advanced" : "Advanced"}</span>
              </div>
              <div className="h-[2px] bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{ backgroundColor: cat.color }}
                  initial={{ width: 0 }}
                  animate={isInView ? { width: idx < 2 ? "92%" : "80%" } : {}}
                  transition={{ duration: 1.2, delay: 0.8 + idx * 0.15, ease: [0.16, 1, 0.3, 1] }}
                />
              </div>
            </div>

          </motion.div>
        ))}
      </div>

      {/* Bottom tag line */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="max-w-[1600px] mx-auto mt-12 flex flex-col md:flex-row items-center justify-between gap-6 text-graytext text-xs font-mono uppercase tracking-widest"
      >
        <span>— Continuously evolving. Always learning.</span>
        <span className="flex items-center gap-3">
          <span className="w-8 h-[1px] bg-accent inline-block"></span>
          <span className="text-accent">Available for new projects</span>
        </span>
      </motion.div>

    </section>
  )
}

// =============================================
// SOFTWARE & TOOLS — Recruiter Impression
// =============================================
const SoftwareStack = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-8%" });

  const tools = [
    { name: "Figma",         cat: "UI Design",        color: "#7C5CFC", sub: "#a78bfa", level: 95,
      icon: <svg viewBox="0 0 40 40" fill="none" className="w-8 h-8"><circle cx="20" cy="8" r="7" fill="#7C5CFC" fillOpacity=".25" stroke="#7C5CFC" strokeWidth="1.5"/><circle cx="20" cy="20" r="7" fill="#F24E1E" fillOpacity=".2" stroke="#F24E1E" strokeWidth="1"/><circle cx="13" cy="32" r="7" fill="#7C5CFC" fillOpacity=".15" stroke="#7C5CFC" strokeWidth="1"/><circle cx="27" cy="32" r="7" fill="#0ACF83" fillOpacity=".15" stroke="#0ACF83" strokeWidth="1"/></svg>
    },
    { name: "Adobe XD",      cat: "Prototyping",      color: "#FF61F6", sub: "#f0abfc", level: 88,
      icon: <svg viewBox="0 0 40 40" fill="none" className="w-8 h-8"><rect x="5" y="5" width="30" height="30" rx="6" fill="#FF61F6" fillOpacity=".15" stroke="#FF61F6" strokeWidth="1.5"/><text x="8" y="26" fontSize="14" fontWeight="bold" fill="#FF61F6" fillOpacity=".9" fontFamily="serif">Xd</text></svg>
    },
    { name: "Photoshop",     cat: "Graphics",         color: "#31A8FF", sub: "#7dd3fc", level: 85,
      icon: <svg viewBox="0 0 40 40" fill="none" className="w-8 h-8"><rect x="5" y="5" width="30" height="30" rx="6" fill="#31A8FF" fillOpacity=".15" stroke="#31A8FF" strokeWidth="1.5"/><circle cx="16" cy="20" r="6" fill="#31A8FF" fillOpacity=".3" stroke="#31A8FF" strokeWidth="1"/><path d="M22 14 Q32 14 32 20 Q32 26 22 26" stroke="#31A8FF" strokeWidth="1.5" fill="none"/></svg>
    },
    { name: "Illustrator",   cat: "Graphics",         color: "#FF9A00", sub: "#fdba74", level: 82,
      icon: <svg viewBox="0 0 40 40" fill="none" className="w-8 h-8"><rect x="5" y="5" width="30" height="30" rx="6" fill="#FF9A00" fillOpacity=".15" stroke="#FF9A00" strokeWidth="1.5"/><path d="M12 28 L20 10 L28 28" stroke="#FF9A00" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/><line x1="14" y1="23" x2="26" y2="23" stroke="#FF9A00" strokeWidth="1.5"/></svg>
    },
    { name: "Lightroom",     cat: "Photography",      color: "#4FBFFF", sub: "#93c5fd", level: 80,
      icon: <svg viewBox="0 0 40 40" fill="none" className="w-8 h-8"><rect x="5" y="5" width="30" height="30" rx="6" fill="#4FBFFF" fillOpacity=".15" stroke="#4FBFFF" strokeWidth="1.5"/><circle cx="20" cy="20" r="8" fill="none" stroke="#4FBFFF" strokeWidth="1.2"/><path d="M20 12 L20 20 L26 20" stroke="#4FBFFF" strokeWidth="1.5" strokeLinecap="round"/></svg>
    },
    { name: "Framer",        cat: "Prototyping",      color: "#0055FF", sub: "#60a5fa", level: 75,
      icon: <svg viewBox="0 0 40 40" fill="none" className="w-8 h-8"><polygon points="8,8 32,8 32,22 20,22" fill="#0055FF" fillOpacity=".25" stroke="#0055FF" strokeWidth="1.5"/><polygon points="8,22 20,22 20,36" fill="#0055FF" fillOpacity=".4" stroke="#0055FF" strokeWidth="1.5"/></svg>
    },
    { name: "Claude AI",     cat: "AI Assistant",     color: "#CC785C", sub: "#f6a07a", level: 90,
      icon: <svg viewBox="0 0 40 40" fill="none" className="w-8 h-8"><circle cx="20" cy="20" r="13" fill="#CC785C" fillOpacity=".18" stroke="#CC785C" strokeWidth="1.5"/><path d="M13 16 Q13 12 20 12 Q27 12 27 16 Q27 20 20 20 L17 24 L17 20 Q13 20 13 16 Z" fill="#CC785C" fillOpacity=".35" stroke="#CC785C" strokeWidth="1.2" strokeLinejoin="round"/><circle cx="17" cy="16" r="1.2" fill="#CC785C" fillOpacity=".8"/><circle cx="20" cy="16" r="1.2" fill="#CC785C" fillOpacity=".8"/><circle cx="23" cy="16" r="1.2" fill="#CC785C" fillOpacity=".8"/></svg>
    },
    { name: "HTML & CSS",    cat: "Development",      color: "#f95d13", sub: "#fb923c", level: 78,
      icon: <svg viewBox="0 0 40 40" fill="none" className="w-8 h-8"><path d="M8 6 L10 32 L20 35 L30 32 L32 6 Z" fill="#f95d13" fillOpacity=".15" stroke="#f95d13" strokeWidth="1.2"/><path d="M14 14 L26 14 L25 22 L20 24 L15 22 L14.5 18 L24 18" stroke="#f95d13" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
    },
  ];

  const marqueeTools = [...tools, ...tools];

  return (
    <section className="py-32 bg-[#050505] relative overflow-hidden border-t border-white/5">

      {/* Ambient glow */}
      <div className="absolute bottom-0 right-0 w-[50vw] h-[50vh] bg-accent/5 rounded-full blur-[160px] pointer-events-none"></div>
      <div className="absolute top-0 left-0 w-[30vw] h-[30vh] bg-purple-900/10 rounded-full blur-[120px] pointer-events-none"></div>

      {/* Section header */}
      <div className="px-6 md:px-12 max-w-[1600px] mx-auto mb-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-white/10 pb-12">
          <div>
            <p className="text-xs uppercase font-mono text-accent mb-4 tracking-[0.3em] flex items-center gap-4">
              <span className="w-8 h-[1px] bg-accent inline-block"></span>Software Stack
            </p>
            <h2 className="text-5xl md:text-7xl font-display uppercase tracking-tighter leading-none">
              Tools I <span className="text-outline">Master</span><br/>
              <span className="font-serif italic font-normal lowercase text-graytext text-4xl md:text-5xl">daily.</span>
            </h2>
          </div>
          <div className="md:text-right">
            <p className="text-sm text-graytext font-light max-w-xs leading-relaxed">
              Industry-standard software powering every design decision — from concept to final delivery.
            </p>
            <p className="text-xs font-mono text-accent mt-4 tracking-widest uppercase">{tools.length} tools in active use</p>
          </div>
        </div>
      </div>

      {/* Tool Cards Grid */}
      <div ref={ref} className="px-6 md:px-12 max-w-[1600px] mx-auto grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 mb-20">
        {tools.map((tool, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: idx * 0.06, ease: [0.16, 1, 0.3, 1] }}
            className="relative group rounded-2xl border border-white/8 p-5 bg-[#0a0a0a] hover:border-white/20 transition-all duration-500 cursor-none hover-target overflow-hidden"
            style={{ borderColor: `${tool.color}18` }}
          >
            {/* Hover glow */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
              style={{ background: `radial-gradient(circle at 20% 20%, ${tool.color}12 0%, transparent 65%)` }}
            />

            {/* Top edge accent */}
            <motion.div className="absolute top-0 left-0 h-[1.5px] rounded-full"
              style={{ backgroundColor: tool.color }}
              initial={{ width: 0 }}
              animate={isInView ? { width: "60%" } : {}}
              transition={{ duration: 0.7, delay: 0.2 + idx * 0.05 }}
            />

            {/* Icon + category */}
            <div className="flex items-start justify-between mb-4 relative z-10">
              <div className="p-2.5 rounded-xl border" style={{ borderColor: `${tool.color}25`, backgroundColor: `${tool.color}08` }}>
                {tool.icon}
              </div>
              <span className="text-[9px] font-mono uppercase tracking-widest px-2 py-1 rounded-full border"
                style={{ color: tool.color, borderColor: `${tool.color}30`, backgroundColor: `${tool.color}10` }}
              >
                {tool.cat}
              </span>
            </div>

            {/* Name */}
            <h3 className="text-base font-display uppercase tracking-tight font-bold mb-4 relative z-10 group-hover:translate-x-1 transition-transform duration-300"
              style={{ color: "#E2E2E2" }}
            >
              {tool.name}
            </h3>

            {/* Proficiency bar */}
            <div className="relative z-10">
              <div className="flex justify-between items-center mb-1.5">
                <span className="text-[8px] font-mono uppercase tracking-widest text-white/25">Proficiency</span>
                <span className="text-[8px] font-mono font-bold" style={{ color: tool.color }}>{tool.level}%</span>
              </div>
              <div className="h-[2px] bg-white/8 rounded-full overflow-hidden">
                <motion.div className="h-full rounded-full"
                  style={{ backgroundColor: tool.color }}
                  initial={{ width: 0 }}
                  animate={isInView ? { width: `${tool.level}%` } : {}}
                  transition={{ duration: 1.2, delay: 0.4 + idx * 0.06, ease: [0.16, 1, 0.3, 1] }}
                />
              </div>
            </div>

          </motion.div>
        ))}
      </div>

      {/* Marquee strip */}
      <div className="w-full overflow-hidden border-t border-b border-white/5 py-6 bg-[#080808]">
        <div className="animate-marquee flex gap-16 whitespace-nowrap">
          {marqueeTools.map((tool, i) => (
            <span key={i} className="flex items-center gap-3 text-sm font-mono uppercase tracking-widest"
              style={{ color: tool.color, opacity: 0.7 }}>
              <span className="w-1.5 h-1.5 rounded-full inline-block" style={{ backgroundColor: tool.color }}></span>
              {tool.name}
            </span>
          ))}
        </div>
      </div>

    </section>
  )
}

const Footer = () => {
  return (
    <footer id="contact" className="h-screen flex flex-col justify-between p-6 md:p-12 border-t border-white/10 relative overflow-hidden bg-black">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] bg-accent/10 rounded-full blur-[150px] pointer-events-none"></div>
      
      <div className="flex-1 flex flex-col items-center justify-center relative z-10 text-center">
        <p className="text-xs font-mono uppercase tracking-[0.2em] mb-4 text-graytext">Let's connect</p>
        <a href="https://wa.me/918200448768" target="_blank" className="hover-target text-[10vw] md:text-[8vw] font-display font-bold uppercase tracking-tighter leading-none hover:text-accent transition-colors duration-500">
          Reach Out
        </a>
        <p className="text-graytext mt-8 font-sans font-light tracking-wide text-lg md:text-xl">+91 8200448768</p>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-end w-full relative z-10 text-xs font-mono uppercase tracking-widest text-graytext gap-8">
        <div>
           <p className="text-white mb-2">Taher Mangal Mahudi</p>
           <p>UI/UX Product Designer</p>
        </div>
        <div className="hidden md:block text-center">
           <p>© {new Date().getFullYear()}</p>
           <p>ALL RIGHTS RESERVED.</p>
        </div>
        <div className="flex gap-8">
          <a href="https://www.linkedin.com/in/taher-mangalmahudi-71bb8a390" target="_blank" className="hover:text-white transition-colors hover-target">LinkedIn</a>
          <a href="https://www.instagram.com/taher_m44?igsh=dTI3emFlM3Z3c3hu" target="_blank" className="hover:text-white transition-colors hover-target">Instagram</a>
          <a href="https://wa.me/918200448768" target="_blank" className="hover:text-white transition-colors hover-target">WhatsApp</a>
        </div>
      </div>
    </footer>
  )
}

const App = () => {
  return (
    <div className="w-full bg-background text-offwhite antialiased relative">
      <ScrollProgress />
      <Cursor />
      <Navbar />
      <main>
        <Hero />
        <ProjectGallery 
          id="work"
          heading="Featured <br/> <span class='text-outline'>UI/UX</span>"
          subtitle="Case Studies"
          categoryNumber="01"
          projects={[
            { title: "Furni AR", category: "Augmented Reality UX", img: "./wall-mockup-dark-tones-green-600nw-2249639263 1 (1).png", link: "https://www.figma.com/proto/ZpesSephEfgsDCPD8dF8Wg/Untitled?node-id=1-2&starting-point-node-id=1%3A2&t=NcC83MD4aCd0tVJ1-1", bgColor: "#111111" },
            { title: "MuscleX", category: "Next-Gen Fitness App", img: "./Frame 12.png", link: "../MacBook Pro 14_ - 1.pdf", bgColor: "#0d0d0d" }
          ]}
        />
        <ProjectGallery 
          id="webdesign"
          heading="Web Design <br/> <span class='text-outline'>Showcase</span>"
          subtitle="Digital Identity"
          categoryNumber="02"
          projects={[
            { title: "HM Concept", category: "Web Design Showcase", img: "./UI HM.png", link: "https://www.figma.com/proto/5tK0hqzmym5SIZiZM8QwsD/Untitled?node-id=1-2&t=hCyeLtqwi2ePZfr9-1&scaling=scale-down&content-scaling=fixed&page-id=0%3A1", bgColor: "#111111" },
            { title: "Heron Landing", category: "Responsive Web Identity", img: "./ui website heron.png", link: "https://www.figma.com/proto/ju56WgFZ8gygCpJtx8Xeba/Untitled?node-id=2-2&t=7dMzuH7CTWoPv6pZ-1&scaling=scale-down&content-scaling=fixed&page-id=0%3A1", bgColor: "#0d0d0d" }
          ]}
        />
        <SnakeTransition />
        <Ethos />
        <Skills />
        <SoftwareStack />
      </main>
      <Footer />
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
