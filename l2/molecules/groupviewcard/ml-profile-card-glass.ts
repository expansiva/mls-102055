/// <mls fileReference="_102055_/l2/molecules/groupviewcard/ml-profile-card-glass.ts" enhancement="_102020_/l2/enhancementAura"/>
// =============================================================================
// PROFILE CARD — GLASSMORPHISM (mls-102055)
// =============================================================================
// Casca (estratégia D): herda tudo de MlProfileCardMolecule (mls-102040), inclusive render() — o markup base emite classes semânticas ml-*;
// a aparência glass vem do .less irmão, escopado sob esta tag.
// This molecule does NOT contain business logic.
import { customElement } from 'lit/decorators.js';
import { MlProfileCardMolecule } from '/_102040_/l2/molecules/groupviewcard/ml-profile-card.js';

@customElement('groupviewcard--ml-profile-card-glass')
export class MlProfileCardGlass extends MlProfileCardMolecule {}
