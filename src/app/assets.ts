// Asset registry — all images imported here, referenced via ART.*
import heroScene from "../imports/image-1.png";
import shield from "../imports/shield.png";
import henry from "../imports/henry.png";
import island from "../imports/island.png";
import hamster from "../imports/hamster.png";
import banner from "../imports/banner.png";
import bridglyIcon from "../imports/bridgly-icon.png";
import bridgeScene from "../imports/bridge-scene.png";

// Projects ~ About Me section art
import shield2 from "../imports/shield-2.png";
import briefcaseIcon from "../imports/briefcase-icon.png";
import bridglyIcon2 from "../imports/bridgly-icon-2.png";
import bridglyScene2 from "../imports/bridgly-scene-2.png";
import greenpathIcon from "../imports/greenpath-icon.png";
import greenpathScene from "../imports/greenpath-scene.png";
import studyflowIcon from "../imports/studyflow-icon.png";
import studyflowScene from "../imports/studyflow-scene.png";
import aboutHenry from "../imports/about-henry.png";

// Bridgly case study art
import bridglyPhones from "../imports/bridgly-phones.png";
import bridglyCoupleCloud from "../imports/bridgly-couple-cloud.png";
import iconBrokenHeart from "../imports/icon-broken-heart.png";
import iconClock from "../imports/icon-clock.png";
import iconCalendar from "../imports/icon-calendar.png";
import iconHeartChat from "../imports/icon-heart-chat.png";
import iconInterview from "../imports/icon-interview.png";
import iconSurvey from "../imports/icon-survey.png";
import iconCompetitive from "../imports/icon-competitive.png";
import bridgly01Splash from "../imports/bridgly-01-splash.png";
import bridgly02Onboarding1 from "../imports/bridgly-02-onboarding-1.png";
import bridgly03Onboarding2 from "../imports/bridgly-03-onboarding-2.png";
import bridgly04Onboarding3 from "../imports/bridgly-04-onboarding-3.png";
import bridgly05Home from "../imports/bridgly-05-home.png";
import bridgly06Chat from "../imports/bridgly-06-chat.png";
import bridgly07Blueprint from "../imports/bridgly-07-blueprint.png";
import bridgly08Moments from "../imports/bridgly-08-moments.png";
import bridgly09Profile from "../imports/bridgly-09-profile.png";
import bridgly10Onboarding4 from "../imports/bridgly-10-onboarding-4.png";
import bridgly11ChatKeyboard from "../imports/bridgly-11-chat-keyboard.png";
import greenpath01Welcome from "../imports/greenpath-01-welcome.png";
import greenpath02Today from "../imports/greenpath-02-today.png";
import greenpath03QuickLog from "../imports/greenpath-03-quick-log.png";
import greenpath04Explore from "../imports/greenpath-04-explore.png";
import greenpath05Challenges from "../imports/greenpath-05-challenges.png";
import greenpath06ChallengeDetail from "../imports/greenpath-06-challenge-detail.png";
import greenpath07Impact from "../imports/greenpath-07-impact.png";
import greenpath08Profile from "../imports/greenpath-08-profile.png";
import studyflow01Welcome from "../imports/studyflow-01-welcome.png";
import studyflow02Today from "../imports/studyflow-02-today.png";
import studyflow03TaskPicker from "../imports/studyflow-03-task-picker.png";
import studyflow04Duration from "../imports/studyflow-04-duration.png";
import studyflow05Focus from "../imports/studyflow-05-focus.png";
import studyflow06Summary from "../imports/studyflow-06-summary.png";
import studyflow07Tasks from "../imports/studyflow-07-tasks.png";
import studyflow08Progress from "../imports/studyflow-08-progress.png";
import studyflow09Settings from "../imports/studyflow-09-settings.png";

// Resume
import resumePdf from "../imports/Resume-designer.pdf";

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
  bridglyPhones,
  bridglyCoupleCloud,
  iconBrokenHeart,
  iconClock,
  iconCalendar,
  iconHeartChat,
  iconInterview,
  iconSurvey,
  iconCompetitive,
  bridgly01Splash,
  bridgly02Onboarding1,
  bridgly03Onboarding2,
  bridgly04Onboarding3,
  bridgly05Home,
  bridgly06Chat,
  bridgly07Blueprint,
  bridgly08Moments,
  bridgly09Profile,
  bridgly10Onboarding4,
  bridgly11ChatKeyboard,
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
