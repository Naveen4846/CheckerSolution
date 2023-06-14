exports.CheckerPage = class CheckerPage {

    constructor(page) {
        this.page = page
    }
    async MoveOrangePiece(location, BoardVal) {
        let myArray = location.split("->");
        let from_location = myArray[0];
        let to_location = myArray[1];

        const selector = '[onclick="didClick(' + from_location + ')"]';
        await this.page.click(selector);
        await this.page.waitForTimeout(1000);

        const selector1 = '[onclick="didClick(' + to_location + ')"]';
        await this.page.click(selector1);


        //verify movement is done

        let OrangeMove = await this.page.$eval('.boardWrapper', (board) => board.innerHTML);
        if (OrangeMove === BoardVal) {
            console.log("Orange Piece is not moved");
            throw new Error('Orange Piece is not moved - Pleaes verify the Test');
        }
        else {
            console.log("Orange Piece moved from position(" + from_location + ") to position( " + to_location + ") successfully");
        }
        await this.page.waitForTimeout(1000);

        return OrangeMove;


    }

    async VerifyBlueMove(BoardVal) {

        let BlueMove = await this.page.$eval('.boardWrapper', (board) => board.innerHTML);
        if (BlueMove === BoardVal) {
            console.log("Blue Piece is not moved");
            throw new Error('Blue Piece is not moved - Pleaes verify the Test');
        }
        else {
            console.log("Blue Piece moved successfully \n");
        }
        await this.page.waitForTimeout(1000);

        return BlueMove;
    }

async RefreshandVerify(initBoard){
    //Reset the Game
    this.page.click("text=Restart...")
    await this.page.waitForTimeout(5000);

    //Verify refresh is brining pieces back to its base position
    const RefreshBoard = await this.page.$eval('.boardWrapper', (board) => board.innerHTML);
    if (initBoard === RefreshBoard) {
        console.log("Refresh Successfully and verified");
    }
    else {
        console.log("Checker is not refreshed properly");
        throw new Error('Checker is not refreshed properly');
    }
}


}