# 2D Shooter
Aka crimesonland

https://ambrozy.github.io/2d_shooter/

### Repositories in monorepo

`@ambrozy/game`:
Game instance with 2 entry points:
- `index.js` - for browser to serve the game
- `export.js` - for library without any renderings

`@ambrozy/train`:
Training the model with visualization of results

`@ambrozy/ai-agent`:
Soon be implemented...

### Deploy steps
- `yarn build`
- `git commit 'rebuild game'`
- `yarn deploy`
