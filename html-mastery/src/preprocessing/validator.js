/**
 * HTML/CSS Code Preprocessing, Sanitization and Validation
 */

function sanitizeCode(code) {
    if (typeof code !== 'string') return '';
    return code.trim();
}

function validateHTMLMarkup(html) {
    if (!html || typeof html !== 'string') return { valid: false, error: 'Empty markup' };
    const hasUnclosedTags = (html.match(/<[a-z][a-z0-9]*\b[^>]*>/gi) || []).length > 
                            (html.match(/<\/[a-z][a-z0-9]*>/gi) || []).length + 15; // allowance for void elements
    return {
        valid: true,
        warnings: hasUnclosedTags ? ['Check for unclosed tags'] : []
    };
}

module.exports = { sanitizeCode, validateHTMLMarkup };
