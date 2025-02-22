import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const FormAddSurah = () => {
  const [name, setName] = useState("");
  const [ayat, setAyat] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const saveSurah = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/surah", {
        name: name,
        ayat: ayat,
      });
      navigate("/surah");
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };

  return (
    <div>
      <h1 className="title">Surah</h1>
      <h2 className="subtitle">Add New Surah</h2>
      <div className="card is-shadowless">
        <div className="card-content">
          <div className="content">
            <form onSubmit={saveSurah}>
              <p className="has-text-centered">{msg}</p>
              <div className="field">
                <label className="label">Name</label>
                <div className="control">
                  <input
                    type="text"
                    className="input"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Surah Name"
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Surah</label>
                <div className="control">
                  <input
                    type="text"
                    className="input"
                    value={ayat}
                    onChange={(e) => setAyat(e.target.value)}
                    placeholder="Surah"
                  />
                </div>
              </div>

              <div className="field">
                <div className="control">
                  <button type="submit" className="button is-success">
                    Save
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormAddSurah;
