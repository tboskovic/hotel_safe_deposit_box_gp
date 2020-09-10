import React from 'react';

function NumberKeypad({enterPassCode, lockTheDoor, unlockTheDoor}) {
    

    const renderKeypadKeys = () => {
        const keypad = [];
        for (let i = 3; i > 0; i--) {
                keypad.push(<div key={i*3-2} onClick={() => enterPassCode(i*3-2)} className="number_keypad__key">{i*3-2}</div>)   
                keypad.push(<div key={i*3-1} onClick={() => enterPassCode(i*3-1)} className="number_keypad__key">{i*3-1}</div>)   
                keypad.push(<div key={i*3} onClick={() => enterPassCode(i*3)} className="number_keypad__key">{i*3}</div>)   
            }
        keypad.push(<div key={'*'} onClick={() => enterPassCode('*')} className="number_keypad__key">*</div>)   
        keypad.push(<div key={0} onClick={() => enterPassCode(0)} className="number_keypad__key">0</div>)   
        keypad.push(<div key={'L'} onClick={() => lockTheDoor()} className="number_keypad__key">L</div>)   
        
        return keypad;
    };

    return (
        <div className="number_keypad">
            {renderKeypadKeys()}
        </div>
    )
};

export default NumberKeypad;
