/// <reference types="Cypress" />

import {
  ADDRESS,
  CALENDAR_DAY,
  CHECKBOX_SPORTS,
  CITY,
  CLOSE,
  DATE_OF_BIRTH,
  EMAIL,
  FIRST_CITY,
  FIRST_NAME,
  FIRST_STATE,
  FIRST_SUBJECT,
  LAST_NAME,
  MOBILE,
  MONTH_SELECT,
  RADIO_BUTTON_MALE,
  STATE,
  SUBJECTS,
  SUBMIT,
  YEAR_SELECT,
} from '@common/selectors/form'

describe('Practice form', () => {
  it('Should fill and submit practice form', () => {
    cy.visit('https://demoqa.com')

    cy.contains('Forms').click()
    cy.contains('Practice Form').click()

    cy.get(FIRST_NAME).type('John')
    cy.get(LAST_NAME).type('Doe')
    cy.get(EMAIL).type('test@example.com')
    cy.get(MOBILE).type('0123456789')

    cy.contains('Male').click()
    cy.get(RADIO_BUTTON_MALE).should('be.checked')

    cy.get(DATE_OF_BIRTH).click()
    cy.get(MONTH_SELECT).select('May')
    cy.get(YEAR_SELECT).select('1990')
    cy.get(`${CALENDAR_DAY}-015`).click()
    cy.get(DATE_OF_BIRTH).should('have.attr', 'value', '15 May 1990')

    cy.get(SUBJECTS).type('Computer')
    cy.get(FIRST_SUBJECT).click()
    cy.contains('Computer Science').should('be.visible')

    cy.contains('Sports').click()
    cy.get(CHECKBOX_SPORTS).should('be.checked')

    cy.get(ADDRESS).type('Gorecka 1,\nPoznan,\nPoland')

    cy.get(STATE).click()
    cy.get(FIRST_STATE).click()
    cy.get(CITY).click()
    cy.get(FIRST_CITY).click()

    cy.get(SUBMIT).click()
    cy.contains('Thanks for submitting the form').should('be.visible')
    cy.get(CLOSE).click()
  })
})
