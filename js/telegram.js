/****************************************************************
*   Suzanne Kersten
*	12/18/2017
*	Generates output based on Telegram's way of formatting
*   text when it's copy/pasted into a textbox.
*
*   TODO: Shove checking for if something is a name
*   (IE ungodly long if in the parseNames) into it's own func.
*****************************************************************/

//Parses through the text given, looking for telegram-specific
//	ways of formatting.
function telegramDecipher(allText) {
    //parse the two names used
    var names = parseTelegramNames(allText);
    var leftName = names[0], rightName = names[1];		//the names of the two rpers
    if (isDebug) console.log("Left Name: " + leftName + " |Right Name: " + rightName);
	setLeftName(names[0]);
	setRightName(names[1]);
	generateUsernameHeaders();
    
    var nameRegExp = new RegExp("(?:" + leftName + "|" + rightName+  "), \\[\\d{2}.\\d{2}.\\d{2} \\d{2}:\\d{2}\\]");

    
    var splits = allText.split(nameRegExp);
    for (var i = 0; i < splits.length; i++){
        console.log(splits[i]);
    }

} //end of telegramDecipher


//**************************
//Guesses the left and right person from the text given: Basically looks for the first two messages and guesses from there
//returns left and right name as a 2-slot array: left, then right.
function parseTelegramNames(allText) {
    var leftName = "";
    var rightName = "";

    //guess left name, then see if we're right.
    var i = 3;
    for (; i < allText.length - 1; i++) {
        leftName = allText.substring(i, allText.indexOf(","));
        if (parseHTMLElements(allText, i - 3) == "p"
            && allText.charAt(i + leftName.length + 2) == "["		//check if there's a [ after their name, plus space for , and the space
            && allText.charAt(i + leftName.length + 5) == "."
            && allText.charAt(i + leftName.length + 8) == "."
            && allText.charAt(i + leftName.length + 14) == ":"
            && allText.charAt(i + leftName.length + 17) == "]"
            && parseHTMLElements(allText, i + leftName.length + 18) == "br") {
            i = i + 24; //skip past this name
            break;
        }
    }

    //guess right name, then see if it's good. Starts from where last loop left off
    for (; i < allText.length - 1; i++) {
        rightName = (allText.substring(i, allText.indexOf(",", i)));
        if (rightName == leftName) {
            i = i + 24;
        }
        if (parseHTMLElements(allText, i - 3) == "p"
            && rightName != leftName                                //make sure we didn't just grab the same name
            && allText.charAt(i + rightName.length == ",")
            && allText.charAt(i + rightName.length + 2) == "["		//same as before, but with right name
            && allText.charAt(i + rightName.length + 5) == "."
            && allText.charAt(i + rightName.length + 8) == "."
            && allText.charAt(i + rightName.length + 14) == ":"
            && allText.charAt(i + rightName.length + 17) == "]"
            && allText.charAt(i + rightName.length + 17) == "]"
            && parseHTMLElements(allText, i + rightName.length + 18) == "br") {
            break;
        }
    }
    return [leftName, rightName];
}
