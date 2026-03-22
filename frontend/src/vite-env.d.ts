/// <reference types="vite/client" />

// Declare module types for image imports (lowercase)
declare module '*.jpg' {
    const src: string;
    export default src;
}

declare module '*.jpeg' {
    const src: string;
    export default src;
}

declare module '*.png' {
    const src: string;
    export default src;
}

declare module '*.webp' {
    const src: string;
    export default src;
}

declare module '*.svg' {
    const src: string;
    export default src;
}

// Declare module types for image imports (uppercase)
declare module '*.JPG' {
    const src: string;
    export default src;
}

declare module '*.JPEG' {
    const src: string;
    export default src;
}

declare module '*.PNG' {
    const src: string;
    export default src;
}
