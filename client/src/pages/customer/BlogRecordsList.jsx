import { Container } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import * as React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import BlogRecord from "../../components/BlogRecord";
import { v4 as uuidv4 } from 'uuid';

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
            <BlogRecord key={uuidv4()} record={record}/>
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
