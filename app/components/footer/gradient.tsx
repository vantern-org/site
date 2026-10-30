// Vantern's Site
// Copyright(C) 2026 Vantern
// SPDX-License-Identifier: AGPL-3.0-or-later
//
// NOTE
// this has been adapted from the ruixen gradient footer by ruixen ui, https://21st.dev/@ruixen.ui/library/ruixen-ui
// gradient design inspired by dia browser, https://www.diabrowser.com
// the original is under the following license:
//
// MIT License
//
// Copyright (c) 2025 Ruixen UI
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.

import { useEffect, useId, useRef } from 'react';

const stops = [
    { offset: 0, color: 'var(--color-vantern-950)', opacity: 1 },
    { offset: 0.18, color: 'var(--color-vantern-600)', opacity: 1 },
    { offset: 0.28, color: 'var(--color-vantern-500)', opacity: 1 },
    { offset: 0.41, color: 'var(--color-vantern-100)', opacity: 1 },
    { offset: 0.59, color: 'var(--color-vantern-300)', opacity: 1 },
    { offset: 0.68, color: 'var(--color-vantern-400)', opacity: 1 },
    { offset: 0.8, color: 'var(--color-vantern-700)', opacity: 1 },
    { offset: 1, color: 'var(--color-vantern-900)', opacity: 0 },
];

const columnWidth = 1271 / 9;
const columnHeights = Array.from({ length: 9 }, (_, i) => {
    const t = Math.abs(i - 4) / 4;
    return 0.98 * 599 * (0.55 + 0.45 * (1 - t ** 1.24));
});

export function Gradient() {
    const id = useId().replace(/[^\w-]/g, '');
    const bandRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const band = bandRef.current;
        const svg = band?.querySelector('svg');
        if (!band || !svg) return;
        const measure = () => {
            const h = band.offsetHeight || 1;
            const left = document.documentElement.scrollHeight - window.innerHeight - window.scrollY;
            svg.style.height = `${Math.max(0, Math.min(1, (h - left) / h)) * 100}%`;
        };
        measure();
        window.addEventListener('scroll', measure, { passive: true });
        window.addEventListener('resize', measure, { passive: true });
        return () => {
            window.removeEventListener('scroll', measure);
            window.removeEventListener('resize', measure);
        };
    }, []);

    return (
        <div ref={bandRef} className="pointer-events-none fixed inset-x-0 bottom-0 h-(--footer-gradient)" aria-hidden="true">
            <svg className="absolute bottom-0 left-0 block h-0 w-full" viewBox="0 0 1271 599" preserveAspectRatio="none" fill="none">
                <defs>
                    <linearGradient id={`grad-${id}`} x1="0" y1="1" x2="0" y2="0">
                        {stops.map(({ offset, color, opacity }) => (
                            <stop key={offset} offset={offset} style={{ stopColor: color, stopOpacity: opacity }} />
                        ))}
                    </linearGradient>
                    <filter id={`blur-${id}`} x="-50%" y="-50%" width="200%" height="200%">
                        <feGaussianBlur stdDeviation={15} />
                    </filter>
                </defs>
                {columnHeights.map((h, i) => (
                    <rect
                        key={i}
                        x={i * columnWidth}
                        y={599 - h}
                        width={columnWidth * 1.23}
                        height={h}
                        fill={`url(#grad-${id})`}
                        filter={`url(#blur-${id})`}
                    />
                ))}
            </svg>
        </div>
    );
}
