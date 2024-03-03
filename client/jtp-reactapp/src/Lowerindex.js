import React from "react";

const BottomBody = ({ handleprevPage, handlenextPage, page, data }) => {
  return (
    <div className="page-scroll">
      <button onClick={handleprevPage} disabled={page === 1}>
        Previous
      </button>
      <div>{page}</div>
      <button onClick={handlenextPage} disabled={data.length < 20}> Next 
      </button>
    </div>
  );
};

export default BottomBody;