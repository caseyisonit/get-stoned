import React from "react";
import { Col } from "reactstrap";
import "./StoneName.scss";



function StoneName(props) {
    return (
        <> 
                <Col sm="4" >
                    <img src={props.image} alt={props.name} className="stone" onClick={props.stoneModalOpen} />
                </Col>
        </>
    )
};

export default StoneName;