import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import { Col, Row } from "reactstrap";
import { getMoviesbyid } from "../api-helpers/api-helper";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

function AddedMoviesCard(props) {
  console.log(props);
  const [movie, setmovie] = useState();
  console.log(props.id);
  useEffect(() => {
    console.log(props.id);
    getMoviesbyid(props.id)
      .then((res) => setmovie(res.movie))
      .catch((err) => console.log(err));
  }, [props.id]);

  const handleButtonClick = (id) => {
    
    console.log(id);
  };

  return (
    <div
      style={{
        marginLeft: "300px",
        marginRight: "100px",
        marginBottom: "20px",
      }}
    >
      {movie && (
        <Card key={props.id} id={props.id}>
          <Card.Header> {movie.title}</Card.Header>
          <Card.Body>
            <Card.Title></Card.Title>
            <Col xs={12} sm={4}>
              <Card.Text>
                {" "}
                <strong>{movie.description}</strong>
              </Card.Text>
            </Col>
            <Row>
              <Col xs={12} sm={4}>
                <Card.Text>
                  <strong>Language:</strong>

                  <ul
                    style={{
                      listStyleType: "none",
                      display: "flex",
                      flexDirection: "row",
                      flexWrap: "wrap",
                    }}
                  >
                    {movie.language.map((item) => (
                      <li key={item} style={{ margin: "0 10px" }}>
                        {item}
                      </li>
                    ))}
                  </ul>
                </Card.Text>
              </Col>
            </Row>
          </Card.Body>
          <Stack spacing={2} direction="row" marginLeft={75} marginBottom={3}>
            <Button
              variant="contained"
              LinkComponent={Link}
              to={`/bookingdata/${props.id}`}
              onClick={handleButtonClick}
            >
              Get Booking data
            </Button>
          </Stack>
        </Card>
      )}
    </div>
  );
}

export default AddedMoviesCard;
