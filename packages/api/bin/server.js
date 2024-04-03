import { context } from 'esbuild';
import { execa } from 'execa';
import { createConfig } from '../esbuild.config.js';

const config = createConfig()

let serverProcess

async function start(){
    console.log('Starting server...');

    if(serverProcess){
        serverProcess.kill('SIGTERM', {
            forceKillAfterTimeout: 1000
        });

        // await new Promise((resolve) => setTimeout(resolve, 1500));
    }

    serverProcess = execa('node', ['dist/main.js'], { stdio: 'inherit' })
}

config.plugins.push({
    name: 'rebuild-server',
    setup(build) {
        // build.onStart(() => start());
        
        build.onEnd(() => {
            start();
        });
    }
});

const ctx = await context(config);

await ctx.watch();


