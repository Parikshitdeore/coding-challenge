import React from "react";
const Table = ({
  month,
  data,
  setMonth,
  setSearch,
  setPage,
  setperPage,
  page,
  monthsArray,
}) => {
  const { paginatedTransactions = [], totalPages = 0 } = data;

  return (
    <div className="table-container">
      <h3>Transaction Dashboard</h3>
      <div>
        <input
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search Transaction"
        ></input>
        <select
          value={month}
          onChange={(e) => {
            setMonth(e.target.value);
          }}
        >
          {monthsArray.map((monthStr, i) => {
            return (
              <option key={i} value={i + 1}>
                {monthStr}
              </option>
            );
          })}
        </select>
      </div>
      <div className="table">
        <table>
          <tbody>
            <tr>
              <th>Id</th>
              <th>Title</th>
              <th>Description</th>
              <th>Price</th>
              <th>Category</th>
              <th>Sold</th>
              <th>Image</th>
            </tr>
            {paginatedTransactions.map(
              ({ id, title, description, category, price, sold, image }, i) => {
                return (
                  <tr key={i}>
                    <td>{id}</td>
                    <td>{title}</td>
                    <td>description</td>
                    <td>{Math.round(price)}</td>
                    <td>{category}</td>
                    <td>{sold ? "sold" : "unsold"}</td>
                    <td>
                      <img src={image} alt="error"></img>
                    </td>
                  </tr>
                );
              }
            )}
          </tbody>
        </table>
        <div className="pagination">
          <p>Page No. {page}</p>
          <div>
            <p
              style={{ display: page === 1 ? "none" : "inline" }}
              onClick={() => {
                setPage((prev) => (prev > 1 ? prev - 1 : prev));
              }}
            >
              prev
            </p>
            {page < totalPages && page > 1 ? "-" : ""}
            <p
              style={{ display: page === totalPages ? "none" : "inline" }}
              onClick={() => {
                setPage((prev) => (prev < totalPages ? prev + 1 : prev));
              }}
            >
              Next
            </p>
          </div>
          <div>
            Per Page:
            <select onChange={(e) => setperPage(e.target.value)}>
              <option>2</option>
              <option>5</option>
              <option>10</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Table;
