import React from 'react';
import { useParams } from 'react-router-dom';
import { gql, useQuery } from '@apollo/client';
import styled from 'styled-components';

const GET_MOVIE = gql`
    query movie($id: Int!) {
        movie(id: $id) {
            title
            medium_cover_image
            rating
            genres
            year
            description_intro
        }
    }
`;

const Container = styled.div`
    height: 100vh;
    background-image: linear-gradient(-45deg, #AA076B, #61045F);
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    color: white;
`;

const Column = styled.div`
    margin-left: 10px;
    width: 50%;
`;

const Title = styled.h1`
    font-size: 65px;
    margin-bottom: 15px;
    font-family: 'Lobster', cursive;
`;

const Subtitle = styled.h4`
    font-size: 32px;
    font-family: Inconsolata;
    margin-bottom: 10px;
`;

const Description = styled.p`
    font-size: 24px;
    font-family: Inconsolata;
`;

const Poster = styled.div`
    width: 25%;
    height: 60%;
    background-color: transparent;
    background-image: url(${props => props.bg});
    background-size: cover;
    background-position: center center;
`;

function Detail() {
    const { id } = useParams();
    const { loading, data } = useQuery(GET_MOVIE, {
        variables: { id: parseInt(id) }
    });

    return (
        <Container>
            <Column>
                <Title>
                {loading
                    ? "Loading..."
                    : `${data?.movie?.title}`}
                </Title>
                <Subtitle>
                <div>{data?.movie?.year} {!loading ? '/' : null} {data?.movie?.rating}</div>
                </Subtitle>
                <Description>{data?.movie?.description_intro}</Description>
            </Column>
            <Poster bg={data?.movie?.medium_cover_image}></Poster>
        </Container>
    );
}

export default Detail;
