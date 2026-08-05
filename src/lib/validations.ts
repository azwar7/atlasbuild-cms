import { z } from "zod";

/**
 * RFP Proposal Submission Validation Schema
 */
export const RfpSubmissionSchema = z.object({
  projectType: z.enum(["commercial", "infrastructure", "industrial", "residential", "energy"]),
  estimatedBudget: z.number().min(10000, "Minimum budget is $10,000"),
  targetTimelineMonths: z.number().min(1, "Timeline must be at least 1 month").max(120),
  squareFootage: z.number().optional(),
  contactName: z.string().min(2, "Contact name required"),
  contactEmail: z.string().email("Valid enterprise email required"),
  contactPhone: z.string().min(7, "Valid phone number required"),
  companyName: z.string().min(2, "Company name required"),
  notes: z.string().max(2000, "Notes cannot exceed 2000 characters").optional(),
});

export type RfpSubmissionInput = z.infer<typeof RfpSubmissionSchema>;

/**
 * Access Role Creation Validation Schema
 */
export const CreateRoleSchema = z.object({
  name: z.string().min(2, "Role name required"),
  description: z.string().min(5, "Role description required"),
  permissions: z.array(z.string()).min(1, "Select at least one permission"),
});

export type CreateRoleInput = z.infer<typeof CreateRoleSchema>;

/**
 * Safety Log Submission Validation Schema
 */
export const SafetyLogSchema = z.object({
  title: z.string().min(5, "Log title required"),
  severity: z.enum(["LOW", "MEDIUM", "HIGH", "CRITICAL"]),
  location: z.string().min(3, "Site location required"),
  description: z.string().min(10, "Detailed incident/audit description required"),
  reporterName: z.string().min(2, "Reporter name required"),
});

export type SafetyLogInput = z.infer<typeof SafetyLogSchema>;

/**
 * Basic Text Sanitizer to strip dangerous HTML tags for XSS prevention
 */
export function sanitizeInput(input: string): string {
  return input
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;")
    .replace(/\//g, "&#x2F;");
}
