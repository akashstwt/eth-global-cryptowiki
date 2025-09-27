import { Card } from "@/components/ui/card";
import { 
  Brain, 
  Database, 
  Shield, 
  Search
} from "lucide-react";
import { motion } from "framer-motion";
import cardBg from "@/assets/card_bg.png";

const Features = () => {
  const features = [
    {
      title: "You don't have the skills or time to handle it yourself.",
      description: "Access powerful AI-driven insights instantly",
      icon: Brain
    },
    {
      title: "Hiring a full-time designer takes months—and tens of thousands of dollars in recruiter fees.",
      description: "Save resources with our efficient platform",
      icon: Database
    },
    {
      title: "Freelancers can be unreliable or lack the expertise your project demands.",
      description: "Get consistent, high-quality information",
      icon: Shield
    },
    {
      title: "Misaligned skill sets mean constantly searching for additional help.",
      description: "Everything you need in one place",
      icon: Search
    },
    {
      title: "Designers leave, timelines slip, and your team's momentum stalls.",
      description: "Maintain steady progress with reliable data",
      icon: Shield
    },
    {
      title: "Scaling resources up and down? Forget it.",
      description: "Flexible solutions that grow with you",
      icon: Database
    }
  ];

  return (
    <section className="min-h-screen bg-black py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="relative group"
            >
              {/* Gradient border effect */}
              <div 
                className="absolute inset-0 rounded-2xl bg-gradient-to-r from-rose-400/20 to-orange-300/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" 
              />
              
              {/* Card background with glass effect */}
              <div 
                className="relative p-8 rounded-2xl h-full transition-transform duration-300 group-hover:-translate-y-1 overflow-hidden"
                style={{
                  background: 'rgba(23, 23, 23, 0.9)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.1)'
                }}
              >
                {/* Large icon with overflow effect */}
                <motion.div
                  initial={{ x: "-25%", opacity: 0.1 }}
                  whileHover={{ x: "0%", opacity: 0.2 }}
                  transition={{ duration: 0.5 }}
                  className="absolute -left-20 top-1/2 -translate-y-1/2 pointer-events-none"
                >
                  <feature.icon className="w-64 h-64 text-gray-500/20" />
                </motion.div>

                {/* Content */}
                <div className="relative z-10">
                  <div className="mb-6">
                    <feature.icon className="w-12 h-12 text-gray-400" />
                  </div>
                  <h3 className="text-gray-200 text-lg font-medium leading-relaxed mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;