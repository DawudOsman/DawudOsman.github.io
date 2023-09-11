import Square from './square.js';
const canvas  = document.getElementById("myCanvas")
const ctx = canvas.getContext("2d");
const clearBtn = document.getElementById("clearBtn")
const solveBtn = document.getElementById("solveBtn")
canvas.height = 800;
canvas.width = 1200;
let cellWidth = 50;
let cellHeight = 50;
let rowNum = 10;
let columNum = 20;
let startNode = null;
let endNode = null;
let toggleAlgo = 0;

function  drawRect(x,y,a,b) {
    ctx.beginPath();
    ctx.rect(x,y,a,b);
    ctx.closePath();
    ctx.fill();
}
function drawWall(x,y,a,b)
{
    ctx.fillStyle = 'black'
    drawRect(x,y,a,b)
}
function drawStart(x,y,a,b)
{
    ctx.fillStyle = 'red'
    drawRect(x,y,a,b)   
}
function drawEnd(x,y,a,b)
{
    ctx.fillStyle = 'green'
    drawRect(x,y,a,b) 
}
function drawPath(x,y,a,b)
{
    ctx.fillStyle = '#800080'
    drawRect(x,y,a,b)   
}
var grid = []
function createGrid(){
    for(let i = 0; i < columNum; i++){
        grid[i] = []
        for(let j = 0; j < rowNum; j++)
        {
            let newNode = new Square(i,j,{x: i *(cellWidth + 10), y: j * (cellHeight + 10),s:'e'}) 
            grid[i][j] = newNode
        }
    }

}
function draw()
{
    ctx.fillStyle = '#AAAAAA'
    for(let i = 0; i < columNum; i++){
        for(let j = 0; j < rowNum; j++)
        {
            drawRect(grid[i][j].node.x,grid[i][j].node.y,cellWidth,cellHeight)
        }
    }
}
function editCell(x,y)
{
    if(startNode == null || endNode == null)
    {
        canvas.onmousemove = null
    }
    for(let i = 0; i < columNum; i++){
        for(let j = 0; j < rowNum; j++)
        {
            if(i *(cellWidth + 10) < x && x < i *(cellWidth + 10) + cellWidth && j * (cellHeight + 10) < y &&  y <  cellHeight + j * (cellHeight + 10))
            {
                if(grid[i][j].node.s == "e" && startNode == null && endNode == null)
                {
                    let currentNode = grid[i][j]
                    currentNode.node.s = "s"
                    startNode = grid[i][j]
                    drawStart(grid[i][j].node.x,grid[i][j].node.y,cellWidth,cellHeight)

                }
                else if(grid[i][j].node.s == "e" && startNode != null && endNode == null)
                {
                    let currentNode = grid[i][j]
                    currentNode.node.s = "f"
                    endNode = grid[i][j]
                    drawEnd(grid[i][j].node.x,grid[i][j].node.y,cellWidth,cellHeight)

                }
                else if(grid[i][j].node.s == "e" && startNode != null && endNode != null)
                {
                    let currentNode = grid[i][j]
                    currentNode.node.s = "w"   
                    drawWall(grid[i][j].node.x,grid[i][j].node.y,cellWidth,cellHeight)

                }
            }
        }
    }
}
function mouseUp(e)
{
    canvas.onmousemove = null;
}
function mouseOver(e)
{
    let x = e.pageX - canvas.offsetLeft
    let y = e.pageY - canvas.offsetTop
    editCell(x,y)   
}
function mouseDown(e){
    canvas.onmousemove = mouseOver
    let x = e.pageX - canvas.offsetLeft
    let y = e.pageY - canvas.offsetTop
    editCell(x,y)
}
function tracingBackNode(tracingBack){
    while (!(tracingBack.getX() == startNode.getX() && tracingBack.getY() == startNode.getY()) && tracingBack != null)
    {
        tracingBack = tracingBack.getCameFrom()
        if(!(tracingBack.getX() == startNode.getX() && tracingBack.getY() == startNode.getY()))
        {
            drawPath(tracingBack.node.x,tracingBack.node.y,cellWidth,cellHeight)
        }
    }
    
}
function clearGrid(e){
    startNode = null
    endNode = null
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    grid = []
    createGrid()
    draw()
}
function hasBeenFound(currentNode)
{
    if(currentNode.getX() == endNode.getX() && currentNode.getY() == endNode.getY()){
        return true
    }
    else{
        return false
    }
}
function chooseAlgo(){
    if(toggleAlgo == 0){
        solveGrid()
    }
    else solveGridDFS()
}
function solveGrid(e){
    let NodeList = [startNode]
    let tracingBack = null
    while (NodeList){
        let currentNode = NodeList[0]
        NodeList.shift()
        if(hasBeenFound(currentNode))
        {
            tracingBack = currentNode
            break
        }
        for(let element of currentNode.assignNeighbors(grid))
        {
            if(element.getIsVisited() == false && element.node.s != "w"){
                element.toggleVisited()
                element.setCameFrom(currentNode)
                NodeList.push(element)
            }
        }
    }
    if(NodeList == []){
        return
    }
    tracingBackNode(tracingBack)
}
function solveGridDFS(e)
{
    {
        let NodeList = [startNode]
        let tracingBack = null
        while (NodeList){
            let currentNode = NodeList[0]
            NodeList.shift()
            if(hasBeenFound(currentNode))
            {
                tracingBack = currentNode
                break
            }
            for(let element of currentNode.assignNeighbors(grid))
            {
                if(element.getIsVisited() == false && element.node.s != "w"){
                    element.toggleVisited()
                    element.setCameFrom(currentNode)
                    NodeList.splice(0,0,element)
                }
            }
        }
        if(NodeList == []){
            return
        }
        tracingBackNode(tracingBack)
    }
}
createGrid()
draw()
function toggleShow()
{
document.getElementById("myDropDown").classList.toggle("show");
}
function windowToggle(e){
    if (!(e.target.id =='dropBtn')) {
    var myDropdown = document.getElementById("myDropDown");
      if (myDropdown.classList.contains('show')) {
        myDropdown.classList.remove('show');
      }
    }
  }
function setDfs(){
    toggleAlgo = 1
}
function setBfs(){
    toggleAlgo = 0
}
window.onclick = windowToggle
document.getElementById("bfs").onclick = setBfs
document.getElementById("dfs").onclick = setDfs
document.getElementById("dropBtn").onclick = toggleShow
solveBtn.onclick = chooseAlgo
clearBtn.onclick = clearGrid
canvas.onmousedown = mouseDown;
canvas.onmouseup = mouseUp