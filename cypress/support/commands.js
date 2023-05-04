// Dnd Kit
function getDocumentScroll() {
  if (document.scrollingElement) {
    const { scrollTop, scrollLeft } = document.scrollingElement;

    return {
      x: scrollTop,
      y: scrollLeft,
    };
  }

  return {
    x: 0,
    y: 0,
  };
}

Cypress.Commands.add(
  "mouseMoveBy",
  {
    prevSubject: "element",
  },
  (subject, x, y, { delay = 100 } = {}) => {
    cy.wrap(subject, { log: false })
      .then((subject) => {
        const initialRect = subject.get(0).getBoundingClientRect();
        const windowScroll = getDocumentScroll();

        return [subject, initialRect, windowScroll];
      })
      .then(([subject, initialRect, initialWindowScroll]) => {
        // eslint-disable-next-line cypress/no-unnecessary-waiting, cypress/unsafe-to-chain-command
        cy.wrap(subject)
          .trigger("mousedown", { force: true })
          .wait(delay, { log: Boolean(delay) })
          .trigger("mousemove", {
            force: true,
            clientX: Math.floor(
              initialRect.left + initialRect.width / 2 + x / 2
            ),
            clientY: Math.floor(
              initialRect.top + initialRect.height / 2 + y / 2
            ),
          })
          .trigger("mousemove", {
            force: true,
            clientX: Math.floor(initialRect.left + initialRect.width / 2 + x),
            clientY: Math.floor(initialRect.top + initialRect.height / 2 + y),
          })
          .wait(100)
          .trigger("mouseup", { force: true })
          .wait(250)
          .then((subject) => {
            const finalRect = subject.get(0).getBoundingClientRect();
            const windowScroll = getDocumentScroll();
            const windowScrollDelta = {
              x: windowScroll.x - initialWindowScroll.x,
              y: windowScroll.y - initialWindowScroll.y,
            };

            const delta = {
              x: Math.round(
                finalRect.left - initialRect.left - windowScrollDelta.x
              ),
              y: Math.round(
                finalRect.top - initialRect.top - windowScrollDelta.y
              ),
            };

            return [subject, { initialRect, finalRect, delta }];
          });
      });
  }
);