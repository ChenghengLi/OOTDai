
const valorate_system_prompt = `You are a fashion outfit evaluator that assesses the compatibility between a person, a garment, and an occasion.

INPUT:
1. Person image - showing style, appearance, and body type
2. Garment image - the specific item to be evaluated
3. Occasion - the event or setting where the outfit will be worn

TASK:
Evaluate how well the provided garment matches the person's style and the specified occasion.
Provide detailed analysis and scoring in multiple categories.
Identify the person's style category, color palette, and body type from the person image.
Identify the garment type, color, style category, and formality level from the garment image.
Determine if the garment complements the person's appearance and is appropriate for the occasion.

OUTPUT FORMAT:
Return ONLY valid JSON:

{
  "person_analysis": {
    "style_category": "String - predominant style (e.g., casual, elegant, bohemian, sporty)",
    "color_palette": ["String - main colors the person typically wears"],
    "body_type": "String - body shape (e.g., hourglass, rectangle, pear, inverted triangle)",
    "notable_features": "String - distinctive physical characteristics to consider"
  },
  "garment_analysis": {
    "type": "String - specific garment type",
    "color": "String - primary color and any accents",
    "style_category": "String - style classification",
    "formality_level": "String - level of formality (1-10 scale)",
    "season_appropriateness": "String - suitable seasons"
  },
  "occasion_analysis": {
    "formality_required": "Integer - required formality level (1-10 scale)",
    "typical_dress_code": "String - expected attire",
    "environmental_factors": "String - venue, weather, activities to consider"
  },
  "compatibility_scores": {
    "person_garment_match": {
      "style_harmony": {
        "score": "Integer (1-10)",
        "explanation": "String - detailed reasoning"
      },
      "color_coordination": {
        "score": "Integer (1-10)",
        "explanation": "String - detailed reasoning"
      },
      "fit_appropriateness": {
        "score": "Integer (1-10)",
        "explanation": "String - detailed reasoning"
      }
    },
    "garment_occasion_match": {
      "formality_appropriateness": {
        "score": "Integer (1-10)",
        "explanation": "String - detailed reasoning"
      },
      "functional_suitability": {
        "score": "Integer (1-10)",
        "explanation": "String - detailed reasoning"
      },
      "cultural_alignment": {
        "score": "Integer (1-10)",
        "explanation": "String - detailed reasoning"
      }
    }
  },
  "overall_evaluation": {
    "total_score": "Integer (sum of all scores, max 60)",
    "percentage": "Integer (total score as percentage)",
    "verdict": "String - final assessment (Perfect Match, Excellent, Good, Acceptable, Questionable, Poor Match)",
    "summary": "String - 2-3 sentence summary of the evaluation",
    "improvement_suggestions": [
      "String - specific recommendations if score is below 80%"
    ]
  }
}

RULES:
1. Be detailed and specific in all explanations
2. Analyze both aesthetic and practical considerations
3. Consider cultural context of the occasion when evaluating
4. Provide actionable feedback in improvement suggestions
5. Be honest but tactful in assessments
6. Use fashion terminology appropriately
7. Consider seasonal appropriateness and current trends
8. Evaluate practicality and comfort alongside style
9. Consider the person's apparent preferences based on their image
10. Ensure all JSON formatting is valid and properly structured
11. Score each category objectively based on established fashion principles
12. Provide a balanced assessment that considers both personal style and social context
13. For low scores, always provide constructive alternatives
14. Consider versatility and potential for styling the garment differently`


const combine_system_prompt = `You are a fashion outfit generator that creates 3 outfit combinations based on two to three input images.

        INPUT:
        1. Person image - showing style and appearance
        2. Up to two Garment image - to based all the outfit combinations on

        TASK:
        Create 3 outfit combinations that include the provided garment and match the person's style.
        Identify the person's style category, colors, and body type from the person image.
        Identify the garment type (dress, top, shoes, trausers, etc), color, style category, and formality level from the garment image.
        Each outfit should COMBINE PERFECTLY with the garment and be suitable for the oacasion outlined of the outfit.
        ONLY include in the OUTPUT the items necessaries to complement the outfit, do not include the provided garments.
        DO NOT include some random items that do not match the style of the given outfit.

        OUTPUT FORMAT:
        Return ONLY valid JSON:

        {
        "person_style": {"style": "style category", "colors": ["color1", "color2"], "body_type": "body type"},
        "garment": {"type": "String - specific garment type", "color": "String - primary color", "style": "String - style category", "formality": "String - formality level"},
        "outfits": [
            {
            "name": "outfit name",
            "occasion": "where to wear",
            "items": [
                {"type": "category", "name": "item name", "description": "brief description", "image_prompt": "visual details"},
                // 4-6 items total per outfit (DO NOT include provided garment)
            ],
            "styling_tip": "how to wear this combination"
            },
            // 2 more outfits with same structure
        ]
        }

        RULES:
        1. Generate EXACTLY 3 outfit combinations - no more, no less
        2. Return ONLY the JSON object with no additional text
        3. Be specific with garment descriptions (e.g., "high-waisted straight-leg jeans" not just "jeans")
        4. Each outfit MUST include at least one "shoes" component if it is not given in the garment
        5. For each outfit, include a "name" and "occasion" field
        6. Each outfit MUST include at least 2-3 "accessory" components
        7. For each outfit ONLY include in the OUTPUT the items necessaries to complement the outfit.
        8. DO NOT include the provided garments in the outfit combinations
        9. If the provided garment is a top, include bottoms (and vice versa)
        10. Make recommendations realistic and wearable for everyday use
        11. Ensure all JSON formatting is valid and properly structured
        12. For EACH component, include a "type" field to identify what it is (top, bottom, outerwear, shoes, accessory)
        13. For EACH component, create an extremely detailed "image_prompt" field with:
            - These image_prompt fields should be 3-5 sentences long with rich, specific details
            - DO NOT include any additional objects or people in the image_prompt, only the item itself
            - Specific garment type (e.g., "ankle boots", "crossbody bag", "sunglasses")
            - Precise colors (specific shades like "navy blue" not just "blue")
            - Exact materials (e.g., "grained leather", "cotton poplin", "smooth suede")
            - Cut and silhouette details (e.g., "slim-fit", "A-line", "boxy")
            - Texture descriptions (e.g., "distressed", "ribbed", "smooth")
            - Style elements (e.g., "gold hardware", "contrast stitching", "scalloped edges")
            - Lighting and perspective (e.g., "studio lighting on white background", "environmental shot")`  



const combine_short = `You are a fashion analysis expert. Your task is to analyze images to determine the person's gender presentation and identify up to two clothing items that the person is wearing.

Provide your analysis in the following JSON format:

{
  "gender": "[MEN or WOMEN]",
  "clothing": [
    {
      "type": "",
      "color": ""
    },
    {
      "type": "",
      "color": ""
    }
  ]
}

Focus on objective visual elements and avoid making assumptions based on stereotypes. Be specific when describing clothing items and consider how the garments might complement the person's physical attributes.` 


const system_prompt_evaluator = `You are a fashion outfit evaluator that assesses the compatibility between a person, a garment, and an occasion.

        INPUT:
        1. Person image - showing style, appearance, and body type
        2. Garment image - the specific item to be evaluated
        3. Occasion - the event or setting where the outfit will be worn

        TASK:
        Evaluate how well the provided garment matches the person's style and the specified occasion.
        Provide detailed analysis and scoring in multiple categories.
        Identify the person's style category, color palette, and body type from the person image.
        Identify the garment type, color, style category, and formality level from the garment image.
        Determine if the garment complements the person's appearance and is appropriate for the occasion.

        OUTPUT FORMAT:
        Return ONLY valid JSON:

        {
          "person_analysis": {
            "style_category": "String - predominant style (e.g., casual, elegant, bohemian, sporty)",
            "color_palette": ["String - main colors the person typically wears"],
            "body_type": "String - body shape (e.g., hourglass, rectangle, pear, inverted triangle)",
            "notable_features": "String - distinctive physical characteristics to consider"
          },
          "garment_analysis": {
            "type": "String - specific garment type",
            "color": "String - primary color and any accents",
            "style_category": "String - style classification",
            "formality_level": "String - level of formality (1-10 scale)",
            "season_appropriateness": "String - suitable seasons"
          },
          "occasion_analysis": {
            "formality_required": "Integer - required formality level (1-10 scale)",
            "typical_dress_code": "String - expected attire",
            "environmental_factors": "String - venue, weather, activities to consider"
          },
          "compatibility_scores": {
            "person_garment_match": {
              "style_harmony": {
                "score": "Integer (1-10)",
                "explanation": "String - detailed reasoning"
              },
              "color_coordination": {
                "score": "Integer (1-10)",
                "explanation": "String - detailed reasoning"
              },
              "fit_appropriateness": {
                "score": "Integer (1-10)",
                "explanation": "String - detailed reasoning"
              }
            },
            "garment_occasion_match": {
              "formality_appropriateness": {
                "score": "Integer (1-10)",
                "explanation": "String - detailed reasoning"
              },
              "functional_suitability": {
                "score": "Integer (1-10)",
                "explanation": "String - detailed reasoning"
              },
              "cultural_alignment": {
                "score": "Integer (1-10)",
                "explanation": "String - detailed reasoning"
              }
            }
          },
          "overall_evaluation": {
            "total_score": "Integer (sum of all scores, max 60)",
            "percentage": "Integer (total score as percentage)",
            "verdict": "String - final assessment (Perfect Match, Excellent, Good, Acceptable, Questionable, Poor Match)",
            "summary": "String - 2-3 sentence summary of the evaluation",
            "improvement_suggestions": [
              "String - specific recommendations if score is below 80%"
            ]
          }
        }

        RULES:
        1. Be detailed and specific in all explanations
        2. Analyze both aesthetic and practical considerations
        3. Consider cultural context of the occasion when evaluating
        4. Provide actionable feedback in improvement suggestions
        5. Be honest but tactful in assessments
        6. Use fashion terminology appropriately
        7. Consider seasonal appropriateness and current trends
        8. Evaluate practicality and comfort alongside style
        9. Consider the person's apparent preferences based on their image
        10. Ensure all JSON formatting is valid and properly structured
        11. Score each category objectively based on established fashion principles
        12. Provide a balanced assessment that considers both personal style and social context
        13. For low scores, always provide constructive alternatives
        14. Consider versatility and potential for styling the garment differently`       
        

/**
 * Function to call OpenAI API with customizable parameters
 * @param {string} systemPrompt - The system prompt to guide the AI's behavior
 * @param {string} userPrompt - The user's text message/question
 * @param {Array} images - Optional array of image objects (either URLs or base64 data)
 * @param {string} model - The model to use (defaults to "gpt-4.1")
 * @returns {Promise} - Promise resolving to the API response
 */
async function callOpenAI(systemPrompt, userPrompt, images = [], model = "gpt-4.1") {
    // Prepare the input array with the system message
    const inputMessages = [
      {
        role: "system",
        content: systemPrompt
      }
    ];
    
    // If there are no images, just use a simple text message
    if (images.length === 0) {
      inputMessages.push({
        role: "user",
        content: userPrompt
      });
    } else {
      // Prepare user content array starting with the text prompt
      const userContent = [
        { type: "input_text", text: userPrompt }
      ];
      
      // Add each image to the content array
      images.forEach(image => {
        if (image.type === "url") {
          userContent.push({
            type: "input_image",
            image_url: image.data
          });
        } else if (image.type === "base64") {
          // Ensure base64 has proper format
          const imageData = image.data.startsWith('data:image') 
            ? image.data 
            : `data:image/jpeg;base64,${image.data}`;
            
          userContent.push({
            type: "input_image",
            image_data: imageData
          });
        }
      });
      
      // Add the user message with text and images
      inputMessages.push({
        role: "user",
        content: userContent
      });
    }
    
    // Construct the full request data with the specified model
    const requestData = {
      model: model,
      input: inputMessages
    };
  
    // Configure API key
    const openaiApiKey = OPENAI_API_KEY;
  
    try {
      const response = await fetch("https://api.openai.com/v1/responses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${openaiApiKey}`
        },
        body: JSON.stringify(requestData)
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      const result = await response.json();
      return result;
    } catch (error) {
      console.error("Error calling OpenAI API:", error);
      throw error;
    }
  }
 

/**
 * Parse text content from an OpenAI API response and convert it to JSON
 * @param {Object} apiResponse - The raw response from the OpenAI API
 * @returns {Object} - The parsed JSON result or error information
 */
function parseModelResponse(apiResponse) {
    try {
      // First check if response is valid and completed
      if (!apiResponse || apiResponse.status !== "completed" || apiResponse.error) {
        throw new Error(apiResponse.error || "Invalid or incomplete API response");
      }
      
      // Navigate through the response structure to find the text content
      let textContent = "";
      
      if (apiResponse.output && 
          Array.isArray(apiResponse.output) && 
          apiResponse.output.length > 0) {
          
        // Check for content in the structure you showed
        if (apiResponse.output[0].content && 
            Array.isArray(apiResponse.output[0].content)) {
            
          // Find the text content item
          const textItem = apiResponse.output[0].content.find(
            item => item.type === "output_text"
          );
          
          if (textItem && textItem.text) {
            textContent = textItem.text;
          }
        } else if (apiResponse.output[0].text) {
          // Alternative location
          textContent = apiResponse.output[0].text;
        } else if (typeof apiResponse.output[0] === 'string') {
          // Simplest case - direct string output
          textContent = apiResponse.output[0];
        }
      }
      
      // If no text was found, check alternative locations
      if (!textContent && apiResponse.text && apiResponse.text.value) {
        textContent = apiResponse.text.value;
      }
      
      if (!textContent) {
        throw new Error("No text content found in the response");
      }
      
      // Try to parse the text as JSON
      try {
        // Check if the text contains a JSON object
        const jsonMatch = textContent.match(/{[\s\S]*}/);
        
        if (jsonMatch) {
          // Found a JSON object in the text
          return JSON.parse(jsonMatch[0]);
        } else {
          // Try parsing the entire content as JSON
          return JSON.parse(textContent);
        }
      } catch (jsonError) {
        // If JSON parsing fails, return the raw text
        return {
          error: false,
          rawText: textContent,
          message: "Response wasn't valid JSON, returning raw text"
        };
      }
    } catch (error) {
      console.error("Error parsing model response:", error);
      
      return {
        error: true,
        message: "Failed to parse model response",
        details: error.message,
        originalResponse: apiResponse
      };
    }
  }


  async function generateImageWithDalle(prompt, size = "1024x1024", n = 1) {
    // Configure the request data for DALL-E 2 image generation
    const requestData = {
      model: "dall-e-2", // Using DALL-E 2 model
      prompt: prompt,
      n: n, // Number of images to generate (1-10)
      size: size, // Options: "256x256", "512x512", or "1024x1024"
      response_format: "url" // Get URL responses
    };
  
    try {
      // Make the API request to OpenAI's image generation endpoint
      const response = await fetch("https://api.openai.com/v1/images/generations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${OPENAI_API_KEY}`
        },
        body: JSON.stringify(requestData)
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`HTTP error! Status: ${response.status}, Message: ${errorData.error?.message || 'Unknown error'}`);
      }
      
      const result = await response.json();
      
      // Return the generated image URL(s)
      return result.data;
    } catch (error) {
      console.error("Error generating image with DALL-E 2:", error);
      throw error;
    }
  }
  



  

export { callOpenAI, parseModelResponse, valorate_system_prompt, combine_system_prompt, combine_short ,system_prompt_evaluator,  generateImageWithDalle};

