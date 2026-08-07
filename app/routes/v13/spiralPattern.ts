// Vantern's Site
// Copyright(C) 2026 Vantern
// SPDX-License-Identifier: AGPL-3.0-or-later

import {
  Pattern,
  type CharacterData,
  type PatternContext,
  type PatternOptions,
} from "asciiground";

export interface SpiralPatternOptions extends PatternOptions {
  arms: number;
  twist: number;
  speed: number;
}

export class SpiralPattern extends Pattern<SpiralPatternOptions> {
  static readonly ID = "spiral";

  constructor(options: Partial<SpiralPatternOptions> = {}) {
    super({
      characters: [" ", ".", ":", "-", "=", "+", "*", "#", "%", "@"],
      arms: 3,
      twist: 5,
      speed: 1.1,
      ...options
    });
  }

  update(): Pattern {
    return this;
  }

  generate(context: PatternContext): CharacterData[] {
    const { region, animationTime } = context;
    const { characters, arms, twist, speed } = this._options;

    // calculate center
    const centreX = region.columns / 2;
    const centreY = region.rows / 2;

    // calculate aspect ratio to correct for non-square chars
    const aspect = region.charHeight / region.charWidth;
    const maxRadius = Math.hypot(centreX, centreY * aspect);
    const cells: CharacterData[] = [];

    for (let row = 0; row < region.rows; row++) {
      for (let column = 0; column < region.columns; column++) {
        const dx = column - centreX;
        const dy = (row - centreY) * aspect;
        const radius = Math.hypot(dx, dy);

        const wave = Math.sin(
          arms * Math.atan2(dy, dx) +
            twist * Math.log(radius + 1) -
            animationTime * speed,
        );

        const light = Math.exp(-radius / (maxRadius * 0.42)); // outwards light (starting from center)
        const crest = (wave + 1) / 2;
        const char = characters[Math.round(crest * light * (characters.length - 1))];

        if (char === " ") continue;

        cells.push({
          x: column * region.charSpacingX,
          y: row * region.charSpacingY,
          char,
          opacity: light * (0.2 + crest * 0.8), // 0.2 min opacity multiplier
        });
      }
    }

    return cells;
  }
}
