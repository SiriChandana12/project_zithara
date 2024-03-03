import React, { useEffect } from "react";
import { useState } from "react";
import  axios  from 'axios'; //make HTTP requests to fetch data from an API
import { Table } from "./table";
import { TopBody } from "./TopBody";
import Lowerindex from "./Lowerindex";
import "./body.css";
const Body = () => {
  //states ensures that the data is fetched whenever these values are updated.
  const [data, setData] = useState([]);
  const [search, setSearch] = useState(""); //When the user types in the search input, it updates the search state.
  const [sortBy, setSortBy] = useState("sno"); //When the user changes the sorting option, it updates the sortBy state.
  const [page, setPage] = useState(1);//When the user clicks "Previous Page" or "Next Page", it updates the page state

  //fetch data
  useEffect(() => { //data is fetched whenever these values are updated
    async function fetch() {
      const response = await axios.get("http://localhost:5000/customers", {
        params: {
          searchData: search,
          sortData: sortBy,
          pageData: page,
        },
      });
      setData(response.data.results);
    }
    fetch();
  }, [search, sortBy, page]);
  //jsx
  return (
    <div>
      <TopBody
        search={search} //down state values and handler functions 
        sortBy={sortBy}
        handleSearch={(e) => setSearch(e.target.value)}
        handleSort={(e) => {setSortBy(e.target.value);
          setPage(1);
        }}
      />
      <Table data={data} /> 
     

      <Lowerindex
        handleprevPage={() => setPage((prevPage) => prevPage - 1)}
        handlenextPage={() => setPage((prevPage) => prevPage + 1)}
        page={page}
        data={data}
      />
    </div>
  );
};

export default Body;