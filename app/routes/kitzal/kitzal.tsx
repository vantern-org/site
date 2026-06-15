import backArrow from './back-arrow.svg';
import leaf from './leaf.svg';

export default function Kitzal() {
  return (
    <div className="relative flex flex-col flex-1 overflow-hidden">
      <div className="bg-white relative z-10 flex flex-col items-center justify-center flex-1 gap-4 dark:bg-neutral-800">
        <a href="/" className="absolute left-6 top-7 flex items-center gap-3 text-lg text-black dark:text-white hover:ml-1 transition-all">
          <img src={backArrow} alt="Return" className="w-6 h-6 dark:invert" />
          Return
        </a>
        <div className="relative inline-flex items-center justify-center">
          <img
            src={leaf}
            alt=""
            aria-hidden="true"
            className="pointer-events-none absolute -left-18 -top-16 z-0 h-28 w-28 motion-safe:animate-[popup-soft_1s_both]"
          />
          <div className="flex flex-col gap-4">
            <h1
              className="relative z-10 text-7xl text-black dark:text-white motion-safe:animate-[popup-soft_1s_both]"
              style={{ fontFamily: "'ClimateCrisis', sans-serif" }}
            >
              Kitzal
            </h1>
            <h2 className="text-center z-10 text-2xl font-bold text-black dark:text-white motion-safe:animate-[popup-soft_1s_both] motion-safe:[animation-delay:500ms]">
              Coming Soon
            </h2>
          </div>
          <img
            src={leaf}
            alt=""
            aria-hidden="true"
            className="pointer-events-none absolute -right-18 -bottom-6 z-0 h-28 w-28 rotate-180 motion-safe:animate-[popup-soft_1s_both]"
          />
        </div>
      </div>
    </div>
  );
}