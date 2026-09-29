import { Col, Row } from "react-bootstrap";

const SearchFilter = ({ data, search, setSearch, filter, setFilter }) => {


  return (
    <div className="filters-modern">
      <div className="search-box">
        <span>🔍</span>
        <input
          type="text"
          placeholder="Buscar libros..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <Row style={{ display: "flex" }}>
        <Col className="filter-group-label" xs={2}>
          <label>Categorías:</label>
        </Col>

        <Col className="filter-group">
          <div className="filter-buttons">
            {
              data.map((x) =>
                <button
                  key={x.id}
                  className={`filter-btn ${filter === x.id ? "active" : ""}`}
                  onClick={() => setFilter(x.id)}
                >
                  {x.label}
                </button>
              )
            }
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default SearchFilter;