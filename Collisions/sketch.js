let particles = [];

function setup(){
	createCanvas(700, 700);
	for(let i = 0; i<100; i++){
		particles[i] = new Particle(random(width), random(height));
	}
}

function HighLightSlow(qt){
	//versione O(N^2) lenta
	for(let p of particles){
		for(let other of particles){
			if(p !== other && p.intersects(other)){
				p.setHighLight(true);
			}
		}
	}
}

function HighLightFast(qt){
	for(let p of particles){
		//controllo solo un cerchio grande il doppio del raggio di una particle
		let range = new Circle(p.x, p.y, p.r*2);
		//non guardo in tutte le altre
		let points = qt.query(range);
		for(let point of points){
			let other = point.userData;
			if(p!==other && p.intersects(other)){
				p.setHighLight(true);
			}
		}
	}
}

function draw(){
	background(0);

	//a ogni frame ricreo il quadTree, si potrebbe fare meglio ma costa O(N) quindi ok
	let boundary = new Rectangle(width/2, height/2, width, height);
	let qt = new QuadTree(boundary, 4); 

	for(let p of particles){
		//creo il punto con la reference a particle[i]
		let point = new Point(p.x, p.y, p);
		qt.insert(point);

		p.move();
		p.render();
		p.setHighLight(false);
	}
	HighLightSlow(qt);
	//HighLightFast(qt);

}