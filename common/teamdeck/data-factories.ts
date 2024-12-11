import { faker } from '@faker-js/faker'
import dayjs from 'dayjs'

const { date, hacker, internet, number, person } = faker

export const newProject = () => {
  return {
    archived: false,
    color: internet.color(),
    custom_fields: [],
    milestones: [],
    name: `${hacker.adjective()} ${hacker.noun()}`,
    tags: []
  }
}

export const newPerson = ({ unitId }: UnitId) => {
  const startDate = dayjs()
  const endDate = date.future({ years: 10 })

  return {
    active: true,
    can_see_calendar: true,
    created: null,
    custom_fields: [],
    is_part_time: false,
    isInvitation: true,
    me: false,
    podioActive: false,
    availabilityRange: {
      startDate: dayjs(startDate).format('YYYY-MM-DD'),
      endDate: dayjs(endDate).format('YYYY-MM-DD')
    },
    contract_start_date: dayjs(startDate).format('YYYY-MM-DD'),
    contract_end_date: dayjs(endDate).format('YYYY-MM-DD'),
    access: [
      {
        dataType: 'tag',
        default: 1,
        disabled: false,
        id: unitId,
        name: 'Main'
      }
    ],
    name: person.fullName(),
    organization_unit_id: unitId,
    pending: true,
    type: 1,
    organization_unit_resource_accesses: [unitId]
  }
}

export const newBooking = ({
  projectId,
  resourceId
}: ProjectId & ResourceId) => {
  const startDate = dayjs()
  const endDate = date.future()

  return {
    minutes: number.int({ min: 10, max: 150 }) * 60,
    description: '',
    project_id: [projectId],
    resource_id: [resourceId],
    intervals: [
      {
        start_date: dayjs(startDate).format('YYYY-MM-DD'),
        end_date: dayjs(endDate).format('YYYY-MM-DD')
      }
    ],
    weekend_booking: false,
    holidays_booking: false,
    vacations_booking: false,
    tags: [],
    rrule: null
  }
}

export const newTimeEntry = ({
  projectId,
  resourceId
}: ProjectId & ResourceId) => {
  return {
    minutes: number.int({ min: 1, max: 8 }) * 60,
    description: '',
    project_id: [projectId],
    resource_id: [resourceId],
    intervals: [
      {
        start_date: dayjs().format('YYYY-MM-DD'),
        end_date: dayjs().format('YYYY-MM-DD')
      }
    ],
    weekend_booking: true,
    holidays_booking: true,
    vacations_booking: true,
    tags: []
  }
}
