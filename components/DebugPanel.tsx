import React, { useState, useEffect, useRef } from 'react';
import { logger, LogEntry } from '../utils/logger';

const DebugPanel: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [logs, setLogs] = useState<LogEntry[]>([]);
    const [filter, setFilter] = useState<string>('all');
    const logsEndRef = useRef<HTMLDivElement>(null);
    
    useEffect(() => {
        // Subscribe to logger updates
        const unsubscribe = logger.subscribe((log) => {
            setLogs(prev => [...prev, log]);
        });
        
        // Load existing logs
        setLogs(logger.getLogs());
        
        return unsubscribe;
    }, []);
    
    useEffect(() => {
        // Auto-scroll to bottom
        logsEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [logs]);
    
    const filteredLogs = filter === 'all' 
        ? logs 
        : logs.filter(log => log.level === filter);
    
    const getLevelColor = (level: string) => {
        switch (level) {
            case 'error': return 'text-red-600 bg-red-50';
            case 'warn': return 'text-yellow-600 bg-yellow-50';
            case 'success': return 'text-green-600 bg-green-50';
            case 'debug': return 'text-purple-600 bg-purple-50';
            default: return 'text-blue-600 bg-blue-50';
        }
    };
    
    const getLevelIcon = (level: string) => {
        switch (level) {
            case 'error': return '❌';
            case 'warn': return '⚠️';
            case 'success': return '✅';
            case 'debug': return '🔍';
            default: return 'ℹ️';
        }
    };
    
    return (
        <>
            {/* Floating Debug Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="fixed bottom-4 right-4 z-50 bg-purple-600 text-white p-3 rounded-full shadow-lg hover:bg-purple-700 transition-all"
                title="Toggle Debug Panel"
            >
                {isOpen ? '✖️' : '🐛'} Debug ({logs.length})
            </button>
            
            {/* Debug Panel */}
            {isOpen && (
                <div className="fixed bottom-20 right-4 w-96 h-96 bg-white dark:bg-gray-900 border-2 border-purple-600 rounded-lg shadow-2xl z-50 flex flex-col">
                    {/* Header */}
                    <div className="bg-purple-600 text-white p-3 rounded-t-lg flex justify-between items-center">
                        <h3 className="font-bold">🐛 Debug Console</h3>
                        <div className="flex gap-2">
                            <button
                                onClick={() => logger.clear()}
                                className="text-xs bg-purple-700 px-2 py-1 rounded hover:bg-purple-800"
                            >
                                Clear
                            </button>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="text-xs bg-purple-700 px-2 py-1 rounded hover:bg-purple-800"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                    
                    {/* Filter Buttons */}
                    <div className="flex gap-1 p-2 bg-gray-100 dark:bg-gray-800 border-b">
                        {['all', 'info', 'success', 'warn', 'error', 'debug'].map(f => (
                            <button
                                key={f}
                                onClick={() => setFilter(f)}
                                className={`text-xs px-2 py-1 rounded ${
                                    filter === f 
                                        ? 'bg-purple-600 text-white' 
                                        : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                                }`}
                            >
                                {f}
                            </button>
                        ))}
                    </div>
                    
                    {/* Logs Container */}
                    <div className="flex-1 overflow-y-auto p-2 text-xs font-mono">
                        {filteredLogs.length === 0 ? (
                            <div className="text-gray-500 text-center mt-4">No logs yet...</div>
                        ) : (
                            filteredLogs.map((log, idx) => (
                                <div
                                    key={idx}
                                    className={`mb-1 p-2 rounded ${getLevelColor(log.level)}`}
                                >
                                    <div className="flex items-start gap-2">
                                        <span>{getLevelIcon(log.level)}</span>
                                        <div className="flex-1">
                                            <div className="text-gray-500 text-xs">
                                                {new Date(log.timestamp).toLocaleTimeString()}
                                            </div>
                                            <div className="font-semibold">{log.message}</div>
                                            {log.data && (
                                                <pre className="text-xs mt-1 overflow-x-auto">
                                                    {typeof log.data === 'object' 
                                                        ? JSON.stringify(log.data, null, 2) 
                                                        : String(log.data)}
                                                </pre>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                        <div ref={logsEndRef} />
                    </div>
                </div>
            )}
        </>
    );
};

export default DebugPanel;
