import { renderBootstrapError } from './bootstrap-error';

describe('renderBootstrapError', () => {
  it('shows a visible startup error inside the app root', () => {
    const testDocument = document.implementation.createHTMLDocument('test');
    spyOn(console, 'error');
    testDocument.body.innerHTML = '<app-root></app-root>';

    renderBootstrapError(new Error('Firebase API key is missing.'), testDocument);

    const alert = testDocument.querySelector('[role="alert"]');

    expect(alert).not.toBeNull();
    expect(alert?.textContent).toContain('No se pudo iniciar la aplicacion');
    expect(alert?.textContent).toContain('src/assets/env.js');
  });
});
