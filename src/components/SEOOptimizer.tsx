import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp, Target, Hash, MessageCircle, Search, BookOpen, Users } from 'lucide-react';
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
      const textLength = caption.length;
      const hashtags = (caption.match(/#\w+/g) || []).length;
      const hasCallToAction = /\b(click|visit|check|follow|subscribe|like|share|comment|swipe|tap|download|buy|shop|learn|discover|explore|join|sign up|register|book|order|get|try|start|watch|read|see|view)\b/i.test(caption);
      const keywords = caption.toLowerCase().match(/\b\w{4,}\b/g)?.length || 0;

      // Calculate engagement triggers
      const questions = (caption.match(/\?/g) || []).length;
      const engagementWords = (caption.toLowerCase().match(/\b(ask|share|think|tell|comment|reply|thoughts|opinion|agree|disagree|experience|story|advice|help|tips|ideas|suggest|recommend|vote|poll|choose|prefer|favorite|best|worst|love|hate|feel|believe|know|remember|imagine|guess|wonder)\b/g) || []).length;
      const emojis = (caption.match(/[\u{1F600}-\u{1F64F}]|[\u{1F300}-\u{1F5FF}]|[\u{1F680}-\u{1F6FF}]|[\u{1F1E0}-\u{1F1FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]/gu) || []).length;
      
      const totalEngagementTriggers = questions + engagementWords + emojis;
      
      // Helper function to count syllables in a word
      const countSyllables = (word: string): number => {
        word = word.toLowerCase();
        if (word.length <= 3) return 1;
        word = word.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '');
        word = word.replace(/^y/, '');
        const matches = word.match(/[aeiouy]{1,2}/g);
        return matches ? matches.length : 1;
      };

      // Calculate readability score
      const sentences = caption.split(/[.!?]+/).filter(s => s.trim().length > 0);
      const words = caption.split(/\s+/).filter(w => w.length > 0);
      const totalSyllables = words.reduce((sum, word) => sum + countSyllables(word), 0);
      
      let readabilityScore = 0;
      let readabilityAdvice = "Add more content to calculate readability.";
      
      if (sentences.length > 0 && words.length >= 20) {
        const avgWordsPerSentence = words.length / sentences.length;
        const avgSyllablesPerWord = totalSyllables / words.length;
        
        // Simplified readability calculation (higher score = more readable)
        // Optimal range: 60-70
        const fleschScore = 206.835 - (1.015 * avgWordsPerSentence) - (84.6 * avgSyllablesPerWord);
        readabilityScore = Math.max(0, Math.min(100, Math.round(fleschScore)));
        
        if (readabilityScore >= 60 && readabilityScore <= 70) {
          readabilityAdvice = "Good readability for your audience!";
        } else if (readabilityScore < 60) {
          readabilityAdvice = "Use shorter sentences for better engagement.";
        } else {
          readabilityAdvice = "Content is very easy to read - consider adding complexity if needed.";
        }
      } else if (words.length > 0 && words.length < 20) {
        readabilityScore = 0;
        readabilityAdvice = "Add more content to calculate readability.";
      }

      // Text Length Score (0-100)
      let textLengthScore = 0;
      let textAdvice = "Add more content to improve engagement.";
      if (textLength >= 150) {
        textLengthScore = 100;
        textAdvice = "Perfect length for maximum engagement!";
      } else if (textLength >= 100) {
        textLengthScore = Math.round(60 + ((textLength - 100) / 50) * 20);
        textAdvice = "Good length, consider adding a bit more detail.";
      } else if (textLength >= 50) {
        textLengthScore = Math.round(30 + ((textLength - 50) / 50) * 30);
        textAdvice = "Add more content to improve engagement.";
      } else if (textLength >= 30) {
        textLengthScore = Math.round(10 + ((textLength - 30) / 20) * 20);
        textAdvice = "Your post is too short. Add more engaging content.";
      } else if (textLength > 0) {
        textLengthScore = Math.round((textLength / 30) * 10);
        textAdvice = "Your post is too short. Add more engaging content.";
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

      // Engagement Triggers Score (0-100)
      let engagementScore = 0;
      let engagementAdvice = "Include questions or interactive elements to boost engagement.";
      
      if (totalEngagementTriggers >= 5) {
        engagementScore = 100;
        engagementAdvice = "Excellent engagement triggers! Your post encourages interaction.";
      } else if (totalEngagementTriggers >= 3) {
        engagementScore = 80;
        engagementAdvice = "Good engagement triggers detected. Consider adding more interactive elements.";
      } else if (totalEngagementTriggers >= 1) {
        engagementScore = 60;
        engagementAdvice = "Some engagement triggers found. Add more questions or interactive elements.";
      }

      // Keywords Score (0-100)
      let keywordScore = 0;
      let keywordAdvice = "Include industry-related keywords for better reach.";
      if (keywords >= 8) {
        keywordScore = Math.min(100, 70 + ((keywords - 8) * 5));
        keywordAdvice = "Excellent keyword density for discoverability!";
      } else if (keywords >= 5) {
        keywordScore = Math.round(40 + ((keywords - 5) / 3) * 30);
        keywordAdvice = "Good keyword usage, consider adding a few more.";
      } else if (keywords >= 3) {
        keywordScore = Math.round(20 + ((keywords - 3) / 2) * 20);
        keywordAdvice = "Include more relevant keywords for better reach.";
      } else if (keywords > 0) {
        keywordScore = Math.round((keywords / 3) * 20);
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
          name: "Call to Action",
          score: ctaScore,
          advice: ctaAdvice,
          icon: <Target className="h-4 w-4" />
        },
        {
          name: "Readability Score",
          score: readabilityScore,
          advice: readabilityAdvice,
          icon: <BookOpen className="h-4 w-4" />
        },
        {
          name: "Keywords",
          score: keywordScore,
          advice: keywordAdvice,
          icon: <Search className="h-4 w-4" />
        },
        {
          name: "Hashtag Usage",
          score: hashtagScore,
          advice: hashtagAdvice,
          icon: <Hash className="h-4 w-4" />
        },
        {
          name: "Engagement Triggers",
          score: engagementScore,
          advice: engagementAdvice,
          icon: <Users className="h-4 w-4" />
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
        isExpanded ? "max-h-[700px] opacity-100 mt-4" : "max-h-0 opacity-0"
      )}>
        <div className="bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 p-6 space-y-6">
          {/* Overall SEO Score */}
          <div className="space-y-3">
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

          {/* Collapse Button */}
<div className="relative">
  <button
    onClick={() => setIsExpanded(false)}
    className="absolute left-1/2 transform -translate-x-1/2 -top-4
               text-white/60 hover:text-white transition-colors duration-200"
  >
    <ChevronUp className="h-5 w-5" />
  </button>
</div>
        </div>
      </div>
    </div>
  );
};
export default SEOOptimizer;
