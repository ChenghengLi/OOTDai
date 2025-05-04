const API_KEY = "API_KEY"; // Replace with your actual API key

export async function runFashnAI(modelImage, garmentImage, category) {
    try {
      const response = await fetch('https://api.fashn.ai/v1/run', {
        method: 'POST',
        body: JSON.stringify({
          model_image: modelImage,
          garment_image: garmentImage,
          category: category
        }),
        headers: {
          'Authorization': 'Bearer '+ API_KEY,
          'Content-Type': 'application/json'
        }
      });
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }


  export async function getFashnAIStatus(id) {
    try {
      const response = await fetch(`https://api.fashn.ai/v1/status/${id}`, {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer '+ API_KEY,
        }
      });
      
      const data = await response.json();
      console.log(data);
      return data;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }
