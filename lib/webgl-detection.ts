export function isWebGLAvailable(): boolean {
  try {
    const canvas = document.createElement('canvas');
    const gl =
      canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    return !!(gl && gl instanceof WebGLRenderingContext);
  } catch (e) {
    return false;
  }
}

export function getWebGLErrorMessage(): string {
  return 'WebGL tidak tersedia di perangkat Anda. Silakan gunakan browser yang mendukung WebGL atau perangkat lain.';
}
