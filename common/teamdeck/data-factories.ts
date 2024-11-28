import { faker } from '@faker-js/faker'
import dayjs from 'dayjs'

const { date, hacker, internet, helpers, person, string } = faker

export const metaData = ({ totalCount }: { totalCount: number }) => {
  return {
    currentPage: 1,
    perPage: 10,
    pageCount: Math.ceil(totalCount / 10),
    totalCount
  }
}

export const newResource = () => {
  const startDate = date.past({ years: 10 })
  const endDate = date.future({ years: 10 })
  const randomRole = helpers.arrayElement([
    'Backend Developer',
    'Frontend Developer',
    'Project Manager',
    'QA Engineer'
  ])

  return {
    id: Number(string.numeric(7)),
    name: person.fullName(),
    type: 1,
    is_part_time: 1,
    active: 1,
    invited: 0,
    contract_start_date: dayjs(startDate).format('YYYY-MM-DD'),
    contract_end_date: dayjs(endDate).format('YYYY-MM-DD'),
    organization_unit_id: 181241,
    linked_invitation: null,
    custom_fields: [],
    avatar: null,
    role: randomRole,
    email: internet.email(),
    timeZone: 'Europe/Sarajevo',
    subrows: [
      { type: 1, blocks: [] },
      { type: 2, blocks: [] },
      { type: 3, blocks: [] },
      { type: 4, blocks: [] }
    ]
  }
}

export const newProject = {
  archived: false,
  color: internet.color(),
  custom_fields: [],
  milestones: [],
  name: `${hacker.adjective()} ${hacker.noun()}`,
  tags: []
}
