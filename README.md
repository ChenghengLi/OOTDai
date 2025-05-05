## Inspiration

Shopping for clothes online can be frustrating. You find a style you like in a photo, but have no idea where to buy something similar. You’re unsure how it will look on you, or if it fits the occasion. We wanted to solve this by combining computer vision and generative AI to make shopping easier, smarter, and more personalized. With Inditex’s image-matching API, we saw the perfect opportunity to bring this idea to life.

## What it does

OOTDai (Outfit Of The DAI) is a web app that works on both desktop and mobile devices. It offers four key features:

1. **Image-Based Product Search**: Users can upload a picture or take a photo of any clothing item. The app finds real, similar items available in Inditex’s catalog. Results are sorted by similarity and price.

2. **Style Recommendations**: The app analyzes the uploaded image and suggests accessories or garments with a matching style, helping users build a full outfit.

3. **Context-Aware Outfit Check**: Users can upload a picture of themselves, a picture of any clothing item and a description of the setting (e.g., "job interview", "wedding", "gym"). The AI evaluates if the look fits the context and gives style feedback.

4. **AI Try-On**: Users can upload their photo and a garment image. Our model generates an image showing them “wearing” the item realistically.

## How we built it

- **Frontend**: Developed using Tailwind, Vue, CSS, and JavaScript. We focused on minimal UI, smooth transitions, and responsive design.

- **Backend**: Built with Node.js. It manages API calls, image uploads, and communication with external services.

- **Inditex API**: Used for searching visually similar products from their catalog based on the input image.

- **AI Models**:
  - Generative models for realistic try-on visuals and style-based accessory suggestions.
  - A large language model (LLM) for matching and compatibility scoring.


- **Cloud Services**: We used cloud service to deploy an online service to store images.

## Challenges we ran into

- **Realistic Try-On Generation**: Synthesizing high-quality images of people wearing virtual clothes required careful prompt engineering of generative models.

- **Data Flow and Performance**: Managing large image files and real-time processing without slowing down the UX.

- **Context Understanding**: Translating free-text descriptions of events into meaningful fashion evaluations was a complex NLP task.

## Accomplishments that we're proud of

- Delivered a complete MVP with all core features — AI try-on, product search, and context analysis — in just a few days.
- Integrated three complex features into one cohesive experience.
- Built a solution that’s both fun and useful, which is able to turn inspiration photos into shopping and style decisions.

## What we learned

- How to combine APIs, generative AI, and frontend design into one product.
- How to process and analyze fashion images using vision models.
- How to generate synthetic images that feel real and personalized.
- How to build user interfaces that balance technical depth with ease of use.

## What's next for OOTDai

- Improve the try-on system with better body alignment and pose estimation.
- Train a custom style advisor model using curated fashion data.
- Add user accounts to save outfits, track past searches, and get daily suggestions.
- Expand to other retailers and marketplaces for a broader shopping experience.
