/// <mls fileReference="_102055_/l2/molecules/groupnavigatesteps/ml-horizontal-stepper-glass.ts" enhancement="_102020_/l2/enhancementAura"/>
// =============================================================================
// HORIZONTAL STEPPER — GLASSMORPHISM (mls-102055)
// =============================================================================
// Casca (estratégia D): herda tudo de MlHorizontalStepperMolecule (mls-102040), inclusive render() — o markup base emite classes semânticas ml-*;
// a aparência glass vem do .less irmão, escopado sob esta tag.
// This molecule does NOT contain business logic.
import { customElement } from 'lit/decorators.js';
import { MlHorizontalStepperMolecule } from '/_102040_/l2/molecules/groupnavigatesteps/ml-horizontal-stepper.js';

@customElement('groupnavigatesteps--ml-horizontal-stepper-glass')
export class MlHorizontalStepperGlass extends MlHorizontalStepperMolecule {}
