/// <mls fileReference="_102055_/l2/molecules/groupnavigatesection/ml-navigate-pills-glass.ts" enhancement="_102020_/l2/enhancementAura"/>
// =============================================================================
// NAVIGATE PILLS — GLASSMORPHISM (mls-102055)
// =============================================================================
// Casca (estratégia D): herda tudo de NavigatePillsMolecule (mls-102040), inclusive render() — o markup base emite classes semânticas ml-*;
// a aparência glass vem do .less irmão, escopado sob esta tag.
// This molecule does NOT contain business logic.
import { customElement } from 'lit/decorators.js';
import { NavigatePillsMolecule } from '/_102040_/l2/molecules/groupnavigatesection/ml-navigate-pills.js';

@customElement('groupnavigatesection--ml-navigate-pills-glass')
export class NavigatePillsGlass extends NavigatePillsMolecule {}
