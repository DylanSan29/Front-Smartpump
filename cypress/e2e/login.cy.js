describe("Login and EditProfile Flow", () => {
  const userId = "5410953eb0e0c0ae25608277"; // ID de ejemplo del usuario

  it("should log in the user, redirect to the profile page, navigate to balance, go back to profile, and log out", () => {
    // Visita la página de login
    cy.visit("http://localhost:3002/login");

    // Escribe el correo electrónico
    cy.get('input[type="email"]').type("henderson.briggs@geeknet.net"); // Usa un correo electrónico válido para la prueba

    // Escribe la contraseña
    cy.get('input[type="password"]').type("23derd*334");

    // Haz clic en el botón de login
    cy.get('button[type="submit"]').click();

    // Verifica que la URL cambie a /profile
    cy.url().should("include", "/profile");

    // Haz clic en el botón "Balance" para navegar a la página de balance
    cy.contains("Balance").click();

    // Verifica que la URL cambie a /Balance
    cy.url().should("include", "/Balance");

    // Verifica que el balance se muestra correctamente
    cy.contains("Balance:").should("be.visible");

    // Haz clic en "Volver al perfil" para regresar a la página de perfil
    cy.get('a[href="/profile"]').click();

    // Verifica que la URL cambie de vuelta a /profile
    cy.url().should("include", "/profile");

    cy.contains("Editar perfil").click();

    cy.get('input[name="firstName"]').should('be.visible');

    // Cambiar el valor de 'First Name'
    cy.get('input[name="firstName"]').clear().type('NuevoNombre'); // Usa un correo electrónico válido para la prueba

    cy.contains("Update Profile").click();

    cy.get('.success-message').should('contain', 'Perfil actualizado correctamente!');

  });
});
