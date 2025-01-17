import express from 'express';
import Alert from '../models/alert.model'; // MongoDB model or equivalent

const router = express.Router();

// Create Alert
router.post('/', async (req, res) => {
    try {
        console.log('Received request body:', req.body); // Log the request body
        const { userId, cryptocurrency, currencySymbol, priceThreshold, thresholdType } = req.body;
  
        const alert = new Alert({
            userId,
            cryptocurrency,
            currencySymbol,
            priceThreshold,
            thresholdType,
        });
  
        await alert.save();
        res.status(201).json({ message: 'Alert created successfully', alert });
    } catch (error) {
      console.error('Error creating alert:', error);
      res.status(500).json({ error: 'Failed to create alert' });
    }
  });

  // List Alerts
router.get('/', async (req, res) => {
    try {
      const alerts = await Alert.find(); // Customize query for user-specific alerts
      res.status(200).json(alerts);
    } catch (error) {
      console.error('Error fetching alerts:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
});
  
// Delete Alert
router.delete('/:id', async (req, res) => {
    try {
      const { id } = req.params;
      await Alert.findByIdAndDelete(id);
      res.status(200).json({ message: 'Alert deleted' });
    } catch (error) {
      console.error('Error deleting alert:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
});



export default router;
