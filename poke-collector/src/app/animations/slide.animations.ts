import {animate, AnimationMetadata, sequence, stagger, style} from "@angular/animations";

export const getCSSPropertyValue = (cssProperty: string): string => {
  return getComputedStyle(document.documentElement).getPropertyValue(cssProperty);
};

export const slideFadeAnimationFactory = (): AnimationMetadata[] => {
  return [
    style({opacity: 0, transform: 'translateY(-1.5rem)', scale: 0.8}),
    stagger(getCSSPropertyValue('--pc-motion-duration-stagger-delay'), [
      animate(
        `${getCSSPropertyValue('--pc-motion-duration-medium')} ${getCSSPropertyValue(
          '--pc-motion-easing-decelerating',
        )}`,
        style({opacity: 1, transform: 'translateY(0)', scale: 1}),
      ),
    ]),
  ];
};

export const slideDeleteAnimation = (): AnimationMetadata => {
  return sequence([
    animate(
      `${getCSSPropertyValue('--pc-motion-duration-short')} ${getCSSPropertyValue(
        '--pc-motion-easing-decelerating',
      )}`,
      style({
        transform: `translateY(-80svh)`,
      }),
    ),
    animate(
      `${getCSSPropertyValue('--pc-motion-duration-short')} ease`,
      style({
        transform: 'scale(0)',
        opacity: 0,
      }),
    ),
  ]);
};
