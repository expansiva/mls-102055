/// <mls fileReference="_102055_/l2/molecules/groupshowprogress/ml-circular-progress-glass.ts" enhancement="_102020_/l2/enhancementAura"/>
// =============================================================================
// CIRCULAR PROGRESS — GLASSMORPHISM (mls-102055)
// =============================================================================
// Casca (estratégia D): herda tudo de CircularProgressMolecule (mls-102040), inclusive render() — o markup base emite classes semânticas ml-*;
// a aparência glass vem do .less irmão, escopado sob esta tag.
// This molecule does NOT contain business logic.
import { customElement } from 'lit/decorators.js';
import { CircularProgressMolecule } from '/_102040_/l2/molecules/groupshowprogress/ml-circular-progress.js';

@customElement('groupshowprogress--ml-circular-progress-glass')
export class CircularProgressGlass extends CircularProgressMolecule {}
