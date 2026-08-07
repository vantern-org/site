// Vantern's Site
// Copyright(C) 2026 Vantern
// SPDX-License-Identifier: AGPL-3.0-or-later

import { redirect } from "react-router";

export async function loader() {
    throw redirect("/");
}

export default function Splat() {
    return null;
}