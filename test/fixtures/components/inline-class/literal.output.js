'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const CalciteButton = class {

  render() {
    (h("calcite-icon", { class: "text-sm p-4", icon: this.icon, scale: iconScale }));
  }

};
CalciteButton.style = `.text-sm { font-size: 0.875rem; line-height: 1.25rem; } \n.p-4 { padding: 1rem; } \n ${calciteButtonStyle}`;

exports.CalciteButton = CalciteButton;
