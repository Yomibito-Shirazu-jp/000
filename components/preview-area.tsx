import { motion, AnimatePresence } from 'motion/react';
import { Maximize2, ZoomIn, ZoomOut, MousePointer2, Type, Square, Circle, Image as ImageIcon } from 'lucide-react';

interface PreviewAreaProps {
  isGenerating: boolean;
  previewContent: string | null;
  toolType: string;
}

export function PreviewArea({ isGenerating, previewContent, toolType }: PreviewAreaProps) {
  return (
    <div className="flex-1 bg-neutral-950 flex flex-col relative overflow-hidden">
      {/* Canvas Toolbar */}
      <div className="absolute left-4 top-1/2 -translate-y-1/2 bg-neutral-900 border border-neutral-800 rounded-xl p-2 flex flex-col gap-2 z-10 shadow-xl">
        <button className="p-2 rounded-lg bg-indigo-500/20 text-indigo-400 hover:bg-indigo-500/30 transition-colors">
          <MousePointer2 className="w-4 h-4" />
        </button>
        <button className="p-2 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors">
          <Type className="w-4 h-4" />
        </button>
        <button className="p-2 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors">
          <Square className="w-4 h-4" />
        </button>
        <button className="p-2 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors">
          <Circle className="w-4 h-4" />
        </button>
        <button className="p-2 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors">
          <ImageIcon className="w-4 h-4" />
        </button>
      </div>

      {/* Zoom Controls */}
      <div className="absolute bottom-4 right-4 bg-neutral-900 border border-neutral-800 rounded-lg flex items-center p-1 z-10 shadow-xl">
        <button className="p-1.5 text-neutral-400 hover:text-white hover:bg-neutral-800 rounded transition-colors">
          <ZoomOut className="w-4 h-4" />
        </button>
        <span className="text-xs font-mono text-neutral-300 px-2 w-12 text-center">100%</span>
        <button className="p-1.5 text-neutral-400 hover:text-white hover:bg-neutral-800 rounded transition-colors">
          <ZoomIn className="w-4 h-4" />
        </button>
        <div className="w-px h-4 bg-neutral-800 mx-1" />
        <button className="p-1.5 text-neutral-400 hover:text-white hover:bg-neutral-800 rounded transition-colors">
          <Maximize2 className="w-4 h-4" />
        </button>
      </div>

      {/* Canvas Area */}
      <div className="flex-1 overflow-auto p-8 flex items-center justify-center bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(to_bottom,white,transparent)]">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        
        <AnimatePresence mode="wait">
          {previewContent ? (
            <motion.div
              key="content"
              initial={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
              transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
              className="relative z-0 shadow-2xl rounded-sm overflow-hidden bg-white"
              style={{
                width: toolType === 'instagram' ? 1080/2 : toolType === 'banner' ? 1200/2 : 1440/1.5,
                height: toolType === 'instagram' ? 1080/2 : toolType === 'banner' ? 630/2 : 900/1.5,
              }}
            >
              {/* Render generated content here. For now, a placeholder image or HTML */}
              {previewContent.startsWith('http') ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={previewContent} alt="Generated Design" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full p-8" dangerouslySetInnerHTML={{ __html: previewContent }} />
              )}
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="relative z-0 flex flex-col items-center justify-center text-neutral-500 space-y-4"
            >
              <div className="w-24 h-24 border-2 border-dashed border-neutral-700 rounded-2xl flex items-center justify-center bg-neutral-900/50">
                <ImageIcon className="w-8 h-8 text-neutral-600" />
              </div>
              <p className="text-sm">AIに指示を出してデザインを生成してください</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Scanning Effect during generation */}
        <AnimatePresence>
          {isGenerating && previewContent && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-20 pointer-events-none overflow-hidden"
            >
              <motion.div
                animate={{ top: ['-10%', '110%'] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                className="absolute left-0 right-0 h-32 bg-gradient-to-b from-transparent via-indigo-500/20 to-transparent border-b border-indigo-500/50"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
