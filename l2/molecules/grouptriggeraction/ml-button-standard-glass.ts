/// <mls fileReference="_102055_/l2/molecules/grouptriggeraction/ml-button-standard-glass.ts" enhancement="_102020_/l2/enhancementAura"/>
// =============================================================================
// BUTTON STANDARD — GLASSMORPHISM por HERANÇA (mls-102055)
// =============================================================================
// Skill Group: groupTriggerAction
// Herda ButtonStandardMolecule (mls-102040): variants, sizes, loading, ícone,
// evento 'action'. Sobrescreve só render() + helpers presentacionais glass.
// This molecule does NOT contain business logic.
import { html, nothing, svg, TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { ButtonStandardMolecule } from '/_102040_/l2/molecules/grouptriggeraction/ml-button-standard.js';

// Membros private (TS) do pai usados pelo render() glass. Em runtime existem na
// instância (private de TS é apagado); o cast preserva o tipo.
interface ButtonStandardInternals {
  handleActionClick(e: Event): void;
  isDisabled(): boolean;
  getVariant(): 'primary' | 'secondary' | 'danger' | 'ghost' | 'link';
  getSizeKey(): 'xs' | 'sm' | 'md' | 'lg';
  getSizeClasses(hasLabel: boolean): { button: string; icon: string; spinner: string; gap: string };
  getIconClasses(sizeClass: string): string;
}

@customElement('grouptriggeraction--ml-button-standard-glass')
export class ButtonStandardGlass extends ButtonStandardMolecule {
  private get x(): ButtonStandardInternals {
    return this as unknown as ButtonStandardInternals;
  }

  // ---- helpers presentacionais (glass) ----
  private glassButtonClasses(hasLabel: boolean): string {
    const isDisabled = this.x.isDisabled();
    const variant = this.x.getVariant();
    const sizeClasses = this.x.getSizeClasses(hasLabel);
    return [
      'glass-btn',
      `glass-btn--${variant}`,
      'inline-flex items-center justify-center',
      sizeClasses.button,
      sizeClasses.gap,
      isDisabled ? 'is-disabled' : '',
    ]
      .filter(Boolean)
      .join(' ');
  }

  private glassSpinner(sizeClass: string): TemplateResult {
    return html`
      <svg class="animate-spin ${sizeClass}" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        ${svg`<circle cx="12" cy="12" r="10" stroke="currentColor" stroke-opacity="0.25" stroke-width="4"></circle>`}
        ${svg`<path d="M22 12a10 10 0 0 1-10 10" stroke="currentColor" stroke-width="4" stroke-linecap="round"></path>`}
      </svg>
    `;
  }

  // ===========================================================================
  // RENDER (override) — lógica/estado herdados via this.x
  // ===========================================================================
  render() {
    const x = this.x;
    const labelContent = (this.getSlotContent('Label') || '').trim();
    const iconContent = (this.getSlotContent('Icon') || '').trim();
    const hasLabel = labelContent.length > 0;
    const hasIcon = iconContent.length > 0;
    const isDisabled = x.isDisabled();
    const sizeClasses = x.getSizeClasses(hasLabel);
    const iconPosition = this.iconPosition === 'end' ? 'end' : 'start';
    const ariaLabel = !hasLabel && hasIcon ? labelContent : undefined;

    const iconTemplate = hasIcon
      ? html`<span class="${x.getIconClasses(sizeClasses.icon)}">${unsafeHTML(iconContent)}</span>`
      : nothing;

    const spinnerTemplate = html`<span class="${x.getIconClasses(sizeClasses.spinner)}"
      >${this.glassSpinner(sizeClasses.spinner)}</span
    >`;

    const labelTemplate = hasLabel
      ? html`<span class="${this.loading && !hasIcon ? 'opacity-0' : ''}">${unsafeHTML(labelContent)}</span>`
      : nothing;

    const labelWithSpinner = html`
      <span class="relative inline-flex items-center justify-center">
        ${labelTemplate} ${this.loading && !hasIcon ? html`<span class="absolute">${spinnerTemplate}</span>` : nothing}
      </span>
    `;

    const contentTemplate = html`
      ${iconPosition === 'start'
        ? html` ${this.loading && hasIcon ? spinnerTemplate : iconTemplate} ${labelWithSpinner} `
        : html` ${labelWithSpinner} ${this.loading && hasIcon ? spinnerTemplate : iconTemplate} `}
    `;

    return html`
      <button
        class="${this.glassButtonClasses(hasLabel)}"
        type="${this.type}"
        ?disabled=${isDisabled}
        aria-busy=${this.loading ? 'true' : 'false'}
        aria-disabled=${isDisabled ? 'true' : 'false'}
        aria-label=${ariaLabel || nothing}
        @click=${(e: Event) => x.handleActionClick(e)}
      >
        ${contentTemplate}
      </button>
    `;
  }
}
