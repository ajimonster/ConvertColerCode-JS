//ConvertColorCode
//© ajimonster 2015

//0 none
//1 int
//2 hex
//3 float
//4 unknown

var error = false ;

var inputValue = "" ;
var inputType = 0 ;


var redCode = "" ;
var greenCode = "" ;
var blueCode = "" ;

var redInputType = 0 ;
var greenInputType = 0 ;
var blueInputType = 0 ;


var intInputObject ;
var hexInputObject ;
var floatInputObject ;

var errorObject ;
var hexButtonObject ;


var sampleObject ;

var bgColorCode = "" ;
var textColorCode = "" ;

// ---------------------------------------------------------------------------------
//	onload
// ---------------------------------------------------------------------------------
window.onload = function load()
{
    intInputObject = document.getElementById("IntInput") ;
    hexInputObject = document.getElementById("HexInput") ;
    floatInputObject = document.getElementById("FloatInput") ;
    
    errorObject = document.getElementById("Error") ;
    hexButtonObject = document.getElementById("HexButton") ;
    
    sampleObject = document.getElementById("sample") ;
}

// ---------------------------------------------------------------------------------
//	RGB InputKeyUp
// ---------------------------------------------------------------------------------
function inputRedTextKeyUp($this)
{
    if (examineValue($this.value,0))
    {
        redCode = $this.value ;
    }
    checkRGBValue() ;
}
function inputGreenTextKeyUp($this)
{
    if (examineValue($this.value,1))
    {
        greenCode = $this.value ;
    }
    checkRGBValue() ;
}
function inputBlueTextKeyUp($this)
{
    if (examineValue($this.value,2))
    {
        blueCode = $this.value ;
    }
    checkRGBValue() ;
}
// ---------------------------------------------------------------------------------
//	examineValue
// ---------------------------------------------------------------------------------
function examineValue(value,inputNum)
{
    var type = 0 ;
    
    if (value.length == 0)
    {
        return true ;
    }
    if (value.length > 4)
    {
        error = true ;
    }
    else if (value.length == 4 && value.match(/^-?[0-9]+\.[0-9]+$/))//float?
    {
        if (value.indexOf('.') != -1)
        {
            if (value >= 0 && value <= 1)
            {
                error = false ;
                type = 3 ;
            }
            else
            {
                error = true ;
            }
        }
        else
        {
            error = true ;
        }
    }
    else if ((value.length >= 1 || value.length <= 3) && value.match(/^-?[0-9]{1,3}/))//int?
    {
        if (value >= 0 && value <= 255)
        {
            error = false ;
        }
        else
        {
            error = true ;
        }
        
        if (value.length == 2)
        {
            type = 4 ;
        }
        else
        {
            type = 1 ;
        }
    }
    else if (value.length == 2 && value.match(/^[0-9A-Fa-f]{2}$/))//hex?
    {
        if (changeHexStringToInt(value) >= 0 && changeHexStringToInt(value) <= 255)
        {
            error = false ;
            type = 2 ;
        }
        else
        {
            error = true ;
        }
    }
    else
    {
        error = true ;
    }
    
    
    switch (inputNum)
    {
        case 0:
        {
            if (error)
            {
                redInputType = 0 ;
            }
            else
            {
                redInputType = type ;
            }
            break ;
        }
        case 1:
        {
            if (error)
            {
                greenInputType = 0 ;
            }
            else
            {
                greenInputType = type ;
            }
            break ;
        }
        case 2:
        {
            if (error)
            {
                blueInputType = 0 ;
            }
            else
            {
                blueInputType = type ;
            }
            break ;
        }
    }
    if (error)
    {
        return false ;
    }
    return true ;
}
// ---------------------------------------------------------------------------------
//	checkRGBValue
// ---------------------------------------------------------------------------------
function checkRGBValue()
{
    resetHexButton() ;
    
    if (!error)
    {
        if (redCode.length > 0 && greenCode.length > 0 && blueCode.length > 0)
        {
            if (redInputType == greenInputType && redInputType == blueInputType)
            {
                if ((redInputType == 4 && greenInputType == 4 && blueInputType == 4 ))
                {
                    isHexOrIntButton() ;
                }
                else
                {
                    changeAllInputValue(redInputType) ;
                }
            }
            else if ((redInputType == 2 && greenInputType == 4 && blueInputType == 4 ) ||
                     (redInputType == 2 && greenInputType == 2 && blueInputType == 4 ) ||
                     (redInputType == 2 && greenInputType == 4 && blueInputType == 2 ) ||
                     (redInputType == 4 && greenInputType == 2 && blueInputType == 2 ) ||
                     (redInputType == 4 && greenInputType == 2 && blueInputType == 4 ) ||
                     (redInputType == 4 && greenInputType == 4 && blueInputType == 2 ))
            {
                changeAllInputValue(2) ;
            }
            else if ((redInputType == 1 && greenInputType == 4 && blueInputType == 4 ) ||
                     (redInputType == 1 && greenInputType == 1 && blueInputType == 4 ) ||
                     (redInputType == 1 && greenInputType == 4 && blueInputType == 1 ) ||
                     (redInputType == 4 && greenInputType == 1 && blueInputType == 1 ) ||
                     (redInputType == 4 && greenInputType == 1 && blueInputType == 4 ) ||
                     (redInputType == 4 && greenInputType == 4 && blueInputType == 1 ) )
            {
                if (redCode.length == 3 || greenCode.length == 3 || blueCode.length == 3)
                {
                    changeAllInputValue(1) ;
                }
                else
                {
                    isHexOrIntButton() ;
                }
            }
            else if (redInputType == 0 || greenInputType == 0 || blueInputType == 0)
            {
                resetErrorMessage() ;
                return ;
            }
            else
            {
                sendErrorMessage() ;
            }
        }
        else
        {
            resetErrorMessage() ;
            return ;
        }
    }
    else
    {
        sendErrorMessage() ;
    }
}
// ---------------------------------------------------------------------------------
//	changeOtherValueFromRGBValue
// ---------------------------------------------------------------------------------
function changeAllInputValue(type)
{
    resetErrorMessage() ;
    
    switch (type)
    {
        case 1:
        {
            intInputObject.value =
            redCode + "," + greenCode + "," + blueCode ;
            hexInputObject.value =
            changeIntToHexString(redCode) + changeIntToHexString(greenCode) + changeIntToHexString(blueCode) ;
            floatInputObject.value =
            changeIntToFloat(redCode) + "," + changeIntToFloat(greenCode) + "," + changeIntToFloat(blueCode) ;
            break ;
        }
        case 2:
        {
            intInputObject.value =
            changeHexStringToInt(redCode) + "," + changeHexStringToInt(greenCode) + "," + changeHexStringToInt(blueCode) ;
            hexInputObject.value =
            redCode + greenCode + blueCode ;
            floatInputObject.value =
            changeIntToFloat(changeHexStringToInt(redCode)) + "," + changeIntToFloat(changeHexStringToInt(greenCode)) + "," + changeIntToFloat(changeHexStringToInt(blueCode)) ;
            break ;
        }
        case 3:
        {
            intInputObject.value =
            redCode *255 + "," + greenCode *255 + "," + blueCode *255 ;
            hexInputObject.value =
            changeIntToHexString(redCode *255) + changeIntToHexString(greenCode *255) + changeIntToHexString(blueCode *255) ;
            floatInputObject.value =
            redCode + "," + greenCode + "," + blueCode ;
            break ;
        }
    }
}

// ---------------------------------------------------------------------------------
//	int float hex InputKeyUp
// ---------------------------------------------------------------------------------
function inputIntTextKeyUp($this)
{
    inputValue = $this.value ;
    inputType = 1 ;
    if (inputValue.length < 5 && inputValue.indexOf(",") == -1)
    {
        resetErrorMessage() ;
    }
    else
    {
        divideRGBFromInputValue() ;
    }
}
function inputHexTextKeyUp($this)
{
    inputValue = $this.value ;
    inputType = 2 ;
    if (inputValue.length < 6)
    {
        resetErrorMessage() ;
    }
    else
    {
        divideRGBFromInputValue() ;
    }
}
function inputFloatTextKeyUp($this)
{
    inputValue = $this.value ;
    inputType = 3 ;
    if (inputType.length < 14)
    {
        resetErrorMessage() ;
    }
    else
    {
        divideRGBFromInputValue() ;
    }
}

// ---------------------------------------------------------------------------------
//	changeHexStrToInt
// ---------------------------------------------------------------------------------
function divideRGBFromInputValue()
{
    inputValue = inputValue .replace("(","")
    .replace(")","")
    .replace("#","")
    .replace("　","")
    .replace(" ","")
    .replace("{","")
    .replace("}","");
    
    switch (inputType)
    {
        case 1:
        {
            if (inputValue.indexOf(",") == -1)
            {
                error = true ;
            }
            else
            {
                var arr = inputValue.split(",");
                redCode = arr[0] ;
                greenCode = arr[1] ;
                blueCode = arr[2] ;
                if ((redCode >= 0 && redCode <= 255) &&
                    (greenCode >= 0 && greenCode <= 255) &&
                    (blueCode >= 0 && blueCode <= 255))
                {
                    error = false ;
                }
                else
                {
                    error = true ;
                }
            }
            break ;
        }
        case 2:
        {
            if (inputValue.length < 6)
            {
                error = true ;
            }
            else
            {
                redCode = inputValue.substr(0,2) ;
                greenCode = inputValue.substr(2,2) ;
                blueCode = inputValue.substr(4,2) ;
                if ((changeHexStringToInt(redCode) >= 0 && changeHexStringToInt(redCode) <= 255) &&
                    (changeHexStringToInt(greenCode) >= 0 && changeHexStringToInt(greenCode) <= 255) &&
                    (changeHexStringToInt(blueCode) >= 0 && changeHexStringToInt(blueCode) <= 255))
                {
                    error = false ;
                }
                else
                {
                    error = true ;
                }
            }
            break ;
        }
        case 3:
        {
            if (inputValue.indexOf(",") == -1)
            {
                error = true ;
            }
            else
            {
                var arr = inputValue.split(",");
                redCode = arr[0] ;
                greenCode = arr[1] ;
                blueCode = arr[2] ;
                if ((redCode >= 0 && redCode <= 1) &&
                    (greenCode >= 0 && greenCode <= 1) &&
                    (blueCode >= 0 && blueCode <= 1))
                {
                    error = false ;
                }
                else
                {
                    error = true ;
                }
            }
            break ;
        }
    }
    
    if (error)
    {
        sendErrorMessage() ;
    }
    else
    {
        changeAllInputValue(inputType) ;
    }
}
// ---------------------------------------------------------------------------------
//	changeHexStrToInt
// ---------------------------------------------------------------------------------
function changeHexStringToInt(hex)
{
    return parseInt(hex, 16);
}
// ---------------------------------------------------------------------------------
//	changeIntToHexString
// ---------------------------------------------------------------------------------
function changeIntToHexString(int)
{
    if (parseInt(int, 10) <= 15)
    {
        return "0" + parseInt(int, 10).toString(16) ;
    }
    
    return parseInt(int, 10).toString(16);
}
// ---------------------------------------------------------------------------------
//	changeIntToFloat
// ---------------------------------------------------------------------------------
function changeIntToFloat(int)
{
    return (int / 255).toFixed(2);
}
// ---------------------------------------------------------------------------------
//	sendErrorMessage
// ---------------------------------------------------------------------------------
function sendErrorMessage()
{
    resetHexButton() ;
    
    errorObject.innerHTML = "<br><font color = \"#ff0000\">入力された文字に誤りがあります。<br>" +
    "RGBの入力は１０進数,１６進数、フロートのいずれかに統一してください。<br>" +
    "入力形式に誤りがないかご確認ください。<br>" +
    "</font>"
    error = false ;
}
// ---------------------------------------------------------------------------------
//	resetErrorMessage
// ---------------------------------------------------------------------------------
function resetErrorMessage()
{
    errorObject.innerHTML = "" ;
}

// ---------------------------------------------------------------------------------
//	isHexOrIntButton
// ---------------------------------------------------------------------------------
function isHexOrIntButton()
{
    hexButtonObject.innerHTML = "16進数?　<sub>isHex?</sub>　　<button onClick = \"buttonHexClick(0)\">YES</button>　　<button onClick = \"buttonHexClick(1)\">NO</button><br>" ;
}
// ---------------------------------------------------------------------------------
//	resetHexButton
// ---------------------------------------------------------------------------------
function resetHexButton()
{
    hexButtonObject.innerHTML = "" ;
}
// ---------------------------------------------------------------------------------
//	buttonHexClick
// ---------------------------------------------------------------------------------
function buttonHexClick(va)
{
    if (va == 0)
    {
        changeAllInputValue(2) ;
    }
    else if (va == 1)
    {
        changeAllInputValue(1) ;
    }
}
// ---------------------------------------------------------------------------------
//	bgColorKeyUp
// ---------------------------------------------------------------------------------
function bgColorKeyUp($this)
{
    bgColorCode = $this.value ;
    if (bgColorCode.length == 6)
    {
        setColor() ;
    }
}
// ---------------------------------------------------------------------------------
//	textColorKeyUp
// ---------------------------------------------------------------------------------
function textColorKeyUp($this)
{
    textColorCode = $this.value ;
    if (textColorCode.length == 6)
    {
        setColor() ;
    }
}
// ---------------------------------------------------------------------------------
//	setColor
// ---------------------------------------------------------------------------------
function setColor()
{
    if (bgColorCode.length == 6)
    {
        sampleObject.style.background = "#" + bgColorCode ;
    }
    sampleObject.innerHTML = "<br><font color = #" + textColorCode + ">サンプルテキスト</font><br><br>" ;
}

//end