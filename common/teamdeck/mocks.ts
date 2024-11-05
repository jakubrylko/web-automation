export const emptyItemList = {
  _meta: {
    currentPage: 1,
    perPage: 10,
    pageCount: 1,
    totalCount: 0
  },
  items: [],
  highlighted_items: {
    booking: [],
    timeEntry: []
  },
  milestones: []
}

export const mockedResourceList = {
  _meta: {
    currentPage: 1,
    perPage: 10,
    pageCount: 1,
    totalCount: 0
  },
  items: [
    {
      id: 1867650,
      name: 'Mocked Employee 1',
      type: 1,
      is_part_time: 1,
      active: 1,
      invited: 0,
      contract_start_date: '2020-08-20',
      contract_end_date: '2030-08-20',
      organization_unit_id: 181241,
      linked_invitation: null,
      custom_fields: [],
      avatar: null,
      role: null,
      email: null,
      timeZone: 'Europe/Sarajevo',
      subrows: [
        {
          type: 1,
          blocks: []
        },
        {
          type: 2,
          blocks: []
        },
        {
          type: 3,
          blocks: []
        },
        {
          type: 4,
          blocks: []
        }
      ]
    }
  ],
  highlighted_items: {
    booking: [],
    timeEntry: []
  },
  milestones: []
}
