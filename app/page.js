'use client'

import { useState } from 'react'
import {
  Book,
  Code,
  PenTool,
  Target,
  FileText,
  Globe,
  Award,
  Brain,
  ArrowRight
} from 'lucide-react'

import { motion } from 'framer-motion'
import HeroSection from './dashboard/_components/HeroSection'

const ResourceCard = ({ icon, title, description, links }) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    viewport={{ once: true }}
    className="
      group
      relative
      overflow-hidden
      rounded-3xl
      border
      border-white/10
      bg-white/5
      backdrop-blur-xl
      p-6
      flex
      flex-col
      h-full
      transition-all
      duration-500
      hover:-translate-y-3
      hover:border-cyan-400/40
      hover:shadow-2xl
      hover:shadow-cyan-500/20
    "
  >
    {/* Glow Effect */}
    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/10 to-purple-500/0 opacity-0 group-hover:opacity-100 transition duration-500"></div>

    <div className="relative z-10">
      <div className="flex items-center mb-5">
        <div className="w-14 h-14 rounded-2xl bg-cyan-500/20 flex items-center justify-center animate-float">
          {icon}
        </div>

        <h3 className="ml-4 text-2xl font-bold text-white">
          {title}
        </h3>
      </div>

      <p className="text-gray-300 mb-6 leading-relaxed flex-grow">
        {description}
      </p>

      <div className="space-y-3">
        {links.map((link, index) => (
          <a
            key={index}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="
              group/link
              flex
              items-center
              justify-between
              rounded-xl
              bg-white/5
              border
              border-white/10
              px-4
              py-3
              hover:bg-cyan-500/10
              hover:border-cyan-400/30
              transition-all
              duration-300
            "
          >
            <span className="text-gray-200 group-hover/link:text-cyan-300">
              {link.name}
            </span>

            <ArrowRight className="w-4 h-4 text-cyan-400 opacity-0 group-hover/link:opacity-100 transition-all duration-300" />
          </a>
        ))}
      </div>
    </div>
  </motion.div>
)

export default function ResourcesPage() {
  const [activeCategory, setActiveCategory] = useState('tech')

  const resourceCategories = {
    tech: {
      resources: [
        {
          title: 'Coding Platforms',
          description:
            'Practice coding and algorithmic problem-solving with modern coding platforms.',
          icon: <Code className="w-7 h-7 text-cyan-400" />,
          links: [
            { name: 'GeeksforGeeks', url: 'https://www.geeksforgeeks.org/' },
            { name: 'LeetCode', url: 'https://leetcode.com/' },
            { name: 'HackerRank', url: 'https://www.hackerrank.com/' },
            { name: 'CodeChef', url: 'https://www.codechef.com/' }
          ]
        },
        {
          title: 'Technical Interview',
          description:
            'Master DSA, system design, and real-world interview preparation.',
          icon: <Target className="w-7 h-7 text-cyan-400" />,
          links: [
            {
              name: 'InterviewBit',
              url: 'https://www.interviewbit.com/'
            },
            {
              name: 'System Design',
              url: 'https://www.geeksforgeeks.org/system-design/getting-started-with-system-design/'
            },
            { name: 'Pramp', url: 'https://www.pramp.com/' }
          ]
        }
      ]
    },

    aptitude: {
      resources: [
        {
          title: 'Aptitude & Reasoning',
          description:
            'Practice quantitative aptitude and logical reasoning questions.',
          icon: <PenTool className="w-7 h-7 text-purple-400" />,
          links: [
            { name: 'IndiaBix', url: 'https://www.indiabix.com/' },
            {
              name: 'Freshersworld',
              url: 'https://www.freshersworld.com/aptitude-questions'
            },
            {
              name: 'MathsGuru',
              url: 'https://www.mathsguru.com/reasoning-questions/'
            }
          ]
        },

        {
          title: 'Competitive Exams',
          description:
            'Resources for GATE, placement preparation, and problem solving.',
          icon: <Award className="w-7 h-7 text-pink-400" />,
          links: [
            { name: 'GATE Overflow', url: 'https://gateoverflow.in/' },
            { name: 'Career Power', url: 'https://careerpower.in/' },
            { name: 'Brilliant', url: 'https://brilliant.org/' }
          ]
        }
      ]
    },

    interview: {
      resources: [
        {
          title: 'Interview Guides',
          description:
            'Comprehensive interview preparation and career guidance.',
          icon: <Book className="w-7 h-7 text-green-400" />,
          links: [
            {
              name: 'AmbitionBox',
              url: 'https://www.ambitionbox.com/'
            },
            {
              name: 'InterviewStreet',
              url: 'https://www.interviewstreet.com/'
            },
            {
              name: 'Shiksha',
              url: 'https://www.shiksha.com/'
            }
          ]
        },

        {
          title: 'Online Learning',
          description:
            'Premium online learning resources and certification platforms.',
          icon: <Globe className="w-7 h-7 text-blue-400" />,
          links: [
            { name: 'Coursera', url: 'https://www.coursera.org/' },
            { name: 'edX', url: 'https://www.edx.org/' },
            { name: 'Udacity', url: 'https://www.udacity.com/' }
          ]
        }
      ]
    }
  }

  return (
    <>
      <HeroSection />

      <div className="relative min-h-screen overflow-hidden bg-[#0B1120] text-white py-20">

        {/* Background Glow */}
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-cyan-500/20 rounded-full blur-3xl animate-pulse"></div>

        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div> 
        <div
  className="
    absolute
    inset-0
    opacity-20
    bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px)]
    bg-[size:50px_50px]
  "
></div>

       <div className="relative z-10 w-full px-6 md:px-10 lg:px-16">

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-sm mb-6">
              ✨ Modern AI Learning Platform
            </div>

            <h1 className="
              text-5xl
              md:text-7xl
              font-black
              leading-tight
              bg-gradient-to-r
              from-cyan-400
              via-blue-500
              to-purple-500
              bg-clip-text
              text-transparent
            ">
              Interview Preparation
              <br />
              Resources Hub
            </h1>

            <p className="text-gray-400 text-lg md:text-xl max-w-3xl mx-auto mt-8 leading-relaxed">
              Discover premium learning resources, coding platforms,
              aptitude preparation, and AI-powered interview tools.
            </p>
          </motion.div>

          {/* Category Tabs */}
          <div className="flex flex-wrap justify-center gap-5 mb-16">
            {Object.keys(resourceCategories).map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`
                  px-7
                  py-3
                  rounded-2xl
                  font-semibold
                  backdrop-blur-xl
                  border
                  transition-all
                  duration-300
                  hover:scale-105
                  ${
                    activeCategory === category
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white border-cyan-400 shadow-lg shadow-cyan-500/30'
                      : 'bg-white/5 text-gray-300 border-white/10 hover:bg-white/10'
                  }
                `}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>

          {/* Cards */}
          <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {resourceCategories[activeCategory].resources.map(
              (resource, index) => (
                <ResourceCard key={index} {...resource} />
              )
            )}
          </div>

          {/* Extra Section */}
          <div className="
            mt-24
            rounded-3xl
            border
            border-white/10
            bg-white/5
            backdrop-blur-2xl
            overflow-hidden
            shadow-2xl
          ">

            <div className="p-10 md:p-16 text-center">
              <h2 className="text-4xl md:text-5xl font-black mb-6 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                Level Up Your Career
              </h2>

              <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                Explore additional tools and AI-powered resources
                to improve your placement preparation journey.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 p-8 pt-0">

              {[
                {
                  title: 'Resume Builder',
                  description: 'Create stunning modern resumes',
                  icon: <Book className="w-14 h-14 text-cyan-400 mx-auto mb-5" />,
                  url: 'https://www.canva.com/resumes/templates/'
                },

                {
                  title: 'Mock Interviews',
                  description: 'AI-powered interview simulations',
                  icon: <Target className="w-14 h-14 text-green-400 mx-auto mb-5" />,
                  url: '/dashboard'
                },

                {
                  title: 'Skill Assessment',
                  description: 'Analyze and improve your skills',
                  icon: <Brain className="w-14 h-14 text-purple-400 mx-auto mb-5" />,
                  url: 'https://www.skillvalue.com/'
                }
              ].map((item, index) => (
                <div
                  key={index}
                  className="
                    group
                    rounded-3xl
                    border
                    border-white/10
                    bg-white/5
                    p-8
                    text-center
                    transition-all
                    duration-500
                    hover:-translate-y-3
                    hover:border-cyan-400/30
                    hover:shadow-xl
                    hover:shadow-cyan-500/10
                  "
                >
                  {item.icon}

                  <h3 className="text-2xl font-bold text-white mb-4">
                    {item.title}
                  </h3>

                  <p className="text-gray-400 mb-6">
                    {item.description}
                  </p>

                  <a
                    href={item.url}
                    className="
                      inline-flex
                      items-center
                      gap-2
                      text-cyan-400
                      hover:text-cyan-300
                      transition-all
                    "
                  >
                    Explore
                    <ArrowRight className="w-5 h-5" />
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}