import { ApiResponseBody } from 'cypress-plugin-api'

export const statusShouldBeOk = (response: ApiResponseBody) => {
  expect([200, 201]).to.include(response.status)
}

export const sendGet = (url: string) => {
  return cy.api({ method: 'GET', url })
}

export const sendPost = (url: string, body?: object) => {
  return cy.api({ method: 'POST', url, body })
}
