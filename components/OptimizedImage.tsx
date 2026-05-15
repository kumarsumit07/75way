"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { IMAGE_MAP } from "../lib/image-map";

export type OptimizedImageProps = React.ComponentProps<typeof Image> & {
  fallback?: string;
};

const isRemoteUrl = (value: string) =>
  value.startsWith("http://") || value.startsWith("https://");

export default function OptimizedImage({ src, alt, fallback = "/images/placeholder.svg", ...rest }: OptimizedImageProps) {
  const initialSrc = typeof src === "string" ? src : (src as any)?.src || "";
  const [imgSrc, setImgSrc] = useState<string>(initialSrc);

  useEffect(() => {
    setImgSrc(initialSrc);
  }, [initialSrc]);

  const entry = typeof initialSrc === "string" && IMAGE_MAP[initialSrc] ? IMAGE_MAP[initialSrc] : undefined;
  const isRemote = typeof initialSrc === "string" && isRemoteUrl(initialSrc);
  
  let displaySrc = imgSrc;
  if (imgSrc === initialSrc) {
    if (entry) {
      displaySrc = entry.variants?.[1200] || entry.localJpg || imgSrc;
    } else if (isRemote) {
      displaySrc = fallback;
    }
  }

  return (
    <Image
      {...rest}
      src={displaySrc}
      alt={alt as string}
      onError={() => {
        if (displaySrc !== fallback) {
          setImgSrc(fallback);
        }
      }}
      placeholder={entry?.blurDataURL ? "blur" : (rest as any).placeholder}
      blurDataURL={entry?.blurDataURL}
    />
  );
}
