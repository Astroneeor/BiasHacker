import React, { useState, useRef, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { FormRules } from './form';
import { nanoid } from 'nanoid';
import { useNavigate } from 'react-router-dom';

export default function PatientSurvey() {
    const navigate = useNavigate();
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
    const [listening, setListening] = useState(false);
    const [transcribingText, setTranscribingText] = useState('Click to speak');
    const [darkMode, setDarkMode] = useState(false);
    const recognitionRef = useRef<any>(null);
    const pastelBlue = '#A4D3F5';
    const darkBg = '#121212';
    const darkText = '#e0e0e0';

    const onSubmit = (data: Patient) => {
        const code = nanoid(6);
        data.code = code;
        console.log(data);
        navigate('/patient/success', { state: { code: code } });

        fetch('http://127.0.0.1:5000/predict', { //change this for each computer
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)  // Convert the Patient object into JSON string
          })
          .then(response => {
            if (!response.bias) {
              throw new Error('Failed to save patient');
            }
            return response.json();  // Parse the response JSON
          })
          .then(data => {
            console.log('Patient saved successfully:', data);
          })
          .catch(error => {
            console.error('Error:', error);
          });

    };

    const toggleDarkMode = () => setDarkMode(prev => !prev);

    useEffect(() => {
        setTranscribingText(listening ? 'Listening...' : 'Click to speak');
        document.body.style.background = darkMode ? darkBg : '#ffffff';
        document.body.style.color = darkMode ? darkText : '#000000';
    }, [listening, darkMode]);

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
            setValue("Problems", spokenText);
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
        <div style={{
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            padding: '4rem 2rem', background: darkMode ? darkBg : '#ffffff', minHeight: '100vh',
            color: darkMode ? darkText : '#000000'
        }}>
            <button
                onClick={toggleDarkMode}
                style={{
                    position: 'absolute',
                    top: '20px',
                    right: '20px',
                    backgroundColor: darkMode ? '#333' : pastelBlue,
                    color: 'white',
                    border: 'none',
                    borderRadius: '20px',
                    padding: '10px 20px',
                    cursor: 'pointer',
                    fontWeight: 'bold',
                }}
            >
                {darkMode ? 'Light Mode' : 'Dark Mode'}
            </button>

            <header style={{ textAlign: 'center', marginBottom: '2rem', marginTop: '10rem' }}>
                <img src="/MainLogoHeyDoc.png" alt="HeyDoc Logo" style={{ height: '60px', marginBottom: '0.5rem' }} />
                <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: darkMode ? darkText : '#333', margin: 0 }}>Patient Survey</h1>
                <p style={{ fontSize: '1rem', color: darkMode ? '#aaa' : '#666' }}>Tell us about your experience</p>
            </header>

            <form onSubmit={handleSubmit(onSubmit)} style={{
                display: 'flex', flexDirection: 'column', gap: '1.2rem', width: '80vw', maxWidth: '1400px'
            }}>
                <input type="text" placeholder="Name" {...register("Name", FormRules.Name)} style={getInputStyle(darkMode)} />
                <input type="number" placeholder="Age" {...register("age", FormRules.age)} style={getInputStyle(darkMode)} />

                <select {...register("gender", FormRules.gender)} style={getInputStyle(darkMode)}>
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                </select>

                <select {...register("ethnicity", FormRules.ethnicity)} style={getInputStyle(darkMode)}>
                    <option value="">Select Race</option>
                    <option value="Black">Black</option>
                    <option value="Middle Eastern">Middle Eastern</option>
                    <option value="East Asian">East Asian</option>
                    <option value="South Asian">South Asian</option>
                    <option value="Caucasian">Caucasian</option>
                    <option value="Hispanic">Hispanic</option>
                    <option value="Indegenous">Indegenous</option>
                </select>

                <div style={{ position: 'relative' }}>
                    <textarea placeholder="Describe your problems or symptoms..." {...register("symptom_category", FormRules.symptom_category)}
                        style={{ ...getInputStyle(darkMode), minHeight: '120px', paddingRight: '60px' }}
                    />
                    <button type="button" onClick={startListening} disabled={listening} style={{
                        position: 'absolute', right: '10px', bottom: '10px', backgroundColor: pastelBlue,
                        border: 'none', borderRadius: '50%', width: '44px', height: '44px', fontSize: '20px',
                        cursor: listening ? 'not-allowed' : 'pointer',
                        boxShadow: listening ? `0 0 10px ${pastelBlue}` : 'none', display: 'flex',
                        justifyContent: 'center', alignItems: 'center', transition: 'all 0.2s ease'
                    }} title={transcribingText} aria-label={transcribingText}>
                        {listening ? (
                            <span style={{
                                width: '18px', height: '18px', border: '3px solid white',
                                borderTop: `3px solid ${pastelBlue}`, borderRadius: '50%',
                                animation: 'spin 1s linear infinite'
                            }} />
                        ) : '🎤'}
                    </button>
                </div>

                <input type="submit" value="Submit Survey" style={{
                    backgroundColor: pastelBlue, color: 'white', border: 'none', borderRadius: '12px',
                    padding: '0.75rem 1.5rem', fontSize: '1rem', fontWeight: 'bold', cursor: 'pointer',
                    transition: 'background-color 0.2s ease', alignSelf: 'center',
                    boxShadow: '0 0 10px rgba(164, 211, 245, 0.6)'
                }} onMouseOver={e => (e.currentTarget.style.opacity = '0.85')}
                    onMouseOut={e => (e.currentTarget.style.opacity = '1')} />
            </form>

            <style>
                {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
            </style>
        </div>
    );
}

const getInputStyle = (darkMode: boolean): React.CSSProperties => ({
    padding: '1rem',
    borderRadius: '12px',
    border: '1px solid #ccc',
    fontSize: '1rem',
    outline: 'none',
    width: '100%',
    boxSizing: 'border-box',
    backgroundColor: darkMode ? '#1e1e1e' : 'white',
    color: darkMode ? '#e0e0e0' : '#000000',
    transition: 'border-color 0.2s ease'
});
