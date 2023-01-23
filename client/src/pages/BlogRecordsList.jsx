import * as React from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { useNavigate, useLocation } from "react-router-dom";
import sheep from "../recources/sheep.jpg";
import BlogRecord from "../components/BlogRecord";
import { Container } from "@mui/material";

const BlogRecordsList = ({ records }) => {
  //   const records = [1, 2, 3, 4, 5, 6, 7];
  const navigate = useNavigate();
  const location = useLocation();

  const search = location.search; // could be '?foo=bar'
  const params = new URLSearchParams(search);
  const page = !!params.get("page") ? +params.get("page") : 1; // bar
  const group = params.get("group");

  const [showCards, setShowCards] = React.useState([]);
  const [currentPage, setCurrentPage] = React.useState(page || 1);
  const [cardsPerPage, setCardsPerPage] = React.useState(3);

  const pages = Math.ceil(records.length / cardsPerPage);

  const calcCurrentCards = (page) => {
    const indexOfLastCard = page * cardsPerPage;
    const indexOfFirstCard = indexOfLastCard - cardsPerPage;
    const currentCards = records?.slice(indexOfFirstCard, indexOfLastCard);

    return currentCards;
  };

  React.useEffect(() => {
    setCurrentPage(page || 1);
    setShowCards(calcCurrentCards(currentPage));
  }, [records, location]);

  const handleChange = (e, value) => {
    navigate(
      `${location.pathname}${!!group ? `?group=${group}&` : "?"}page=${value}`
    );
    // navigate(`?page=${value}`);
    setCurrentPage(value);
    setShowCards(calcCurrentCards(value));
  };

  const clickViewHandler = (code) => {
    navigate(`products/${code}`);
  };

  return (
    <>
      {!!records.length && (
        <Container sx={{ py: 1 }} maxWidth="sm">
          {showCards.map((record, i) => (
            <BlogRecord key={record.photos[0]} record={record}/>
          ))}
          <Stack spacing={2} sx={{ pt: 2 }}>
            <p>
              {!!(currentPage - 1) ? (currentPage - 1) * cardsPerPage + 1 : 1} -{" "}
              {currentPage * cardsPerPage > records.length
                ? records.length
                : currentPage * cardsPerPage}{" "}
              із {records.length}
            </p>
          </Stack>
          <Stack spacing={2} sx={{ py: 2 }}>
            {!!showCards.length && (
              <Pagination
                page={page || 1}
                count={pages}
                onChange={handleChange}
                color="primary"
              />
            )}
          </Stack>
        </Container>
      )}
    </>
  );
};

export default BlogRecordsList;
