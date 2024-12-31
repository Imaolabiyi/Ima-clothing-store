import React, { Fragment } from "react";
import moment from "moment";

const AdminFooter = (props) => {
  return (
    <Fragment>
      <footer
        style={{ background: "#a90101", color: "#fff" }}
        className="z-10 py-6 px-4 md:px-12 text-center"
      >
        IMA CLOTHINGS {moment().format("YYYY")}
      </footer>
    </Fragment>
  );
};

export default AdminFooter;
