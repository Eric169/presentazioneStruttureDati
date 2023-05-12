class Particle{
    constructor(x, y){
        this.x = x;
        this.y = y;
        this.r = 4;
        this.highlight = false;
    }

    move(){
        this.x += random(-1,1);
        this.y += random(-1,1);
    }

    setHighLight(value){
        this.highlight = value;
    }

    render(){
        noStroke();
        if(this.highlight)
            fill(255);
        else
            fill(100);
        ellipse(this.x, this.y, this.r*2);
    }
    intersects(other){
        let d = dist(this.x, this.y, other.x, other.y);
        return (d < this.r + other.r);
    }
}