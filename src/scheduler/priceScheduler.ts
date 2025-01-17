import cron from 'node-cron';

import { fetchCryptoPrices } from '../services/cryptoService';
import {redisClient} from '../config/redis';

import { getCache } from '../config/redis';
import Alert from '../models/alert.model'

const CRYPTOCURRENCIES = ['bitcoin', 'ethereum', 'dogecoin'];
const CURRENCY_SYMBOL = 'usd';

const schedulePriceUpdates = () => {
    cron.schedule('* * * * *', async () => {
        console.log('Fetching latest cryoptocurrency prices...');
        try {
            const cacheKey = `prices:${CURRENCY_SYMBOL}:${CRYPTOCURRENCIES.join(',')}`;

            // Check if prices are already cached
            const cachedPrices = await getCache(cacheKey);

            if (cachedPrices) {
                console.log('Prices already cached:', cachedPrices);
                return;
            }
            console.log('Cache miss: Fetching prices from external API');
            const prices = await fetchCryptoPrices(CRYPTOCURRENCIES, CURRENCY_SYMBOL);

            // Cache the prices in Redis
            await redisClient.set(cacheKey, JSON.stringify(prices),{
                EX: 60, // Cache for 1 minute
            });

            console.log('Prices updated and cached: ', prices);

            // Check alerts
            const alerts = await Alert.find({ isTriggered: false });
            for (const alert of alerts) {
                const currentPrice = prices[alert.cryptocurrency]?.usd;
                if (!currentPrice) continue;

                const shouldTrigger =
                (alert.thresholdType === 'price-increase' && currentPrice > alert.priceThreshold) ||
                (alert.thresholdType === 'price-decrease' && currentPrice < alert.priceThreshold);

                if (shouldTrigger) {
                    console.log(
                        `ALERT: ${alert.cryptocurrency.toUpperCase()} has ${
                          alert.thresholdType === 'price-increase' ? 'increased above' : 'decreased below'
                        } ${alert.priceThreshold} ${alert.currencySymbol.toUpperCase()}`
                    );
                    // Mark alert as triggered
                    alert.isTriggered = true;
                    await alert.save();
                }
            }
        } catch (error) {
            console.error('Error updating prices:', error);
        }
    });
};

export default schedulePriceUpdates;