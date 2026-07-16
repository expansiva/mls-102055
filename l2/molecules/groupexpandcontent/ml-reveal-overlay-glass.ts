/// <mls fileReference="_102055_/l2/molecules/groupexpandcontent/ml-reveal-overlay-glass.ts" enhancement="_102020_/l2/enhancementAura"/>
// =============================================================================
// REVEAL OVERLAY — GLASSMORPHISM (mls-102055)
// =============================================================================
// Casca (estratégia D): herda tudo de RevealOverlayMolecule (mls-102040), inclusive render() — o markup base emite classes semânticas ml-*;
// a aparência glass vem do .less irmão, escopado sob esta tag.
// This molecule does NOT contain business logic.
import { customElement } from 'lit/decorators.js';
import { RevealOverlayMolecule } from '/_102040_/l2/molecules/groupexpandcontent/ml-reveal-overlay.js';

@customElement('groupexpandcontent--ml-reveal-overlay-glass')
export class RevealOverlayGlass extends RevealOverlayMolecule {}
