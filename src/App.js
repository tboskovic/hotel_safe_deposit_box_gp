import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import bcrypt from 'bcryptjs';

import { BacklitScreen, NumberKeypad } from './components';

import { checkSecretMasterCode } from './actions/ForgetCodeAction';

import './App.scss';

function App(handler, element = window) {
  const [statusMsg, setStatusMsg] = useState('Ready');
  const [passCode, setPassCode] = useState('');
  const [isLocked, setIsLocked] = useState(false);
  const [hashedCode, sethashedCode] = useState('');
  const [lightOn, setLightOn] = useState(false);
  const [unlock, setUnlock] = useState(false);
  const [unlockWithSMC, setUnlockWithSMC] = useState(false);
  const [lightInterval, setLightInterval] = useState(null);
  const [delayInterval, setDelayInterval] = useState(null);
  const [msgInterval, setMsgInterval] = useState(null);
  const [allowSecretMasterCode, setallowSecretMasterCode] = useState(false);
  const [secretMasterCode, setSecretMasterCode] = useState('');
  
  const dispatch = useDispatch();
  const isCodeCorrect = useSelector(state => state.forgetCode.isCodeCorrect);

  useEffect(() => {
    const localStorageCode = localStorage.getItem('code');
    if(!!localStorageCode) {
      setIsLocked(true);
      sethashedCode(localStorageCode);
    }; 
    return () => {
      clearTimeout(lightInterval);
      clearTimeout(delayInterval);
      clearTimeout(msgInterval);
    }
  }, []);

  useEffect(() => {
    if(!!unlock) {
    
        unlockTheDoor();
      
      }
    if(!!unlockWithSMC) {
        
        unlockWithSecretMasterCode();
    
      }
  }, [unlock, unlockWithSMC])

  const enterPassCode = (character) => {
    
    clearTimeout(msgInterval);
    clearTimeout(lightInterval);

    setLightOn(true);
    setLightInterval(
      setTimeout(() => { 
        setLightOn(false);
        setPassCode('');
        setStatusMsg('Ready') }, 5000));

    if(!isLocked) {
      
      if(character !== '*'){
        if(passCode.length < 6 ) {
    
          setPassCode(passCode + character);
          setDelayInterval(setTimeout(() => setUnlock(true), 1200));
        
        } else {
        
          setPassCode('');
          setStatusMsg('Error1');
    
      }
      } else {

          setPassCode('');
          setStatusMsg('Error4');
          // setDelayInterval(setTimeout(() => setUnlock(true), 1200));
    
        }
    } else {
      if(!allowSecretMasterCode) {
        
        setPassCode(passCode + character);
        setDelayInterval(setTimeout(() => setUnlock(true), 1200));

      } else {
        setSecretMasterCode(secretMasterCode + character);
        setDelayInterval(setTimeout(() => setUnlockWithSMC(true), 1200));
      
      }
      clearTimeout(delayInterval);
    
    }
  };

  const lockTheDoor = async () => {

    if(!isLocked) {

      if(passCode.length === 6 && passCode !== '000000') {

        const hashedCode = await bcrypt.hash(passCode, 12);
        localStorage.setItem('code', hashedCode);
        setStatusMsg('Locking');
        setIsLocked(true);

      } else {

        setStatusMsg('Error2');

      } 

      setPassCode('');
      setMsgInterval(setTimeout(() => setStatusMsg('Ready'), 3000));

    } else {
      if(!allowSecretMasterCode) {

        setPassCode(passCode + 'L');
      
      } else {

        setSecretMasterCode(secretMasterCode + 'L');

      }
      clearTimeout(delayInterval);
      setDelayInterval(setTimeout(() => setUnlock(true), 1200));

    }
  };
  const unlockTheDoor = async () => {

      if(passCode === '000000') {
        setallowSecretMasterCode(true);
        setStatusMsg('Service');
      } else {
      
        if(!!(await bcrypt.compare(passCode, hashedCode))) {

          setStatusMsg('Unlocking');
          setIsLocked(false);
          localStorage.removeItem('code');

      } else  {

          setStatusMsg('Error3') ;

      }

      setPassCode('');
      setUnlock(false);
      setMsgInterval(setTimeout(() => setStatusMsg('Ready'), 3000));
    }

};

  const unlockWithSecretMasterCode = async () => {
    if(secretMasterCode.length > 0) {
      await dispatch(checkSecretMasterCode(secretMasterCode));
    } 
};

  return (
    <div className="panel">
      <BacklitScreen
        statusMsg={statusMsg}
        passCode={passCode}
        secretMasterCode={secretMasterCode}
        isLocked={isLocked}
        lightOn={lightOn}
      />
      <NumberKeypad
        enterPassCode={enterPassCode}
        lockTheDoor={lockTheDoor}
        unlockTheDoor={unlockTheDoor}
      />
      <p>S/N: 4815162342</p>
    </div>
  );
}

export default App;
