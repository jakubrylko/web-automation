export const cardOwner = () => cy.get('input[name*="name"]')
export const iframe = () => cy.get('iframe[title*="input frame"]')
export const submitButton = () => cy.get('button[type="submit"]')
export const trashIcon = () => cy.get('svg.lucide-trash2')
