import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Skeleton,
  Typography,
  Box,
  TablePagination,
} from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  margin: theme.spacing(2),
  borderRadius: "8px",
  boxShadow: theme.shadows[2],
}));

const TableHeaderCell = styled(TableCell)(({ theme }) => ({
  fontWeight: "bold",
  backgroundColor: theme.palette.grey[100],
  color: theme.palette.text.primary,
  fontSize: "1.1rem",
}));

const TableBodyCell = styled(TableCell)(({ theme }) => ({
  padding: theme.spacing(2),
}));

export const MuiTableContainer = ({
  title,
  columns,
  data,
  loading,
  error,
  emptyMessage = "No hay datos disponibles",
  customStyles = {},
}) => {
  // Estado para la paginación
  const [page, setPage] = useState(0);
  const rowsPerPage = 5;

  // Manejar el cambio de página
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const renderContent = () => {
    if (loading) {
      return Array(5)
        .fill()
        .map((_, index) => (
          <TableRow key={index}>
            {columns.map((_, colIndex) => (
              <TableBodyCell key={colIndex}>
                <Skeleton variant="text" />
              </TableBodyCell>
            ))}
          </TableRow>
        ));
    }

    if (error) {
      return (
        <TableRow>
          <TableBodyCell colSpan={columns.length} align="center">
            {error}
          </TableBodyCell>
        </TableRow>
      );
    }

    if (!data?.length) {
      return (
        <TableRow>
          <TableBodyCell colSpan={columns.length} align="center">
            {emptyMessage}
          </TableBodyCell>
        </TableRow>
      );
    }

    // Aplicar paginación: mostrar solo los elementos de la página actual
    const paginatedData = data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    return paginatedData.map((row, index) => (
      <TableRow key={index} hover>
        {columns.map((column) => (
          <TableBodyCell key={column.key || column.field} sx={column.cellStyle}>
            {column.render ? column.render(row) : row[column.field]}
          </TableBodyCell>
        ))}
      </TableRow>
    ));
  };

  return (
    <Box sx={{ ...customStyles.container }}>
      {title && (
        <Typography variant="h6" gutterBottom sx={{ ...customStyles.title }}>
          {title}
        </Typography>
      )}

      <StyledTableContainer component={Paper} sx={{ ...customStyles.table }}>
        <Table>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableHeaderCell
                  key={column.key || column.field}
                  sx={{ ...customStyles.header, ...column.headerStyle }}
                >
                  {column.title}
                </TableHeaderCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>{renderContent()}</TableBody>
        </Table>

        {/* Componente de paginación */}
        <TablePagination
          rowsPerPageOptions={[5]}
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
        />
      </StyledTableContainer>
    </Box>
  );
};
