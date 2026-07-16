/// <mls fileReference="_102055_/l2/molecules/groupnavigatesteps/ml-wizard-steps-glass.ts" enhancement="_102020_/l2/enhancementAura"/>
// =============================================================================
// WIZARD STEPS — GLASSMORPHISM (mls-102055)
// =============================================================================
// Casca (estratégia D): herda tudo de MlWizardStepsMolecule (mls-102040), inclusive render() — o markup base emite classes semânticas ml-*;
// a aparência glass vem do .less irmão, escopado sob esta tag.
// This molecule does NOT contain business logic.
import { customElement } from 'lit/decorators.js';
import { MlWizardStepsMolecule } from '/_102040_/l2/molecules/groupnavigatesteps/ml-wizard-steps.js';

@customElement('groupnavigatesteps--ml-wizard-steps-glass')
export class MlWizardStepsGlass extends MlWizardStepsMolecule {}
