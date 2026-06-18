/// <mls fileReference="_102055_/l2/molecules/groupselectfileforupload/ml-file-upload-dropzone-glass.defs.ts" enhancement="_blank" />

// Do not change – automatically generated code.

export const group = 'groupSelectFileForUpload';
export const skill = `# Metadata
- TagName: groupselectfileforupload--ml-file-upload-dropzone-glass

# Objective
A drag-and-drop file selection zone in the Glassmorphism model. Same contract/logic as groupselectfileforupload--ml-file-upload-dropzone (mls-102040): it inherits that component and overrides only the appearance (translucent dashed dropzone + frosted file cards).

# Responsibilities
- Open the native file picker on click/Enter/Space; accept files via drag-and-drop with a dragging highlight.
- Validate files against accept, max-size-kb and max-files; dispatch 'reject' with the rejected files and reason.
- Update value with valid files (replace in single mode, append in multiple mode) and allow removing files.
- Render label, helper or error, loading state and the selected-file list.

# Constraints
- No interaction while disabled or loading.
- The component must not contain business logic; slot content is rendered via unsafeHTML and not sanitized here.

# Notes
- Visual model: glassmorphism (mls-102055). Implemented by inheritance from mls-102040 (override of render() only; drag-and-drop, validation by type/size/count, file processing and events are inherited). Appearance lives in the .less scoped to the -glass tag. Assumes a rich/dark background (container contract).`;
