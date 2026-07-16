/// <mls fileReference="_102055_/l2/molecules/grouprateitem/ml-emoji-mood-scale-glass.ts" enhancement="_102020_/l2/enhancementAura"/>
// =============================================================================
// EMOJI MOOD SCALE — GLASSMORPHISM (mls-102055)
// =============================================================================
// Casca (estratégia D): herda tudo de EmojiMoodScaleMolecule (mls-102040), inclusive render() — o markup base emite classes semânticas ml-*;
// a aparência glass vem do .less irmão, escopado sob esta tag.
// This molecule does NOT contain business logic.
import { customElement } from 'lit/decorators.js';
import { EmojiMoodScaleMolecule } from '/_102040_/l2/molecules/grouprateitem/ml-emoji-mood-scale.js';

@customElement('grouprateitem--ml-emoji-mood-scale-glass')
export class EmojiMoodScaleGlass extends EmojiMoodScaleMolecule {}
