import { type RouteConfig, index, route, prefix } from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    ...prefix("bot", [
        route("*", "routes/redirect.tsx", { id: "redirect-bot" }),
        route("docs", "routes/comingSoon/comingSoon.tsx"),
    ]),
    ...prefix("feedback", [
        route("products", "routes/feedback/productSuggestion.tsx"),
        route("questbot", "routes/feedback/QuestBotFeedback.tsx"),
    ]),
    ...prefix("legal", [
        route("privacy-policy", "routes/legal/privacyPolicy/privacyPolicy.tsx"),
    ]),
    ...prefix("github", [
        route("*", "routes/redirect.tsx", { id: "redirect-github-wildcard" }),
    ]),
    route("kitzal", "routes/redirect.tsx", { id: "redirect-kitzal" }),
    route("github", "routes/redirect.tsx", { id: "redirect-github" }),
    route("sponsors", "routes/sponsors/sponsors.tsx"),
    route("discord", "routes/redirect.tsx", { id: "redirect-discord" }),
    route("*", "routes/$.tsx"),
] satisfies RouteConfig;