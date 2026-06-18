/// <mls fileReference="_102055_/l2/molecules/groupentertime/ml-clock-time-picker-glass.ts" enhancement="_102020_/l2/enhancementAura"/>
// =============================================================================
// CLOCK TIME PICKER — GLASSMORPHISM por HERANÇA (mls-102055)
// =============================================================================
// Skill Group: enter + time
// Herda toda a lógica de ClockTimePickerMolecule (mls-102040): parsing de hora,
// stages hour/minute/second, 12/24h + AM/PM, minute step, range min/max,
// confirm/clear, outside-click e estado reativo (isOpen/stage/selected*/amPm).
// Sobrescreve apenas render()/painel com classes glass. A formatação de exibição
// é refeita localmente (i18n próprio) para não depender do `msg` privado do pai.
// This molecule does NOT contain business logic.
import { html, TemplateResult, nothing } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { customElement } from 'lit/decorators.js';
// Importar registra a tag do pai (groupentertime--ml-clock-time-picker); inofensivo: usamos a tag -glass.
import { ClockTimePickerMolecule } from '/_102040_/l2/molecules/groupentertime/ml-clock-time-picker.js';

/// **collab_i18n_start**
const message_en = {
  placeholder: 'Select time',
  loading: 'Loading...',
  clear: 'Clear',
  confirm: 'Confirm',
  hour: 'Hour',
  minute: 'Minute',
  second: 'Second',
  am: 'AM',
  pm: 'PM',
  emptyView: '—',
};
type MessageType = typeof message_en;
const messages: Record<string, MessageType> = {
  en: message_en,
  pt: {
    placeholder: 'Selecionar hora',
    loading: 'Carregando...',
    clear: 'Limpar',
    confirm: 'Confirmar',
    hour: 'Hora',
    minute: 'Minuto',
    second: 'Segundo',
    am: 'AM',
    pm: 'PM',
    emptyView: '—',
  },
};
/// **collab_i18n_end**

// Membros private (TS) do pai usados pelo render() glass. Em runtime existem no
// prototype/instância (private de TS é apagado); o cast preserva o tipo.
interface ClockTimeInternals {
  // estado reativo (@state private no pai)
  isOpen: boolean;
  stage: 'hour' | 'minute' | 'second';
  selectedHour: number | null;
  selectedMinute: number | null;
  selectedSecond: number | null;
  amPm: 'AM' | 'PM';
  // handlers
  onToggleOpen(): void;
  onInputFocus(): void;
  onInputBlur(): void;
  onSelectHour(hour: number): void;
  onSelectMinute(minute: number): void;
  onSelectSecond(second: number): void;
  onConfirm(): void;
  onClear(): void;
  onToggleAmPm(value: 'AM' | 'PM'): void;
  // helpers puros
  canInteract(): boolean;
  parseTime(value: string): { hour: number; minute: number; second: number | null } | null;
  convertTo24Hour(hour12: number, amPm: 'AM' | 'PM'): number;
  isHourDisabled(hour: number): boolean;
  isMinuteDisabled(hour: number | null, minute: number): boolean;
  isSecondDisabled(hour: number | null, minute: number | null, second: number): boolean;
  getHourOptions(): number[];
  getMinuteOptions(): number[];
  getSecondOptions(): number[];
  getLabelId(): string;
  getHelperId(): string;
  getErrorId(): string;
}

@customElement('groupentertime--ml-clock-time-picker-glass')
export class ClockTimePickerGlass extends ClockTimePickerMolecule {
  private gMsg: MessageType = messages.en;

  private get x(): ClockTimeInternals {
    return this as unknown as ClockTimeInternals;
  }

  // --- formatação de exibição (própria, i18n local) ---
  private glassFormatTime(value: string | null): string {
    if (!value) return this.gMsg.emptyView;
    const parsed = this.x.parseTime(value);
    if (!parsed) return this.gMsg.emptyView;
    const locale = this.locale || undefined;
    const options: Intl.DateTimeFormatOptions = {
      hour: '2-digit',
      minute: '2-digit',
      second: this.showSeconds ? '2-digit' : undefined,
      hour12: this.hour12,
    };
    const date = new Date();
    date.setHours(parsed.hour, parsed.minute, parsed.second || 0, 0);
    return new Intl.DateTimeFormat(locale, options).format(date);
  }

  private glassStepLabel(): string {
    if (this.x.stage === 'hour') return this.gMsg.hour;
    if (this.x.stage === 'minute') return this.gMsg.minute;
    return this.gMsg.second;
  }

  // ===========================================================================
  // CLASSES (glass)
  // ===========================================================================
  private glassInputClasses(): string {
    const hasError = !!this.error;
    return [
      'glass-tp-input w-full px-3 py-2 text-sm',
      hasError ? 'is-error' : '',
      this.disabled || this.readonly ? 'is-disabled' : '',
    ].filter(Boolean).join(' ');
  }
  private glassOptionClasses(selected: boolean, disabled: boolean): string {
    return [
      'glass-tp-option w-10 h-10 flex items-center justify-center text-sm',
      selected ? 'is-selected' : '',
      disabled ? 'is-disabled' : '',
    ].filter(Boolean).join(' ');
  }

  // ===========================================================================
  // RENDER HELPERS (glass)
  // ===========================================================================
  private glassLabel(): TemplateResult {
    if (!this.hasSlot('Label')) return html``;
    const requiredMark = this.required ? html`<span class="glass-tp-req">*</span>` : nothing;
    return html`
      <label class="glass-tp-label mb-1 text-sm font-medium">
        ${unsafeHTML(this.getSlotContent('Label'))}
        ${requiredMark}
      </label>
    `;
  }
  private glassHelperOrError(): TemplateResult {
    if (!this.isEditing) return html``;
    if (this.error) {
      return html`<p id="${this.x.getErrorId()}" class="glass-error-text mt-1 text-xs">${unsafeHTML(this.error)}</p>`;
    }
    if (this.hasSlot('Helper')) {
      return html`<p id="${this.x.getHelperId()}" class="glass-helper mt-1 text-xs">${unsafeHTML(this.getSlotContent('Helper'))}</p>`;
    }
    return html``;
  }
  private glassClockOptions(): TemplateResult {
    const x = this.x;
    if (x.stage === 'hour') {
      const hours = x.getHourOptions();
      return html`
        <div class="grid grid-cols-6 gap-2">
          ${hours.map((h) => {
            const hour24 = this.hour12 ? x.convertTo24Hour(h, x.amPm) : h;
            const selected = x.selectedHour === hour24;
            const disabled = x.isHourDisabled(h);
            return html`
              <button class="${this.glassOptionClasses(selected, disabled)}" ?disabled=${disabled} @click=${() => x.onSelectHour(h)} aria-label="${h}">
                ${String(h).padStart(2, '0')}
              </button>
            `;
          })}
        </div>
      `;
    }

    if (x.stage === 'minute') {
      const minutes = x.getMinuteOptions();
      return html`
        <div class="grid grid-cols-6 gap-2">
          ${minutes.map((m) => {
            const selected = x.selectedMinute === m;
            const disabled = x.isMinuteDisabled(x.selectedHour, m);
            return html`
              <button class="${this.glassOptionClasses(selected, disabled)}" ?disabled=${disabled} @click=${() => x.onSelectMinute(m)} aria-label="${m}">
                ${String(m).padStart(2, '0')}
              </button>
            `;
          })}
        </div>
      `;
    }

    const seconds = x.getSecondOptions();
    return html`
      <div class="grid grid-cols-6 gap-2">
        ${seconds.map((s) => {
          const selected = x.selectedSecond === s;
          const disabled = x.isSecondDisabled(x.selectedHour, x.selectedMinute, s);
          return html`
            <button class="${this.glassOptionClasses(selected, disabled)}" ?disabled=${disabled} @click=${() => x.onSelectSecond(s)} aria-label="${s}">
              ${String(s).padStart(2, '0')}
            </button>
          `;
        })}
      </div>
    `;
  }
  private glassAmPm(): TemplateResult {
    const x = this.x;
    if (!this.hour12) return html``;
    const amClasses = ['glass-tp-ampm px-3 py-1 text-xs', x.amPm === 'AM' ? 'is-active' : ''].filter(Boolean).join(' ');
    const pmClasses = ['glass-tp-ampm px-3 py-1 text-xs', x.amPm === 'PM' ? 'is-active' : ''].filter(Boolean).join(' ');
    return html`
      <div class="flex items-center gap-2">
        <button class="${amClasses}" @click=${() => x.onToggleAmPm('AM')}>${this.gMsg.am}</button>
        <button class="${pmClasses}" @click=${() => x.onToggleAmPm('PM')}>${this.gMsg.pm}</button>
      </div>
    `;
  }

  // ===========================================================================
  // RENDER (override) — lógica/estado herdados via this.x
  // ===========================================================================
  render() {
    const x = this.x;
    const lang = this.getMessageKey(messages);
    this.gMsg = messages[lang];

    if (!this.isEditing) {
      return html`
        <div class="w-full">
          ${this.glassLabel()}
          <div class="glass-tp-view text-sm">${this.glassFormatTime(this.value)}</div>
        </div>
      `;
    }

    const displayValue = this.value ? this.glassFormatTime(this.value) : '';
    const placeholder = this.placeholder || this.gMsg.placeholder;
    const ariaDescribedBy = this.error ? x.getErrorId() : (this.hasSlot('Helper') ? x.getHelperId() : undefined);

    return html`
      <div class="w-full">
        ${this.glassLabel()}
        <div class="relative">
          <input
            class="${this.glassInputClasses()}"
            name="${this.name}"
            .value=${displayValue}
            placeholder="${placeholder}"
            readonly
            @click=${() => x.onToggleOpen()}
            @focus=${() => x.onInputFocus()}
            @blur=${() => x.onInputBlur()}
            aria-invalid=${this.error ? 'true' : 'false'}
            aria-required=${this.required ? 'true' : 'false'}
            aria-describedby=${ariaDescribedBy || nothing}
            aria-labelledby=${this.hasSlot('Label') ? x.getLabelId() : nothing}
            aria-label=${displayValue || placeholder}
          />
          <button
            class="glass-tp-clock absolute right-2 top-1/2 -translate-y-1/2"
            @click=${() => x.onToggleOpen()}
            ?disabled=${!x.canInteract()}
            aria-label="${this.gMsg.hour}"
          >
            🕒
          </button>
        </div>

        ${this.loading ? html`<div class="glass-tp-loading mt-2 text-xs">${this.gMsg.loading}</div>` : nothing}

        ${x.isOpen && !this.loading
          ? html`
              <div class="glass-tp-panel mt-2 p-3" role="dialog" aria-modal="true">
                <div class="flex items-center justify-between mb-3">
                  <span class="glass-tp-step text-xs uppercase tracking-wide">${this.glassStepLabel()}</span>
                  ${this.glassAmPm()}
                </div>
                ${this.glassClockOptions()}
                <div class="mt-3 flex items-center justify-between">
                  <button class="glass-tp-clear text-xs" @click=${() => x.onClear()}>${this.gMsg.clear}</button>
                  <button class="glass-tp-confirm px-3 py-1 text-xs" @click=${() => x.onConfirm()}>${this.gMsg.confirm}</button>
                </div>
              </div>
            `
          : nothing}

        ${this.glassHelperOrError()}
      </div>
    `;
  }
}
