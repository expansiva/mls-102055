/// <mls fileReference="_102055_/l2/molecules/groupenternumber/ml-number-stepper-glass.ts" enhancement="_102020_/l2/enhancementAura"/>
// =============================================================================
// NUMBER STEPPER — GLASSMORPHISM (mls-102055, Strategy D)
// =============================================================================
// Shell subclass: no render() override. The inherited render() emits semantic
// ml-* classes; all glass appearance lives in ml-number-stepper-glass.less.
import { customElement } from 'lit/decorators.js';
import { NumberStepperMolecule } from '/_102040_/l2/molecules/groupenternumber/ml-number-stepper.js';

@customElement('groupenternumber--ml-number-stepper-glass')
export class NumberStepperGlass extends NumberStepperMolecule {}
