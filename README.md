# File Utilities Library

A lightweight TypeScript library for handling file operations in the browser.

## File and Blob Types in JavaScript/TypeScript

The File and Blob types are core JavaScript APIs for handling binary data, especially useful for file operations in web applications.

### Blob

A Blob (Binary Large Object) represents immutable raw binary data. It's like a file-like object of raw data that can be read as text or binary data.

```ts
// Creating a Blob
const textBlob = new Blob(["Hello World"], { type: "text/plain" });
const jsonBlob = new Blob([JSON.stringify({ name: "John" })], { type: "application/json" });

// Getting size and type
console.log(textBlob.size); // Size in bytes
console.log(textBlob.type); // MIME type: "text/plain"

// Creating a URL from a Blob (useful for downloads)
const blobUrl = URL.createObjectURL(textBlob);
// When done: URL.revokeObjectURL(blobUrl);
```

### File

File extends Blob and represents an actual file from the user's filesystem. It adds properties like name, lastModified, and webkitRelativePath.

```ts
// Typically obtained from file input or drag & drop
const fileInput = document.querySelector<HTMLInputElement>('input[type="file"]');
fileInput?.addEventListener("change", (event) => {
  const files = fileInput.files;
  if (files && files.length > 0) {
    const file = files[0];
    console.log(file.name); // Filename with extension
    console.log(file.size); // Size in bytes
    console.log(file.type); // MIME type
    console.log(file.lastModified); // Timestamp
  }
});
```

## Installation

```bash
npm install @ngockhoi96/file-utils
# or
yarn add @ngockhoi96/file-utils
# or
pnpm add @ngockhoi96/file-utils
# or
bun add @ngockhoi96/file-utils
```

## Usage

```typescript
import { downloadRemoteFile, isValidUrl } from "@ngockhoi96/file-utils";

// Download a file from a URL
downloadRemoteFile("https://example.com/document.pdf", "my-document.pdf")
  .then(() => console.log("Download initiated"))
  .catch((err) => console.error("Download failed", err));

// Force download (fetches file content first)
downloadRemoteFile("https://example.com/document.pdf", "my-document.pdf", true)
  .then(() => console.log("Download initiated"))
  .catch((err) => console.error("Download failed", err));
```

## API Documentation

### downloadFile(fileURL, fileName, forceDownload?, signal?)

Downloads a file from a URL.

- `fileURL`: The URL of the file to download
- `fileName`: Name to save the file as
- `forceDownload`: (Optional) If true, fetches file content before downloading
- `signal`: (Optional) AbortSignal to cancel the fetch request

### isValidURL(url)

Validates if a string is a valid URL.

- `url`: String to validate
- Returns: Boolean indicating if URL is valid

## Contributing

Contributions are welcome! Here's how you can contribute to this project:

### Setting Up Development Environment

1. Fork the repository
2. Clone your fork:

   ```bash
   git clone https://github.com/your-username/file-utils.git
   cd file-utils
   ```

3. Install dependencies:

   ```bash
   pnpm install
   ```

4. Create a new branch:

   ```bash
   git checkout -b feature/your-feature-name
   ```

### Development Workflow

- **Development**: Run tests and build in watch mode

  ```bash
  pnpm dev
  ```

- **Build**: Compile the TypeScript code

  ```bash
  pnpm build
  ```

- **Test**: Run the test suite

  ```bash
  pnpm test
  ```

- **Linting**: Run Biome linter

  ```bash
  pnpm lint
  ```

- **Formatting**: Format code with Biome

  ```bash
  pnpm format
  ```

### Commit Guidelines

This project uses [Conventional Commits](https://www.conventionalcommits.org/) for semantic versioning. Please use the following commit types:

- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code changes that neither fix bugs nor add features
- `perf`: Performance improvements
- `test`: Adding or updating tests
- `chore`: Changes to the build process or auxiliary tools.

To make a commit, run:

```bash
pnpm commit
```

### Pull Request Process

1. Update the README.md with details of changes if applicable
2. Update the API documentation if you've added or modified functionality
3. Add or update tests for any new features
4. Ensure all tests pass before submitting your PR
5. The PR should target the `main` branch

### Branch Naming Convention

- Feature branches: `feat/short-description`
- Bug fixes: `fix/short-description`
- Documentation: `docs/short-description`

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
