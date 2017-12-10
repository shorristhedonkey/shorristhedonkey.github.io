//https://p5js.org
//DAT405 / GAD405

  //initialising all the variables
  boxesX = []; //creating the array that will hold all the X-axis positions of the grid squares
  boxesY = []; //creating the array that will hold all the Y-axis positions of the grid squares
  let boxPosX = 1; //defining the X-axis starting position for the moving box
  let boxPosY = 50; // defining the Y-axis starting position for the moving box
  widthDivider = 50;
  bounces = 1 ; //records the number of times boxes hit the boundries, used for debugging
  speedX = 1; //the starting X-axis speed value
  speedY = widthDivider; // the starting Y-axis speed value
  boxes  = []; //creating the array that will store all the boxes
  r = 1;      //creating the red colour for the boxes (this is randomized later)
  g = 1;     //same as before but for green
  b = 1;	// same as before but for blue
  hit = false; //declaring the variable "hit" as a boolean, used for debugging mainly
	  function setup() { // the setup function, used for calculating stuff 
	  createCanvas(594, 841); //Use this function to define the size of the output window
	  textSize(32);		   // sets the text size, wh
	  frameRate(7);		  // sets the frame rate
	  grid(); 		     // sets up the grid arrays, boxesX & boxesY
	  //gridDebug();		// visualises the grid
	  background(random(255), random(255), random(255)); // sets random background colour
	   //      to add to the starting positions every frame so they can move
	  boxes[0] = new box(boxPosX, boxPosY, speedX, speedY);
	  boxes[1] = new box(boxPosX + 2, boxPosY, speedX, speedY);		    // creating all the 10 boxes as variables in the "boxes" array:
	  boxes[2] = new box(boxPosX + 4, boxPosY, speedX, speedY);		   //each one of these boxes instantiates a new instance of the class
	  boxes[3] = new box(boxPosX + 6, boxPosY, speedX, speedY);		  //"box" and assigns it to a variable in the array "boxes"
	  boxes[4] = new box(boxPosX + 8, boxPosY, speedX, speedY);		 //they all call on the boxPosX and boxPosY variables for their
	  boxes[5] = new box(boxPosX + 10, boxPosY, speedX, speedY);	//starting positions and they call on speedX and speedY to
	  boxes[6] = new box(boxPosX + 12, boxPosY, speedX, speedY);   //add to the starting positions every frame so they can move
	  boxes[7] = new box(boxPosX + 14, boxPosY, speedX, speedY);  //the positions of these boxes all differ by 2 squares, this creates
	  boxes[8] = new box(boxPosX + 16, boxPosY, speedX, speedY); //the dithering effect.
	  boxes[9] = new box(boxPosX + 18, boxPosY, speedX, speedY);

	  }//end of the setup function
	  
		function draw() {
			 //gridDebug();   //Draws the grid squares set up as variables in an Array in the "grid" function (called in setup())
			
			//draws the original box from the box class and all subsiquent boxes, using the boxes array, the box in array position [0] will have no position change
		   // but each subsiquent box will haev its position shifted along the x axis by 2, as shown when the variables are being declared in setup
			boxes[0].boxMovement();
			boxes[0].boxDraw();
			
			boxes[1].boxMovement();
			boxes[1].boxDraw();
			
			boxes[2].boxMovement();
			boxes[2].boxDraw();
			
			boxes[3].boxMovement();
			boxes[3].boxDraw();
			
			boxes[4].boxMovement();
			boxes[4].boxDraw();
			
			boxes[5].boxMovement();
			boxes[5].boxDraw();
			
			boxes[6].boxMovement();
			boxes[6].boxDraw();
			
			boxes[7].boxMovement();
			boxes[7].boxDraw();
			
			boxes[8].boxMovement();
			boxes[8].boxDraw();
			
			boxes[9].boxMovement();
			boxes[9].boxDraw();
		}//end of the draw function
		
			function grid(){ //creating the function "grid"
		  boxWidth = width/widthDivider;
			for (let posY = 0; posY + boxWidth < height; posY += boxWidth){ 
			//creates a variable called "posY", this variable has a value of 0 so doesnt matter, but every time this loop loops, it will
		   // add the width of 1 box to it, then it will add 1 box accross the X-axis until the boxes are as wide as the canvas
				for(let posX = 0; posX + boxWidth < width; posX += boxWidth){
			// this does exactly the same as the previous but for height instead
					boxesX.push(posX); // every time a box is drawn this will push the X-axis position of the box to the array "boxesX"
					boxesY.push(posY);//  every time a box is drawn this will push the Y-axis position of the box to the array "boxesY"
					}
				}
			}//end of the grid function
			
			function gridDebug(){ //creating the function "gridDebug"
				for (let posY = 0; posY + boxWidth < height; posY += boxWidth){
					//this loop follows the exact same conditions as the loop in the previous function
					for(let posX = 0; posX + boxWidth < width; posX += boxWidth){
					//same as above
					fill(0, 0, 255);//defines the colour of the debug boxes
					rect(posX, posY, boxWidth, boxWidth); //draws the debug boxes
					}
				}
			}//end of GridDebug
			
			class box{// creating the class "box"
				constructor(x, y, speedXbox, speedYbox){ //setting 4 values that the class will take when called
					//setting up variables for the class
					this.x = x;
					this.y = y;
					this.speedXbox = speedXbox;
					this.speedYbox = speedYbox;
				}
						boxDraw(){ // creating a function in the class called "boxDraw()"
								pop(); // start of the paramiters for a shape
								fill(r, g, b); // colours of a shape, filled with the rgb variables which are randomized
								rect(boxesX[this.x], boxesY[this.y], boxWidth, boxWidth); 
								// creating a box with the x position of whatever this.x corrisponds to in 
							   //  "boxesX" array, then doing the same for the Y-axis, the width and height are both
							  //   defined at the start of this file
								push(); // end of teh paramiters for the shape
						}
					//MOVING THE RECT	
						boxMovement(){ // creating the function "boxMovement()" in the class "box"
							//adding the speed value (this.speedXbox & this.speedYbox) to the positional values (this.x & this.y)
								this.x += this.speedXbox;
								this.y += this.speedYbox;
							//WALL COLLISION
								if(boxesX[this.x] >= width - boxWidth*2 || boxesX[this.x] <= 0){ //if the X-axis position of the box is larger than the width of the canvas 
																								// or smaller than 0 (the left side of the canvas)
									this.speedXbox = this.speedXbox * -1;  // converts the speed to be a minus value, making the object bounce in the opposite direction 
									hit = true; //sets the boolean "hit" to be true
									r = random(255);   //randomizes the Red colour of the rgb spectrum through a variable declared at the start called "r"
									g = random(255);  //randomizes the green colour of the rgb spectrum through a variable declared at the start called "g"
 									b = random(255); //randomizes the blue colour of the rgb spectrum through a variable declared at the start called "b"
								}
								if(boxesY[this.y] >= height - boxWidth*2 || boxesY[this.y] <= 0){ // does the same thing as the previous if statement but on the Y-axis
									this.speedYbox = this.speedYbox * -1; // converts the speed to be a minus value, making the object bounce in the opposite directrion
									hit = true;  //sets the boolean "hit" to be true
									r = random(255);   //randomizes the Red colour of the rgb spectrum through a variable declared at the start called "r"
									g = random(255);  //randomizes the green colour of the rgb spectrum through a variable declared at the start called "g"
 									b = random(255); //randomizes the blue colour of the rgb spectrum through a variable declared at the start called "b"
								} 
							
							
						}
						
			}//ends the box class