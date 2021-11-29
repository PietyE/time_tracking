import React, {useCallback, useEffect, useState} from 'react'
import {Modal} from 'react-bootstrap'
import TeamMemberItem from './TeamMemberItem'
import TeamInput from './TeamInput'
import {
    getProjectManagerListSelector,
    getAllProjectsSelector,
    getTeamMListSelector, getUsersSelector
} from '../../../reducers/projects-management'
import {createProject, setShowCreateModal} from '../../../actions/projects-management'
import {Field, Form, Formik} from 'formik'
import {useDispatch, useSelector} from 'react-redux'
import {isEqual} from 'lodash'
import Cross from "../../../images/ic_cros.svg"
import TeamM from "../../common/team-m/TeamM";
import Plus from "../../ui/plus";
import AddSelectedM from "../../common/AddSelectedM/AddSelectedM";
import {setDevelopers} from "../../../actions/developers";
import {getDevelopersSelector} from "../../../selectors/developers";

function CreateProjectModal2({show}) {
    const dispatch = useDispatch()

    const projectManagers = useSelector(getProjectManagerListSelector, isEqual)

    const projectTeamM = useSelector(getUsersSelector);
    const users = useSelector(getDevelopersSelector)

    const projects = useSelector(getAllProjectsSelector, isEqual)

    const [addUser, setAddUser]=useState(true);

    const [teamM, setTeamM]= useState(users)

    useEffect(()=>{

    },[teamM])

    console.log('Team M', teamM);

    const showEmployees = (employees)=>{
        setAddUser(!addUser);
        setTeamM(employees);
    }

    const showManagers=()=>{
        showEmployees(projectManagers)
    }

    const showTeamM=()=>{
        showEmployees(teamM);
    }



    const _createProject = useCallback(
        (data) => {
            dispatch(createProject(data))
        },
        [dispatch],
    )
    // const _setShowCreateModal = useCallback(
    //   () => {
    //     dispatch(setShowCreateModal(false))
    //   },
    //   [dispatch],
    // )

    const handleClose = () => dispatch(setShowCreateModal(false))

    const checkExistingProjects = data => {
        return projects.find(project => project.name === data)
    }

    const onSubmit = (values) => {
        const {projectName, projectManager} = values

        if (!!projectName && !checkExistingProjects(projectName)) {
            let users = values.team

            if (!!values.projectManager.name) {
                const preparedPm = projectManager
                const currentProjectManager = projectManagers.find(pm => pm.name === values.projectManager?.name)
                preparedPm.user_id = currentProjectManager.id
                users = [...values.team, preparedPm]
            }

            const preparedData = {
                projectName: projectName,
                users: users,
            }
            _createProject(preparedData)
            handleClose()
        }
    }
    const pmInitialValue = {
        name: '',
        user_id: '',
        is_full_time: true,
    }
    const initialValues = {
        projectName: '',
        team: [],
        projectManager: pmInitialValue,
    }

    return (
        <Modal
            show={show}
            onHide={handleClose}
            backdrop={false}
            centered={true}
            className='pm_page_modal'
            id='pm-modal'

        >
            <Modal.Header className='pm_modal_header'>
                <Modal.Title>Create a new project</Modal.Title>
                <span className="close" onClick={handleClose}><img src={Cross} atl={'cross'}/></span>
            </Modal.Header>
            <Modal.Body>
                <Formik
                    initialValues={initialValues}
                    // validationSchema={validationSchema}
                    onSubmit={onSubmit}
                >
                    {({values, setFieldValue}) => {
                        const freeProjectManagers = projectManagers.filter(pm => pm.name !== values?.projectManager?.name)
                        return (
                            (
                                <div className="pm_create_modal_form">
                                    <div className="form-container container">
                                        <div className="row">
                                            <div className="input-cont col-8">
                                                <label htmlFor="">Project name</label>
                                                <input className='project-input' placeholder='Vilmate Internal'
                                                       type="text"/>
                                            </div>
                                            <div className="input-cont col-4">
                                                <label htmlFor="">Estimated hours</label>
                                                <input placeholder='0h 0m' type="text"/>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="input-cont col-12">
                                                <label htmlFor="">Description</label>
                                                <input type="text" placeholder='Paste a link to your documentation'/>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="input-cont col-6">
                                                <label htmlFor="">Client name</label>
                                                <input className='project-input' placeholder='Chris Tra' type="text"/>
                                            </div>
                                            <div className="input-cont col-6">
                                                <label htmlFor="">Client email</label>
                                                <input placeholder='example@mail.com' type="text"/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="team-container input-cont">
                                        <label htmlFor="">
                                            Project manager
                                        </label>
                                        <Plus isActive={true} showUList={showManagers}/>
                                        <TeamM/>
                                    </div>
                                    <div className="team-container input-cont">
                                        <label htmlFor="">
                                            Team
                                        </label>
                                        <Plus isActive={true} showUList={showTeamM}/>
                                        <TeamM/>
                                        <TeamM/>
                                    </div>
                                    <button className="pm_create_modal_form-submit">
                                        Create the project
                                    </button>
                                    {
                                        addUser&&<AddSelectedM teamM={teamM}/>
                                    }
                                </div>
                            )
                        )
                    }
                    }
                </Formik>
            </Modal.Body>
        </Modal>
    )
}

export default CreateProjectModal2
