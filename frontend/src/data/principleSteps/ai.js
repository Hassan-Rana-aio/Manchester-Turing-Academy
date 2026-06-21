import Images from "../../constants/siteImages";

const machineLearning = {
  image: Images.image68,
  text: "Trains algorithms on data to recognize patterns and make decisions without explicit programming.",
  headingText: "Machine Learning (ML)",
};

const nlp = {
  image: Images.image70,
  text: "Enables machines to understand and generate human language for applications like chatbots and translation.",
  headingText: "Natural Language Processing (NLP)",
};

const computerVision = {
  image: Images.image69,
  text: "Allows machines to interpret visual data from images and videos, used in facial recognition and more.",
  headingText: "Computer Vision",
};

const expertSystems = {
  image: Images.image72,
  text: "Emulate human expert decision-making using a knowledge base and inference engine for complex problem-solving in various domains.",
  headingText: "Expert Systems",
};

const AI_PRINCIPLES_STEP = [machineLearning, nlp, computerVision, expertSystems];
export default AI_PRINCIPLES_STEP;
