import React from "react";

import { useLocation } from 'react-router-dom';


export default function PatientSuccess() {
    const location = useLocation();  // Hook to access the current location
    const { code } = location.state || {};  // Extract the name from state
    return (
        <div className="col-8 is-centered bg-gray p-2">
            <h1>Tell Your Doctor this Code: </h1>
            <h2>{code}</h2>
        </div>
    );
}
