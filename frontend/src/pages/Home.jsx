import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from "../components/Navbar"
import styled from 'styled-components';


function Home() {
  

  return (
    <>
    <Navbar></Navbar>
    <Container>
        <p>WELCOME HOME</p>
    </Container>
    
    </>
  );
}

export default Home;

const Container = styled.div`
text-align:center;
`