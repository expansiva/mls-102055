/// <mls fileReference="_102055_/l2/molecules/groupviewcard/ml-profile-card-glass.ts" enhancement="_102020_/l2/enhancementAura"/>
// =============================================================================
// ML PROFILE CARD — GLASSMORPHISM por HERANÇA (mls-102055)
// =============================================================================
// Skill Group: groupViewCard
// Herda MlProfileCardMolecule (mls-102040): estados (clickable/selected/disabled/
// loading), evento 'cardClick', modo de edição propagado a filhos (lifecycle).
// Sobrescreve só render() + helpers presentacionais glass.
// This molecule does NOT contain business logic.
import { html, nothing } from 'lit';
import { customElement } from 'lit/decorators.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { MlProfileCardMolecule } from '/_102040_/l2/molecules/groupviewcard/ml-profile-card.js';

// Membros private (TS) do pai usados pelo render() glass.
interface ProfileCardInternals {
  isInteractive(): boolean;
  handleCardClick(): void;
  handleCardKeydown(event: KeyboardEvent): void;
}

@customElement('groupviewcard--ml-profile-card-glass')
export class MlProfileCardGlass extends MlProfileCardMolecule {
  private get x(): ProfileCardInternals {
    return this as unknown as ProfileCardInternals;
  }

  // ---- helpers presentacionais (glass) ----
  private glassCardClasses(): string {
    return [
      'glass-card',
      'w-full p-4',
      this.selected ? 'is-selected' : '',
      this.x.isInteractive() ? 'is-interactive' : '',
      this.disabled || this.loading ? 'is-disabled' : '',
    ]
      .filter(Boolean)
      .join(' ');
  }

  private glassHeader() {
    const hasHeader = this.hasSlot('CardHeader');
    const hasTitle = this.hasSlot('CardTitle');
    const hasDescription = this.hasSlot('CardDescription');
    if (!hasHeader && !hasTitle && !hasDescription) return nothing;

    if (hasHeader) {
      return html`<div class="card-header glass-card-text">${unsafeHTML(this.getSlotContent('CardHeader'))}</div>`;
    }

    return html`
      <div class="card-header">
        ${hasTitle ? html`<div class="glass-card-title text-lg font-semibold">${unsafeHTML(this.getSlotContent('CardTitle'))}</div>` : nothing}
        ${hasDescription ? html`<div class="glass-card-desc mt-1 text-sm">${unsafeHTML(this.getSlotContent('CardDescription'))}</div>` : nothing}
      </div>
    `;
  }

  private glassContent() {
    if (!this.hasSlot('CardContent')) return nothing;
    return html`<div class="card-content glass-card-content">${unsafeHTML(this.getSlotContent('CardContent'))}</div>`;
  }

  private glassFooter() {
    if (!this.hasSlot('CardFooter')) return nothing;
    return html`<div class="card-footer glass-card-footer">${unsafeHTML(this.getSlotContent('CardFooter'))}</div>`;
  }

  private glassAction() {
    if (!this.hasSlot('CardAction')) return nothing;
    return html`<div class="card-action flex flex-wrap items-center gap-2">${unsafeHTML(this.getSlotContent('CardAction'))}</div>`;
  }

  private glassLoadingSkeleton() {
    return html`
      <div class="animate-pulse space-y-4">
        <div class="space-y-2">
          <div class="glass-skeleton h-4 w-2/3"></div>
          <div class="glass-skeleton h-3 w-1/2"></div>
        </div>
        <div class="glass-skeleton h-16 w-full"></div>
        <div class="flex gap-2">
          <div class="glass-skeleton h-8 w-24"></div>
          <div class="glass-skeleton h-8 w-20"></div>
        </div>
      </div>
    `;
  }

  // ===========================================================================
  // RENDER (override) — lógica/estado herdados via this.x
  // ===========================================================================
  render() {
    const x = this.x;
    const roleAttr = x.isInteractive() ? 'button' : nothing;
    const tabIndexAttr = x.isInteractive() ? 0 : nothing;
    const ariaDisabled = this.disabled || this.loading ? 'true' : nothing;
    const ariaSelected = this.selected ? 'true' : nothing;

    return html`
      <div
        class="${this.glassCardClasses()}"
        role=${roleAttr}
        tabindex=${tabIndexAttr}
        aria-disabled=${ariaDisabled}
        aria-selected=${ariaSelected}
        @click=${() => x.handleCardClick()}
        @keydown=${(e: KeyboardEvent) => x.handleCardKeydown(e)}
      >
        ${this.loading
          ? this.glassLoadingSkeleton()
          : html`
              <div class="space-y-4">
                ${this.glassHeader()} ${this.glassContent()} ${this.glassFooter()} ${this.glassAction()}
              </div>
            `}
      </div>
    `;
  }
}
