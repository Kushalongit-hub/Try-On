// Enhanced Logger that CANNOT be suppressed
// This logger will ALWAYS print to console and optionally to UI

type LogLevel = 'info' | 'warn' | 'error' | 'success' | 'debug';

interface LogEntry {
    timestamp: string;
    level: LogLevel;
    message: string;
    data?: any;
}

class EnhancedLogger {
    private logs: LogEntry[] = [];
    private listeners: ((log: LogEntry) => void)[] = [];
    
    // Force console to exist
    private forceLog = (level: string, ...args: any[]) => {
        const timestamp = new Date().toISOString();
        const prefix = `[${timestamp}] [${level.toUpperCase()}]`;
        
        // Try multiple console methods to ensure output
        try {
            if (typeof console !== 'undefined') {
                switch (level) {
                    case 'error':
                        console.error?.(prefix, ...args);
                        break;
                    case 'warn':
                        console.warn?.(prefix, ...args);
                        break;
                    default:
                        console.log?.(prefix, ...args);
                }
            }
        } catch (e) {
            // Fallback: try to write to document if console fails
            try {
                if (typeof document !== 'undefined') {
                    const debugDiv = document.getElementById('debug-logs');
                    if (debugDiv) {
                        debugDiv.innerHTML += `<div>${prefix} ${args.join(' ')}</div>`;
                    }
                }
            } catch (docError) {
                // Last resort: alert (only for critical errors)
                if (level === 'error') {
                    alert(`ERROR: ${args.join(' ')}`);
                }
            }
        }
    };
    
    private addLog(level: LogLevel, message: string, data?: any) {
        const entry: LogEntry = {
            timestamp: new Date().toISOString(),
            level,
            message,
            data
        };
        
        this.logs.push(entry);
        this.listeners.forEach(listener => listener(entry));
        
        // Force output to console
        this.forceLog(level, message, data || '');
    }
    
    info(message: string, data?: any) {
        this.addLog('info', message, data);
    }
    
    warn(message: string, data?: any) {
        this.addLog('warn', message, data);
    }
    
    error(message: string, data?: any) {
        this.addLog('error', message, data);
    }
    
    success(message: string, data?: any) {
        this.addLog('success', message, data);
    }
    
    debug(message: string, data?: any) {
        this.addLog('debug', message, data);
    }
    
    // Group logs together
    group(title: string) {
        this.forceLog('info', `\n${'═'.repeat(60)}`);
        this.forceLog('info', `  ${title}`);
        this.forceLog('info', '═'.repeat(60));
    }
    
    groupEnd() {
        this.forceLog('info', '═'.repeat(60) + '\n');
    }
    
    // Subscribe to log updates
    subscribe(listener: (log: LogEntry) => void) {
        this.listeners.push(listener);
        return () => {
            this.listeners = this.listeners.filter(l => l !== listener);
        };
    }
    
    // Get all logs
    getLogs() {
        return [...this.logs];
    }
    
    // Clear logs
    clear() {
        this.logs = [];
        this.forceLog('info', 'Logs cleared');
    }
}

// Create singleton instance
export const logger = new EnhancedLogger();

// Test logger on initialization
logger.info('🚀 Enhanced Logger Initialized');
logger.info('✅ Console logging is ACTIVE');
logger.info('📋 All logs will be captured and displayed');

// Export for use in components
export type { LogEntry, LogLevel };
