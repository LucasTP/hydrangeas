export const basePath = `${process.cwd()}/src`;

export const getPageTemplate = (name: string) => {
  return `import React from 'react';

type ${name}PageProps = {
  // TODO: Add props
};

const ${name}Page: React.FC = (props: ${name}PageProps) => {
  // eslint-disable-next-line no-console
  console.log(props);

  return (
    <div>
      <h1>Hello ${name} Page</h1>
    </div>
  );
};

export default ${name}Page;
`;
};

export const toCamelCase = (str: string) => {
  return str
    .replace(/\s(.)/g, function ($1) {
      return $1.toUpperCase();
    })
    .replace(/\s/g, '')
    .replace(/^(.)/, function ($1) {
      return $1.toLowerCase();
    });
};

export const toPascalCase = (str: string) => {
  return str
    .toLowerCase()
    .replace(new RegExp(/[-_]+/, 'g'), ' ')
    .replace(new RegExp(/[^\w\s]/, 'g'), '')
    .replace(
      new RegExp(/\s+(.)(\w*)/, 'g'),
      ($1, $2, $3) => `${$2.toUpperCase() + $3}`,
    )
    .replace(new RegExp(/\w/), (s) => s.toUpperCase());
};
