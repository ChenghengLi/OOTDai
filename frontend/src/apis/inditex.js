

/**
 * Search for products using an image URL via the local proxy server
 * @param {string} imageUrl - The URL of the image to search with
 * @param {object} options - Optional configuration
 * @param {string} options.proxyUrl - Custom proxy URL (defaults to localhost:3001)
 * @param {number} options.timeout - Request timeout in milliseconds
 * @returns {Promise<object>} The search results or error information
 */
export async function searchProductsByImage(imageUrl, options = {}) {
  // Default options with ability to override
  const {
    proxyUrl = "http://localhost:3001/api/search",
    timeout = 10000 // 10 second default timeout
  } = options;
  
  // Input validation
  if (!imageUrl) {
    return {
      status: 'error',
      message: 'Image URL is required'
    };
  }
  
  // Ensure the imageUrl is properly encoded
  const encodedImageUrl = encodeURIComponent(imageUrl);
  
  try {
    // Create AbortController for timeout handling
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);
    
    const response = await fetch(`${proxyUrl}?image=${encodedImageUrl}`, {
      method: "GET",
      headers: {
        "Accept": "application/json"
      },
      signal: controller.signal
    });
    
    // Clear the timeout
    clearTimeout(timeoutId);
    
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`API error (${response.status}): ${errorText || 'Unknown error'}`);
    }
    
    const data = await response.json();
    
    // Return a standardized response structure
    return {
      success: true,
      status: response.status,
      data
    };
  } catch (error) {
    // Handle different error types
    if (error.name === 'AbortError') {
      console.error("Request timed out:", error);
      return {
        success: false,
        status: 'timeout',
        message: `Request timed out after ${timeout}ms`
      };
    }
    
    console.error("Error searching products:", error);
    return {
      success: false,
      status: 'error',
      message: error.message
    };
  }
}

