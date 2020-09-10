import React from 'react';

function BacklitScreen({statusMsg, passCode, secretMasterCode, isLocked, lightOn}) {
    return (
        <div className={"backlit_screen " + (lightOn ? "backlit_screen--light_on" : "")}>
            <div className="backlit_screen__is_locked">{!!isLocked ? 'Locked' : 'Unlocked'}</div>
            <div className="backlit_screen__status_msg">{passCode ? !!secretMasterCode ? secretMasterCode : passCode : statusMsg}</div>            
        </div>
    )
};

export default BacklitScreen;
