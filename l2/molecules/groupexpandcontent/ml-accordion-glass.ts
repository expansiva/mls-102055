/// <mls fileReference="_102055_/l2/molecules/groupexpandcontent/ml-accordion-glass.ts" enhancement="_102020_/l2/enhancementAura"/>
// =============================================================================
// ACCORDION — GLASSMORPHISM (mls-102055)
// =============================================================================
// Casca (estratégia D): herda tudo de MlAccordionMolecule (mls-102040), inclusive render() — o markup base emite classes semânticas ml-*;
// a aparência glass vem do .less irmão, escopado sob esta tag.
// This molecule does NOT contain business logic.
import { customElement } from 'lit/decorators.js';
import { MlAccordionMolecule } from '/_102040_/l2/molecules/groupexpandcontent/ml-accordion.js';

@customElement('groupexpandcontent--ml-accordion-glass')
export class MlAccordionGlass extends MlAccordionMolecule {}
