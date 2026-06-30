import { MarkdownAsync } from "react-markdown";
import rehypePrettyCode from "rehype-pretty-code";
import remarkGfm from "remark-gfm";

type MarkdownRendererProps = {
  content: string;
};

export async function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    <div className="lesson-markdown">
      <MarkdownAsync
        rehypePlugins={[
          [
            rehypePrettyCode,
            {
              theme: "github-dark",
            },
          ],
        ]}
        remarkPlugins={[remarkGfm]}
        components={{
          a: ({ children, ...props }) => (
            <a className="font-medium underline underline-offset-4" {...props}>
              {children}
            </a>
          ),
        }}
      >
        {content}
      </MarkdownAsync>
    </div>
  );
}
