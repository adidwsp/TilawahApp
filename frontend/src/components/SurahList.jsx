import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const SurahList = () => {
  const [Surah, setSurah] = useState([]);

  useEffect(() => {
    getSurah();
  }, []);

  const getSurah = async () => {
    const response = await axios.get("http://localhost:5000/surah");
    setSurah(response.data);
  };

  const deleteSurah = async (surahId) => {
    await axios.delete(`http://localhost:5000/surah/${surahId}`);
    getSurah();
  };

  return (
    <div>
      <h1 className="title">Surah</h1>
      <h2 className="subtitle">List of Surah</h2>
      <Link to="/surah/add" className="button is-primary mb-2">
        Add New
      </Link>
      <table className="table is-striped is-fullwidth">
        <thead>
          <tr>
            <th>No</th>
            <th>Surah Name</th>
            <th>Ayat</th>
            <th>Created By</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {Surah.map((Surah, index) => (
            <tr key={Surah.uuid}>
              <td>{index + 1}</td>
              <td>{Surah.name}</td>
              <td>{Surah.ayat}</td>
              <td>{Surah.user.name}</td>
              <td>
                <Link
                  to={`/surah/edit/${Surah.uuid}`}
                  className="button is-small is-info"
                >
                  Edit
                </Link>
                <button
                  onClick={() => deleteSurah(Surah.uuid)}
                  className="button is-small is-danger"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SurahList;
