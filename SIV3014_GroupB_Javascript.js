/* IMPLEMENTATION PAGE EXTERNAL JAVASCRIPT FILE

PSEUDOCODE:

1. Function definition of "getInfo" (will get the input from user, extract & store information)
	- 1.1 Initialize and set the variable to 0
	- 1.2 Get the input sequence length
	- 1.3 Get the value of each nucleotide. Iterate the bases using for loop where
		> if current base is A
			+ increase count of base A occurence
		> else if current base is T
			+ increase count of base T occurence
		> else if current base is C
			+ increase count of base C occurence
		> else if current base is G
			+ increase count of base G occurence
		> otherwise if none A/T/C/G
			+ increase count of 'error'	
	- 1.4 Calculate each of base percentage
	- 1.5 Calculate AT & GC percentage content
	- 1.6 Return labelled array containing the values 

2. Function definition of "showInfo" (will get the value from "getInfo" function & pass the value to HTML Table 4.3)
	- 2.1 Define variable to store the values from getInfo
	- 2.2 Get the returned value of the function getInfo & store the value in local variable
	- 2.3 Input validation :
		> if input is empty
			+ Prompt error asking to input a value
		> else if there is error in input
			+ Prompt error of invalid sequence
		> otherwise if valid
			+ return (2.2) to HTML element(refer to implementation page file 4.3) by Id
			+ show the hidden table and hide the bar chart & histogram

3. Function definition of "getBarChart" (to plot bar chart in HTML implementation page file, refer to 4.4)
	- 3.1-3.2 Repeat 2.1 & 2.2 (get values of AT & GC percentage & error)
	- 3.3 Input validation :
		> if input is empty
			+ Prompt error asking to input a value
		> else if there is error in input
			+ Prompt error of invalid sequence
		> otherwise if valid
			+ Get the new Y-coordinate of AT & GC bar (new Y = old Y - height)
			+ Pass the Y-coordinate & height value to SVG Element(refer to implementation page file 4.4) by ID
			+ show the hidden bar chart and hide histogram

4. Function definition of "getHistogram" (to plot histogram in HTML implementation page file, refer to 4.5)
	- 4.1-4.2 Repeat 2.1 & 2.2 (get values of A,T,G,C percentage & error)
	- 4.3 Input validation :
		> if input is empty
			+ Prompt error asking to input a value
		> else if there is error in input
			+ Prompt error of invalid sequence
		> otherwise if valid
			+ Pass the width value to SVG Element(refer to implementation page file 4.5) by ID
			+ show the hidden histogram and hide bar chart

5. Function definition of "changeTextBarChart" (to dynamically change tootltip text for Bar Chart, refer to 4.4)
	+ 5.1-5.2 Repeat 2.1 & 2.2 (get values of AT & GC percentage)
	+ 5.3 Pass value of 5.2 to SVG Element (refer to implementation page file 4.4) to change the text value

6. Function definition of "changeTextHistogram" (to dynamically change tootltip text for Bar Chart, refer to 4.4)
	+ 6.1-6.2 Repeat 2.1 & 2.2 (get values of A,T,G,C percentage)
	+ 6.3 Pass value of 6.2 to SVG Element (refer to implementation page file 4.5) to change the text value

7. Function definition of "hide" (to hide all element when being reset)
	- hide table, bar chart and histogram by using id of the element
*/

/* 1. Function to get the input from user, extract & store information */
function getInfo(Seq){
	// 1.1 Initialize and set variable value to 0
	var seq,A=0,T=0,C=0,G=0,error=0
		a_perc=0,t_perc=0,c_perc=0,g_perc=0
		gc_perc=0,at_perc=0;
	seq = Seq.value.replace(/\s/g, ""); //remove whitespace
	var nucleotide = seq.toUpperCase(); //convert the input sequence to uppercases

	//1.2 Get sequence length
	var Seq_length = nucleotide.length;

	//1.3 Get the value of each nucleotide base
	for(var i=0; i<Seq_length; i++){ //iterate the bases in nucleotide until the last base
		if(nucleotide.charAt(i)==='A'){ //if the base is 'A'
			A += 1; //increase count of 'A'
		} else if (nucleotide.charAt(i)==='T'){ //if the base is 'T'
			T += 1; //increase count of 'T'
		} else if (nucleotide.charAt(i)==='G'){  //if the base is 'G'
			G += 1; //increase count of 'G'
		} else if (nucleotide.charAt(i)==='C'){  //if the base is 'C'
			C += 1; //increase count of 'C'
		} else { // if none is A/T/C/G
			error += 1; //increase count of 'error'
		}
	}

	//1.4 Calculate the percentage of the bases
	a_perc = (A/ Seq_length * 100).toFixed(2);  
	t_perc = (T/ Seq_length * 100).toFixed(2);  
	c_perc = (C/ Seq_length * 100).toFixed(2);  
	g_perc = (G/ Seq_length * 100).toFixed(2);  

	//1.5 Calculate AT & GC percentage content
	gc_perc = (((G + C) / Seq_length)* 100).toFixed(2);
	at_perc = (((A + T) / Seq_length) * 100).toFixed(2);

	//1.6 Return array containing the info with label
	return {
		error: error, seqLength: Seq_length,
		AT: at_perc, GC: gc_perc,
		A: A, T: T, C: C, G: G,
		a_perc: a_perc, t_perc: t_perc, c_perc: c_perc, g_perc: g_perc, 
	};

}

// Function that store the returned value in (1) and return the value to HTML Table 4.3
function showInfo(Seq){
	// 2.1 Define variable to store the values from getInfo
	var values = getInfo(Seq);

	//2.2 Store the value in local variable
	var error = values.error, seqLength = values.seqLength,
	A = values.A, T = values.T, C = values.C, G = values.G
	a_perc = values.a_perc, t_perc = values.t_perc, c_perc = values.c_perc,
	g_perc = values.g_perc; 

	//2.3 Input validation
	if (seqLength == 0){ // If input is empty
		alert("Please input a value"); //prompt the error
		return false;
	} else if (error > 0){ // If the input value has value other than ATCG
		alert("This is not a valid sequence"); //prompt the error
		return false;
	} else { //Pass the value to HTML element by Id
		document.getElementById("A").innerHTML = A;
		document.getElementById("T").innerHTML = T;
		document.getElementById("C").innerHTML = C;
		document.getElementById("G").innerHTML = G;
		document.getElementById("a_perc").innerHTML = a_perc;
		document.getElementById("t_perc").innerHTML = t_perc;
		document.getElementById("c_perc").innerHTML = c_perc;
		document.getElementById("g_perc").innerHTML = g_perc;

		//SHow or hide hidden content
		document.getElementById("results").style.display = "block"; //show hidden table
		document.getElementById("BarChart").style.display = "none"; //show hidden graph
		document.getElementById("HistoGraph").style.display = "none"; 
	}
}

// 3. Function to plot bar chart in HTML implementation page file (refer to 4.4)
function getBarChart(Seq){

	//3.1 Define variable to store the values from getInfo
	var values = getInfo(Seq); 

	//3.2 Store the value in local variable
	var error = values.error, seqLength = values.seqLength,
		atInput = (values.AT) * 3, gcInput = (values.GC) * 3;

	//3.3 Input validation
	if (seqLength == 0){ // If input is empty
		alert("Please input a value"); //prompt the error
		return false;
	} else if (error > 0){ // If the input value has value other than ATCG
		alert("This is not a valid sequence"); //prompt the error
		return false;
	} else { 
		// Get the new Y-coordinate of of AT & GC bar
		at_yCood = 450 - atInput; //original Y-coordinate - height AT
		gc_yCood = 450 - gcInput; //original Y-coordinate - height GC

		// Pass value to SVG
		document.getElementById("atBar").setAttribute("height", atInput);
		document.getElementById("atBar").setAttribute("y", at_yCood);
		document.getElementById("gcBar").setAttribute("height", gcInput);
		document.getElementById("gcBar").setAttribute("y", gc_yCood);

		// Show/hide hide graph
		document.getElementById("BarChart").style.display = "block"; //show bar char
		document.getElementById("HistoGraph").style.display = "none"; //hide histogram 
	}
}

//4. Function to plot histogram in HTML implementation page file (refer to 4.5)
function getHisto(Seq){
	//4.1 Define variable to store the values from getInfo
	var values = getInfo(Seq); 
	
	//4.2 Store the value in local variable
	var error = values.error, seqLength = values.seqLength;
	aInput = (values.a_perc) * 3.6, tInput = (values.t_perc) * 3.6,
	gInput = (values.g_perc) * 3.6, cInput = (values.c_perc) * 3.6;

	//4.3 Input validation
	if (seqLength == 0){ // If input is empty
		alert("Please input a value"); //prompt the error
		return false;
	} else if (error > 0){ // If the input value has value other than ATCG
		alert("This is not a valid sequence"); //prompt the error
		return false;
	} else { 
		// Pass value to SVG
		document.getElementById("grn").setAttribute("width", aInput);
		document.getElementById("bl").setAttribute("width", tInput);
		document.getElementById("rd").setAttribute("width", cInput);
		document.getElementById("yllw").setAttribute("width", gInput);

		// Show/hide hide graph
		document.getElementById("HistoGraph").style.display = "block"; //show hidden graph
		document.getElementById("BarChart").style.display = "none"; //show hidden chart
	}
}

//5. Function to change text for Bar Chart
function changeTextBarChart(Seq){
	//5.1 Variable to store the values from getInfo
	var values = getInfo(Seq); 

	//5.2 Get the returned value of the function getInfo & store the value in local variable
	var atInput = (values.AT) , gcInput = (values.GC);

	//5.3 Pass value to SVG (refer to implementation page file 4.4) to change the text value
	document.getElementById("atBar").setAttribute("data-tooltip-text", atInput);
	document.getElementById("gcBar").setAttribute("data-tooltip-text", gcInput);

}

//6. Function to change text for Histogram
function changeTextHistogram(Seq){

	//6.1 Variable to store the values from getInfo
	var values = getInfo(Seq); 

	//6.2 Store the value in local variable
	var aInput = (values.a_perc) , tInput = (values.t_perc) ,
	gInput = (values.g_perc), cInput = (values.c_perc);

	//6.3 Pass value to SVG (refer to implementation page file 4.5) to change the text value
	document.getElementById("grn").setAttribute("data", aInput);
	document.getElementById("bl").setAttribute("data", tInput);
	document.getElementById("rd").setAttribute("data", cInput);
	document.getElementById("yllw").setAttribute("data", gInput);
}

//7. Function to hide all element when being reset
function hide(){
	document.getElementById("results").style.display = "none"; 
	document.getElementById("BarChart").style.display = "none"; 
	document.getElementById("HistoGraph").style.display = "none"; 
}