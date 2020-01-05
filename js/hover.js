document.body.onmouseover = handler;
document.body.onmouseout = handler;

function handler(event) 
{
    if (event.type == "mouseover") 
    {
        if (event.target.tagName == "BUTTON") event.target.style.borderBottom = "4px solid #ffcc00";
    }
    else if (event.type == "mouseout") 
    {
        if (event.target.tagName == "BUTTON") event.target.style.borderBottom = "";
    }
}