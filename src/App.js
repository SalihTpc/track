import "./App.css";
import axios from "axios";
import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

function App() {
  const [searchInput, setSearchInput] = React.useState("link");
  const [results, setResults] = React.useState([
    {
      name: "",
      artist: "",
      url: "",
      streamable: "",
      listeners: "",
      image: [],
      mbid: "",
    },
  ]);
  const APIKEY = "0b323aba795f3ac625e85352f08e65b1";
  const URL = `https://ws.audioscrobbler.com/2.0/?method=track.search&track=${searchInput}&api_key=${APIKEY}&format=json`;

  const getTrack = () => {
    axios
      .get(URL)
      .then((response) => setResults(response.data.results.trackmatches.track));
  };
  const onChangeHandler = (e) => {
    setSearchInput(e.target.value);
  };
  console.log(results);
  React.useEffect(() => {
    getTrack();
  }, [searchInput]);
  return (
    <div className="App">
      <form action="">
        <OutlinedInput
          sx={{ minWidth: 345 }}
          name="search"
          id="search"
          value={searchInput}
          onChange={onChangeHandler}
          endAdornment={
            <InputAdornment position="end">
              <SearchIcon />
            </InputAdornment>
          }
          variant="outlined"
        />
      </form>
      <div className="container">
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 375 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <TableCell align="center" colSpan={3}>
                  Search List
                </TableCell>
              </TableRow>
              <TableRow>
                <StyledTableCell>Title</StyledTableCell>
                <StyledTableCell align="right">Artist</StyledTableCell>
                <StyledTableCell align="right">Add-Remove</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {results.map((result) => (
                <StyledTableRow key={result.url}>
                  <StyledTableCell component="th" scope="row">
                    {result.name}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {result.artist}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <Button variant="outlined" size="medium">
                      Add
                    </Button>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 375, ml: 1 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <TableCell align="center" colSpan={3}>
                  Play List
                </TableCell>
              </TableRow>
              <TableRow>
                <StyledTableCell>Title</StyledTableCell>
                <StyledTableCell align="right">Artist</StyledTableCell>
                <StyledTableCell align="right">Add-Remove</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <StyledTableRow key={row.name}>
                  <StyledTableCell component="th" scope="row">
                    {row.name}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {row.calories}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <Button variant="outlined" size="medium">
                      Del
                    </Button>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}

export default App;
