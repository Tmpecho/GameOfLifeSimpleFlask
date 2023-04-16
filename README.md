# Simple website showcasing Conway's Game of Life
Conway's game of life made using Python Flask.

<img width="1440" alt="Screenshot 2023-04-16 at 22 31 06" src="https://user-images.githubusercontent.com/82368148/232340421-c4343332-bd09-4e1b-aeb1-d183c978ad16.png">


## What is Conway's Game of Life?
Conway's Game of Life is a zero-player game that produces chaotic behavior out of simple rules.

### The rules
Cells inhabit a two-dimentional plane where a given cell can either be in a live or dead state.

1. Any live cell with fewer than two live neighbours dies, as if by underpopulation.
2. Any live cell with two or three live neighbours lives on to the next generation.
3. Any live cell with more than three live neighbours dies, as if by overpopulation.
4. Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.

Read more: [Conway's Game of Life, Wikipedia](https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life)

## TODO:
There are many improvents to be made. Functionality is at the moment very simple.
- Bug where hovering over a button can produce gray artifacts behind the button.
- The app does dynamically scale and thus looks terrible at smaller window sizes.
