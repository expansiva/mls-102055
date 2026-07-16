/// <mls fileReference="_102055_/l2/molecules/groupentertime/ml-clock-time-picker-glass.ts" enhancement="_102020_/l2/enhancementAura"/>
// =============================================================================
// CLOCK TIME PICKER — GLASSMORPHISM (mls-102055)
// =============================================================================
// Skill Group: enter + time
// Casca (estratégia D): herda tudo de ClockTimePickerMolecule (mls-102040),
// inclusive render() — o markup base emite classes semânticas ml-*; a aparência
// glass vem do .less irmão, escopado sob esta tag.
// This molecule does NOT contain business logic.
import { customElement } from 'lit/decorators.js';
import { ClockTimePickerMolecule } from '/_102040_/l2/molecules/groupentertime/ml-clock-time-picker.js';

@customElement('groupentertime--ml-clock-time-picker-glass')
export class ClockTimePickerGlass extends ClockTimePickerMolecule {}
