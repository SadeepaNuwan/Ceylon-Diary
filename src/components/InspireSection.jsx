import { useCallback, useEffect, useRef, useState } from 'react';
import { Separator } from '@/components/ui/separator';
import { useTranslation } from 'react-i18next';

const VIDEO_ID = 'OkLsh-4NokU';

export default function InspireSection() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true); // iOS requires starting muted for autoplay
  const iframeRef = useRef(null);
  const sectionRef = useRef(null);
  const userWantsMuted = useRef(true); // tracks the user's manual mute preference
  const { t } = useTranslation();

  // Send mute/unmute command to YouTube iframe
  const sendMuteCommand = useCallback((shouldMute) => {
    const iframe = iframeRef.current;
    if (iframe && iframe.contentWindow) {
      const command = shouldMute ? 'mute' : 'unMute';
      iframe.contentWindow.postMessage(
        JSON.stringify({ event: 'command', func: command }),
        '*'
      );
    }
  }, []);

  const toggleMute = useCallback(() => {
    const newMuted = !isMuted;
    userWantsMuted.current = newMuted;
    sendMuteCommand(newMuted);
    setIsMuted(newMuted);
  }, [isMuted, sendMuteCommand]);

  const handleStop = useCallback(() => {
    setIsPlaying(false);
    setIsMuted(false);
    userWantsMuted.current = false;
  }, []);

  // Auto-mute when section scrolls out of view, restore when back in view
  useEffect(() => {
    if (!isPlaying) return;

    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          // Scrolled away — mute
          sendMuteCommand(true);
          setIsMuted(true);
        } else {
          // Scrolled back — restore user's preference
          sendMuteCommand(userWantsMuted.current);
          setIsMuted(userWantsMuted.current);
        }
      },
      { threshold: 0.15 } // triggers when less than 15% of the section is visible
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, [isPlaying, sendMuteCommand]);

  return (
    <section ref={sectionRef} id="about" className="relative min-h-[70vh] sm:min-h-[85vh] flex items-center overflow-hidden">
      {/* Background layer */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-scroll md:bg-fixed transition-opacity duration-700"
        style={{
          backgroundImage: `url(https://img.youtube.com/vi/${VIDEO_ID}/maxresdefault.jpg)`,
          opacity: isPlaying ? 0 : 1,
        }}
      />

      {/* YouTube video background (shown when playing) */}
      {isPlaying && (
        <div 
          className="absolute inset-0 overflow-hidden"
          style={{
            width: '100%',
            height: '100%',
            top: 0,
            left: 0,
          }}
        >
          <iframe
            ref={iframeRef}
            src={`https://www.youtube.com/embed/${VIDEO_ID}?autoplay=1&mute=1&controls=0&loop=1&playlist=${VIDEO_ID}&rel=0&modestbranding=1&showinfo=0&enablejsapi=1&origin=${window.location.origin}`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            webkitAllowFullScreen
            className="absolute"
            style={{
              border: 'none',
              width: '100%',
              height: '100%',
              top: '0',
              left: '0',
              transform: 'none',
              pointerEvents: 'none',
            }}
          />
        </div>
      )}

      {/* Dark overlay with richer gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-black/40" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24 grid grid-cols-1 md:grid-cols-2 gap-10 sm:gap-16 items-center w-full">
        {/* Left – text content */}
        <div className="flex flex-col justify-center">
          <p className="text-primary text-xs tracking-[0.3em] uppercase font-medium mb-4">
            {t('inspire.tagline', 'Why travel with us')}
          </p>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.1] mb-6">
            {t('inspire.title1', 'TRAVEL AND')}<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/60">{t('inspire.title2', 'INSPIRE YOUR')}</span><br />
            {t('inspire.title3', 'LIFE')}
          </h2>
          <p className="text-white/60 leading-relaxed mb-8 max-w-md text-sm sm:text-base">
            {t('inspire.description')}
          </p>

          <Separator className="bg-white/10 mb-8" />

          {/* Premium Glassmorphic Stats */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
            {[
              { number: '6', label: t('inspire.stats.tours', 'Sri Lanka Tours') },
              { number: '980+', label: t('inspire.stats.travellers', 'Happy Travellers') },
              { number: '12', label: t('inspire.stats.experience', 'Years Experience') },
            ].map((s) => (
              <div key={s.label} className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-4 sm:p-5 hover:-translate-y-1 hover:border-primary/30 transition-all duration-300">
                <p className="font-display text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-white to-white/50 mb-1">{s.number}</p>
                <p className="text-primary text-[9px] sm:text-[10px] tracking-[0.2em] uppercase font-semibold">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right – play / stop / mute controls */}
        <div className="flex flex-col items-center justify-center gap-6">
          {!isPlaying ? (
            <button
              onClick={() => setIsPlaying(true)}
              className="group relative flex items-center justify-center w-18 h-18 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full border-2 border-white/30 bg-white/10 backdrop-blur-sm hover:bg-white/20 hover:border-white/60 transition-all duration-300 cursor-pointer"
              aria-label="Play Sri Lanka cinematic video"
            >
              {/* Pulse ring */}
              <span className="absolute inset-0 rounded-full border border-white/20 animate-ping" />
              {/* Play icon */}
              <svg
                className="w-8 h-8 sm:w-12 sm:h-12 text-white ml-1 sm:ml-2 group-hover:scale-110 transition-transform duration-200"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </button>
          ) : (
            <div className="flex items-center gap-4">
              {/* Mute / Unmute button */}
              <button
                onClick={toggleMute}
                className="flex items-center justify-center w-12 h-12 rounded-full border border-white/30 bg-white/10 backdrop-blur-sm hover:bg-white/20 hover:border-white/60 transition-all duration-300 cursor-pointer"
                aria-label={isMuted ? 'Unmute video' : 'Mute video'}
              >
                {isMuted ? (
                  /* Muted icon */
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51A8.796 8.796 0 0021 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06a8.99 8.99 0 003.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" />
                  </svg>
                ) : (
                  /* Unmuted icon */
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
                  </svg>
                )}
              </button>

              {/* Stop button */}
              <button
                onClick={handleStop}
                className="flex items-center gap-2 text-white/60 hover:text-white text-sm tracking-wider uppercase transition-colors duration-200 cursor-pointer"
                aria-label="Stop video"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                </svg>
                {t('inspire.stopVideo', 'Stop video')}
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
