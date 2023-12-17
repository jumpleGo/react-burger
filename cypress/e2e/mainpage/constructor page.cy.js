describe("constructor page", function () {
  it("should drug bun success", () => {
    cy.visit("http://localhost:3000");
    cy.get("#drag_elem").first().trigger("dragstart");
    cy.get("#drop_target").trigger("drop");

    cy.get(".bun-element").should("be.visible");
  });

  it("detail modal  open", () => {
    cy.visit("http://localhost:3000");
    cy.get("#drag_elem").first().click();
    cy.get("#modal").first().should("be.visible");
  });

  it("success order", () => {
    cy.visit("http://localhost:3000");

    cy.setCookie("token", "test-accessToken");
    cy.setCookie("refreshToken", "test-refreshToken");

    cy.get("#drag_elem").first().trigger("dragstart");
    cy.get("#drop_target").trigger("drop");

    cy.get("#submit_order_btn").click();
    cy.get("#modal").first().should("be.visible");
  });
});
