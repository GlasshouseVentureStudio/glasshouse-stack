const comments = require('@eslint-community/eslint-plugin-eslint-comments/configs');
const commentsRules = require('./rules/comments');

/** @type {import('eslint').Linter.Config[]} */
module.exports = [comments.recommended, commentsRules];
