
let apiKeys = [
    'aa20ce0acfmsh820fa73966e1f49p104bc3jsnad947b7a8b4a',
    'bf45f459fdmshbf4fb978769e251p1f6e9cjsn46f3034e1063',
    'fa055f58ebmshac1e8ef01cb63ebp151717jsn7315f36c98a6',
    '554e5b43f4msh46fef0c1b5909a8p1f8d2cjsna41abaf8c30d',
    '3b1a7f8c4emsh88004e57e9daef9p123a81jsn40b687e58d08',
    'debb5b69afmshb5aed4e61950cddp11adf5jsn43f69ebb52a2'

  ];
  
  let currentApiKeyIndex = 0;
  
  function getCurrentApiKey() {
    return apiKeys[currentApiKeyIndex];
  }
  
  function switchToNextApiKey() {
    currentApiKeyIndex = (currentApiKeyIndex + 1) % apiKeys.length;
  }
  exports.getCurrencies = async (req, res) => {
    const url = 'https://currency-converter18.p.rapidapi.com/api/v1/supportedCurrencies';
    let apiKey = getCurrentApiKey(); // Utilisez let pour permettre la réassignation de la clé API actuelle
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': apiKey,
        'X-RapidAPI-Host': 'currency-converter18.p.rapidapi.com'
      }
    };
  
    try {
      const { default: fetch } = await import('node-fetch');
      const response = await fetch(url, options);
      const result = await response.text();
      const resultJson = JSON.parse(result);
      if (resultJson && resultJson.message) {
        switchToNextApiKey();
  
        apiKey = getCurrentApiKey();
        options.headers['X-RapidAPI-Key'] = apiKey;
        try {
          const { default: fetch } = await import('node-fetch');
          const response = await fetch(url, options);
          const result = await response.text();
          const resultJson = JSON.parse(result);
          if (resultJson && resultJson.message) {
            console.log('La récupération des devises a échoué. Veuillez réessayer.');
          } else {
            res.status(200).json(result);
          }
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: 'Une erreur s\'est produite lors de la récupération des devises.' });
        }
      } else {
        res.status(200).json(result);
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Une erreur s\'est produite lors de la récupération des devises.' });
    }
  };
  
  exports.convertir = async (req, res) => {
    const { default: fetch } = await import('node-fetch');
  
    const { amount, from, to } = req.body;
    let apiKey = getCurrentApiKey();
  
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': apiKey,
        'X-RapidAPI-Host': 'currency-converter18.p.rapidapi.com'
      }
    };
  
    const url = `https://currency-converter18.p.rapidapi.com/api/v1/convert?from=${from}&to=${to}&amount=${amount}`;
  
    try {
      let response = await fetch(url, options);
      let data = await response.json();
      if (data && data.result && data.result.convertedAmount) {
        const convertedAmount = data.result.convertedAmount.toFixed(2);
        res.json({ convertedAmount });
      } else {
        switchToNextApiKey();
  
        apiKey = getCurrentApiKey();
        options.headers['X-RapidAPI-Key'] = apiKey;
    
        try {
          let response = await fetch(url, options);
          let data = await response.json();

          if (data && data.result && data.result.convertedAmount) {
              const convertedAmount = data.result.convertedAmount.toFixed(2);
              res.json({ convertedAmount });
            } else {
             console.log('La conversion a échoué. Veuillez réessayer.' );
            }
            
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: 'Une autre erreur s\'est produite lors de la conversion.' });
        }    
     }
      
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Une erreur s\'est produite lors de la conversion.' });   
    }
  };
  
  
