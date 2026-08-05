import { PrismaClient, Role, ProjectSector, ProjectStatus, PhaseStatus, QuoteStatus, ApplicationStatus, InvitationStatus, AssetType } from '../src/generated/client'
import { PrismaPg } from '@prisma/adapter-pg'
import { Pool } from 'pg'
import * as bcrypt from 'bcryptjs'

const connectionString = process.env.DATABASE_URL
if (!connectionString) {
  console.error('DATABASE_URL is not set. Cannot run seed script.')
  process.exit(1)
}

const pool = new Pool({ connectionString })
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

async function main() {
  console.log('🌱 Starting database seed operation...')

  // Clear existing records in correct topological order to prevent constraint failures
  console.log('🧹 Clearing existing database records...')
  await prisma.activityLog.deleteMany()
  await prisma.invitationToken.deleteMany()
  await prisma.contactRequest.deleteMany()
  await prisma.testimonial.deleteMany()
  await prisma.blogPost.deleteMany()
  await prisma.application.deleteMany()
  await prisma.careerOpportunity.deleteMany()
  await prisma.quoteRequest.deleteMany()
  await prisma.asset.deleteMany()
  await prisma.feedUpdate.deleteMany()
  await prisma.projectPhase.deleteMany()
  await prisma.project.deleteMany()
  await prisma.user.deleteMany()

  console.log('👤 Seeding user identities...')
  const passwordHash = await bcrypt.hash('Password123!', 10)

  // 1. Seed Users (Admins, PMs, Clients)
  const users: any[] = []
  
  // Admins
  const admins = [
    { email: 'admin.elena@atlasbuild.com', name: 'Elena Rostova', role: Role.ADMIN },
    { email: 'admin.ceo@atlasbuild.com', name: 'James Atlas', role: Role.ADMIN },
  ]
  for (const a of admins) {
    const user = await prisma.user.create({
      data: {
        email: a.email,
        name: a.name,
        passwordHash,
        role: a.role,
        createdBy: 'SYSTEM',
      }
    })
    users.push(user)
  }

  // Project Managers (PMs)
  const pms = [
    { email: 'pm.marcus@atlasbuild.com', name: 'Marcus Vance' },
    { email: 'pm.sarah@atlasbuild.com', name: 'Sarah Chen' },
    { email: 'pm.david@atlasbuild.com', name: 'David Kross' },
    { email: 'pm.robert@atlasbuild.com', name: 'Robert Tanaka' },
  ]
  const seededPMs: any[] = []
  for (const pm of pms) {
    const user = await prisma.user.create({
      data: {
        email: pm.email,
        name: pm.name,
        passwordHash,
        role: Role.PROJECT_MANAGER,
        createdBy: users[0].id,
      }
    })
    seededPMs.push(user)
    users.push(user)
  }

  // Clients
  const clientsData = [
    { email: 'client.arthur@realestate.com', name: 'Arthur McArthur' },
    { email: 'client.city@municipal.gov', name: 'Mayor Jane Dooley' },
    { email: 'client.health@hospital.org', name: 'Dr. Evelyn Martinez' },
    { email: 'client.reza@residential.net', name: 'Reza Ghadiri' },
    { email: 'client.edu@university.edu', name: 'Dean Thomas Sterling' },
    { email: 'client.logistics@supply.com', name: 'Frank Vance' },
  ]
  const seededClients: any[] = []
  for (const c of clientsData) {
    const user = await prisma.user.create({
      data: {
        email: c.email,
        name: c.name,
        passwordHash,
        role: Role.CLIENT,
        createdBy: users[0].id,
      }
    })
    seededClients.push(user)
    users.push(user)
  }

  console.log(`✓ Seeded ${users.length} user records.`);

  // 2. Seed Projects
  console.log('🏗️ Seeding construction projects...');
  const projectsData = [
    {
      title: 'Eastside Logistics Center',
      description: 'A massive 220,000 sq ft structural distribution warehouse featuring high-density storage bays, LEED Silver engineering configurations, and advanced mechanical ventilation systems.',
      sector: ProjectSector.COMMERCIAL,
      location: 'Boston, MA',
      budget: 18500000.00,
      squareFootage: 220000,
      completionRate: 85,
      emrScore: 0.72,
      status: ProjectStatus.ACTIVE,
      client: seededClients[0],
      pm: seededPMs[0],
    },
    {
      title: 'City Health Surgical Wing Addition',
      description: 'Addition of a state-of-the-art 4-story surgical center, incorporating cleanroom MEP grids, intensive care support modules, and vibration-isolated structural slabs matching medical grade specifications.',
      sector: ProjectSector.HEALTHCARE,
      location: 'Ames, IA',
      budget: 22400000.00,
      squareFootage: 45000,
      completionRate: 20,
      emrScore: 0.74,
      status: ProjectStatus.ACTIVE,
      client: seededClients[2],
      pm: seededPMs[2],
    },
    {
      title: 'Civic Transit Overpass',
      description: 'Reinforced pre-stressed structural concrete highway bypass bridge. Implements heavy load seismic dampeners and smart telemetry sensor nodes across spans.',
      sector: ProjectSector.CIVIL,
      location: 'Portland, OR',
      budget: 34100000.00,
      squareFootage: 80000,
      completionRate: 100,
      emrScore: 0.68,
      status: ProjectStatus.COMPLETED,
      client: seededClients[1],
      pm: seededPMs[1],
    },
    {
      title: 'Scenic River Custom Estate',
      description: 'Premium custom high-end timber residential design framing, offering geothermally heated layouts, smart-dome panels, and absolute acoustic insulation borders.',
      sector: ProjectSector.RESIDENTIAL,
      location: 'Bend, OR',
      budget: 2450000.00,
      squareFootage: 6500,
      completionRate: 45,
      emrScore: 0.78,
      status: ProjectStatus.ACTIVE,
      client: seededClients[3],
      pm: seededPMs[3],
    },
    {
      title: 'University Engineering Hub',
      description: 'LEED Platinum educational learning compound featuring advanced computing server rooms, smart lecture halls, and rooftop solar micro-grid telemetry layouts.',
      sector: ProjectSector.EDUCATION,
      location: 'Salt Lake City, UT',
      budget: 41200000.00,
      squareFootage: 180000,
      completionRate: 5,
      emrScore: 0.70,
      status: ProjectStatus.PLANNING,
      client: seededClients[4],
      pm: seededPMs[1],
    },
    {
      title: 'Metro Highway Retention Vaults',
      description: 'Infrastructure concrete vaults handling rainfall retention and urban runoff management. Implements high-volume pumping bays and filtration control modules.',
      sector: ProjectSector.INFRASTRUCTURE,
      location: 'Seattle, WA',
      budget: 9800000.00,
      squareFootage: 110000,
      completionRate: 100,
      emrScore: 0.72,
      status: ProjectStatus.COMPLETED,
      client: seededClients[1],
      pm: seededPMs[0],
    }
  ]

  const seededProjects: any[] = []
  for (const pd of projectsData) {
    const proj = await prisma.project.create({
      data: {
        title: pd.title,
        description: pd.description,
        sector: pd.sector,
        location: pd.location,
        budget: pd.budget,
        squareFootage: pd.squareFootage,
        completionRate: pd.completionRate,
        emrScore: pd.emrScore,
        status: pd.status,
        startDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 60), // 60 days ago
        projectManagerId: pd.pm.id,
        createdBy: users[0].id,
        clients: {
          connect: { id: pd.client.id }
        }
      }
    })
    seededProjects.push(proj)
  }

  console.log(`✓ Seeded ${seededProjects.length} projects.`);

  // 3. Seed Project Phases (Milestones)
  console.log('📅 Seeding project milestones...');
  const phases = [
    { title: 'Site Prep & Excavation', description: 'Clearing structures, running grading checks, and executing perimeter retention excavation.' },
    { title: 'Foundation Concrete Pour', description: 'Pouring slab concrete foundations, mapping load pillars, and validating seismic reinforcements.' },
    { title: 'Structural Framing', description: 'Installing steel supports, truss layouts, load joints, and core deck assemblies.' },
    { title: 'Dry-In & Weatherboarding', description: 'Envelope insulation, exterior panel sealing, framing window units, and roof deck wraps.' },
    { title: 'MEP Integration & Internals', description: 'Routing pipeline channels, fitting HVAC modules, running wire rails, drywalling, and finish layering.' }
  ]

  let phaseIndex = 0
  for (const proj of seededProjects) {
    for (let i = 0; i < phases.length; i++) {
      let status: PhaseStatus = PhaseStatus.PENDING
      if (proj.completionRate === 100) {
        status = PhaseStatus.COMPLETED
      } else if (proj.completionRate > 0) {
        if (i === 0) status = PhaseStatus.COMPLETED
        else if (i === 1 && proj.completionRate >= 30) status = PhaseStatus.COMPLETED
        else if (i === 2 && proj.completionRate >= 60) status = PhaseStatus.COMPLETED
        else if (i === 3 && proj.completionRate >= 80) status = PhaseStatus.COMPLETED
        else {
          status = PhaseStatus.IN_PROGRESS
        }
      } else if (proj.status === ProjectStatus.PLANNING && i === 0) {
        status = PhaseStatus.PENDING
      }

      await prisma.projectPhase.create({
        data: {
          projectId: proj.id,
          title: phases[i].title,
          description: phases[i].description,
          status,
          sortOrder: i + 1,
          startDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * (60 - i * 15)),
          createdBy: users[0].id,
        }
      })
      phaseIndex++
    }
  }

  console.log(`✓ Seeded ${phaseIndex} project phases.`);

  // 4. Seed Feed Updates & Related Target Assets
  console.log('📸 Seeding progress feeds and update assets...');
  let updateIndex = 0
  const feedTemplates = [
    { title: 'Excavators arrive on site', content: 'Dirt grading teams arrived today. Site clearing operations initialized on schedule.' },
    { title: 'Foundation concrete pour completed', content: 'Completed pouring 350 cubic yards of concrete today. Concrete sample cores sent for validation testing.' },
    { title: 'Structural columns installed', content: 'First floor load pillar units secured. Safety inspector signed off on load calculations.' },
    { title: 'HVAC major units installed on roof', content: 'Utilized critical lifting rigs to mount main chiller platforms on the roof envelope today.' },
    { title: 'Drywall finishes layer 1 completed', content: 'Drywall mounting on the second-floor apartments completed. Electrical outlet wiring checks executed.' }
  ]

  const mediaUrls = [
    'https://res.cloudinary.com/atlasbuild/image/upload/pour1.webp',
    'https://res.cloudinary.com/atlasbuild/image/upload/prep1.webp',
    'https://res.cloudinary.com/atlasbuild/image/upload/frame2.webp',
    'https://res.cloudinary.com/atlasbuild/image/upload/mep-checking.webp',
  ]

  for (const proj of seededProjects) {
    // Generate multiple status updates per project to build a realistic chronological log
    for (let u = 0; u < 12; u++) {
      const template = feedTemplates[u % feedTemplates.length]
      
      const update = await prisma.feedUpdate.create({
        data: {
          projectId: proj.id,
          title: `${template.title} - Log #${u + 1}`,
          content: `${template.content} Progress is tracking according to the schedule bounds set in the pre-construction phase. PM Vance confirmed trade partners are fully aligned.`,
          createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * (55 - u * 5)), // staggered days
          createdBy: proj.projectManagerId,
        }
      })

      // Add 1-2 asset images to progress feed updates
      await prisma.asset.create({
        data: {
          url: mediaUrls[u % mediaUrls.length],
          key: `atlasbuild_progress_${update.id}`,
          mimeType: 'image/webp',
          size: 1520000 + u * 20000,
          assetType: AssetType.IMAGE,
          projectId: proj.id,
          feedUpdateId: update.id,
          uploadedById: proj.projectManagerId,
        }
      })
      updateIndex++
    }

    // Seed secure layout blueprint asset for every project
    await prisma.asset.create({
      data: {
        url: 'https://res.cloudinary.com/atlasbuild/raw/upload/v12/blueprints/blue_layout.pdf',
        key: `blueprint_secure_${proj.id}`,
        mimeType: 'application/pdf',
        size: 12400000,
        assetType: AssetType.BLUEPRINT,
        projectId: proj.id,
        uploadedById: proj.projectManagerId,
      }
    })
  }

  console.log(`✓ Seeded ${updateIndex} feed updates and corresponding photo assets.`);

  // 5. Seed Quote Requests (RFPs)
  console.log('📄 Seeding RFP and Quote requests...');
  const quotes = [
    { name: 'Arthur McArthur', email: 'arthur@mcarthurdev.com', company: 'McArthur Housing Inc.', title: 'Bridgeport Apartments', budget: '$5,000,000 - $10,000,000', location: 'Portland, OR', status: QuoteStatus.PENDING },
    { name: 'Jane Dooley', email: 'jdooley@portland.gov', company: 'City of Portland Division of Bridges', title: 'Columbia Bridge Seismic Upgrade', budget: '$20,000,000+', location: 'Portland, OR', status: QuoteStatus.REVIEWING },
    { name: 'Dr. Evelyn Martinez', email: 'evelyn@cityhealth.org', company: 'City Health Systems', title: 'Clinic Center Renovation', budget: '$1,000,000 - $5,000,000', location: 'Ames, IA', status: QuoteStatus.CONTACTED },
    { name: 'Alice Sterling', email: 'asterling@retaildesign.com', company: 'Sterling Retail Development', title: 'Metro Strip Center Block', budget: '$5,000,000 - $10,000,000', location: 'Seattle, WA', status: QuoteStatus.ARCHIVED }
  ]

  let quoteCount = 0
  for (let q = 0; q < 25; q++) {
    const template = quotes[q % quotes.length]
    await prisma.quoteRequest.create({
      data: {
        name: `${template.name} #${q + 1}`,
        email: `lead_${q}@mcarthurdev.com`,
        company: template.company,
        projectTitle: `${template.title} Phase ${Math.floor(q / 4) + 1}`,
        sector: q % 3 === 0 ? ProjectSector.COMMERCIAL : ProjectSector.RESIDENTIAL,
        budgetRange: template.budget,
        location: template.location,
        description: `This inquiry is submitted through the interactive Intake Sandbox to request detailed pre-construction estimation logs. Ground parameters are configured for scale factor ${q + 1.5}.`,
        status: template.status,
        blueprintUrl: q % 2 === 0 ? 'https://res.cloudinary.com/atlasbuild/image/upload/mock_blueprint.pdf' : null,
      }
    })
    quoteCount++
  }
  console.log(`✓ Seeded ${quoteCount} Quote requests.`);

  // 6. Seed Career Opportunities and Applications
  console.log('✉️ Seeding Careers and Job Applications...');
  const jobs = [
    { title: 'Senior Project Manager (VDC/BIM)', dept: 'Project Management', loc: 'Boston Office', type: 'Full-time' },
    { title: 'Field Superintendent', dept: 'Operations', loc: 'Salt Lake City, UT', type: 'Full-time' },
    { title: 'Structural Estimator', dept: 'Estimating', loc: 'Ames Office', type: 'Full-time' },
    { title: 'Project Engineer Intern', dept: 'Engineering', loc: 'Bend construction site', type: 'Temporary' }
  ]

  let applicationCount = 0
  const candidateNames = ['Julia Smith', 'Robert Lee', 'Li Na', 'John Davis', 'Maria Rodriguez', 'Peter Parker', 'Bruce Wayne']
  
  for (const job of jobs) {
    const opportunity = await prisma.careerOpportunity.create({
      data: {
        title: job.title,
        department: job.dept,
        location: job.loc,
        type: job.type,
        description: `AtlasBuild is seeking a qualified ${job.title} to manage commercial designs and site execution logs. Must have 5+ years building experience.`,
        requirements: '• Professional Degree in Civil Engineering or equivalent.\n• Expert in VDC modeling software / Revit CAD.\n• Strong leadership capabilities under demanding tight schedules.',
        isActive: true,
      }
    })

    // Seed 4 applications per job vacancy
    for (let a = 0; a < 6; a++) {
      const candidate = candidateNames[(a + opportunity.id.charCodeAt(0)) % candidateNames.length]
      await prisma.application.create({
        data: {
          careerOpportunityId: opportunity.id,
          name: candidate,
          email: `${candidate.toLowerCase().replace(' ', '.')}@careers.com`,
          resumeUrl: 'https://res.cloudinary.com/atlasbuild/raw/upload/v1/resumes/res.pdf',
          coverLetter: 'I am highly interested in joining the professional team at AtlasBuild. My domain experiences perfectly fit the requirements outlined in the catalog.',
          status: a === 0 ? ApplicationStatus.SUBMITTED : ApplicationStatus.UNDER_REVIEW,
        }
      })
      applicationCount++
    }
  }
  console.log(`✓ Seeded Career postings and ${applicationCount} applications.`);

  // 7. Seed Blog posts
  console.log('✍️ Seeding Blog posts...');
  const blogTitles = [
    { title: 'Mitigating Construction Supply Gaps in 2026', slug: 'mitigating-supply-gaps-2026' },
    { title: 'Why Safety EMR Scores Below 0.8 Matter to Real Estate Developers', slug: 'emr-safety-scores-matter' },
    { title: 'Implementing VDC & BIM to Eliminate Structural Clash Errors', slug: 'vdc-bim-eliminate-clash-errors' },
    { title: 'Green Energy and LEED Standards in Commercial Infrastructure', slug: 'green-energy-leed-standards' }
  ]

  let postCount = 0
  for (let p = 0; p < 15; p++) {
    const template = blogTitles[p % blogTitles.length]
    await prisma.blogPost.create({
      data: {
        title: `${template.title} [Vol. ${Math.floor(p / 4) + 1}]`,
        slug: `${template.slug}-${p + 1}`,
        excerpt: 'Understanding risk modeling and supply timelines is essential to guarantee site execution stays on schedule and avoids cost overruns.',
        content: '<p>Standard building execution relies on interconnected supply chains. If scheduling constraints are not verified in advanced, project developers face friction. At AtlasBuild, our Virtual Design (VDC) system resolves design errors before concrete is poured. This article discusses safety records, green codes, and how EMR variables affect developer financing options.</p>',
        coverImage: 'https://res.cloudinary.com/atlasbuild/image/upload/blog_cover.webp',
        published: true,
        authorId: users[0].id,
      }
    })
    postCount++
  }
  console.log(`✓ Seeded ${postCount} blog posts.`);

  // 8. Testimonials
  console.log('⭐️ Seeding Testimonials...');
  const testimonials = [
    { name: 'Arthur McArthur', company: 'McArthur Holding Inc.', role: 'CEO', quote: 'AtlasBuild portal tracking saved us weeks of email coordination. The financial dashboard gave concrete visibility on drawdown dates.' },
    { name: 'Dr. Evelyn Martinez', company: 'City Health Systems', role: 'Operations Director', quote: 'Building surgical facilities requires precise structural compliance. AtlasBuild PMs executed the medical MEP layouts flawlessly.' },
    { name: 'Mayor Jane Dooley', company: 'City of Portland Division of Bridges', role: 'Public Works Board', quote: 'The Civic Transit bypass was a high-performance design-build challenge. They hit every milestone, keeping the community updated daily.' }
  ]

  for (let t = 0; t < testimonials.length; t++) {
    const test = testimonials[t]
    const linkedProj = seededProjects[t % seededProjects.length]
    await prisma.testimonial.create({
      data: {
        projectId: linkedProj.id,
        clientName: test.name,
        company: test.company,
        role: test.role,
        quote: test.quote,
        rating: 5,
      }
    })
  }

  // 9. Contact Requests
  let contacts = 0
  for (let c = 0; c < 20; c++) {
    await prisma.contactRequest.create({
      data: {
        name: `Inquirer John #${c + 1}`,
        email: `inquirer_${c}@outlook.com`,
        subject: `General capability question #${c + 1}`,
        message: `Hello, I'd like to check if AtlasBuild has active bonding capabilities to self-perform concrete framing in district area ${c * 5}. Please contact us during business hours.`
      }
    })
    contacts++
  }
  console.log(`✓ Seeded ${contacts} contact requests.`);

  // 10. Invitation Tokens
  let inviteTokens = 0
  for (let i = 0; i < 10; i++) {
    await prisma.invitationToken.create({
      data: {
        token: `token_invite_hash_hex_${i}`,
        email: `new_invited_client_${i}@gmail.com`,
        projectId: seededProjects[i % seededProjects.length].id,
        invitingAdminId: users[0].id,
        status: i % 3 === 0 ? InvitationStatus.ACCEPTED : InvitationStatus.PENDING,
        expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 48), // 48 hours
      }
    })
    inviteTokens++
  }

  // 11. Activity Logs
  let logsCount = 0
  const actions = ['USER_LOGIN', 'PROJECT_CREATE', 'MILESTONE_COMPLETE', 'INQUIRY_RECEIVED', 'INVITATION_SENT']
  const entities = ['User', 'Project', 'ProjectPhase', 'ContactRequest', 'InvitationToken']
  
  for (let l = 0; l < 100; l++) {
    const act = actions[l % actions.length]
    const ent = entities[l % entities.length]
    
    await prisma.activityLog.create({
      data: {
        userId: users[l % users.length].id,
        action: act,
        entityType: ent,
        entityId: `entity_id_mock_${l}`,
        details: JSON.stringify({ auditLogIndex: l, operatorName: users[l % users.length].name }),
        ipAddress: `192.168.1.${10 + l}`,
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * (100 - l)),
      }
    })
    logsCount++
  }
  console.log(`✓ Seeded ${logsCount} Activity log mutation trails.`);

  console.log('🎉 Seed operation complete! Database populated successfully.');
}

main()
  .catch((e) => {
    console.error('❌ Seed script failed with exception:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
