// Vantern's Site
// Copyright(C) 2026 Vantern
// SPDX-License-Identifier: AGPL-3.0-or-later

import { useEffect, useState } from 'react';
import { CheckIcon, CopyIcon } from 'lucide-react';
import { focusRing } from '~/a11y';

const iconMorph = 'transition-[opacity,scale,filter] duration-200 ease-out motion-reduce:transition-none';
const iconHidden = 'scale-50 opacity-0 blur-[2px]';

export function CodeBlock({ code }: { code: string }) {
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        if (!copied) return;
        const timeout = setTimeout(() => setCopied(false), 1600);
        return () => clearTimeout(timeout);
    }, [copied]);

    const copy = async () => {
        try {
            await navigator.clipboard.writeText(code);
            setCopied(true);
        } catch {}
    };

    return (
        <div className="relative">
            <pre className="overflow-x-auto rounded-2xl bg-vantern-950 p-5 pr-16 font-mono text-code text-vantern-100">{code}</pre>
            <button
                type="button"
                onClick={copy}
                aria-label="Copy code"
                className={`absolute right-3 top-3 cursor-pointer rounded-lg p-2 text-vantern-300 transition-colors hover:text-white ${focusRing}`}
            >
                <span className="grid *:col-start-1 *:row-start-1">
                    <CopyIcon aria-hidden="true" className={`size-4 ${iconMorph} ${copied ? iconHidden : ''}`} />
                    <CheckIcon aria-hidden="true" className={`size-4 ${iconMorph} ${copied ? '' : iconHidden}`} />
                </span>
                <span className="sr-only" aria-live="polite">{copied ? 'Copied' : ''}</span>
            </button>
        </div>
    );
}
