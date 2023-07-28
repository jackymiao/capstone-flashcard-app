import React, {useState, useEffect} from "react";
import {Switch, Route, useRouteMatch} from "react-router-dom";

import Header from "./Header";
import NotFound from "./NotFound";
import DeckList from './DeckList';
import AddDeck from "./AddDeck";
import DeckProfile from "./DeckProfile";
import data from "../data/db.json"
import NavBar from "./NavBar";


function Layout() {
  const[deckData, setDeckData] = useState(data.decks);
  const[cardData, setCardData] = useState(data.cards);
  const [currentUrl, setCurrentUrl] = useState("");



  

  useEffect(()=>{
    setDeckData(()=>data.decks);
    setCardData(()=>data.cards);
  },[])


 
  function addDeck(newDeck){
    setDeckData([
      ...deckData,
      newDeck
    ])
  }

  function editDeck(currentDeck, newDeckData){
    let updatedDeckData = deckData.map(d=>d===currentDeck?newDeckData:d);
    setDeckData(updatedDeckData)
  }

  function addCard(newCard){
    setCardData([
      ...cardData,
      newCard
    ])
  }

  return (
    <div>
      <Header />
      <div className="container">
        {/* TODO: Implement the screen starting here */}
        <Switch>
          <Route path="/" exact>
            <DeckList deckData={deckData} cardData={cardData} />
          </Route>
          <Route path="/decks/new">
          <NavBar currentUrl={currentUrl} />
            <AddDeck setDeckData={setDeckData} addDeck={addDeck} deckData={deckData} />
          </Route>

          <Route path="/decks/:deckId">
            <NavBar currentUrl={currentUrl} />
            <DeckProfile deckData={deckData} cardData={cardData} editDeck={editDeck} setCurrentUrl={setCurrentUrl} addCard={addCard} />
          </Route>

          <Route>
        <NotFound />
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default Layout;
