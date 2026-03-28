/**
 * Simple markdown to HTML converter for article content
 */
export function markdownToHtml(markdown: string): string {
  let html = markdown

  // Convert headers with anchors
  html = html.replace(/^## (.+?) \{#(.+?)\}$/gm, '<h2 id="$2">$1</h2>')
  html = html.replace(/^### (.+)$/gm, '<h3>$1</h3>')
  html = html.replace(/^## (.+)$/gm, '<h2>$1</h2>')

  // Convert horizontal rules
  html = html.replace(/^---$/gm, '<hr class="my-8 border-border" />')

  // Convert bold text
  html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')

  // Convert italic text
  html = html.replace(/\*(.+?)\*/g, '<em>$1</em>')

  // Convert inline code
  html = html.replace(/`([^`]+)`/g, '<code class="bg-muted px-1.5 py-0.5 rounded text-sm">$1</code>')

  // Convert blockquotes
  html = html.replace(/^> (.+)$/gm, '<blockquote class="border-l-4 border-[#40E0D0] pl-4 italic text-muted-foreground my-4">$1</blockquote>')

  // Convert tables
  html = convertTables(html)

  // Convert lists
  html = convertLists(html)

  // Convert paragraphs (must be after other conversions)
  html = convertParagraphs(html)

  return html
}

function convertTables(html: string): string {
  // Find table blocks
  const tableRegex = /\|(.+)\|\n\|[-|\s]+\|\n((?:\|.+\|\n?)+)/g
  
  return html.replace(tableRegex, (match, headerRow, bodyRows) => {
    const headers = headerRow.split('|').filter((h: string) => h.trim())
    const rows = bodyRows.trim().split('\n').filter((r: string) => r.trim())
    
    let table = '<div class="overflow-x-auto my-6"><table class="w-full border-collapse border border-border rounded-lg">'
    
    // Header
    table += '<thead class="bg-muted"><tr>'
    headers.forEach((h: string) => {
      table += `<th class="border border-border px-4 py-2 text-left font-semibold">${h.trim()}</th>`
    })
    table += '</tr></thead>'
    
    // Body
    table += '<tbody>'
    rows.forEach((row: string) => {
      const cells = row.split('|').filter((c: string) => c.trim())
      table += '<tr class="border-b border-border">'
      cells.forEach((cell: string) => {
        // Check if it's a checkmark or cross
        const cellContent = cell.trim()
        if (cellContent === '✅') {
          table += '<td class="border border-border px-4 py-2 text-green-600">✓</td>'
        } else if (cellContent === '❌') {
          table += '<td class="border border-border px-4 py-2 text-red-600">✗</td>'
        } else {
          table += `<td class="border border-border px-4 py-2">${cellContent}</td>`
        }
      })
      table += '</tr>'
    })
    table += '</tbody></table></div>'
    
    return table
  })
}

function convertLists(html: string): string {
  // Convert unordered lists
  const ulRegex = /^[-•] (.+)$/gm
  let inList = false
  let result = ''
  const lines = html.split('\n')
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    const listMatch = line.match(/^[-•] (.+)$/)
    
    if (listMatch) {
      if (!inList) {
        result += '<ul class="list-disc list-inside my-4 space-y-1 text-muted-foreground">\n'
        inList = true
      }
      result += `<li>${listMatch[1]}</li>\n`
    } else {
      if (inList) {
        result += '</ul>\n'
        inList = false
      }
      result += line + '\n'
    }
  }
  
  if (inList) {
    result += '</ul>\n'
  }
  
  // Convert numbered lists
  const olRegex = /^\d+\. (.+)$/gm
  inList = false
  const lines2 = result.split('\n')
  result = ''
  
  for (let i = 0; i < lines2.length; i++) {
    const line = lines2[i]
    const listMatch = line.match(/^\d+\. (.+)$/)
    
    if (listMatch) {
      if (!inList) {
        result += '<ol class="list-decimal list-inside my-4 space-y-1 text-muted-foreground">\n'
        inList = true
      }
      result += `<li>${listMatch[1]}</li>\n`
    } else {
      if (inList) {
        result += '</ol>\n'
        inList = false
      }
      result += line + '\n'
    }
  }
  
  if (inList) {
    result += '</ol>\n'
  }
  
  return result
}

function convertParagraphs(html: string): string {
  const lines = html.split('\n')
  let result = ''
  let inParagraph = false
  let paragraphContent = ''
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim()
    
    // Skip if it's a block element
    const isBlockElement = 
      line.startsWith('<h2') ||
      line.startsWith('<h3') ||
      line.startsWith('<hr') ||
      line.startsWith('<ul') ||
      line.startsWith('<ol') ||
      line.startsWith('<li') ||
      line.startsWith('</ul') ||
      line.startsWith('</ol') ||
      line.startsWith('<blockquote') ||
      line.startsWith('<div') ||
      line.startsWith('</div') ||
      line.startsWith('<table') ||
      line.startsWith('</table')
    
    if (isBlockElement) {
      if (inParagraph) {
        result += `<p class="my-4 text-muted-foreground leading-relaxed">${paragraphContent}</p>\n`
        inParagraph = false
        paragraphContent = ''
      }
      result += line + '\n'
    } else if (line === '') {
      if (inParagraph && paragraphContent.trim()) {
        result += `<p class="my-4 text-muted-foreground leading-relaxed">${paragraphContent}</p>\n`
        inParagraph = false
        paragraphContent = ''
      }
    } else {
      if (!inParagraph) {
        inParagraph = true
        paragraphContent = line
      } else {
        paragraphContent += ' ' + line
      }
    }
  }
  
  // Close any remaining paragraph
  if (inParagraph && paragraphContent.trim()) {
    result += `<p class="my-4 text-muted-foreground leading-relaxed">${paragraphContent}</p>\n`
  }
  
  return result
}
