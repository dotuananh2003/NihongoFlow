/**
 * Native momentum scroll with zero external dependencies.
 * The goal is to smooth mouse-wheel scrolling without fighting trackpads,
 * nested scroll containers, scrollbar dragging, keyboard navigation, or touch.
 */
export class NativeSmoothScroll {
  private targetY = 0;
  private currentY = 0;
  private isRunning = false;
  private rafId: number | null = null;
  private scrollTimeout: ReturnType<typeof setTimeout> | null = null;
  private isEnabled = true;
  private lastFrameTime = 0;

  private readonly ease = 0.18;
  private readonly wheelSpeed = 1;

  constructor() {
    if (typeof window === 'undefined') return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      this.isEnabled = false;
      return;
    }

    this.syncToNativeScroll();
    this.init();
  }

  private init() {
    window.addEventListener('wheel', this.onWheel, { passive: false });
    window.addEventListener('scroll', this.onScroll, { passive: true });
    window.addEventListener('resize', this.onResize, { passive: true });
    window.addEventListener('pointerdown', this.stop, { passive: true });
    window.addEventListener('touchstart', this.stop, { passive: true });
    window.addEventListener('keydown', this.stop, { passive: true });
  }

  public destroy() {
    if (typeof window === 'undefined') return;

    window.removeEventListener('wheel', this.onWheel);
    window.removeEventListener('scroll', this.onScroll);
    window.removeEventListener('resize', this.onResize);
    window.removeEventListener('pointerdown', this.stop);
    window.removeEventListener('touchstart', this.stop);
    window.removeEventListener('keydown', this.stop);

    if (this.rafId) cancelAnimationFrame(this.rafId);
    if (this.scrollTimeout) clearTimeout(this.scrollTimeout);
    document.body.classList.remove('is-smooth-scrolling');
  }

  private syncToNativeScroll() {
    this.currentY = window.scrollY;
    this.targetY = window.scrollY;
  }

  private stop = () => {
    if (!this.isRunning) return;

    if (this.rafId) cancelAnimationFrame(this.rafId);
    this.rafId = null;
    this.isRunning = false;
    this.lastFrameTime = 0;
    this.syncToNativeScroll();
    document.body.classList.remove('is-smooth-scrolling');
  };

  private isInsideInnerScrollable(target: HTMLElement | null, deltaY: number): boolean {
    let el = target;

    while (el && el !== document.body && el !== document.documentElement) {
      const style = window.getComputedStyle(el);
      const overflowY = style.overflowY;
      const canScroll = (overflowY === 'auto' || overflowY === 'scroll') && el.scrollHeight > el.clientHeight;

      if (canScroll) {
        const atTop = el.scrollTop <= 0 && deltaY < 0;
        const atBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 1 && deltaY > 0;

        if (!atTop && !atBottom) {
          return true;
        }
      }

      el = el.parentElement;
    }

    return false;
  }

  private onWheel = (event: WheelEvent) => {
    if (!this.isEnabled || event.ctrlKey || event.metaKey) return;

    if (this.isInsideInnerScrollable(event.target as HTMLElement, event.deltaY)) {
      return;
    }

    const isTrackpad = Math.abs(event.deltaY) < 30 && event.deltaY % 1 !== 0;
    if (isTrackpad) {
      this.stop();
      this.syncToNativeScroll();
      return;
    }

    event.preventDefault();

    const maxScroll = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
    let delta = event.deltaY;

    if (event.deltaMode === 1) {
      delta *= 36;
    } else if (event.deltaMode === 2) {
      delta *= window.innerHeight;
    }

    if (!this.isRunning) {
      this.syncToNativeScroll();
      this.isRunning = true;
      this.lastFrameTime = 0;
      this.rafId = requestAnimationFrame(this.render);
    }

    this.targetY = Math.max(0, Math.min(maxScroll, this.targetY + delta * this.wheelSpeed));
    document.body.classList.add('is-smooth-scrolling');

    if (this.scrollTimeout) clearTimeout(this.scrollTimeout);
    this.scrollTimeout = setTimeout(() => {
      document.body.classList.remove('is-smooth-scrolling');
    }, 140);
  };

  private render = (time: number) => {
    if (!this.isRunning) return;

    if (!this.lastFrameTime) this.lastFrameTime = time;
    const elapsed = Math.min(32, Math.max(1, time - this.lastFrameTime));
    this.lastFrameTime = time;

    const frameEase = 1 - Math.pow(1 - this.ease, elapsed / 16.67);
    const diff = this.targetY - this.currentY;

    if (Math.abs(diff) < 0.35) {
      this.currentY = this.targetY;
      window.scrollTo(0, this.currentY);
      this.isRunning = false;
      this.lastFrameTime = 0;
      document.body.classList.remove('is-smooth-scrolling');
      return;
    }

    this.currentY += diff * frameEase;
    window.scrollTo(0, this.currentY);
    this.rafId = requestAnimationFrame(this.render);
  };

  private onScroll = () => {
    if (this.isRunning && Math.abs(window.scrollY - this.currentY) > 48) {
      this.stop();
      return;
    }

    if (!this.isRunning) {
      this.syncToNativeScroll();
    }
  };

  private onResize = () => {
    const maxScroll = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
    this.targetY = Math.max(0, Math.min(maxScroll, this.targetY));
    this.currentY = window.scrollY;
  };
}

let instance: NativeSmoothScroll | null = null;

export const initNativeSmoothScroll = () => {
  if (typeof window !== 'undefined' && !instance) {
    instance = new NativeSmoothScroll();
  }
  return instance;
};
