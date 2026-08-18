/// <mls fileReference="_102055_/l2/molecules/groupenternumberinterval/ml-number-range-slider-glass.ts" enhancement="_102020_/l2/enhancementAura"/>
// =============================================================================
// NUMBER RANGE SLIDER — GLASSMORPHISM (mls-102055)
// =============================================================================
// Skill Group: groupEnterNumberInterval
// Shell (Strategy D): inherits everything from MlNumberRangeSliderMolecule (mls-102040),
// including render() — the base markup emits semantic ml-* classes; the appearance
// comes from the sibling .less, scoped under this tag.
// This molecule does NOT contain business logic.
import { customElement } from 'lit/decorators.js';
import { MlNumberRangeSliderMolecule } from '/_102040_/l2/molecules/groupenternumberinterval/ml-number-range-slider.js';

@customElement('groupenternumberinterval--ml-number-range-slider-glass')
export class MlNumberRangeSliderMoleculeGlass extends MlNumberRangeSliderMolecule {}
