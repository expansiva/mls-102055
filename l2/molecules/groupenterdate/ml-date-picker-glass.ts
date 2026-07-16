/// <mls fileReference="_102055_/l2/molecules/groupenterdate/ml-date-picker-glass.ts" enhancement="_102020_/l2/enhancementAura" />
// =============================================================================
// DATE PICKER — GLASSMORPHISM (mls-102055)
// =============================================================================
// Skill Group: enter + date
// Casca (estratégia D): herda tudo de MlDatePickerMolecule (mls-102040),
// inclusive render() e getPortalTemplate() — o markup base emite classes ml-*;
// a aparência glass vem do .less irmão, escopado sob esta tag e sob o
// data-widget do portal.
// This molecule does NOT contain business logic.
import { customElement } from 'lit/decorators.js';
import { MlDatePickerMolecule } from '/_102040_/l2/molecules/groupenterdate/ml-date-picker.js';

@customElement('groupenterdate--ml-date-picker-glass')
export class MlDatePickerGlass extends MlDatePickerMolecule {
  // O container do portal (document.body) recebe este data-widget — o .less do
  // tema escopa o calendário por div[data-widget="...-glass"].
  protected portalWidgetName = 'groupenterdate--ml-date-picker-glass';
}
