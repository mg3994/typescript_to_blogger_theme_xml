import { Component } from '../core.js';

declare global {
  namespace JSX {
    interface Element extends Component {}
    interface ElementClass extends Component {}

    interface IntrinsicElements {
      [elemName: string]: any;
    }
  }
}
