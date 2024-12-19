import toMarkdown from "@sanity/block-content-to-markdown";

const customSerializers = {
    types: {
      customAccordion: (props) => {
        // Log the props to see the structure
        console.log("Accordion props:", props);
  
        // Ensure 'title' exists in the props
        const title = props.node.title || 'No Title Provided';
  
        // Extract content from the children blocks
        let content = 'No content available';
        if (props.node && props.node.content && props.node.content.length > 0) {
          content = props.node.content.map((block) => {
            // Loop through each block and extract text from its children
            if (block.children && block.children.length > 0) {
              return block.children.map(child => child.text).join(' ');
            }
            return '';
          }).join(' ');
        }
  
        console.log("Accordion content:", content);  // Debugging step
  
        // Render the custom Accordion structure
        return `
          <Accordion question="${title}">
            ${content}
          </Accordion>
        `;
      },
    },
  };

  console.log("Portable Data : ", blogData.body);
  const markdown = toMarkdown(blogData.body, {
    dataset: "production",
    projectId: "YOURSANITYPROJECT_ID",
    serializers: customSerializers, // Add custom serializers
  });
  console.log("simple Markdown File Format:",markdown);

  function cleanAndFormatMarkdown(markdown) {
    const lines = markdown.split("\n");

    const cleanedLines = [];
    let previousLine = "";

    lines.forEach((line) => {
      const trimmedLine = line.trim();

      if (/^#+\s*$/.test(trimmedLine)) {
        return;
      }

      if (trimmedLine === "" && previousLine === "") {
        return;
      }

      if (
        trimmedLine !== "" &&
        previousLine !== "" &&
        !/^#+\s/.test(previousLine)
      ) {
        cleanedLines.push("");
      }

      cleanedLines.push(trimmedLine);

      previousLine = trimmedLine;
    });

    return cleanedLines.join("\n").trim();
  }

  console.log("Cleaned and Formated Markdown file",cleanAndFormatMarkdown(markdown));