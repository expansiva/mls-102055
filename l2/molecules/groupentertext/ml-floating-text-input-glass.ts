/// <mls fileReference="_102055_/l2/molecules/groupentertext/ml-floating-text-input-glass.ts" enhancement="_102020_/l2/enhancementAura"/>
// =============================================================================
// ML FLOATING TEXT INPUT — GLASSMORPHISM (mls-102055, Strategy D shell)
// =============================================================================
// Skill Group: groupEnterText
// Herda tudo de MlFloatingTextInputMolecule (mls-102040). O render() herdado
// emite as classes semânticas ml-*; toda a aparência vive no .less.
// This molecule does NOT contain business logic.
import { customElement } from 'lit/decorators.js';
import { MlFloatingTextInputMolecule } from '/_102040_/l2/molecules/groupentertext/ml-floating-text-input.js';

@customElement('groupentertext--ml-floating-text-input-glass')
export class MlFloatingTextInputGlass extends MlFloatingTextInputMolecule {}
