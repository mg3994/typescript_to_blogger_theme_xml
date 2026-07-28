import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

/**
 * Escapes XML reserved characters, filters XML 1.0 restricted control characters (C0 and C1),
 * and converts non-ASCII Unicode characters into safe XML hexadecimal Numeric Character References (NCRs).
 */
export function escapeXml(text: string): string {
  const regex = /[&<>"']|[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x9F]|[^\x09\x0A\x0D\x20-\x7E]/gu;
  return text.replace(regex, (char) => {
    switch (char) {
      case '&': return '&amp;';
      case '<': return '&lt;';
      case '>': return '&gt;';
      case '"': return '&quot;';
      case "'": return '&apos;';
      default: {
        const code = char.codePointAt(0);
        if (code === undefined) return ' ';
        if (
          (code >= 0x00 && code <= 0x08) ||
          code === 0x0B ||
          code === 0x0C ||
          (code >= 0x0E && code <= 0x1F) ||
          (code >= 0x7F && code <= 0x9F)
        ) {
          return ' ';
        }
        return '&#x' + code.toString(16).toUpperCase() + ';';
      }
    }
  });
}

/**
 * Recursively escapes all text contents in the HTML string, while preserving HTML/XML tags, attributes, and CDATA blocks.
 */
export function escapeTextNodes(html: string): string {
  const parts = html.split(/(<!\[CDATA\[[\s\S]*?\]\]>|<[^>]+?>)/g);
  for (let i = 0; i < parts.length; i++) {
    if (!parts[i].startsWith('<') && !parts[i].startsWith('<![CDATA[')) {
      parts[i] = escapeXml(parts[i]);
    }
  }
  return parts.join('');
}

/**
 * Translates React camelCase attribute names (like noValidate, readOnly, maxLength) to their standard lowercase XHTML names,
 * and handles any case sensitive Blogger mappings.
 */
export function translateCamelCaseAttributes(xml: string): string {
  const mappings: Record<string, string> = {
    noValidate: 'novalidate',
    readOnly: 'readonly',
    maxLength: 'maxlength',
    minLength: 'minlength',
    tabIndex: 'tabindex',
    autoFocus: 'autofocus',
    autoPlay: 'autoplay',
    srcSet: 'srcset',
    crossOrigin: 'crossorigin',
    playsInline: 'playsinline',
    colSpan: 'colspan',
    rowSpan: 'rowspan',
    cellPadding: 'cellpadding',
    cellSpacing: 'cellspacing',
    srcDoc: 'srcdoc',
    referrerPolicy: 'referrerpolicy',
    pagetype: 'pageType', // translate pagetype to camelCase pageType exactly
  };

  let result = xml;
  for (const [camel, lowercase] of Object.entries(mappings)) {
    const pattern = new RegExp(`\\s${camel}=`, 'g');
    result = result.replace(pattern, ` ${lowercase}=`);
  }
  return result;
}

/**
 * Collapses empty elements (such as <b:widget ...></b:widget> or <data:...></data:...>) into clean, self-closing XML tags.
 */
export function collapseSelfClosingTags(xml: string): string {
  // Standard list of tags that are typically self-closing or empty in Blogger templates
  const selfClosingPattern = /<((?:b:|data:)[a-zA-Z0-9:\.\-_]+)([^>]*)><\/\1>/g;
  let collapsed = xml.replace(selfClosingPattern, '<$1$2/>');

  // Clean up any double spaces inside collapsed self-closing tags
  collapsed = collapsed.replace(/\s{2,}\/>/g, ' />');
  return collapsed;
}

/**
 * Minifies the rendered XML document by collapsing extraneous spaces and tabs,
 * while safely preserving CDATA blocks intact.
 */
export function minifyXml(xml: string): string {
  const parts = xml.split(/(<!\[CDATA\[[\s\S]*?\]\]>)/g);
  for (let i = 0; i < parts.length; i++) {
    if (!parts[i].startsWith('<![CDATA[')) {
      parts[i] = parts[i]
        .replace(/>\s+</g, '><')
        .replace(/\s{2,}/g, ' ')
        .trim();
    }
  }
  return parts.join('');
}

/**
 * Core rendering pipeline that converts a React element tree into a Blogger-compatible XML document.
 */
export function renderToBloggerTheme(element: React.ReactElement, options?: { minify?: boolean }): string {
  // 1. Render standard React element tree to HTML/XHTML static markup
  let renderedMarkup = renderToStaticMarkup(element);

  // 2. Translate any react camelCase attributes back to standard lowercase XHTML/XML attributes
  renderedMarkup = translateCamelCaseAttributes(renderedMarkup);

  // 3. Escape plain text nodes (converting non-ASCII Unicode to NCRs, escaping XML entities)
  renderedMarkup = escapeTextNodes(renderedMarkup);

  // 4. Collapse empty Blogger-specific tags into neat self-closing XML formats
  renderedMarkup = collapseSelfClosingTags(renderedMarkup);

  // 5. Prepend XML declaration
  let finalXml = '<?xml version="1.0" encoding="UTF-8" ?>\n' + renderedMarkup;

  // 6. Optionally minify XML output
  if (options?.minify) {
    finalXml = minifyXml(finalXml);
  }

  return finalXml;
}
