import { test, expect, request } from '@playwright/test'
import { APIPage } from '../Pages/Page_API'


let _deckid;

test('Create API Request', async ({ page }) => {

    const datalocator = require('../testdata/dataprovider.json')
    const dom = datalocator['Deck_Data']
    const AP = new APIPage(page);

    //Open website and verify it is up
    await page.goto(dom.Deck_Home);
    await expect(page).toHaveTitle(dom.Deck_Title);

    // Get the new Deck
       
    //const newdeck = dom.NewDeck;
    const data = await AP.POSTMethord(dom.NewDeck);

    // Get the new Deck ID from response
    const DeckID = data['deck_id'];
    console.log("A New deck successfully draw and New Deck ID: " + DeckID);

    //shuffle the deck
    const newShuffle = "https://deckofcardsapi.com/api/deck/" + DeckID + "/shuffle/"
    const data1 = await AP.POSTMethord(newShuffle);
    console.log("A New deck (" + DeckID + ") successfully shuffled");

    //draw each 3 cards for 2 players 
    const drawcards = "https://deckofcardsapi.com/api/deck/" + DeckID + "/draw/?count=6"
    const data2 = await AP.GETMethord(drawcards);
    const getCodesFromResponse = (response) => {
        const codes = response.cards.map((card) => card.code);
        return codes;
    };
    const codes1 = getCodesFromResponse(data2);

    //Display each players cards
    const player1Cards = [];
    player1Cards.push(codes1[0]);
    player1Cards.push(codes1[2]);
    player1Cards.push(codes1[4]);
    console.log("Player 1 Cards - " + player1Cards.join(" "));

    const player2Cards = [];
    player2Cards.push(codes1[1]);
    player2Cards.push(codes1[3]);
    player2Cards.push(codes1[5]);
    console.log("Player 2 Cards - " + player2Cards.join(" "));

    //Verify which player has Black Jack
    AP.CheckBlackJack("Player1", player1Cards);
    AP.CheckBlackJack("Player2", player2Cards);

})



