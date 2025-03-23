import React from "react";

import { useLocation } from 'react-router-dom';


export default function PatientSuccess() {
    const location = useLocation();  // Hook to access the current location
    const { code } = location.state || {};  // Extract the name from state
    return (
        <div className="col-8 is-centered p-6 card rounded-lg text-center" style={{ backgroundColor: '#96d0ee' }}>
            <h1 className="text-center">Tell Your Doctor this Code: </h1>
            <h2>{code}</h2>
        </div>
    );
}
