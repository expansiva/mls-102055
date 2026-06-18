/// <mls fileReference="_102055_/l2/molecules/groupenterdate/ml-date-picker-glass.ts" enhancement="_102020_/l2/enhancementAura" />
// =============================================================================
// DATE PICKER — GLASSMORPHISM por HERANÇA (mls-102055)
// =============================================================================
// Skill Group: enter + date
// Herda toda a lógica de MlDatePickerMolecule (mls-102040): date math, navegação
// de mês, range min/max, seleção de dia, outside-click e estado reativo
// (isOpen/viewYear/viewMonth). Sobrescreve apenas render()/calendário com classes
// glass. A formatação de exibição é refeita localmente (i18n próprio) para não
// depender do `msg` privado do pai (que só é populado no render() original).
// This molecule does NOT contain business logic.
import { html, svg, TemplateResult, nothing } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { customElement } from 'lit/decorators.js';
// Importar registra a tag do pai (groupenterdate--ml-date-picker); inofensivo: usamos a tag -glass.
import { MlDatePickerMolecule } from '/_102040_/l2/molecules/groupenterdate/ml-date-picker.js';

/// **collab_i18n_start**
const message_en = { placeholder: 'Select a date', clear: 'Clear', loading: 'Loading...', emptyView: '—' };
type MessageType = typeof message_en;
const messages: Record<string, MessageType> = {
  en: message_en,
  pt: { placeholder: 'Selecione uma data', clear: 'Limpar', loading: 'Carregando...', emptyView: '—' },
};
/// **collab_i18n_end**

// Membros private (TS) do pai usados pelo render() glass. Em runtime existem no
// prototype/instância (private de TS é apagado); o cast preserva o tipo.
interface DatePickerInternals {
  // estado reativo (@state private no pai)
  isOpen: boolean;
  viewYear: number;
  viewMonth: number;
  // handlers
  handleToggleOpen(): void;
  handleFocus(): void;
  handleBlur(): void;
  handlePrevMonth(): void;
  handleNextMonth(): void;
  handleSelectDay(day: number): void;
  handleClear(): void;
  // helpers puros (date math / range)
  parseIsoDate(value: string | null | undefined): { year: number; month: number; day: number } | null;
  toIsoDate(year: number, month: number, day: number): string;
  toDateKey(year: number, month: number, day: number): number;
  getWeekdayLabels(): string[];
  getDaysInMonth(year: number, month: number): number;
  isDateDisabled(iso: string): boolean;
  canNavigatePrev(): boolean;
  canNavigateNext(): boolean;
  getISOWeekNumber(date: Date): number;
}

@customElement('groupenterdate--ml-date-picker-glass')
export class MlDatePickerGlass extends MlDatePickerMolecule {
  private gMsg: MessageType = messages.en;
  private gFieldId = `dp-glass-${Math.random().toString(36).slice(2)}`;

  private get x(): DatePickerInternals {
    return this as unknown as DatePickerInternals;
  }

  // --- formatação de exibição (própria, i18n local) ---
  private fmtDate(value: string | null): string {
    if (!value) return '';
    const p = this.x.parseIsoDate(value);
    if (!p) return '';
    try {
      return new Intl.DateTimeFormat(this.locale || 'en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        timeZone: 'UTC',
      }).format(new Date(Date.UTC(p.year, p.month, p.day)));
    } catch {
      return value;
    }
  }

  private getTriggerText(): string {
    return this.value ? this.fmtDate(this.value) : this.placeholder || this.gMsg.placeholder;
  }

  // ===========================================================================
  // CLASSES (glass)
  // ===========================================================================
  private glassTriggerClasses(hasError: boolean): string {
    return [
      'glass-dp-trigger w-full px-3 py-2 text-sm flex items-center justify-between gap-2',
      hasError ? 'is-error' : '',
      this.disabled ? 'is-disabled' : '',
      this.readonly ? 'is-readonly' : '',
    ].filter(Boolean).join(' ');
  }

  private glassDayClasses(isToday: boolean, isSelected: boolean, disabled: boolean): string {
    return [
      'glass-dp-day w-9 h-9 text-sm flex items-center justify-center',
      isSelected ? 'is-selected' : '',
      isToday && !isSelected ? 'is-today' : '',
      disabled ? 'is-disabled' : '',
    ].filter(Boolean).join(' ');
  }

  // ===========================================================================
  // RENDER HELPERS (glass)
  // ===========================================================================
  private glassLabel(): TemplateResult {
    if (!this.hasSlot('Label')) return html``;
    return html`
      <label id=${`${this.gFieldId}-label`} class="glass-dp-label mb-1 block text-sm">
        ${unsafeHTML(this.getSlotContent('Label'))}
        ${this.required ? html`<span class="glass-dp-req"> *</span>` : html``}
      </label>
    `;
  }

  private glassHelperOrError(): TemplateResult {
    if (!this.isEditing) return html``;
    if (this.error) {
      return html`<p id=${`${this.gFieldId}-error`} class="glass-error-text mt-1 text-xs">${unsafeHTML(this.error)}</p>`;
    }
    if (this.hasSlot('Helper')) {
      return html`<p id=${`${this.gFieldId}-helper`} class="glass-helper mt-1 text-xs">${unsafeHTML(this.getSlotContent('Helper'))}</p>`;
    }
    return html``;
  }

  private glassCalendar(): TemplateResult {
    const x = this.x;
    if (!x.isOpen || this.loading || !this.isEditing) return html``;

    const viewYear = x.viewYear;
    const viewMonth = x.viewMonth;
    const daysInMonth = x.getDaysInMonth(viewYear, viewMonth);
    const firstDay = new Date(Date.UTC(viewYear, viewMonth, 1)).getUTCDay();
    const offset = (firstDay - (this.firstDayOfWeek % 7) + 7) % 7;
    const totalCells = Math.ceil((offset + daysInMonth) / 7) * 7;
    const weekdayLabels = x.getWeekdayLabels();
    const today = new Date();
    const todayKey = x.toDateKey(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate());
    const selectedParsed = x.parseIsoDate(this.value);
    const selectedKey = selectedParsed ? x.toDateKey(selectedParsed.year, selectedParsed.month, selectedParsed.day) : null;

    const weeks: Array<Array<number | null>> = [];
    let currentDay = 1;
    for (let i = 0; i < totalCells; i++) {
      const rowIndex = Math.floor(i / 7);
      if (!weeks[rowIndex]) weeks[rowIndex] = [];
      if (i < offset || currentDay > daysInMonth) {
        weeks[rowIndex].push(null);
      } else {
        weeks[rowIndex].push(currentDay);
        currentDay++;
      }
    }

    return html`
      <div class="glass-dp-panel absolute z-20 mt-2 w-full p-3">
        <div class="flex items-center justify-between mb-2">
          <button
            class="glass-dp-nav p-2 ${x.canNavigatePrev() ? '' : 'is-disabled'}"
            ?disabled=${!x.canNavigatePrev()}
            @click=${() => x.handlePrevMonth()}
            aria-label="Previous month"
          >
            ${svg`<svg viewBox="0 0 20 20" fill="currentColor" class="w-4 h-4"><path d="M12.7 15.3a1 1 0 0 1-1.4 0l-5-5a1 1 0 0 1 0-1.4l5-5a1 1 0 0 1 1.4 1.4L8.4 9l4.3 4.3a1 1 0 0 1 0 1.4z"></path></svg>`}
          </button>
          <div class="glass-dp-month text-sm" aria-live="polite">
            ${new Intl.DateTimeFormat(this.locale || 'en-US', { month: 'long', year: 'numeric', timeZone: 'UTC' }).format(new Date(Date.UTC(viewYear, viewMonth, 1)))}
          </div>
          <button
            class="glass-dp-nav p-2 ${x.canNavigateNext() ? '' : 'is-disabled'}"
            ?disabled=${!x.canNavigateNext()}
            @click=${() => x.handleNextMonth()}
            aria-label="Next month"
          >
            ${svg`<svg viewBox="0 0 20 20" fill="currentColor" class="w-4 h-4"><path d="M7.3 4.7a1 1 0 0 1 1.4 0l5 5a1 1 0 0 1 0 1.4l-5 5a1 1 0 1 1-1.4-1.4L11.6 10 7.3 5.7a1 1 0 0 1 0-1.4z"></path></svg>`}
          </button>
        </div>
        <div class="grid grid-cols-7 gap-1 mb-1 text-xs glass-dp-weekday">
          ${weekdayLabels.map((label) => html`<div class="text-center">${label}</div>`)}
        </div>
        <div class="grid grid-cols-${this.showWeekNumbers ? '8' : '7'} gap-1" role="grid">
          ${weeks.map((week, rowIndex) => {
            const weekDayIndex = Math.max(1, rowIndex * 7 - offset + 1);
            const weekDate = new Date(Date.UTC(viewYear, viewMonth, weekDayIndex));
            const weekNumber = x.getISOWeekNumber(weekDate);
            return html`
              ${this.showWeekNumbers ? html`<div class="glass-dp-weeknum w-9 h-9 text-xs flex items-center justify-center">${weekNumber}</div>` : html``}
              ${week.map((day) => {
                if (!day) return html`<div class="w-9 h-9"></div>`;
                const iso = x.toIsoDate(viewYear, viewMonth, day);
                const parsed = x.parseIsoDate(iso);
                const key = parsed ? x.toDateKey(parsed.year, parsed.month, parsed.day) : 0;
                const isToday = key === todayKey;
                const isSelected = selectedKey !== null && key === selectedKey;
                const disabled = x.isDateDisabled(iso);
                return html`
                  <button
                    class=${this.glassDayClasses(isToday, isSelected, disabled)}
                    ?disabled=${disabled}
                    role="gridcell"
                    aria-selected=${isSelected}
                    aria-disabled=${disabled}
                    @click=${() => x.handleSelectDay(day)}
                  >
                    ${day}
                  </button>
                `;
              })}
            `;
          })}
        </div>
        <div class="mt-2 flex justify-end">
          <button
            class="glass-dp-clear text-xs"
            @click=${() => x.handleClear()}
            ?disabled=${this.disabled || this.readonly || this.loading}
          >
            ${this.gMsg.clear}
          </button>
        </div>
      </div>
    `;
  }

  // ===========================================================================
  // RENDER (override) — lógica herdada via this.x
  // ===========================================================================
  render() {
    const lang = this.getMessageKey(messages);
    this.gMsg = messages[lang];
    const x = this.x;

    if (!this.isEditing) {
      const display = this.value ? this.fmtDate(this.value) : this.gMsg.emptyView;
      return html`
        <div class="w-full">
          ${this.glassLabel()}
          <p class="glass-dp-view text-sm">${display}</p>
        </div>
      `;
    }

    const hasError = !!this.error;
    const labelId = this.hasSlot('Label') ? `${this.gFieldId}-label` : '';
    const describedBy = this.error ? `${this.gFieldId}-error` : this.hasSlot('Helper') ? `${this.gFieldId}-helper` : '';

    return html`
      <div class="relative w-full">
        ${this.glassLabel()}
        <input type="hidden" name=${this.name} .value=${this.value || ''} />
        <button
          id=${this.gFieldId}
          class=${this.glassTriggerClasses(hasError)}
          @click=${() => x.handleToggleOpen()}
          @focus=${() => x.handleFocus()}
          @blur=${() => x.handleBlur()}
          aria-haspopup="dialog"
          aria-expanded=${x.isOpen}
          aria-labelledby=${labelId || nothing}
          aria-describedby=${describedBy || nothing}
          aria-invalid=${hasError ? 'true' : 'false'}
          aria-required=${this.required ? 'true' : 'false'}
          ?disabled=${this.disabled}
        >
          <span class="glass-dp-value ${this.value ? 'has-value' : ''}">${this.getTriggerText()}</span>
          <span class="glass-dp-icon">
            ${svg`<svg viewBox="0 0 20 20" fill="currentColor" class="w-4 h-4"><path d="M6 2a1 1 0 0 1 1 1v1h6V3a1 1 0 1 1 2 0v1h1a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h1V3a1 1 0 0 1 1-1zm9 7H5v7a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V9z"></path></svg>`}
          </span>
        </button>
        ${this.loading ? html`<div class="glass-dp-loading mt-2 text-xs">${this.gMsg.loading}</div>` : html``}
        ${this.glassCalendar()}
        ${this.glassHelperOrError()}
      </div>
    `;
  }
}
