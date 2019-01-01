import React from 'react';
import '../styles/Accordion.css';
import ReactDOM from "react-dom";

const AccordionBox = () => {
    
    console.log("Hello");
    return(
        <div className="Container">        
            <h1>Accordions</h1>
            <div>        
                <button className="Accordion">Accordian #1</button>
                <div className="Accordion_content">
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quas deleniti molestias necessitatibus quaerat quos incidunt! Quas officiis repellat dolore omnis nihil quo, ratione cupiditate! Sed, deleniti, recusandae! Animi, sapiente, nostrum?
                    </p>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quas deleniti molestias necessitatibus quaerat quos incidunt! Quas officiis repellat dolore omnis nihil quo, ratione cupiditate! Sed, deleniti, recusandae! Animi, sapiente, nostrum?
                    </p>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quas deleniti molestias necessitatibus quaerat quos incidunt! Quas officiis repellat dolore omnis nihil quo, ratione cupiditate! Sed, deleniti, recusandae! Animi, sapiente, nostrum?
                    </p>
                </div>
            </div>
            <div>
                <button className="Accordion">Accordian #2</button>
                <div className="Accordion_content">
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quas deleniti molestias necessitatibus quaerat quos incidunt! Quas officiis repellat dolore omnis nihil quo, ratione cupiditate! Sed, deleniti, recusandae! Animi, sapiente, nostrum?
                    </p>
                </div>
            </div>
            <div>
                <button className="Accordion">Accordian #3</button>
                <div className="Accordion_content">
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quas deleniti molestias necessitatibus quaerat quos incidunt! Quas officiis repellat dolore omnis nihil quo, ratione cupiditate! Sed, deleniti, recusandae! Animi, sapiente, nostrum?
                    </p>
                </div>
            </div>
        </div>
    
    );

    
}


export default AccordionBox;