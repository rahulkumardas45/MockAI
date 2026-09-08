import { generateAIContent } from "./GeminiAIModal";

/**
 * Clean and normalize text strings
 */
export function normalizeText(text) {
  if (!text) return "";
  return text
    .replace(/\r\n/g, "\n")
    .replace(/[ \t]+/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

/**
 * Semantic section chunking for resumes
 */
export function chunkResumeSections(rawText) {
  const normalized = normalizeText(rawText);
  const lines = normalized.split("\n");

  const sections = {
    header: [],
    summary: [],
    skills: [],
    experience: [],
    projects: [],
    education: [],
    certifications: [],
    other: [],
  };

  let currentSection = "header";

  const sectionKeywords = {
    summary: /^(professional\s+)?summary|profile|about\s+me|objective/i,
    skills: /^technical\s+skills|skills|core\s+competencies|technologies|proficiencies/i,
    experience: /^(work|professional|employment)\s+experience|experience|employment\s+history/i,
    projects: /^projects|academic\s+projects|personal\s+projects/i,
    education: /^education|academic\s+background|qualifications/i,
    certifications: /^certifications|licenses|courses|awards/i,
  };

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) continue;

    let matchedSection = null;
    if (trimmed.length < 40) {
      for (const [secName, regex] of Object.entries(sectionKeywords)) {
        if (regex.test(trimmed)) {
          matchedSection = secName;
          break;
        }
      }
    }

    if (matchedSection) {
      currentSection = matchedSection;
    } else {
      sections[currentSection].push(trimmed);
    }
  }

  return {
    headerText: sections.header.join("\n"),
    summaryText: sections.summary.join("\n"),
    skillsText: sections.skills.join("\n"),
    experienceText: sections.experience.join("\n"),
    projectsText: sections.projects.join("\n"),
    educationText: sections.education.join("\n"),
    certificationsText: sections.certifications.join("\n"),
    otherText: sections.other.join("\n"),
    fullText: normalized,
  };
}

/**
 * Extract hard keywords and terms from Job Description
 */
export function extractJobKeywords(jobDescription) {
  const normalized = normalizeText(jobDescription);
  const commonTech = [
    "JavaScript", "TypeScript", "React", "Next.js", "Node.js", "Express", "Python", "Django", "FastAPI",
    "Java", "Spring Boot", "C++", "C#", ".NET", "Go", "Golang", "Rust", "PHP", "Laravel",
    "SQL", "PostgreSQL", "MySQL", "MongoDB", "Redis", "Elasticsearch", "GraphQL", "REST API",
    "AWS", "Azure", "GCP", "Docker", "Kubernetes", "CI/CD", "Terraform", "Git", "GitHub", "GitLab",
    "Tailwind CSS", "Redux", "HTML5", "CSS3", "Webpack", "Vite", "Microservices", "Kafka",
    "Machine Learning", "Deep Learning", "LLM", "NLP", "PyTorch", "TensorFlow", "Pandas", "Scikit-Learn",
    "Agile", "Scrum", "Jira", "System Design", "Unit Testing", "Jest", "Cypress", "Linux"
  ];

  const foundInJd = [];
  for (const tech of commonTech) {
    const regex = new RegExp(`\\b${tech.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i');
    if (regex.test(normalized)) {
      foundInJd.push(tech);
    }
  }

  return {
    detectedKeywords: foundInJd,
    rawJd: normalized,
  };
}

/**
 * Main RAG & Gemini ATS Analyzer
 */
export async function analyzeResumeWithRAG({ resumeText, jobTitle, jobDescription }) {
  const resumeChunks = chunkResumeSections(resumeText);
  const jdData = extractJobKeywords(jobDescription);

  const ragPrompt = `You are a Principal Technical Recruiter and ATS (Applicant Tracking System) Algorithm Expert.

Analyze the candidate's resume against the target Job Description using a rigorous semantic RAG matching framework.

### TARGET ROLE:
Title: "${jobTitle || "Software Engineer"}"
Job Description:
"""
${jdData.rawJd}
"""

### CANDIDATE RESUME CHUNKS:
- **Technical Skills Section**:
${resumeChunks.skillsText || "Not explicitly tagged"}

- **Work Experience & Impact Section**:
${resumeChunks.experienceText || "Not explicitly tagged"}

- **Professional Summary**:
${resumeChunks.summaryText || "Not provided"}

- **Projects & Education**:
${resumeChunks.projectsText || "Not provided"}
${resumeChunks.educationText || "Not provided"}

- **Full Resume Text**:
"""
${resumeChunks.fullText}
"""

---
### EVALUATION CRITERIA:
1. **ATS Score (0-100)**: Calculate an objective compatibility score based on keyword match density, experience depth, skill alignment, and measurable accomplishments.
2. **Keyword Match Matrix**: Identify which critical skills from the JD are present in the resume (with context) and which are completely missing.
3. **Bullet Point Rewriter**: Find 2-3 weak or vague bullet points in the resume and rewrite them using the STAR method, strong action verbs, and quantified metrics.
4. **ATS Compliance Checklist**: Verify formatting (standard headings, contact info, length, readability).
5. **Actionable Recommendations**: Clear, specific steps to increase candidate interview callbacks.

---
### REQUIRED OUTPUT FORMAT:
Return strictly a valid JSON object with NO markdown formatting around it (or clean markdown JSON), following this exact schema:

{
  "ats_score": 82,
  "match_tier": "Strong Match",
  "score_breakdown": {
    "keyword_match": 85,
    "experience_relevance": 80,
    "skills_alignment": 88,
    "ats_formatting_score": 90,
    "quantified_impact_score": 70
  },
  "executive_summary": "Comprehensive evaluation summary of the candidate's fit.",
  "matched_keywords": [
    { "name": "React", "category": "Hard Skill", "frequency": 4 }
  ],
  "missing_keywords": [
    { "name": "Docker", "category": "Tool", "priority": "High", "suggestion": "Highlight containerization in project descriptions." }
  ],
  "strengths": [
    "Strong demonstrated experience in full stack JavaScript.",
    "Clear project architecture descriptions."
  ],
  "critical_gaps": [
    "Lacks explicit mentions of CI/CD pipelines.",
    "Could quantify project achievements with more metrics."
  ],
  "bullet_point_improvements": [
    {
      "original": "Worked on web applications using React and Node.",
      "improved": "Architected and delivered 4 high-traffic web applications using React and Node.js, improving page load speed by 35% for 50K+ MAU.",
      "reason": "Includes quantifiable metrics, action verbs, and business impact."
    }
  ],
  "section_feedback": {
    "summary": "Tailor the summary to mention the specific target role.",
    "skills": "Organize skills into categories (Languages, Frameworks, Cloud, Databases).",
    "experience": "Add more metric-driven accomplishments using the STAR technique.",
    "formatting": "Standard headers and clean hierarchy detected."
  },
  "ats_compliance_checklist": [
    { "check": "Standard Section Headings", "passed": true, "tip": "Use clear headers like Experience, Skills, Education" },
    { "check": "Contact Details & Links", "passed": true, "tip": "Include LinkedIn, GitHub, Email, Phone" },
    { "check": "Quantified Metrics (%, $, Numbers)", "passed": false, "tip": "Add measurable outcomes to your projects" },
    { "check": "Job Title Alignment", "passed": true, "tip": "Mirror target job title in resume profile" },
    { "check": "ATS-Friendly Layout", "passed": true, "tip": "Avoid multi-column graphics and complex tables" }
  ],
  "ats_tips": [
    "Use standard sans-serif fonts and clear section titles.",
    "Mirror 70%+ of the core technical keywords in the JD within context.",
    "Quantify at least 3 bullet points with percentages or numerical impact."
  ]
}`;

  const responseText = await generateAIContent(ragPrompt, {
    temperature: 0.2,
    responseMimeType: "application/json",
  });
  
  const cleaned = responseText.replace(/```json\n?|```/g, "").trim();
  let parsed;
  try {
    parsed = JSON.parse(cleaned);
  } catch (err) {
    const jsonMatch = cleaned.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      try {
        parsed = JSON.parse(jsonMatch[0]);
      } catch (innerErr) {
        throw new Error("Failed to parse AI ATS evaluation response: " + innerErr.message);
      }
    } else {
      throw new Error("Failed to parse AI ATS evaluation response.");
    }
  }

  // Ensure default safety fallbacks
  if (typeof parsed.ats_score !== "number") {
    parsed.ats_score = 75;
  }
  if (!parsed.match_tier) {
    parsed.match_tier = parsed.ats_score >= 80 ? "Top Tier Match" : parsed.ats_score >= 65 ? "Strong Match" : parsed.ats_score >= 45 ? "Moderate Match" : "Needs Optimization";
  }
  if (!parsed.score_breakdown) {
    parsed.score_breakdown = {
      keyword_match: parsed.ats_score,
      experience_relevance: Math.max(50, parsed.ats_score - 5),
      skills_alignment: parsed.ats_score,
      ats_formatting_score: 85,
      quantified_impact_score: 70,
    };
  }

  return parsed;
}
