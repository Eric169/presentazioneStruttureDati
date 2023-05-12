let qt;
let count = 0;

function setup() 
{
	createCanvas(500, 500);
	background(0)
	const capacity = 4;
	let boundary = new Rectangle(width/2,height/2,width/2,height/2);
	qt = new QuadTree(boundary,capacity);
	
	
	for(let i = 0; i<1000; i++){
		//faccio i punti abbastanza centrali
		let x = randomGaussian(width/2, width/8);
		let y = randomGaussian(height/2, height/8);
		let p = new Point(x,y);
		qt.insert(p);
	}

	//per far vedere che trova i punti nel rettangolo senza doverli guardare tutti
	/*
	background(0);
	qt.show();

	stroke(0,255,0);
	rectMode(CENTER);
	//voglio sapere quali punti sono all'interno del rettangolo
	//il quadtree non ha bisogno di guardarli tutti e mi darà il risultato in log(n)
	let range = new Rectangle(random(width),random(height),100,100);
	rect(range.x, range.y, range.w*2, range.h*2);
	let points = qt.query(range);
	for(let p of points){
		strokeWeight(4);
		point(p.x, p.y);
	}
	console.log(count);*/
}

function draw()
{
	/*
	//prima faccio vedere come si forma il quadtree
	if(mouseIsPressed){
		let m = new Point(mouseX, mouseY);
		qt.insert(m);
	}
	
	background(0)
	qt.show();*/

	
	//disegno rettangoli dinamicamente muovendo il mouse
	background(0);
	qt.show();
	count = 0;
	stroke(0,255,0);
	rectMode(CENTER);
	//voglio sapere quali punti sono all'interno del rettangolo
	//il quadtree non ha bisogno di guardarli tutti e mi darà il risultato in log(n)
	let range = new Rectangle(mouseX,mouseY,25,25);
	rect(range.x, range.y, range.w*2, range.h*2);
	let points = [];
	qt.query(range, points);
	for(let p of points){
		strokeWeight(4);
		point(p.x, p.y);
	}
	console.log(count);
}