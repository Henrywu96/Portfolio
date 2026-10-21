// Asset registry — all images imported here, referenced via ART.*
import heroScene from "../imports/site/image-1.png";
import shield from "../imports/site/shield.png";
import henry from "../imports/site/henry.png";
import island from "../imports/site/island.png";
import hamster from "../imports/site/hamster.png";
import banner from "../imports/site/banner.png";
import bridglyIcon from "../imports/bridgly/bridgly-icon.png";
import bridgeScene from "../imports/site/bridge-scene.png";

// Projects ~ About Me section art
import shield2 from "../imports/site/shield-2.png";
import briefcaseIcon from "../imports/site/briefcase-icon.png";
import bridglyIcon2 from "../imports/bridgly/bridgly-icon-2.png";
import bridglyScene2 from "../imports/bridgly/bridgly-scene-2.png";
import greenpathIcon from "../imports/greenpath/greenpath-icon.png";
import greenpathScene from "../imports/greenpath/greenpath-scene.png";
import studyflowIcon from "../imports/studyflow/studyflow-icon.png";
import studyflowScene from "../imports/studyflow/studyflow-scene.png";
import aboutHenry from "../imports/site/about-henry.png";

// Bridgly case study art
import bridglyCoupleCloud from "../imports/bridgly/bridgly-couple-cloud.png";
import iconBrokenHeart from "../imports/bridgly/icon-broken-heart.png";
import iconClock from "../imports/bridgly/icon-clock.png";
import iconCalendar from "../imports/bridgly/icon-calendar.png";
import iconHeartChat from "../imports/bridgly/icon-heart-chat.png";
import iconInterview from "../imports/bridgly/icon-interview.png";
import iconSurvey from "../imports/bridgly/icon-survey.png";
import iconCompetitive from "../imports/bridgly/icon-competitive.png";
import bridglyOnboarding1 from "../imports/bridgly/bridgly-v2-onboarding-1.png";
import bridglyOnboarding2 from "../imports/bridgly/bridgly-v2-onboarding-2.png";
import bridglyOnboarding3 from "../imports/bridgly/bridgly-v2-onboarding-3.png";
import bridglyOnboarding4 from "../imports/bridgly/bridgly-v2-onboarding-4.png";
import bridglyHome from "../imports/bridgly/bridgly-v2-home.png";
import bridglyChat from "../imports/bridgly/bridgly-v2-chat.png";
import bridglyBlueprint from "../imports/bridgly/bridgly-v2-blueprint.png";
import bridglyMoments from "../imports/bridgly/bridgly-v2-moments.png";
import bridglyProfile from "../imports/bridgly/bridgly-v2-profile.png";
import bridglyHomeProcess from "../imports/bridgly/bridgly-home-process.png";
import bridglyDirections from "../imports/bridgly/bridgly-directions.png";
import greenpath01Welcome from "../imports/greenpath/greenpath-01-welcome.png";
import greenpath02Today from "../imports/greenpath/greenpath-02-today.png";
import greenpath03QuickLog from "../imports/greenpath/greenpath-03-quick-log.png";
import greenpath04Explore from "../imports/greenpath/greenpath-04-explore.png";
import greenpath05Challenges from "../imports/greenpath/greenpath-05-challenges.png";
import greenpath06ChallengeDetail from "../imports/greenpath/greenpath-06-challenge-detail.png";
import greenpath07Impact from "../imports/greenpath/greenpath-07-impact.png";
import greenpath08Profile from "../imports/greenpath/greenpath-08-profile.png";
import studyflow01Welcome from "../imports/studyflow/studyflow-01-welcome.png";
import studyflow02Today from "../imports/studyflow/studyflow-02-today.png";
import studyflow03TaskPicker from "../imports/studyflow/studyflow-03-task-picker.png";
import studyflow04Duration from "../imports/studyflow/studyflow-04-duration.png";
import studyflow05Focus from "../imports/studyflow/studyflow-05-focus.png";
import studyflow06Summary from "../imports/studyflow/studyflow-06-summary.png";
import studyflow07Tasks from "../imports/studyflow/studyflow-07-tasks.png";
import studyflow08Progress from "../imports/studyflow/studyflow-08-progress.png";
import studyflow09Settings from "../imports/studyflow/studyflow-09-settings.png";

// Resume
import resumePdf from "../imports/site/Resume-designer.pdf";

export const ART = {
  heroScene,
  shield,
  shield2,
  henry,
  island,
  hamster,
  banner,
  bridglyIcon,
  bridgeScene,
  briefcaseIcon,
  bridglyIcon2,
  bridglyScene2,
  greenpathIcon,
  greenpathScene,
  studyflowIcon,
  studyflowScene,
  aboutHenry,
  bridglyCoupleCloud,
  iconBrokenHeart,
  iconClock,
  iconCalendar,
  iconHeartChat,
  iconInterview,
  iconSurvey,
  iconCompetitive,
  bridglyOnboarding1,
  bridglyOnboarding2,
  bridglyOnboarding3,
  bridglyOnboarding4,
  bridglyHome,
  bridglyChat,
  bridglyBlueprint,
  bridglyMoments,
  bridglyProfile,
  bridglyHomeProcess,
  bridglyDirections,
  greenpath01Welcome,
  greenpath02Today,
  greenpath03QuickLog,
  greenpath04Explore,
  greenpath05Challenges,
  greenpath06ChallengeDetail,
  greenpath07Impact,
  greenpath08Profile,
  studyflow01Welcome,
  studyflow02Today,
  studyflow03TaskPicker,
  studyflow04Duration,
  studyflow05Focus,
  studyflow06Summary,
  studyflow07Tasks,
  studyflow08Progress,
  studyflow09Settings,
  resumePdf,
};

// Contact email used across the site
export const CONTACT_EMAIL = "henrywu0829@gmail.com";
export const LINKEDIN_URL = "https://www.linkedin.com/in/min-tzu-wu-7910851b4/";
const HAS_REAL_EMAIL = !CONTACT_EMAIL.toLowerCase().endsWith("@example.com");

export function openContact(subject?: string) {
  if (HAS_REAL_EMAIL) {
    const q = subject ? `?subject=${encodeURIComponent(subject)}` : "";
    window.location.href = `mailto:${CONTACT_EMAIL}${q}`;
  } else {
    window.open(LINKEDIN_URL, "_blank", "noopener,noreferrer");
  }
}
