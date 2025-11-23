import React from 'react';

export const HeaderClassicIcon = () => (
    <svg width="100%" height="100%" viewBox="0 0 120 80" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Header Container */}
        <rect x="8" y="16" width="104" height="24" rx="2" fill="white" stroke="#CBD5E1" strokeWidth="1.5" />

        {/* Logo Box - Left */}
        <rect x="14" y="22" width="20" height="12" rx="1.5" fill="#E2E8F0" />

        {/* Nav Items - Right */}
        <rect x="60" y="27" width="12" height="2" rx="1" fill="#CBD5E1" />
        <rect x="76" y="27" width="12" height="2" rx="1" fill="#CBD5E1" />
        <rect x="92" y="27" width="12" height="2" rx="1" fill="#CBD5E1" />
    </svg>
);

export const HeaderCenteredIcon = () => (
    <svg width="100%" height="100%" viewBox="0 0 120 80" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Header Container */}
        <rect x="8" y="16" width="104" height="24" rx="2" fill="white" stroke="#CBD5E1" strokeWidth="1.5" />

        {/* Nav - Left */}
        <rect x="14" y="24" width="10" height="2" rx="1" fill="#E2E8F0" />
        <rect x="28" y="24" width="12" height="2" rx="1" fill="#E2E8F0" />

        {/* Logo Box - Center */}
        <rect x="50" y="22" width="20" height="12" rx="1.5" fill="#E2E8F0" />

        {/* CTA - Right */}
        <rect x="88" y="23" width="18" height="10" rx="1.5" fill="#94A3B8" />
    </svg>
);

export const HeaderMinimalIcon = () => (
    <svg width="100%" height="100%" viewBox="0 0 120 80" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Header Container */}
        <rect x="8" y="16" width="104" height="24" rx="2" fill="white" stroke="#CBD5E1" strokeWidth="1.5" />

        {/* Logo Box - Left */}
        <rect x="14" y="22" width="20" height="12" rx="1.5" fill="#E2E8F0" />

        {/* Hamburger - Right */}
        <g>
            <rect x="91" y="24" width="12" height="1.5" rx="0.75" fill="#94A3B8" />
            <rect x="91" y="28" width="12" height="1.5" rx="0.75" fill="#94A3B8" />
            <rect x="91" y="32" width="12" height="1.5" rx="0.75" fill="#94A3B8" />
        </g>
    </svg>
);

export const HeaderDoubleIcon = () => (
    <svg width="100%" height="100%" viewBox="0 0 120 80" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Header Container - Taller */}
        <rect x="8" y="12" width="104" height="36" rx="2" fill="white" stroke="#CBD5E1" strokeWidth="1.5" />

        {/* Logo Box - Top Center */}
        <rect x="50" y="18" width="20" height="10" rx="1.5" fill="#E2E8F0" />

        {/* Nav Items - Bottom Center */}
        <rect x="30" y="34" width="10" height="2" rx="1" fill="#CBD5E1" />
        <rect x="44" y="34" width="12" height="2" rx="1" fill="#CBD5E1" />
        <rect x="60" y="34" width="14" height="2" rx="1" fill="#CBD5E1" />
        <rect x="78" y="34" width="12" height="2" rx="1" fill="#CBD5E1" />
    </svg>
);

// Header Style Icons - Conceptual
export const HeaderStyleSolidIcon = () => (
    <svg width="100%" height="100%" viewBox="0 0 120 80" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Solid = Opaque layer */}
        <rect x="20" y="20" width="80" height="40" rx="6" fill="white" stroke="#CBD5E1" strokeWidth="2" />
        <text x="60" y="45" fontFamily="system-ui" fontSize="14" fontWeight="600" fill="#64748B" textAnchor="middle">100%</text>
    </svg>
);

export const HeaderStyleTransparentIcon = () => (
    <svg width="100%" height="100%" viewBox="0 0 120 80" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Background layer visible */}
        <rect x="30" y="30" width="60" height="30" rx="4" fill="#C7D2FE" />

        {/* Transparent = Only outline, no fill */}
        <rect x="20" y="20" width="80" height="40" rx="6" fill="none" stroke="white" strokeWidth="3" />
        <text x="60" y="45" fontFamily="system-ui" fontSize="14" fontWeight="600" fill="white" textAnchor="middle">0%</text>
    </svg>
);

export const HeaderStyleGlassIcon = () => (
    <svg width="100%" height="100%" viewBox="0 0 120 80" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Background layer slightly visible */}
        <rect x="30" y="30" width="60" height="30" rx="4" fill="#C7D2FE" />

        {/* Glass = Semi-transparent with reflection */}
        <rect x="20" y="20" width="80" height="40" rx="6" fill="white" fillOpacity="0.3" stroke="white" strokeWidth="2" strokeOpacity="0.6" />

        {/* Glass reflection highlight */}
        <path d="M 26 26 L 94 26 Q 96 26 96 28 L 96 35 Q 96 37 94 37 L 26 37 Q 24 37 24 35 L 24 28 Q 24 26 26 26 Z"
            fill="white" fillOpacity="0.4" />

        <text x="60" y="48" fontFamily="system-ui" fontSize="14" fontWeight="600" fill="white" textAnchor="middle">50%</text>
    </svg>
);
