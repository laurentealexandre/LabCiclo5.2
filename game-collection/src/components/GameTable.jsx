// Importações necessárias do React e do Material-UI
import React, { useState } from "react";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

// Estilos CSS para elementos específicos do componente
const tableStyle = {
  minWidth: 650,
  margin: "auto",
  marginTop: "20px"
};

const headerCellStyle = {
  backgroundColor: "#f5f5f5",
  fontWeight: "bold"
};

// Componente GameTable
function GameTable({ games, handleDeleteGame, setShowForm }) {
  // Estados locais para controlar a abertura e o fechamento do diálogo de confirmação
  const [openDialog, setOpenDialog] = useState(false);
  const [gameToDelete, setGameToDelete] = useState(null);

  // Função para confirmar a exclusão de um café
  const handleConfirmDelete = () => {
    if (gameToDelete) {
      handleDeleteGame(gameToDelete.id);
      setGameToDelete(null);
    }
    setOpenDialog(false); // Fecha o diálogo de confirmação
  };

  // Função para abrir o diálogo de confirmação antes de excluir um café
  const handleOpenDialog = (game) => {
    setGameToDelete(game);
    setOpenDialog(true);
  };

  return (
    <div>
      {/* Cabeçalho da tabela */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h6">Lista de Café</Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddCircleOutlineIcon />}
          onClick={() => setShowForm(true)}
        >
          Adicionar café
        </Button>
      </Box>

      {/* Tabela de Café */}
      <TableContainer component={Paper} style={tableStyle}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={headerCellStyle} align="center">
                Tipo
              </TableCell>
              <TableCell style={headerCellStyle} align="center">
                Grão
              </TableCell>
              <TableCell style={headerCellStyle} align="center">
                Torra
              </TableCell>
              <TableCell style={headerCellStyle} align="center">
                Peso
              </TableCell>
              <TableCell style={headerCellStyle} align="center">
                Ações
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {games.length === 0 ? ( // Verifica se a lista de Café está vazia
              <TableRow>
                <TableCell colSpan={3} align="right">
                  <Typography variant="subtitle1">
                    Não há Cafés disponíveis.
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              // Mapeia e exibe os Café na tabela
              games.map((game) => (
                <TableRow key={game.id}>
                  <TableCell align="center">{game.type}</TableCell>
                  <TableCell align="center">{game.grain}</TableCell>
                  <TableCell align="center">{game.roasting}</TableCell>
                  <TableCell align="center">{game.weight}</TableCell>
                  <TableCell align="center">
                    {/* Botão para excluir um café */}
                    <Button
                      variant="outlined"
                      color="error"
                      startIcon={<DeleteIcon />}
                      onClick={() => handleOpenDialog(game)}
                    >
                      Excluir
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Diálogo de confirmação para excluir um café */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Confirmar Exclusão</DialogTitle>
        <DialogContent>
          Tem certeza de que deseja excluir o café "{gameToDelete?.type}"?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleConfirmDelete} color="error">
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default GameTable; // Exportação do componente GameTable
