/// <mls fileReference="_102055_/l2/molecules/groupviewcard/ml-vertical-card-glass.ts" enhancement="_102020_/l2/enhancementAura"/>
// =============================================================================
// ML VERTICAL CARD — GLASSMORPHISM por HERANÇA (mls-102055)
// =============================================================================
// Skill Group: groupViewCard
// Herda MlVerticalCardMolecule (mls-102040): estados (clickable/selected/disabled/
// loading), evento 'cardClick', modo de edição propagado a filhos (lifecycle).
// Sobrescreve só render() + helpers presentacionais glass.
// This molecule does NOT contain business logic.
import { html, TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { MlVerticalCardMolecule } from '/_102040_/l2/molecules/groupviewcard/ml-vertical-card.js';

// Membros private (TS) do pai usados pelo render() glass.
interface VerticalCardInternals {
  isInteractive(): boolean;
  handleCardClick(): void;
  handleKeyDown(e: KeyboardEvent): void;
}

@customElement('groupviewcard--ml-vertical-card-glass')
export class MlVerticalCardGlass extends MlVerticalCardMolecule {
  private get x(): VerticalCardInternals {
    return this as unknown as VerticalCardInternals;
  }

  // ---- helpers presentacionais (glass) ----
  private glassRootClasses(): string {
    return [
      'glass-card',
      'w-full p-4 flex flex-col gap-4',
      this.selected ? 'is-selected' : '',
      this.x.isInteractive() ? 'is-interactive' : '',
      this.disabled ? 'is-disabled' : '',
    ]
      .filter(Boolean)
      .join(' ');
  }

  private glassHeader(): TemplateResult {
    const hasHeader = this.hasSlot('CardHeader');
    const hasTitle = this.hasSlot('CardTitle');
    const hasDescription = this.hasSlot('CardDescription');

    if (!hasHeader && !hasTitle && !hasDescription) {
      return html``;
    }

    if (hasHeader) {
      return html`<div class="flex flex-col gap-1 glass-card-text">${unsafeHTML(this.getSlotContent('CardHeader'))}</div>`;
    }

    return html`
      <div class="flex flex-col gap-1">
        ${hasTitle ? html`<div class="glass-card-title text-base font-semibold">${unsafeHTML(this.getSlotContent('CardTitle'))}</div>` : html``}
        ${hasDescription ? html`<div class="glass-card-desc text-sm">${unsafeHTML(this.getSlotContent('CardDescription'))}</div>` : html``}
      </div>
    `;
  }

  private glassContent(): TemplateResult {
    if (!this.hasSlot('CardContent')) return html``;
    return html`<div class="glass-card-content text-sm">${unsafeHTML(this.getSlotContent('CardContent'))}</div>`;
  }

  private glassFooter(): TemplateResult {
    if (!this.hasSlot('CardFooter')) return html``;
    return html`<div class="glass-card-footer text-xs">${unsafeHTML(this.getSlotContent('CardFooter'))}</div>`;
  }

  private glassAction(): TemplateResult {
    if (!this.hasSlot('CardAction')) return html``;
    return html`<div class="glass-card-action pt-3">${unsafeHTML(this.getSlotContent('CardAction'))}</div>`;
  }

  private glassLoading(): TemplateResult {
    return html`
      <div class="flex flex-col gap-4 animate-pulse">
        <div class="glass-skeleton h-4 w-2/3"></div>
        <div class="glass-skeleton h-3 w-1/2"></div>
        <div class="glass-skeleton h-20 w-full"></div>
        <div class="glass-skeleton h-3 w-1/3"></div>
        <div class="glass-skeleton h-9 w-28"></div>
      </div>
    `;
  }

  // ===========================================================================
  // RENDER (override) — lógica/estado herdados via this.x
  // ===========================================================================
  render() {
    const x = this.x;
    const interactive = x.isInteractive();
    return html`
      <div
        class=${this.glassRootClasses()}
        role=${ifDefined(interactive ? 'button' : undefined)}
        tabindex=${ifDefined(interactive ? '0' : undefined)}
        aria-disabled=${ifDefined(this.disabled ? 'true' : undefined)}
        aria-selected=${ifDefined(this.selected ? 'true' : undefined)}
        @click=${() => x.handleCardClick()}
        @keydown=${(e: KeyboardEvent) => x.handleKeyDown(e)}
      >
        ${this.loading
          ? this.glassLoading()
          : html` ${this.glassHeader()} ${this.glassContent()} ${this.glassFooter()} ${this.glassAction()} `}
      </div>
    `;
  }
}
