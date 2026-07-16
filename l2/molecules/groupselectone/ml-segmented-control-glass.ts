/// <mls fileReference="_102055_/l2/molecules/groupselectone/ml-segmented-control-glass.ts" enhancement="_102020_/l2/enhancementAura"/>
// =============================================================================
// SEGMENTED CONTROL — GLASSMORPHISM (mls-102055)
// =============================================================================
// Casca (estratégia D): herda tudo de SegmentedControlMolecule (mls-102040), inclusive render() — o markup base emite classes semânticas ml-*;
// a aparência glass vem do .less irmão, escopado sob esta tag.
// This molecule does NOT contain business logic.
import { customElement } from 'lit/decorators.js';
import { SegmentedControlMolecule } from '/_102040_/l2/molecules/groupselectone/ml-segmented-control.js';

@customElement('groupselectone--ml-segmented-control-glass')
export class SegmentedControlGlass extends SegmentedControlMolecule {}
