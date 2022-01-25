import React, {useCallback, useEffect, useState} from 'react'
import {Modal} from 'react-bootstrap'
import {
    getProjectManagerListSelector,
    getAllProjectsSelector,
    getUsersSelector
} from '../../../reducers/projects-management'
import {createProject, setShowCreateModal} from '../../../actions/projects-management'
import {useFormik} from 'formik'
import {useDispatch, useSelector} from 'react-redux'
import {isEqual} from 'lodash'
import Cross from "../../../images/ic_cros.svg"
import * as Yup from "yup";


function CreateProjectModal3({ show}) {
    const dispatch = useDispatch();

    const handleClose = () => dispatch(setShowCreateModal(false))

    const validationSchema = Yup.object().shape({
        project_name: Yup.string()
            .min(2, 'Too Short!')
            .max(50, 'Too Long!')
            .required('Required'),
    });
    const onSubmit = (values) => {
        console.log('values', values);
    }

    const initialValues = {
        project_name: '',

    }
    const formik = useFormik({
        initialValues,
        onSubmit: values => {
            onSubmit( values)
        },
        validationSchema,
    })


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
                <form onSubmit={formik.handleSubmit} className="pm_create_modal_form">
                                    <div className="form-container container">
                                        <div className="row">
                                            <div className="input-cont col-12">
                                                <label htmlFor="">Project name</label>
                                                <input className='project-input'
                                                       name='project_name'
                                                       onChange={formik.handleChange}
                                                       value={formik.values.project_name}
                                                       placeholder='Vilmate Internal'
                                                       type="text"/>
                                                {formik.touched.project_name && formik.errors.project_name ?
                                                    <div className={'error'}>{ formik.errors.project_name }</div> : null }
                                            </div>
                                        </div>
                                    </div>
                                    <button type="submit" className="pm_create_modal_form-submit">
                                        Create the project
                                    </button>
                                </form>
            </Modal.Body>
        </Modal>
    )
}

export default CreateProjectModal3
