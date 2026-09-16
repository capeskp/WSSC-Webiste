module.exports = function (eleventyConfig) {
  // Copy images, CSS, and the CMS admin panel straight through to the output
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy("admin");
  eleventyConfig.addPassthroughCopy("src/_redirects");

  // Turns a plain-text field with blank lines into <p> paragraphs
  eleventyConfig.addFilter("paragraphs", function (text) {
    if (!text) return "";
    return text
      .split(/\n\s*\n/)
      .map((p) => `<p>${p.trim()}</p>`)
      .join("\n");
  });

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data",
    },
    templateFormats: ["njk", "md"],
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
  };
};
