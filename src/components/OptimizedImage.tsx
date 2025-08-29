import React, { useState } from 'react'

interface OptimizedImageProps {
  src: string
  webpSrc?: string
  alt: string
  className?: string
  loading?: 'lazy' | 'eager'
  onLoad?: () => void
  onError?: () => void
}

export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  webpSrc,
  alt,
  className = '',
  loading = 'lazy',
  onLoad,
  onError
}) => {
  const [imageLoaded, setImageLoaded] = useState(false)
  const [imageError, setImageError] = useState(false)

  const handleLoad = () => {
    setImageLoaded(true)
    onLoad?.()
  }

  const handleError = () => {
    setImageError(true)
    onError?.()
  }

  // Si WebP n'est pas supporté ou en cas d'erreur, utiliser l'image originale
  const finalSrc = (webpSrc && !imageError) ? webpSrc : src

  return (
    <img
      src={finalSrc}
      alt={alt}
      className={`${className} ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
      loading={loading}
      onLoad={handleLoad}
      onError={handleError}
      style={{
        transition: 'opacity 0.3s ease-in-out'
      }}
    />
  )
} 