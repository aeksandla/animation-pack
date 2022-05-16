import {FlyingAwayOptionsType} from "../types";

const FLYING_AWAY__OPTIONS = {
  maxOffsetX: 100,
  maxOffsetY: 100,
  transition: '.4s',
}

export class FlyingAway {
  private options: FlyingAwayOptionsType;
  private element: HTMLElement;
  private initialCenter = {x: 0, y: 0};

  constructor(element: HTMLElement, options?: FlyingAwayOptionsType) {
    console.log('FlyingAway constructor');
    this.options = {...FLYING_AWAY__OPTIONS, ...options};
    this.element = element;

    this.element.style.transform = 'translate(0px, 0px)';
    this.element.style.transition = `transform ${this.options.transition} ease-out`;
    document.documentElement.addEventListener('mousemove', this.move);

    const targetCoords = this.element.getBoundingClientRect();
    this.initialCenter = {
      x: targetCoords.left + targetCoords.width / 2,
      y: targetCoords.top + targetCoords.height / 2,
    }
  }

  move = (e: MouseEvent) => {
    const mouseX = e.clientX;
    const mouseY = e.clientY;

    const offsetX = - mouseX + this.initialCenter.x;
    const offsetY = - mouseY + this.initialCenter.y;

    const xTransform = offsetX/Math.abs(offsetX) * Math.min(Math.abs(offsetX), this.options.maxOffsetX);
    const yTransform = offsetY/Math.abs(offsetY) * Math.min(Math.abs(offsetY), this.options.maxOffsetY);

    this.element.style.transform = `translate(${xTransform}px, ${yTransform}px)`;
  }
}
