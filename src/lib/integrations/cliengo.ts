import { MOBILE_TAB_BAR_CHAT_ENABLED } from '@/config/features';

const DEFAULT_CLIENGO_SCRIPT_URL =
  'https://s.cliengo.com/weboptimizer/5fb67d0d9c17fd002a2e608c/5fb67d0e9c17fd002a2e608f.js?platform=website';

export function getCliengoScriptUrl(): string | null {
  const configured = process.env.NEXT_PUBLIC_CLIENGO_SCRIPT_URL?.trim();
  if (configured === 'false' || configured === '0') {
    return null;
  }

  if (configured) {
    return configured;
  }

  const enabled = process.env.NEXT_PUBLIC_CLIENGO_ENABLED?.trim().toLowerCase();
  if (enabled === 'true' || enabled === '1') {
    return DEFAULT_CLIENGO_SCRIPT_URL;
  }

  return null;
}

export function isCliengoEnabled(): boolean {
  return getCliengoScriptUrl() !== null;
}

export const MOBILE_FLOATING_LAUNCHER_SELECTORS = [
  '#cliengo-button',
  '.clgo-chat-launcher',
  '#chat-launcher',
  '#popupIframe',
] as const;

const MOBILE_DUPLICATE_WIDGET_SELECTORS = [
  '#wspIframe',
  '.whatsapp-widget-container',
] as const;

const SMALL_MOBILE_LAUNCHER_SIZE_PX = 36;

export function isMobileTabBarViewport() {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(max-width: 1023px)').matches;
}

function restoreHiddenLauncher(el: HTMLElement) {
  el.removeAttribute('data-fi-mobile-launcher-hidden');
  el.style.removeProperty('display');
  el.style.removeProperty('opacity');
  el.style.removeProperty('pointer-events');
  el.style.removeProperty('width');
  el.style.removeProperty('height');
  el.style.removeProperty('min-width');
  el.style.removeProperty('min-height');
  el.style.removeProperty('border');
  el.style.removeProperty('overflow');
}

function applySmallMobileFloatingLauncherStyles(el: HTMLElement) {
  el.removeAttribute('data-fi-mobile-launcher-hidden');
  el.style.setProperty('position', 'fixed', 'important');
  el.style.setProperty('right', '12px', 'important');
  el.style.setProperty('bottom', 'var(--fi-cliengo-launcher-bottom, 1rem)', 'important');
  el.style.setProperty('left', 'auto', 'important');
  el.style.setProperty('top', 'auto', 'important');
  el.style.setProperty('display', 'block', 'important');
  el.style.setProperty('opacity', '1', 'important');
  el.style.setProperty('pointer-events', 'auto', 'important');
  el.style.setProperty('width', `${SMALL_MOBILE_LAUNCHER_SIZE_PX}px`, 'important');
  el.style.setProperty('height', `${SMALL_MOBILE_LAUNCHER_SIZE_PX}px`, 'important');
  el.style.setProperty('min-width', `${SMALL_MOBILE_LAUNCHER_SIZE_PX}px`, 'important');
  el.style.setProperty('min-height', `${SMALL_MOBILE_LAUNCHER_SIZE_PX}px`, 'important');
  el.style.setProperty('margin', '0', 'important');
  el.style.setProperty('border', 'none', 'important');
  el.style.setProperty('overflow', 'hidden', 'important');
  el.style.setProperty('transform', 'none', 'important');
  el.style.setProperty('z-index', '45', 'important');
  el.style.setProperty('border-radius', '9999px', 'important');
  el.style.setProperty('box-shadow', '0 4px 14px rgba(7, 35, 76, 0.22)', 'important');
}

function hideDuplicateMobileWidget(el: HTMLElement) {
  el.dataset.fiMobileLauncherHidden = 'true';
  el.style.setProperty('display', 'none', 'important');
}

export function syncMobileFloatingLaunchers(root: ParentNode = document) {
  const isMobile = isMobileTabBarViewport();

  document.querySelectorAll('[data-fi-mobile-launcher-hidden]').forEach((node) => {
    restoreHiddenLauncher(node as HTMLElement);
  });

  if (!isMobile) return;

  if (MOBILE_TAB_BAR_CHAT_ENABLED) {
    MOBILE_FLOATING_LAUNCHER_SELECTORS.forEach((selector) => {
      root.querySelectorAll(selector).forEach((node) => {
        const el = node as HTMLElement;
        if (el.closest('.fi-mobile-chat-sheet__launcher-host')) return;
        hideDuplicateMobileWidget(el);
      });
    });

    MOBILE_DUPLICATE_WIDGET_SELECTORS.forEach((selector) => {
      root.querySelectorAll(selector).forEach((node) => {
        hideDuplicateMobileWidget(node as HTMLElement);
      });
    });
    return;
  }

  MOBILE_FLOATING_LAUNCHER_SELECTORS.forEach((selector) => {
    root.querySelectorAll(selector).forEach((node) => {
      const el = node as HTMLElement;
      if (el.closest('.fi-mobile-chat-sheet__launcher-host')) return;
      applySmallMobileFloatingLauncherStyles(el);
    });
  });

  MOBILE_DUPLICATE_WIDGET_SELECTORS.forEach((selector) => {
    root.querySelectorAll(selector).forEach((node) => {
      hideDuplicateMobileWidget(node as HTMLElement);
    });
  });
}

const SCROLL_LOCK_STYLE_PROPS = [
  'overflow',
  'overflowY',
  'overflowX',
  'position',
  'top',
  'right',
  'bottom',
  'left',
  'width',
  'height',
  'touchAction',
  'paddingRight',
] as const;

const CHAT_IFRAME_LAYOUT_PROPS = [
  'position',
  'inset',
  'top',
  'right',
  'bottom',
  'left',
  'width',
  'height',
  'max-width',
  'opacity',
  'pointer-events',
  'z-index',
  'border',
  'outline',
  'border-radius',
  'box-shadow',
  'transform',
  'touch-action',
] as const;

let savedMobileScrollY = 0;

function applyMobileScrollLock() {
  if (typeof document === 'undefined') return;

  savedMobileScrollY = window.scrollY;
  document.documentElement.classList.add(MOBILE_CHAT_OPEN_BODY_CLASS);
  document.body.classList.add(MOBILE_CHAT_OPEN_BODY_CLASS);
  document.documentElement.style.setProperty('overflow', 'hidden');
  document.body.style.setProperty('overflow', 'hidden');
  document.body.style.setProperty('position', 'fixed');
  document.body.style.setProperty('top', `-${savedMobileScrollY}px`);
  document.body.style.setProperty('left', '0');
  document.body.style.setProperty('right', '0');
  document.body.style.setProperty('width', '100%');
  document.body.style.setProperty('touch-action', 'none');
}

function clearInlineStyles(element: HTMLElement, props: readonly string[]) {
  props.forEach((prop) => element.style.removeProperty(prop));
}

function releaseMobileScrollLock() {
  if (typeof document === 'undefined') return;

  const scrollY = savedMobileScrollY;
  document.body.classList.remove(MOBILE_CHAT_OPEN_BODY_CLASS);
  document.documentElement.classList.remove(MOBILE_CHAT_OPEN_BODY_CLASS);
  clearInlineStyles(document.documentElement, SCROLL_LOCK_STYLE_PROPS);
  clearInlineStyles(document.body, SCROLL_LOCK_STYLE_PROPS);
  window.scrollTo(0, scrollY);
}

export function getSavedMobileScrollY() {
  return savedMobileScrollY;
}

export const MOBILE_CHAT_OPEN_BODY_CLASS = 'fi-mobile-chat-open';

export function setMobileCliengoChatOpen(open: boolean) {
  if (typeof document === 'undefined') return;
  if (open) {
    applyMobileScrollLock();
    applyMobileCliengoChatLayout();
    return;
  }

  releaseMobileScrollLock();
  applyMobileCliengoChatLayout();
}

function applyCenteredMobileChatIframeStyles(chatIframe: HTMLElement) {
  chatIframe.style.setProperty('position', 'relative', 'important');
  chatIframe.style.setProperty('inset', 'auto', 'important');
  chatIframe.style.setProperty('top', 'auto', 'important');
  chatIframe.style.setProperty('right', 'auto', 'important');
  chatIframe.style.setProperty('bottom', 'auto', 'important');
  chatIframe.style.setProperty('left', 'auto', 'important');
  chatIframe.style.setProperty('width', 'min(100%, 22.5rem)', 'important');
  chatIframe.style.setProperty('height', 'min(calc(100dvh - 12rem), 40rem)', 'important');
  chatIframe.style.setProperty('max-width', '100%', 'important');
  chatIframe.style.setProperty('margin', '0 auto', 'important');
  chatIframe.style.setProperty('opacity', '1', 'important');
  chatIframe.style.setProperty('pointer-events', 'auto', 'important');
  chatIframe.style.setProperty('z-index', '1', 'important');
  chatIframe.style.setProperty('border', 'none', 'important');
  chatIframe.style.setProperty('outline', 'none', 'important');
  chatIframe.style.setProperty('border-radius', '1rem', 'important');
  chatIframe.style.setProperty('box-shadow', '0 16px 48px rgba(15, 23, 42, 0.18)', 'important');
  chatIframe.style.setProperty('transform', 'none', 'important');
  chatIframe.style.setProperty('touch-action', 'pan-y', 'important');
}

function applyCenteredMobileLauncherStyles(launcher: HTMLElement) {
  launcher.style.setProperty('position', 'absolute', 'important');
  launcher.style.setProperty('left', '50%', 'important');
  launcher.style.setProperty('top', '50%', 'important');
  launcher.style.setProperty('right', 'auto', 'important');
  launcher.style.setProperty('bottom', 'auto', 'important');
  launcher.style.setProperty('display', 'block', 'important');
  launcher.style.setProperty('opacity', '1', 'important');
  launcher.style.setProperty('pointer-events', 'auto', 'important');
  launcher.style.setProperty('width', '72px', 'important');
  launcher.style.setProperty('height', '72px', 'important');
  launcher.style.setProperty('min-width', '72px', 'important');
  launcher.style.setProperty('min-height', '72px', 'important');
  launcher.style.setProperty('margin', '0', 'important');
  launcher.style.setProperty('border', 'none', 'important');
  launcher.style.setProperty('overflow', 'visible', 'important');
  launcher.style.setProperty('transform', 'translate(-50%, -50%)', 'important');
  launcher.style.setProperty('box-shadow', 'none', 'important');
}

export function applyMobileCliengoChatLayout() {
  if (!isMobileTabBarViewport() || !MOBILE_TAB_BAR_CHAT_ENABLED) return;

  const chatIframe = document.getElementById('chatIframe') as HTMLElement | null;
  if (!chatIframe) return;

  const isOpen = document.body.classList.contains(MOBILE_CHAT_OPEN_BODY_CLASS);
  const inSheet = Boolean(chatIframe.closest('.fi-mobile-chat-sheet__body'));

  if (isOpen && inSheet) {
    applyCenteredMobileChatIframeStyles(chatIframe);
    return;
  }

  if (isOpen && !inSheet) {
    return;
  }

  if (!isOpen || !inSheet) {
    chatIframe.style.setProperty('opacity', '0', 'important');
    chatIframe.style.setProperty('pointer-events', 'none', 'important');
    chatIframe.style.setProperty('width', '0', 'important');
    chatIframe.style.setProperty('height', '0', 'important');
    chatIframe.style.setProperty('position', 'fixed', 'important');
    chatIframe.style.setProperty('left', '-9999px', 'important');
    chatIframe.style.setProperty('top', 'auto', 'important');
    chatIframe.style.setProperty('border', 'none', 'important');
    chatIframe.style.setProperty('box-shadow', 'none', 'important');
  }
}

export function getCliengoLauncherElement(): HTMLElement | null {
  if (typeof document === 'undefined') return null;

  return (
    (document.querySelector('#cliengo-button') as HTMLElement | null)
    ?? (document.querySelector('.clgo-chat-launcher') as HTMLElement | null)
    ?? (document.getElementById('popupIframe') as HTMLElement | null)
  );
}

export function mountMobileCliengoLauncher(container: HTMLElement) {
  if (!isMobileTabBarViewport()) return false;

  const launcher = getCliengoLauncherElement();
  if (!launcher) return false;

  restoreHiddenLauncher(launcher);

  if (launcher.parentElement !== container) {
    container.appendChild(launcher);
  }

  applyCenteredMobileLauncherStyles(launcher);
  return true;
}

export function unmountMobileCliengoLauncher() {
  const launcher = getCliengoLauncherElement();
  if (!launcher) return;

  if (launcher.parentElement && launcher.parentElement !== document.body) {
    document.body.appendChild(launcher);
  }

  launcher.style.removeProperty('position');
  launcher.style.removeProperty('display');
  launcher.style.removeProperty('opacity');
  launcher.style.removeProperty('pointer-events');
  launcher.style.removeProperty('width');
  launcher.style.removeProperty('height');
  launcher.style.removeProperty('min-width');
  launcher.style.removeProperty('min-height');
  launcher.style.removeProperty('margin');
  launcher.style.removeProperty('border');
  launcher.style.removeProperty('overflow');
  launcher.style.removeProperty('transform');
  launcher.style.removeProperty('box-shadow');

  syncMobileFloatingLaunchers();
}

export function mountMobileCliengoChat(container: HTMLElement) {
  if (!isMobileTabBarViewport()) return false;

  const chatIframe = getChatIframeElement();
  if (!chatIframe) return false;

  if (chatIframe.parentElement !== container) {
    container.appendChild(chatIframe);
  }

  applyCenteredMobileChatIframeStyles(chatIframe);
  return true;
}

export function unmountMobileCliengoChat() {
  const chatIframe = document.getElementById('chatIframe') as HTMLElement | null;
  if (!chatIframe) return;

  if (chatIframe.parentElement && chatIframe.parentElement !== document.body) {
    document.body.appendChild(chatIframe);
  }

  clearInlineStyles(chatIframe, CHAT_IFRAME_LAYOUT_PROPS);
  applyMobileCliengoChatLayout();
}

function getCliengoApi() {
  return (window as Window & {
    Cliengo?: {
      open?: () => void;
      openChat?: () => void;
      close?: () => void;
      closeChat?: () => void;
    };
  }).Cliengo;
}

export function getChatIframeElement() {
  if (typeof document === 'undefined') return null;
  return document.getElementById('chatIframe') as HTMLElement | null;
}

export function isChatIframeVisible() {
  const iframe = getChatIframeElement();
  if (!iframe) return false;

  const style = window.getComputedStyle(iframe);
  if (style.display === 'none' || style.visibility === 'hidden') {
    return false;
  }

  if (Number.parseFloat(style.opacity) < 0.05) {
    return false;
  }

  const rect = iframe.getBoundingClientRect();
  return rect.width > 48 && rect.height > 48;
}

export function waitForChatIframeVisible(
  onVisible: (iframe: HTMLElement) => void,
  timeoutMs = 120_000,
) {
  if (typeof document === 'undefined') {
    return () => {};
  }

  const existing = getChatIframeElement();
  if (existing && isChatIframeVisible()) {
    onVisible(existing);
    return () => {};
  }

  let done = false;
  const finish = (iframe: HTMLElement) => {
    if (done) return;
    done = true;
    observer.disconnect();
    window.clearInterval(interval);
    window.clearTimeout(timer);
    onVisible(iframe);
  };

  const check = () => {
    const iframe = getChatIframeElement();
    if (iframe && isChatIframeVisible()) {
      finish(iframe);
    }
  };

  const observer = new MutationObserver(check);
  observer.observe(document.body, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ['style', 'class', 'hidden', 'aria-hidden'],
  });

  const interval = window.setInterval(check, 200);
  const timer = window.setTimeout(() => {
    done = true;
    observer.disconnect();
    window.clearInterval(interval);
  }, timeoutMs);

  return () => {
    done = true;
    observer.disconnect();
    window.clearInterval(interval);
    window.clearTimeout(timer);
  };
}

export function requestCliengoChatOpen() {
  const cliengo = getCliengoApi();
  if (typeof cliengo?.openChat === 'function') {
    cliengo.openChat();
    return true;
  }
  if (typeof cliengo?.open === 'function') {
    cliengo.open();
    return true;
  }
  return false;
}

function clickCliengoLauncherForOpen() {
  const launcher = getCliengoLauncherElement();
  if (!launcher) return false;

  restoreHiddenLauncher(launcher);
  launcher.style.setProperty('display', 'block', 'important');
  launcher.style.setProperty('opacity', '0', 'important');
  launcher.style.setProperty('position', 'fixed', 'important');
  launcher.style.setProperty('left', '0', 'important');
  launcher.style.setProperty('top', '0', 'important');
  launcher.style.setProperty('width', '1px', 'important');
  launcher.style.setProperty('height', '1px', 'important');
  launcher.style.setProperty('pointer-events', 'auto', 'important');
  launcher.style.setProperty('overflow', 'hidden', 'important');
  launcher.click();
  syncMobileFloatingLaunchers();
  return true;
}

export function waitForChatIframeElement(
  onFound: (iframe: HTMLElement) => void,
  timeoutMs = 20_000,
) {
  if (typeof document === 'undefined') {
    return () => {};
  }

  const existing = getChatIframeElement();
  if (existing) {
    onFound(existing);
    return () => {};
  }

  let done = false;
  const finish = (iframe: HTMLElement) => {
    if (done) return;
    done = true;
    observer.disconnect();
    window.clearTimeout(timer);
    onFound(iframe);
  };

  const observer = new MutationObserver(() => {
    const iframe = getChatIframeElement();
    if (iframe) finish(iframe);
  });

  observer.observe(document.body, { childList: true, subtree: true });

  const timer = window.setTimeout(() => {
    done = true;
    observer.disconnect();
  }, timeoutMs);

  return () => {
    done = true;
    observer.disconnect();
    window.clearTimeout(timer);
  };
}

export function closeMobileCliengoChat() {
  setMobileCliengoChatOpen(false);
  unmountMobileCliengoLauncher();
  unmountMobileCliengoChat();
  releaseMobileScrollLock();
  syncMobileFloatingLaunchers();

  const cliengo = (window as Window & { Cliengo?: { close?: () => void; closeChat?: () => void } }).Cliengo;
  if (typeof cliengo?.closeChat === 'function') {
    cliengo.closeChat();
    return;
  }
  if (typeof cliengo?.close === 'function') {
    cliengo.close();
  }
}

export function openCliengoChat(options?: { skipMobileSheet?: boolean }) {
  if (isMobileTabBarViewport() && MOBILE_TAB_BAR_CHAT_ENABLED && !options?.skipMobileSheet) {
    setMobileCliengoChatOpen(true);
    return true;
  }

  return activateCliengoChatFromLauncher();
}

export function activateCliengoChatFromLauncher() {
  let opened = requestCliengoChatOpen();

  if (!opened) {
    opened = clickCliengoLauncherForOpen();
  }

  if (!opened) {
    return false;
  }

  if (isMobileTabBarViewport() && MOBILE_TAB_BAR_CHAT_ENABLED) {
    let attempts = 0;
    const interval = window.setInterval(() => {
      applyMobileCliengoChatLayout();
      attempts += 1;
      if (attempts >= 24) {
        window.clearInterval(interval);
      }
    }, 125);
  }

  return true;
}

export const CLIENGO_PROACTIVE_PROMPT_MS = 10_000;

const CLIENGO_PROACTIVE_SELECTORS = [
  '[class*="proactive"]',
  '[id*="proactive"]',
  '.clgo-invitation',
  '.clgo-chat-invitation',
  '.clgo-message-preview',
] as const;

function isCliengoElementVisible(element: Element) {
  const node = element as HTMLElement;
  const style = window.getComputedStyle(node);
  if (style.display === 'none' || style.visibility === 'hidden' || style.opacity === '0') {
    return false;
  }

  const rect = node.getBoundingClientRect();
  return rect.width > 0 && rect.height > 0;
}

export function subscribeCliengoProactivePrompt(onPrompt: () => void) {
  if (typeof window === 'undefined' || !isCliengoEnabled()) {
    return () => {};
  }

  let notified = false;
  const notify = () => {
    if (notified) return;
    notified = true;
    onPrompt();
  };

  const scan = () => {
    CLIENGO_PROACTIVE_SELECTORS.forEach((selector) => {
      document.querySelectorAll(selector).forEach((node) => {
        if (isCliengoElementVisible(node)) {
          notify();
        }
      });
    });
  };

  const observer = new MutationObserver(scan);
  observer.observe(document.body, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ['style', 'class', 'hidden', 'aria-hidden'],
  });

  const timer = window.setTimeout(notify, CLIENGO_PROACTIVE_PROMPT_MS);
  scan();

  return () => {
    notified = false;
    observer.disconnect();
    window.clearTimeout(timer);
  };
}
