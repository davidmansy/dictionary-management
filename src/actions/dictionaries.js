export const RECEIVE_DICTIONARIES = 'RECEIVE_DICTIONARIES';
export const ADD_DICTIONARY = 'ADD_DICTIONARY';
export const DELETE_DICTIONARY = 'DELETE_DICTIONARY';
export const UPDATE_DICTIONARY = 'UPDATE_DICTIONARY';

// TODO: REMOVE
// const mockedDictionaries = [
//   {
//     title: 'Furniture dictionary',
//     id: generateId(),
//     status: 'inconsistent', //at least one warning
//     data: [
//       {
//         key: generateId(),
//         domain: 'Stonegrey',
//         range: 'Dark Grey',
//         issues: []
//       },
//       {
//         key: generateId(),
//         domain: 'Caribbean Sea',
//         range: 'Turqoise',
//         issues: [{ type: 'Duplicate Domains/Ranges', severity: 'warning' }]
//       },
//       {
//         key: generateId(),
//         domain: 'Caribbean Sea',
//         range: 'Turqoise',
//         issues: [{ type: 'Duplicate Domains/Ranges', severity: 'warning' }]
//       }
//     ]
//   },
//   {
//     title: 'TV Dictionary',
//     id: generateId(),
//     status: 'valid', //no errors, no warnings
//     data: [
//       {
//         key: generateId(),
//         domain: 'Caribbean Sea',
//         range: 'Turqoise',
//         issues: []
//       },
//       {
//         key: generateId(),
//         domain: 'Midnight Blue',
//         range: 'Dark Blue',
//         issues: []
//       }
//     ]
//   },
//   {
//     title: 'Computer Dictionary',
//     id: generateId(),
//     status: 'invalid', //Has at least one error
//     data: [
//       {
//         key: generateId(),
//         domain: 'Stonegrey',
//         range: 'Dark Grey',
//         issues: [{ type: 'cycle', severity: 'error' }]
//       },
//       {
//         key: generateId(),
//         domain: 'Dark Grey',
//         range: 'Stonegrey',
//         issues: [{ type: 'cycle', severity: 'error' }]
//       }
//     ]
//   }
// ];

function generateId() {
  return Math.random()
    .toString(36)
    .substr(-8);
}

const mockedDictionaries = [
  {
    title: 'Furniture dictionary',
    id: generateId(),
    status: 'inconsistent', //at least one warning
    data: [
      {
        key: generateId(),
        domain: 'Stonegrey',
        range: 'Dark Grey',
        issues: []
      },
      {
        key: generateId(),
        domain: 'Caribbean Sea',
        range: 'Turqoise',
        issues: []
      },
      {
        key: generateId(),
        domain: 'Caribbean Sea',
        range: 'Turqoise',
        issues: []
      }
    ]
  },
  {
    title: 'TV Dictionary',
    id: generateId(),
    status: 'valid', //no errors, no warnings
    data: [
      {
        key: generateId(),
        domain: 'Caribbean Sea',
        range: 'Turqoise',
        issues: []
      },
      {
        key: generateId(),
        domain: 'Midnight Blue',
        range: 'Dark Blue',
        issues: []
      }
    ]
  },
  {
    title: 'Computer Dictionary',
    id: generateId(),
    status: 'invalid', //Has at least one error
    data: [
      {
        key: generateId(),
        domain: 'Stoneyellow',
        range: 'Dark Yellow',
        issues: []
      },
      {
        key: generateId(),
        domain: 'Dark Yellow',
        range: 'Stoneyellow',
        issues: []
      }
    ]
  }
];

//TODO: Store dictionaries in local storage
export function receiveDictionaries(dictionaries = mockedDictionaries) {
  return {
    type: RECEIVE_DICTIONARIES,
    dictionaries
  };
}

export function addDictionary(title) {
  const newDictionary = { title, id: generateId(), data: [] };
  return {
    type: ADD_DICTIONARY,
    newDictionary
  };
}

export function deleteDictionary(id) {
  return {
    type: DELETE_DICTIONARY,
    id
  };
}

export function updateDictionary(id, data) {
  return {
    type: UPDATE_DICTIONARY,
    id,
    data
  };
}
