import {
  CHANGE_SELECTED_DATE_TIME_REPORT,
  SET_TIME_REPORTS,
  SELECT_PROJECT,
  SET_IS_FETCHING_REPORTS,
  SELECT_DEVELOPERS,
  CLEAR_SELECTED_PROJECT,
  RESET_SELECTED_DATE,
  SET_EDIT_MODE,
  SET_STATUS_USER   
} from 'constants/actions-constant'

const todayDate = new Date()

const initialState = {
  selectedDate: {
    month: todayDate.getMonth(),
    year: todayDate.getFullYear(),
  },
  reports: {
    items: null,
  },
  selectedProject: {},
  selectDays:[
      {id:1, name:'Show empty days'},
      {id:2, name:'Hide empty days'},
  ],
  selctedDay:{id:3, name:'Show all days'},
  selectDayStatus:[
    {id:1, name:"Worked on", iconColor:'#009C98'},
    {id:2, name:"Was away", iconColor:'#F84242'},
    {id:3, name:"Was ill", iconColor:'#1864D6'},
    {id:4, name:"Had a rest", iconColor:'#C416C8'},
    {id:5, name:"Vacation", iconColor:'#E08B0A'},
  ],
  selectedDayStatus: {id:1, name:"Worked on", iconColor:'#009C98'},
  selectedDeveloper: null,
  idEditingWorkItem: null,
  isFetchingReports: false,
}
export const timereports = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_SELECTED_DATE_TIME_REPORT:
      return { ...state, selectedDate: action.payload }
    case SET_TIME_REPORTS:
      return { ...state, reports: action.payload }
    case SELECT_PROJECT:
      return { ...state, selectedProject: action.payload }
    case CLEAR_SELECTED_PROJECT:
      return {
        ...state,
        selectedProject: initialState.selectedProject,
        reports: [],
      }
    case SELECT_DEVELOPERS:
      return {
        ...state,
        selectedDeveloper: action.payload,
        selectedProject: initialState.selectedProject,
        reports: [],
      }
    case  SET_STATUS_USER:
      return {
        ...state,
        selectedDayStatus:action.payload
      }
    case SET_IS_FETCHING_REPORTS:
      return { ...state, isFetchingReports: action.payload }
    case RESET_SELECTED_DATE:
      return { ...state, selectedDate: initialState.selectedDate }
    case SET_EDIT_MODE:
      return { ...state, idEditingWorkItem: action.payload }
    default:
      return state
  }
}
