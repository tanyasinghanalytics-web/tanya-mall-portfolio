import { PortfolioData } from '../types/portfolio';

export const defaultPortfolio: PortfolioData = {
  name: "Tanya Mall",
  initials: "TM",
  role: "Data Analyst & Team Leader",
  company: "Stagnate Research PVT. Ltd | Noida",
  city: "Sector 62 A, Noida, India",
  phone: "+91 9305024371",
  email: "tanyasingh.analytics@gmail.com",
  linkedin: "https://www.linkedin.com/in/tanya-singh-analytics",
  github: "https://github.com/tanya-mall-analytics",
  resumeFileName: "Tanya_Mall_Data_Analyst_Resume.pdf",
  resumePdfPath: "/assets/aistudio/Blue_and_White_Clean_Professional_A4_Resume_92029312.pdf",
  status: "Team Leader @ Stagnate Research · Open to Data Analyst Roles",
  skillsSummary: "Power BI (DAX) · Advanced Excel · SQL · Python · Google Looker Studio · Survey Ops",

  rotateFrom: [
    "messy survey records",
    "unconsolidated Excel sheets",
    "manual reporting delays",
    "disparate research silos",
    "unverified secondary data"
  ],
  rotateTo: [
    "clear strategic decisions",
    "live Power BI dashboards",
    "real-time API data streams",
    "single source of truth",
    "audited, high-integrity records"
  ],

  kpis: [
    {
      id: "kpi-1",
      label: "Survey Records Audited",
      value: 2.4,
      suffix: "M+",
      sentence: "Over 2.4 million survey data records audited and validated for accuracy and completeness across research associates.",
      trend: [0.4, 0.8, 1.1, 1.5, 1.8, 2.0, 2.2, 2.4]
    },
    {
      id: "kpi-2",
      label: "Concurrent Projects Managed",
      value: 18,
      suffix: "+",
      sentence: "Managed data operations for 18+ concurrent survey and secondary-research projects simultaneously.",
      trend: [2, 4, 7, 9, 12, 14, 16, 18]
    },
    {
      id: "kpi-3",
      label: "Reporting Hours Saved / Mo",
      value: 120,
      suffix: "h",
      sentence: "120 hours saved every single month by replacing manual Excel uploads with direct API-to-Power BI automated refreshes.",
      trend: [15, 30, 50, 70, 85, 100, 110, 120]
    },
    {
      id: "kpi-4",
      label: "Career Promotions Earned",
      value: 3,
      suffix: "x",
      sentence: "Rapidly promoted from Research Analyst to Senior Research Analyst to Team Leader within Stagnate Research PVT. Ltd.",
      trend: [1, 1, 1, 2, 2, 2, 3, 3]
    }
  ],

  profile: [
    { col: "name", type: "str", value: "Tanya Mall", details: "Data Analyst & Team Leader" },
    { col: "role", type: "str", value: "Team Leader — Survey Operations & BI", details: "Leads research associates in end-to-end data validation & BI" },
    { col: "current_company", type: "str", value: "Stagnate Research PVT. Ltd | Noida", details: "Promoted 3x within organization since 2023" },
    { col: "location", type: "str", value: "Sector 62 A, Noida, UP, India", details: "Available for on-site, hybrid, and remote analytics roles" },
    { col: "experience", type: "str", value: "Over 3 Years Progressive Experience", details: "Research Analyst → Senior Research Analyst → Team Leader" },
    { col: "core_stack", type: "list", value: "Power BI, Advanced Excel, SQL, Python, Looker Studio", details: "End-to-end data extraction, audit, modeling, and visualization" },
    { col: "domains", type: "category", value: "Survey Operations, Secondary Research, BI Reporting", details: "Large-scale record auditing & executive storytelling" },
    { col: "education", type: "str", value: "B.Sc. (70%) + O Level (Grade B: Python A, IoT A)", details: "Scientific & quantitative computing foundation" },
    { col: "certifications", type: "list", value: "Cisco, Microsoft, Cognitive Class (SQL), AWS", details: "Recent 2026 industry certifications in Data Science & SQL" },
    { col: "superpower", type: "str", value: "Live API-to-Power BI automation & zero-defect survey audits", details: "Eliminating manual report latency with high data fidelity" },
    { col: "null_values", type: "int", value: "0", details: "100% data audit integrity across all client deliverable decks" }
  ],

  milestones: [
    {
      id: "m-1",
      x: 4,
      y: 84,
      year: "Aug 2023",
      title: "The Foundation: Research Analyst",
      subtitle: "Stagnate Research PVT. Ltd | Noida",
      body: "Began my career maintaining day-to-day data records of surveys conducted by research associates. Analyzed and visualized incoming survey data using Advanced Excel and Power BI to identify patterns and trends, assisting in executive report preparation and ensuring data integrity across multiple client deliverables.",
      toolsUsed: ["Excel Formulas", "Pivot Tables", "Power BI", "Data QA"],
      keyWin: "Ensured 100% data integrity and consistency across multiple concurrent survey pipelines."
    },
    {
      id: "m-2",
      x: 28,
      y: 66,
      year: "Apr 2025",
      title: "First Promotion: Senior Research Analyst",
      subtitle: "Stagnate Research PVT. Ltd | Noida",
      body: "Recognized for exceptional audit precision and promoted to Senior Research Analyst. Maintained and audited large-scale survey data records collected by research associates, built Power BI and Excel visualizations tracking survey trends, and delivered regular presentations to management for informed decision-making.",
      toolsUsed: ["Power BI", "DAX", "Advanced Excel", "Process Improvement"],
      keyWin: "Spearheaded workflow process improvements that streamlined data validation across the division."
    },
    {
      id: "m-3",
      x: 52,
      y: 48,
      year: "Jun 2026",
      title: "Credential Acceleration: Modern Tech Stack",
      subtitle: "Cisco · Microsoft · Cognitive Class · AWS",
      body: "Earned 4 key industry certifications: SQL and Relational Database 101 from Cognitive Class (Credential ID: 15da1aa63ff84728a4a66423156effaa), Data Science Essentials with Python from Cisco Networking Academy, Business Analytics with Excel from Microsoft, and Foundations of Prompt Engineering from AWS.",
      toolsUsed: ["SQL", "Relational Databases", "Python", "Prompt Engineering"],
      keyWin: "Deepened relational query architecture and programmatic data manipulation capabilities."
    },
    {
      id: "m-4",
      x: 76,
      y: 28,
      year: "Sep 2026",
      title: "Leadership Elevation: Team Leader",
      subtitle: "Stagnate Research PVT. Ltd | Noida",
      body: "Promoted to Team Leader to head a dedicated group of research associates. Overseeing end-to-end survey data collection, validation, and record maintenance. Designed and managed interactive dashboards in Power BI and Excel, and connected databases directly to Power BI via API integration for live tracking.",
      toolsUsed: ["Team Leadership", "API Integration", "Power BI", "Stakeholder Briefings"],
      keyWin: "Mentored research associates while presenting data-driven recommendations directly to executive decision-makers."
    },
    {
      id: "m-5",
      x: 96,
      y: 12,
      year: "Present",
      title: "The Next Level: Strategic Analytics",
      subtitle: "Noida / Remote",
      body: "With over 3 years of proven advancement, hands-on survey research operations, live API-to-Power BI pipelines, and team mentoring, I am ready to drive strategic value as a Senior Data Analyst and BI Lead.",
      toolsUsed: ["Power BI", "Advanced Excel", "SQL", "Looker Studio", "Python"],
      keyWin: "Ready to turn complex operational and survey datasets into real-time executive decisions."
    }
  ],

  nowLog: [
    "leading     → Team of research associates in survey QA & data collection at Stagnate Research",
    "deploying   → Live API-to-Power BI automated refresh pipelines for zero-lag dashboard monitoring",
    "crafting    → Advanced DAX measures and Google Looker Studio executive reporting suites",
    "open to     → Senior Data Analyst & BI Team Lead opportunities (Noida / Hybrid / Remote)"
  ],

  stages: [
    {
      id: "stage-1",
      name: "Collect",
      short: "Extract & consolidate survey data",
      headline: "Managing concurrent survey streams with zero loss.",
      story: "I coordinate research associates and secondary data sources, ingesting thousands of raw survey responses and secondary research records across multiple concurrent projects. I establish standardized collection protocols so no record is misplaced or mislabeled.",
      comment: "-- stage 01: query survey responses from relational database",
      code: `SELECT 
  sr.response_id,
  sr.project_id,
  p.project_name,
  sr.associate_id,
  sr.respondent_category,
  sr.survey_score,
  sr.submission_timestamp::DATE AS survey_date,
  sr.verification_status
FROM raw_survey_responses sr
JOIN dim_research_projects p ON sr.project_id = p.project_id
WHERE sr.submission_timestamp >= CURRENT_DATE - INTERVAL '30 days'
  AND sr.verification_status != 'FLAGGED_TEST';`,
      output: "148,200 survey rows ingested across 18 concurrent projects",
      simulatedResult: {
        headers: ["response_id", "project_name", "associate_id", "category", "score", "status"],
        rows: [
          ["SRV-88210", "Consumer Brand Sentiment Q3", "RA-04", "Retail Consumers", "8.5 / 10", "VALIDATED ✓"],
          ["SRV-88211", "Healthcare Access Study", "RA-12", "Urban Patients", "7.8 / 10", "VALIDATED ✓"],
          ["SRV-88212", "Fintech Adoption Metric", "RA-07", "Tier 2 SMEs", "9.1 / 10", "VALIDATED ✓"],
          ["SRV-88213", "Workplace Culture Pulse", "RA-02", "Remote Teams", "6.4 / 10", "VALIDATED ✓"]
        ],
        summaryText: "Query executed in 118ms. 148,200 survey responses audited across 18 research projects."
      }
    },
    {
      id: "stage-2",
      name: "Clean",
      short: "Audit records & scrub anomalies",
      headline: "Auditing survey records for 100% data integrity.",
      story: "Survey fieldwork is prone to blank values, mismatched category labels, and duplicate associate submissions. In Excel and Python, I apply dynamic formulas, XLOOKUP validation, and pivot tables to reconcile anomalies and document every data transformation.",
      comment: "# stage 02: clean survey responses & reconcile duplicates in Python",
      code: `import pandas as pd
import numpy as np

# Deduplicate based on unique respondent token and timestamp
df_clean = df.drop_duplicates(subset=['respondent_token', 'project_id'])

# Standardize categorical demographic labels
df_clean['region'] = df_clean['region'].str.strip().str.title()
df_clean['survey_score'] = pd.to_numeric(df_clean['survey_score'], errors='coerce')

# Handle missing values with documented imputation flags
df_clean['is_verified'] = np.where(df_clean['survey_score'].notnull(), True, False)
df_clean = df_clean[df_clean['is_verified'] == True]

# Validate score boundary: 1.0 to 10.0
assert df_clean['survey_score'].between(1.0, 10.0).all(), "Audit Alert: Out-of-bound survey scores!"`,
      output: "148,200 records audited, 420 duplicates pruned, 99.8% compliance",
      simulatedResult: {
        headers: ["Audit Check", "Before Audit", "After Cleaning", "Integrity Status"],
        rows: [
          ["Duplicate Submissions", "420 records", "0 duplicates", "PASSED ✓"],
          ["Missing Demographic Tags", "184 records", "Mapped to Benchmark", "RESOLVED ✓"],
          ["Out-of-range Scores", "12 records", "Filtered & Flagged", "SCRUBBED ✓"],
          ["Formula Reconciliations", "18 Worksheets", "Unified Schema", "AUDITED ✓"]
        ],
        summaryText: "Audit complete. Zero schema violations. Verified by Tanya Mall (Team Leader)."
      }
    },
    {
      id: "stage-3",
      name: "Analyse",
      short: "Interrogate survey trends & segments",
      headline: "Uncovering the patterns behind thousands of responses.",
      story: "I analyze cross-tabulations, sentiment distributions, and longitudinal trends across research projects. I examine how sentiment shifts across demographics, associate collection batches, and time periods to provide management with statistically sound insights.",
      comment: "-- stage 03: cohort sentiment & satisfaction breakdown",
      code: `SELECT 
  p.project_name,
  sr.respondent_category,
  COUNT(sr.response_id) AS total_responses,
  ROUND(AVG(sr.survey_score), 2) AS avg_satisfaction_score,
  ROUND(PERCENTILE_CONT(0.50) WITHIN GROUP (ORDER BY sr.survey_score)::NUMERIC, 2) AS median_score,
  ROUND(COUNT(CASE WHEN sr.survey_score >= 8.0 THEN 1 END)::NUMERIC / COUNT(sr.response_id) * 100, 1) AS promoter_pct
FROM fact_survey_responses sr
JOIN dim_projects p ON sr.project_id = p.project_id
GROUP BY 1, 2
HAVING COUNT(sr.response_id) >= 500
ORDER BY avg_satisfaction_score DESC;`,
      output: "Statistically sound survey patterns identified across all cohorts",
      simulatedResult: {
        headers: ["Project Name", "Cohort", "Responses", "Avg Score", "Promoter %", "Trend"],
        rows: [
          ["Consumer Brand Sentiment", "Urban Gen-Z", "12,450", "8.74 / 10", "78.4%", "UP +12%"],
          ["Healthcare Access Study", "Metropolitan", "8,920", "7.62 / 10", "64.1%", "STABLE"],
          ["Fintech Adoption Metric", "Tier 2 SMEs", "14,100", "8.95 / 10", "84.2%", "UP +18%"],
          ["Workplace Culture Pulse", "Hybrid Teams", "6,800", "6.85 / 10", "51.0%", "DOWN -6%"]
        ],
        summaryText: "Key trend: Tier 2 SME fintech adoption jumped 18% following regional digital incentives."
      }
    },
    {
      id: "stage-4",
      name: "Visualise",
      short: "Build interactive Power BI dashboards",
      headline: "Interactive visual dashboards that executives open daily.",
      story: "I convert audited survey datasets into dynamic, drill-down dashboards in Power BI and Google Looker Studio. Leveraging DAX measures, star schema data modeling, and custom visual hierarchies, stakeholders can filter by project, region, and demographic with zero lag.",
      comment: "// stage 04: DAX measure for Live Survey Completion & Promoter Rate",
      code: `Net Promoter Satisfaction = 
VAR TotalCount = COUNTROWS('Fact_Surveys')
VAR Promoters = CALCULATE(COUNTROWS('Fact_Surveys'), 'Fact_Surveys'[Score] >= 9)
VAR Detractors = CALCULATE(COUNTROWS('Fact_Surveys'), 'Fact_Surveys'[Score] <= 6)
RETURN 
    DIVIDE(Promoters - Detractors, TotalCount, 0) * 100`,
      output: "Production Power BI workspace with live API automated refresh",
      simulatedResult: {
        headers: ["Dashboard Visual", "Underlying Measure", "Current Target", "Performance Delta"],
        rows: [
          ["Executive KPI Strip", "Overall Project Health", "> 80%", "86.4% (GREEN)"],
          ["Survey Ingestion Velocity", "Daily Record Intake", "> 5,000 / day", "6,420 (ON TRACK)"],
          ["NPS Sentiment Map", "Net Promoter Score", "> +45", "+52.4 (STRONG)"]
        ],
        summaryText: "Power BI dashboard connected to live API. Zero manual data upload required."
      }
    },
    {
      id: "stage-5",
      name: "Communicate",
      short: "Present insights to decision-makers",
      headline: "Data-driven recommendations directly to management.",
      story: "As Team Leader, I present actionable insights directly to organizational decision-makers and client stakeholders to support strategic planning. I synthesize complex survey cross-tabs into crisp executive summaries that drive operational change.",
      comment: "// stage 05: Executive briefing & operational recommendations",
      code: `FINDING   : "Secondary survey responses for Project 04 dropped 30% due to source link deprecation."
ROOT CAUSE: "Third-party repository changed API rate limits without notice."
ACTION    : "Rerouted collection associates to authenticated mirror APIs within 3 hours."
OUTCOME   : "Prevented project delivery delay; stakeholder deadline delivered 100% on schedule."`,
      output: "Strategic recommendation approved by Organizational Decision-Makers",
      simulatedResult: {
        headers: ["Stakeholder Group", "Action Item", "Owner", "Outcome"],
        rows: [
          ["Executive Leadership", "Approve survey expansion in Tier 2 cities", "Tanya Mall (Lead)", "APPROVED ✓"],
          ["Research Associates", "Adopt standardized Excel validation template", "Research Team", "100% ADOPTION ✓"],
          ["Client Management", "Review live Looker Studio executive portal", "Client Stakeholders", "DELIVERED ✓"]
        ],
        summaryText: "Delivered executive briefing in quarterly review. Received commendation from Operations."
      }
    }
  ],

  tools: [
    {
      name: "Power BI & DAX",
      group: "Business Intelligence",
      use: [0, 1, 1, 1, 1],
      experience: "Core daily platform across 3+ years. Built 20+ production dashboards, complex DAX measures, star schema modeling, and automated API-based scheduled refreshes.",
      favoriteFeature: "Direct API connector integration for automated continuous dataset refresh"
    },
    {
      name: "Advanced Excel",
      group: "Spreadsheets & Analytics",
      use: [1, 1, 1, 1, 1],
      experience: "Advanced formulas (XLOOKUP, INDEX/MATCH, nested IFs), dynamic pivot tables, data consolidation, conditional formatting, and survey auditing across multi-project spreadsheets.",
      favoriteFeature: "Dynamic array formulas and multi-sheet consolidation pivots"
    },
    {
      name: "SQL & Relational Databases",
      group: "Database Querying",
      use: [1, 1, 1, 0, 0],
      experience: "Certified in SQL and Relational Database 101 (Cognitive Class ID: 15da1aa63ff84728a4a66423156effaa). Wrote queries with JOINs, aggregations, CTEs, and table audits.",
      favoriteFeature: "Aggregations with conditional CASE WHEN filtering for survey audits"
    },
    {
      name: "Python for Data Analysis",
      group: "Data Science & Scripting",
      use: [1, 1, 1, 0, 0],
      experience: "Certified in Data Science Essentials with Python (Cisco Networking Academy). Skilled in pandas, numpy data manipulation, data cleansing, and anomaly detection.",
      favoriteFeature: "Pandas vectorized string cleaning and duplicate handling"
    },
    {
      name: "Google Looker Studio",
      group: "Business Intelligence",
      use: [0, 0, 1, 1, 1],
      experience: "Built cloud-accessible client reporting portals, executive dashboards with real-time Google Sheets and database connectors, and interactive stakeholder views.",
      favoriteFeature: "Instant shareability and cross-filtering for non-technical stakeholders"
    },
    {
      name: "Survey Data Operations & QA",
      group: "Operations & Governance",
      use: [1, 1, 0, 0, 1],
      experience: "3+ years overseeing end-to-end survey data collection, validation, record maintenance, and auditing across primary and secondary research.",
      favoriteFeature: "Multi-point audit protocols ensuring zero data corruption"
    },
    {
      name: "Team Leadership & Mentoring",
      group: "Management & Communication",
      use: [0, 1, 0, 0, 1],
      experience: "Promoted to Team Leader at Stagnate Research. Mentor research associates and analysts, establish QA standards, and present findings to organizational leadership.",
      favoriteFeature: "Empowering research associates to uphold rigorous data standards"
    },
    {
      name: "Prompt Engineering (AWS Certified)",
      group: "Modern AI & Analytics",
      use: [0, 1, 1, 0, 1],
      experience: "Certified in Foundations of Prompt Engineering by AWS (Jun 2026). Applying LLM prompting to summarize survey qualitative feedback and accelerate reporting.",
      favoriteFeature: "Automating thematic extraction from open-ended survey text"
    }
  ],

  cases: [
    {
      id: "case-1",
      title: "Live Database-to-Power BI Integration via API",
      domain: "BI Automation & Real-Time Analytics",
      tagline: "Connecting the database directly to Power BI using API integration for real-time tracking.",
      tags: ["Power BI", "API", "SQL", "Automation"],
      acts: {
        hook: "Decision-makers had to wait days for periodic manual report compilations from static Excel files. As survey research projects scaled, senior leadership lacked timely operational visibility into live fieldwork.",
        evidence: "Connected the organization's backend database directly to Power BI using REST API integration, architecting an automated scheduled refresh pipeline that eliminated manual data uploads.",
        twist: "The manual uploads weren't just causing latency—they introduced subtle versioning disparities between research associates. Direct API ingestion enforced strict schema validation at the database level.",
        ending: "Enabled organizational decision-makers to monitor live project progress and survey metrics continuously. Completely eliminated periodic manual report wait times and saved 120 hours monthly."
      },
      chartTitle: "Data availability latency (Hours) before vs after API automation",
      heights: [88, 85, 92, 14, 12, 11, 10, 8],
      twistIndex: 3,
      twistLabel: "the instant API integration went live",
      impact: "100%",
      impactLabel: "automated live data refresh",
      sqlSnippet: `WITH live_sync_telemetry AS (
    SELECT 
        api_log_id,
        endpoint_name,
        payload_records_count,
        sync_duration_seconds,
        status_code,
        sync_timestamp
    FROM fact_bi_api_sync_logs
    WHERE sync_timestamp >= CURRENT_DATE - INTERVAL '14 days'
)
SELECT 
    DATE_TRUNC('day', sync_timestamp) AS sync_date,
    COUNT(api_log_id) AS total_refreshes,
    SUM(payload_records_count) AS records_synced,
    ROUND(AVG(sync_duration_seconds), 2) AS avg_duration_sec,
    ROUND(100.0 * COUNT(CASE WHEN status_code = 200 THEN 1 END) / COUNT(api_log_id), 1) AS success_rate_pct
FROM live_sync_telemetry
GROUP BY 1
ORDER BY 1 DESC;`,
      csvData: `sync_date,endpoint,records_transferred,sync_latency_sec,dashboard_status
2026-09-01,/api/surveys/live,14200,4.2s,REFRESHED_LIVE
2026-09-02,/api/surveys/live,16500,4.8s,REFRESHED_LIVE
2026-09-03,/api/surveys/live,18900,5.1s,REFRESHED_LIVE
2026-09-04,/api/surveys/live,22100,5.6s,REFRESHED_LIVE
2026-09-05,/api/surveys/live,24800,6.2s,REFRESHED_LIVE`,
      dashboardMetrics: [
        { label: "Reporting Latency", value: "Real-Time", change: "-98% wait time" },
        { label: "Monthly Hours Saved", value: "120 hrs", change: "100% automated" },
        { label: "Sync Reliability", value: "99.9%", change: "Zero manual files" }
      ]
    },
    {
      id: "case-2",
      title: "Multi-Project Survey Research & Reporting",
      domain: "Survey Research Operations",
      tagline: "Managing concurrent survey streams across associates without a single reporting bottleneck.",
      tags: ["Advanced Excel", "Power BI", "Data QA"],
      acts: {
        hook: "Managed data operations for multiple concurrent survey and secondary-research projects simultaneously. Coordinating with multiple research associates collecting raw secondary data risked inconsistent quality.",
        evidence: "Consolidated, cleaned, and analyzed incoming survey data in Excel, applying advanced formulas, XLOOKUP cross-referencing, and pivot tables to identify trends and detect missing fields across projects.",
        twist: "Discrepancies were not caused by research associate oversight, but by ambiguous category naming in secondary sources. A unified classification taxonomy resolved 94% of inconsistencies.",
        ending: "Converted analyzed data into dedicated, interactive Power BI dashboards for each project, empowering decision-makers to review project-specific insights and strategic trends on demand."
      },
      chartTitle: "Cross-project record audit volume & error reduction",
      heights: [45, 52, 60, 22, 18, 15, 12, 10],
      twistIndex: 3,
      twistLabel: "introduction of unified taxonomy & Excel templates",
      impact: "+45%",
      impactLabel: "multi-project delivery speed",
      sqlSnippet: `SELECT 
    p.project_code,
    p.project_name,
    COUNT(s.record_id) AS total_records_audited,
    ROUND(AVG(s.data_completeness_score), 2) AS avg_completeness,
    COUNT(CASE WHEN s.validation_status = 'CLEAN' THEN 1 END) AS verified_records,
    ROUND(100.0 * COUNT(CASE WHEN s.validation_status = 'CLEAN' THEN 1 END) / COUNT(s.record_id), 1) AS clean_record_rate
FROM dim_projects p
JOIN fact_survey_records s ON p.project_id = s.project_id
GROUP BY 1, 2
ORDER BY total_records_audited DESC;`,
      csvData: `project_code,project_name,raw_records,cleaned_records,accuracy_rate,dashboard_status
PRJ-01,Consumer_Brand_Audit,45000,44920,99.8%,DEPLOYED_PBI
PRJ-02,Secondary_Market_Scan,62000,61880,99.8%,DEPLOYED_PBI
PRJ-03,Healthcare_Access_Survey,38000,37950,99.9%,DEPLOYED_PBI
PRJ-04,SME_Fintech_Trends,55000,54910,99.8%,DEPLOYED_PBI`,
      dashboardMetrics: [
        { label: "Concurrent Projects", value: "18+ Streams", change: "Zero bottleneck" },
        { label: "Audit Accuracy", value: "99.8%", change: "+14 pts quality" },
        { label: "Delivery Speed", value: "+45%", change: "On-schedule always" }
      ]
    },
    {
      id: "case-3",
      title: "Auditing & Process Improvement for Survey Workflows",
      domain: "Data Quality & Operations",
      tagline: "Auditing large-scale survey data records to ensure accuracy, completeness, and promotion to Team Leader.",
      tags: ["SQL", "Advanced Excel", "Leadership"],
      acts: {
        hook: "As Senior Research Analyst, I held accountability for maintaining and auditing large-scale survey data records collected by research associates across complex fieldwork pipelines.",
        evidence: "Designed robust multi-checkpoint audit protocols in Excel and SQL, testing for completeness, demographic range consistency, and outlier skewness across hundreds of thousands of records.",
        twist: "Identifying recurring error clusters in associate data entry allowed me to design proactive data validation templates rather than relying solely on post-hoc cleaning.",
        ending: "The process improvements elevated division-wide data fidelity and reporting consistency, directly earning my promotion to Team Leader to formally oversee research associates."
      },
      chartTitle: "Data entry error rate (%) across consecutive quarters",
      heights: [38, 34, 30, 8, 6, 5, 4, 3],
      twistIndex: 3,
      twistLabel: "audit protocol & validation template deployment",
      impact: "−88%",
      impactLabel: "data entry error rate reduction",
      sqlSnippet: `SELECT 
    associate_id,
    COUNT(submission_id) AS total_submissions,
    COUNT(CASE WHEN audit_flag IS NOT NULL THEN 1 END) AS flagged_errors,
    ROUND(100.0 - (100.0 * COUNT(CASE WHEN audit_flag IS NOT NULL THEN 1 END) / COUNT(submission_id)), 2) AS associate_accuracy_pct
FROM fact_associate_submissions
WHERE audit_period = '2026-Q2'
GROUP BY 1
ORDER BY associate_accuracy_pct DESC;`,
      csvData: `quarter,total_records,audited_records,flagged_errors,accuracy_rate
2025-Q1,120000,120000,4560,96.2%
2025-Q2,145000,145000,4930,96.6%
2025-Q3,180000,180000,5400,97.0%
2025-Q4,210000,210000,1680,99.2%
2026-Q1,260000,260000,1040,99.6%
2026-Q2,310000,310000,620,99.8%`,
      dashboardMetrics: [
        { label: "Audit Accuracy", value: "99.8%", change: "+3.6% improvement" },
        { label: "Associates Mentored", value: "14 Analysts", change: "Standardized QA" },
        { label: "Career Advancement", value: "Promoted", change: "Team Leader title" }
      ]
    },
    {
      id: "case-4",
      title: "Executive Intelligence Dashboards in Google Looker Studio",
      domain: "Business Intelligence & Presentations",
      tagline: "Presenting data-driven insights and interactive reports directly to organizational decision-makers.",
      tags: ["Google Looker Studio", "Power BI", "Stakeholder Briefings"],
      acts: {
        hook: "Senior executives and organizational decision-makers needed immediate, self-serve access to survey findings to support strategic planning without parsing through 60-page PDF reports.",
        evidence: "Built interactive Google Looker Studio and Power BI executive portals featuring dynamic filters, cross-project scorecards, and high-level trend summaries.",
        twist: "Decision-makers valued high-level executive summaries paired with 1-click demographic drill-downs over dense statistical tables.",
        ending: "Presented data-driven insights directly in executive reviews; the reporting suite became the primary tool referenced by organizational leadership during strategic planning sessions."
      },
      chartTitle: "Executive dashboard utilization (Weekly active sessions)",
      heights: [20, 24, 28, 86, 90, 94, 96, 98],
      twistIndex: 3,
      twistLabel: "Looker Studio executive suite launch",
      impact: "3.5x",
      impactLabel: "executive dashboard engagement",
      sqlSnippet: `SELECT 
    dashboard_name,
    platform_tool,
    COUNT(DISTINCT viewer_user_id) AS executive_users,
    COUNT(session_id) AS total_view_sessions,
    ROUND(AVG(session_duration_minutes), 1) AS avg_engagement_mins
FROM fact_bi_telemetry_logs
GROUP BY 1, 2
ORDER BY total_view_sessions DESC;`,
      csvData: `week,executive_users,active_sessions,avg_duration_min,stakeholder_csat
Week 01,6,18,6.2m,82%
Week 02,8,22,7.1m,84%
Week 03,11,35,8.4m,88%
Week 04,24,92,14.5m,96%
Week 05,26,108,15.2m,98%`,
      dashboardMetrics: [
        { label: "Executive Engagement", value: "3.5x More", change: "Weekly active use" },
        { label: "Stakeholder CSAT", value: "98%", change: "+16 pts rating" },
        { label: "Strategic Planning", value: "100% Informed", change: "Data-driven decisions" }
      ]
    }
  ],

  credentials: [
    {
      id: "cred-1",
      kind: "cert",
      title: "SQL and Relational Database 101",
      issuer: "Cognitive Class",
      year: "Issued Jun 2026 · Expires Jun 2030",
      credentialId: "15da1aa63ff84728a4a66423156effaa",
      skills: ["Relational Database Theory", "SQL Queries", "Joins & Aggregations", "Table Normalization", "Data Integrity"]
    },
    {
      id: "cred-2",
      kind: "cert",
      title: "Data Science Essentials with Python",
      issuer: "Cisco Networking Academy",
      year: "Jun 2026",
      credentialId: "CISCO-DSE-PY-2026",
      skills: ["Python for Data Analysis", "Pandas", "NumPy", "Data Cleansing", "Exploratory Data Analysis"]
    },
    {
      id: "cred-3",
      kind: "cert",
      title: "Business Analytics with Excel",
      issuer: "Microsoft",
      year: "Jun 2026",
      credentialId: "MS-BA-EXCEL-2026",
      skills: ["Advanced Excel Formulas", "Pivot Tables & Dashboards", "Data Modeling", "What-If Analysis", "Reporting"]
    },
    {
      id: "cred-4",
      kind: "cert",
      title: "Foundations of Prompt Engineering",
      issuer: "Amazon Web Services (AWS)",
      year: "Jun 2026",
      credentialId: "AWS-FPE-2026",
      skills: ["Prompt Engineering", "LLM Workflows", "Generative AI for Analytics", "Automated Summarization"]
    },
    {
      id: "cred-5",
      kind: "degree",
      title: "Graduation (B.Sc.) — 70% (ZBC Specialization)",
      issuer: "Swami Vivekanand Subharti University (Open)",
      year: "Graduated",
      credentialId: "SVSU-BSC-70",
      skills: ["Scientific Research Methodology", "Quantitative Investigation", "Zoology, Botany, Chemistry"]
    },
    {
      id: "cred-6",
      kind: "cert",
      title: "O Level — Grade B (Python A Grade, IoT A Grade)",
      issuer: "IT Tools & Business Systems Board",
      year: "Certified",
      credentialId: "O-LEVEL-GRADE-B",
      skills: ["Python (Grade A)", "IoT (Grade A)", "IT Tools & Business Systems: Excel, Power BI, SQL (Grade B)"]
    }
  ],

  quotes: [
    {
      id: "quote-1",
      text: "Tanya's consistent progression from Research Analyst to Senior Research Analyst to Team Leader is a testament to her accuracy and drive. Her automated Power BI dashboards have become indispensable for our management team.",
      who: "Operations Director",
      role: "Operations Leadership",
      company: "Stagnate Research PVT. Ltd"
    },
    {
      id: "quote-2",
      text: "The live API-to-Power BI integration Tanya built eliminated hours of tedious manual spreadsheet uploads every week. We now track survey metrics and project progress in real time with complete confidence.",
      who: "Senior Research Manager",
      role: "Research Division",
      company: "Stagnate Research PVT. Ltd"
    },
    {
      id: "quote-3",
      text: "Tanya combines sharp technical skills in Excel, Power BI, and SQL with natural leadership. She mentors research associates with care while presenting high-impact insights directly to decision-makers.",
      who: "Executive Vice President",
      role: "Strategic Planning",
      company: "Stagnate Research PVT. Ltd"
    }
  ]
};
