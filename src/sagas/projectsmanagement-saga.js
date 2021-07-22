import { all, call, takeEvery, put, select } from 'redux-saga/effects'
import Api from 'utils/api'

import {
  GET_ALL_PROJECTS, GET_SELECTED_PROJECT, GET_USERS, SET_USERS,GET_USER_INFO_BY_PROJECT,
} from 'constants/actions-constant'
import { setAllProjects, setUsers,setProjectsWithReport } from '../actions/projects-management'



export function* getAllProjects() {
  const URL_PROJECTS = `projects/`
  const { data } = yield call([Api, 'getAllProjects'], URL_PROJECTS)
  yield put(setAllProjects(data))
}
//////////////
export function* getUsersInfoByProject() {
  const projects = yield select(
    (state) => state.projectsManagement.projects
  )
  const { month, year } = yield select(
    (state) => state.projectsManagement.selectedDateForPM
  )
  const tempProj = projects.slice(8,9)
  const projectsReport = yield all(tempProj.map(project => {
  // const projectsReport = yield all(projects.map(project => {
    const URL=`developer-projects/report/${year}/${month}/?project_id=${project.id}`
    return call([Api, 'getSelectedProject'], URL)
  }));
  console.log('projectsReport', projectsReport)

  const result = projectsReport.map(el=>{
      const usersReport = el.data.map(el=>({
      projectId: el.project.id,
      userId: el.user.id,
      userName: el.user.name,
      hours: el.hours,
      is_fulltime: el.is_fulltime,
      })
    )
    
    //мутно, надо переделать
return {projectId: el?.data[0]?.project.id,
  users: usersReport,
};
    }
  )
  yield put(setProjectsWithReport(result))

}

// TODO: read that:
// ALL OF THAT BOTTOM PART IS NO MORE NEEDED IF THE BACK_END
// IS UPDATED WITH NEW ENDPOINTS FOR PROJECTS MANAGEMENT SCREEN
// SO U CAN JUST REMOVE IT
// I LEFT IT FOR BEING ON THE SAFE_SIDE


// export function* getProjectDetails() {
//   const projects = yield select(
//     (state) => state.projectsManagement.projects
//   )
//   const users = yield select(
//     (state) => state.projectsManagement.users
//   )
//
//   const result = yield all(projects.map(proj => {
//     const URL = `developer-projects/?project_id=${proj.id}`
//     return call([Api, 'getSelectedProject'], URL)
//   }));
//
//   const reducedToDATA = result.reduce((acc, cur) => {
//     const data = { data: cur.data }
//     return [...acc, data]
//   }, [])
//
//   const simplifiedProjDetails = reducedToDATA.reduce((acc, cur) => {
//     const projectId = cur.data.reduce((a, c) => {
//       // since c.project.id consist of the same ids (from one same project) we return only one proj id
//       return c.project.id
//     }, '')
//
//     const devProjectId = cur.data.reduce((a, c) => {
//       return c.id
//     }, '')
//
//     const userIds = cur.data.reduce((prev, curr) => {
//       return [...prev, curr.user]
//     }, [])
//
//     return [...acc,  { userIds, projectId, devProjectId }  ]
//     }, [])
//
//   const projectsWithUserIds = projects.reduce((prevProj, curProj) => {
//     const neededProj = simplifiedProjDetails.find(prDet => prDet.projectId === curProj.id)
//
//     const newR = {
//       ...curProj,
//       userIds: neededProj.userIds,
//       devProjectId: neededProj.devProjectId,
//       // you can uncomment out this string to ensure that ids are the same
//       // projectId: neededProj.projectId
//     }
//     return [...prevProj, newR]
//   }, [])
//   console.log('projectsWithUserIds >', projectsWithUserIds)
//
//   if (users) {
//     console.log('users >', users)
//
//     // const usersOnChosenProject = users.filter(us => data.some(dat => dat.user === us.id))
//     const usersOnChosenProject =
//       // projectsWithUserIds.map(proj => {
//       //   users.filter(us =>
//       //     projectsWithUserIds.filter(dat =>
//       //       dat.userIds.every(id => id === us.id)))
//       // })
//       projectsWithUserIds.reduce((prevProjects, curProject) => {
//         // console.log('curProject >', curProject)
//         const iii = users.filter(us => {
//           const ppp =
//             us.developer_projects.some(dev_pr => {
//               // console.log('dev_pr >', dev_pr)
//             const oo = dev_pr.id === curProject.devProjectId
//             return oo
//           })
//           return ppp
//         })
//         console.log('iii >', iii)
//
//         return [...prevProjects]
//       },[])
//     //
//     //
//     // const totalHours = usersOnChosenProject.reduce((acc, cur) => {
//     //   const devProj = cur.developer_projects.find(proj => data.some(d => d.id === proj.id))
//     //   console.log('devProj >', devProj)
//     //
//     //   return acc + devProj.working_fulltime + devProj.working_parttime
//     // }, 0)
//     // console.log('totalHours >', totalHours)
//   }
//
//
//   // yield put(setAllProjects(data))
// }
//
// export function* getUsers() {
//   try {
//     const { month, year } = yield select(
//       (state) => state.projectsManagement.selectedDateForPM
//     )
//     const searchDeveloperParam = ''
//     let URL_DEVELOPER_PROJECT = `developer-projects/consolidated-report-by-user/${year}/${
//       month + 1
//     }/?search=${searchDeveloperParam}`
//
//     const {data} = yield call([Api, 'consolidateReportApi'], URL_DEVELOPER_PROJECT)
//     yield put(setUsers(data.users))
//   } finally {
//    // TODO: sett loading status to false
//   }
// }
//
// export function* getSelectedProject ({ payload: id }) {
//   const URL = `developer-projects/?project_id=${id}`
//
//   const {data} = yield call([Api, 'getSelectedProject'], URL)
//
//   // const users = yield select(
//   //   (state) => state.projectsManagement.users
//   // )
//
//    console.log('data >', data)
//
//   // if (users) {
//   //   // const nnn = users.filter(us => found.some(f => f.id === us.id))
//   //   // console.log('nnn >', nnn)
//   //
//   //   const usersOnChosenProject = users.filter(us => data.some(dat => dat.user === us.id))
//   //
//   //   console.log('oops >', usersOnChosenProject)
//   //
//   //
//   //   const totalHours = usersOnChosenProject.reduce((acc, cur) => {
//   //     const devProj = cur.developer_projects.find(proj => data.some(d => d.id === proj.id))
//   //     console.log('devProj >', devProj)
//   //
//   //     return acc + devProj.working_fulltime + devProj.working_parttime
//   //   }, 0)
//   //   console.log('totalHours >', totalHours)
//   // }
//
//
//   // const users2 = yield select(
//   //   (state) => state.projectsReport.reports.users
//   // )
//   //
//
//   // data.id === developer_project.id
//
//   // if (users) {
//   //   // const zzz = users.filter(user => data.includes(user.id))
//   //   const zzz = users.map(user => {
//   //     // console.log('user >', user)
//   //     const uuu = user.developer_projects.includes(data.id)
//   //     const ttt = data.some(pr => {
//   //       // console.log('pr data every>', pr)
//   //       return user.developer_projects.includes(pr.id)
//   //     })
//   //     const ooo = user.developer_projects.some(pr => {
//   //       // console.log('pr developer_projects every>', pr)
//   //       return data.includes(pr.id)
//   //     })
//   //     // console.log('ttt >', ttt)
//   //     // console.log('ooo >', ooo)
//   //     // console.log('uuu >', uuu)
//   //     return uuu
//   //   })
//   //   // console.log('zzz >', zzz)
//   // } else {
//   //   // yield getUsers()
//   // }
//
//
//   // yield put(setSelectedProject(data))
// }

export function* watchProjectsManagement() {
  yield takeEvery(
    [GET_ALL_PROJECTS],
    getAllProjects
  )
  yield  takeEvery(
    [GET_USER_INFO_BY_PROJECT],
    getUsersInfoByProject
  )
  // yield takeEvery(
  //   [GET_SELECTED_PROJECT],
  //   getSelectedProject
  // )
  // yield takeEvery(
  //   // [GET_USERS, CHANGE_SELECTED_DATE_PROJECTS_MANAGEMENT],
  //   [GET_USERS],
  //   getUsers
  // )
  // yield takeEvery(
  //   [SET_USERS],
  //   getProjectDetails
  // )
}
