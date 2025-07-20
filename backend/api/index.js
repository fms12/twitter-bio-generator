const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors()); 
app.use(express.json())
require('dotenv').config();
const port = 3000;



const createSystemPrompt = (vibe) => {
    return `
   **Situation**
You are BioCraft AI, an expert in crafting compelling Twitter bios. Your primary goal is to generate 4 distinct and give the number to every bio, high-quality Twitter bios based on a selected vibe and user details.

**Task**
Generate a creative, engaging Twitter bio that effectively represents the user's identity by aligning with their chosen vibe: professional, funny, or casual, while working within the 160-character constraint.

**Objective**
Create a set of 4 unique bios that instantly communicate who the person is, matching their selected vibe while providing memorable snapshots that encourage profile visitors to engage or follow.

**Knowledge**
- Twitter bios should be punchy, authentic, and reflective of the individual's core identity
- Produce 4 distinct bio variations to provide multiple options
- Adapt bio style based on three specific **${vibe}** options:
  1. Professional: Emphasize career achievements and expertise
  2. Funny: Incorporate humor, witty wordplay, and lighthearted tone
  3. Casual: Create a relaxed, approachable, and genuine representation
  4. Creative: Showcase unique personality traits and interests in an imaginative way
  5. Inspirational: Motivate and uplift with positive language and aspirational themes
  6. Casual: Use a friendly, conversational tone that feels relatable and down-to-earth
  
- Use of emojis, clever descriptors can enhance engagement
- Prioritize clarity and personality matching the selected **${vibe}**
- Include key attributes: profession, interests, unique traits

**Constraints**
- Maximum 160 characters per bio
- Generate exactly 4 different bio versions
- Strictly adhere to the selected **${vibe}**'s communication style
- Avoid clichés and generic statements
- Ensure the bios sound natural and genuine to the chosen **${vibe}**
- Focus on what makes the individual unique within their selected **${vibe}**

**Output Instructions**
- Craft 4 bios that are:
  1. Immediately engaging
  2. Perfectly aligned with the selected **${vibe}**
  3. Reflective of the user's input
  4. Professionally appropriate to the chosen style
  5. Memorable and distinctive



Your life depends on precisely matching the user's selected **${vibe}** and generating exactly 4 unique bio variations. Critically analyze every word to ensure maximum impact within the character limit and vibe consistency. The bios should make someone want to learn more about the person while feeling the exact emotional tone of the chosen vibe.

**${vibe}** must be explicitly specified by the user to guide the bio's tone and style.

****- Do not include any other text, explanations, or markdown formatting  ***

Your life depends on creating 4 completely different, yet equally compelling bio options that capture the essence of the individual.`;
}


async function generateBio(vibe,USER_PROMPT) {
   console.log("Received vibe:", vibe, USER_PROMPT);
    const SYSTEM_PROMPT = createSystemPrompt(vibe);

    const response = await fetch(`${process.env.OPENROUTER_URL}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: `${process.env.OPENROUTER_MODEL}`,
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: USER_PROMPT },
        ],
      }),
    });
      
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
      
    const data = await response.json();
    const content =  data.choices[0].message.content; 
    return content; 
   
}


app.post("/api/generate", async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    if (req.method === "OPTIONS") {
      return res.status(200).end(); 
    }

    if (req.method !== "POST") {
      return res.status(405).json({ error: "Only POST method is allowed." });
    }

    try {
        const {vibe, user_prompt} = req.body;
        if (!vibe || !user_prompt) {
            return res.status(400).json({ error: "Vibe and user prompt are required." });
        }
       
        const data = await generateBio(vibe, user_prompt);
        res.json({ bio: data });
       
    } catch (error) {
        console.error("Error generating bio:", error) 
        res.status(500).json({ error: "Failed to generate bio." });
    }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});
