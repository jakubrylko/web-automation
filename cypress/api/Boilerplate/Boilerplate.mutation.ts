import { print } from 'graphql'
import { gql } from 'graphql-tag'

export const loginMutation = print(gql`
  mutation loginFormMutation($input: ObtainTokenMutationInput!) {
    tokenAuth(input: $input) {
      access
      refresh
      otpAuthToken
    }
  }
`)

export const addItemMutation = print(gql`
  mutation addCrudDemoItemMutation($input: CreateCrudDemoItemMutationInput!) {
    createCrudDemoItem(input: $input) {
      crudDemoItemEdge {
        node {
          id
          name
        }
      }
    }
  }
`)

export const editItemMutation = print(gql`
  mutation editCrudDemoItemContentMutation(
    $input: UpdateCrudDemoItemMutationInput!
  ) {
    updateCrudDemoItem(input: $input) {
      crudDemoItem {
        id
        name
      }
    }
  }
`)

export const deleteItemMutation = print(gql`
  mutation crudDemoItemListItemDeleteMutation(
    $input: DeleteCrudDemoItemMutationInput!
  ) {
    deleteCrudDemoItem(input: $input) {
      deletedIds
    }
  }
`)
