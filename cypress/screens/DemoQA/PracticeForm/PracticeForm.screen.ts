import { faker } from '@faker-js/faker'
import * as Selectors from './PracticeForm.selectors'

const { int } = faker.number

export const selectGender = (gender: Gender) => {
  cy.contains(gender).click()
  cy.get(`input[value=${gender}]`).shouldBeChecked()
}

export const selectDateOfBirth = (day: string, month: string, year: string) => {
  Selectors.dateOfBirth().click()
  Selectors.monthSelect().select(month)
  Selectors.yearSelect().select(year)
  cy.get(`[aria-label*="${month} ${day}"]`).eq(0).click()

  Selectors.dateOfBirth().should(
    'have.attr',
    'value',
    `${day.padStart(2, '0')} ${month.slice(0, 3)} ${year}`
  )
}

export const selectSubject = (subject: string) => {
  Selectors.subjectsInput().type(subject)
  Selectors.firstSubject().click()
  cy.contains(subject).shouldBeVisible()
}

export const selectHobbies = (hobbies: Hobby | Hobby[]) => {
  const indexes = { Sports: 1, Reading: 2, Music: 3 }

  const hobbiesArr = Array.isArray(hobbies) ? hobbies : [hobbies]
  hobbiesArr.forEach((hobby) => {
    const hobbyCheckbox = `#hobbies-checkbox-${indexes[hobby]}`
    cy.get(hobbyCheckbox).check({ force: true })
    cy.get(hobbyCheckbox).shouldBeChecked()
  })
}

export const selectRandomState = () => {
  Selectors.stateSelect().click()
  Selectors.stateOption()
    .its('length')
    .then((numOfStates) => {
      const randomState = int({ min: 1, max: numOfStates - 1 })
      Selectors.stateOption().eq(randomState).click()
    })
}

export const selectRandomCity = () => {
  Selectors.citySelect().click()
  Selectors.cityOption()
    .its('length')
    .then((numOfCities) => {
      const randomCity = int({ min: 1, max: numOfCities - 1 })
      Selectors.cityOption().eq(randomCity).click()
    })
}

export const createCsvFromTable = () => {
  Selectors.formTable()
    .find('tr')
    .then(($rows) => {
      // Creating an array from table rows
      const data: [string, string][] = Array.from($rows).map((row) => {
        const [key, value] = Array.from(row.children).map(
          (cell) => cell.textContent?.trim().removeChars('\n') || ''
        )

        // Formatting answers
        const formattedValue =
          key === 'Date of Birth'
            ? value.removeChars(',')
            : key === 'Hobbies' || key === 'Address'
              ? `"${value}"`
              : value

        return [key, formattedValue]
      })

      // Formatting content to CSV string
      const csvContent = data.map((row) => row.join(',')).join('\n')
      cy.writeFile('cypress/downloads/answers.csv', csvContent)
    })
}
