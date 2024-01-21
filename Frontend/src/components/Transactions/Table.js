import React from "react";
const Table = ({
  month,
  data,
  setMonth,
  setSearch,
  setPage,
  setperPage,
  page,
  perPage,
  setMonthStr,
  monthsArray,
}) => {
  const { paginatedTransactions = [], totalPages = 0 } = data;

  return (
    <div className="table-container">
      <div className="transaction-dashboard">
        <h1>Transaction Dashboard</h1>
      </div>

      <div className="filter">
        <input
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          placeholder="Search Transaction"
        ></input>
        <select
          value={month}
          onChange={(e) => {
            setMonth(e.target.value);
            setMonthStr(monthsArray[e.target.value - 1]);
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
            <tr className="table-header">
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
                    <td>{description}</td>
                    <td>Rs.{Math.round(price)}/-</td>
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
            <button
              disable={page === 1 ? true : false}
              style={{ cursor: page === 1 ? "not-allowed" : "pointer" }}
              onClick={() => {
                setPage((prev) => (prev > 1 ? prev - 1 : prev));
              }}
            >
              prev
            </button>
            -
            <button
              disable={page === totalPages ? true : false}
              style={{
                cursor: page === totalPages ? "not-allowed" : "pointer",
              }}
              onClick={() => {
                setPage((prev) => (prev < totalPages ? prev + 1 : prev));
              }}
            >
              Next
            </button>
          </div>
          <div>
            Per Page:
            <select
              value={perPage}
              onChange={(e) => setperPage(e.target.value)}
            >
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
