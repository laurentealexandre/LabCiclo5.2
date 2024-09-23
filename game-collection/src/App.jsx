// Importações necessárias do React e de outras bibliotecas
import React, { useState, useEffect } from "react";
import axios from "axios";
import GameForm from "./components/GameForm";
import GameTable from "./components/GameTable";
import {
  CssBaseline,
  Container,
  Typography,
  AppBar,
  Toolbar
} from "@mui/material";
import API_URL from "./config";

// Estilos CSS para elementos específicos do componente
const appBarStyle = {
  marginBottom: "20px"
};

const pageTitleStyle = {
  fontSize: "2rem",
  fontWeight: "bold",
  marginBottom: "20px"
};

// Componente principal da aplicação
function App() {
  // Estados locais para armazenar a lista de Cafés e controlar a exibição do formulário
  const [games, setGames] = useState([]);
  const [showForm, setShowForm] = useState(false);

  // Efeito colateral para buscar a lista de Cafés ao montar o componente
  useEffect(() => {
    fetchGames();
  }, []);

  // Função assíncrona para buscar a lista de Cafés da API
  const fetchGames = async () => {
    try {
      const response = await axios.get(`${API_URL}/cafe`);
      setGames(response.data);
    } catch (error) {
      console.error("Erro ao buscar Cafés:", error);
    }
  };

  // Função para adicionar um novo Café à Armazem
  const handleAddGame = async (newGame) => {
    try {
      await axios.post(`${API_URL}/cafe`, newGame);
      fetchGames(); // Atualiza a lista de Cafés após a adição
      setShowForm(false); // Fecha o formulário de adição
    } catch (error) {
      console.error("Erro ao adicionar Café:", error);
    }
  };

  // Função para excluir um Café da Armazem
  const handleDeleteGame = async (gameId) => {
    try {
      await axios.delete(`${API_URL}/cafe/${gameId}`);
      fetchGames(); // Atualiza a lista de Cafés após a exclusão
    } catch (error) {
      console.error("Erro ao excluir Café:", error);
    }
  };

  // Renderização do componente
  return (
    <div>
      <CssBaseline />
      <AppBar position="static" style={appBarStyle}>
        <Toolbar>
          <Typography variant="h6">Armazem de Cafés</Typography>
        </Toolbar>
      </AppBar>
      <Container maxWidth="lg">
        <Typography variant="h2" align="center" style={pageTitleStyle}>
          Armazem de Cafés
        </Typography>
        {/* Condicional para renderizar o formulário ou a tabela de Cafés */}
        {showForm ? (
          <GameForm handleAddGame={handleAddGame} setShowForm={setShowForm} />
        ) : (
          <GameTable
            games={games}
            handleDeleteGame={handleDeleteGame}
            setShowForm={setShowForm}
          />
        )}
      </Container>
    </div>
  );
}

export default App; // Exportação do componente principal
