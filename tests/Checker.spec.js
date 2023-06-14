import { test, expect } from '@playwright/test'
import { CheckerPage } from '../Pages/Page_checker'
import playwrightConfig from '../playwright.config'

test('Checker Program', async ({ page }) => {
    const datalocator = require('../testdata/dataprovider.json')
    const dom = datalocator['Checker_Data']
    const sel = datalocator['Checker_Locators']
    
    const CP = new CheckerPage(page)

    //Open the Checker page and verify Page is up
    await page.goto(dom.CheckerURL);
    await expect(page).toHaveTitle(dom.CheckerTitle_Expected);
    await page.waitForSelector(sel.obj_tocheckBoardLoad);


    //Get the initial coin positions from board
    const initBoard = await page.$eval(sel.obj_tocheckBoardLoad, (board) => board.innerHTML);
    let currentBoard = initBoard;

    //First Move & verify Orange move is successful
    currentBoard = await CP.MoveOrangePiece(dom.FirstMoveFrom + "->" + dom.FirstMoveTo, currentBoard);
    await page.waitForTimeout(1000);
    //verify Blue move is completed after Orange move
    currentBoard = await CP.VerifyBlueMove(currentBoard);

    //Second move
    currentBoard = await CP.MoveOrangePiece(dom.SecondMoveFrom + "->" + dom.SecondMoveTo, currentBoard);
    await page.waitForTimeout(1000);
    currentBoard = await CP.VerifyBlueMove(currentBoard);

    //Third Move
    currentBoard = await CP.MoveOrangePiece(dom.ThirdMoveFrom + "->" + dom.ThirdMoveTo, currentBoard);
    await page.waitForTimeout(1000);
    currentBoard = await CP.VerifyBlueMove(currentBoard);

    //fourth Move
    currentBoard = await CP.MoveOrangePiece(dom.FourthMoveFrom + "->" + dom.FourthMoveTo, currentBoard);
    await page.waitForTimeout(1000);
    currentBoard = await CP.VerifyBlueMove(currentBoard);

    //Fifth Move
    currentBoard = await CP.MoveOrangePiece(dom.FifthMoveFrom + "->" + dom.fifthMoveTo, currentBoard);
    await page.waitForTimeout(1000);
    currentBoard = await CP.VerifyBlueMove(currentBoard);

    await CP.RefreshandVerify(initBoard);
})
