/// <mls fileReference="_102055_/l2/molecules/grouptriggeraction/ml-split-button-glass.ts" enhancement="_102020_/l2/enhancementAura"/>
// =============================================================================
// SPLIT BUTTON — GLASSMORPHISM (mls-102055)
// =============================================================================
// Casca (estratégia D): herda tudo de MlSplitButtonMolecule (mls-102040), inclusive render() — o markup base emite classes semânticas ml-*;
// a aparência glass vem do .less irmão, escopado sob esta tag.
// This molecule does NOT contain business logic.
import { customElement } from 'lit/decorators.js';
import { MlSplitButtonMolecule } from '/_102040_/l2/molecules/grouptriggeraction/ml-split-button.js';

@customElement('grouptriggeraction--ml-split-button-glass')
export class MlSplitButtonGlass extends MlSplitButtonMolecule {}
