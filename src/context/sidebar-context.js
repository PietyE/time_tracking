import React, { createContext } from 'react'

export const SidebarContext = createContext({selected: null, onItemClick: () => {}});
