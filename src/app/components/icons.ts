import {
  Heart,
  Leaf,
  BookOpen,
  Search,
  PenTool,
  Boxes,
  LayoutGrid,
  MousePointerClick,
  ClipboardCheck,
  Clock,
  CalendarDays,
  Users,
  Wrench,
  Zap,
  MessageCircle,
  BarChart3,
  Sparkles,
  Repeat,
  Star,
} from "lucide-react";

export const ICONS: Record<string, any> = {
  Heart,
  Leaf,
  BookOpen,
  Search,
  PenTool,
  Boxes,
  LayoutGrid,
  MousePointerClick,
  ClipboardCheck,
  Clock,
  CalendarDays,
  Users,
  Wrench,
  Zap,
  MessageCircle,
  BarChart3,
  Sparkles,
  Repeat,
  Star,
};

export function icon(name: string) {
  return ICONS[name] ?? Star;
}
