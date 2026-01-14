# Sebastian Riedel Portfolio
# Manga Recommendation Service

This project is a React-based application that generates personalized manga recommendations using an AI model from Huggingface.

Users can input up to five mangas they liked, up to five mangas they disliked (to exclude them), and apply additional filters such as total length or completion status. The app sends this input to the AI, which returns a recommendation list. The response is then rendered in a readable format using the react-markdown component.

> Note: The AI token is private, so a live demo cannot be provided.

---

## Project Goals
- Practice integrating an external AI API with a React frontend  
- Collect user input and generate structured prompts for AI consumption  
- Display AI-generated recommendations in a clean and readable format  
- Handle dynamic content rendering in a React application  

---

## Features
- Collect user preferences for personalized manga recommendations  
- Generate AI prompts based on user input  
- Display AI-generated recommendations using react-markdown  
- Basic filtering of results based on user-specified criteria  

---

## Tech Stack
- React  
- API integration (Huggingface AI)  
- react-markdown  

---

## Screenshots
![Main Interface](./screenshots/main_interface.PNG)
![Input Filled](./screenshots/main_filled_out.PNG)
![AI Recommendations](./screenshots/recommendation_response.PNG)

---

## Repository
GitHub Repository: [Link to repo](https://github.com/SebastianR0589/manga_recommendation_project)
