import React from 'react';
import { useForm } from 'react-hook-form';
import { FormRules } from './form';
import { nanoid } from 'nanoid';

import { useNavigate } from 'react-router-dom';

export default function PatientSurvey() {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = (data) => {
        const code = nanoid(6);
        data.Code = code;
        //send post request to server
        console.log(data);
        navigate('/patient/success', { state: { code: code } });
    };

    console.log(errors);

    return (
        <div className='col-8 is-centered'>
            <h1 className='text-large text-dark' style={{ fontSize: '80px' }}>Patient Survey</h1>

            <form className="form_group col-12 text-center " onSubmit={handleSubmit(onSubmit)}>
                <input className='form-input mb-2 ' type="text" placeholder="Name" {...register("Name", FormRules.Name)} />
                <input className='form-input mb-2' type="number" placeholder="Age" {...register("Age", FormRules.Age)} />
                <select className='form-select mb-2' {...register("Gender", FormRules.Gender)}>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                </select>
                <select className='form-select mb-2' {...register("Race", FormRules.Race)}>
                    <option value="Black">Black</option>
                    <option value="Middle Eastern">Middle Eastern</option>
                    <option value="East Asian">East Asian</option>
                    <option value="South Asian">South Asian</option>
                    <option value="Caucasian">Caucasian</option>
                    <option value="Hispanic">Hispanic</option>
                    <option value="Indegenous">Indegenous</option>
                </select>
                <textarea className='form-input mb-2' placeholder="Problems Experienced" {...register("Problems", FormRules.Problems)} />

                <input className='form-input mb-2' type="submit" />
            </form>
        </div>
    );
}

