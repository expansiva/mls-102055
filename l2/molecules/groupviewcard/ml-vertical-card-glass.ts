/// <mls fileReference="_102055_/l2/molecules/groupviewcard/ml-vertical-card-glass.ts" enhancement="_102020_/l2/enhancementAura"/>
// =============================================================================
// VERTICAL CARD — GLASSMORPHISM (mls-102055)
// =============================================================================
// Casca (estratégia D): herda tudo de MlVerticalCardMolecule (mls-102040), inclusive render() — o markup base emite classes semânticas ml-*;
// a aparência glass vem do .less irmão, escopado sob esta tag.
// This molecule does NOT contain business logic.
import { customElement } from 'lit/decorators.js';
import { MlVerticalCardMolecule } from '/_102040_/l2/molecules/groupviewcard/ml-vertical-card.js';

@customElement('groupviewcard--ml-vertical-card-glass')
export class MlVerticalCardGlass extends MlVerticalCardMolecule {}
