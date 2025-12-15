import { useEffect, useState } from "react";

interface Program {
  id: number;
  title: string;
  synopsis: string;
  poster: string;
  country: string;
  year: number;
}

function Programs() {
  const [programs, setPrograms] = useState<Program[]>([]);

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const response = await fetch("http://localhost:3310/api/programs");

        if (response.ok) {
          const data: Program[] = await response.json();
          setPrograms(data);
        }
      } catch (e) {
        console.error("Erreur du fetch des programmes:", e);
      }
    };
    fetchPrograms();
  }, []);

  return (
    <div>
      <h1>Toutes les Séries</h1>

      {programs.length > 0 ? (
        <div>
          {programs.map((programs) => (
            <div key={programs.id}>
              <h2>
                {programs.title} ({programs.year})
              </h2>
              <p>Pays: {programs.country}</p>
              <p>{programs.synopsis}</p>
              <img src={programs.poster} alt={`Affiche de ${programs.title}`} />
            </div>
          ))}
        </div>
      ) : (
        <p>Aucune série trouvée ...</p>
      )}
    </div>
  );
}

export default Programs;
