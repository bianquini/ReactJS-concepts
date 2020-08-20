import React, { useState, useEffect } from "react";

import "./styles.css";
import api from "./services/api";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get("repositories").then((response) => {
      setRepositories(...repositories, response.data);
    });
  }, []);

  function handleAddRepository() {
    const newRepo = {
      title: `Novo Repositório: ${Date.now()}`,
      url: `http://localhost ${Date.now()}`,
      techs: ["Java, spring"],
    };

    api.post("repositories", newRepo).then((response) => {
      const repo = response.data;
      console.log(repo);
      setRepositories([...repositories, repo]);
    });
  }

  function handleRemoveRepository(id) {
    api.delete(`repositories/${id}`).then(() => {
      setRepositories(repositories.filter((x) => x.id !== id));
    });
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((repository) => (
          <li key={repository.id}>
            {repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
