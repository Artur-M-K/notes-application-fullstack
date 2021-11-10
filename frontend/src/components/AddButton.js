import React from "react";
import { Link } from "react-router-dom";
import { ReactComponent as AddIcon } from "../assets/add.svg";

const AddButton = () => {
  return (
    <div className="button-container">
      <Link to="note/new" className="floating-button">
        <AddIcon />
      </Link>
    </div>
  );
};

export default AddButton;
