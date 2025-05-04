import express from "express";
import fetch from "node-fetch";
import cors from "cors";
import https from 'follow-redirects';
const app = express();
const PORT = 3001;

app.use(cors());


async function getOAuth2Token(clientId, clientSecret, oauth2Url, scopes = null) {
  /**
   * Get OAuth2 token using client credentials flow.
   *
   * @param {string} clientId - OAuth2 client ID
   * @param {string} clientSecret - OAuth2 client secret
   * @param {string} oauth2Url - OAuth2 token endpoint URL
   * @param {Array} scopes - List of scopes to request (optional)
   * @returns {Object} The JSON response containing the access token if successful
   */
  
  // Convert scope list to space-separated string if provided
  const scopeStr = scopes ? scopes.join(' ') : '';
  
  // Prepare the form data
  const data = new URLSearchParams();
  data.append('grant_type', 'client_credentials');
  
  // Add scopes if provided
  if (scopeStr) {
    data.append('scope', scopeStr);
  }
  
  // Create Authorization header with Base64 encoded credentials
  const credentials = btoa(`${clientId}:${clientSecret}`);
  
  // Headers
  const headers = {
    'User-Agent': 'OpenPlatform/1.0',
    'Content-Type': 'application/x-www-form-urlencoded',
    'Authorization': `Basic ${credentials}`
  };
  
  try {
    // Make the request
    const response = await fetch(oauth2Url, {
      method: 'POST',
      headers: headers,
      body: data
    });
    
    // Check if the request was successful
    if (response.ok) {
      return await response.json();
    } else {
      console.error(`Error: ${response.status}`);
      const errorText = await response.text();
      console.error(errorText);
      return null;
    }
  } catch (error) {
    console.error('Request failed:', error);
    return null;
  }
}



app.get("/api/search", async (req, res) => {
  const imageUrl = req.query.image;
  if (!imageUrl) return res.status(400).json({ error: "Missing image URL" });

  const apiUrl = `https://api.inditex.com/pubvsearch/products?image=${imageUrl}`;
  const r =  await getOAuth2Token(
    "",
    "",
    "https://auth.inditex.com:443/openam/oauth2/itxid/itxidmp/access_token",
    ["technology.catalog.read"]
  );

  
  try {
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {

        "Authorization": "Bearer "+ r.id_token,
        "User-Agent": "OpenPlatform/1.0",
        "Content-Type": "application/json"
      }
    });

    if (!response.ok) {
      return res.status(response.status).json({ error: "Failed to fetch from Inditex API" });
    }

    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Server error", details: err.message });
  }
});

const API_KEY = "API_KEY"; // Replace with your actual API key
async function pixelcutTryOn(personImageUrl, garmentImageUrl) {
  const options = {
    method: 'POST',
    hostname: 'api.developer.pixelcut.ai',
    path: '/v1/try-on',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'X-API-KEY': API_KEY
    },
    maxRedirects: 20
  };

  const postData = JSON.stringify({
    person_image_url: personImageUrl,
    garment_image_url: garmentImageUrl
  });

  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let chunks = [];

      res.on('data', (chunk) => {
        chunks.push(chunk);
      });

      res.on('end', () => {
        const body = Buffer.concat(chunks);
        resolve(body.toString());
      });

      res.on('error', (error) => {
        reject(error);
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    req.write(postData);
    req.end();
  });
}

app.post('/api/try-on', async (req, res) => {
  const { personImageUrl, garmentImageUrl } = req.body;

  if (!personImageUrl || !garmentImageUrl) {
    return res.status(400).json({ error: 'personImageUrl and garmentImageUrl are required' });
  }

  try {
    const result = await pixelcutTryOn(personImageUrl, garmentImageUrl);
    res.json(JSON.parse(result));
  } catch (error) {
    console.error('Error processing try-on request:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});




app.listen(PORT, () => {
  console.log(`Proxy server running on http://localhost:${PORT}`);
});




