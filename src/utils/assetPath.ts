/**
 * Helper utility to construct correct asset URLs for Vite deployments,
 * supporting GitHub Pages subpaths, local dev, and custom domain roots.
 */
export function getAssetPath(relativePath: string): string {
  if (!relativePath) return '';
  
  // If it's already an absolute http/https URL, return as is
  if (relativePath.startsWith('http://') || relativePath.startsWith('https://')) {
    return relativePath;
  }

  // Clean leading slash
  const cleanPath = relativePath.startsWith('/') ? relativePath.slice(1) : relativePath;
  
  // Vite base path from import.meta.env.BASE_URL
  const baseUrl = import.meta.env.BASE_URL || './';

  if (baseUrl === './' || baseUrl === '') {
    return `./${cleanPath}`;
  }

  return baseUrl.endsWith('/') ? `${baseUrl}${cleanPath}` : `${baseUrl}/${cleanPath}`;
}
