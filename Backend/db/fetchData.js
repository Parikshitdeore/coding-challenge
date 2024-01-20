const axios = require('axios');

const fetchData =async()=>{
  try {
    const res = await axios.get('https://s3.amazonaws.com/roxiler.com/product_transaction.json');
    return res.data;
  } catch (err) {
    console.error('Error fetching data from the API:', err);
  }
}

module.exports = fetchData;