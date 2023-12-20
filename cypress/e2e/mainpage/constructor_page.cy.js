describe("constructor page", function () {
  beforeEach(() => {
    cy.visit("/");
    cy.get("#drag_elem").as("drag_elem");
    cy.get("#drop_target").as("drop_target");
  });
  it("should drug bun success", () => {
    cy.get("@drag_elem").first().trigger("dragstart");
    cy.get("@drop_target").trigger("drop");

    cy.get(".bun-element").should("be.visible");
  });

  it("detail modal  open", () => {
    cy.get("@drag_elem").first().click();
    cy.get("#modal").first().should("be.visible");
  });

  it("success order", () => {
    cy.setCookie("token", "test-accessToken");
    cy.setCookie("refreshToken", "test-refreshToken");

    cy.get("@drag_elem").first().trigger("dragstart");
    cy.get("@drop_target").trigger("drop");

    cy.get("#submit_order_btn").click();
    cy.get("#modal").first().should("be.visible");
  });
});
