import Header from './Header';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Table } from 'react-bootstrap'; // Import Table from react-bootstrap

function SearchProduct() {
  const { searchTerm } = useParams(); // Using 'searchTerm' to match the URL param in the route
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8080/api/search/${searchTerm}`);
        const result = await response.json();
        setSearchResults(result.data || []); // Handle if 'data' is undefined
      } catch (error) {
        console.error('Error fetching search results:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [searchTerm]);

  if (loading) {
    return <p>Loading search results...</p>;
  }

  return (
    <div>
      <Header />
      <h1>Search Results for "{searchTerm}"</h1>

      {searchResults.length > 0 ? (
        <div className="col-sm-8 offset-sm-2">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Image</th>
                <th>Price</th>
                <th>Sales Price</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {searchResults.map((item, index) => (
                <tr key={item.id}>
                  <td>{index + 1}</td>
                  <td>{item.name}</td>
                  <td>
                    {item.file_path ? (
                      <img
                        style={{ width: 100 }}
                        src={`http://127.0.0.1:8080/storage/${item.file_path}`}
                        alt={item.name}
                      />
                    ) : (
                      <p>No image available</p>
                    )}
                  </td>
                  <td>{item.price}</td>
                  <td>{item.sales_price}</td>
                  <td>{item.description}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      ) : (
        <p>No results found for your search query.</p>
      )}
    </div>
  );
}

export default SearchProduct;
