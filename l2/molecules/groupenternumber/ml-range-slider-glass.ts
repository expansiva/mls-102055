/// <mls fileReference="_102055_/l2/molecules/groupenternumber/ml-range-slider-glass.ts" enhancement="_102020_/l2/enhancementAura"/>
// =============================================================================
// RANGE SLIDER — GLASSMORPHISM (mls-102055, Strategy D shell)
// =============================================================================
// Skill Group: groupEnterNumber
// Herda RangeSliderMolecule (mls-102040) sem sobrescrever render():
// o markup herdado emite classes ml-*; toda a aparência vive no .less.
import { customElement } from 'lit/decorators.js';
import { RangeSliderMolecule } from '/_102040_/l2/molecules/groupenternumber/ml-range-slider.js';

@customElement('groupenternumber--ml-range-slider-glass')
export class RangeSliderGlass extends RangeSliderMolecule {}
