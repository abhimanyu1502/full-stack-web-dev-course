/**
 * AI Pedagogical Service Layer
 */

const { getPedagogicalFallback } = require('../../server/ai-proxy');

class AIService {
    static async getHint(code, context) {
        return getPedagogicalFallback(code, context);
    }
}

module.exports = { AIService };
