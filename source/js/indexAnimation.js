// Создаем приложение Pixi.js
const app = new PIXI.Application({ width: 800, height: 600, backgroundColor: 0x1099bb });
document.body.appendChild(app.view);

// Создаем спрайт (например, кролика)
const bunny = PIXI.Sprite.from('https://pixijs.com/assets/bunny.png');
bunny.anchor.set(0.5);
bunny.x = app.screen.width / 2;
bunny.y = app.screen.height / 2;

// Добавляем спрайт на сцену
app.stage.addChild(bunny);

// Анимация: вращение кролика
app.ticker.add(() => {
    bunny.rotation += 0.01;
});
