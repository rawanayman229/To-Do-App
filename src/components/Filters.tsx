import { useState } from "react";
import { Search, Filter } from "lucide-react";

interface Props {
  search: string;
  setSearch: (value: string) => void;
  label: string;
  setLabel: (value: string) => void;
}

const Filters = ({ search, setSearch, label, setLabel }: Props) => {
  const [showDropdown, setShowDropdown] = useState(false);

  const availableLabels = ["Urgent", "Normal", "Low"];

  return (
    <div className="filters-container">
      {/* SEARCH WRAPPER */}
      <div className="search-wrapper">
        <Search className="search-icon" size={18} />
        <input
          type="text"
          placeholder="Search tasks..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
        />
      </div>

      {/* FILTERS BUTTON & DROPDOWN */}
      <div className="filter-button-wrapper">
        <button
          className={`filter-btn ${showDropdown ? "active" : ""}`}
          onClick={() => setShowDropdown(!showDropdown)}
        >
          <Filter className="filter-icon" size={16} />
          Filters
        </button>

        {showDropdown && (
          <div className="filter-dropdown">
            <div className="dropdown-title">Filter by Label</div>
            <button
              className={`dropdown-item ${label === "" ? "selected" : ""}`}
              onClick={() => {
                setLabel("");
                setShowDropdown(false);
              }}
            >
              All Labels
            </button>
            {availableLabels.map((lbl) => (
              <button
                key={lbl}
                className={`dropdown-item ${label === lbl ? "selected" : ""}`}
                onClick={() => {
                  setLabel(lbl);
                  setShowDropdown(false);
                }}
              >
                {lbl}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Filters;
