/// <mls fileReference="_102055_/l2/molecules/groupselectone/ml-radio-group-glass.ts" enhancement="_102020_/l2/enhancementAura"/>
// =============================================================================
// RADIO GROUP — GLASSMORPHISM (mls-102055)
// =============================================================================
// Casca (estratégia D): herda tudo de MlRadioGroupMolecule (mls-102040), inclusive render() — o markup base emite classes semânticas ml-*;
// a aparência glass vem do .less irmão, escopado sob esta tag.
// This molecule does NOT contain business logic.
import { customElement } from 'lit/decorators.js';
import { MlRadioGroupMolecule } from '/_102040_/l2/molecules/groupselectone/ml-radio-group.js';

@customElement('groupselectone--ml-radio-group-glass')
export class MlRadioGroupGlass extends MlRadioGroupMolecule {}
