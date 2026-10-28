// Vantern's Site
// Copyright(C) 2026 Vantern
// SPDX-License-Identifier: AGPL-3.0-or-later

import { type RouteConfig, index, route, prefix } from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    ...prefix("bot", [
        route("*", "routes/redirect.tsx", { id: "redirect-bot" }),
    ]),
    ...prefix("feedback", [
        route("questbot", "routes/feedback/QuestBotFeedback.tsx"),
        route("deletion", "routes/feedback/DeletionSurvey.tsx"),
    ]),
    ...prefix("github", [
        route("*", "routes/redirect.tsx", { id: "redirect-github-wildcard" }),
    ]),
    route("github", "routes/redirect.tsx", { id: "redirect-github" }),
    route("sponsors", "routes/sponsors/sponsors.tsx"),
    route("brand", "routes/brand/brand.tsx"),
    route("discord", "routes/redirect.tsx", { id: "redirect-discord" }),
    route("dc", "routes/redirect.tsx", { id: "redirect-dc" }),
    route("*", "routes/$.tsx"),
] satisfies RouteConfig;
