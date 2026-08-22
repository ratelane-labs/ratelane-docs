import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import { appName, gitConfig } from './shared';

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: (
        <span className="font-mono font-bold tracking-tight text-foreground">
          Ratelane<span className="text-indigo-500">.</span>
        </span>
      ),
    },
    githubUrl: `https://github.com/${gitConfig.user}/${gitConfig.repo}`,
    links: [
      {
        text: 'Dashboard',
        url: 'https://app.ratelane.dev',
        active: 'url',
      },
    ],
  };
}