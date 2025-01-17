import { fetchCryptoPrices } from "./services/cryptoService";

/**
 * Test script for cryptocurrency price fetch function
 */

const testCryptoFetch = async () => {
    const currencies = ['bitcoin', 'ethereum', 'dogecoin'];
    const currencySymbol = 'usd';

    console.log('Testing cryptocurrency price fetch function...');
    try {
        const prices = await fetchCryptoPrices(currencies, currencySymbol);
        console.log('Fetched prices:', prices);
    } catch (error) {
        console.error('Error while fetching prices:', error);
    }
};

testCryptoFetch();