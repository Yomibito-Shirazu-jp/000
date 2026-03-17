import {
  Globe,
  LayoutTemplate,
  Image as ImageIcon,
  Instagram,
  Printer,
  FilePlus,
  Grid,
  BookOpen,
  Settings,
  LogOut,
  ChevronRight,
  MessageSquare,
} from 'lucide-react';
import { motion } from 'motion/react';

export type ToolType =
  | 'web'
  | 'lp'
  | 'banner'
  | 'instagram'
  | 'dtp'
  | 'insertions'
  | 'collages'
  | 'covers';

interface SidebarProps {
  activeTool: ToolType;
  setActiveTool: (tool: ToolType) => void;
}

const tools = [
  { id: 'web', label: 'Web Design', icon: Globe },
  { id: 'lp', label: 'LP Design', icon: LayoutTemplate },
  { id: 'banner', label: 'Banner Design', icon: ImageIcon },
  { id: 'instagram', label: 'Instagram Post', icon: Instagram },
  { id: 'dtp', label: 'DTP', icon: Printer },
  { id: 'insertions', label: 'Insertions', icon: FilePlus },
  { id: 'collages', label: 'Collages', icon: Grid },
  { id: 'covers', label: 'Covers', icon: BookOpen },
] as const;

export function Sidebar({ activeTool, setActiveTool }: SidebarProps) {
  return (
    <div className="w-64 bg-neutral-900 border-r border-neutral-800 flex flex-col h-full">
      <div className="p-6">
        <h1 className="text-xl font-bold tracking-tighter flex items-center gap-2 text-white">
          <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center">
            <span className="font-mono text-xs font-black">OS</span>
          </div>
          DTP Web OS
        </h1>
      </div>

      <div className="flex-1 overflow-y-auto px-3 py-2 space-y-1">
        <div className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-4 px-3">
          Design Tools
        </div>
        {tools.map((tool) => {
          const Icon = tool.icon;
          const isActive = activeTool === tool.id;
          return (
            <button
              key={tool.id}
              onClick={() => setActiveTool(tool.id as ToolType)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all relative ${
                isActive
                  ? 'text-white bg-neutral-800'
                  : 'text-neutral-400 hover:text-white hover:bg-neutral-800/50'
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="active-pill"
                  className="absolute left-0 w-1 h-6 bg-indigo-500 rounded-r-full"
                  initial={false}
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
              <Icon className="w-4 h-4" />
              {tool.label}
              {isActive && (
                <ChevronRight className="w-4 h-4 ml-auto opacity-50" />
              )}
            </button>
          );
        })}
      </div>

      <div className="p-4 border-t border-neutral-800 space-y-2">
        <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors">
          <Settings className="w-4 h-4" />
          Settings
        </button>
        <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-neutral-400 hover:text-red-400 hover:bg-red-400/10 transition-colors">
          <LogOut className="w-4 h-4" />
          Logout
        </button>
      </div>
    </div>
  );
}
