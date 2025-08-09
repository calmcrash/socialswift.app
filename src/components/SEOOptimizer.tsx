import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp, Target, Hash, MessageCircle, Search, BookOpen } from 'lucide-react';
import { cn } from '../utils/cn';

interface SEOMetric {
  name: string;
  score: number;
  advice: string;
  icon: React.ReactNode;
}

interface SEOOptimizerProps {
  caption: string;
}

const SEOOptimizer: React.FC<SEOOptimizerProps> = ({ caption }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [metrics, setMetrics] = useState<SEOMetric[]>([]);
  const [overallScore, setOverallScore] = useState(0);

  // Calculate SEO metrics based on caption content
  useEffect(() => {
    const calculateMetrics = () => {
      const wordCount = caption.trim().split(/\s+/).filter(word => word.length > 0).length;
      const hashtags = (caption.match(/#\w+/g) || []).length;
      const hasCallToAction = /\b(click|visit|check|follow|subscribe|like|share|comment|swipe|tap|download|buy|shop|learn|discover|explore|join|sign up|register|book|order|get|try|start|watch|read|see|view)\b/i.test(caption);
      const keywords = caption.toLowerCase().match(/\b\w{4,}\b/g)?.length || 0;

      // Helper function to count syllables in a word
      const countSyllables = (word: string): number => {
        word = word.toLowerCase();
        if (word.length <= 3) return 1;
        word = word.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '');
        word = word.replace(/^y/, '');
        const matches = word.match(/[aeiouy]{1,2}/g);
        return matches ? matches.length : 1;
      };

      // Text Length Score (0-100) - based on word count
      let textLengthScore = 0;
      let textAdvice = "Add more content to improve engagement.";
      if (wordCount >= 150 && wordCount <= 300) {
        textLengthScore = 100;
        textAdvice = "Good length for selected platforms.";
      } else if (wordCount > 300) {
        textLengthScore = 75;
        textAdvice = "Consider condensing or expanding based on platforms.";
      } else if (wordCount > 0) {
        textLengthScore = 50;
        textAdvice = "Add more content to improve engagement.";
      }

      // Readability Score (Flesch-Kincaid style)
      let readabilityScore = 0;
      let readabilityAdvice = "Add content to calculate readability.";
      
      if (caption.trim().length > 0) {
        const sentences = caption.split(/[.!?]+/).filter(s => s.trim().length > 0).length || 1;
        const words = wordCount || 1;
        const syllables = caption.split(/\s+/).reduce((total, word) => {
          return total + countSyllables(word.replace(/[^\w]/g, ''));
        }, 0) || 1;
        
        // Flesch Reading Ease formula: 206.835 - (1.015 × ASL) - (84.6 × ASW)
        // ASL = Average Sentence Length, ASW = Average Syllables per Word
        const avgSentenceLength = words / sentences;
        const avgSyllablesPerWord = syllables / words;
        const fleschScore = 206.835 - (1.015 * avgSentenceLength) - (84.6 * avgSyllablesPerWord);
        
        // Convert to 0-100 scale where higher is better
        readabilityScore = Math.max(0, Math.min(100, fleschScore));
        
        if (readabilityScore >= 60 && readabilityScore <= 70) {
          readabilityAdvice = "Good readability for wide audience.";
        } else if (readabilityScore < 60) {
          readabilityAdvice = "Use shorter sentences for better engagement.";
        } else {
          readabilityAdvice = "Consider simplifying language.";
        }
      }

      // Hashtag Score (0-100)
      let hashtagScore = 0;
      let hashtagAdvice = "Include relevant hashtags to increase reach.";
      if (hashtags >= 3 && hashtags <= 8) {
        hashtagScore = 100;
        hashtagAdvice = "Perfect hashtag usage for maximum reach!";
      } else if (hashtags >= 1 && hashtags <= 2) {
        hashtagScore = 70;
        hashtagAdvice = "Consider adding more hashtags for better reach.";
      } else if (hashtags > 8) {
        hashtagScore = 60;
        hashtagAdvice = "Too many hashtags might look spammy. Try 3-8 hashtags.";
      }

      // Call to Action Score (0-100)
      const ctaScore = hasCallToAction ? 100 : 0;
      const ctaAdvice = hasCallToAction 
        ? "Great! Your post includes a clear call to action."
        : "Add a clear call to action to drive engagement.";

      // Keywords Score (0-100)
      let keywordScore = 0;
      let keywordAdvice = "Include industry-related keywords for better reach.";
      if (keywords >= 8) {
        keywordScore = 100;
        keywordAdvice = "Excellent keyword density for discoverability!";
      } else if (keywords >= 5) {
        keywordScore = 80;
        keywordAdvice = "Good keyword usage, consider adding a few more.";
      } else if (keywords >= 3) {
        keywordScore = 60;
        keywordAdvice = "Include more relevant keywords for better reach.";
      }

      const newMetrics: SEOMetric[] = [
        {
          name: "Text Length",
          score: textLengthScore,
          advice: textAdvice,
          icon: <MessageCircle className="h-4 w-4" />
        },
        {
          name: "Readability",
          score: Math.round(readabilityScore),
          advice: readabilityAdvice,
          icon: <BookOpen className="h-4 w-4" />
        },
        {
          name: "Hashtag Usage",
          score: hashtagScore,
          advice: hashtagAdvice,
          icon: <Hash className="h-4 w-4" />
        },
        {
          name: "Call to Action",
          score: ctaScore,
          advice: ctaAdvice,
          icon: <Target className="h-4 w-4" />
        },
        {
          name: "Keywords",
          score: keywordScore,
          advice: keywordAdvice,
          icon: <Search className="h-4 w-4" />
        }
      ];

      setMetrics(newMetrics);
      
      // Calculate overall score
      const totalScore = newMetrics.reduce((sum, metric) => sum + metric.score, 0);
      const avgScore = Math.round(totalScore / newMetrics.length);
      setOverallScore(avgScore);
    };

    calculateMetrics();
  }, [caption]);

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'from-green-400 to-green-500';
    if (score >= 60) return 'from-yellow-400 to-yellow-500';
    if (score >= 40) return 'from-orange-400 to-orange-500';
    return 'from-blue-400 to-blue-500';
  };

  return (
    <div className="w-full">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-center gap-3 py-4 px-6 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 hover:bg-white/15 transition-all duration-200 group"
      >
        <span className="text-lg font-medium text-white">Optimize Post</span>
        {isExpanded ? (
          <ChevronUp className="h-5 w-5 text-white/80 group-hover:text-white transition-all duration-200" />
        ) : (
          <ChevronDown className="h-5 w-5 text-white/80 group-hover:text-white transition-all duration-200" />
        )}
      </button>

      <div className={cn(
        "overflow-hidden transition-all duration-300 ease-in-out",
        isExpanded ? "max-h-96 opacity-100 mt-4" : "max-h-0 opacity-0"
      )}>
        <div className="bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 p-6 space-y-6">
          {/* Overall SEO Score */}
          <div className="space-y-3">
            <h3 className="text-xl font-semibold text-white">SEO Suggestions</h3>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-white font-medium">Overall SEO Score</span>
                <span className="text-white font-bold text-lg">{overallScore}%</span>
              </div>
              
              <div className="w-full bg-white/20 rounded-full h-3 overflow-hidden">
                <div 
                  className={cn(
                    "h-full bg-gradient-to-r transition-all duration-500 ease-out",
                    getScoreColor(overallScore)
                  )}
                  style={{ width: `${overallScore}%` }}
                />
              </div>
            </div>
          </div>

          {/* Individual Metrics */}
          <div className="space-y-4">
            {metrics.map((metric, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="text-white/80">
                    {metric.icon}
                  </div>
                  <span className="text-white font-medium">{metric.name}</span>
                  <span className="text-white/80 text-sm ml-auto">{metric.score}%</span>
                </div>
                
                <div className="w-full bg-white/20 rounded-full h-2 overflow-hidden">
                  <div 
                    className={cn(
                      "h-full bg-gradient-to-r transition-all duration-500 ease-out",
                      getScoreColor(metric.score)
                    )}
                    style={{ width: `${metric.score}%` }}
                  />
                </div>
                
                <p className="text-white/90 text-sm leading-relaxed">
                  {metric.advice}
                </p>
              </div>
            ))}
          </div>

          {/* Close button for convenience */}
          <div className="flex justify-center pt-2">
            <button
              onClick={() => setIsExpanded(false)}
              className="text-white/60 hover:text-white/80 text-sm transition-colors duration-200"
            >
              Collapse
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SEOOptimizer;