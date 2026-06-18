/// <mls fileReference="_102055_/l2/molecules/groupnotifyuser/ml-toast-notification-glass.ts" enhancement="_102020_/l2/enhancementAura"/>
// =============================================================================
// TOAST NOTIFICATION — GLASSMORPHISM por HERANÇA (mls-102055)
// =============================================================================
// Skill Group: groupNotifyUser
// Herda toda a lógica de ToastNotificationMolecule (mls-102040): timers de
// auto-dismiss, estado de animação, dispatch de eventos (dismiss/action) e o
// ciclo de vida reativo. Sobrescreve APENAS render() + helpers glass-*.
// NÃO sobrescreve o lifecycle (updated/disconnectedCallback/handleIcaStateChange).
// This molecule does NOT contain business logic.
import { html, svg, TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
// Importar registra a tag do pai (groupnotifyuser--ml-toast-notification); inofensivo: usamos a tag -glass.
import { ToastNotificationMolecule } from '/_102040_/l2/molecules/groupnotifyuser/ml-toast-notification.js';

/// **collab_i18n_start**
const message_en = {
  dismissLabel: 'Dismiss notification',
};
type MessageType = typeof message_en;
const messages: Record<string, MessageType> = {
  en: message_en,
  pt: {
    dismissLabel: 'Dispensar notificação',
  },
};
/// **collab_i18n_end**

// Membros private (TS) do pai usados pelo render() glass. Em runtime existem na
// instância (private de TS é apagado); o cast preserva o tipo.
interface ToastNotificationInternals {
  // estado reativo (@state private no pai)
  isAnimatingOut: boolean;
  // handlers (private no pai)
  handleDismiss(): void;
  handleActionClick(e: Event): void;
}

@customElement('groupnotifyuser--ml-toast-notification-glass')
export class MlToastNotificationGlass extends ToastNotificationMolecule {
  private gMsg: MessageType = messages.en;

  private get x(): ToastNotificationInternals {
    return this as unknown as ToastNotificationInternals;
  }

  // arrow wrappers para eventos (preservam o handler private herdado)
  private gHandleDismiss = (): void => {
    this.x.handleDismiss();
  };

  private gHandleActionClick = (e: Event): void => {
    this.x.handleActionClick(e);
  };

  // ===========================================================================
  // STYLING HELPERS  (aparência = classes glass; layout/posição/animação = Tailwind)
  // ===========================================================================
  private glassContainerClasses(): string {
    return [
      'glass-toast',
      `is-${this.type}`,
      'flex items-start gap-3 p-4 max-w-sm w-full transition-all duration-300 ease-in-out',
      this.glassPositionClasses(),
      this.glassAnimationClasses(),
    ]
      .filter(Boolean)
      .join(' ');
  }

  private glassPositionClasses(): string {
    if (!this.position) return '';

    const positionMap: Record<string, string> = {
      top: 'fixed top-4 left-1/2 -translate-x-1/2 z-50',
      bottom: 'fixed bottom-4 left-1/2 -translate-x-1/2 z-50',
      'top-right': 'fixed top-4 right-4 z-50',
      'bottom-right': 'fixed bottom-4 right-4 z-50',
      'top-left': 'fixed top-4 left-4 z-50',
      'bottom-left': 'fixed bottom-4 left-4 z-50',
    };

    return positionMap[this.position] || '';
  }

  private glassAnimationClasses(): string {
    if (this.x.isAnimatingOut) {
      return this.glassExitAnimationClass();
    }
    return this.glassEntryAnimationClass();
  }

  private glassEntryAnimationClass(): string {
    if (!this.position) return 'opacity-100 translate-y-0';
    switch (this.position) {
      case 'top':
      case 'top-left':
      case 'top-right':
        return 'animate-slide-in-top';
      case 'bottom':
      case 'bottom-left':
      case 'bottom-right':
        return 'animate-slide-in-bottom';
      default:
        return 'opacity-100';
    }
  }

  private glassExitAnimationClass(): string {
    if (!this.position) return 'opacity-0 translate-y-2';
    switch (this.position) {
      case 'top':
      case 'top-left':
      case 'top-right':
        return 'opacity-0 -translate-y-4';
      case 'bottom':
      case 'bottom-left':
      case 'bottom-right':
        return 'opacity-0 translate-y-4';
      default:
        return 'opacity-0';
    }
  }

  // ===========================================================================
  // ACCESSIBILITY HELPERS
  // ===========================================================================
  private glassAriaRole(): string {
    return this.type === 'error' || this.type === 'warning' ? 'alert' : 'status';
  }

  private glassAriaLive(): 'assertive' | 'polite' {
    return this.type === 'error' ? 'assertive' : 'polite';
  }

  // ===========================================================================
  // RENDER HELPERS (glass)
  // ===========================================================================
  private glassRenderIcon(): TemplateResult {
    if (this.hasSlot('Icon')) {
      return html`<div class="glass-toast-icon flex-shrink-0">${unsafeHTML(this.getSlotContent('Icon'))}</div>`;
    }
    return html`<div class="glass-toast-icon flex-shrink-0">${this.glassRenderDefaultIcon()}</div>`;
  }

  private glassRenderDefaultIcon(): TemplateResult {
    const iconClasses = 'w-5 h-5';
    switch (this.type) {
      case 'success':
        return html`<svg class="${iconClasses}" viewBox="0 0 20 20" fill="currentColor">${svg`<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clip-rule="evenodd" />`}</svg>`;
      case 'warning':
        return html`<svg class="${iconClasses}" viewBox="0 0 20 20" fill="currentColor">${svg`<path fill-rule="evenodd" d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 5zm0 9a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd" />`}</svg>`;
      case 'error':
        return html`<svg class="${iconClasses}" viewBox="0 0 20 20" fill="currentColor">${svg`<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clip-rule="evenodd" />`}</svg>`;
      case 'info':
      default:
        return html`<svg class="${iconClasses}" viewBox="0 0 20 20" fill="currentColor">${svg`<path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z" clip-rule="evenodd" />`}</svg>`;
    }
  }

  private glassRenderTitle(): TemplateResult {
    if (!this.hasSlot('Title')) {
      return html``;
    }
    return html`<div class="glass-toast-title text-sm font-semibold">${unsafeHTML(this.getSlotContent('Title'))}</div>`;
  }

  private glassRenderMessage(): TemplateResult {
    return html`<div class="glass-toast-message text-sm">${unsafeHTML(this.getSlotContent('Message'))}</div>`;
  }

  private glassRenderAction(): TemplateResult {
    if (!this.hasSlot('Action')) {
      return html``;
    }
    return html`<div class="glass-toast-action mt-2 text-sm font-medium cursor-pointer" @click=${this.gHandleActionClick}>${unsafeHTML(this.getSlotContent('Action'))}</div>`;
  }

  private glassRenderCloseButton(): TemplateResult {
    if (!this.dismissible) {
      return html``;
    }
    return html`
      <button type="button" class="glass-toast-close flex-shrink-0 p-1" aria-label="${this.gMsg.dismissLabel}" @click=${this.gHandleDismiss}>
        <svg class="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">${svg`<path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />`}</svg>
      </button>
    `;
  }

  // ===========================================================================
  // RENDER (override) — lógica/timers herdados; só a aparência muda
  // ===========================================================================
  render() {
    const lang = this.getMessageKey(messages);
    this.gMsg = messages[lang];

    if (!this.visible && !this.x.isAnimatingOut) {
      return html``;
    }

    return html`
      <div class="${this.glassContainerClasses()}" role="${this.glassAriaRole()}" aria-live="${this.glassAriaLive()}">
        ${this.glassRenderIcon()}
        <div class="flex-1 min-w-0">${this.glassRenderTitle()} ${this.glassRenderMessage()} ${this.glassRenderAction()}</div>
        ${this.glassRenderCloseButton()}
      </div>
    `;
  }
}
