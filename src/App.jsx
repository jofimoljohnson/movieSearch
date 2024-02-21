import styled from "styled-components";
import movieicon from "../public/movie-icon.svg";
import searchicon from "../public/search-icon.svg";
import MovieComponent from "./Components/MovieComponent";
import { useState } from "react";
import Axios from "axios";
import MovieInfoComponent from "./Components/MovieInfoComponent";

export const API_KEY = "a9118a3a";

const Container = styled.div`
    display: flex;
    flex-direction: column;
`;
const Header = styled.div`
    display: flex;
    flex-direction: row;
    background-color: black;
    color: white;
    padding: 10px;
    font-size: 20px;
    font-weight: bold;
    box-shadow: 0 3px 6px 0 #555;
    justify-content: space-between;
    align-items: center;
`;

const AppName = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`;

const MovieImage = styled.img`
    width: 48px;
    height: 48px;
    margin: 15px;
`;

const SearchBox = styled.div`
    display: flex;
    flex-direction: row;
    padding: 10px 10px;
    background-color: white;
    border-radius: 6px;
    margin-left: 20px;
    width: 50%;
    background-color: white;
    align-items: center;
`;
const SearchIcon = styled.img`
    width: 32px;
    height: 32px;
`;

const SearchInput = styled.input`
    color: black;
    font-size: 16px;
    font-weight: bold;
    border: none;
    outline: none;
    margin-left: 15px;
`;
const MovieListContainer = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    padding: 30px;
    gap: 25px;
    justify-content: space-evenly;
`;
const Placeholder = styled.img`
    width: 120px;
    height: 120px;
    margin: 150px;
    opacity: 50%;
`;

function App() {
    const [searchQuery, UpdatedSearchQuery] = useState("");
    const [timeoutId, UpdateTimeOutId] = useState();
    const [movieList, updateMovieList] = useState([]);
    const [selectedMovie, onMovieSelect] = useState();

    const fetchData = async (searchString) => {
        const response = await Axios.get(`https://www.omdbapi.com/?s=${searchString}&apikey=${API_KEY}`);

        console.log(response);
        updateMovieList(response.data.Search);
    };

    const onTextChange = (event) => {
        onMovieSelect("")
        clearTimeout(timeoutId);
        UpdatedSearchQuery(event.target.value);
        // const timeout = setTimeout(() => fetchData("'API call'"), 500);
        const timeout = setTimeout(() => fetchData(event.target.value), 500);

        UpdateTimeOutId(timeout);
    };

    return (
        <>
            <Container>
                <Header>
                    <AppName>
                        <MovieImage src={movieicon} />
                        Movie App
                    </AppName>
                    <SearchBox>
                        <SearchIcon src={searchicon} />

                        <SearchInput placeholder="Search Movie" 
                        value={searchQuery} 
                        onChange={onTextChange} />
                    </SearchBox>
                </Header>

                {selectedMovie && <MovieInfoComponent selectedMovie={selectedMovie} onMovieSelect={onMovieSelect} />}

                <MovieListContainer>
                    {movieList?.length ? (
                        movieList.map((movie, index) => (
                            <MovieComponent key={index}
                             movie={movie}
                              onMovieSelect={onMovieSelect} />
                        ))
                    ) : (
                        <Placeholder src={movieicon} />
                    )}
                </MovieListContainer>
            </Container>
        </>
    );
}

export default App;
