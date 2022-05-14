import {PerspectiveOptionsType} from "../types";

const PERSPECTIVE_OPTIONS = {
  maxRotateX: 10,
  maxRotateY: 10,
  perspective: 1000,
  resetTransition: '.4s',
}

export class Perspective {
  private options: PerspectiveOptionsType;
  private initialTransform;
  private element: HTMLElement;

  constructor(element: HTMLElement, options?: PerspectiveOptionsType) {
    this.options = {...PERSPECTIVE_OPTIONS, ...options};
    this.initialTransform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(0.98, 0.98, 0.98)';
    this.element = element;
    element.addEventListener('mousemove', this.move);
    element.addEventListener('mouseout', this.reset);
  }

  move = (e: MouseEvent) => {
    const targetCoords = this.element.getBoundingClientRect();
    const xCoord = (e.clientX - targetCoords.left - targetCoords.width / 2) / (targetCoords.width / 2);
    const yCoord = (e.clientY - targetCoords.top - targetCoords.height / 2) / (targetCoords.height / 2);
    this.element.style.transform = `perspective(${this.options.perspective}px) rotateX(${yCoord * this.options.maxRotateY}deg) rotateY(${-xCoord * this.options.maxRotateX}deg) scale3d(0.98, 0.98, 0.98)`;
  }

  reset = () => {
    this.element.style.transition = `transform ${this.options.resetTransition}`;
    this.element.style.transform = this.initialTransform;
    setTimeout(() => this.element.style.transition = 'none', 100)
  }
}
