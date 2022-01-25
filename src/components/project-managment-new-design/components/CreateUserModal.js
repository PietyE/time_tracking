import React, {useCallback, useState} from 'react'
import {Modal} from 'react-bootstrap'
import {
    getProjectManagerListSelector,
    getAllProjectsSelector,
} from '../../../reducers/projects-management'
import {createProject, setShowCreateModal, setShowCreateUserModal} from '../../../actions/projects-management'
import { useFormik } from 'formik';
import {useDispatch, useSelector} from 'react-redux'
import {isEqual} from 'lodash'
import Cross from "../../../images/ic_cros.svg"

import Plus from "../../ui/plus";
import AddSelectedM from "../../common/AddSelectedM/AddSelectedM";
import Select from "../../ui/select";
import useEqualSelector from "../../../custom-hook/useEqualSelector";
import * as Yup from 'yup';
import TrashGrayIc from "../../../images/trash_cray_ic.svg";

function CreateUserModal({show}) {
    const dispatch = useDispatch()

    const projectManagers = useEqualSelector(getProjectManagerListSelector)

    const projects = useSelector(getAllProjectsSelector, isEqual)
    const [addM, setAddM] = useState(false);
    const [addD, setAddD] = useState(false);

    const [teamM, setTeamM] = useState([]);

    const [addLocation, setAddLocation] = useState(false);

    const [checkedUsers, setCheckedUsers] = useState([]);

    const [selectedM, setSelectedM] = useState([]);
    const [selectedD, setSelectedD] = useState([]);

    const [selectedRole, setSelectedRole] = useState({});
    const [roleError, setRoleError] = useState('')


    let selectedPList = [];

    const roles = [
        {id: '1', name: 'Accountant'},
        {id: '2', name: 'Admin'},
        {id: '3', name: 'Project Manager'},
        {id: '4', name: 'Developer'}
    ];




    const addSelected = (e) => {
        e.preventDefault();
        if (addLocation) {
            setSelectedD(checkedUsers)
        } else {
            setSelectedM(checkedUsers)
        }
    }

    const deleteItem = (id) => {
        setSelectedM(selectedM.filter(e => e.id !== id));
        setSelectedD(selectedD.filter(e => e.id !== id));
    }


    selectedPList = selectedD.map((e, i) => {
        if (i<10) {
            return <p key={e.id} className={'users-project'}><span>{e.name}</span>
                <span><img className={'gray-trash'} onClick={()=>{deleteItem(e.id || e.user_id)}} src={TrashGrayIc} alt=""/></span></p>
        }
    });


    const closeAddUser = () => {
        setAddM(false)
        setAddD(false)
    }

    const showEmployees = (employees) => {
        setTeamM(employees);
    }


    const showTeamM = () => {
        showEmployees(projects);
        setAddLocation(true);
        setAddD(!addD);
    }

    const _createProject = useCallback(
        (data) => {
            dispatch(createProject(data))
        },
        [dispatch],
    )

    const handleClose = () => dispatch(setShowCreateUserModal(false))

    const checkExistingProjects = data => {
        return projects.find(project => project.name === data)
    }

    const onSelectRole = (data) => {
        setSelectedRole(data)
    }


    const onSubmit = (values) => {
        if (!selectedRole?.name) {
            setRoleError('Select role please');
        }else{
            values.role = selectedRole.name
            console.log('values', values);
        }
    }

    const initialValues = {
        user_name: '',
        email: '',
        role:'',
        salary: '',
        rate: ''
    }



    const validationSchema = Yup.object().shape({
        user_name: Yup.string()
            .min(2, 'Too Short!')
            .max(50, 'Too Long!')
            .required('Required'),
        email: Yup.string()
            .email('Invalid email')
            .required('Required'),
    });


    const formik = useFormik({
        initialValues,
        onSubmit: values => {
            onSubmit( values)
        },
        validationSchema,
    })

    let {handleChange, values} =formik;

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
                <Modal.Title>Create a new user</Modal.Title>
                <span className="close" onClick={handleClose}><img src={Cross} atl={'cross'}/></span>
            </Modal.Header>
            <Modal.Body>
                <form  onSubmit={formik.handleSubmit} className="pm_create_modal_form">
                    <div className="form-container container" onClick={closeAddUser}>
                        <div className="row">
                            <div className="input-cont col-6">
                                <label htmlFor="">User name</label>
                                <input className='project-input'
                                       onChange={handleChange}
                                       name='user_name'
                                       value={values.user_name}
                                       placeholder='User name'/>
                                {formik.touched.user_name && formik.errors.user_name ?
                                    <div className={'error'}>{ formik.errors.user_name }</div> : null }
                            </div>
                            <div className="input-cont col-6">
                                <label htmlFor="">Position</label>
                                <Select
                                    title="Choose position"
                                    listItems={roles}
                                    onSelected={onSelectRole}
                                    valueKey="name"
                                    idKey="id"
                                    extraClassContainer={'new-position'}
                                    initialChoice={selectedRole}
                                />
                                <div className={'error'}>{ roleError!==''?roleError:''}</div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-cont col-12">
                                <label htmlFor="">Email</label>
                                <input type="email" name={'email'}
                                       onChange={handleChange}
                                       value={values.email}
                                       placeholder='example@mail.com'/>
                                {formik.touched.email && formik.errors.email ? <div className={'error'}>{ formik.errors.email }</div> : null }
                            </div>
                        </div>
                    </div>
                    <div className="team-container input-cont">
                        <label htmlFor="">
                            Choose project
                        </label>
                        <Plus isActive={addD}
                              showUList={showTeamM}
                        />
                        {selectedPList}
                    </div>
                    <button type="submit" className="pm_create_modal_form-submit">
                        Create the user
                    </button>
                    {
                        (addM || addD) && <AddSelectedM
                            teamM={teamM}
                            location={addLocation}
                            checkedUsers={checkedUsers}
                            setCheckedUsers={setCheckedUsers}
                            addSelected={addSelected}
                            closeAddUser={closeAddUser}
                            customClass={'new-user-project'}
                        />
                    }
                </form>
            </Modal.Body>
        </Modal>
    )
}

export default CreateUserModal
