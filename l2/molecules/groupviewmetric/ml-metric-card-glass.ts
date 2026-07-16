/// <mls fileReference="_102055_/l2/molecules/groupviewmetric/ml-metric-card-glass.ts" enhancement="_102020_/l2/enhancementAura"/>
// =============================================================================
// METRIC CARD — GLASSMORPHISM (mls-102055)
// =============================================================================
// Casca (estratégia D): herda tudo de MetricCardMolecule (mls-102040), inclusive render() — o markup base emite classes semânticas ml-*;
// a aparência glass vem do .less irmão, escopado sob esta tag.
// This molecule does NOT contain business logic.
import { customElement } from 'lit/decorators.js';
import { MetricCardMolecule } from '/_102040_/l2/molecules/groupviewmetric/ml-metric-card.js';

@customElement('groupviewmetric--ml-metric-card-glass')
export class MetricCardGlass extends MetricCardMolecule {}
