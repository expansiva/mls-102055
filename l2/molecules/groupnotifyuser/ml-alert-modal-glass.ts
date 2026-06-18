/// <mls fileReference="_102055_/l2/molecules/groupnotifyuser/ml-alert-modal-glass.ts" enhancement="_102020_/l2/enhancementAura"/>
// =============================================================================
// ML-ALERT-MODAL — GLASSMORPHISM por HERANÇA (mls-102055)
// =============================================================================
// Skill Group: groupNotifyUser
// Herda toda a lógica de MlAlertModalMolecule (mls-102040): visibilidade,
// auto-dismiss timer, eventos (dismiss/action) e estado reativo. Sobrescreve
// apenas render() e helpers glass-prefixados. NÃO sobrescreve lifecycle
// (updated/manageAutoDismiss/clearAutoDismiss continuam herdados e ativos).
// This molecule does NOT contain business logic.
import { html, svg, TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
// Importar registra a tag do pai (groupnotifyuser--ml-alert-modal); inofensivo: usamos a tag -glass.
import { MlAlertModalMolecule } from '/_102040_/l2/molecules/groupnotifyuser/ml-alert-modal.js';

/// **collab_i18n_start**
const message_en = {
  dismiss: 'Dismiss notification',
  defaultMessage: 'Notification',
};

type MessageType = typeof message_en;
const messages: Record<string, MessageType> = {
  en: message_en,
  pt: {
    dismiss: 'Dispensar notificação',
    defaultMessage: 'Notificação',
  },
};
/// **collab_i18n_end**

// Membros private (TS) do pai usados pelo render() glass. Em runtime existem no
// prototype/instância (private de TS é apagado); o cast preserva o tipo.
interface AlertModalInternals {
  // handlers (private no pai)
  handleDismiss(): void;
  handleActionClick(): void;
  // helpers puros (semântica de tipo / acessibilidade / posição)
  getNormalizedType(): 'info' | 'success' | 'warning' | 'error';
  getRole(): 'alert' | 'status';
  getAriaLive(): 'assertive' | 'polite';
  getPositionClasses(): string;
}

@customElement('groupnotifyuser--ml-alert-modal-glass')
export class MlAlertModalGlass extends MlAlertModalMolecule {
  private gMsg: MessageType = messages.en;

  private get x(): AlertModalInternals {
    return this as unknown as AlertModalInternals;
  }

  // arrow wrappers para eventos (preservam o this da instância)
  private glassHandleDismiss = () => this.x.handleDismiss();
  private glassHandleActionClick = () => this.x.handleActionClick();

  // ===========================================================================
  // CLASSES (glass)
  // ===========================================================================
  private glassContainerClasses(): string {
    return ['glass-modal', `is-${this.x.getNormalizedType()}`, 'w-full max-w-xl p-6'].join(' ');
  }

  private glassIconWrapperClasses(): string {
    return 'glass-modal-icon-wrap h-12 w-12 rounded-full flex items-center justify-center';
  }

  // ===========================================================================
  // RENDER HELPERS (glass)
  // ===========================================================================
  private glassDefaultIcon(): TemplateResult {
    const type = this.x.getNormalizedType();
    if (type === 'success') {
      return html`<svg viewBox="0 0 24 24" class="h-6 w-6" fill="none" stroke="currentColor" stroke-width="2">${svg`<path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"></path>`}</svg>`;
    }
    if (type === 'warning') {
      return html`<svg viewBox="0 0 24 24" class="h-6 w-6" fill="none" stroke="currentColor" stroke-width="2">${svg`<path stroke-linecap="round" stroke-linejoin="round" d="M12 9v4m0 4h.01"></path>`}${svg`<path stroke-linecap="round" stroke-linejoin="round" d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"></path>`}</svg>`;
    }
    if (type === 'error') {
      return html`<svg viewBox="0 0 24 24" class="h-6 w-6" fill="none" stroke="currentColor" stroke-width="2">${svg`<path stroke-linecap="round" stroke-linejoin="round" d="M12 9v4m0 4h.01"></path>`}${svg`<circle cx="12" cy="12" r="9"></circle>`}</svg>`;
    }
    return html`<svg viewBox="0 0 24 24" class="h-6 w-6" fill="none" stroke="currentColor" stroke-width="2">${svg`<circle cx="12" cy="12" r="9"></circle>`}${svg`<path stroke-linecap="round" stroke-linejoin="round" d="M12 8h.01M11 12h2v4h-2z"></path>`}</svg>`;
  }

  private glassIcon(): TemplateResult {
    if (this.hasSlot('Icon')) {
      return html`<div class="${this.glassIconWrapperClasses()}">${unsafeHTML(this.getSlotContent('Icon'))}</div>`;
    }
    return html`<div class="${this.glassIconWrapperClasses()}">${this.glassDefaultIcon()}</div>`;
  }

  private glassTitle(): TemplateResult {
    if (!this.hasSlot('Title')) return html``;
    return html`<h3 class="glass-modal-title text-lg font-semibold">${unsafeHTML(this.getSlotContent('Title'))}</h3>`;
  }

  private glassMessage(): TemplateResult {
    const message = this.getSlotContent('Message') || this.gMsg.defaultMessage;
    return html`<div class="glass-modal-message text-sm">${unsafeHTML(message)}</div>`;
  }

  private glassActions(): TemplateResult {
    if (!this.hasSlot('Action')) return html``;
    return html`<div class="mt-6 flex items-center justify-end gap-3" @click=${this.glassHandleActionClick}>${unsafeHTML(this.getSlotContent('Action'))}</div>`;
  }

  private glassDismiss(): TemplateResult {
    if (!this.dismissible) return html``;
    return html`
      <button type="button" class="glass-modal-dismiss" aria-label="${this.gMsg.dismiss}" @click=${this.glassHandleDismiss}>
        <svg viewBox="0 0 24 24" class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="2">${svg`<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"></path>`}</svg>
      </button>
    `;
  }

  // ===========================================================================
  // RENDER (override) — lógica herdada via this.x
  // ===========================================================================
  render() {
    const lang = this.getMessageKey(messages);
    this.gMsg = messages[lang];
    const x = this.x;

    if (!this.visible) return html``;

    return html`
      <div class="fixed inset-0 z-50 flex ${x.getPositionClasses()} p-6">
        <div class="glass-modal-scrim absolute inset-0" aria-hidden="true" @click=${this.dismissible ? this.glassHandleDismiss : null}></div>
        <div
          class="relative z-10 w-full ${this.glassContainerClasses()}"
          role="${x.getRole()}"
          aria-live="${x.getAriaLive()}"
          aria-modal="true"
        >
          <div class="flex items-start justify-between gap-4">
            <div class="flex items-start gap-4">
              ${this.glassIcon()}
              <div class="space-y-2">${this.glassTitle()} ${this.glassMessage()}</div>
            </div>
            ${this.glassDismiss()}
          </div>
          ${this.glassActions()}
        </div>
      </div>
    `;
  }
}
