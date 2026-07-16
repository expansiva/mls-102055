/// <mls fileReference="_102055_/l2/molecules/groupenterboolean/ml-toggle-switch-glass.ts" enhancement="_102020_/l2/enhancementAura" />
// =============================================================================
// TOGGLE SWITCH — GLASSMORPHISM (mls-102055) — Strategy D shell
// =============================================================================
// Skill Group: groupEnterBoolean
// Herda render() e toda a lógica de ToggleSwitchMolecule (mls-102040).
// Toda a aparência vive no .less escopado na tag -glass.
// This molecule does NOT contain business logic.
import { customElement } from 'lit/decorators.js';
import { ToggleSwitchMolecule } from '/_102040_/l2/molecules/groupenterboolean/ml-toggle-switch.js';

@customElement('groupenterboolean--ml-toggle-switch-glass')
export class ToggleSwitchGlass extends ToggleSwitchMolecule {}
