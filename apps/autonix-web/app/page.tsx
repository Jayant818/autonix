import { Dialog, DialogTrigger } from "@radix-ui/react-dialog";
import { ArrowRightIcon, LightningBoltIcon, PlayIcon } from "@radix-ui/react-icons";
import Link from "next/link";

export default function Home() {
  const isDark = false; // Assuming light mode for this design

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <section className="flex flex-col justify-center items-center py-24 text-center px-4">
        <div className="space-y-8 flex flex-col justify-center items-center max-w-6xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-blue-200 bg-blue-100/50 text-blue-700 mb-4 backdrop-blur-sm">
            <LightningBoltIcon className="w-4 h-4" />
            <span className="text-sm font-medium">Powerful Workflow Automation</span>
          </div>
          
          {/* Headline */}
          <h1 className="text-5xl md:text-6xl font-bold max-w-4xl leading-tight bg-gradient-to-r from-gray-800 to-blue-600 bg-clip-text text-transparent">
            Automate Your Workflows with Ease
          </h1>
          
          {/* Subtitle */}
          <p className="text-xl max-w-2xl mx-auto text-gray-600">
            Build, run, and scale automation workflows effortlessly. Inspired by n8n's powerful engine, reimagined for modern teams.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4 justify-center items-center mt-8">
            <Dialog>
              <DialogTrigger asChild>
                <Link 
                  className="group inline-flex items-center gap-3 px-8 py-4 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-blue-500/20 hover:-translate-y-0.5"
                  href="/dashboard"
                >
                  Get Started
                  <ArrowRightIcon className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </DialogTrigger>
            </Dialog>
            
            <button className={`group inline-flex items-center gap-3 px-8 py-4 rounded-xl font-semibold border border-gray-300 transition-all duration-300 hover:shadow-md ${
              isDark 
                ? "hover:bg-zinc-800 text-white" 
                : "hover:bg-white text-gray-700"
            }`}>
              <PlayIcon className="w-4 h-4" />
              Watch Demo
            </button>
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20 text-left">
            {[
              {
                icon: <div className="p-3 rounded-xl bg-blue-100 text-blue-600"><ArrowRightIcon className="w-6 h-6" /></div>,
                title: "Visual Builder",
                description: "Drag & drop interface to create complex workflows"
              },
              {
                icon: <div className="p-3 rounded-xl bg-purple-100 text-purple-600"><LightningBoltIcon className="w-6 h-6" /></div>,
                title: "Real-time Execution",
                description: "Monitor and debug your workflows in real-time"
              },
              {
                icon: <div className="p-3 rounded-xl bg-green-100 text-green-600"><ArrowRightIcon className="w-6 h-6" /></div>,
                title: "Extensible",
                description: "Connect with your favorite tools and services"
              }
            ].map((feature, i) => (
              <div 
                key={i} 
                className={`group p-8 rounded-2xl border border-gray-200 transition-all duration-300 hover:-translate-y-2 ${
                  isDark 
                    ? "hover:bg-zinc-800 bg-zinc-900" 
                    : "hover:bg-white bg-white/70 backdrop-blur-sm shadow-sm hover:shadow-xl"
                }`}
              >
                <div className="mb-5">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-800">{feature.title}</h3>
                <p className={isDark ? "text-zinc-400" : "text-gray-600"}>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}