import type { ReactNode } from "react";
import Image from "next/image";

type LinkPreviewProps = {
  children: ReactNode;
  href: string;
  previewSrc: string;
  storm?: boolean;
};

export default function LinkPreview({
  children,
  href,
  previewSrc,
  storm = false,
}: LinkPreviewProps) {
  return (
    <span className="link-preview">
      <a
        href={href}
        className="link-preview__anchor text-foreground underline hover:opacity-70 transition-opacity"
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>

      <span className="link-preview__portal" aria-hidden="true">
        <span className="link-preview__frame">
          <span className="link-preview__screen">
            <Image
              src={previewSrc}
              width={840}
              height={608}
              loading="lazy"
              alt=""
              unoptimized
            />
            {storm && (
              <span className="link-preview__vortex">
                <Image
                  src="/images/naruto-portal-clouds.webp"
                  width={700}
                  height={467}
                  loading="lazy"
                  alt=""
                  unoptimized
                />
              </span>
            )}
          </span>
        </span>
      </span>
    </span>
  );
}
