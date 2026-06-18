/// <mls fileReference="_102055_/l2/molecules/groupnavigatesteps/ml-horizontal-stepper-glass.ts" enhancement="_102020_/l2/enhancementAura"/>
// =============================================================================
// HORIZONTAL STEPPER — GLASSMORPHISM por HERANÇA (mls-102055)
// =============================================================================
// Skill Group: groupNavigateSteps
// Herda MlHorizontalStepperMolecule (mls-102040): parsing de Step slots, lógica
// de navegação linear, completed/active, teclado (Arrow/Enter/Space), estado
// reativo (focusedIndex) e dispatch de change. Sobrescreve apenas render() +
// helpers presentacionais glass. This molecule does NOT contain business logic.
import { html, TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { MlHorizontalStepperMolecule } from '/_102040_/l2/molecules/groupnavigatesteps/ml-horizontal-stepper.js';

/// **collab_i18n_start**
const message_en = {
  completed: 'completed',
  loading: 'Loading steps...',
  stepperLabel: 'Progress steps',
};
type MessageType = typeof message_en;
const messages: Record<string, MessageType> = {
  en: message_en,
  pt: {
    completed: 'concluído',
    loading: 'Carregando etapas...',
    stepperLabel: 'Etapas de progresso',
  },
};
/// **collab_i18n_end**

type ParsedStep = {
  title: string;
  description: string;
  disabled: boolean;
  completed: boolean;
  iconHtml: string;
};

// Membros private (TS) do pai usados pelo render() glass. Em runtime existem no
// prototype/instância (private de TS é apagado); o cast preserva o tipo.
interface HorizontalStepperInternals {
  focusedIndex: number;
  getSteps(): ParsedStep[];
  getLabelText(): string;
  isStepCompleted(index: number, step: ParsedStep): boolean;
  canNavigateTo(index: number, step: ParsedStep, steps: ParsedStep[]): boolean;
  handleStepClick(index: number, step: ParsedStep, steps: ParsedStep[]): void;
  handleKeyDown(event: KeyboardEvent, steps: ParsedStep[]): void;
  handleFocus(index: number): void;
}

@customElement('groupnavigatesteps--ml-horizontal-stepper-glass')
export class MlHorizontalStepperGlass extends MlHorizontalStepperMolecule {
  private gMsg: MessageType = messages.en;

  private get x(): HorizontalStepperInternals {
    return this as unknown as HorizontalStepperInternals;
  }

  // ===========================================================================
  // CLASSES (glass) — nomes próprios p/ não colidir com os private do pai
  // ===========================================================================
  private glassIndicatorClasses(isActive: boolean, isCompleted: boolean, isDisabled: boolean): string {
    return [
      'glass-hs-dot flex items-center justify-center text-sm font-semibold w-9 h-9',
      isActive ? 'is-active' : isCompleted ? 'is-completed' : '',
      isDisabled ? 'is-disabled' : '',
    ].filter(Boolean).join(' ');
  }

  private glassTitleClasses(isActive: boolean, isDisabled: boolean): string {
    return [
      'glass-hs-title mt-2 text-xs font-medium text-center',
      isActive ? 'is-active' : '',
      isDisabled ? 'is-disabled' : '',
    ].filter(Boolean).join(' ');
  }

  private glassDescriptionClasses(isDisabled: boolean): string {
    return ['glass-hs-desc mt-1 text-[11px] text-center', isDisabled ? 'is-disabled' : ''].filter(Boolean).join(' ');
  }

  private glassContainerClasses(): string {
    return ['w-full', this.loading ? 'is-loading' : ''].filter(Boolean).join(' ');
  }

  // ===========================================================================
  // RENDER HELPERS (glass)
  // ===========================================================================
  private glassLoading(): TemplateResult {
    return html`
      <div class="glass-hs-loading flex items-center gap-2 text-sm">
        <span class="glass-hs-loading-dot h-2 w-2 rounded-full animate-pulse"></span>
        <span>${this.gMsg.loading}</span>
      </div>
    `;
  }

  private glassStep(step: ParsedStep, index: number, steps: ParsedStep[]): TemplateResult {
    const x = this.x;
    const isActive = index === this.value;
    const isCompleted = x.isStepCompleted(index, step);
    const isDisabled = this.disabled || this.loading || step.disabled || !x.canNavigateTo(index, step, steps);
    const indicatorClasses = this.glassIndicatorClasses(isActive, isCompleted, isDisabled);
    const titleClasses = this.glassTitleClasses(isActive, isDisabled);
    const descriptionClasses = this.glassDescriptionClasses(isDisabled);
    const ariaLabel = isCompleted ? `${step.title} ${this.gMsg.completed}` : step.title;

    return html`
      <div class="flex flex-col items-center flex-none">
        <button
          class="${indicatorClasses}"
          type="button"
          role="tab"
          aria-selected="${isActive ? 'true' : 'false'}"
          aria-disabled="${isDisabled ? 'true' : 'false'}"
          aria-label="${ariaLabel}"
          tabindex="${x.focusedIndex === index ? '0' : '-1'}"
          @click=${() => x.handleStepClick(index, step, steps)}
          @focus=${() => x.handleFocus(index)}
        >
          ${step.iconHtml ? unsafeHTML(step.iconHtml) : html`<span>${index + 1}</span>`}
        </button>
        <div class="${titleClasses}">${step.title}</div>
        ${step.description ? html`<div class="${descriptionClasses}">${step.description}</div>` : html``}
      </div>
    `;
  }

  private glassConnector(afterIndex: number): TemplateResult {
    const isCompleted = afterIndex < this.value;
    return html`
      <div class="flex-1 flex items-start pt-[18px] px-2">
        <div class="glass-hs-connector h-0.5 w-full ${isCompleted ? 'is-completed' : ''}"></div>
      </div>
    `;
  }

  // ===========================================================================
  // RENDER (override) — lógica/estado herdados via this.x
  // ===========================================================================
  render() {
    const lang = this.getMessageKey(messages);
    this.gMsg = messages[lang];
    const x = this.x;
    const steps = x.getSteps();
    const labelText = x.getLabelText();
    const ariaLabel = labelText || this.gMsg.stepperLabel;

    return html`
      <div class="${this.glassContainerClasses()}">
        ${labelText
          ? html`<div class="glass-hs-label mb-3 text-sm font-semibold">${unsafeHTML(this.getSlotContent('Label'))}</div>`
          : html``}
        <div
          class="flex items-start"
          role="tablist"
          aria-label="${ariaLabel}"
          aria-busy="${this.loading ? 'true' : 'false'}"
          @keydown=${(e: KeyboardEvent) => x.handleKeyDown(e, steps)}
        >
          ${steps.map((step, index) => html`
            ${this.glassStep(step, index, steps)}
            ${index < steps.length - 1 ? this.glassConnector(index) : html``}
          `)}
        </div>
        ${this.loading ? html`<div class="mt-3">${this.glassLoading()}</div>` : html``}
      </div>
    `;
  }
}
