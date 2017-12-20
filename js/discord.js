/****************************************************************
*   Suzanne Kersten
*	12/19/2017
*	Generates output based on Discord's way of formatting
*   text when it's copy/pasted into a textbox.
*
*   TODO:
*****************************************************************/
//Parses through the text given, looking for discord-specific
//	ways of formatting.
function discordDecipher(allText) {
    //parse the two names used
    var names = parseDiscordNames(allText);
    var leftName = names[0], rightName = names[1];		//the names of the two rpers
    if (isDebug) console.log("Left Name: " + leftName + " |Right Name: " + rightName);
	setLeftName(names[0]);
	setRightName(names[1]);
	generateUsernameHeaders();
	
    
} //end of telegramDecipher


//**************************
//Guesses the left and right person from the text given: Basically looks for the first two messages and guesses from there
//returns left and right name as a 2-slot array: left, then right.
function parseDiscordNames(allText) {
    var leftName = "";
    var rightName = "";

	/*
	<p><strong>QueenSuzy</strong>-12/11/2017</p><p><em>gasp!!</em></p><p>how are you??</p><p><strong>Sapphykinz</strong>-12/11/2017</p><p>I&rsquo;m ok</p><p>You??</p><p><strong>QueenSuzy</strong>-12/11/2017</p><p>I&#39;m alright, kinda meh</p><p><strong>Sapphykinz</strong>-12/11/2017</p><p>aww</p><p>eat chocolate</p><p><strong>QueenSuzy</strong>-12/11/2017</p><p>I don&#39;t have any!</p><p>wait</p><p>no I do</p><p>I have a snickers ice cream</p><p><strong>Sapphykinz</strong>-12/11/2017</p><p>good</p><p><strong>QueenSuzy</strong>-12/11/2017</p><p>yee3e</p><p>December 19, 2017</p><p><strong>Sapphykinz</strong>-Today at 9:38 AM</p><p>Slurp</p><p><strong>QueenSuzy</strong>-Today at 5:47 PM</p><p>slrrrpp</p>
	*/
	
    //guess left name, then see if we're right.
    var i = 7;
    for (; i < allText.length - 1; i++) {
        leftName = allText.substring(i, allText.indexOf("-"));
        if (parseHTMLElements(allText, i - 8) == "strong"
		  && parseHTMLElements(allText, i + (leftName.length - 9)) == "/strong")        
            break;
    }
	
	for (; i < allText.length - 1; i++) {
		rightName = allText.substring(i, allText.indexOf("-", i));
		console.log(allText.indexOf("-") + "| " + i + "| " + rightName);  
		if (rightName != leftName
		  && parseHTMLElements(allText, i - 8) == "strong"
		  && parseHTMLElements(allText, i + (rightName.length - 9)) == "/strong"){
			
			break;
		 }
	}

    return [leftName, rightName];
}