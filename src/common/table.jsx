import React, { Component } from "react";
import TableHeader from "../common/tableHeader";
import TableBody from "../common/tableBody";

const Table = (props) => {
  const { columns, sortColumn, onSort, data } = props;
  return (
    <table className="table">
      <TableHeader
        columns={columns}
        sortColumn={sortColumn}
        onSort={onSort}
      ></TableHeader>
      <TableBody data={data} columns={columns}></TableBody>
    </table>
  );
};

export default Table;
