import React from "react";
import "./style.css";

// The ...props means, spread all of the passed props onto this element
// That way we don't have to define them all individually
function DeleteBtn(props) {
  return (
    <button variant="danger" className="delete-btn" {...props} tabIndex="0">
      Delete
    </button>
  );
}

export default DeleteBtn;
