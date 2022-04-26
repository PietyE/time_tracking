import  { createContext } from 'react'

export const EmployeesMainComponentContext = createContext({selected: null, onItemClick: () => {}});