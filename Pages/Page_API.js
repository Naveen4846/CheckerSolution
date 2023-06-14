exports.APIPage = class APIPage {

    constructor(page) {
        this.page = page
    }


    async POSTMethord(strURL) {
        try {
            const response = await fetch(strURL, {
                method: 'POST',
                body: JSON.stringify({ data: 'payload' }),
                headers: { 'Content-Type': 'application/json' },
            });

            if (!response.ok) {
                throw new Error(`Unable to draw a new deck/shuffle; Error Details - ${response.status}`);
            }
            //console.log(data);  - To view entire deck details
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error occurred while draw a new deck/shuffle: Error Details ', error);
            throw error; // re-throw the error to fail the test or handle it accordingly
        }
    }

    async GETMethord(strURL) {

        try {
            const response = await fetch(strURL, {
                method: 'GET',
            });

            if (!response.ok) {
                throw new Error(`Unable to draw cards for two players: Error Details -  ${response.status}`);
            }

            const data = await response.json();
            //console.log(data);  - To view entire deck details
            return data;
        } catch (error) {
            console.error('Unable to draw cards for two players: Error Details :', error);
            throw error; // re-throw the error to fail the test or handle it accordingly
        }
    }

    async CheckBlackJack(Player, cardValues
    ) {
        const hasAce = cardValues.includes('AD') || cardValues.includes('AC') || cardValues.includes('AH') || cardValues.includes('AS');
        const hasTenValueCard = cardValues.includes('0S') || cardValues.includes('0C') || cardValues.includes('0H') || cardValues.includes('0D') ||
            cardValues.includes('JS') || cardValues.includes('JC') || cardValues.includes('JH') || cardValues.includes('JD') ||
            cardValues.includes('QS') || cardValues.includes('QC') || cardValues.includes('QH') || cardValues.includes('QD') ||
            cardValues.includes('KS') || cardValues.includes('KC') || cardValues.includes('KH') || cardValues.includes('KD');

        const isBlackjack = hasAce && hasTenValueCard;

        if (isBlackjack) {
            console.log(Player + '  hand is blackjack!');
        } else {
            console.log(Player + '  hand is not blackjack.');
        }
    }

}
