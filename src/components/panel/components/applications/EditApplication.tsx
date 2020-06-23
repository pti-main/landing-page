import React from 'react';
import { useParams, useHistory } from 'react-router-dom';

const EditApplication = ({ applications }:any) => {
    const { id:ApplicationId } = useParams();
    const history = useHistory();

    let a = applications.find((p:any) => p._id === ApplicationId);
    if (!a)
        history.push('/404');

    return (
        <div>{ JSON.stringify(a) }</div>
    );
}

export default EditApplication;