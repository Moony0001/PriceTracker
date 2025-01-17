import axios from 'axios';

const COINGECKO_BASE_URL = process.env.COINGECKO_BASE_URL || 'https://api.coingecko.com/api/v3';
const API_KEY = process.env.COINGECKO_API_KEY;

/*
* Fetches cryptocurrency prices from CoinGecko API
* @param currencies Array of cryptocurrency IDs (e.g. ['bitcoin', 'ethereum'])
* @param currencySymbol Currency symbol for pricing (e.g. 'usd')
*/

export const fetchCryptoPrices = async (
    currencies: string [],
    currencySymbol: string = 'usd'
): Promise < Record < string, any >> => {
    try {
        const response = await axios.get(`${COINGECKO_BASE_URL}/simple/price`, {
            params: {
                ids: currencies.join(','),  // e.g., 'bitcoin,ethereum'
                vs_currencies: currencySymbol   // e.g., 'usd'

            },
        });

        return response.data;
    } catch (error) {
        console.error('Error fetching cryptocurrency prices:', error);
        throw new Error('Failed to fetch cryptocurrency prices');
    }
};