export default class Square{
    constructor(x,y,node){
        this.x = x
        this.y = y
        this.node = node
        this.neighbours = []
        this.came_from = null
        
        this.is_visited = false
    }
    getCameFrom(){
        return this.came_from
    }
    setCameFrom(previousNode){
        this.came_from = previousNode
    }
    toggleVisited(){
        this.is_visited = true
    }
    getIsVisited()
    {
        return this.is_visited
    }
    getX()
    {
        return this.x
    }
    getY(){
        return this.y
    }
    assignNeighbors(grid){
        if(this.x == 0 && this.y == 9){
            this.neighbours.push(grid[this.x + 1][this.y])
            this.neighbours.push(grid[this.x ][this.y - 1])
        }
        else if(this.x == 0 && this.y == 0){
            this.neighbours.push(grid[(this.x + 1)][this.y])
            this.neighbours.push(grid[this.x ][this.y + 1])
        }
        else if(this.x == 19 && this.y == 0){
            this.neighbours.push(grid[this.x - 1][this.y])
            this.neighbours.push(grid[this.x ][this.y + 1])
        }
        else if(this.x == 19 && this.y == 9){
            this.neighbours.push(grid[this.x - 1][this.y])
            this.neighbours.push(grid[this.x ][this.y - 1])
        }
        else if(this.x == 19){
            this.neighbours.push(grid[this.x - 1][this.y])
            this.neighbours.push(grid[this.x ][this.y + 1])
            this.neighbours.push(grid[this.x ][this.y - 1])
        }
        else if(this.x == 0){
            this.neighbours.push(grid[this.x + 1][this.y])
            this.neighbours.push(grid[this.x ][this.y + 1])
            this.neighbours.push(grid[this.x ][this.y - 1])
        }
        else if(this.y == 9){
            this.neighbours.push(grid[this.x - 1][this.y])
            this.neighbours.push(grid[this.x + 1][this.y])
            this.neighbours.push(grid[this.x ][this.y - 1])
        }
        else if(this.y == 0){
            this.neighbours.push(grid[this.x - 1][this.y])
            this.neighbours.push(grid[this.x + 1][this.y])
            this.neighbours.push(grid[this.x ][this.y + 1])
        }
        else
        {
            this.neighbours.push(grid[this.x - 1][this.y])
            this.neighbours.push(grid[this.x + 1][this.y])
            this.neighbours.push(grid[this.x ][this.y + 1])
            this.neighbours.push(grid[this.x ][this.y - 1])
        }
        return this.neighbours
    }
}