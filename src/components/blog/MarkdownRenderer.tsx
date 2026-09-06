import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface MarkdownRendererProps {
  content: string;
}

const extractText = (node: React.ReactNode): string => {
  if (node === null || node === undefined || typeof node === 'boolean') return '';
  if (typeof node === 'string' || typeof node === 'number') return String(node);
  if (Array.isArray(node)) return node.map(extractText).join('');
  if (typeof node === 'object' && 'props' in node) {
    return extractText((node as { props: { children?: React.ReactNode } }).props.children);
  }
  return '';
};

/** Stable anchor id so headings are deep-linkable from other posts. */
const slugify = (node: React.ReactNode): string =>
  extractText(node)
    .toLowerCase()
    .trim()
    .replace(/[^\p{L}\p{N}\s-]/gu, '')
    .replace(/\s+/g, '-');

const MarkdownRenderer = ({ content }: MarkdownRendererProps) => {
  return (
    <div className="prose prose-invert prose-lg max-w-none">
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        // The page already renders the post title as the single <h1>.
        // A markdown "# heading" must therefore start at <h2>, otherwise every
        // post ships two competing <h1> elements.
        h1: ({ children }) => (
          <h2
            id={slugify(children)}
            className="text-3xl md:text-4xl font-bold mt-10 mb-6 text-foreground"
          >
            {children}
          </h2>
        ),
        h2: ({ children }) => (
          <h2
            id={slugify(children)}
            className="text-2xl md:text-3xl font-bold mt-8 mb-4 text-foreground border-b border-border/50 pb-2"
          >
            {children}
          </h2>
        ),
        h3: ({ children }) => (
          <h3
            id={slugify(children)}
            className="text-xl md:text-2xl font-semibold mt-6 mb-3 text-foreground"
          >
            {children}
          </h3>
        ),
        h4: ({ children }) => (
          <h4
            id={slugify(children)}
            className="text-lg font-semibold mt-4 mb-2 text-foreground"
          >
            {children}
          </h4>
        ),
        p: ({ children }) => (
          <p className="text-muted-foreground leading-relaxed mb-4">
            {children}
          </p>
        ),
        ul: ({ children }) => (
          <ul className="list-disc list-inside space-y-2 mb-4 text-muted-foreground ml-4">
            {children}
          </ul>
        ),
        ol: ({ children }) => (
          <ol className="list-decimal list-inside space-y-2 mb-4 text-muted-foreground ml-4">
            {children}
          </ol>
        ),
        li: ({ children }) => (
          <li className="text-muted-foreground">
            {children}
          </li>
        ),
        blockquote: ({ children }) => (
          <blockquote className="border-l-4 border-primary pl-4 my-6 italic text-foreground/80 bg-primary/5 py-3 pr-4 rounded-r-lg">
            {children}
          </blockquote>
        ),
        a: ({ href, children }) => {
          // Only external links get target="_blank". Forcing it on internal
          // links breaks navigation flow and hurts internal link signals.
          const isExternal = /^(https?:)?\/\//i.test(href ?? '');

          return (
            <a
              href={href}
              {...(isExternal
                ? { target: '_blank', rel: 'noopener noreferrer' }
                : {})}
              className="text-primary hover:text-primary/80 underline underline-offset-4 transition-colors"
            >
              {children}
            </a>
          );
        },
        strong: ({ children }) => (
          <strong className="font-semibold text-foreground">{children}</strong>
        ),
        em: ({ children }) => (
          <em className="italic text-foreground/90">{children}</em>
        ),
        hr: () => <hr className="my-8 border-border/50" />,
        img: ({ src, alt }) => (
          <figure className="my-8">
            <img
              src={src}
              alt={alt}
              className="rounded-xl w-full"
              loading="lazy"
            />
            {alt && (
              <figcaption className="text-center text-sm text-muted-foreground mt-2">
                {alt}
              </figcaption>
            )}
          </figure>
        ),
        table: ({ children }) => (
          <div className="overflow-x-auto my-6">
            <table className="min-w-full border border-border rounded-lg overflow-hidden">
              {children}
            </table>
          </div>
        ),
        thead: ({ children }) => (
          <thead className="bg-secondary">{children}</thead>
        ),
        th: ({ children }) => (
          <th className="px-4 py-3 text-left text-sm font-semibold text-foreground border-b border-border">
            {children}
          </th>
        ),
        td: ({ children }) => (
          <td className="px-4 py-3 text-sm text-muted-foreground border-b border-border/50">
            {children}
          </td>
        ),
        code: ({ className, children, ...props }) => {
          const match = /language-(\w+)/.exec(className || '');
          const isInline = !match;
          
          if (isInline) {
            return (
              <code
                className="px-1.5 py-0.5 bg-secondary rounded text-primary text-sm font-mono"
                {...props}
              >
                {children}
              </code>
            );
          }

          return (
            <div className="my-6 rounded-xl overflow-hidden">
              <div className="bg-[#1e1e1e] px-4 py-2 text-xs text-muted-foreground border-b border-border/50 font-mono">
                {match[1]}
              </div>
              <SyntaxHighlighter
                style={oneDark}
                language={match[1]}
                PreTag="div"
                customStyle={{
                  margin: 0,
                  borderRadius: 0,
                  padding: '1rem',
                  fontSize: '0.875rem',
                }}
              >
                {String(children).replace(/\n$/, '')}
              </SyntaxHighlighter>
            </div>
          );
        },
        pre: ({ children }) => <>{children}</>,
      }}
    >
      {content}
    </ReactMarkdown>
    </div>
  );
};

export default MarkdownRenderer;
