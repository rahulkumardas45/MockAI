import { pgTable, serial, text, varchar } from "drizzle-orm/pg-core";

export const MockInterview = pgTable('MockInterview', {
    id: serial('id').primaryKey(),
    jsonMockResp: text('jsonMockResp').notNull(),
    jobPosition: varchar('jobPosition').notNull(),
    jobDesc: varchar('jobDesc').notNull(),
    jobExperience: varchar('jobExperience').notNull(),
    createdBy: varchar('createdBy').notNull(),
    createdAt: varchar('createdAt'),
    mockId: varchar('mockId').notNull()
});

export const UserAnswer = pgTable('userAnswer', {
    id: serial('id').primaryKey(),
    mockIdRef: varchar('mockId').notNull(),
    question: varchar('question').notNull(),
    correctAns: text('correctAns'),
    userAns: text('userAns'),
    feedback: text('feedback'),
    rating: varchar('rating'),
    userEmail: varchar('userEmail'),
    createdAt: varchar('createdAt')
});

export const ResumeAnalysis = pgTable('resumeAnalysis', {
    id: serial('id').primaryKey(),
    resumeId: varchar('resumeId').notNull(),
    userEmail: varchar('userEmail').notNull(),
    jobTitle: varchar('jobTitle').notNull(),
    jobDescription: text('jobDescription').notNull(),
    resumeFileName: varchar('resumeFileName'),
    resumeRawText: text('resumeRawText'),
    atsScore: varchar('atsScore').notNull(),
    analysisResult: text('analysisResult').notNull(),
    createdAt: varchar('createdAt')
});