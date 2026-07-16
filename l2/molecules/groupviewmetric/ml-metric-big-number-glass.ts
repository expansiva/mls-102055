/// <mls fileReference="_102055_/l2/molecules/groupviewmetric/ml-metric-big-number-glass.ts" enhancement="_102020_/l2/enhancementAura"/>
// =============================================================================
// METRIC BIG NUMBER — GLASSMORPHISM (mls-102055)
// =============================================================================
// Casca (estratégia D): herda tudo de MlMetricBigNumberMolecule (mls-102040), inclusive render() — o markup base emite classes semânticas ml-*;
// a aparência glass vem do .less irmão, escopado sob esta tag.
// This molecule does NOT contain business logic.
import { customElement } from 'lit/decorators.js';
import { MlMetricBigNumberMolecule } from '/_102040_/l2/molecules/groupviewmetric/ml-metric-big-number.js';

@customElement('groupviewmetric--ml-metric-big-number-glass')
export class MlMetricBigNumberGlass extends MlMetricBigNumberMolecule {}
