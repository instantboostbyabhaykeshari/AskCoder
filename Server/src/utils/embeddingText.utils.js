const normalizeText = (value) => String(value || '').replace(/\s+/g, ' ').trim();

const normalizeTags = (tags) => {
  if (Array.isArray(tags)) {
    return tags
      .map((tag) => {
        if (typeof tag === 'string') {
          return tag;
        }

        return tag && (tag.tagname || tag.name || tag.value);
      })
      .map(normalizeText)
      .filter(Boolean);
  }

  if (typeof tags === 'string') {
    return tags
      .split(',')
      .map(normalizeText)
      .filter(Boolean);
  }

  return [];
};

const getVerifiedAnswerSummary = (question = {}) => normalizeText(
  question.verifiedAnswerSummary
    || question.verified_answer_summary
    || question.acceptedAnswerSummary
    || question.accepted_answer_summary,
);

const validateEmbeddingInput = ({
  title,
  body,
  tags,
  verifiedAnswerSummary,
}) => {
  const missingFields = [];

  if (!normalizeText(title)) {
    missingFields.push('title');
  }

  if (!normalizeText(body)) {
    missingFields.push('body');
  }

  if (!normalizeTags(tags).length) {
    missingFields.push('tags');
  }

  if (!normalizeText(verifiedAnswerSummary)) {
    missingFields.push('verifiedAnswerSummary');
  }

  if (missingFields.length) {
    throw new Error(`Missing required embedding fields: ${missingFields.join(', ')}`);
  }
};

const buildQuestionEmbeddingText = (question = {}) => {
  const title = normalizeText(question.title);
  const body = normalizeText(question.body || question.post_body);
  const tags = normalizeTags(question.tags);
  const verifiedAnswerSummary = getVerifiedAnswerSummary(question);

  validateEmbeddingInput({
    title,
    body,
    tags,
    verifiedAnswerSummary,
  });

  return [
    `Title: ${title}`,
    `Body: ${body}`,
    `Verified Answer Summary: ${verifiedAnswerSummary}`,
    `Tags (secondary context): ${tags.join(', ')}`,
  ].join('\n\n');
};

module.exports = {
  buildQuestionEmbeddingText,
  normalizeTags,
  normalizeText,
};
