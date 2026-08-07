// Vantern's Site
// Copyright(C) 2026 Vantern
// SPDX-License-Identifier: AGPL-3.0-or-later

import { isRouteErrorResponse, useNavigate } from "react-router";
import { useEffect } from "react";
import type { Route } from "./+types/home";

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
    const navigate = useNavigate();

    const err404 = isRouteErrorResponse(error) && error.status === 404;

    useEffect(() => {
        if (err404) {
            navigate('/', { replace: true });
        }
    }, [err404, navigate]);

    if (err404) {
        return null;
    }

    let title = 'Something went wrong';
    let message = 'An unexpected error occurred.';

    if (isRouteErrorResponse(error)) {
        title = `${error.status} ${error.statusText}`;
        message = error.data || message;
    } else if (error instanceof Error) {
        message = error.message;
    }

    return (
        <div className="relative flex flex-col h-screen overflow-hidden bg-neutral-100">
            <iframe
                src="data:text/html;base64,PCFET0NUWVBFIGh0bWw+CjxodG1sPgogICAgICAgIDxoZWFkPgogICAgICAgICAgICA8bWV0YSBuYW1lPSJ2aWV3cG9ydCIgY29udGVudD0id2lkdGg9ZGV2aWNlLXdpZHRoLCBpbml0aWFsLXNjYWxlPTEiPgogICAgICAgICAgICA8c3R5bGU+CiAgICAgICAgICAgICAgICBodG1sLCBib2R5ewogICAgICAgICAgICAgICAgICAgIG1hcmdpbjogMDsKICAgICAgICAgICAgICAgICAgICBwYWRkaW5nOiAwOwogICAgICAgICAgICAgICAgICAgIHdpZHRoOiAxMDAlOwogICAgICAgICAgICAgICAgICAgIGhlaWdodDogMTAwJTsKICAgICAgICAgICAgICAgICAgICBib3JkZXI6IDA7CiAgICAgICAgICAgICAgICB9CiAgICAgICAgICAgIDwvc3R5bGU+CiAgICAgICAgICAgIDxzY3JpcHQgc3JjPSJodHRwczovL3VucGtnLmNvbS9tZWRpYS1zaGFkZXJAbGF0ZXN0L21lZGlhLXNoYWRlci5qcyI+PC9zY3JpcHQ+CiAgICA8bWVkaWEtc2hhZGVyCiAgICAgICAgd2lkdGg9IjI1NjBweCIgCiAgICAgICAgaGVpZ2h0PSIxNDQwcHgiCiAgICAgICAgZnJhZ21lbnQtc2hhZGVyPScjdmVyc2lvbiAzMDAgZXMKICAgIHByZWNpc2lvbiBoaWdocCBmbG9hdDsKICAgIG91dCB2ZWM0IGdsRnJhZ0NvbG9yOwp1bmlmb3JtIHZlYzIgdV9yZXNvbHV0aW9uOwp1bmlmb3JtIHZlYzIgdV9tb3VzZTsKdW5pZm9ybSBmbG9hdCB1X3RpbWU7CnVuaWZvcm0gdmVjMyB1X2NvbG9yOwp1bmlmb3JtIGZsb2F0IHVfc2NhbGU7IAp1bmlmb3JtIGZsb2F0IHVfc3BlZWQ7IAp2b2lkIG1haW4oKSB7CiAgdmVjMiBzdCA9IGdsX0ZyYWdDb29yZC54eS91X3Jlc29sdXRpb24ueHk7CiAgZmxvYXQgbXIgPSBtaW4odV9yZXNvbHV0aW9uLngsIHVfcmVzb2x1dGlvbi55KTsKICB2ZWMyIHV2ID0gKHN0Lnh5ICogMi4wIC0gMS4wKSAqIHVfcmVzb2x1dGlvbi54eSAvIG1yOwogIHV2ICo9ICgxLjAtdV9zY2FsZSkgKiAyLjsKICBmbG9hdCBkID0gLXVfdGltZSAqIDAuNSAqIHVfc3BlZWQ7CiAgZmxvYXQgYSA9IDAuMDsKICBmb3IgKGZsb2F0IGkgPSAwLjA7IGkgPCA4LjA7ICsraSkgewogICAgYSArPSBjb3MoaSAtIGQgLSBhICogdXYueCk7CiAgICBkICs9IHNpbih1di55ICogaSArIGEpOwogIH0KICBkICs9IHVfdGltZSAqIDAuNSAqIHVfc3BlZWQ7CiAgdmVjMyBjb2wgPSB2ZWMzKGNvcyh1diAqIHZlYzIoZCwgYSkpICogMC42ICsgMC40LCBjb3MoYSArIGQpICogMC41ICsgMC41KTsKICBjb2wgPSBjb3MoY29sICogY29zKHZlYzMoZCwgYSwgMi41KSkgKiAwLjUgKyAwLjUpICogdV9jb2xvcjsKICBnbEZyYWdDb2xvciA9IHZlYzQoY29sLCAxLjApOwp9JwogICAgICAgIHVuaWZvcm1zPSd7InVfY29sb3IiOlsxLDEsMV0sInVfc2NhbGUiOjAuNSwidV9zcGVlZCI6MX0nPgogICAgPC9tZWRpYS1zaGFkZXI+CiAgICAgICAgPC9oZWFkPgogICAgICAgIDxib2R5PjwvYm9keT4KICAgICAgICA8L2h0bWw+"
                className="absolute inset-0 w-full h-full pointer-events-none"
                style={{ border: 0 }}
            />
            <div className="relative z-10 flex flex-col items-center justify-center h-full gap-4">
                <h1 className="text-black text-5xl font-bold mb-4">{title}</h1>
                <h2 className="text-black text-lg opacity-80 mb-8">{message}</h2>
            </div>
        </div>
    );
}