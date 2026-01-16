import Link from 'next/link';

interface Breadcrumb {
  label: string;
  href?: string;
}

interface PageHeroProps {
  title: string;
  subtitle?: string;
  eyebrow?: string;
  image?: string;
  align?: 'center' | 'left';
  height?: 'sm' | 'md' | 'lg';
  breadcrumbs?: Breadcrumb[];
  children?: React.ReactNode;
}

export default function PageHero({
  title,
  subtitle,
  eyebrow,
  image,
  align = 'center',
  height = 'md',
  breadcrumbs,
  children,
}: PageHeroProps) {
  const heightClass =
    height === 'sm'
      ? 'min-h-56'
      : height === 'lg'
        ? 'min-h-96 sm:min-h-[460px]'
        : 'min-h-72 sm:min-h-96';

  const alignClass = align === 'left' ? 'text-left items-start' : 'text-center items-center';

  return (
    <section className={`relative overflow-hidden ${heightClass} bg-background`}>
      {/* Background image */}
      <div className="absolute inset-0">
        {image ? (
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${image})` }}
            aria-hidden="true"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-primary via-purple-700 to-accent" aria-hidden="true" />
        )}

        {/* Overlays for readability */}
        <div className="absolute inset-0 bg-black/80" aria-hidden="true" />
        <div className="absolute -top-24 -right-24 w-72 h-72 bg-background/10 rounded-full blur-2xl" aria-hidden="true" />
        <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-primary/10 rounded-full blur-2xl" aria-hidden="true" />
      </div>

      <div className="relative z-10">
        <div className={`container mx-auto px-4 sm:px-6 lg:px-8 ${heightClass} flex flex-col justify-center`}>
          {breadcrumbs && breadcrumbs.length > 0 ? (
            <nav className="mb-4 text-sm text-background/80" aria-label="Breadcrumb">
              <ol className="flex flex-wrap gap-2">
                {breadcrumbs.map((b, idx) => (
                  <li key={`${b.label}-${idx}`} className="flex items-center gap-2">
                    {b.href ? (
                      <Link href={b.href} className="hover:text-primary underline underline-offset-4">
                        {b.label}
                      </Link>
                    ) : (
                      <span className="text-background">{b.label}</span>
                    )}
                    {idx !== breadcrumbs.length - 1 && <span className="text-background/60">/</span>}
                  </li>
                ))}
              </ol>
            </nav>
          ) : null}

          <div className={`max-w-4xl mx-auto flex flex-col ${alignClass}`}>
            {eyebrow ? (
              <div className="mb-3 inline-flex items-center rounded-full bg-background/10 px-4 py-1.5 text-xs sm:text-sm font-weight-bold tracking-widest uppercase text-background backdrop-blur">
                {eyebrow}
              </div>
            ) : null}

            <h1 className="text-h1 font-weight-heading text-background leading-tight">
              {title}
            </h1>

            {subtitle ? (
              <p className="mt-4 text-base sm:text-lg text-background/90 max-w-3xl">
                {subtitle}
              </p>
            ) : null}

            {children ? <div className="mt-6">{children}</div> : null}
          </div>
        </div>
      </div>
    </section>
  );
}
