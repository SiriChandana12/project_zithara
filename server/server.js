const express = require("express"); // creates an instance of an Express 
const app = express(); 
const cors = require("cors"); //cross origin resourse sharing(allows requests)
const pool = require("./data"); //PostgreSQL database connection pool
//middleware
app.use(cors()); //requests coming from frontend applications that are served from different domains.
app.use(express.json()); //parse JSON in the request body

//End point in express//
app.get("/customers", async (req, res) => {
  const Results = {};
  try {
    const searchData = req.query.searchData;//filters data
    const sortData = req.query.sortData;//sorting data
    const pageData = req.query.pageData;//paginates data
    const offlimit = (pageData - 1) * 20; //Used to decide which subset of data to fetch, number of rows to skip before fetching the results
    let sortBy = "sno";
    if (sortData === "time") {
      sortBy = "created_at::TIME";
    } else if (sortData === "date") {
      sortBy = "DATE(created_at)";
    }
    //query to get datafrom databasee
    const newData = await pool.query(
      `SELECT * FROM customers WHERE location ILIKE $1 OR customer_name ILIKE $2 ORDER BY ${sortBy} OFFSET ${offlimit} LIMIT 20;`,
      ["%" + searchData + "%", "%" + searchData + "%"]
    );
    Results["results"] = newData.rows; //fetched results are stored here
    res.status(200).json(Results); //This indicates that the request has succeeded.
  } catch (err) {
    console.error(err.message);    // This is excecuted when error occurs
  }
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log("server has started on port 5000");   //tells it to listen on a specified port
});