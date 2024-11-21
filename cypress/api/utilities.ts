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

export const sendGraphQLRequest = (
  url: string,
  operationName: string,
  query: string,
  { variables = {} }: { variables?: object } = {}
) => {
  return cy.api({
    method: 'POST',
    url,
    body: {
      operationName,
      query,
      variables
    }
  })
}

export const mockGraphQLRequest = (operationName: string, mock: object) => {
  cy.intercept('POST', '**/api/graphql/', (request) => {
    if (request.body.operationName === operationName) {
      request.alias = operationName
      request.reply((res) => {
        res.body.data = mock
      })
    }
  })
}
