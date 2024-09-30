import 'styled-components';

declare module 'styled-components' {
    export interface DefaultTheme {
        colors: {
            yellow: string;
            white: string;
            black: string;
            gray: string;
        };
    }
}
