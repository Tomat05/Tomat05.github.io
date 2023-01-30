class ObjectSpawner {
	constructor(images) {
		this.timeToNextSpawn = 1000;
		this.timeBetweenSpawns = 2500;

		this.maxObjectsInScene = 6;
		this.fallingObjectsPool = [];
		this.activeObjects = [];

		this.images = images;
	}

	setup() {
		for (let i = 0; i < this.maxObjectsInScene; i++) {
			this.fallingObjectsPool.push(new FallingObject());
		}
	}

	spawn() {
		let obj = this.fallingObjectsPool.shift();
		let goodOrBad = 0
		if (Math.round(Math.random()) === 0) {
			goodOrBad = Math.round(Math.random());
		}
		obj.setActive(goodOrBad, this.images[goodOrBad]);
		this.activeObjects.push(obj);
	}

	despawn() {
		let obj = this.activeObjects.shift();
		obj.reset();
		this.fallingObjectsPool.push(obj);
		console.log(this.fallingObjectsPool.length);
	}

	updateActiveObjects() {
		for (let i = 0; i < this.activeObjects.length; i++) {
			if (this.activeObjects[i].update()) {
				this.despawn();
			}
		}
	}

	onFrameUpdate() {
		this.updateActiveObjects();

		this.timeToNextSpawn -= deltaTime;
		if (this.timeToNextSpawn <= 0 && this.activeObjects.length < this.maxObjectsInScene) {
			this.spawn();
			this.timeToNextSpawn = this.timeBetweenSpawns;
			if (this.timeBetweenSpawns <= 400) {
				this.timeBetweenSpawns = 400;
				return;
			}
			this.timeBetweenSpawns *= 0.99 / difficulty;
		}
	}
}