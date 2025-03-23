import React, { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { FormRules } from './form';
import { nanoid } from 'nanoid';
import { useNavigate } from 'react-router-dom';

export default function PatientSurvey() {
  const navigate = useNavigate();
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const [listening, setListening] = useState(false);
  const recognitionRef = useRef<any>(null);

  const onSubmit = (data: any) => {
    const code = nanoid(6);
    data.Code = code;
    console.log(data);
    navigate('/patient/success', { state: { code: code } });
  };

  const startListening = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert('Speech recognition not supported in this browser.');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => setListening(true);

    recognition.onresult = (event: any) => {
      const spokenText = event.results[0][0].transcript;
      setValue("Problems", spokenText); // Set the form field value
    };

    recognition.onend = () => setListening(false);

    recognition.onerror = (event: any) => {
      console.error('Speech recognition error:', event.error);
      setListening(false);
    };

    recognition.start();
    recognitionRef.current = recognition;
  };

  return (
    <div className='col-8 is-centered'>
      <h1 className='text-large text-dark' style={{ fontSize: '80px' }}>Patient Survey</h1>

      <form className="form_group col-12 text-center" onSubmit={handleSubmit(onSubmit)}>
        <input className='form-input mb-2' type="text" placeholder="Name" {...register("Name", FormRules.Name)} />
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

        <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <textarea
            className='form-input mb-2'
            placeholder="Problems Experienced"
            {...register("Problems", FormRules.Problems)}
            style={{ width: '100%', minHeight: '100px' }}
          />
          <button
            type="button"
            onClick={startListening}
            style={{
              position: 'absolute',
              right: '10px',
              bottom: '10px',
              backgroundColor: listening ? '#ff9f1c' : '#e0e0e0',
              border: 'none',
              borderRadius: '50%',
              width: '40px',
              height: '40px',
              fontSize: '20px',
              cursor: 'pointer',
            }}
            title="Speak your symptoms"
          >
            🎤
          </button>
        </div>

        <input className='form-input mb-2' type="submit" />
      </form>
    </div>
  );
}