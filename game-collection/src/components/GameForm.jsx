import React, { useState } from "react";
import { TextField, Button, Grid, Paper, Typography } from "@mui/material";

// Estilos CSS para o componente de formulário
const formStyle = {
  padding: "16px",
  maxWidth: "400px",
  margin: "auto"
};

// Estilo CSS para os botões do formulário
const buttonStyle = {
  marginRight: "8px"
};

// Componente GameForm responsável por adicionar um novo café
function GameForm({ handleAddGame, setShowForm }) {
  // Estado local para armazenar os dados do novo café
  const [newGame, setNewGame] = useState({ type: "", grain: "", roasting: "", weight: "" });

  // Função para atualizar o estado quando os campos do formulário são preenchidos
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewGame({ ...newGame, [name]: value });
  };

  // Função para lidar com o envio do formulário
  const handleSubmit = (e) => {
    e.preventDefault(); // Evita o recarregamento da página após o envio
    handleAddGame(newGame); // Chama a função para adicionar um café
    setNewGame({ type: "", grain: "", roasting: "", weight: ""  }); // Limpa os campos do formulário
  };

  return (
    <Paper elevation={3} style={formStyle}>
      <Typography variant="h6" gutterBottom>
        Adicionar café
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Tipo"
              name="type"
              value={newGame.type}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Grão"
              name="grain"
              value={newGame.grain}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Torra"
              name="roasting"
              value={newGame.roasting}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Peso"
              name="weight"
              value={newGame.weight}
              onChange={handleInputChange}
            />
          </Grid>          
        </Grid>
        <div style={{ marginTop: "16px" }}>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            style={buttonStyle}
          >
            Adicionar
          </Button>
          <Button onClick={() => setShowForm(false)} style={buttonStyle}>
            Cancelar
          </Button>
        </div>
      </form>
    </Paper>
  );
}

export default GameForm; // Exportação do componente GameForm
