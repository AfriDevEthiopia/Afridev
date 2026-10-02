import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

const stroke = { fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", "aria-hidden": true } as const;

export const ArrowRightIcon = (props: IconProps) => (
  <svg {...stroke} {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M5 12h14m-6-6l6 6-6 6" />
  </svg>
);

export const ExternalIcon = (props: IconProps) => (
  <svg {...stroke} {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M7 17L17 7M9 7h8v8" />
  </svg>
);

export const CheckIcon = (props: IconProps) => (
  <svg {...stroke} {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
);

export const ChevronDownIcon = (props: IconProps) => (
  <svg {...stroke} {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M6 9l6 6 6-6" />
  </svg>
);

export const MenuIcon = (props: IconProps) => (
  <svg {...stroke} {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M4 7h16M4 12h16M4 17h16" />
  </svg>
);

export const CloseIcon = (props: IconProps) => (
  <svg {...stroke} {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

export const MailIcon = (props: IconProps) => (
  <svg {...stroke} {...props}>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.75}
      d="M4 6h16a1 1 0 011 1v10a1 1 0 01-1 1H4a1 1 0 01-1-1V7a1 1 0 011-1zm-1 1l9 6 9-6"
    />
  </svg>
);

export const CalendarIcon = (props: IconProps) => (
  <svg {...stroke} {...props}>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.75}
      d="M8 3v3m8-3v3M4 9h16M5 5h14a1 1 0 011 1v13a1 1 0 01-1 1H5a1 1 0 01-1-1V6a1 1 0 011-1z"
    />
  </svg>
);

export const PlayIcon = (props: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
    <path d="M8 5.14v13.72a1 1 0 001.52.85l10.6-6.86a1 1 0 000-1.7L9.52 4.29A1 1 0 008 5.14z" />
  </svg>
);

export const StarIcon = (props: IconProps) => (
  <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" {...props}>
    <path d="M10 1.5l2.47 5.01 5.53.8-4 3.9.94 5.5L10 14.1l-4.94 2.6.94-5.5-4-3.9 5.53-.8L10 1.5z" />
  </svg>
);

export const UpworkIcon = (props: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
    <path d="M18.56 13.16c-1.1 0-2.14-.47-3.08-1.23l.23-1.08.01-.04c.2-1.14.85-3.06 2.84-3.06a2.7 2.7 0 010 5.4zm0-8.14c-2.54 0-4.51 1.65-5.31 4.37-1.22-1.84-2.15-4.04-2.69-5.9H7.83v7.12a2.55 2.55 0 01-5.09 0V3.49H0v7.12a5.28 5.28 0 0010.56 0v-1.2c.53 1.11 1.18 2.23 1.98 3.23l-1.68 7.87h2.8l1.21-5.71c1.07.68 2.29 1.11 3.69 1.11a5.45 5.45 0 000-10.9z" />
  </svg>
);

export const GithubIcon = (props: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
    <path d="M12 2C6.48 2 2 6.58 2 12.23c0 4.52 2.87 8.35 6.84 9.7.5.1.68-.22.68-.49l-.01-1.7c-2.78.62-3.37-1.22-3.37-1.22-.46-1.18-1.11-1.5-1.11-1.5-.91-.64.07-.62.07-.62 1 .07 1.53 1.06 1.53 1.06.9 1.56 2.35 1.11 2.92.85.09-.66.35-1.11.63-1.37-2.22-.26-4.56-1.14-4.56-5.06 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.71 0 0 .84-.28 2.75 1.05a9.4 9.4 0 015 0c1.91-1.33 2.75-1.05 2.75-1.05.55 1.41.2 2.45.1 2.71.64.72 1.03 1.63 1.03 2.75 0 3.93-2.34 4.8-4.57 5.05.36.32.68.94.68 1.9l-.01 2.82c0 .27.18.6.69.49A10.24 10.24 0 0022 12.23C22 6.58 17.52 2 12 2z" />
  </svg>
);

export const LinkedinIcon = (props: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
    <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.95v5.66H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 110-4.12 2.06 2.06 0 010 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
  </svg>
);
