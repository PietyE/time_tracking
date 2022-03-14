import React, { createContext } from 'react'

export const ProjectReportContext = createContext({selected: null, onItemClick: () => {}});