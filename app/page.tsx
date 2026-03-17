'use client';

import { useState } from 'react';
import { Sidebar, ToolType } from '@/components/sidebar';
import { TopNav } from '@/components/top-nav';
import { ChatInterface } from '@/components/chat-interface';
import { PreviewArea } from '@/components/preview-area';

export default function Home() {
  const [activeTool, setActiveTool] = useState<ToolType>('web');
  const [isGenerating, setIsGenerating] = useState(false);
  const [previewContent, setPreviewContent] = useState<string | null>(null);

  const handleGenerate = (prompt: string) => {
    setIsGenerating(true);
    
    // Simulate AI generation delay
    setTimeout(() => {
      setIsGenerating(false);
      
      // Mock generated content based on tool type
      if (activeTool === 'instagram') {
        setPreviewContent('https://picsum.photos/seed/instagram-banner/1080/1080?blur=2');
      } else if (activeTool === 'banner') {
        setPreviewContent('https://picsum.photos/seed/web-banner/1200/630?blur=2');
      } else if (activeTool === 'web' || activeTool === 'lp') {
        setPreviewContent(`
          <div style="font-family: sans-serif; color: #333; height: 100%; display: flex; flex-direction: column;">
            <header style="padding: 20px; border-bottom: 1px solid #eee; display: flex; justify-content: space-between; align-items: center;">
              <div style="font-weight: bold; font-size: 24px;">BrandLogo</div>
              <nav>
                <a href="#" style="margin-left: 20px; text-decoration: none; color: #666;">Features</a>
                <a href="#" style="margin-left: 20px; text-decoration: none; color: #666;">Pricing</a>
                <a href="#" style="margin-left: 20px; text-decoration: none; color: #666;">Contact</a>
              </nav>
            </header>
            <main style="flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; padding: 40px;">
              <h1 style="font-size: 48px; margin-bottom: 20px; color: #111;">${prompt.substring(0, 30)}...</h1>
              <p style="font-size: 20px; color: #666; max-width: 600px; margin-bottom: 40px;">This is a generated placeholder for your requested design. The AI has processed your prompt and created this layout.</p>
              <button style="padding: 15px 30px; background: #4f46e5; color: white; border: none; border-radius: 8px; font-size: 18px; cursor: pointer;">Get Started</button>
            </main>
          </div>
        `);
      } else {
        setPreviewContent('https://picsum.photos/seed/dtp-design/800/1200?blur=2');
      }
    }, 3000);
  };

  return (
    <div className="flex h-screen bg-neutral-950 text-neutral-50 overflow-hidden font-sans">
      <Sidebar activeTool={activeTool} setActiveTool={setActiveTool} />
      <div className="flex flex-col flex-1 min-w-0">
        <TopNav />
        <div className="flex flex-1 overflow-hidden">
          <ChatInterface onGenerate={handleGenerate} isGenerating={isGenerating} />
          <PreviewArea isGenerating={isGenerating} previewContent={previewContent} toolType={activeTool} />
        </div>
      </div>
    </div>
  );
}
