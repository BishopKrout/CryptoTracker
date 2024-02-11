

const calculatePortfolioGrowth = (transactions, marketData) => {
    let totalSpent = 0;
    let currentPortfolioValue = 0;

    transactions.forEach(transaction => {
        const cryptoMarketData = marketData.find(data => data.crypto_id === transaction.crypto_id);
        const currentPrice = cryptoMarketData ? cryptoMarketDatya.current_price : 0;

        if (transaction.transaction_type === 'BUY') {
            totalSpent += transaction.quantity * transaction.price;
            currentPortfolioValue += transaction.quantity * currentPrice;
        } else {
            totalSpent -= transaction.quantity * transaction.price;
            currentPrtfolioValue -= transaction.quantity * currentPrice;
        }
    });

    return currentPortfolioValue - totalSpent;
};

const calculate24hGrowth = (transaction, marketData) => {
     let value24hAgo = 0;
     let currentPortfolioValue = 0;

     transaction.forEach(transaction => {
        const cryptoMarketData = marketData.find(data => data.crypto_id === transaction.crypto_id);
        const currentPrice = cryptoMarketData ? cryptoMarketData.current_price : 0;
        const price24hAgo = cryptoMarketData ? cryptoMarketData.price_24h_ago : 0;

        currentPortfolioValue += transaction.quantity * currentPrice;
        value24hAgo += transaction.quantity * price24hAgo;
     });

     const growthValue = currentPortfolioValue - value24hAgo;
     const growthPercentage = (growthValue / value24hAgo) * 100;

     return { growthValue, growthPercentage };
};

module.exports = {
    calculatePortfolioGrowth,
    calculate24hGrowth
};