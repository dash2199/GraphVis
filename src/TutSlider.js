import React from 'react'
import { TutData } from './TutData'
import {FaArrowAltCircleRight , FaArrowAltCircleLeft} from 'react-icons/fa';
import {useState} from 'react';
import './Help.css'

const TutSlider = (props) => {
    const [state, setstate] = useState(0);
    let n = TutData.length;
    const next = () =>{
        setstate(state === n - 1 ? 0 : state + 1);
    }
    const prev = () =>{
        setstate(state === 0 ? n - 1 : state - 1);
    }

    return (
        <section className = "slide">
            <FaArrowAltCircleLeft className = "left-arrow" onClick = {prev}></FaArrowAltCircleLeft>
            <FaArrowAltCircleRight className = "right-arrow" onClick = {next}></FaArrowAltCircleRight>
            
            <button className = "btn-begin" onClick = {() => props.setTrig(false)}>Skip</button>
            {TutData.map(function(obj , key){
                    return (<><div className = "outer">
                    <div className = {state === key ? "slider active" : "slider"}>
                        {state === key && (<img src = {obj.image} className = "image"/>)};
                    </div></div></>);  
            })}
        </section>

    )
}

export default TutSlider
