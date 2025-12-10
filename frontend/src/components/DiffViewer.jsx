import "../styles/diff.css";

export default function DiffViewer({ html }) {
  const cleanedHtml = html.replace(/<td class="text">.*?<\/td>/g, "");

  return (
    <div className="diff-viewer"
         dangerouslySetInnerHTML={{ __html: cleanedHtml }} />
  );
}
