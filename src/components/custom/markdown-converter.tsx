import ReactMarkdown from 'react-markdown';
import { MarkdownConverterProps } from '@/lib/types';

export default function MarkdownConverter({ children }: MarkdownConverterProps) {
    return (
        <ReactMarkdown
            components={{
                // Customize markdown components
                p: ({ children }) => <p className="mb-2 text-s last:mb-0">{children}</p>,
                code: ({ children }) => (
                    <code className="bg-muted-foreground/10 px-1 py-0.5 rounded text-xs font-mono">
                        {children}
                    </code>
                ),
                pre: ({ children }) => (
                    <pre className="bg-muted-foreground/10 p-2 rounded text-s font-mono overflow-x-auto">
                        {children}
                    </pre>
                ),
                ul: ({ children }) => <ul className="list-disc text-s list-inside mb-2">{children}</ul>,
                ol: ({ children }) => <ol className="list-decimal text-s list-inside mb-2">{children}</ol>,
                li: ({ children }) => <li className="mb-2 text-s">{children}</li>,
                strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
                em: ({ children }) => <em className="italic text-s">{children}</em>,
            }}
        >
            {children}
        </ReactMarkdown>
    )
}