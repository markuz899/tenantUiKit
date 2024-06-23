# TenantUiKit

React graphics component library

## Installation

Install TenantUiKit with npm or yarn

```bash
  npm install https://github.com/markuz899/tenantUiKit
```

for local test

```bash
  npm install ../library/tenantUiKit
```

## Testing and deploy

Before pushing the changes create the build version

```bash
  npm run build
```

for local test

```bash
  npm run build-watch
```

## How to create a component

- Move inside /lib/components folder
- Create a new folder with the component name
- Create file "index.tsx"
- Create file "interface.ts"
- Insert new export inside /lib/components/index.ts
- Insert new export inside /lib/index.ts
- Template of components

```javascript
import { ButtonProps } from "./interface";

const Button = ({ children, label }: ButtonProps) => {
  const content = children || label;
  return <button>{content}</button>;
};

export default Button;

```

## Usage/Examples

```javascript
import Button from "tenantuikit";

function App() {
  return <Button />;
}
```

## Tech Stack

**Client:** React, TailwindCSS, Styled Components
