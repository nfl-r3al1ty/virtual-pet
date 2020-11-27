class Food{
    constructor(){
        this.stock = 0;
        this.lastFed;
        this.image = loadImage("images/Milk.png");
    }

    updateStock(stock){
        this.stock = stock;
    }

    getFedTime(time){
        this.lastFed = time;
    }

    deductFood(){
        if(this.stock < 0){
            this.stock -= 1;
        }
    }

    display(){
        var x=80,y=100;

        imageMode(CENTER);
        image(this.image,720,220,70,70);

        if(this.stock!==0){
            for(var i=0;i<this.stock;i++){

                if(i%10 === 0){
                    x=80;
                    y+=50;
                }

                image(this.image,x,y,30,30);
                x=x+20;
            }
        }
    }

    bedroom(){
        background(bedroom,500,500);  
    }
      
    garden(){
        background(garden,500,500);  
    } 

    washroom(){
        background(washroom,500,500); 
    }
}