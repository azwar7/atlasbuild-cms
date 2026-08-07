import Link from "next/link";
import LandingHeader from "@/components/LandingHeader";
import LandingFooter from "@/components/LandingFooter";
import CookiePreferencesModal from "@/components/CookiePreferencesModal";

export default function CareersPage() {
  const jobs = [
    {
      id: "job-1",
      title: "Senior Structural Civil Engineer",
      location: "Boston, MA (Hybrid)",
      type: "Full-Time",
      department: "Engineering & Design",
      experience: "8+ Years",
      description: "Lead structural calculations, BIM coordination, and site evaluations for mega-scale commercial bridge and skyscraper developments."
    },
    {
      id: "job-2",
      title: "Site Safety & OSHA Compliance Officer",
      location: "Austin, TX (On-Site)",
      type: "Full-Time",
      department: "Safety Operations",
      experience: "5+ Years",
      description: "Enforce zero-incident OSHA protocols, conduct site safety audits, and maintain AtlasBuild's industry-leading 0.71 EMR rating."
    },
    {
      id: "job-3",
      title: "Pre-Construction Estimator",
      location: "Remote / Chicago, IL",
      type: "Full-Time",
      department: "RFP & Cost Control",
      experience: "6+ Years",
      description: "Perform quantity takeoffs, cost estimation modeling, and client proposal development for $10M+ industrial projects."
    },
    {
      id: "job-4",
      title: "BIM & Digital Twin Architect",
      location: "San Francisco, CA",
      type: "Full-Time",
      department: "VDC Tech Lab",
      experience: "4+ Years",
      description: "Develop 3D digital twins and clash detection pipelines using Revit, Synchro, and custom spatial telemetry APIs."
    }
  ];

  return (
    <div className="relative min-h-screen font-body text-on-surface antialiased flex flex-col selection:bg-primary selection:text-on-primary">
      
      {/* Full-Screen Fixed Background Image with Dark Overlay */}
      <div 
        className="fixed inset-0 z-0 w-full h-full bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/careers-site-team.jpg')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0e1a]/90 via-[#0f131c]/80 to-[#0a0e1a]/95 backdrop-blur-[2px]"></div>
      </div>

      {/* Main Container above background */}
      <div className="relative z-10 min-h-screen flex flex-col justify-between">
        
        <LandingHeader />

        {/* Main Content */}
        <main className="pt-28 pb-20 px-6 lg:px-12 max-w-7xl mx-auto w-full flex-1 flex flex-col gap-12">
          
          {/* Page Hero Glass Card */}
          <div className="bg-[#0f131c]/75 backdrop-blur-[20px] p-8 lg:p-12 rounded-3xl border border-white/10 shadow-2xl flex flex-col items-center text-center gap-6 max-w-4xl mx-auto w-full">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-primary/20 rounded-full border border-primary/30 backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-xs font-label uppercase tracking-widest text-primary font-bold">
                JOIN ATLASBUILD ENGINEERING
              </span>
            </div>

            <h1 className="font-headline text-4xl lg:text-6xl text-white font-extrabold tracking-tight leading-tight">
              Build Infrastructure That Endures
            </h1>

            <p className="font-body text-on-surface-variant text-base lg:text-lg leading-relaxed max-w-2xl">
              We are looking for visionary civil engineers, safety specialists, and digital construction innovators to shape the skyline of tomorrow.
            </p>
          </div>

          {/* Job Listings Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {jobs.map((job) => (
              <div 
                key={job.id}
                className="bg-[#0f131c]/75 backdrop-blur-[20px] border border-white/10 rounded-2xl p-8 flex flex-col justify-between gap-6 hover:border-primary/50 transition-all hover:-translate-y-1 shadow-xl group"
              >
                <div className="flex flex-col gap-4">
                  <div className="flex justify-between items-center gap-4">
                    <span className="text-xs font-label text-primary font-bold uppercase tracking-wider bg-primary/20 px-3 py-1 rounded-full border border-primary/30">
                      {job.department}
                    </span>
                    <span className="text-xs font-mono text-on-surface-variant bg-white/5 px-3 py-1 rounded-full border border-white/10">
                      {job.type}
                    </span>
                  </div>
                  
                  <h3 className="font-headline text-2xl text-white font-bold group-hover:text-primary transition-colors mt-1">
                    {job.title}
                  </h3>
                  
                  <p className="font-body text-sm text-on-surface-variant leading-relaxed">
                    {job.description}
                  </p>
                </div>

                <div className="flex justify-between items-center pt-6 border-t border-white/10">
                  <div className="flex items-center gap-2 text-xs font-mono text-on-surface-variant">
                    <span className="material-symbols-outlined text-[16px] text-primary">location_on</span>
                    {job.location}
                  </div>
                  
                  <Link
                    href="/quotes"
                    className="px-5 py-2.5 bg-primary/20 hover:bg-primary text-primary hover:text-on-primary border border-primary/30 text-xs font-label font-bold uppercase rounded-full transition-all flex items-center gap-2 shadow-md"
                  >
                    Apply Now
                    <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>

        </main>

        <CookiePreferencesModal />
        <LandingFooter />

      </div>
    </div>
  );
}
