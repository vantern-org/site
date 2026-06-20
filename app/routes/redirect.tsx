import { redirect } from 'react-router';

const MEMBERS: Record<string, string> = {
    unbravechimp: 'unbravechimp',
    tom: 'twatson',
    jvr: 'jvr2022',
    kat: 'kat-11-11',
};

const REDIRECTS: Record<string, string> = {
    '/discord': 'https://discord.gg/F4HYE8frK2',
    '/github': 'https://github.com/duck-organization',
    '/github/questbot': 'https://github.com/duck-organization/questbot.git',
    '/github/duck-site': 'https://github.com/duck-organization/duck-site.git',
    '/bot/invite': 'https://discord.com/oauth2/authorize?client_id=1494686224508522579&permissions=4504974218751054&scope=bot%20applications.commands',
    '/bot/github': 'https://github.com/duck-organization/quest-bot.git',
    '/bot/docs': 'https://docs.duckorg.com/',
    '/kitzal': 'https://kitzal.com/',
    ...Object.fromEntries(
        Object.entries(MEMBERS).map(([slug, username]) => [
            `/github/member/${slug}`,
            `https://github.com/${username}`,
        ])
    ),
};

export function loader({ request }: { request: Request }) {
    const destination = REDIRECTS[new URL(request.url).pathname];
    if (destination) return redirect(destination);
    throw new Response('Not found', { status: 404 });
}
