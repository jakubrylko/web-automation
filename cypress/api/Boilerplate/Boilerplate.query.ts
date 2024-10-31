import { print } from 'graphql'
import { gql } from 'graphql-tag'

export const currentUserQuery = print(gql`
  query commonQueryCurrentUserQuery {
    currentUser {
      id
      email
      firstName
      lastName
      tenants {
        id
        name
      }
    }
  }
`)

export const allItemsQuery = print(gql`
  query crudDemoItemListQuery($tenantId: ID!, $first: Int) {
    allCrudDemoItems(tenantId: $tenantId, first: $first) {
      edges {
        node {
          id
          name
        }
      }
      pageInfo {
        hasPreviousPage
        hasNextPage
      }
    }
  }
`)

export const itemDetailsQuery = print(gql`
  query crudDemoItemDetailsQuery($id: ID!, $tenantId: ID!) {
    crudDemoItem(id: $id, tenantId: $tenantId) {
      id
      name
    }
  }
`)
