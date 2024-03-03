import React from "react";

export const TopBody = ({ search, sortBy, handleSearch, handleSort }) => {
  return (
    <div className="Input-container">
      <input
        type="text"
        placeholder="name or location"
        value={search}
        onChange={handleSearch}
      />
      <br />
      <select value={sortBy} onChange={handleSort}>
        <option value="sno">Sortby</option>
        <option value="date">Date</option>
        <option value="time">Time</option>
      </select>
    </div>
  );
};