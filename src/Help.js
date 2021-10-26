import React , {useState} from 'react'
import './Help.css'
import TutSlider from './TutSlider'
import Partles from './Particles'

const Help = (props) => {
    
    return (props.trigger) ? (
        <div>
            <div className = "particles"><Partles />
            <TutSlider setTrig = {props.setTrigger}/>
            </div>   
        </div>
    ) : "";
}

export default Help
