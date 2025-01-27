export async function fetchWithTimeout(
  url: string,
  options: RequestInit = {},
  timeout = 10000, // 10 segundos por defecto
): Promise<Response> {
  const controller = new AbortController()
  const id = setTimeout(() => controller.abort(), timeout)

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal, // Vincula el controlador
    })
    clearTimeout(id)
    return response
  } catch (error: any) {
    clearTimeout(id)

    if (error.name === 'AbortError') {
      throw new Error('La solicitud se canceló por timeout.')
    }
    throw error // Otros errores
  }
}
