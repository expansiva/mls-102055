/// <mls fileReference="_102055_/l2/molecules/groupnavigatesection/ml-breadcrumb-trail-glass.ts" enhancement="_102020_/l2/enhancementAura"/>
// =============================================================================
// BREADCRUMB TRAIL — GLASSMORPHISM (mls-102055)
// =============================================================================
// Casca (estratégia D): herda tudo de BreadcrumbTrailMolecule (mls-102040), inclusive render() — o markup base emite classes semânticas ml-*;
// a aparência glass vem do .less irmão, escopado sob esta tag.
// This molecule does NOT contain business logic.
import { customElement } from 'lit/decorators.js';
import { BreadcrumbTrailMolecule } from '/_102040_/l2/molecules/groupnavigatesection/ml-breadcrumb-trail.js';

@customElement('groupnavigatesection--ml-breadcrumb-trail-glass')
export class BreadcrumbTrailGlass extends BreadcrumbTrailMolecule {}
