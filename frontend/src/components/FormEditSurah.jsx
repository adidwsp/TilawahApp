import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const FormEditSurah = () => {
  const [name, setName] = useState("");
  const [ayat, setAyat] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const getSurahById = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/surah/${id}`
        );
        setName(response.data.name);
        setAyat(response.data.ayat);
      } catch (error) {
        if (error.response) {
          setMsg(error.response.data.msg);
        }
      }
    };
    getSurahById();
  }, [id]);

  const updateSurah = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`http://localhost:5000/surah/${id}`, {
        name: name,
        ayat: ayat,
      });
      navigate("/Surah");
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };

  return (
    <div>
      <h1 className="title">Surah</h1>
      <h2 className="subtitle">Edit Surah</h2>
      <div className="card is-shadowless">
        <div className="card-content">
          <div className="content">
            <form onSubmit={updateSurah}>
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
                <label className="label">Ayat</label>
                <div className="control">
                  <input
                    type="text"
                    className="input"
                    value={ayat}
                    onChange={(e) => setAyat(e.target.value)}
                    placeholder="Ayat"
                  />
                </div>
              </div>

              <div className="field">
                <div className="control">
                  <button type="submit" className="button is-success">
                    Update
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

export default FormEditSurah;
