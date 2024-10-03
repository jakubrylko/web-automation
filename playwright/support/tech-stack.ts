import { expect, Page } from '@playwright/test'

type Department = 'Frontend' | 'Backend' | 'Infrastructure' | 'Design'

const expectedTechCounts = {
  Frontend: 6,
  Backend: 5,
  Infrastructure: 4,
  Design: 5
}

const getDepartmentTechCount = async (page: Page, department: Department) => {
  const lowerDepartment = department.toLowerCase()
  return await page.locator(`[data-tech="${lowerDepartment}"]`).count()
}

export const clickOnDepartment = async (page: Page, department: Department) =>
  await page.locator(`.swiper-tab-category:has-text("${department}")`).click()

export const assertTechStack = async (page: Page, department: Department) => {
  const expectedTechCount = expectedTechCounts[department]
  const departmentTechCount = await getDepartmentTechCount(page, department)

  console.log(`${department}: ${departmentTechCount} technologies`)
  expect(departmentTechCount).toEqual(expectedTechCount)
}
