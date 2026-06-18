/// <mls fileReference="_102055_/l2/molecules/groupenterdatetime/ml-datetime-picker-glass.ts" enhancement="_102020_/l2/enhancementAura"/>
// =============================================================================
// DATETIME PICKER — GLASSMORPHISM por HERANÇA (mls-102055)
// =============================================================================
// Skill Group: enter + datetime
// Herda toda a lógica de MlDatetimePickerMolecule (mls-102040): parsing ISO,
// navegação de mês, seleção de dia/hora/minuto, range min/max, confirm/clear,
// outside-click e estado reativo (isOpen/selectedDate/selectedHour/...).
// Sobrescreve apenas render()/painel com classes glass. A formatação de exibição
// é refeita localmente (i18n próprio) para não depender do `msg` privado do pai.
// This molecule does NOT contain business logic.
import { html, svg, TemplateResult, nothing } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { customElement } from 'lit/decorators.js';
// Importar registra a tag do pai (groupenterdatetime--ml-datetime-picker); inofensivo: usamos a tag -glass.
import { MlDatetimePickerMolecule } from '/_102040_/l2/molecules/groupenterdatetime/ml-datetime-picker.js';

/// **collab_i18n_start**
const message_en = {
  placeholder: 'Select date and time',
  loading: 'Loading...',
  confirm: 'Confirm',
  clear: 'Clear',
  empty: '—',
};
type MessageType = typeof message_en;
const messages: Record<string, MessageType> = {
  en: message_en,
  pt: {
    placeholder: 'Selecione data e hora',
    loading: 'Carregando...',
    confirm: 'Confirmar',
    clear: 'Limpar',
    empty: '—',
  },
  de: {
    placeholder: 'Datum und Uhrzeit wählen',
    loading: 'Laden...',
    confirm: 'Bestätigen',
    clear: 'Löschen',
    empty: '—',
  },
};
/// **collab_i18n_end**

// Membros private (TS) do pai usados pelo render() glass. Em runtime existem no
// prototype/instância (private de TS é apagado); o cast preserva o tipo.
interface DatetimePickerInternals {
  // estado reativo (@state private no pai)
  isOpen: boolean;
  isFocused: boolean;
  selectedDate: string | null;
  selectedHour: number | null;
  selectedMinute: number | null;
  currentMonth: Date;
  // ids
  labelId: string;
  helperId: string;
  errorId: string;
  // handlers
  handleTriggerClick(): void;
  handleFocus(): void;
  handleBlur(): void;
  handleDaySelect(dateStr: string, disabled: boolean): void;
  handleHourSelect(hour: number, disabled: boolean): void;
  handleMinuteSelect(minute: number, disabled: boolean): void;
  handleConfirm(): void;
  handleClear(): void;
  handlePrevMonth(): void;
  handleNextMonth(): void;
  // helpers puros
  pad(value: number): string;
  parseIso(value: string): { year: number; month: number; day: number; hour: number; minute: number; second: number } | null;
  getMinuteOptions(): number[];
  isDateDisabled(year: number, month: number, day: number): boolean;
  isTimeDisabled(hour: number, minute: number): boolean;
  getWeekdays(): string[];
  getAriaDescribedBy(): string | undefined;
}

@customElement('groupenterdatetime--ml-datetime-picker-glass')
export class DatetimePickerGlass extends MlDatetimePickerMolecule {
  private gMsg: MessageType = messages.en;

  private get x(): DatetimePickerInternals {
    return this as unknown as DatetimePickerInternals;
  }

  // --- formatação de exibição (própria, i18n local) ---
  private glassFormatDisplay(value: string | null): string {
    if (!value) return '';
    const parsed = this.x.parseIso(value);
    if (!parsed) return '';
    const date = this.timezone
      ? new Date(Date.UTC(parsed.year, parsed.month - 1, parsed.day, parsed.hour, parsed.minute, parsed.second))
      : new Date(parsed.year, parsed.month - 1, parsed.day, parsed.hour, parsed.minute, parsed.second);
    const formatter = new Intl.DateTimeFormat(this.locale || undefined, {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      timeZone: this.timezone || undefined,
    });
    return formatter.format(date);
  }

  // ===========================================================================
  // CLASSES (glass)
  // ===========================================================================
  private glassTriggerClasses(): string {
    return [
      'glass-dtp-trigger w-full flex items-center justify-between gap-3 px-3 py-2 text-sm',
      this.x.isFocused ? 'is-focused' : '',
      this.error ? 'is-error' : '',
      this.disabled || this.loading ? 'is-disabled' : '',
    ].filter(Boolean).join(' ');
  }
  private glassLabelClasses(): string {
    return ['glass-dtp-label text-sm font-medium', this.disabled ? 'is-disabled' : ''].filter(Boolean).join(' ');
  }
  private glassDayClasses(selected: boolean, disabled: boolean, today: boolean): string {
    return [
      'glass-dtp-day h-8 w-8 text-xs',
      selected ? 'is-selected' : '',
      today && !selected ? 'is-today' : '',
      disabled ? 'is-disabled' : '',
    ].filter(Boolean).join(' ');
  }
  private glassTimeClasses(selected: boolean, disabled: boolean): string {
    return [
      'glass-dtp-time w-full px-2 py-1 text-xs text-left',
      selected ? 'is-selected' : '',
      disabled ? 'is-disabled' : '',
    ].filter(Boolean).join(' ');
  }

  // ===========================================================================
  // RENDER HELPERS (glass)
  // ===========================================================================
  private glassLabel(): TemplateResult {
    if (!this.hasSlot('Label')) return html``;
    return html`
      <label id=${this.x.labelId} class=${this.glassLabelClasses()}>
        ${unsafeHTML(this.getSlotContent('Label'))}
        ${this.required ? html`<span class="glass-dtp-req ml-1">*</span>` : nothing}
      </label>
    `;
  }
  private glassHiddenInput(): TemplateResult {
    if (!this.name) return html``;
    return html`<input type="hidden" name=${this.name} .value=${this.value || ''} />`;
  }
  private glassHelperOrError(): TemplateResult {
    if (!this.isEditing) return html``;
    if (this.error) {
      return html`<p id=${this.x.errorId} class="glass-error-text mt-1 text-xs">${unsafeHTML(String(this.error))}</p>`;
    }
    if (this.hasSlot('Helper')) {
      return html`<p id=${this.x.helperId} class="glass-helper mt-1 text-xs">${unsafeHTML(this.getSlotContent('Helper'))}</p>`;
    }
    return html``;
  }
  private glassTrigger(): TemplateResult {
    const x = this.x;
    const placeholder = this.placeholder || this.gMsg.placeholder;
    const display = this.glassFormatDisplay(this.value);
    const text = display || placeholder;
    return html`
      <button
        class=${this.glassTriggerClasses()}
        type="button"
        aria-labelledby=${ifDefined(this.hasSlot('Label') ? x.labelId : undefined)}
        aria-describedby=${ifDefined(x.getAriaDescribedBy())}
        aria-invalid=${this.error ? 'true' : 'false'}
        aria-required=${this.required ? 'true' : 'false'}
        aria-label=${text}
        @focus=${() => x.handleFocus()}
        @blur=${() => x.handleBlur()}
        @click=${() => x.handleTriggerClick()}
        ?disabled=${this.disabled || this.loading}
      >
        <span class="glass-dtp-value flex-1 text-left truncate ${this.value ? 'has-value' : ''}">${text}</span>
        <span class="glass-dtp-icon flex items-center gap-2">
          ${this.loading
            ? html`<span class="glass-dtp-spinner h-4 w-4 animate-spin rounded-full"></span>`
            : html`
                <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  ${svg`<rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>`}
                  ${svg`<line x1="16" y1="2" x2="16" y2="6"></line>`}
                  ${svg`<line x1="8" y1="2" x2="8" y2="6"></line>`}
                  ${svg`<line x1="3" y1="10" x2="21" y2="10"></line>`}
                </svg>
                <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  ${svg`<circle cx="12" cy="12" r="9"></circle>`}
                  ${svg`<polyline points="12 7 12 12 15 15"></polyline>`}
                </svg>
              `}
        </span>
      </button>
    `;
  }
  private glassCalendar(): TemplateResult {
    const x = this.x;
    const year = x.currentMonth.getFullYear();
    const month = x.currentMonth.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const cells: TemplateResult[] = [];
    for (let i = 0; i < firstDay; i += 1) {
      cells.push(html`<div></div>`);
    }
    for (let day = 1; day <= daysInMonth; day += 1) {
      const dateStr = `${year}-${x.pad(month + 1)}-${x.pad(day)}`;
      const disabled = x.isDateDisabled(year, month, day);
      const selected = x.selectedDate === dateStr;
      const today = (() => {
        const t = new Date();
        return t.getFullYear() === year && t.getMonth() === month && t.getDate() === day;
      })();
      cells.push(html`
        <button
          class=${this.glassDayClasses(selected, disabled, today)}
          role="gridcell"
          aria-selected=${selected ? 'true' : 'false'}
          aria-disabled=${disabled ? 'true' : 'false'}
          @click=${() => x.handleDaySelect(dateStr, disabled)}
          ?disabled=${disabled}
        >
          ${day}
        </button>
      `);
    }
    const weekdayNames = x.getWeekdays();
    return html`
      <div class="flex items-center justify-between mb-2">
        <button type="button" class="glass-dtp-nav px-2 py-1 text-xs" @click=${() => x.handlePrevMonth()}>‹</button>
        <div class="glass-dtp-month text-sm font-medium">
          ${new Intl.DateTimeFormat(this.locale || undefined, { month: 'long', year: 'numeric' }).format(x.currentMonth)}
        </div>
        <button type="button" class="glass-dtp-nav px-2 py-1 text-xs" @click=${() => x.handleNextMonth()}>›</button>
      </div>
      <div class="grid grid-cols-7 gap-1 mb-2 text-[10px] glass-dtp-weekday">
        ${weekdayNames.map((d) => html`<div class="text-center">${d}</div>`)}
      </div>
      <div class="grid grid-cols-7 gap-1">
        ${cells}
      </div>
    `;
  }
  private glassTime(): TemplateResult {
    const x = this.x;
    const minutes = x.getMinuteOptions();
    return html`
      <div class="grid grid-cols-2 gap-3">
        <div class="flex flex-col gap-1 max-h-40 overflow-auto">
          ${Array.from({ length: 24 }).map((_, hour) => {
            const disabled = x.isTimeDisabled(hour, x.selectedMinute ?? 0) || !x.selectedDate;
            const selected = x.selectedHour === hour;
            return html`
              <button class=${this.glassTimeClasses(selected, disabled)} @click=${() => x.handleHourSelect(hour, disabled)} ?disabled=${disabled}>
                ${x.pad(hour)}
              </button>
            `;
          })}
        </div>
        <div class="flex flex-col gap-1 max-h-40 overflow-auto">
          ${minutes.map((minute) => {
            const disabled = x.selectedHour === null || x.isTimeDisabled(x.selectedHour, minute) || !x.selectedDate;
            const selected = x.selectedMinute === minute;
            return html`
              <button class=${this.glassTimeClasses(selected, disabled)} @click=${() => x.handleMinuteSelect(minute, disabled)} ?disabled=${disabled}>
                ${x.pad(minute)}
              </button>
            `;
          })}
        </div>
      </div>
    `;
  }
  private glassPanel(): TemplateResult {
    const x = this.x;
    if (!x.isOpen) return html``;
    return html`
      <div class="glass-dtp-panel absolute z-20 mt-2 w-full p-4" role="dialog" aria-modal="true">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>${this.glassCalendar()}</div>
          <div>${this.glassTime()}</div>
        </div>
        <div class="mt-4 flex items-center justify-end gap-2">
          <button type="button" class="glass-dtp-clear px-3 py-1 text-xs" @click=${() => x.handleClear()}>${this.gMsg.clear}</button>
          <button type="button" class="glass-dtp-confirm px-3 py-1 text-xs" @click=${() => x.handleConfirm()}>${this.gMsg.confirm}</button>
        </div>
      </div>
    `;
  }

  // ===========================================================================
  // RENDER (override) — lógica/estado herdados via this.x
  // ===========================================================================
  render() {
    const lang = this.getMessageKey(messages);
    this.gMsg = messages[lang];
    if (!this.isEditing) {
      const display = this.glassFormatDisplay(this.value) || this.gMsg.empty;
      return html`
        <div class="flex flex-col gap-1">
          ${this.glassHiddenInput()}
          ${this.glassLabel()}
          <div class="glass-dtp-view text-sm">${display}</div>
        </div>
      `;
    }
    return html`
      <div class="relative flex flex-col gap-1">
        ${this.glassHiddenInput()}
        ${this.glassLabel()}
        ${this.glassTrigger()}
        ${this.glassPanel()}
        ${this.glassHelperOrError()}
      </div>
    `;
  }
}
