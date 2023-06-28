import { useState } from "react";
import { MdClose, MdDelete, MdEdit } from "react-icons/md";
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai";
import { BsFillCartPlusFill } from "react-icons/bs";

export default function App() {
  const [planets, setPlanets] = useState([
    {
      id: 1,
      name: "Mercury",
      diameter: 4879,
    },
    {
      id: 2,
      name: "Venus",
      diameter: 12104,
    },
    {
      id: 3,
      name: "Earth",
      diameter: 12756,
    },
    {
      id: 4,
      name: "Mars",
      diameter: 6792,
    },
    {
      id: 5,
      name: "Jupiter",
      diameter: 142984,
    },
    {
      id: 6,
      name: "Saturn",
      diameter: 120536,
    },
    {
      id: 7,
      name: "Uranus",
      diameter: 51118,
    },
    {
      id: 8,
      name: "Neptune",
      diameter: 49528,
    },
    {
      id: 9,
      name: "Pluto",
      diameter: 2370,
    },
    {
      id: 10,
      name: "X",
      diameter: 50000,
    },
  ]);
  const [idSquence, setIdSequence] = useState(planets.length);
  const [newPlanet, setNewPlanet] = useState();
  const [editedPlanet, setEditedPlanet] = useState();
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [minDiameter, setMinDiameter] = useState(0);
  const [maxDiameter, setMaxDiameter] = useState(Infinity);
  const [keywords, setKeywords] = useState("");
  const [sortBy, setSortBy] = useState("id");
  const [sortOrder, setSortOrder] = useState("asc");
  const [page, setPage] = useState(1);

  const sortedFilteredPlanets = planets
    .filter(
      (planet) =>
        planet.name.toLowerCase().includes(keywords) &&
        planet.diameter >= minDiameter &&
        planet.diameter <= maxDiameter
    )
    .toSorted((a, b) => {
      if (sortOrder === "asc") {
        return a[sortBy] < b[sortBy] ? -1 : 1;
      } else {
        return a[sortBy] > b[sortBy] ? -1 : 1;
      }
    });

  return (
    <>
      <header>
        <button onClick={() => setNewPlanet({ id: idSquence })}>Tambah</button>
        <label>
          Cari
          <input
            type="text"
            onChange={(e) => setKeywords(e.target.value.toLowerCase())}
          />
        </label>
        <label>
          Diameter minimal
          <input
            type="number"
            onChange={(e) => setMinDiameter(e.target.value)}
          />
        </label>
        <label>
          Diameter maksimal
          <input
            type="number"
            onChange={(e) => setMaxDiameter(e.target.value || Infinity)}
          />
        </label>
        <label>
          Urutkan:
          <div>
            <select onChange={(e) => setSortBy(e.target.value)}>
              <option value="id">Normal</option>
              <option value="name">Nama</option>
              <option value="diameter">Diameter</option>
            </select>
            <select onChange={(e) => setSortOrder(e.target.value)}>
              <option value="asc">Naik</option>
              <option value="desc">Turun</option>
            </select>
          </div>
        </label>
        <button onClick={() => setIsCartOpen(true)}>
          Keranjang: {cart.reduce((a, p) => a + p.count, 0)}
        </button>
      </header>
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
          {sortedFilteredPlanets
            .filter((_planet, i) => i >= page * 3 - 3 && i < page * 3)
            .map((planet) => (
              <tr key={planet.id}>
                <td>{planet.id}</td>
                <td>{planet.name}</td>
                <td>{planet.diameter.toLocaleString()}</td>
                <td>
                  <button
                    onClick={() => {
                      // const index = cart.findIndex((p) => p.id === planet.id);
                      // if (index < 0) {
                      //   setCart([...cart, { ...planet, count: 1 }]);
                      // } else {
                      //   setCart(
                      //     cart.with(index, {
                      //       ...cart[index],
                      //       count: cart[index].count + 1,
                      //     })
                      //   );
                      // }
                      if (cart.find((p) => p.id === planet.id)) {
                        setCart(
                          cart.map((p) =>
                            p.id === planet.id
                              ? {
                                  ...p,
                                  count: p.count + 1,
                                }
                              : p
                          )
                        );
                      } else {
                        setCart([...cart, { ...planet, count: 1 }]);
                      }
                    }}
                    title="Tambahkan ke keranjang"
                  >
                    <BsFillCartPlusFill />
                  </button>
                  <button onClick={() => setEditedPlanet(planet)} title="Edit">
                    <MdEdit />
                  </button>
                  <button
                    onClick={() =>
                      confirm(`Apakah Anda yakin ingin menghapus?`) &&
                      setPlanets(planets.filter((p) => p.id !== planet.id))
                    }
                    title="Hapus"
                  >
                    <MdDelete />
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <div>
        <button onClick={() => setPage(page - 1)} disabled={page === 1}>
          Sebelumnya
        </button>
        {page}
        <button
          onClick={() => setPage(page + 1)}
          disabled={page === Math.ceil(sortedFilteredPlanets.length / 3)}
        >
          Selanjutnya
        </button>
      </div>
      {newPlanet && (
        <form
          className="card dialog"
          onSubmit={(e) => {
            e.preventDefault();
            setPlanets([...planets, newPlanet]);
            setNewPlanet();
            setIdSequence(idSquence + 1);
          }}
        >
          <h1>Tambah Planet</h1>
          <label>
            ID
            <input type="text" value={newPlanet.id} readOnly />
          </label>
          <label>
            Nama
            <input
              type="text"
              onChange={(e) =>
                setNewPlanet({ ...newPlanet, name: e.target.value })
              }
              required
              autoFocus
            />
          </label>
          <label>
            Diameter
            <input
              type="number"
              onChange={(e) =>
                setNewPlanet({ ...newPlanet, diameter: e.target.value })
              }
              required
            />
          </label>
          <div>
            <button onClick={() => setNewPlanet()}>Batal</button>
            <button>Simpan</button>
          </div>
        </form>
      )}
      {editedPlanet && (
        <form
          className="card dialog"
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
            <input type="text" value={editedPlanet.id} readOnly />
          </label>
          <label>
            Nama
            <input
              type="text"
              value={editedPlanet.name}
              onChange={(e) =>
                setEditedPlanet({ ...editedPlanet, name: e.target.value })
              }
              required
              autoFocus
            />
          </label>
          <label>
            Diameter
            <input
              type="number"
              value={editedPlanet.diameter}
              onChange={(e) =>
                setEditedPlanet({
                  ...editedPlanet,
                  diameter: parseFloat(e.target.value),
                })
              }
              required
            />
          </label>
          <div>
            <button onClick={() => setEditedPlanet()}>Batal</button>
            <button>Simpan</button>
          </div>
        </form>
      )}
      {isCartOpen && (
        <div className="card dialog">
          <button onClick={() => setIsCartOpen(false)}>
            <MdClose />
          </button>
          <h1>Keranjang</h1>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nama</th>
                <th>Jumlah</th>
                <th>Tindakan</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((planet) => (
                <tr key={planet.id}>
                  <td>{planet.id}</td>
                  <td>{planet.name}</td>
                  <td>{planet.count.toLocaleString()}</td>
                  <td>
                    <button
                      onClick={() => {
                        if (planet.count > 1) {
                          // menggunakan indeks:
                          // setCart(
                          //   cart.with(i, { ...planet, count: planet.count - 1 })
                          // );
                          // menggunakan ID planet:
                          setCart(
                            cart.map((p) =>
                              p.id === planet.id
                                ? { ...p, count: p.count - 1 }
                                : p
                            )
                          );
                        } else {
                          setCart(cart.filter((p) => p.id !== planet.id));
                        }
                      }}
                      title="Kurangi"
                    >
                      <AiOutlineMinusCircle />
                    </button>
                    <button
                      onClick={() => {
                        setCart(
                          cart.map((p) =>
                            p.id === planet.id
                              ? { ...p, count: p.count + 1 }
                              : p
                          )
                        );
                      }}
                      title="Tambah"
                    >
                      <AiOutlinePlusCircle />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
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
