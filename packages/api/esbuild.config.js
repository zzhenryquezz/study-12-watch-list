export function createConfig() {
    return {
        entryPoints: ['src/*.ts'],    
        outdir: 'dist',
        bundle: false,
        format: 'esm',
        platform: 'node',
        target: 'node20',
        plugins: []
    }
}