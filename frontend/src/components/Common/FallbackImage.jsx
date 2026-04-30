import {
  useEffect,
  useState,
} from "react";

function FallbackImage({
  src,
  alt,
  style,
}) {
  const fallbackImage =
    "https://placehold.co/400x400?text=No+Image";

  const [imgSrc, setImgSrc] =
    useState(
      fallbackImage
    );

  useEffect(() => {
    // reset immediately
    setImgSrc(
      fallbackImage
    );

    if (!src) return;

    const img =
      new Image();

    img.src = src;

    img.onload = () => {
      setImgSrc(src);
    };

    img.onerror = () => {
      setImgSrc(
        fallbackImage
      );
    };

    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [src]);

  return (
    <img
      src={imgSrc}
      alt={alt}
      style={style}
    />
  );
}

export default FallbackImage;