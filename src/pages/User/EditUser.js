import React, { useContext } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { AuthContext } from '../../firebase/Auth';
import { createUser } from '../../firebase';

export const EditUser = () => {
    const { currentUser } = useContext(AuthContext)
    const { uuid } = useParams();

    if (!!!currentUser) {
        return <Navigate to="/login" replace />
    }

    const handleEdit = async() => {
        // var data = {
        //     "email": "name@example.com",
        //     "emailVerified": true,
        //     "phoneNumber": "+15551212",
        //     "password": "randomPW",
        //     "displayName": "User Name",
        //     "disabled": false,
        //     "sponsor": "Extra Payload #1 (optional)",
        //     "study": "Extra Payload #2 (optional)"
        // };
        // createUser( data ).then(function (result) {
        //     // Read result of the Cloud Function.
        //     console.log(result.data)
        // });
        alert('edit')
    }

    return (
        <>
            <h1>UUID do usuário { uuid }</h1>
            <button onClick={handleEdit}>editar</button>
        </>
    )
}
