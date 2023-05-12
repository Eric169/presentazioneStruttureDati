class QuadTree{
    constructor(boundary, capacity){
        //confine che vede il quadtree
        this.boundary = boundary;

        //dopo quanti punti inizio a dividere
        this.capacity = capacity;
        this.points = [];
        this.divided = false;
    }
    insert(point){
        //se il punto non è all'interno esco
        if(!this.boundary.contains(point)) return false;

        if(this.points.length < this.capacity){
            this.points.push(point);
            return true;
        }
        else{
            //se non mi sono diviso mi divido
            if(!this.divided){
                this.subdivide();
            }
            //non voglio che un punto sul bordo sia inserito in più tree
            if(this.northeast.insert(point)) return true;
            else if(this.northwest.insert(point)) return true;
            else if(this.southeast.insert(point)) return true;
            else if(this.southwest.insert(point)) return true;
        }
        return false;
    }
    //prende il rettangolo e lo divide in 4 rettangoli più piccoli
    //(nw,ne,sw,se)
    subdivide(){
        let x = this.boundary.x;
        let y = this.boundary.y;
        let h = this.boundary.h;
        let w = this.boundary.w;

        let ne = new Rectangle(x + w/2, y - h/2, w/2, h/2);
        this.northeast = new QuadTree(ne,this.capacity);
        let nw = new Rectangle(x - w/2, y - h/2, w/2, h/2);
        this.northwest = new QuadTree(nw,this.capacity);
        let se = new Rectangle(x + w/2, y + h/2, w/2, h/2);
        this.southeast = new QuadTree(se,this.capacity);
        let sw = new Rectangle(x - w/2, y + h/2, w/2, h/2);
        this.southwest = new QuadTree(sw,this.capacity);
        this.divided = true;
    }
    show(){
        stroke(255);
        strokeWeight(1);
        noFill();
        rectMode(CENTER);
        rect(this.boundary.x, this.boundary.y, this.boundary.w*2, this.boundary.h*2);
        if(this.divided){
            this.northeast.show();
            this.northwest.show();
            this.southeast.show();
            this.southwest.show();
        }
        for(let p of this.points){
            strokeWeight(2);
            point(p.x,p.y);
        }
    }

    //mi ritorna i punti trovati all'interno del rettangolo
    query(range, found){
        //se non mi passa l'array lo creo
        if(!found) found = [];
        //se non sono nel range esco
        if(!this.boundary.intersects(range)) return found;
        //aggiungo i miei punti
        for(let p of this.points){
            //controllo se non guarda veramente tutti i punti
            count++;
            if(range.contains(p)){
                found.push(p);
            }
        }
        //aggiungo anche i punti dei figli
        if(this.divided){
            this.northwest.query(range, found);
            this.northeast.query(range, found);
            this.southwest.query(range, found);
            this.southeast.query(range, found);
        }
        return found;
    }
}