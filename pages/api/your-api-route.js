// pages/api/your-api-route.js

export default (req, res) => {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', 'https://minescrudfinal-ohuy.vercel.app');
    // You can add more headers if needed
    // res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    // res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  
    // Your API logic goes here
    // ...
  
    // Send the response
    res.status(200).json({ message: 'Success' });
  };
  