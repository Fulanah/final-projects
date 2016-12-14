
Team Name:VIP 
Project Name:Quick Sort
Section:2

Members: 
1. Balqis Abd Manan				1510722
2. Nik Nabilah Fairihin Hani Salman	        1429918
3. Nur Faizah Azahari				1514062
4. Nurul Nadia Che Saufi			1514016



Project report:

Features of the Program
-----------------------


•	New Sort Button
This button will generate random numbers which represent the height of each bars.

•	Run Button
This button will show the movement of the sorting continuously.

•	Step Button
This button will allow user to run the sorting visualization, step-by-step clearly.


Algorithm
---------

Quick Sort algorithm
1.	Make the left-most index value pivot.
2.	Partition the array using the pivot value.
3.	Quicksort the left partition recursively.
4.	Quicksort the left partition recursively.

Quick Sort Pivot Algorithm
1.	Choose the lowest index value as pivot.
2.	Take two variables to point left and right of the list excluding pivot.
3.	Left points to the low index.
4.	Right point to the high.
5.	While value at left is less than pivot move left.
6.	While value at right is greater than pivot move right.
7.	If both step 5 and 6 does not match, swap left and right.
8.	If left greater than or equal to the point where they met is the new pivot.

Major Function
--------------
In this project, we have decided to use JavaScript language because this project use massive technique in visualization to
depict the movement of the bars when do the sorting. Therefore, it is better to separate into some external files by classifying 
and grouping the function that relates to each other. For this project, we use a few function that have their specific function. 
Following is the list of the files and the respective functions:

Quick Sort Visualization.html:  stopRunning() -> Calling function that pending actions in the action queue (with no delay) and cancels any timeout
                                setState() -> Called whenever the state changes; sets enabled/ disabled status of various elements.
                                newSort() -> - Set up to get ready for a new sort by storing items in random array positions, etc.
                                             - Generate random no to get the random height of the bars.

Sorting.js: copyItem() -> Copy an item from one place to another (actually just enqueue actions to do so)
            greaterThan() -> Test if one item is greater than another; boxes are shown around the two items.
            putBoxes() -> Show boxes around two items
            scriptSetup() -> The first step in a sort
            scriptStep() -> Do one step in a sort.
            doAction() -> Perform one action from the action queue; actions are encoded as objects.
            frame() -> Do one frame of the animation; set timeout for next frame if appropriate.

Button.js: doRun() -> Handler for "Run" button
           doStep() -> Handler for "Step" button
           doNew() -> Handler for "New" button

Drawing.js: putItem() -> Draws item i from the array item[]; if item[i] is -1, nothing is drawn.
            drawMovingItem() -> Draws an item that is being moved to animate the copying of an item from one place to another.
            drawMax() -> Writes "Max" under one of the items, with an arrow pointing to the item.
            drawBox() -> Draws a box around one of the items (indicated by boxLoc)
            drawMultiBox() -> Draws a box around items number multiBoxLoc.x through multiBoxLoc.y
            draw() -> Completely redraws the canvas to show the current state.



          



 






