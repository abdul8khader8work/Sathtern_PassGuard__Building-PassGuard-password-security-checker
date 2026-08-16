export async function copyToClipboard(text: string): Promise<boolean> {
  // Try modern API first (only works in secure contexts like HTTPS or localhost)
  if (navigator.clipboard && window.isSecureContext) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (err) {
      console.warn('Clipboard API failed, falling back to execCommand.', err);
    }
  }

  // Bulletproof Fallback for HTTP / Non-secure contexts (LAN IP)
  try {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    
    // Hide the textarea
    textArea.style.top = "0";
    textArea.style.left = "0";
    textArea.style.position = "fixed";
    textArea.style.opacity = "0";
    
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    const successful = document.execCommand('copy');
    document.body.removeChild(textArea);
    return successful;
  } catch (err) {
    console.error('Fallback copy failed', err);
    return false;
  }
}