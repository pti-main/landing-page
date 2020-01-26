import React, { useEffect, useState } from 'react';

const SelectedProfile = (props:any) => {
  const [ loaded, setLoaded ] = useState(false);
  useEffect(() => {
    setTimeout(() => setLoaded(true), 0);
  }, []);
  return (
      <div className={`info ${(loaded) ? "show" : null}`}>Aplikujesz na profil: <span className="link">{props.profile}</span></div>
  );
}

export default SelectedProfile;