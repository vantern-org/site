import { type RouteConfig, index, route, prefix } from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    ...prefix("bot", [
        route("*", "routes/redirect.tsx", { id: "redirect-bot" }),
    ]),
    ...prefix("feedback", [
        route("feedback", "routes/feedback/QuestBotFeedback.tsx"),
        route("deletion", "routes/feedback/DeletionSurvey.tsx"),
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