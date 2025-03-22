import React from 'react';
import { useForm } from 'react-hook-form';
import { FormRules } from './form';


export default function PatientSurvey() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => console.log(data);
    console.log(errors);

    return (
        <div>

            <h1 className='text-large text-dark' style={{ fontSize: '80px' }}>Patient Survey</h1>

            <form className="form_group col-12" onSubmit={handleSubmit(onSubmit)}>
                <input className='form-input mb-2 col-12' type="text" placeholder="Name" {...register("Name", FormRules.Name)} />
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
                <textarea className='form-input mb-2' type="text" placeholder="Problems Experienced" {...register("Problems", FormRules.Problems)} />

                <input className='form-input mb-2' type="submit" />
            </form>
        </div>
    );
}
