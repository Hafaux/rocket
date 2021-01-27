import gsap from 'gsap';
import { MotionPathPlugin } from 'gsap/all';
import config from '../../config';

export default class Animation {
  constructor() {
    this._rocketElement = document.querySelector('.rocket');
    this._backgroundElement = document.querySelector('.background');
    this._svgPath = config.svgPath;
    this._rocketTween = null;
  }

  animate() {
    const path = document.createElement('path');

    path.setAttribute('d', this._svgPath);

    this._rocketTween = gsap.to(this._rocketElement, {
      motionPath: {
        path,
        autoRotate: true,
      },
      duration: 5,
      ease: 'power1.in',
    });
  }

  stopAnimating() {
    this._rocketTween.kill();
    this._rocketTween = null;
  }

  start() {
    gsap.registerPlugin(MotionPathPlugin);

    this.animate();

    this._backgroundElement.addEventListener('click', () => {
      if (this._rocketTween) this.stopAnimating();
      else this.animate();
    });
  }
}
