import { Download, Share2, Undo2, Redo2, Monitor, Smartphone } from 'lucide-react';

export function TopNav() {
  return (
    <header className="h-14 border-b border-neutral-800 bg-neutral-900/50 backdrop-blur-sm flex items-center justify-between px-6 shrink-0">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 bg-neutral-800/50 rounded-md p-1">
          <button className="p-1.5 rounded text-neutral-400 hover:text-white hover:bg-neutral-700 transition-colors">
            <Undo2 className="w-4 h-4" />
          </button>
          <button className="p-1.5 rounded text-neutral-400 hover:text-white hover:bg-neutral-700 transition-colors">
            <Redo2 className="w-4 h-4" />
          </button>
        </div>
        <div className="h-4 w-px bg-neutral-800" />
        <div className="flex items-center gap-2 bg-neutral-800/50 rounded-md p-1">
          <button className="p-1.5 rounded bg-neutral-700 text-white shadow-sm transition-colors">
            <Monitor className="w-4 h-4" />
          </button>
          <button className="p-1.5 rounded text-neutral-400 hover:text-white hover:bg-neutral-700 transition-colors">
            <Smartphone className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-neutral-300 hover:text-white transition-colors">
          <Share2 className="w-4 h-4" />
          Share
        </button>
        <div className="flex items-center gap-1 bg-indigo-600 hover:bg-indigo-500 text-white rounded-md transition-colors shadow-sm">
          <button className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium border-r border-indigo-500/50">
            <Download className="w-4 h-4" />
            Export
          </button>
          <select className="bg-transparent text-sm font-medium py-1.5 pr-2 pl-1 outline-none cursor-pointer appearance-none">
            <option value="pdf" className="bg-neutral-800">PDF</option>
            <option value="ai" className="bg-neutral-800">AI</option>
            <option value="png" className="bg-neutral-800">PNG</option>
            <option value="svg" className="bg-neutral-800">SVG</option>
          </select>
        </div>
      </div>
    </header>
  );
}
