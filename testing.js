/* eslint-disable guard-for-in */
/* eslint-disable no-undef */
//test

const employees = [
    { id: 1, name: 'moe'},
    { id: 2, name: 'larry', managerId: 1},
    { id: 4, name: 'shep', managerId: 2},
    { id: 3, name: 'curly', managerId: 1},
    { id: 5, name: 'groucho', managerId: 3},
    { id: 6, name: 'harpo', managerId: 5},
    { id: 8, name: 'shep Jr.', managerId: 4},
    { id: 99, name: 'lucy', managerId: 1}
  ];


const findEmployeeByName = (name, employees) => {
        return employees.find(person => person.name === name)
    }


const findManagerFor = (employee, employees) => {
    const manager = employees.find(manager => manager.id === employee.managerId)
    if (manager === undefined) {
        return employee
    } else {
        return manager
    }
}


const findCoworkersFor = (employee, employees) => {
    return employees.filter(coworker => employee.managerId === coworker.managerId && employee.id !== coworker.id)
}

const findManagementChainForEmployee = (employee, employees) => {
    let reports = []
    let manager = findManagerFor(employee, employees)
    if (employee === manager) {
        return []
    } else {
        let upperManagement = findManagementChainForEmployee(manager, employees)
        reports.push(...upperManagement, manager)
    }
    return reports
}

console.log('**********************')
console.log(findManagementChainForEmployee(findEmployeeByName('shep Jr.', employees), employees));
console.log('**********************')

//given a list of employees, generate a tree like structure for the employees, starting with the employee who has no manager. Each employee will have a reports property which is an array of the employees who report directly to them.


const generateManagementTree = (employees) => {
    let master = null
    for (let i = 0; i < employees.length; i++) {
        const employee = employees[i];
        let manager = findManagerFor(employee, employees)
        if (employee === manager) {
            master = manager
        } else if (manager.reports) {
            manager.reports.push(employee)
        } else {
            manager.reports = []
            manager.reports.push(employee)
        }
    }
    return master
}


console.log(JSON.stringify(generateManagementTree(employees), null, 2));

// const employees = [
//     { id: 1, name: 'moe'},
//     { id: 2, name: 'larry', managerId: 1},
//     { id: 4, name: 'shep', managerId: 2},
//     { id: 3, name: 'curly', managerId: 1},
//     { id: 5, name: 'groucho', managerId: 3},
//     { id: 6, name: 'harpo', managerId: 5},
//     { id: 8, name: 'shep Jr.', managerId: 4},
//     { id: 99, name: 'lucy', managerId: 1}
//   ];
console.log('***************************')
//given a tree of employees, generate a display which displays the hierarchy
// const displayManagementTree = (tree) => {
// let result = ''
// for (key in tree) {
//     let current = tree[key]
//     if (key === 'name') result += current
//     if (Array.isArray(current)) {
//         console.log(current)
//     }
// }
// return result
// }

const displayManagementTree = (tree) => {
    let result = ''
Object.entries(tree).forEach(pair => {
    if (pair[0] === 'name') console.log(pair[1])
    if (Array.isArray(pair[1])) {
        pair[1].forEach(item => displayManagementTree(item))
    }
})
    return result
}


console.log(displayManagementTree(generateManagementTree(employees)))/*
moe
-larry
--shep
---shep Jr.
-curly
--groucho
---harpo
-lucy
*/
