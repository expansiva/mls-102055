/// <mls fileReference="_102055_/l2/molecules/groupnavigatemain/ml-sidebar-nav-glass.ts" enhancement="_102020_/l2/enhancementAura"/>
// =============================================================================
// SIDEBAR NAV — GLASSMORPHISM (mls-102055)
// =============================================================================
// Casca (estratégia D): herda tudo de MlSidebarNavMolecule (mls-102040), inclusive render() — o markup base emite classes semânticas ml-*;
// a aparência glass vem do .less irmão, escopado sob esta tag.
// This molecule does NOT contain business logic.
import { customElement } from 'lit/decorators.js';
import { MlSidebarNavMolecule } from '/_102040_/l2/molecules/groupnavigatemain/ml-sidebar-nav.js';

@customElement('groupnavigatemain--ml-sidebar-nav-glass')
export class MlSidebarNavGlass extends MlSidebarNavMolecule {}
