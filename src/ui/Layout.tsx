import React from 'react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

// Main App Layout
export interface AppLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export const AppLayout: React.FC<AppLayoutProps> = ({ children, className }) => {
  return (
    <div className={cn(
      'min-h-screen bg-background text-foreground',
      'bg-gradient-to-br from-background via-background to-muted/20',
      className
    )}>
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.015] pointer-events-none" />
      {children}
    </div>
  );
};

// Builder Layout (Hero + Sidebar + Preview)
export interface BuilderLayoutProps {
  hero: React.ReactNode;
  sidebar: React.ReactNode;
  preview: React.ReactNode;
  sidebarOpen: boolean;
  previewOpen: boolean;
  onCloseSidebar?: () => void;
  onClosePreview?: () => void;
}

export const BuilderLayout: React.FC<BuilderLayoutProps> = ({
  hero,
  sidebar,
  preview,
  sidebarOpen,
  previewOpen,
  onCloseSidebar,
  onClosePreview
}) => {
  return (
    <div className="h-screen flex overflow-hidden">
      {/* Left Column - Hero or Sidebar */}
      <div className="w-full lg:w-[37.5%] flex-shrink-0 relative">
        <AnimatePresence mode="wait">
          {!sidebarOpen ? (
            <motion.div
              key="hero"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="h-full"
            >
              {hero}
            </motion.div>
          ) : (
            <motion.div
              key="sidebar"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="h-full"
            >
              {sidebar}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Right Column - Preview (Desktop) */}
      <div className="hidden lg:flex flex-1 min-h-0">
        {preview}
      </div>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="lg:hidden fixed inset-0 bg-black/50 z-40"
              onClick={onCloseSidebar}
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="lg:hidden fixed inset-y-0 left-0 w-full max-w-sm z-50"
            >
              {sidebar}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Mobile Preview Overlay */}
      <AnimatePresence>
        {previewOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="lg:hidden fixed inset-0 bg-black/50 z-60"
              onClick={onClosePreview}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="lg:hidden fixed inset-4 z-70 bg-white rounded-2xl overflow-hidden shadow-2xl"
            >
              {preview}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

// Sidebar Layout
export interface SidebarLayoutProps {
  header: React.ReactNode;
  navigation: React.ReactNode;
  content: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
}

export const SidebarLayout: React.FC<SidebarLayoutProps> = ({
  header,
  navigation,
  content,
  footer,
  className
}) => {
  return (
    <div className={cn('h-full flex flex-col bg-white border-r shadow-lg', className)}>
      {/* Header */}
      <div className="flex-shrink-0 border-b bg-white/80 backdrop-blur">
        {header}
      </div>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden min-h-0">
        {/* Navigation */}
        <div className="w-12 2xl:w-40 border-r bg-muted/20 flex-shrink-0">
          {navigation}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          {content}
        </div>
      </div>

      {/* Footer */}
      {footer && (
        <div className="flex-shrink-0 border-t bg-white/80 backdrop-blur">
          {footer}
        </div>
      )}
    </div>
  );
};

// Preview Layout
export interface PreviewLayoutProps {
  children: React.ReactNode;
  mode: 'site' | 'logo' | 'menu';
  className?: string;
}

export const PreviewLayout: React.FC<PreviewLayoutProps> = ({ 
  children, 
  mode, 
  className 
}) => {
  return (
    <div className={cn(
      'h-full w-full flex items-center justify-center p-6',
      'bg-gradient-to-br from-muted/20 via-background to-muted/40',
      className
    )}>
      <div className={cn(
        'w-full h-full rounded-2xl border shadow-xl overflow-hidden bg-white',
        mode === 'logo' && 'max-w-4xl aspect-video',
        mode === 'menu' && 'max-w-5xl',
        mode === 'site' && 'max-w-full'
      )}>
        {children}
      </div>
    </div>
  );
};