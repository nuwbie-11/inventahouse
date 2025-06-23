'use client';

import { usePathname } from 'next/navigation';
import { useMemo } from 'react';
import { useLocale } from 'next-intl';
import { locales } from '@/i18n/routing';

type BreadcrumbItem = {
    title: string;
    link: string;
};

// This allows to add custom title as well
const routeMapping: Record<string, BreadcrumbItem[]> = {
    '/dashboard': [{ title: 'Dashboard', link: '/dashboard' }],
    '/': [{ title: 'Dashboard', link: '/' }],

    // Add more custom mappings as needed
};

export function useBreadcrumbs() {
    const pathname = usePathname();
    const locale = useLocale();

    const breadcrumbs = useMemo(() => {
        const segments = pathname.split('/').filter(Boolean);

        // Remove the locale if it's the first segment
        const hasLocale = locales.includes(segments[0] as 'en' | 'id');
        const cleanSegments = hasLocale ? segments.slice(1) : segments;

        const cleanPathname = '/' + cleanSegments.join('/');

        // Check if we have a custom mapping for this exact path
        if (routeMapping[cleanPathname]) {
            // Add locale prefix to each link
            return routeMapping[cleanPathname].map((crumb) => ({
                ...crumb,
                link: `/${locale}${crumb.link}`
            }));
        }

        // If no exact match, fall back to generating breadcrumbs from the path
        return cleanSegments.map((segment, index) => {
            const path = '/' + cleanSegments.slice(0, index + 1).join('/');
            return {
                title: segment.charAt(0).toUpperCase() + segment.slice(1),
                link: `/${locale}${path}`
            };
        });
    }, [pathname, locale]);

    return breadcrumbs;
}
