import { useState } from "react";

export default function App() {
  const [planets, setPlanets] = useState([
    {
      id: 1,
      name: "Mercury",
      diameter: 1000,
    },
    {
      id: 2,
      name: "Venus",
      diameter: 2000,
    },
    {
      id: 3,
      name: "Earth",
      diameter: 3000,
    },
  ]);
  const [newPlanet, setNewPlanet] = useState({
    id: 4,
  });
  const [editedPlanet, setEditedPlanet] = useState();
  const [cart, setCart] = useState([]);

  return (
    <>
      <button>Keranjang: {cart.length}</button>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nama</th>
            <th>Diameter</th>
            <th>Tindakan</th>
          </tr>
        </thead>
        <tbody>
          {planets.map((planet, i) => (
            <tr key={i}>
              <td>{planet.id}</td>
              <td>{planet.name}</td>
              <td>{planet.diameter.toLocaleString()}</td>
              <td>
                <button onClick={() => setCart([...cart, planet])}>Beli</button>
                <button onClick={() => setEditedPlanet(planet)}>Edit</button>
                <button
                  onClick={() =>
                    confirm(`Apakah Anda yakin ingin menghapus?`) &&
                    setPlanets(planets.filter((p) => p.id !== planet.id))
                  }
                >
                  Hapus
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setPlanets([...planets, newPlanet]);
          setNewPlanet({ ...newPlanet, id: newPlanet.id + 1 });
        }}
      >
        <label>
          ID
          <input
            type="text"
            value={newPlanet.id}
            onChange={(e) => setNewPlanet({ ...newPlanet, id: e.target.value })}
          />
        </label>
        <label>
          Nama
          <input
            type="text"
            onChange={(e) =>
              setNewPlanet({ ...newPlanet, name: e.target.value })
            }
          />
        </label>
        <label>
          Diameter
          <input
            type="number"
            onChange={(e) =>
              setNewPlanet({ ...newPlanet, diameter: e.target.value })
            }
          />
        </label>
        <button>Tambah</button>
      </form>
      {editedPlanet && (
        <form
          className="dialog"
          onSubmit={(e) => {
            e.preventDefault();
            setPlanets(
              planets.map((planet) =>
                planet.id === editedPlanet.id ? editedPlanet : planet
              )
            );
            setEditedPlanet();
          }}
        >
          <h1>Edit Planet</h1>
          <label>
            ID
            <input
              type="text"
              value={editedPlanet.id}
              onChange={(e) =>
                setEditedPlanet({ ...editedPlanet, id: e.target.value })
              }
            />
          </label>
          <label>
            Nama
            <input
              type="text"
              value={editedPlanet.name}
              onChange={(e) =>
                setEditedPlanet({ ...editedPlanet, name: e.target.value })
              }
            />
          </label>
          <label>
            Diameter
            <input
              type="number"
              value={editedPlanet.diameter}
              onChange={(e) =>
                setEditedPlanet({ ...editedPlanet, diameter: e.target.value })
              }
            />
          </label>
          <button onClick={() => setEditedPlanet()}>Batal</button>
          <button>Simpan</button>
        </form>
      )}
      {/* <button onClick={() => setPlanets(["Sun", ...planets])}>
        Tambah depan
      </button>
      <button onClick={() => setPlanets([...planets, "Mars"])}>
        Tambah belakang
      </button>
      <button onClick={() => setPlanets([])}>Hapus semua</button> */}
    </>
  );
}
