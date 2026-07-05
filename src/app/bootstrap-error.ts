function getErrorMessage(error: unknown): string {
  if (error instanceof Error && error.message.trim().length > 0) {
    return error.message;
  }

  return 'Error desconocido.';
}

export function renderBootstrapError(error: unknown, targetDocument: Document = document): void {
  console.error(error);

  const host = targetDocument.querySelector('app-root') ?? targetDocument.body;
  const container = targetDocument.createElement('main');
  const title = targetDocument.createElement('h1');
  const detail = targetDocument.createElement('p');
  const hint = targetDocument.createElement('p');

  container.setAttribute('role', 'alert');
  container.style.minHeight = '100vh';
  container.style.display = 'grid';
  container.style.placeContent = 'center';
  container.style.gap = '0.75rem';
  container.style.padding = '2rem';
  container.style.color = '#f8fafc';
  container.style.background = '#0f172a';
  container.style.fontFamily = 'Arial, sans-serif';

  title.textContent = 'No se pudo iniciar la aplicacion';
  title.style.margin = '0';
  title.style.fontSize = '1.5rem';

  detail.textContent = getErrorMessage(error);
  detail.style.margin = '0';

  hint.textContent = 'Configura src/assets/env.js a partir de src/assets/env.template.js con una clave Firebase valida.';
  hint.style.margin = '0';
  hint.style.color = '#cbd5e1';

  container.append(title, detail, hint);
  host.replaceChildren(container);
}
